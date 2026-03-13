package resolvers

import (
	"context"

	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql/model"
	billingapp "github.com/kfreiman/engineer-challenge/internal/billing/app"
	billingquery "github.com/kfreiman/engineer-challenge/internal/billing/app/query"
	billingentity "github.com/kfreiman/engineer-challenge/internal/billing/domain/entity"
	"github.com/kfreiman/engineer-challenge/internal/logger"
	profileapp "github.com/kfreiman/engineer-challenge/internal/profile/app"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

type Resolver struct {
	ProfileApp profileapp.Application
	BillingApp billingapp.Application
	Logger     logger.Logger
}

func mapSubscriptionToDTO(sub *billingentity.Subscription) *model.SubscriptionInfo {
	if sub == nil {
		return nil
	}

	var plan model.SubscriptionPlan
	switch sub.Plan() {
	case billingentity.ProPlan:
		plan = model.SubscriptionPlanPro
	default:
		plan = model.SubscriptionPlanFree
	}

	var status model.SubscriptionStatus
	switch sub.Status() {
	case billingentity.StatusActive:
		status = model.SubscriptionStatusActive
	default:
		status = model.SubscriptionStatusInactive
	}

	return &model.SubscriptionInfo{
		Plan:      plan,
		Status:    status,
		ExpiresAt: sub.ExpiresAt(),
		CreatedAt: sub.CreatedAt(),
	}
}

func mapProfileToUserDTO(ctx context.Context, p *entity.Profile, billingApp billingapp.Application) (*model.User, error) {
	if p == nil {
		return nil, nil
	}
	fullName := p.FullName()

	sub, err := billingApp.Queries.GetSubscription.Handle(ctx, billingquery.GetSubscription{
		IdentityID: p.ID(),
	})
	if err != nil {
		// Log the error but don't fail the entire query
		// Return user without subscription if subscription fetch fails
		sub = nil
	}

	return &model.User{
		ID:           p.ID(),
		FullName:     &fullName,
		Email:        p.Email(),
		Subscription: mapSubscriptionToDTO(sub),
		CreatedAt:    p.CreatedAt(),
		UpdatedAt:    p.UpdatedAt(),
	}, nil
}
