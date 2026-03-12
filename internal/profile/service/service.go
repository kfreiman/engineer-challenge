package service

import (
	"log/slog"

	"github.com/kfreiman/engineer-challenge/internal/logger"
	"github.com/kfreiman/engineer-challenge/internal/profile/adapters"
	"github.com/kfreiman/engineer-challenge/internal/profile/app"
	"github.com/kfreiman/engineer-challenge/internal/profile/app/command"
	"github.com/kfreiman/engineer-challenge/internal/profile/app/query"
)

func NewApplication(slogLogger *slog.Logger) app.Application {
	log := logger.New(slogLogger)
	repo := adapters.NewInMemoryProfileRepository()

	return app.Application{
		Commands: app.Commands{
			InitializeProfile: command.NewInitializeProfileHandler(repo, log),
			UpdateProfile:     command.NewUpdateProfileHandler(repo, log),
		},
		Queries: app.Queries{
			GetProfile: query.NewGetProfileHandler(repo, log),
		},
	}
}
