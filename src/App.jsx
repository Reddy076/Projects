import React, { useState, useCallback, useEffect } from 'react'
import NavigationSidebar from './components/layout/NavigationSidebar'
import AppHeader from './components/layout/AppHeader'
import BallotList from './components/ballot/BallotList'
import { DEFAULT_CORPORATION } from './constants'
import './styles/App.css'

function App() {
  const [selectedCorporation, setSelectedCorporation] = useState(DEFAULT_CORPORATION)
  const [ballots, setBallots] = useState([])
  // Sidebar is open by default on desktop and tablet, closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth > 768
  })

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev)
  }, [])

  const handleAddBallot = useCallback((ballotData) => {
    const newBallot = {
      id: Date.now(),
      corporation: ballotData.corporation,
      title: ballotData.title,
      status: 'Active',
      participation: 0,
      deadline: ballotData.deadlineDate,
      createdAt: new Date().toISOString(),
      description: ballotData.description,
      motions: ballotData.motions,
      attachments: ballotData.attachments
    }
    setBallots(prev => [...prev, newBallot])
  }, [])

  // Handle window resize to automatically show/hide sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768
      if (!isMobile && !isSidebarOpen) {
        setIsSidebarOpen(true)
      } else if (isMobile && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen])

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
