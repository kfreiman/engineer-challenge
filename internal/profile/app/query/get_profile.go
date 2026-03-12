package query

import (
	"context"

	"github.com/kfreiman/engineer-challenge/internal/logger"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

type GetProfile struct {
	IdentityID string
}

type GetProfileHandler struct {
	repo   domain.ProfileRepository
	logger logger.Logger
}

func NewGetProfileHandler(repo domain.ProfileRepository, logger logger.Logger) GetProfileHandler {
	return GetProfileHandler{repo: repo, logger: logger}
}

func (h GetProfileHandler) Handle(ctx context.Context, query GetProfile) (*entity.Profile, error) {
	h.logger.DebugContext(ctx, "Getting profile", "identityID", query.IdentityID)

	p, err := h.repo.GetByIdentityID(ctx, query.IdentityID)
	if err != nil {
		h.logger.ErrorContext(ctx, "Failed to get profile", "error", err, "identityID", query.IdentityID)
		return nil, err
	}

	return p, nil
}
