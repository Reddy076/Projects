import React, { useState, useRef, useMemo, useCallback } from 'react'
import { CORPORATIONS } from '../../constants'
import { useClickOutside } from '../../hooks/useClickOutside'
import Icon from './Icon'
import '../../styles/MultiSelectDropdown.css'

const MultiSelectDropdown = React.memo(({ selectedCorporations, setSelectedCorporations }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  useClickOutside(dropdownRef, () => setIsOpen(false))

  const filteredCorporations = useMemo(() => 
    CORPORATIONS.filter(corp =>
      corp.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  )

  const toggleCorporation = useCallback((corp) => {
    setSelectedCorporations(prev => 
      prev.includes(corp) 
        ? prev.filter(c => c !== corp)
        : [...prev, corp]
    )
  }, [setSelectedCorporations])

  const removeCorporation = useCallback((corp) => {
    setSelectedCorporations(prev => prev.filter(c => c !== corp))
  }, [setSelectedCorporations])

  const clearAll = useCallback((e) => {
    e.stopPropagation()
    setSelectedCorporations([])
  }, [setSelectedCorporations])

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      <div className="multi-select-trigger" onClick={() => setIsOpen(!isOpen)}>
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
        <div className="dropdown-controls">
          {selectedCorporations.length > 0 && (
            <button className="clear-all" onClick={clearAll}>
              <Icon name="close" size={16} />
            </button>
          )}
          <Icon name="chevronDown" size={16} className="chevron-icon" />
        </div>
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          <div className="dropdown-search">
            <Icon name="search" size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dropdown-search-input"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="dropdown-options">
            {filteredCorporations.map(corp => (
              <label key={corp} className="dropdown-option">
                <input
                  type="checkbox"
                  checked={selectedCorporations.includes(corp)}
                  onChange={() => toggleCorporation(corp)}
                  className="checkbox-input"
                />
                <div className="checkbox-custom">
                  {selectedCorporations.includes(corp) && (
                    <Icon name="check" size={12} strokeWidth={3} />
                  )}
                </div>
                <span className="option-label">{corp}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
})

MultiSelectDropdown.displayName = 'MultiSelectDropdown'

export default MultiSelectDropdown
