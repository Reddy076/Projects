import React, { useState, useCallback } from 'react'
import MultiSelectDropdown from '../common/MultiSelectDropdown'
import BallotCreationModal from './BallotCreationModal'
import Icon from '../common/Icon'
import '../../styles/BallotList.css'

function MotionsView() {
  const [motionTab, setMotionTab] = useState('approved')

  return (
    <div className="motions-view">
      <p className="motions-subtitle">Track individual motion outcomes across all Owners Corporations</p>
      
      <div className="tabs-section motion-tabs">
        <button 
          className={`tab ${motionTab === 'approved' ? 'active' : ''}`}
          onClick={() => setMotionTab('approved')}
        >
          Approved (0)
        </button>
        <button 
          className={`tab ${motionTab === 'not-approved' ? 'active' : ''}`}
          onClick={() => setMotionTab('not-approved')}
        >
          Not Approved (0)
        </button>
        <button 
          className={`tab ${motionTab === 'ratified' ? 'active' : ''}`}
          onClick={() => setMotionTab('ratified')}
        >
          Ratified (0)
        </button>
      </div>

      <div className="motions-empty-state">
        <p className="empty-message">No {motionTab === 'approved' ? 'approved' : motionTab === 'not-approved' ? 'not approved' : 'ratified'} motions</p>
      </div>
    </div>
  )
}

const BallotList = React.memo(({ ballots, onAddBallot }) => {
  const [activeTab, setActiveTab] = useState('active')
  const [filterCorporation, setFilterCorporation] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => setIsModalOpen(true), [])
  const handleCloseModal = useCallback(() => setIsModalOpen(false), [])
  
  const handleBallotSubmit = useCallback((ballotData) => {
    onAddBallot(ballotData)
    handleCloseModal()
  }, [onAddBallot, handleCloseModal])

  return (
    <>
      <BallotCreationModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSubmit={handleBallotSubmit}
      />
      <main className="main-content">
      <div className="content-header">
        <div className="header-row">
          <div className="header-text">
            <h1 className="page-title">All Ballots</h1>
            <p className="page-subtitle">Manage ballots across all Owners Corporations</p>
          </div>
          <button className="create-ballot-btn" onClick={handleOpenModal}>
            <Icon name="plus" size={20} />
            Create Ballot
          </button>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-row">
          <MultiSelectDropdown 
            selectedCorporations={filterCorporation}
            setSelectedCorporations={setFilterCorporation}
          />

          <div className="search-box">
            <Icon name="search" size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search ballots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="tabs-section">
        <button 
          className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active (0)
        </button>
        <button 
          className={`tab ${activeTab === 'closed' ? 'active' : ''}`}
          onClick={() => setActiveTab('closed')}
        >
          Closed (0)
        </button>
        <button 
          className={`tab ${activeTab === 'motions' ? 'active' : ''}`}
          onClick={() => setActiveTab('motions')}
        >
          Motions
        </button>
      </div>

      {activeTab === 'motions' ? (
        <MotionsView />
      ) : (
        <div className="relative w-full overflow-auto">
          <table className="ballots-table">
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
              {ballots.map((ballot) => (
                <tr key={ballot.id}>
                  <td>{ballot.corporation}</td>
                  <td>{ballot.title}</td>
                  <td>
                    <span className="status-badge status-active">{ballot.status}</span>
                  </td>
                  <td>
                    <div className="participation-cell">
                      <div className="participation-header">
                        <span className="participation-percentage">{ballot.participation}%</span>
                        <span className="participation-count">0/25</span>
                      </div>
                      <div className="participation-bar">
                        <div 
                          className="participation-fill" 
                          style={{width: `${ballot.participation}%`}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(ballot.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <button className="action-btn">Remind</button>
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
