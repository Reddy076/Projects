import React, { useState, useRef, useMemo, useCallback } from 'react'
import { CORPORATIONS } from '../../constants'
import { useClickOutside } from '../../hooks/useClickOutside'
import Icon from './Icon'
import '../../styles/MultiSelectDropdown.css'

/**
 * MultiSelectDropdown Component
 * 
 * A reusable multi-select dropdown with search functionality.
 * Allows users to select multiple corporations from a list.
 * 
 * Features:
 * - Multi-selection with checkboxes
 * - Search/filter functionality
 * - Visual tags for selected items
 * - "Clear all" functionality
 * - Click-outside-to-close behavior
 * - Optimized with React.memo and useCallback
 * 
 * @param {Array<string>} selectedCorporations - Array of selected corporation names
 * @param {Function} setSelectedCorporations - Function to update selected corporations
 */
const MultiSelectDropdown = React.memo(({ selectedCorporations, setSelectedCorporations }) => {
  // ============================================================================
  // STATE & REFS
  // ============================================================================
  
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsOpen(false))

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================

  /**
   * Filter corporations based on search term
   * Memoized to prevent unnecessary recalculations
   */
  const filteredCorporations = useMemo(() => {
    try {
      if (!searchTerm.trim()) {
        return CORPORATIONS
      }
      
      return CORPORATIONS.filter(corp =>
        corp.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } catch (error) {
      console.error('Error filtering corporations:', error)
      return CORPORATIONS
    }
  }, [searchTerm])

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Toggle selection of a corporation
   * @param {string} corp - Corporation name to toggle
   */
  const toggleCorporation = useCallback((corp) => {
    try {
      if (!corp || typeof corp !== 'string') {
        console.error('Invalid corporation value:', corp)
        return
      }

      setSelectedCorporations(prev => 
        prev.includes(corp) 
          ? prev.filter(c => c !== corp)
          : [...prev, corp]
      )
    } catch (error) {
      console.error('Error toggling corporation:', error)
    }
  }, [setSelectedCorporations])

  /**
   * Remove a specific corporation from selection
   * @param {string} corp - Corporation name to remove
   */
  const removeCorporation = useCallback((corp) => {
    try {
      setSelectedCorporations(prev => prev.filter(c => c !== corp))
    } catch (error) {
      console.error('Error removing corporation:', error)
    }
  }, [setSelectedCorporations])

  /**
   * Clear all selected corporations
   * @param {Event} e - Click event
   */
  const clearAll = useCallback((e) => {
    try {
      e.stopPropagation()
      setSelectedCorporations([])
    } catch (error) {
      console.error('Error clearing selections:', error)
    }
  }, [setSelectedCorporations])

  /**
   * Handle search input change
   * @param {Event} e - Input change event
   */
  const handleSearchChange = useCallback((e) => {
    try {
      setSearchTerm(e.target.value)
    } catch (error) {
      console.error('Error updating search term:', error)
    }
  }, [])

  /**
   * Toggle dropdown visibility
   */
  const handleToggleDropdown = useCallback(() => {
    try {
      setIsOpen(prev => !prev)
    } catch (error) {
      console.error('Error toggling dropdown:', error)
    }
  }, [])

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      {/* Trigger Button */}
      <div 
        className="multi-select-trigger" 
        onClick={handleToggleDropdown}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggleDropdown()
          }
        }}
      >
        <div className="selected-tags">
          {selectedCorporations.length === 0 ? (
            <span className="placeholder">All Corporations</span>
          ) : selectedCorporations.length === 1 ? (
            selectedCorporations.map(corp => (
              <div key={corp} className="selected-tag">
                <span>{corp}</span>
                <button
                  className="remove-tag"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeCorporation(corp)
                  }}
                  aria-label={`Remove ${corp}`}
                >
                  <Icon name="close" size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className="selection-counter">
              {selectedCorporations.length} Selected
            </div>
          )}
        </div>
        
        {/* Control Buttons */}
        <div className="dropdown-controls">
          {selectedCorporations.length > 0 && (
            <button 
              className="clear-all" 
              onClick={clearAll}
              aria-label="Clear all selections"
            >
              <Icon name="close" size={16} />
            </button>
          )}
          <Icon name="chevronDown" size={16} className="chevron-icon" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="multi-select-dropdown" role="listbox">
          {/* Search Input */}
          <div className="dropdown-search">
            <Icon name="search" size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="dropdown-search-input"
              onClick={(e) => e.stopPropagation()}
              aria-label="Search corporations"
            />
          </div>

          {/* Options List */}
          <div className="dropdown-options">
            {filteredCorporations.length > 0 ? (
              filteredCorporations.map(corp => (
                <label key={corp} className="dropdown-option">
                  <input
                    type="checkbox"
                    checked={selectedCorporations.includes(corp)}
                    onChange={() => toggleCorporation(corp)}
                    className="checkbox-input"
                    aria-label={corp}
                  />
                  <div className="checkbox-custom">
                    {selectedCorporations.includes(corp) && (
                      <Icon name="check" size={12} strokeWidth={3} />
                    )}
                  </div>
                  <span className="option-label">{corp}</span>
                </label>
              ))
            ) : (
              <div className="no-results">No corporations found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

MultiSelectDropdown.displayName = 'MultiSelectDropdown'

export default MultiSelectDropdown
