package command

import (
	"context"

	"github.com/kfreiman/engineer-challenge/internal/logger"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

type InitializeProfile struct {
	IdentityID string
	Email      string
}

type InitializeProfileHandler struct {
	repo   domain.ProfileRepository
	logger logger.Logger
}

func NewInitializeProfileHandler(repo domain.ProfileRepository, logger logger.Logger) InitializeProfileHandler {
	return InitializeProfileHandler{repo: repo, logger: logger}
}

func (h InitializeProfileHandler) Handle(ctx context.Context, cmd InitializeProfile) error {
	h.logger.InfoContext(ctx, "Initializing profile", "identityID", cmd.IdentityID, "email", cmd.Email)

	p, err := entity.NewProfile(cmd.IdentityID, cmd.Email)
	if err != nil {
		h.logger.ErrorContext(ctx, "Failed to create profile", "error", err, "identityID", cmd.IdentityID)
		return err
	}

	if err := h.repo.Save(ctx, p); err != nil {
		h.logger.ErrorContext(ctx, "Failed to save profile", "error", err, "identityID", cmd.IdentityID)
		return err
	}

	return nil
}
