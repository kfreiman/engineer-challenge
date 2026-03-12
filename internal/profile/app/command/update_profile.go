package command

import (
	"context"

	"github.com/kfreiman/engineer-challenge/internal/logger"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

type UpdateProfile struct {
	IdentityID string
	FullName   string
}

type UpdateProfileHandler struct {
	repo   domain.ProfileRepository
	logger logger.Logger
}

func NewUpdateProfileHandler(repo domain.ProfileRepository, logger logger.Logger) UpdateProfileHandler {
	return UpdateProfileHandler{repo: repo, logger: logger}
}

func (h UpdateProfileHandler) Handle(ctx context.Context, cmd UpdateProfile) error {
	h.logger.InfoContext(ctx, "Updating profile", "identityID", cmd.IdentityID, "fullName", cmd.FullName)

	err := h.repo.Update(ctx, cmd.IdentityID, func(p *entity.Profile) (*entity.Profile, error) {
		p.UpdateFullName(cmd.FullName)
		return p, nil
	})

	if err != nil {
		h.logger.ErrorContext(ctx, "Failed to update profile", "error", err, "identityID", cmd.IdentityID)
		return err
	}

	return nil
}
