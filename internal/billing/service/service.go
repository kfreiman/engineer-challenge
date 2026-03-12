package service

import (
	"log/slog"

	"github.com/kfreiman/engineer-challenge/internal/logger"
	"github.com/kfreiman/engineer-challenge/internal/billing/adapters"
	"github.com/kfreiman/engineer-challenge/internal/billing/app"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/command"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/query"
)

func NewApplication(slogLogger *slog.Logger) app.Application {
	log := logger.New(slogLogger)
	repo := adapters.NewInMemorySubscriptionRepository()

	return app.Application{
		Commands: app.Commands{
			InitializeFreeSubscription: command.NewInitializeFreeSubscriptionHandler(repo, log),
		},
		Queries: app.Queries{
			GetSubscription: query.NewGetSubscriptionHandler(repo, log),
		},
	}
}
