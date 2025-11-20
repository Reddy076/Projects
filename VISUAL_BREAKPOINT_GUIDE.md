# Visual Breakpoint Guide

## 📱 Responsive Design Overview

This guide shows how the application looks at different screen sizes.

---

## 🖥️ DESKTOP VIEW (> 1024px)

### Layout
```
┌─────────────────────────────────────────────────────┐
│ [☰] Corp Connect              [Corporation ▼] [🌙] │ Header
├──────────┬──────────────────────────────────────────┤
│          │  All Ballots                             │
│  SIDEBAR │  Manage ballots across all Owners...    │
│          │  [+ Create Ballot]                       │
│  User    │                                          │
│  Info    │  [Filter ▼]     [Search...]             │
│          │                                          │
│  Pod     │  [Active (0)] [Closed (0)] [Motions]    │
│  View    │                                          │
│          │  ┌────────────────────────────────────┐  │
│  • Pod   │  │ Corporation | Title | Status | ... │  │
│  • All   │  │ ─────────────────────────────────  │  │
│    Ballots│  │ (No ballots yet)                  │  │
│  • Disc. │  └────────────────────────────────────┘  │
│          │                                          │
│  Admin   │                                          │
│  • Users │                                          │
│  • Corps │                                          │
│          │                                          │
│  v1.0.0  │                                          │
└──────────┴──────────────────────────────────────────┘
```

### Key Features
✅ Sidebar always visible (230px width)
✅ Main content offset by sidebar width
✅ Toggle button hides/shows sidebar
✅ Full table layout visible
✅ Two-column forms in modals
✅ Side-by-side action buttons

---

## 📱 TABLET VIEW (768px - 1024px)

### Layout (Sidebar Closed)
```
┌─────────────────────────────────────┐
│ [☰] Corp Connect    [Corp ▼] [🌙] │ Header
├─────────────────────────────────────┤
│ All Ballots                         │
│ Manage ballots across all...       │
│ [+ Create Ballot]                   │
│                                     │
│ [Filter ▼]                          │
│ [Search................................]│
│                                     │
│ [Active (0)] [Closed (0)] [Motions]│
│                                     │
│ ┌─────────────────────────────────┐│
│ │ Corporation | Title | Status | │ │
│ │ ───────────────────────────────│ │
│ │ (No ballots yet)              │ │
│ └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### Layout (Sidebar Open)
```
┌───────────┬─────────────────────────┐
│           │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← Overlay
│ SIDEBAR   │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│           │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ User Info │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│           │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ • Pod View│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ • Ballots │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│           │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ Admin     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│           │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└───────────┴─────────────────────────┘
```

### Key Features
✅ Sidebar hidden by default
✅ Hamburger menu opens sidebar
✅ Dark semi-transparent overlay
✅ Click overlay to close
✅ Smooth slide-in animation
✅ Content uses full width
✅ Filters still horizontal

---

## 📱 MOBILE VIEW (375px - 768px)

### Layout (Portrait)
```
┌─────────────────────┐
│ [☰] Corp... [🌙]   │ Header (compact)
├─────────────────────┤
│ All Ballots         │
│ Manage ballots...   │
│                     │
│ [+ Create Ballot]   │ Full width button
│                     │
│ [Filter ▼]          │ Stacked filters
│ [Search...........]  │
│                     │
│ [Active] [Closed]   │ Scrollable tabs
│                     │
│ ┌─────────────────┐ │
│ │ Corp | Title |  │→│ Horizontal scroll
│ │ ───────────────│ │
│ │ (No ballots)   │ │
│ └─────────────────┘ │
└─────────────────────┘
```

### Modal View (Mobile)
```
┌─────────────────────┐
│ Create Ballot    [X]│ Smaller title
├─────────────────────┤
│ Corporation *       │
│ [Select Corp... ▼]  │ Full width
│                     │
│ Title *             │
│ [................] │ Full width
│                     │
│ Description         │
│ [................] │ Single column
│ [................] │
│                     │
│ Deadline *          │
│ [DD/MM/YYYY]        │
│                     │
│ Motions             │
│ [+ Add Motion]      │ Full width
│                     │
├─────────────────────┤
│ [Submit Ballot]     │ Stacked buttons
│ [Cancel]            │ (Submit on top)
└─────────────────────┘
```

### Key Features
✅ Sidebar: 280px width (max 85vw)
✅ Full-width buttons
✅ Stacked filter layout
✅ Horizontal scrolling tabs
✅ Horizontal scrolling tables
✅ Single-column forms
✅ Stacked modal buttons
✅ Compact padding/spacing
✅ 44px minimum touch targets

---

## 📱 SMALL MOBILE VIEW (≤ 480px)

### Layout (Very Compact)
```
┌───────────────┐
│[☰] Corp. [🌙]│ Extra compact
├───────────────┤
│ All Ballots   │
│ Manage...     │
│               │
│[+ Create]     │ Smaller text
│               │
│[Filter ▼]     │
│[Search...]    │
│               │
│[Act][Clo][Mot]│ Compact tabs
│               │
│┌─────────────┐│
││Corp|Title|→ ││ Scroll
│└─────────────┘│
└───────────────┘
```

### Key Features
✅ Minimal margins (10px)
✅ Smaller fonts (12-14px)
✅ Compact buttons
✅ Abbreviated text where needed
✅ Maximum space efficiency
✅ Still maintains usability

---

## 🎨 Visual Element Breakdown

### Sidebar Width
```
Desktop:    230px (fixed)
Tablet:     230px (overlay)
Mobile:     280px (overlay, max 85vw)
```

### Main Content Padding
```
Desktop:    32px
Tablet:     24px (20px sides)
Mobile:     16px (12px sides)
Small:      12px (10px sides)
```

### Font Sizes (Page Title)
```
Desktop:    28px
Tablet:     24px
Mobile:     22px
Small:      20px
```

### Button Sizes (Create Ballot)
```
Desktop:    auto width, 12px 24px padding
Tablet:     auto width, 12px 24px padding
Mobile:     100% width, 10px 16px padding
Small:      100% width, 9px 14px padding
```

### Modal Width
```
Desktop:    800px (fixed)
Tablet:     90% (max-width)
Mobile:     95% (max-width)
Small:      calc(100% - 20px)
```

---

## 📊 Breakpoint Summary Table

| Feature | Desktop | Tablet | Mobile | Small |
|---------|---------|---------|---------|-------|
| Sidebar | Always visible | Overlay | Overlay | Overlay |
| Sidebar Width | 230px | 230px | 280px | 280px |
| Overlay | No | Yes | Yes | Yes |
| Form Layout | 2 columns | 2 columns | 1 column | 1 column |
| Button Layout | Inline | Inline | Stacked | Stacked |
| Filters | Horizontal | Horizontal | Stacked | Stacked |
| Tables | Full | Full | H-Scroll | H-Scroll |
| Touch Targets | 36px+ | 40px+ | 44px+ | 44px+ |

---

## 🎭 Interaction Patterns

### Opening Sidebar
```
Desktop:
1. Click hamburger → Sidebar slides out
2. Content expands to full width

Mobile/Tablet:
1. Click hamburger → Overlay fades in
2. Sidebar slides in from left
3. Click overlay → Sidebar closes
```

### Table Scrolling
```
Desktop:
- Full table visible
- No scrolling needed

Mobile:
- Table has min-width: 800px
- Horizontal scroll enabled
- Swipe left/right to see columns
- Smooth scrolling
```

### Modal Behavior
```
Desktop:
- Center of screen
- Fixed width (800px)
- Form: 2 columns
- Buttons: Side by side

Mobile:
- Nearly full screen
- Width: 95%
- Form: 1 column
- Buttons: Stacked (full width)
```

---

## ✨ Animation Details

### Sidebar Animation
```css
transform: translateX(-100%); /* Closed */
transform: translateX(0);     /* Open */
transition: 0.3s ease;
```

### Overlay Animation
```css
opacity: 0;  /* Hidden */
opacity: 1;  /* Visible */
animation: fadeIn 0.3s ease forwards;
```

---

## 🎯 Testing Quick Reference

### Quick Test Points

**Desktop (1920px)**
- [ ] Sidebar visible
- [ ] Toggle works
- [ ] Full table visible

**Tablet (1024px)**
- [ ] Sidebar hidden
- [ ] Overlay works
- [ ] Responsive padding

**Mobile (375px)**
- [ ] Sidebar 280px
- [ ] Buttons full-width
- [ ] Tables scroll
- [ ] Single-column forms

**Small (320px)**
- [ ] Everything fits
- [ ] Text readable
- [ ] No overflow

---

## 📱 Current Application URL

**Running at:** http://localhost:5174/

**To test:**
1. Open browser
2. Go to the URL above
3. Open DevTools (F12)
4. Toggle Device Toolbar (Ctrl+Shift+M)
5. Try different screen sizes

---

## ✅ Implementation Complete!

All responsive features have been implemented and are ready for testing across:
- 🖥️ **Desktop computers**
- 📱 **Tablets**
- 📱 **Mobile phones**

**Enjoy your fully responsive application!** 🎉
