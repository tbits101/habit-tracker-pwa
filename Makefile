# Makefile for Habit Tracker PWA
# Alternative to justfile - use if you prefer make commands

.PHONY: help install dev build test clean deploy setup-db seed-db health-check quality lint format

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies"
	@echo "  dev         - Start development server"
	@echo "  build       - Build for production"
	@echo "  test        - Run tests"
	@echo "  lint        - Run linter"
	@echo "  format      - Format code"
	@echo "  clean       - Clean build artifacts"
	@echo "  deploy      - Deploy to Vercel"
	@echo "  setup-db    - Setup database"
	@echo "  seed-db     - Seed database"
	@echo "  health-check - Run health checks"
	@echo "  quality     - Run all quality checks"
	@echo ""
	@echo "Usage: make [command]"

# Install dependencies
install:
	npm install --legacy-peer-deps

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Run tests
test:
	npm run test

# Run linter
lint:
	npm run lint

# Format code
format:
	npm run format

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf out
	rm -rf dist
	rm -rf coverage
	rm -rf reports

# Deploy to Vercel
deploy:
	npx vercel --prod

# Setup database
setup-db:
	npx prisma generate
	npx prisma db push

# Seed database
seed-db:
	npx prisma db seed

# Run health checks
health-check:
	@echo "🔍 Running health checks..."
	@npm run type-check
	@npm run lint
	@npm run build
	@echo "✅ All health checks passed!"

# Run all quality checks
quality: lint format test build

# Quick development setup
quick: install dev

# Generate Prisma client
generate:
	npx prisma generate

# Database migrations
migrate:
	npx prisma migrate dev

# Open database studio
studio:
	npx prisma studio

# Reset database
db-reset:
	npx prisma migrate reset

# Type checking
type-check:
	npm run type-check

# Performance audit
audit:
	npm audit

# Bundle analysis
analyze:
	npm run build && npx @next/bundle-analyzer

# Docker commands
docker-build:
	docker build -t habit-tracker .

docker-run:
	docker run -p 3000:3000 habit-tracker

# Create release
release: health-check tag deploy

# Development workflow
workflow: health-check dev

# Production workflow
production: quality deploy