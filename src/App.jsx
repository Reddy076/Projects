import React, { useState, useCallback, useEffect } from 'react'
import NavigationSidebar from './components/layout/NavigationSidebar'
import AppHeader from './components/layout/AppHeader'
import BallotList from './components/ballot/BallotList'
import { DEFAULT_CORPORATION } from './constants'
import './styles/App.css'

/**
 * Main Application Component
 * Manages the overall application state and layout including:
 * - Sidebar navigation
 * - Corporation selection
 * - Ballot management
 * - Responsive sidebar behavior
 */
function App() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  // Currently selected corporation from the dropdown
  const [selectedCorporation, setSelectedCorporation] = useState(DEFAULT_CORPORATION)
  
  // Array of all ballots in the system
  const [ballots, setBallots] = useState([])
  // Sidebar visibility state - responsive by default (open on desktop, closed on mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try {
      // Determine initial state based on screen size
      return window.innerWidth > 768
    } catch (error) {
      console.error('Error determining initial sidebar state:', error)
      return false // Default to closed on error
    }
  })

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Toggle sidebar visibility
   * Wrapped in useCallback to prevent unnecessary re-renders
   */
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  /**
   * Add a new ballot to the system
   * @param {Object} ballotData - The ballot data from the creation form
   */
  const handleAddBallot = useCallback((ballotData) => {
    try {
      // Validate ballot data
      if (!ballotData || !ballotData.title || !ballotData.corporation) {
        console.error('Invalid ballot data:', ballotData)
        alert('Failed to create ballot: Missing required fields')
        return
      }

      // Create new ballot with unique ID and default values
      const newBallot = {
        id: Date.now(), // Simple unique ID generation
        corporation: ballotData.corporation,
        title: ballotData.title,
        status: 'Active',
        participation: 0, // Default participation percentage
        deadline: ballotData.deadlineDate,
        createdAt: new Date().toISOString(),
        description: ballotData.description,
        motions: ballotData.motions || [],
        attachments: ballotData.attachments || []
      }

      // Add to ballots array
      setBallots(prev => [...prev, newBallot])
      
      console.log('Ballot created successfully:', newBallot)
    } catch (error) {
      console.error('Error creating ballot:', error)
      alert('An error occurred while creating the ballot. Please try again.')
    }
  }, [])

  // ============================================================================
  // SIDE EFFECTS
  // ============================================================================

  /**
   * Handle window resize to automatically show/hide sidebar based on screen size
   * This provides a responsive behavior without requiring manual toggling
   */
  useEffect(() => {
    const handleResize = () => {
      try {
        const isMobile = window.innerWidth <= 768
        
        // Auto-open sidebar on desktop, auto-close on mobile
        if (!isMobile && !isSidebarOpen) {
          setIsSidebarOpen(true)
        } else if (isMobile && isSidebarOpen) {
          setIsSidebarOpen(false)
        }
      } catch (error) {
        console.error('Error handling resize:', error)
      }
    }

    // Attach resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen])

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="app">
      <NavigationSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={`main-wrapper ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <AppHeader 
          selectedCorporation={selectedCorporation}
          setSelectedCorporation={setSelectedCorporation}
          toggleSidebar={toggleSidebar}
        />
        <BallotList ballots={ballots} onAddBallot={handleAddBallot} />
      </div>
    </div>
  )
}

export default App
