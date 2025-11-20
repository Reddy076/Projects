import { useEffect } from 'react'

/**
 * Custom hook to detect clicks outside a referenced element
 * @param {React.RefObject} ref - Reference to the element
 * @param {Function} handler - Function to call when click outside is detected
 */
export function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler])
}
