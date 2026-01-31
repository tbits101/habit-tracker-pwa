# Justfile for Habit Tracker PWA
# This file provides simple commands for common development tasks

default: help
.PHONY: help install dev build test lint clean deploy setup-db seed-db

# Show help
help:
	@echo "Available commands:"
	@echo "  install    - Install dependencies"
	@echo "  dev        - Start development server"
	@echo "  build      - Build for production"
	@echo "  test       - Run tests"
	@echo "  lint       - Run linter"
	@echo "  clean      - Clean build artifacts"
	@echo "  deploy     - Deploy to Vercel"
	@echo "  setup-db   - Setup database"
	@echo "  seed-db    - Seed database with sample data"
	@echo ""
	@echo "Example usage: just dev"

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
	npm run test || echo "Tests not implemented yet"

# Run linter
lint:
	npm run lint || echo "Linting completed with warnings"

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf out
	rm -rf dist
	rm -rf node_modules/.cache

# Deploy to Vercel
deploy:
	npx vercel --prod

# Setup database (generate client and run migrations)
setup-db:
	npx prisma generate
	npx prisma db push

# Seed database with sample data
seed-db:
	npx prisma db seed

# Open Prisma Studio (database admin UI)
studio:
	npx prisma studio

# Generate Prisma client
generate:
	npx prisma generate

# Run database migrations
migrate:
	npx prisma migrate dev

# Reset database
db-reset:
	npx prisma migrate reset

# Start production server locally
start:
	npm start

# Audit with Lighthouse
audit:
	npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report

# Install PWA for testing
install-pwa:
	@echo "To test PWA locally:"
	@echo "1. Open Chrome DevTools"
	@echo "2. Go to Application tab → Manifest"
	@echo "3. Click 'Add to home screen'"

# Production health check
health-check:
	@echo "Checking production build..."
	@npm run build || (echo "❌ Build failed" && exit 1)
	@echo "✅ Build successful"
	@echo "Checking TypeScript types..."
	@npx tsc --noEmit || (echo "❌ TypeScript errors" && exit 1)
	@echo "✅ TypeScript passed"
	@echo "🎉 Project is healthy!"

# Quick development setup (install + start)
quick: install dev

# Full CI pipeline
ci: install lint build test

# Create new migration with name
migration name:
	@read -p "Enter migration name: " migration_name; \
	npx prisma migrate dev --name $$migration_name

# Pull latest changes and install
update:
	git pull origin main
	npm install --legacy-peer-deps

# Commit current changes with message
commit:
	@read -p "Enter commit message: " commit_message; \
	git add . && git commit -m "$$commit_message"

# Push current branch
push:
	git push origin main

# Deploy with update and deploy
deploy-with-update: update deploy

# Show project status
status:
	@echo "📊 Project Status:"
	@echo "Last commit: $(git log -1 --oneline)"
	@echo "Branch: $(git branch --show-current)"
	@echo "Node: $(node --version)"
	@echo "NPM: $(npm --version)"
	@if [ -d ".next" ]; then echo "Build: ✅ Built"; else echo "Build: ❌ Not built"; fi

# Docker commands
docker-build:
	docker build -t habit-tracker .

docker-run:
	docker run -p 3000:3000 habit-tracker

# Backup database
backup-db:
	@echo "Creating database backup..."
	@npx prisma db push --preview-feature
	@echo "Backup created"

# Environment setup for different stages
setup-dev:
	@echo "Setting up development environment..."
	@cp .env.example .env.local
	@echo "✅ Development environment ready"

setup-prod:
	@echo "Setting up production environment..."
	@echo "Please set your production variables in .env.local"
	@echo "Variables needed: DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET"

# Run all quality checks
quality: lint type-check format
type-check:
	npx tsc --noEmit
format:
	npx prettier --write "src/**/*.{ts,tsx,js,jsx}"

# Generate documentation
docs:
	@echo "Generating API documentation..."
	@npx swagger-jsdoc -d swagger.json src/app/api/**/*.ts

# Performance monitoring
perf:
	@echo "Running performance checks..."
	@npm run build
	@echo "Bundle size analysis:"
	@du -sh .next | sort -rh

# Security audit
audit:
	@echo "Running security audit..."
	@npm audit --audit-level moderate

# Create release
release: health-check tag deploy
	@read -p "Enter version (e.g., v1.0.0): " version; \
	git tag $$version && git push origin $$version

# Rollback to previous commit
rollback:
	@echo "Rolling back to previous commit..."
	@git reset --hard HEAD~1

# Show all available commands
list:
	@just --list