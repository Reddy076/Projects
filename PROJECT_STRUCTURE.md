# Corp Connect - Project Structure Documentation

## 📁 Optimized Folder Structure

```
Reddy/
├── public/                          # Static assets
├── src/
│   ├── components/                  # React components organized by feature
│   │   ├── layout/                 # Layout components
│   │   │   ├── NavigationSidebar.jsx    # Left navigation panel (formerly Sidebar)
│   │   │   └── AppHeader.jsx            # Top header with corporation selector (formerly Header)
│   │   ├── ballot/                 # Ballot-related components
│   │   │   ├── BallotList.jsx           # Main ballot listing page (formerly MainContent)
│   │   │   └── BallotCreationModal.jsx  # Multi-step ballot creation wizard (formerly CreateBallotModal)
│   │   └── common/                 # Reusable common components
│   │       └── MultiSelectDropdown.jsx  # Multi-select dropdown component (formerly CorporationMultiSelect)
│   ├── context/                     # React Context providers
│   │   └── ThemeContext.jsx            # Dark mode theme management
│   ├── styles/                      # All CSS stylesheets (centralized)
│   │   ├── global.css                  # Global styles and CSS variables (formerly index.css)
│   │   ├── App.css                     # App root styles
│   │   ├── NavigationSidebar.css       # Sidebar styles (formerly Sidebar.css)
│   │   ├── AppHeader.css               # Header styles (formerly Header.css)
│   │   ├── BallotList.css              # Ballot list styles (formerly MainContent.css)
│   │   ├── BallotCreationModal.css     # Modal styles (formerly CreateBallotModal.css)
│   │   └── MultiSelectDropdown.css     # Dropdown styles (formerly CorporationMultiSelect.css)
│   ├── App.jsx                      # Root component
│   └── main.jsx                     # React entry point
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite configuration
├── README.md                        # Project documentation
├── QUICK_START.md                   # Quick start guide
└── PROJECT_STRUCTURE.md             # This file

```

## 🎯 Component Naming Conventions

### Before → After Renaming

| Old Name | New Name | Purpose |
|----------|----------|---------|
| `Sidebar.jsx` | `NavigationSidebar.jsx` | More descriptive - indicates it's for navigation |
| `Header.jsx` | `AppHeader.jsx` | Clarifies it's the application header |
| `MainContent.jsx` | `BallotList.jsx` | Reflects actual functionality - displays ballot list |
| `CreateBallotModal.jsx` | `BallotCreationModal.jsx` | More professional naming convention |
| `CorporationMultiSelect.jsx` | `MultiSelectDropdown.jsx` | More generic and reusable name |

## 📂 Component Organization

### Layout Components (`components/layout/`)
Components that define the main application structure:
- **NavigationSidebar**: Fixed left navigation panel with user profile and menu items
- **AppHeader**: Top header with corporation selector and dark mode toggle

### Ballot Components (`components/ballot/`)
Components specific to ballot functionality:
- **BallotList**: Main view showing active/closed ballots and motions
- **BallotCreationModal**: Multi-step wizard for creating new ballots

### Common Components (`components/common/`)
Reusable components that can be used across the application:
- **MultiSelectDropdown**: Generic multi-select dropdown with search functionality

## 🎨 Styles Organization

All CSS files are now centralized in the `src/styles/` folder with matching component names:

### Global Styles
- **global.css**: CSS variables, reset styles, utility classes, and global typography

### Component Styles
Each component has a corresponding CSS file with the same base name:
- NavigationSidebar.jsx → NavigationSidebar.css
- AppHeader.jsx → AppHeader.css
- BallotList.jsx → BallotList.css
- BallotCreationModal.jsx → BallotCreationModal.css
- MultiSelectDropdown.jsx → MultiSelectDropdown.css

### Import Pattern
```jsx
import '../../styles/ComponentName.css'
```

## 🔄 Import Structure

### Root Level (App.jsx)
```jsx
import NavigationSidebar from './components/layout/NavigationSidebar'
import AppHeader from './components/layout/AppHeader'
import BallotList from './components/ballot/BallotList'
import './styles/App.css'
```

### Component Level (BallotList.jsx)
```jsx
import MultiSelectDropdown from '../common/MultiSelectDropdown'
import BallotCreationModal from './BallotCreationModal'
import '../../styles/BallotList.css'
```

### Entry Point (main.jsx)
```jsx
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './styles/global.css'
```

## 🏗️ Architecture Benefits

### 1. Better Organization
- Components grouped by functionality (layout, ballot, common)
- Easy to locate and maintain related components
- Clear separation of concerns

### 2. Scalability
- Easy to add new features in appropriate folders
- Common components can be reused across features
- Style files are centralized and organized

### 3. Maintainability
- Clear naming conventions make code self-documenting
- Related files are co-located
- Easier onboarding for new developers

### 4. Reusability
- Common components can be imported from a single location
- Styles can be shared using CSS variables in global.css
- Context providers can be easily extended

## 📝 Component Responsibilities

### NavigationSidebar
- Display user profile information
- Render navigation menu with sections (Pod View, Property View, Administration)
- Handle active state for current page
- Responsive collapse/expand behavior

### AppHeader
- Corporation selector dropdown
- Dark mode toggle
- Sidebar toggle button (mobile)
- Responsive layout adjustments

### BallotList
- Display ballot listing with tabs (Active, Closed, Motions)
- Filter ballots by corporation
- Search functionality
- Open ballot creation modal
- Show empty states

### BallotCreationModal
- 4-step wizard interface
- Form validation
- Motion management
- File upload handling
- Draft saving functionality

### MultiSelectDropdown
- Multi-selection with checkboxes
- Search/filter functionality
- Selected items display
- Clear all/individual remove options
- Click-outside-to-close behavior

## 🎨 Design System

### CSS Variables (in global.css)
```css
:root {
  /* Colors */
  --primary: #4F46E5;
  --primary-hover: #4338CA;
  --success: #10B981;
  --danger: #EF4444;
  --orange: #F97316;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Borders */
  --border-radius: 8px;
  --border-color: #E5E7EB;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Dark Mode Support
Dark mode variables are automatically applied when `.dark-mode` class is present on document root.

## 🚀 Development Workflow

### Adding a New Component

1. **Determine the category:**
   - Layout component? → `components/layout/`
   - Feature-specific? → `components/[feature-name]/`
   - Reusable utility? → `components/common/`

2. **Create the component file:**
   ```jsx
   // src/components/category/ComponentName.jsx
   import React from 'react'
   import '../../styles/ComponentName.css'
   
   function ComponentName() {
     return <div>Component Content</div>
   }
   
   export default ComponentName
   ```

3. **Create the corresponding CSS file:**
   ```css
   /* src/styles/ComponentName.css */
   .component-name {
     /* styles */
   }
   ```

4. **Import and use:**
   ```jsx
   import ComponentName from './components/category/ComponentName'
   ```

### Adding Shared Styles

Add shared CSS variables or utility classes to `global.css`:
```css
/* global.css */
.utility-class {
  /* shared styles */
}
```

## 🧪 Testing Structure (Future)

```
src/
├── components/
│   ├── layout/
│   │   ├── NavigationSidebar.jsx
│   │   └── __tests__/
│   │       └── NavigationSidebar.test.jsx
```

## 📦 Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── index.html
```

## 🔧 Configuration Files

- **vite.config.js**: Build configuration
- **package.json**: Dependencies and scripts
- **.gitignore**: Files to exclude from version control

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS-Tricks](https://css-tricks.com/)

## 🎯 Next Steps

1. ✅ Reorganize components by feature
2. ✅ Centralize styles in styles folder
3. ✅ Update imports across the application
4. ✅ Apply consistent naming conventions
5. ⏳ Add TypeScript support (future)
6. ⏳ Implement unit tests (future)
7. ⏳ Add API integration (future)
8. ⏳ Implement state management (Redux/Zustand) (future)

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd")
**Version:** 2.0.0
**Author:** Rovo Dev
