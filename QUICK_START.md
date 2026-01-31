# Habit Tracker PWA - Quick Start Guide

## 🚀 **One-Command Development**

### Install Just (if not installed)
```bash
# macOS
brew install just

# Ubuntu/Debian
sudo apt install just

# Or with cargo
cargo install just
```

### Quick Start Commands
```bash
# Install dependencies and start dev
just quick-start

# Development server
just dev

# Production build
just build

# Deploy to Vercel
just deploy

# Quality checks
just health-check

# Database operations
just setup-db
just studio
just seed-db
```

## 📋 **Available Just Commands**

### **Development**
- `just install` - Install all dependencies
- `just dev` - Start development server
- `just build` - Build for production
- `just test` - Run test suite
- `just lint` - Run linter
- `just type-check` - TypeScript type checking

### **Database**
- `just setup-db` - Setup and migrate database
- `just studio` - Open Prisma Studio
- `just seed-db` - Seed with sample data
- `just migrate` - Run database migrations

### **Deployment**
- `just deploy` - Deploy to Vercel
- `just health-check` - Verify build health
- `just predeploy` - Run pre-deployment checks

### **Quality & Tools**
- `just quality` - Run all quality checks
- `just format` - Format code with Prettier
- `just lighthouse` - Run Lighthouse audit
- `just analyze` - Analyze bundle size

### **Workflow**
- `just commit` - Git commit with message
- `just push` - Push to GitHub
- `just update` - Pull and install updates
- `just release` - Create new release

## 🎯 **Example Workflow**

```bash
# New feature development
just setup-db     # Setup database
just dev           # Start development
# ...make changes...
just quality       # Run quality checks
just commit        # Commit changes
just push          # Push to GitHub
just deploy        # Deploy to production
```

## 📱 **Mobile Testing**

```bash
# Find your IP for mobile testing
just ip

# Start dev server
just dev

# On mobile: http://YOUR_IP:3000
```

## 🔍 **Project Status**

```bash
just status
```

## 🛠️ **Advanced Automation**

### Docker Development
```bash
just docker-build
just docker-run
```

### Performance Monitoring
```bash
just perf          # Check bundle size
just lighthouse    # Run performance audit
just audit         # Security audit
```

### Database Management
```bash
just backup-db     # Create backup
just db-reset      # Reset database
just migration name # Create named migration
```

**With Just, you can manage your entire development workflow with simple, memorable commands!** 🚀