package middleware

import (
	"context"
	"net/http"
)

type contextKey string

const (
	IdentityIDKey contextKey = "identity_id"
	// IdentityIDHeader is the header injected by Traefik/Kratos Forward Auth
	IdentityIDHeader = "X-Kratos-Authenticated-Identity-Id"
)

// IdentityMiddleware extracts the Kratos identity ID from the request header
// and injects it into the request context.
func IdentityMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		identityID := r.Header.Get(IdentityIDHeader)
		if identityID == "" {
			// In a real application, you might want to return 401 Unauthorized
			// if the identity is missing, but here we just pass it along
			// as it might be an optional authentication route or
			// the validation is done downstream.
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), IdentityIDKey, identityID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetIdentityID retrieves the identity ID from the context.
func GetIdentityID(ctx context.Context) string {
	if identityID, ok := ctx.Value(IdentityIDKey).(string); ok {
		return identityID
	}
	return ""
}
