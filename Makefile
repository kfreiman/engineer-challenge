# ============================================
# Variables
# ============================================

.DEFAULT_GOAL := help
SHELL := /bin/bash

# Docker compose files
COMPOSE_CORE := compose.yaml
COMPOSE_DEV := compose.dev.yaml
COMPOSE_OBS := compose.observability.yaml

# Commands
DOCKER_COMPOSE := docker compose
DC_PROD := $(DOCKER_COMPOSE) -f $(COMPOSE_CORE)
DC_DEV := $(DOCKER_COMPOSE) -f $(COMPOSE_CORE) -f $(COMPOSE_DEV)

# Services
SERVICES := traefik kratos_db kratos kratos_migrate core web mailpit billing bff profile

# ============================================
# Help Target
# ============================================

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ============================================
# Main Life-cycle Commands
# ============================================

start: ## Start all services (production)
	$(DC_PROD) up -d --force-recreate

up: start ## Alias for start

dev: ## Start all services (development)
	$(DC_DEV) up -d --force-recreate

down: ## Stop and remove all services (production)
	$(DC_PROD) down -v

down-dev: ## Stop and remove all services (dev)
	$(DC_DEV) down -v

stop: ## Stop all services without removing
	$(DOCKER_COMPOSE) stop

build: ## Build docker images
	$(DC_PROD) build

build-dev: ## Build docker images (development)
	$(DC_DEV) build

logs: ## Show logs for all services
	$(DC_PROD) logs -f

logs-dev: ## Show logs for all services (development)
	$(DC_DEV) logs -f

# ============================================
# Individual Service Management
# ============================================

define service_rules
$(1): ## Start $(1) (production)
	$(DC_PROD) up -d --force-recreate orbitto_$(1)

$(1)-dev: ## Start $(1) (development)
	$(DC_DEV) up -d --force-recreate orbitto_$(1)

$(1)-logs: ## Show logs for $(1)
	$(DOCKER_COMPOSE) logs -f orbitto_$(1)
endef

$(foreach svc,$(SERVICES),$(eval $(call service_rules,$(svc))))

# ============================================
# Code Quality & Testing
# ============================================

test: test-go test-web ## Run all tests

test-go: ## Run Go backend tests
	go test -v ./...

test-web: ## Run frontend unit tests
	cd web && pnpm test

test-e2e: ## Run E2E tests
	npx playwright test

lint: ## Run linters
	golangci-lint run
	cd web && pnpm lint

# ============================================
# Code Generation & Versioning
# ============================================

proto: ## Generate protobuf definitions
	@echo "Generating protobuf files..."

generate: proto ## Run all code generation
	@echo "Generating GraphQL resolvers..."

release: ## Create version commit and tag
	npx commit-and-tag-version

release-dry: ## Create version commit and tag (dry-run)
	npx commit-and-tag-version --dry-run

clean: ## Clean project artifacts and docker images
	rm -rf tmp/ web/dist/ node_modules/ web/node_modules
	$(DC_PROD) down -v --rmi local --remove-orphans

.PHONY: help start dev up down down-dev stop build build-dev logs logs-dev  \
	test test-go test-web test-e2e lint \
	proto generate release release-dry clean $(SERVICES)
