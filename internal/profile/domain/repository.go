package domain

import (
	"context"

	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

type ProfileRepository interface {
	Save(ctx context.Context, profile *entity.Profile) error
	GetByIdentityID(ctx context.Context, identityID string) (*entity.Profile, error)
	Update(ctx context.Context, identityID string, updateFn func(p *entity.Profile) (*entity.Profile, error)) error
}
