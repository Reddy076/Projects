import React, { useEffect, useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import Icon from './Icon'
import '../../styles/Dialog.css'

/**
 * Dialog Component - A reusable modal dialog component
 * Based on Radix UI dialog patterns with custom styling
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls dialog visibility
 * @param {Function} props.onClose - Callback when dialog should close
 * @param {string} props.title - Dialog title
 * @param {string} props.description - Optional dialog description
 * @param {React.ReactNode} props.children - Dialog content
 * @param {string} props.size - Dialog size: 'sm', 'md', 'lg', 'xl' (default: 'md')
 * @param {boolean} props.closeOnOutsideClick - Whether to close on outside click (default: true)
 * @param {boolean} props.showCloseButton - Whether to show close button (default: true)
 */
const Dialog = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  size = 'md',
  closeOnOutsideClick = true,
  showCloseButton = true 
}) => {
  const dialogRef = useRef(null)
  
  // Handle click outside
  useClickOutside(dialogRef, () => {
    if (closeOnOutsideClick && isOpen) {
      onClose()
    }
  })

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="dialog-overlay" data-state={isOpen ? 'open' : 'closed'}>
      <div 
        ref={dialogRef}
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby={description ? 'dialog-description' : undefined}
        data-state={isOpen ? 'open' : 'closed'}
        className={`dialog-content dialog-${size}`}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            type="button"
            className="dialog-close-button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <Icon name="x" size={20} />
          </button>
        )}

        {/* Header */}
        <div className="dialog-header">
          {title && (
            <h2 id="dialog-title" className="dialog-title">
              {title}
            </h2>
          )}
          {description && (
            <p id="dialog-description" className="dialog-description">
              {description}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="dialog-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Dialog
