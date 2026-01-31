#!/bin/bash

echo "🧪 Testing Habit Tracker PWA..."
echo ""

# Test if server is running
echo "1. Testing server response..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Server is running"
else
    echo "❌ Server is not running"
    exit 1
fi

# Test API endpoints
echo ""
echo "2. Testing API endpoints..."
if curl -s http://localhost:3000/api/habits | grep -q "title"; then
    echo "✅ Habits API working"
else
    echo "❌ Habits API failed"
fi

# Test PWA manifest
echo ""
echo "3. Testing PWA manifest..."
if curl -s http://localhost:3000/manifest.json | grep -q "Habit Tracker"; then
    echo "✅ PWA manifest available"
else
    echo "❌ PWA manifest not found"
fi

# Test service worker
echo ""
echo "4. Testing service worker..."
if curl -s http://localhost:3000/sw.js | grep -q "Service Worker"; then
    echo "✅ Service worker file available"
else
    echo "❌ Service worker not found"
fi

echo ""
echo "🎉 Basic testing complete!"
echo ""
echo "Next steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Open Chrome DevTools → Lighthouse → Run audit"
echo "3. Test on mobile devices"