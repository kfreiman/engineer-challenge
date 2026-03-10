package app

import (
	"github.com/kfreiman/engineer-challenge/internal/profile/app/command"
	"github.com/kfreiman/engineer-challenge/internal/profile/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	InitializeProfile command.InitializeProfileHandler
	UpdateProfile     command.UpdateProfileHandler
}

type Queries struct {
	GetProfile query.GetProfileHandler
}
