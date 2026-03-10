package app

import (
	"github.com/kfreiman/engineer-challenge/internal/billing/app/command"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	InitializeFreeSubscription command.InitializeFreeSubscriptionHandler
}

type Queries struct {
	GetSubscription query.GetSubscriptionHandler
}
