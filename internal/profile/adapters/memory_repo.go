package adapters

import (
	"context"
	"fmt"
	"sync"

	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

type InMemoryProfileRepository struct {
	profiles map[string]*entity.Profile
	lock     sync.RWMutex
}

func NewInMemoryProfileRepository() *InMemoryProfileRepository {
	return &InMemoryProfileRepository{
		profiles: make(map[string]*entity.Profile),
	}
}

func (r *InMemoryProfileRepository) Save(ctx context.Context, profile *entity.Profile) error {
	r.lock.Lock()
	defer r.lock.Unlock()

	r.profiles[profile.ID()] = profile
	return nil
}

func (r *InMemoryProfileRepository) GetByIdentityID(ctx context.Context, identityID string) (*entity.Profile, error) {
	r.lock.RLock()
	defer r.lock.RUnlock()

	profile, ok := r.profiles[identityID]
	if !ok {
		return nil, fmt.Errorf("profile with identity ID %s not found", identityID)
	}

	return profile, nil
}

// Update implements a more robust update pattern as suggested by DDD-lite skill
func (r *InMemoryProfileRepository) Update(
	ctx context.Context,
	identityID string,
	updateFn func(p *entity.Profile) (*entity.Profile, error),
) error {
	r.lock.Lock()
	defer r.lock.Unlock()

	profile, ok := r.profiles[identityID]
	if !ok {
		return fmt.Errorf("profile with identity ID %s not found", identityID)
	}

	updatedProfile, err := updateFn(profile)
	if err != nil {
		return err
	}

	r.profiles[identityID] = updatedProfile
	return nil
}
