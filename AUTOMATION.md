# 🤖 Automation Guide for Habit Tracker PWA

## 📋 **Available Automation Tools**

### **1. Justfile (Recommended)**
Modern, cross-platform task runner with simple commands.

```bash
# Install just (if needed)
brew install just  # macOS
sudo apt install just  # Ubuntu
cargo install just       # Cargo

# Use just commands
just dev              # Start development
just build            # Build production
just deploy            # Deploy to Vercel
just health-check      # Run all health checks
just quick-start       # Install + start dev
```

### **2. Shell Script (./dev.sh)**
Interactive menu system for development workflows.

```bash
# Interactive mode
./dev.sh

# Direct commands
./dev.sh dev           # Start development
./dev.sh build         # Build production
./dev.sh deploy        # Deploy to Vercel
./dev.sh health-check   # Run health checks
./dev.sh ip            # Get local IP for mobile testing
```

### **3. Makefile**
Traditional make commands for Unix systems.

```bash
make dev              # Start development
make build            # Build production
make deploy            # Deploy to Vercel
make health-check      # Run health checks
make quality          # Run quality checks
```

## 🚀 **Quick Start Commands**

### **Option 1: Justfile (Easiest)**
```bash
just quick-start    # Install dependencies + start dev
```

### **Option 2: Shell Script (Interactive)**
```bash
./dev.sh          # Shows interactive menu
./dev.sh quick-start  # Direct quick start
```

### **Option 3: Makefile (Traditional)**
```bash
make quick          # Install dependencies + start dev
```

## 📱 **Mobile Testing Automation**

```bash
# Get your local IP for mobile testing
./dev.sh ip      # Using shell script
just ip            # Using justfile
```

Then on your mobile device: `http://YOUR_IP:3000`

## 🛠️ **Development Workflow Automation**

### **Feature Development Cycle**
```bash
# Using just
just quality        # Run quality checks
just commit         # Commit with message
just push           # Push to GitHub
just deploy         # Deploy to production

# Using make
make workflow       # Install + dev
make release       # Full release cycle
```

### **Database Operations**
```bash
# Setup and migrate
just setup-db       # Using just
make setup-db        # Using make

# Open admin interface
just studio          # Prisma Studio
make studio           # Using make

# Seed with sample data
just seed-db         # Using just
make seed-db          # Using make
```

### **Quality Assurance**
```bash
# Comprehensive checks
just health-check    # Using just
make health-check      # Using make

# Individual checks
just lint           # Linting
just type-check     # TypeScript
just build           # Build test
```

## 📊 **Project Monitoring**

### **Status Dashboard**
```bash
just status          # Using just
./dev.sh status     # Using shell script
```

### **Performance Analysis**
```bash
just lighthouse      # Run Lighthouse audit
just analyze         # Bundle size analysis
make audit           # Security audit
```

## 🐳 **Docker Development**

```bash
# Build and run with Docker
just docker-build     # Using just
make docker-build      # Using make

just docker-run      # Using just
make docker-run       # Using make
```

## 🔄 **CI/CD Automation**

### **Pre-commit Hooks**
```bash
# Auto-run before commits
npm run pre-commit   # Lint + type-check
```

### **Deployment Pipeline**
```bash
# Full deployment workflow
make production     # Using make
just release         # Using just
```

## 🎯 **Recommended Workflow**

### **Daily Development**
```bash
./dev.sh          # Interactive menu
just dev           # Direct start
```

### **Feature Development**
```bash
just quality        # Ensure code quality
just dev           # Start dev
# ...make changes...
just commit        # Commit changes
just push          # Deploy
```

### **Production Deployment**
```bash
just health-check   # Verify everything
just deploy         # Deploy to production
```

## ⚡ **Productivity Tips**

### **Single Commands**
```bash
# Instead of multiple npm commands:
npm install && npm run build && npm run start
# Use:
just quick-start
```

### **Interactive Development**
```bash
# Get menu-driven workflow:
./dev.sh
# Choose from numbered options
```

### **Error Prevention**
```bash
# Quality checks prevent issues:
just health-check   # Before commits
just quality        # Before deployment
```

## 🎉 **Benefits**

- **Speed**: One-command setup and deployment
- **Consistency**: Standardized development workflow
- **Quality**: Automated checks prevent issues
- **Flexibility**: Multiple tools (just/make/shell)
- **Mobile**: Easy IP detection for testing
- **Monitoring**: Built-in status and health checks

**Choose your preferred automation tool and streamline your development!** 🚀