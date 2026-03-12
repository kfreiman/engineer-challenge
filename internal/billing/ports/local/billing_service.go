package local

import (
	"context"

	"github.com/kfreiman/engineer-challenge/internal/billing/app"
	"github.com/kfreiman/engineer-challenge/internal/billing/app/command"
)

type BillingService struct {
	app app.Application
}

func NewBillingService(app app.Application) *BillingService {
	return &BillingService{app: app}
}

func (s *BillingService) InitializeFreeSubscription(ctx context.Context, identityID string) error {
	return s.app.Commands.InitializeFreeSubscription.Handle(ctx, command.InitializeFreeSubscription{
		IdentityID: identityID,
	})
}
