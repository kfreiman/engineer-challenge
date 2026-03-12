package http

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/kfreiman/engineer-challenge/internal/profile/app"
	"github.com/kfreiman/engineer-challenge/internal/profile/app/command"
)

type BillingService interface {
	InitializeFreeSubscription(ctx context.Context, identityID string) error
}

// NewRouter creates and configures an HTTP router with all profile routes.
// All routes are mounted under the /profile/v1/ prefix.
func NewRouter(app app.Application, billingService BillingService) *http.ServeMux {
	mux := http.NewServeMux()

	handler := NewProfileHandler(app, billingService)

	// Kratos webhook for identity creation (POST only)
	mux.HandleFunc("POST /profile/v1/webhook/kratos", handler.HandleWebhook)

	return mux
}

type ProfileHandler struct {
	app            app.Application
	billingService BillingService
}

func NewProfileHandler(app app.Application, billingService BillingService) *ProfileHandler {
	return &ProfileHandler{app: app, billingService: billingService}
}

// Request/Response types
type kratosIdentityCreated struct {
	IdentityID string `json:"identity_id"`
	Email      string `json:"email"`
}

func (h *ProfileHandler) HandleWebhook(w http.ResponseWriter, r *http.Request) {
	var payload kratosIdentityCreated
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := h.app.Commands.InitializeProfile.Handle(r.Context(), command.InitializeProfile{
		IdentityID: payload.IdentityID,
		Email:      payload.Email,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := h.billingService.InitializeFreeSubscription(r.Context(), payload.IdentityID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
