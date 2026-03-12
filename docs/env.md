# Environment Configuration

This document describes the environment variables used in the Orbitto project. These variables are defined in `.env.example` and should be copied to `.env` for local development.

## Quick Start

```bash
cp .env.example .env
# Edit .env to customize values
```

## Required Variables

These variables must be set before starting the application.

### Application Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `ORBITTO_SCHEMA` | URL scheme for the application (http:// or https://) | `http://` |
| `ORBITTO_HOSTNAME` | Hostname for the application | `orbitto.localhost` |

### Kratos Database Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `ORBITTO_KRATOS_DB_USER` | PostgreSQL username for Kratos | `kratos` |
| `ORBITTO_KRATOS_DB_PASSWORD` | PostgreSQL password for Kratos | `abc` |
| `ORBITTO_KRATOS_DB_NAME` | PostgreSQL database name for Kratos | `kratos_db` |

### Kratos Security Secrets

| Variable | Description | Requirements | Example |
|----------|-------------|--------------|---------|
| `ORBITTO_KRATOS_COOKIE_SECRET` | Secret for signing session cookies | At least 16 bytes | `Ql5CmFFlq1E3zav9` |
| `ORBITTO_KRATOS_CIPHER_SECRET` | Secret for encrypting sensitive data | Exactly 32 bytes | `rZ86DhB3wfpl3qX52MQqlQdlasmNwv0j` |

**Generating Secrets:**

```bash
# Generate 16+ byte cookie secret
openssl rand -hex 16

# Generate 32 byte cipher secret
openssl rand -hex 32
```

## Development Variables (Optional)

These variables are used when running the application in development mode and have default values.

### Traefik (API Gateway)

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ORBITTO_TRAEFIK_LOG_LEVEL` | Log level for Traefik | `INFO` | `debug` |
| `ORBITTO_TRAEFIK_EXPOSE_HTTP_PORT` | HTTP port exposed to host | `80` | `8080` |
| `ORBITTO_TRAEFIK_EXPOSE_DASHBOARD_PORT` | Traefik dashboard port | `8080` | `8081` |

### PostgreSQL Database

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ORBITTO_KRATOS_DB_EXPOSE_HTTP_PORT` | PostgreSQL port exposed to host | `5432` | `5433` |

### Kratos (Identity & Access Management)

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ORBITTO_KRATOS_EXPOSE_PUBLIC_PORT` | Kratos public API port | `4433` | `4435` |
| `ORBITTO_KRATOS_EXPOSE_ADMIN_PORT` | Kratos admin API port | `4434` | `4436` |

### Profile Service

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ORBITTO_PROFILE_EXPOSE_PORT` | Profile service port | `8081` | `8085` |

### Billing Service

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ORBITTO_BILLING_EXPOSE_PORT` | Billing service port | `8082` | `8086` |

### BFF (GraphQL Gateway)

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `ORBITTO_BFF_EXPOSE_PORT` | BFF service port | `3000` | `3001` |

## Architecture Overview

The application uses the following services with the specified ports:

```
┌─────────────────────────────────────────────────────────────┐
│                     Traefik (Gateway)                       │
│                        Port 80/8080                          │
└─────────────┬──────────────────────┬────────────────────────┘
              │                      │
              ▼                      ▼
    ┌─────────────────┐    ┌─────────────────┐
    │   Kratos (IAM)  │    │   BFF (GraphQL) │
    │   Port 4433/4434│    │   Port 3000     │
    └────────┬────────┘    └─────────────────┘
             │
             ▼
    ┌─────────────────┐
    │ PostgreSQL      │
    │ Port 5432       │
    └─────────────────┘
```

## Troubleshooting

### Common Issues

1. **Cookie secret too short**
   - Error: `SECRETS_COOKIE_0` must be at least 16 bytes
   - Solution: Generate a new secret using `openssl rand -hex 16`

2. **Cipher secret wrong length**
   - Error: `SECRETS_CIPHER_0` must be exactly 32 bytes
   - Solution: Generate a new secret using `openssl rand -hex 32`

3. **Database connection refused**
   - Check that `ORBITTO_KRATOS_DB_USER`, `ORBITTO_KRATOS_DB_PASSWORD`, and `ORBITTO_KRATOS_DB_NAME` match your PostgreSQL configuration
   - Verify the database container is running: `docker ps`

### Environment Variable Precedence

Variables are resolved in the following order:

1. `.env` file (if present)
2. Shell environment variables
3. Default values (for development variables)

## Related Files

- `.env.example` - Template file with example values
- `.env` - Local environment configuration (not committed to git)
- `compose.yaml` - Production Docker Compose configuration
- `compose.dev.yaml` - Development Docker Compose overrides
- `infra/kratos/kratos.yaml` - Kratos configuration (uses these variables)
