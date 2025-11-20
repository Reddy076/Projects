/**
 * Main Entry Point
 * 
 * This is the root file for the React application.
 * It renders the App component wrapped in necessary providers.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './styles/global.css'

// Get the root DOM element
const rootElement = document.getElementById('root')

// Verify root element exists
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a <div id="root"></div> in your HTML.')
}

try {
  // Create React root and render the application
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* ThemeProvider wraps the entire app to provide theme context */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Failed to render application:', error)
  // Display error message to user
  rootElement.innerHTML = `
    <div style="padding: 2rem; text-align: center; font-family: system-ui, -apple-system, sans-serif;">
      <h1 style="color: #e74c3c;">Application Error</h1>
      <p>Failed to load the application. Please refresh the page or contact support.</p>
      <details style="margin-top: 1rem; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
        <summary style="cursor: pointer; font-weight: bold;">Error Details</summary>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">${error.message}</pre>
      </details>
    </div>
  `
}
