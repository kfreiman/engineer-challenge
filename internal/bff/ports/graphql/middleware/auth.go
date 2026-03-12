package middleware

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/http/middleware"
)

// IsAuthenticated checks if the current context has an authenticated identity
func IsAuthenticated(ctx context.Context) bool {
	return middleware.GetIdentityID(ctx) != ""
}

// GetIdentityIDFromContext extracts the identity ID from the context
func GetIdentityIDFromContext(ctx context.Context) string {
	return middleware.GetIdentityID(ctx)
}

// AuthDirective is a GraphQL directive that can be used to protect resolvers
// Usage in schema: directive @auth on FIELD_DEFINITION
func AuthDirective(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	identityID := middleware.GetIdentityID(ctx)
	if identityID == "" {
		return nil, errors.New("unauthenticated")
	}
	return next(ctx)
}
