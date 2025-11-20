import React, { useState, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { CORPORATIONS } from '../../constants'
import { useClickOutside } from '../../hooks/useClickOutside'
import Icon from '../common/Icon'
import '../../styles/AppHeader.css'

function AppHeader({ selectedCorporation, setSelectedCorporation, toggleSidebar }) {
  const { toggleTheme } = useTheme()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false))

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Icon name="menu" size={20} />
        </button>

        <div className="corporation-selector" ref={dropdownRef}>
          <button 
            className="corporation-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select corporation"
          >
            <Icon name="building" size={18} className="corporation-icon" />
            <span className="corporation-text">{selectedCorporation}</span>
            <Icon name="chevronDown" size={16} className="dropdown-icon" />
          </button>

          {isDropdownOpen && (
            <div className="corporation-dropdown">
              {CORPORATIONS.map((corp) => (
                <div
                  key={corp}
                  className={`dropdown-item ${selectedCorporation === corp ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedCorporation(corp)
                    setIsDropdownOpen(false)
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
        <button 
          className="dark-mode-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <Icon name="moon" size={20} />
        </button>
      </div>
    </header>
  )
}

export default AppHeader
