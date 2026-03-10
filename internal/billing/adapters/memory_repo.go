package adapters

import (
	"context"
	"fmt"
	"sync"

	"github.com/kfreiman/engineer-challenge/internal/billing/domain/entity"
)

type InMemorySubscriptionRepository struct {
	subscriptions map[string]*entity.Subscription
	lock          sync.RWMutex
}

func NewInMemorySubscriptionRepository() *InMemorySubscriptionRepository {
	return &InMemorySubscriptionRepository{
		subscriptions: make(map[string]*entity.Subscription),
	}
}

func (r *InMemorySubscriptionRepository) Save(ctx context.Context, sub *entity.Subscription) error {
	r.lock.Lock()
	defer r.lock.Unlock()

	r.subscriptions[sub.IdentityID()] = sub
	return nil
}

func (r *InMemorySubscriptionRepository) GetByIdentityID(ctx context.Context, identityID string) (*entity.Subscription, error) {
	r.lock.RLock()
	defer r.lock.RUnlock()

	sub, ok := r.subscriptions[identityID]
	if !ok {
		return nil, fmt.Errorf("subscription for identity ID %s not found", identityID)
	}

	return sub, nil
}

func (r *InMemorySubscriptionRepository) Update(
	ctx context.Context,
	identityID string,
	updateFn func(s *entity.Subscription) (*entity.Subscription, error),
) error {
	r.lock.Lock()
	defer r.lock.Unlock()

	sub, ok := r.subscriptions[identityID]
	if !ok {
		return fmt.Errorf("subscription for identity ID %s not found", identityID)
	}

	updatedSub, err := updateFn(sub)
	if err != nil {
		return err
	}

	r.subscriptions[identityID] = updatedSub
	return nil
}
