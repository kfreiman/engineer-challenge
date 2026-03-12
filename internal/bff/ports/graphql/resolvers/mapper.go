package resolvers

import (
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql/model"
	"github.com/kfreiman/engineer-challenge/internal/profile/domain/entity"
)

func mapProfileToUserDTO(p *entity.Profile) *model.User {
	if p == nil {
		return nil
	}
	fullName := p.FullName()
	return &model.User{
		ID:        p.ID(),
		FullName:  &fullName,
		Email:     p.Email(),
		CreatedAt: p.CreatedAt(),
		UpdatedAt: p.UpdatedAt(),
	}
}
