import React from 'react'
import { USER_INFO, APP_VERSION } from '../../constants'
import Icon from '../common/Icon'
import '../../styles/NavigationSidebar.css'

/**
 * NavigationSidebar Component
 * 
 * Main navigation sidebar containing:
 * - User profile information
 * - Pod View navigation links
 * - Property View navigation links
 * - Administration navigation links
 * - App version information
 * 
 * Features:
 * - Responsive design (slides in/out on mobile)
 * - Active state highlighting
 * - Organized into logical sections
 * 
 * @param {boolean} isOpen - Controls sidebar visibility
 * @param {Function} onClose - Callback to close sidebar (used on mobile)
 */
const NavigationSidebar = React.memo(({ isOpen, onClose }) => {
  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle navigation item click
   * @param {string} itemName - Name of the navigation item
   */
  const handleNavItemClick = (itemName) => {
    try {
      console.log('Navigating to:', itemName)
      // In a real app, this would handle routing
      // For now, just log the action
      
      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768 && onClose) {
        onClose()
      }
    } catch (error) {
      console.error('Error handling navigation:', error)
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} role="navigation" aria-label="Main navigation">
      {/* User Profile Section */}
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="user-avatar" aria-label={`${USER_INFO.name} avatar`}>
            {USER_INFO.initials}
          </div>
          <div className="user-info">
            <h3 className="user-name">{USER_INFO.name}</h3>
            <p className="user-location">{USER_INFO.location}</p>
          </div>
        </div>
        <span className="pod-leader-badge">{USER_INFO.role}</span>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {/* Pod View Section */}
        <div className="nav-section">
          <h4 className="nav-section-title">Pod View</h4>
          <ul className="nav-list">
            <li className="nav-item" onClick={() => handleNavItemClick('Pod Overview')}>
              <Icon name="grid" className="nav-icon" size={20} />
              <span>Pod Overview</span>
            </li>
            <li className="nav-item active" onClick={() => handleNavItemClick('All Ballots')}>
              <Icon name="ballot" className="nav-icon" size={20} />
              <span>All Ballots</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('All Discussions')}>
              <Icon name="message" className="nav-icon" size={20} />
              <span>All Discussions</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('All Key Dates')}>
              <Icon name="calendar" className="nav-icon" size={20} />
              <span>All Key Dates</span>
            </li>
          </ul>
        </div>

        {/* Property View Section */}
        <div className="nav-section">
          <h4 className="nav-section-title">Property View</h4>
          <ul className="nav-list">
            <li className="nav-item" onClick={() => handleNavItemClick('Overview')}>
              <Icon name="home" className="nav-icon" size={20} />
              <span>Overview</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('Key Dates')}>
              <Icon name="calendar" className="nav-icon" size={20} />
              <span>Key Dates</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('Ballots')}>
              <Icon name="ballot" className="nav-icon" size={20} />
              <span>Ballots</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('Discussions')}>
              <Icon name="message" className="nav-icon" size={20} />
              <span>Discussions</span>
            </li>
          </ul>
        </div>

        {/* Administration Section */}
        <div className="nav-section">
          <h4 className="nav-section-title">Administration</h4>
          <ul className="nav-list">
            <li className="nav-item" onClick={() => handleNavItemClick('User Management')}>
              <Icon name="users" className="nav-icon" size={20} />
              <span>User Management</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('Owners Corporations')}>
              <Icon name="home" className="nav-icon" size={20} />
              <span>Owners Corporations</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('Templates')}>
              <Icon name="mail" className="nav-icon" size={20} />
              <span>Templates</span>
            </li>
            <li className="nav-item" onClick={() => handleNavItemClick('Settings')}>
              <Icon name="settings" className="nav-icon" size={20} />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Footer with Version */}
      <div className="sidebar-footer">
        <span className="version-text">Client Portal {APP_VERSION}</span>
      </div>
    </aside>
  )
})

NavigationSidebar.displayName = 'NavigationSidebar'

export default NavigationSidebar
