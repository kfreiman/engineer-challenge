# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.4.4](https://github.com/kfreiman/engineer-challenge/compare/v0.4.3...v0.4.4) (2026-03-13)


### ⚠ BREAKING CHANGES

* **logger:** Logger interface changed from slog.Logger wrapper to
zerolog-based implementation. Services now use logger.New(Config) instead
of logger.New(slogLogger). Log format and level can be configured via
environment variables (ORBITTO_CORE_LOG_LEVEL, format options).

* **logger:** migrate from slog to zerolog with configuration support ([166ea71](https://github.com/kfreiman/engineer-challenge/commit/166ea711b99259ab5094ffb6d3a28d43e394011e))

## [0.4.3](https://github.com/kfreiman/engineer-challenge/compare/v0.4.2...v0.4.3) (2026-03-13)


### Features

* **infra:** add observability stack (LGTM + Vector) ([3659d0d](https://github.com/kfreiman/engineer-challenge/commit/3659d0d5c2493c9d41917fd4e4e8d4723ee0ffc4))

## [0.4.2](https://github.com/kfreiman/engineer-challenge/compare/v0.4.1...v0.4.2) (2026-03-12)


### Features

* **web:** add subscription info to profile page with TanStack Query ([7223bfc](https://github.com/kfreiman/engineer-challenge/commit/7223bfc96a897abf80ffb0b6b547a583ca480185))

## [0.4.1](https://github.com/kfreiman/engineer-challenge/compare/v0.4.0...v0.4.1) (2026-03-12)

## [0.4.0](https://github.com/kfreiman/engineer-challenge/compare/v0.3.0...v0.4.0) (2026-03-12)


### Features

* **bff:** add GraphQL server with identity middleware and multi-server support ([a882c13](https://github.com/kfreiman/engineer-challenge/commit/a882c133f8a96350b0b3670e1ce4405538c2f129))
* **graphql:** add GraphQL support to BFF and web client ([d8f7bd0](https://github.com/kfreiman/engineer-challenge/commit/d8f7bd0540d4fbd02cad89a76110f482153a61d4))
* **graphql:** implement secure schema with authentication and profile management ([0529fbf](https://github.com/kfreiman/engineer-challenge/commit/0529fbf6cb507c7f6db714b57f82cbd94af815a3))
* **profile:** integrate billing service for subscription management ([01040b0](https://github.com/kfreiman/engineer-challenge/commit/01040b06dae543c5d172823a6a1cdf6c69a9e351))

## [0.3.0](https://github.com/kfreiman/engineer-challenge/compare/v0.2.0...v0.3.0) (2026-03-12)


### Features

* **auth:** implement account recovery and complete auth flows ([a995d21](https://github.com/kfreiman/engineer-challenge/commit/a995d2116ad3dc6e52dd5af4c8dca1894854f166))

## [0.2.0](https://github.com/kfreiman/engineer-challenge/compare/v0.1.0...v0.2.0) (2026-03-11)


### Features

* **e2e:** add Playwright E2E testing infrastructure ([7252ba4](https://github.com/kfreiman/engineer-challenge/commit/7252ba4c866443bed4f952680717de3291815fa7))

## [0.1.0](https://github.com/kfreiman/engineer-challenge/compare/v0.0.1...v0.1.0) (2026-03-10)


### ⚠ BREAKING CHANGES

* New Go project structure established

### Features

* **auth:** implement minimal login and registration flow ([ec5c55c](https://github.com/kfreiman/engineer-challenge/commit/ec5c55cc411a86b88287f10a1d96b239da0609f7))
* initialize Go module with DDD-lite architecture ([ed0b19a](https://github.com/kfreiman/engineer-challenge/commit/ed0b19af279f2c3aafc636203cbb92301138071f))
* **web:** add react frontend and infrastructure ([c535416](https://github.com/kfreiman/engineer-challenge/commit/c53541604e062b8837ee96b4b00cd6cc9c66a60c))

## 0.0.1 (2026-03-08)

### Features

* init ([3d80785](https://github.com/kfreiman/engineer-challengecommit/3d80785f4b5160708c530d6ab407acba98b479fe))
* initialize authentication microservices infrastructure ([fb74489](https://github.com/kfreiman/engineer-challengecommit/fb7448932eb7d84154fbdb20ea29a51f985ced26))
