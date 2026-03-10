package query

import (
	"context"
	"log/slog"

	"github.com/kfreiman/engineer-challenge/internal/billing/domain"
	"github.com/kfreiman/engineer-challenge/internal/billing/domain/entity"
)

type GetSubscription struct {
	IdentityID string
}

type GetSubscriptionHandler struct {
	repo   domain.SubscriptionRepository
	logger *slog.Logger
}

func NewGetSubscriptionHandler(repo domain.SubscriptionRepository, logger *slog.Logger) GetSubscriptionHandler {
	return GetSubscriptionHandler{repo: repo, logger: logger}
}

func (h GetSubscriptionHandler) Handle(ctx context.Context, query GetSubscription) (*entity.Subscription, error) {
	h.logger.Debug("Getting subscription", "identityID", query.IdentityID)

	s, err := h.repo.GetByIdentityID(ctx, query.IdentityID)
	if err != nil {
		h.logger.Error("Failed to get subscription", "error", err, "identityID", query.IdentityID)
		return nil, err
	}

	return s, nil
}
