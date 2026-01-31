# PWA Testing Checklist

## 1. Basic Browser Testing
- [ ] Open http://localhost:3000 in Chrome/Firefox/Safari
- [ ] Verify all habits load correctly
- [ ] Test responsive design by resizing window
- [ ] Check mobile navigation appears at small screen sizes

## 2. PWA Features Testing

### Install PWA
- [ ] Open Chrome DevTools (F12)
- [ ] Go to Application tab → Manifest
- [ ] Click "Add to homescreen"
- [ ] Verify app installs and opens in standalone mode

### Service Worker Testing
- [ ] Open Chrome DevTools → Application → Service Workers
- [ ] Verify service worker is "activated and is running"
- [ ] Test offline functionality:
  - Open DevTools → Network → Offline mode
  - Refresh page and verify it still works

## 3. Mobile Testing

### Chrome DevTools Mobile
- [ ] Open DevTools → Toggle device toolbar
- [ ] Test on iPhone 12, Galaxy S20, iPad
- [ ] Verify touch interactions work
- [ ] Test bottom navigation on mobile

### Real Device Testing
- [ ] On mobile device, open http://localhost:3000 (use your local IP)
- [ ] Test "Add to Home Screen" on iOS/Android
- [ ] Verify app works as standalone PWA

## 4. API Testing

### Test with curl or Postman
```bash
# Get all habits
curl http://localhost:3000/api/habits

# Create a new habit
curl -X POST http://localhost:3000/api/habits \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Habit","description":"Test description"}'
```

## 5. Performance Testing

### Lighthouse Audit
- [ ] Open Chrome DevTools → Lighthouse
- [ ] Run performance audit
- [ ] Aim for:
  - Performance > 90
  - PWA > 90
  - Accessibility > 90

## 6. Cross-browser Testing
- [ ] Chrome/Edge: Full PWA support
- [ ] Firefox: Basic PWA features
- [ ] Safari: Limited PWA support

## 7. Edge Cases Testing
- [ ] Test with no internet connection
- [ ] Test with slow network (3G mode in DevTools)
- [ ] Test app lifecycle (background/foreground)
- [ ] Test notification permissions (when implemented)