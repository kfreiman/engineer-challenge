.PHONY: help start dev up down build logs generate proto clean \
	traefik traefik_logs kratos kratos_db kratos_db_logs kratos_app kratos_app_logs kratos_logs \
	profile profile_logs billing billing_logs bff bff_logs

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ============================================
# Individual Service Commands (Production)
# ============================================

traefik: ## Start Traefik service only
	docker compose up -d --force-recreate orbitto_traefik

traefik_logs: ## Show Traefik logs
	docker compose logs -f orbitto_traefik

kratos_db: ## Start PostgreSQL service only
	docker compose up -d --force-recreate orbitto_kratos_db

kratos_db_logs: ## Show PostgreSQL logs
	docker compose logs -f orbitto_kratos_db

kratos_app: ## Start Kratos service only
	docker compose up -d --force-recreate orbitto_kratos

kratos_app_logs: ## Show Kratos logs
	docker compose logs -f orbitto_kratos

kratos: ## Start all Kratos related services
	docker compose up -d --force-recreate orbitto_kratos

kratos_migrate: ## Migrate Kratos database schema attach to logs
	docker compose up --force-recreate orbitto_kratos_migrate 

kratos_logs: ## Show Kratos related services logs
	docker compose logs -f  orbitto_kratos

profile: ## Start Profile service only
	docker compose up -d --force-recreate orbitto_profile

profile_logs: ## Show Profile logs
	docker compose logs -f orbitto_profile

billing: ## Start Billing service only
	docker compose up -d --force-recreate orbitto_billing

billing_logs: ## Show Billing logs
	docker compose logs -f orbitto_billing

bff: ## Start BFF service only
	docker compose up -d --force-recreate orbitto_bff

bff_logs: ## Show BFF logs
	docker compose logs -f orbitto_bff

# ============================================
# Combined Commands (Production)
# ============================================

start: ## Start all services (production mode)
	docker compose up -d --force-recreate

start_logs: ## Start all services and follow logs
	docker compose up

# ============================================
# Development Commands
# ============================================

dev: ## Start all services in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate

# Individual Development Commands
dev_traefik: ## Start Traefik in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_traefik

dev_kratos_db: ## Start Kratos DB in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_kratos_db

dev_kratos_app: ## Start Kratos service in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_kratos

dev_kratos: ## Start all Kratos related services in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_kratos

dev_profile: ## Start Profile service in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_profile

dev_billing: ## Start Billing service in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_billing

dev_bff: ## Start BFF service in development mode
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate orbitto_bff

# ============================================
# Standard Commands
# ============================================

up: ## Start all services with docker-compose (alias for start)
	docker compose -f compose.yaml up -d --force-recreate

up_dev: ## Start all services in development mode (alias for dev)
	docker compose -f compose.yaml -f compose.dev.yaml up -d --force-recreate

down: ## Stop all services
	docker compose down -v

down_dev: ## Stop all services (including dev overrides)
	docker compose -f compose.yaml -f compose.dev.yaml down -v

build: ## Build docker images
	docker compose build

build_dev: ## Build docker images (development mode)
	docker compose -f compose.yaml -f compose.dev.yaml build

logs: ## Show logs for all services
	docker compose logs -f

logs_dev: ## Show logs for all services (development mode)
	docker compose -f compose.yaml -f compose.dev.yaml logs -f

# ============================================
# Code Generation
# ============================================

proto: ## Generate protobuf definitions
	# Placeholder for protoc command
	@echo "Generating protobuf files..."

generate: proto ## Run all code generation
	# Placeholder for gqlgen commands
	@echo "Generating GraphQL resolvers..."

# ============================================
# Cleanup
# ============================================

clean: down ## Clean up generated files and containers
	rm -rf dist/
	@echo "Clean completed."

clean_dev: down_dev ## Clean up development containers
	rm -rf dist/
	@echo "Clean completed."
