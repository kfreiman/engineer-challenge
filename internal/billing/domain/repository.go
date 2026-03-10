package domain

import (
	"context"
	"github.com/kfreiman/engineer-challenge/internal/billing/domain/entity"
)

type SubscriptionRepository interface {
	Save(ctx context.Context, subscription *entity.Subscription) error
	GetByIdentityID(ctx context.Context, identityID string) (*entity.Subscription, error)
	Update(ctx context.Context, identityID string, updateFn func(s *entity.Subscription) (*entity.Subscription, error)) error
}
