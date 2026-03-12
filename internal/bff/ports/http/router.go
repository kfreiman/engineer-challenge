package http

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql"
	"github.com/kfreiman/engineer-challenge/internal/bff/ports/graphql/resolvers"
)

func NewRouter() *http.ServeMux {
	mux := http.NewServeMux()

	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: &resolvers.Resolver{}}))

	mux.Handle("/query", srv)
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))

	return mux
}
