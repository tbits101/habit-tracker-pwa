# 🎯 Automation Usage Examples

## **Just Get Started (3 seconds)**

### **Option 1: Justfile (Recommended)**
```bash
just quick-start
# This will: install deps + start dev server
```

### **Option 2: Interactive Menu**
```bash
./dev.sh
# Shows menu: 1) Quick Start, 2) Dev Server, 3) Build, etc.
```

### **Option 3: Traditional Make**
```bash
make quick
# Traditional make commands
```

## **Daily Development Workflow**

### **Morning Setup**
```bash
just dev              # Start development day
# or interactive:
./dev.sh              # Choose from menu
```

### **Feature Development**
```bash
just quality            # Check code quality
just dev               # Start coding
# ...work on features...
just commit             # Commit changes
just push               # Push to GitHub
```

### **Before Deployment**
```bash
just health-check       # Verify everything works
# This runs: type-check + lint + build
```

### **Deploy to Production**
```bash
just deploy             # Deploy to Vercel
# One-command deployment!
```

## **Testing on Mobile**

```bash
# Get your IP for mobile testing
./dev.sh ip
# Output: Your local IP: 192.168.1.141
#         Mobile testing URL: http://192.168.1.141:3000
```

## **Database Management**

```bash
just setup-db          # Initial database setup
just studio             # Open Prisma Studio (GUI)
just seed-db            # Add sample data
```

## **Quick Commands Reference**

| Command | What it does | When to use |
|---------|----------------|--------------|
| `just dev` | Start development server | Daily coding |
| `just build` | Build for production | Before deploy |
| `just deploy` | Deploy to Vercel | Ready to ship |
| `just health-check` | Run quality checks | Before commits |
| `just quality` | Run all quality tools | Pre-release |
| `./dev.sh` | Interactive menu | Exploring options |
| `make dev` | Traditional make command | Unix preference |

## **Productivity Examples**

### **Instead of:**
```bash
npm install --legacy-peer-deps
npm run dev
```

### **Use:**
```bash
just quick-start
# or
./dev.sh quick-start
```

### **Instead of:**
```bash
npm run lint
npm run type-check
npm run build
```

### **Use:**
```bash
just health-check
# or
make health-check
```

## **Mobile Development Setup**

### **Step 1: Start Development**
```bash
just dev
```

### **Step 2: Get IP**
```bash
./dev.sh ip
# Note your IP address
```

### **Step 3: Test on Phone**
1. Connect phone to same WiFi
2. Open browser to `http://YOUR_IP:3000`
3. Test PWA features

## **Team Collaboration**

### **Onboarding New Developer**
```bash
git clone https://github.com/tbits101/habit-tracker-pwa.git
cd habit-tracker-pwa
just quick-start
# They're ready in 30 seconds!
```

### **Code Review Checklist**
```bash
just quality            # Automated quality checks
# Then do manual code review
just deploy             # Deploy if approved
```

## **Troubleshooting**

### **Build Issues**
```bash
just health-check       # Diagnose problems
# or
./dev.sh health-check   # Interactive diagnosis
```

### **Database Issues**
```bash
just setup-db          # Reset database
just studio             # Inspect database
```

### **Performance Issues**
```bash
just lighthouse         # Performance audit
just analyze            # Bundle analysis
```

**Start using these commands and you'll develop 10x faster!** 🚀