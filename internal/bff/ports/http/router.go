package http

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql"
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql/middleware"
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql/resolvers"
	httpmiddleware "github.com/kfreiman/engineer-challenge/internal/bff/ports/http/middleware"
	"github.com/kfreiman/engineer-challenge/internal/logger"
)

func NewRouter(logger logger.Logger) (*http.ServeMux, *resolvers.Resolver) {
	mux := http.NewServeMux()

	resolver := &resolvers.Resolver{
		Logger: logger,
	}

	// Configure GraphQL schema with directives
	cfg := graphql.Config{
		Resolvers: resolver,
		Directives: graphql.DirectiveRoot{
			Auth: middleware.AuthDirective,
		},
	}

	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(cfg))

	// Apply identity extraction middleware to GraphQL endpoints
	graphqlHandler := httpmiddleware.IdentityMiddleware(srv)
	mux.Handle("/query", graphqlHandler)

	// FIXME remove in prod
	// FIXME customize preffix for bff
	mux.Handle("/", playground.Handler("GraphQL playground", "/bff/query"))

	return mux, resolver
}
