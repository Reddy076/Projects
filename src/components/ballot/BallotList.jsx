import React, { useState, useCallback, useMemo } from 'react'
import MultiSelectDropdown from '../common/MultiSelectDropdown'
import BallotCreationModal from './BallotCreationModal'
import Icon from '../common/Icon'
import '../../styles/BallotList.css'

/**
 * MotionsView Component
 * 
 * Displays a tabbed view of motion outcomes across all corporations.
 * Tracks approved, not approved, and ratified motions.
 */
function MotionsView() {
  const [motionTab, setMotionTab] = useState('approved')

  /**
   * Handle motion tab change
   * @param {string} tab - The tab to switch to
   */
  const handleTabChange = (tab) => {
    try {
      if (!tab || typeof tab !== 'string') {
        console.error('Invalid tab value:', tab)
        return
      }
      setMotionTab(tab)
    } catch (error) {
      console.error('Error changing motion tab:', error)
    }
  }

  // Get display text for current tab
  const getEmptyMessage = () => {
    switch (motionTab) {
      case 'approved':
        return 'No approved motions'
      case 'not-approved':
        return 'No not approved motions'
      case 'ratified':
        return 'No ratified motions'
      default:
        return 'No motions'
    }
  }

  return (
    <div className="motions-view">
      <p className="motions-subtitle">Track individual motion outcomes across all Owners Corporations</p>
      
      {/* Motion Tabs */}
      <div className="tabs-section motion-tabs">
        <button 
          className={`tab ${motionTab === 'approved' ? 'active' : ''}`}
          onClick={() => handleTabChange('approved')}
          aria-pressed={motionTab === 'approved'}
        >
          Approved (0)
        </button>
        <button 
          className={`tab ${motionTab === 'not-approved' ? 'active' : ''}`}
          onClick={() => handleTabChange('not-approved')}
          aria-pressed={motionTab === 'not-approved'}
        >
          Not Approved (0)
        </button>
        <button 
          className={`tab ${motionTab === 'ratified' ? 'active' : ''}`}
          onClick={() => handleTabChange('ratified')}
          aria-pressed={motionTab === 'ratified'}
        >
          Ratified (0)
        </button>
      </div>

      {/* Empty State */}
      <div className="motions-empty-state">
        <p className="empty-message">{getEmptyMessage()}</p>
      </div>
    </div>
  )
}

/**
 * BallotList Component
 * 
 * Main component for displaying and managing ballots.
 * 
 * Features:
 * - Tabbed view (Active, Closed, Motions)
 * - Multi-corporation filtering
 * - Search functionality
 * - Sortable table columns
 * - Ballot creation modal
 * - Responsive design
 * 
 * @param {Array<Object>} ballots - Array of ballot objects
 * @param {Function} onAddBallot - Callback to add a new ballot
 */
const BallotList = React.memo(({ ballots, onAddBallot }) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [activeTab, setActiveTab] = useState('active')
  const [filterCorporation, setFilterCorporation] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Open the ballot creation modal
   */
  const handleOpenModal = useCallback(() => {
    try {
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error opening modal:', error)
    }
  }, [])

  /**
   * Close the ballot creation modal
   */
  const handleCloseModal = useCallback(() => {
    try {
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error closing modal:', error)
    }
  }, [])
  
  /**
   * Handle ballot submission from the modal
   * @param {Object} ballotData - The ballot data to submit
   */
  const handleBallotSubmit = useCallback((ballotData) => {
    try {
      if (!ballotData) {
        console.error('No ballot data provided')
        return
      }

      onAddBallot(ballotData)
      handleCloseModal()
    } catch (error) {
      console.error('Error submitting ballot:', error)
      alert('Failed to create ballot. Please try again.')
    }
  }, [onAddBallot, handleCloseModal])

  /**
   * Handle search input change
   * @param {Event} e - Input change event
   */
  const handleSearchChange = useCallback((e) => {
    try {
      setSearchQuery(e.target.value)
    } catch (error) {
      console.error('Error updating search query:', error)
    }
  }, [])

  /**
   * Handle tab change
   * @param {string} tab - The tab to switch to
   */
  const handleTabChange = useCallback((tab) => {
    try {
      if (!tab || typeof tab !== 'string') {
        console.error('Invalid tab value:', tab)
        return
      }
      setActiveTab(tab)
    } catch (error) {
      console.error('Error changing tab:', error)
    }
  }, [])

  /**
   * Handle remind button click
   * @param {Object} ballot - The ballot to send reminder for
   */
  const handleRemind = useCallback((ballot) => {
    try {
      console.log('Sending reminder for ballot:', ballot.id)
      // In a real app, this would trigger an API call
      alert(`Reminder sent for: ${ballot.title}`)
    } catch (error) {
      console.error('Error sending reminder:', error)
      alert('Failed to send reminder. Please try again.')
    }
  }, [])

  // ============================================================================
  // FILTERED & COMPUTED DATA
  // ============================================================================

  /**
   * Filter and search ballots based on current filters
   * Memoized to prevent unnecessary recalculations
   */
  const filteredBallots = useMemo(() => {
    try {
      if (!Array.isArray(ballots)) {
        console.error('Ballots is not an array:', ballots)
        return []
      }

      let filtered = [...ballots]

      // Filter by selected corporations
      if (filterCorporation.length > 0) {
        filtered = filtered.filter(ballot => 
          filterCorporation.includes(ballot.corporation)
        )
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        filtered = filtered.filter(ballot =>
          ballot.title?.toLowerCase().includes(query) ||
          ballot.corporation?.toLowerCase().includes(query) ||
          ballot.description?.toLowerCase().includes(query)
        )
      }

      // Filter by active/closed status
      if (activeTab !== 'motions') {
        filtered = filtered.filter(ballot => {
          const isActive = ballot.status?.toLowerCase() === 'active'
          return activeTab === 'active' ? isActive : !isActive
        })
      }

      return filtered
    } catch (error) {
      console.error('Error filtering ballots:', error)
      return []
    }
  }, [ballots, filterCorporation, searchQuery, activeTab])

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = useCallback((dateString) => {
    try {
      if (!dateString) return 'N/A'
      
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateString)
        return 'Invalid date'
      }

      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Error'
    }
  }, [])

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Ballot Creation Modal */}
      <BallotCreationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSubmit={handleBallotSubmit}
      />
      
      <main className="main-content">
        {/* Page Header */}
        <div className="content-header">
          <div className="header-row">
            <div className="header-text">
              <h1 className="page-title">All Ballots</h1>
              <p className="page-subtitle">Manage ballots across all Owners Corporations</p>
            </div>
            <button 
              className="create-ballot-btn" 
              onClick={handleOpenModal}
              aria-label="Create new ballot"
            >
              <Icon name="plus" size={20} />
              Create Ballot
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-row">
            {/* Multi-select corporation filter */}
            <MultiSelectDropdown 
              selectedCorporations={filterCorporation}
              setSelectedCorporations={setFilterCorporation}
            />

            {/* Search input */}
            <div className="search-box">
              <Icon name="search" size={20} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search ballots..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search ballots"
              />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="tabs-section">
          <button 
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => handleTabChange('active')}
            aria-pressed={activeTab === 'active'}
          >
            Active ({filteredBallots.filter(b => b.status?.toLowerCase() === 'active').length})
          </button>
          <button 
            className={`tab ${activeTab === 'closed' ? 'active' : ''}`}
            onClick={() => handleTabChange('closed')}
            aria-pressed={activeTab === 'closed'}
          >
            Closed ({filteredBallots.filter(b => b.status?.toLowerCase() !== 'active').length})
          </button>
          <button 
            className={`tab ${activeTab === 'motions' ? 'active' : ''}`}
            onClick={() => handleTabChange('motions')}
            aria-pressed={activeTab === 'motions'}
          >
            Motions
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'motions' ? (
          <MotionsView />
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="ballots-table" role="table" aria-label="Ballots table">
              <thead>
                <tr>
                  <th className="th-sortable" style={{width: '220px'}}>
                    <div className="th-content">
                      <span>Corporation</span>
                      <Icon name="sort" size={24} className="sort-icon" />
                    </div>
                  </th>
                  <th className="th-sortable" style={{width: '280px'}}>
                    <div className="th-content">
                      <span>Title</span>
                      <Icon name="sort" size={24} className="sort-icon" />
                    </div>
                  </th>
                  <th style={{width: '120px'}}>Status</th>
                  <th className="th-sortable" style={{width: '200px'}}>
                    <div className="th-content">
                      <span>Participation</span>
                      <Icon name="sort" size={24} className="sort-icon" />
                    </div>
                  </th>
                  <th className="th-sortable" style={{width: '140px'}}>
                    <div className="th-content">
                      <span>Deadline</span>
                      <Icon name="sort" size={24} className="sort-icon" />
                    </div>
                  </th>
                  <th style={{width: '100px'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBallots.map((ballot) => (
                  <tr key={ballot.id}>
                    <td>{ballot.corporation || 'N/A'}</td>
                    <td>{ballot.title || 'Untitled'}</td>
                    <td>
                      <span className={`status-badge ${ballot.status?.toLowerCase() === 'active' ? 'status-active' : 'status-closed'}`}>
                        {ballot.status || 'Unknown'}
                      </span>
                    </td>
                    <td>
                      <div className="participation-cell">
                        <div className="participation-header">
                          <span className="participation-percentage">
                            {ballot.participation ?? 0}%
                          </span>
                          <span className="participation-count">0/25</span>
                        </div>
                        <div className="participation-bar">
                          <div 
                            className="participation-fill" 
                            style={{width: `${Math.min(100, Math.max(0, ballot.participation ?? 0))}%`}}
                            role="progressbar"
                            aria-valuenow={ballot.participation ?? 0}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(ballot.deadline)}</td>
                    <td>
                      <button 
                        className="action-btn"
                        onClick={() => handleRemind(ballot)}
                        aria-label={`Send reminder for ${ballot.title}`}
                      >
                        Remind
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  )
})

BallotList.displayName = 'BallotList'

export default BallotList
