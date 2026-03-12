package entity

import (
	"errors"
	"time"
)

var (
	ErrInvalidIdentityID = errors.New("identity ID cannot be empty")
)

type Profile struct {
	id        string
	email     string
	fullName  string
	createdAt time.Time
	updatedAt time.Time
}

func NewProfile(identityID, email string) (*Profile, error) {
	if identityID == "" {
		return nil, ErrInvalidIdentityID
	}
	return &Profile{
		id:        identityID,
		email:     email,
		createdAt: time.Now(),
		updatedAt: time.Now(),
	}, nil
}

func (p *Profile) ID() string {
	return p.id
}

// GetID is a compatibility method for the Node interface.
func (p *Profile) GetID() string {
	return p.ID()
}

func (p *Profile) Email() string {
	return p.email
}

func (p *Profile) FullName() string {
	return p.fullName
}

func (p *Profile) CreatedAt() time.Time {
	return p.createdAt
}

func (p *Profile) UpdatedAt() time.Time {
	return p.updatedAt
}

func (p *Profile) UpdateFullName(name string) {
	p.fullName = name
	p.updatedAt = time.Now()
}
