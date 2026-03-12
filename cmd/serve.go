package cmd

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ilyakaznacheev/cleanenv"
	bffhttp "github.com/kfreiman/engineer-challenge/internal/bff/ports/http"
	billinglocal "github.com/kfreiman/engineer-challenge/internal/billing/ports/local"
	billingservice "github.com/kfreiman/engineer-challenge/internal/billing/service"
	profilehttp "github.com/kfreiman/engineer-challenge/internal/profile/ports/http"
	profileservice "github.com/kfreiman/engineer-challenge/internal/profile/service"

	"github.com/spf13/cobra"
	"golang.org/x/sync/errgroup"
)

type httpConfig struct {
	Port    int `env:"PORT" env-default:"80" env-description:"HTTP port" json:"port"`
	BFFPort int `env:"BFF_PORT" env-default:"8081" env-description:"BFF HTTP port" json:"bff_port"`
}

type serveConfig struct {
	Logger loggerConfig `env-prefix:"LOG_" json:"logger"`
	HTTP   httpConfig   `env-prefix:"HTTP_" json:"http"`
}

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the application server",
	RunE: func(cmd *cobra.Command, args []string) error {
		ctx, cancel := signal.NotifyContext(cmd.Context(), os.Interrupt, syscall.SIGTERM, syscall.SIGQUIT)
		defer cancel()

		// load config
		var conf serveConfig
		if err := cleanenv.ReadEnv(&conf); err != nil {
			fmt.Fprintf(os.Stderr, "Failed to load command config: %v\n", err)
			return err
		}

		// create logger
		logger := createLogger(conf.Logger)

		billingApp := billingservice.NewApplication(logger)
		billingService := billinglocal.NewBillingService(billingApp)

		profileApp := profileservice.NewApplication(logger)
		profileMux := profilehttp.NewRouter(profileApp, billingService)

		bffMux, bffResolver := bffhttp.NewRouter(logger)
		bffResolver.ProfileApp = profileApp
		bffResolver.BillingApp = billingApp

		g, ctx := errgroup.WithContext(ctx)

		servers := []struct {
			name string
			port int
			mux  *http.ServeMux
		}{
			{"Main", conf.HTTP.Port, profileMux},
			{"BFF", conf.HTTP.BFFPort, bffMux},
		}

		for _, s := range servers {
			s := s
			srv := &http.Server{
				Addr:    fmt.Sprintf(":%d", s.port),
				Handler: s.mux,
			}

			g.Go(func() error {
				logger.InfoContext(ctx, fmt.Sprintf("%s server starting", s.name), "port", s.port)
				if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
					logger.ErrorContext(ctx, fmt.Sprintf("%s server error", s.name), "error", err)
					return err
				}
				return nil
			})

			g.Go(func() error {
				<-ctx.Done()
				logger.InfoContext(ctx, fmt.Sprintf("Shutting down %s server", s.name))
				shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
				defer shutdownCancel()
				return srv.Shutdown(shutdownCtx)
			})
		}

		return g.Wait()
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}
