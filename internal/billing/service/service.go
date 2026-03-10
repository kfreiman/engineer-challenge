package service

import (
	"log/slog"

	"github.com/kfreiman/engineer-challenge/internal/billing/adapters"
	"github.com/kfreiman/engineer-challenge/internal/billing/app"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/command"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/query"
)

func NewApplication(logger *slog.Logger) app.Application {
	repo := adapters.NewInMemorySubscriptionRepository()

	return app.Application{
		Commands: app.Commands{
			InitializeFreeSubscription: command.NewInitializeFreeSubscriptionHandler(repo, logger),
		},
		Queries: app.Queries{
			GetSubscription: query.NewGetSubscriptionHandler(repo, logger),
		},
	}
}
