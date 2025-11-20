import React, { useState, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { CORPORATIONS } from '../../constants'
import { useClickOutside } from '../../hooks/useClickOutside'
import Icon from '../common/Icon'
import '../../styles/AppHeader.css'

/**
 * AppHeader Component
 * 
 * Main header bar containing:
 * - Menu toggle button for sidebar
 * - Corporation selector dropdown
 * - Dark mode toggle
 * 
 * @param {string} selectedCorporation - Currently selected corporation
 * @param {Function} setSelectedCorporation - Function to update selected corporation
 * @param {Function} toggleSidebar - Function to toggle sidebar visibility
 */
function AppHeader({ selectedCorporation, setSelectedCorporation, toggleSidebar }) {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================
  
  const { toggleTheme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle corporation selection from dropdown
   * @param {string} corp - Selected corporation name
   */
  const handleCorporationSelect = (corp) => {
    try {
      if (!corp || typeof corp !== 'string') {
        console.error('Invalid corporation value:', corp)
        return
      }
      
      setSelectedCorporation(corp)
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Error selecting corporation:', error)
      alert('Failed to select corporation. Please try again.')
    }
  }

  /**
   * Toggle dropdown visibility
   */
  const handleDropdownToggle = () => {
    try {
      setIsDropdownOpen(prev => !prev)
    } catch (error) {
      console.error('Error toggling dropdown:', error)
    }
  }

  /**
   * Handle theme toggle with error handling
   */
  const handleThemeToggle = () => {
    try {
      toggleTheme()
    } catch (error) {
      console.error('Error toggling theme:', error)
      alert('Failed to toggle theme. Please try again.')
    }
  }

  /**
   * Handle sidebar toggle with error handling
   */
  const handleSidebarToggle = () => {
    try {
      toggleSidebar()
    } catch (error) {
      console.error('Error toggling sidebar:', error)
    }
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <header className="header">
      <div className="header-left">
        {/* Sidebar Toggle Button */}
        <button 
          className="menu-button" 
          onClick={handleSidebarToggle} 
          aria-label="Toggle sidebar"
        >
          <Icon name="menu" size={20} />
        </button>

        {/* Corporation Selector Dropdown */}
        <div className="corporation-selector" ref={dropdownRef}>
          <button 
            className="corporation-button"
            onClick={handleDropdownToggle}
            aria-label="Select corporation"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <Icon name="building" size={18} className="corporation-icon" />
            <span className="corporation-text">{selectedCorporation}</span>
            <Icon name="chevronDown" size={16} className="dropdown-icon" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="corporation-dropdown" role="menu">
              {CORPORATIONS.map((corp) => (
                <div
                  key={corp}
                  className={`dropdown-item ${selectedCorporation === corp ? 'selected' : ''}`}
                  onClick={() => handleCorporationSelect(corp)}
                  role="menuitem"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCorporationSelect(corp)
                    }
                  }}
                >
                  {selectedCorporation === corp && (
                    <Icon name="check" size={16} strokeWidth={2.5} className="check-icon" />
                  )}
                  <span>{corp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Dark Mode Toggle */}
        <button 
          className="dark-mode-toggle"
          onClick={handleThemeToggle}
          aria-label="Toggle dark mode"
        >
          <Icon name="moon" size={20} />
        </button>
      </div>
    </header>
  )
}

export default AppHeader
