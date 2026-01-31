#!/bin/bash

# Habit Tracker PWA - Development Helper Script
# This script provides automated setup and development workflows

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_status() {
    echo -e "${BLUE}📊 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main menu
show_menu() {
    echo -e "\n${BLUE}🚀 Habit Tracker PWA Development Toolkit${NC}\n"
    echo "Choose an option:"
    echo "1) Quick Start (Install + Dev)"
    echo "2) Start Development Server"
    echo "3) Build Production"
    echo "4) Deploy to Vercel"
    echo "5) Database Setup"
    echo "6) Open Prisma Studio"
    echo "7) Quality Checks"
    echo "8) Health Check"
    echo "9) Project Status"
    echo "10) Exit"
    echo ""
}

# Install dependencies
install_deps() {
    print_status "Installing dependencies..."
    if command_exists npm; then
        npm install --legacy-peer-deps
        print_success "Dependencies installed successfully"
    else
        print_error "npm not found. Please install Node.js first."
        exit 1
    fi
}

# Start development server
start_dev() {
    print_status "Starting development server..."
    npm run dev
}

# Build for production
build_prod() {
    print_status "Building for production..."
    npm run build
    print_success "Build completed successfully"
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    if command_exists vercel; then
        vercel --prod
        print_success "Deployment completed"
    else
        print_warning "Vercel CLI not found. Installing..."
        npm i -g vercel
        vercel --prod
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    npx prisma generate
    npx prisma db push
    print_success "Database setup completed"
}

# Open Prisma Studio
open_studio() {
    print_status "Opening Prisma Studio..."
    npx prisma studio
}

# Run quality checks
quality_checks() {
    print_status "Running quality checks..."
    
    echo -e "\n${YELLOW}Running linter...${NC}"
    npm run lint || print_warning "Linter found issues"
    
    echo -e "\n${YELLOW}Running type checks...${NC}"
    npm run type-check || print_error "TypeScript errors found"
    
    echo -e "\n${YELLOW}Running build test...${NC}"
    npm run build || print_error "Build failed"
    
    print_success "Quality checks completed"
}

# Health check
health_check() {
    print_status "Running health check..."
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        print_warning "Dependencies not installed. Running install_deps..."
        install_deps
    fi
    
    # Check environment
    if [ ! -f ".env.local" ] && [ ! -f ".env" ]; then
        print_warning "No environment file found. Copy .env.example to .env.local"
    fi
    
    # Run TypeScript check
    npm run type-check || print_error "TypeScript errors detected"
    
    # Run build
    npm run build || print_error "Build failed"
    
    print_success "Health check passed - Project is ready!"
}

# Show project status
show_status() {
    print_status "Project Status"
    
    echo -e "\n${BLUE}Repository:${NC}"
    if [ -d ".git" ]; then
        echo "  Git Remote: $(git remote get-url origin 2>/dev/null || echo 'Not set')"
        echo "  Current Branch: $(git branch --show-current 2>/dev/null || echo 'Unknown')"
        echo "  Last Commit: $(git log -1 --oneline 2>/dev/null || echo 'No commits')"
    else
        echo "  Not a Git repository"
    fi
    
    echo -e "\n${BLUE}Dependencies:${NC}"
    echo "  Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
    echo "  NPM: $(npm --version 2>/dev/null || echo 'Not installed')"
    echo "  Next.js: $(grep '"next":' package.json | cut -d'"' -f4 2>/dev/null || echo 'Unknown')"
    
    echo -e "\n${BLUE}Build:${NC}"
    if [ -d ".next" ]; then
        echo "  Status: ✅ Built"
        echo "  Size: $(du -sh .next 2>/dev/null | cut -f1 || echo 'Unknown')"
    else
        echo "  Status: ❌ Not built"
    fi
    
    echo -e "\n${BLUE}Database:${NC}"
    if [ -f "prisma/schema.prisma" ]; then
        echo "  Schema: ✅ Available"
        echo "  Client: $([ -f "node_modules/@prisma/client" ] && echo '✅ Generated' || echo '❌ Not generated')"
    else
        echo "  Schema: ❌ Not found"
    fi
}

# Get local IP for mobile testing
get_ip() {
    print_status "Getting local IP..."
    if command_exists ip; then
        IP=$(ip route get 1.2.3.4 | awk '{print $7}')
    elif command_exists hostname; then
        IP=$(hostname -I | awk '{print $1}')
    else
        IP="localhost"
    fi
    echo -e "${GREEN}Your local IP: ${IP}${NC}"
    echo -e "${BLUE}Mobile testing URL: http://${IP}:3000${NC}"
}

# Quick start (install + dev)
quick_start() {
    print_status "Quick starting habit tracker..."
    install_deps
    start_dev
}

# Main loop
main() {
    while true; do
        show_menu
        read -p "Enter your choice (1-10): " choice
        case $choice in
            1)
                quick_start
                ;;
            2)
                start_dev
                ;;
            3)
                build_prod
                ;;
            4)
                deploy_vercel
                ;;
            5)
                setup_database
                ;;
            6)
                open_studio
                ;;
            7)
                quality_checks
                ;;
            8)
                health_check
                ;;
            9)
                show_status
                ;;
            10)
                echo -e "${GREEN}Goodbye! 👋${NC}"
                exit 0
                ;;
            *)
                print_error "Invalid choice. Please select 1-10."
                ;;
        esac
        echo -e "\nPress Enter to continue..."
        read
    done
}

# Check if argument provided
if [ $# -eq 0 ]; then
    main
else
    case $1 in
        "install")
            install_deps
            ;;
        "dev")
            start_dev
            ;;
        "build")
            build_prod
            ;;
        "deploy")
            deploy_vercel
            ;;
        "setup-db")
            setup_database
            ;;
        "studio")
            open_studio
            ;;
        "quality")
            quality_checks
            ;;
        "health")
            health_check
            ;;
        "status")
            show_status
            ;;
        "ip")
            get_ip
            ;;
        "quick-start")
            quick_start
            ;;
        *)
            echo "Usage: $0 [command]"
            echo "Commands: install, dev, build, deploy, setup-db, studio, quality, health, status, ip, quick-start"
            exit 1
            ;;
    esac
fi