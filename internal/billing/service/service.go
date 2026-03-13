package service

import (
	"github.com/kfreiman/engineer-challenge/internal/billing/adapters"
	"github.com/kfreiman/engineer-challenge/internal/billing/app"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/command"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/query"
	"github.com/kfreiman/engineer-challenge/internal/logger"
)

func NewApplication(log logger.Logger) app.Application {
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
