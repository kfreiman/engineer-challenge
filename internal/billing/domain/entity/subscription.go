package entity

import (
	"errors"
	"time"
)

var (
	ErrInvalidSubscriptionData = errors.New("invalid subscription data")
)

type Plan string

const (
	FreePlan Plan = "free"
	ProPlan  Plan = "pro"
)

type Status string

const (
	StatusActive   Status = "active"
	StatusInactive Status = "inactive"
)

type Subscription struct {
	identityID string
	plan       Plan
	status     Status
	expiresAt  *time.Time
	createdAt  time.Time
}

func NewFreeSubscription(identityID string) (*Subscription, error) {
	if identityID == "" {
		return nil, ErrInvalidSubscriptionData
	}
	return &Subscription{
		identityID: identityID,
		plan:       FreePlan,
		status:     StatusActive,
		createdAt:  time.Now(),
	}, nil
}

func (s *Subscription) IdentityID() string {
	return s.identityID
}

func (s *Subscription) Plan() Plan {
	return s.plan
}

func (s *Subscription) Status() Status {
	return s.status
}

func (s *Subscription) ExpiresAt() *time.Time {
	return s.expiresAt
}

func (s *Subscription) CreatedAt() time.Time {
	return s.createdAt
}

func (s *Subscription) ChangePlan(plan Plan) {
	s.plan = plan
}

func (s *Subscription) Deactivate() {
	s.status = StatusInactive
}
