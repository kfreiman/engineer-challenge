package cmd

import (
	"fmt"
	"net/http"
	"os"

	"github.com/ilyakaznacheev/cleanenv"
	billinglocal "github.com/kfreiman/engineer-challenge/internal/billing/ports/local"
	billingservice "github.com/kfreiman/engineer-challenge/internal/billing/service"
	profilehttp "github.com/kfreiman/engineer-challenge/internal/profile/ports/http"
	profileservice "github.com/kfreiman/engineer-challenge/internal/profile/service"

	"github.com/spf13/cobra"
)

type httpConfig struct {
	Port int `env:"PORT" env-default:"80" env-description:"HTTP port" json:"port"`
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
		ctx := cmd.Context()

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
		mux := profilehttp.NewRouter(profileApp, billingService)

		addr := fmt.Sprintf(":%d", conf.HTTP.Port)
		logger.InfoContext(ctx, "HTTP server starting",
			"config", conf,
		)

		if err := http.ListenAndServe(addr, mux); err != nil {
			logger.ErrorContext(ctx, "Error starting server", "error", err)
			return err
		}

		return nil
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}
