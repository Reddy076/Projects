import { useEffect } from 'react'

/**
 * Custom hook to detect clicks outside a referenced element
 * 
 * Useful for closing dropdowns, modals, and other UI elements
 * when user clicks outside of them.
 * 
 * @param {React.RefObject} ref - Reference to the element
 * @param {Function} handler - Function to call when click outside is detected
 * 
 * @example
 * const dropdownRef = useRef(null)
 * useClickOutside(dropdownRef, () => setIsOpen(false))
 */
export function useClickOutside(ref, handler) {
  useEffect(() => {
    /**
     * Handle click outside event
     * @param {MouseEvent} event - Mouse event
     */
    function handleClickOutside(event) {
      try {
        // Check if ref exists and click was outside the element
        if (ref.current && !ref.current.contains(event.target)) {
          handler()
        }
      } catch (error) {
        console.error('Error in useClickOutside handler:', error)
      }
    }

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside)
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}
