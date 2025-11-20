import React from 'react'
import { USER_INFO, APP_VERSION } from '../../constants'
import Icon from '../common/Icon'
import '../../styles/NavigationSidebar.css'

const NavigationSidebar = React.memo(({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="user-avatar">{USER_INFO.initials}</div>
          <div className="user-info">
            <h3 className="user-name">{USER_INFO.name}</h3>
            <p className="user-location">{USER_INFO.location}</p>
          </div>
        </div>
        <span className="pod-leader-badge">{USER_INFO.role}</span>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h4 className="nav-section-title">Pod View</h4>
          <ul className="nav-list">
            <li className="nav-item">
              <Icon name="grid" className="nav-icon" size={20} />
              <span>Pod Overview</span>
            </li>
            <li className="nav-item active">
              <Icon name="ballot" className="nav-icon" size={20} />
              <span>All Ballots</span>
            </li>
            <li className="nav-item">
              <Icon name="message" className="nav-icon" size={20} />
              <span>All Discussions</span>
            </li>
            <li className="nav-item">
              <Icon name="calendar" className="nav-icon" size={20} />
              <span>All Key Dates</span>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h4 className="nav-section-title">Property View</h4>
          <ul className="nav-list">
            <li className="nav-item">
              <Icon name="home" className="nav-icon" size={20} />
              <span>Overview</span>
            </li>
            <li className="nav-item">
              <Icon name="calendar" className="nav-icon" size={20} />
              <span>Key Dates</span>
            </li>
            <li className="nav-item">
              <Icon name="ballot" className="nav-icon" size={20} />
              <span>Ballots</span>
            </li>
            <li className="nav-item">
              <Icon name="message" className="nav-icon" size={20} />
              <span>Discussions</span>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h4 className="nav-section-title">Administration</h4>
          <ul className="nav-list">
            <li className="nav-item">
              <Icon name="users" className="nav-icon" size={20} />
              <span>User Management</span>
            </li>
            <li className="nav-item">
              <Icon name="home" className="nav-icon" size={20} />
              <span>Owners Corporations</span>
            </li>
            <li className="nav-item">
              <Icon name="mail" className="nav-icon" size={20} />
              <span>Templates</span>
            </li>
            <li className="nav-item">
              <Icon name="settings" className="nav-icon" size={20} />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <span className="version-text">Client Portal {APP_VERSION}</span>
      </div>
    </aside>
  )
})

NavigationSidebar.displayName = 'NavigationSidebar'

export default NavigationSidebar
