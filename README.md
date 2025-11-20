# Ballot Management System - Corp Connect

A modern ballot management application built with **React**, **Vite**, and **CSS** (no frameworks like Tailwind). This is an exact replica of the design provided in the reference image.

## ✅ Status: RUNNING

Your application is currently running at: **http://localhost:5173**

---

## 🎨 Features

### Implemented from Design
- ✅ **Left Sidebar Navigation**
  - User profile with avatar (David Brown)
  - Pod Leader badge
  - Pod View section (Pod Overview, All Ballots, All Discussions, All Key Dates)
  - Property View section (Overview, Key Dates, Ballots, Discussions)
  - Active state highlighting

- ✅ **Top Header**
  - Corporation selector dropdown (Riverside Towers OC)
  - Dark mode toggle button
  - Responsive menu button for mobile

- ✅ **Main Content Area**
  - "All Ballots" heading with subtitle
  - "Create Ballot" button (dark themed)
  - Corporation filter dropdown
  - Search bar with icon
  - Tabs: Active (0), Closed (0), Motions
  - Data table with columns: Corporation, Title, Status, Participation, Deadline, Action
  - Sortable column headers
  - Empty state message
  - Footer with "Flameshot" branding

- ✅ **Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Collapsible sidebar on mobile

---

## 📂 Project Structure

```
ballot-management/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Left navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── Header.jsx           # Top header with corporation selector
│   │   ├── Header.css
│   │   ├── MainContent.jsx      # Main ballot management area
│   │   └── MainContent.css
│   ├── App.jsx                  # Main application component
│   ├── App.css
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and CSS variables
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies (already done)
npm install

# Start development server (already running)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🎨 Customization Guide

### Change Colors
Edit `src/index.css` and modify CSS variables:
```css
:root {
  --primary-color: #4F46E5;
  --orange-color: #F97316;
  --background: #F3F4F6;
  --surface: #FFFFFF;
  /* ... more variables */
}
```

### Add Sample Ballot Data
Edit `src/App.jsx` and initialize the ballots state with sample data:
```javascript
const [ballots, setBallots] = useState([
  {
    id: 1,
    corporation: 'Riverside Towers OC',
    title: 'Annual Budget Approval',
    status: 'active',
    participation: '75%',
    deadline: '2024-12-31'
  },
  // Add more ballots...
])
```

### Modify User Profile
Edit `src/components/Sidebar.jsx`:
```javascript
<div className="user-avatar">DB</div>
<h3 className="user-name">David Brown</h3>
<p className="user-location">Riverside Towers OC</p>
```

---

## 🎯 Key Components

### Sidebar Component
- Fixed position navigation
- User profile section
- Two navigation sections: Pod View and Property View
- Active state highlighting
- Responsive collapse on mobile

### Header Component
- Corporation selector dropdown
- Dark mode toggle
- Responsive menu button

### MainContent Component
- Page title and subtitle
- Create Ballot button
- Filter and search functionality
- Tab navigation (Active, Closed, Motions)
- Data table with sortable columns
- Empty state display

---

## 🎨 Design Tokens

### Colors
- **Primary**: #4F46E5 (Indigo)
- **Orange**: #F97316 (Pod Leader badge)
- **Success**: #10B981 (Green)
- **Danger**: #EF4444 (Red)
- **Background**: #F3F4F6 (Light gray)
- **Surface**: #FFFFFF (White)
- **Text Primary**: #111827 (Dark gray)
- **Text Secondary**: #6B7280 (Medium gray)

### Typography
- **Font Family**: System font stack (San Francisco, Segoe UI, Roboto, etc.)
- **Heading**: 28px, 700 weight
- **Body**: 14-15px, 400-500 weight
- **Small**: 12-13px

### Spacing
- **Container Padding**: 32px (desktop), 20px (mobile)
- **Section Gap**: 24-32px
- **Element Gap**: 12-16px

---

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (full sidebar visible)
- **Tablet/Mobile**: ≤ 768px (collapsible sidebar)

---

## 🔧 Technical Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **CSS3** - Styling (no CSS frameworks)
- **SVG Icons** - Inline SVG for icons
- **CSS Variables** - Theming support

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```
This creates an optimized build in the `dist` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
# or drag and drop the dist folder to netlify.com
```

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

---

## 📋 Features to Add (Optional Enhancements)

- [ ] Backend API integration
- [ ] Real ballot data management
- [ ] Create ballot modal/form
- [ ] Edit/delete ballot functionality
- [ ] User authentication
- [ ] Real-time updates
- [ ] Export to PDF/CSV
- [ ] Email notifications
- [ ] Advanced filtering and sorting
- [ ] Ballot voting interface
- [ ] Discussion threads
- [ ] File attachments
- [ ] Analytics dashboard

---

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
# Change port in vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --debug
```

---

## 📞 Support

For issues or questions:
1. Check the console for errors (F12 in browser)
2. Review the component files for customization
3. Check Vite documentation: https://vitejs.dev
4. Check React documentation: https://react.dev

---

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React + Vite**

🌐 **Access your app at: http://localhost:5173**
