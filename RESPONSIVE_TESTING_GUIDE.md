# Responsive Design Testing Guide

## Quick Test Checklist

### How to Test in Browser

#### Chrome/Edge DevTools
1. Press `F12` or `Ctrl+Shift+I` to open DevTools
2. Press `Ctrl+Shift+M` to toggle device toolbar
3. Select different devices from dropdown or set custom dimensions

#### Firefox DevTools
1. Press `F12` to open DevTools
2. Click the "Responsive Design Mode" icon
3. Choose device presets or custom dimensions

### Recommended Test Dimensions

#### Desktop
- **1920x1080** - Full HD monitor
- **1366x768** - Laptop standard
- **1440x900** - MacBook Pro

#### Tablet
- **1024x768** - iPad Landscape
- **768x1024** - iPad Portrait
- **820x1180** - iPad Air
- **800x1280** - Android Tablet

#### Mobile
- **375x667** - iPhone SE
- **390x844** - iPhone 12/13
- **414x896** - iPhone 11/XR
- **360x640** - Android (Common)
- **320x568** - iPhone 5/SE (Small)

## Feature Testing Scenarios

### 1. Sidebar Navigation
**Desktop (>1024px)**
- [ ] Sidebar is visible on page load
- [ ] Clicking hamburger menu hides sidebar
- [ ] Content area expands when sidebar is hidden

**Tablet/Mobile (≤1024px)**
- [ ] Sidebar is hidden on page load
- [ ] Clicking hamburger menu shows sidebar
- [ ] Dark overlay appears behind sidebar
- [ ] Clicking overlay closes sidebar
- [ ] Sidebar slides smoothly from left
- [ ] Sidebar width is appropriate (not too wide)

### 2. Header Area
**All Screens**
- [ ] Header is visible and not cut off
- [ ] Corporation selector works properly
- [ ] Dark mode toggle is accessible

**Mobile (≤768px)**
- [ ] Corporation name truncates with ellipsis if too long
- [ ] All buttons are at least 44px for touch
- [ ] No horizontal scrolling

### 3. Ballot List (Main Content)
**Desktop**
- [ ] Full table is visible
- [ ] All columns display properly
- [ ] "Create Ballot" button is properly sized

**Tablet**
- [ ] Table may require slight horizontal scroll
- [ ] Filters are usable
- [ ] Search box is full-width

**Mobile (≤768px)**
- [ ] "Create Ballot" button is full-width
- [ ] Filters stack vertically
- [ ] Search box is full-width
- [ ] Tabs scroll horizontally if needed
- [ ] Table scrolls horizontally
- [ ] All table data is accessible

### 4. Create Ballot Modal
**Desktop**
- [ ] Modal is centered
- [ ] Form has two-column layout
- [ ] Footer buttons are side-by-side

**Mobile (≤768px)**
- [ ] Modal takes most of screen width
- [ ] Form is single-column layout
- [ ] Footer buttons are full-width and stacked
- [ ] Cancel button is below Submit button
- [ ] All inputs are easily tappable
- [ ] Modal is scrollable if content is long

### 5. Dropdowns and Selects
**All Screens**
- [ ] Corporation dropdown opens properly
- [ ] Multi-select dropdown works
- [ ] Dropdowns don't go off-screen

**Mobile**
- [ ] Dropdowns are touch-friendly
- [ ] Checkboxes are large enough
- [ ] Search input in dropdown works

## Common Issues to Check

### Layout Issues
- [ ] No horizontal scrolling (except tables on mobile)
- [ ] No content cut off at edges
- [ ] Proper padding and spacing
- [ ] Text is readable (not too small)

### Interaction Issues
- [ ] All buttons are clickable/tappable
- [ ] Touch targets are at least 44px
- [ ] No accidental clicks due to small targets
- [ ] Smooth animations and transitions

### Visual Issues
- [ ] Colors and contrast are maintained
- [ ] Icons are properly sized
- [ ] Borders and shadows look correct
- [ ] Dark mode works on all screen sizes

## Testing on Real Devices

### iOS Devices
1. Make sure app is running: `http://localhost:5173/`
2. Find your computer's IP address
3. On iPhone/iPad, open Safari
4. Navigate to `http://[YOUR_IP]:5173/`

### Android Devices
1. Make sure app is running
2. Find your computer's IP address
3. On Android device, open Chrome
4. Navigate to `http://[YOUR_IP]:5173/`
5. May need to allow network access in firewall

### Quick IP Address Check
**Windows**: Run `ipconfig` in Command Prompt
**Mac/Linux**: Run `ifconfig` or `ip addr` in Terminal

## Orientation Testing

### Portrait Mode
- [ ] Sidebar works in portrait
- [ ] All content is accessible
- [ ] No elements overlapping

### Landscape Mode
- [ ] More content visible
- [ ] Table easier to view
- [ ] Sidebar still functions correctly

## Browser Testing

Test on multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Performance Checks

- [ ] Animations are smooth (60fps)
- [ ] No janky scrolling
- [ ] Sidebar transition is smooth
- [ ] Modal open/close is smooth
- [ ] No layout shift on resize

## Accessibility Testing

- [ ] Tab navigation works on all screen sizes
- [ ] Focus indicators are visible
- [ ] ARIA labels are present
- [ ] Screen reader compatible
- [ ] Zoom works properly (up to 200%)

## Quick Test Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## DevTools Responsive Testing Tips

1. **Use Device Toolbar**: Shows common device dimensions
2. **Rotate Device**: Test portrait and landscape
3. **Network Throttling**: Test on slower connections
4. **Touch Simulation**: Enable to test touch interactions
5. **Screenshot**: Capture different breakpoints

## Breakpoint Quick Reference

```
Small Mobile:  ≤ 480px
Mobile:        481px - 768px
Tablet:        769px - 1024px
Desktop:       > 1024px
```

## Sign-off Checklist

Before marking responsive design as complete:

- [ ] Tested on desktop (>1024px)
- [ ] Tested on tablet (768-1024px)
- [ ] Tested on mobile (<=768px)
- [ ] Tested on small mobile (<=480px)
- [ ] Tested sidebar on all breakpoints
- [ ] Tested all modals on all breakpoints
- [ ] Tested forms on mobile
- [ ] Tested tables on mobile
- [ ] No horizontal overflow anywhere
- [ ] All touch targets meet 44px guideline
- [ ] Animations are smooth
- [ ] Dark mode works on all sizes
- [ ] Tested on real devices (if possible)

## Current Status

✅ **Application is running at:** http://localhost:5173/

**Last Updated:** Today
**Status:** Ready for testing
