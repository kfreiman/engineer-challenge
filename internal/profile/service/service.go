package service

import (
	"github.com/kfreiman/engineer-challenge/internal/logger"
	"github.com/kfreiman/engineer-challenge/internal/profile/adapters"
	"github.com/kfreiman/engineer-challenge/internal/profile/app"
	"github.com/kfreiman/engineer-challenge/internal/profile/app/command"
	"github.com/kfreiman/engineer-challenge/internal/profile/app/query"
)

func NewApplication(logger logger.Logger) app.Application {
	repo := adapters.NewInMemoryProfileRepository()

	return app.Application{
		Commands: app.Commands{
			InitializeProfile: command.NewInitializeProfileHandler(repo, logger),
			UpdateProfile:     command.NewUpdateProfileHandler(repo, logger),
		},
		Queries: app.Queries{
			GetProfile: query.NewGetProfileHandler(repo, logger),
		},
	}
}
