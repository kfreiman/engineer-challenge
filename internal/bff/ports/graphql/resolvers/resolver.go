package resolvers

import (
	"log/slog"

	"github.com/kfreiman/engineer-challenge/internal/profile/app"
)

type Resolver struct {
	ProfileApp app.Application
	Logger     *slog.Logger
}
