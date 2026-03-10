package command

import (
	"context"
	"log/slog"

	"github.com/kfreiman/engineer-challenge/internal/billing/domain"
	"github.com/kfreiman/engineer-challenge/internal/billing/domain/entity"
)

type InitializeFreeSubscription struct {
	IdentityID string
}

type InitializeFreeSubscriptionHandler struct {
	repo   domain.SubscriptionRepository
	logger *slog.Logger
}

func NewInitializeFreeSubscriptionHandler(repo domain.SubscriptionRepository, logger *slog.Logger) InitializeFreeSubscriptionHandler {
	return InitializeFreeSubscriptionHandler{repo: repo, logger: logger}
}

func (h InitializeFreeSubscriptionHandler) Handle(ctx context.Context, cmd InitializeFreeSubscription) error {
	h.logger.Info("Initializing free subscription", "identityID", cmd.IdentityID)

	s, err := entity.NewFreeSubscription(cmd.IdentityID)
	if err != nil {
		h.logger.Error("Failed to create free subscription", "error", err, "identityID", cmd.IdentityID)
		return err
	}

	if err := h.repo.Save(ctx, s); err != nil {
		h.logger.Error("Failed to save free subscription", "error", err, "identityID", cmd.IdentityID)
		return err
	}

	return nil
}
