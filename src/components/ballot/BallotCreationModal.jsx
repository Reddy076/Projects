import React, { useState, useCallback } from 'react'
import { CORPORATIONS, DEFAULT_CORPORATION, BALLOT_STEPS } from '../../constants'
import Icon from '../common/Icon'
import '../../styles/BallotCreationModal.css'

// ============================================================================
// STEP COMPONENTS - Each step is a separate component for better organization
// ============================================================================

/**
 * Step1BasicInfo Component
 * 
 * First step of ballot creation - collects basic information:
 * - Ballot title and description
 * - Voting deadline (date and time)
 * - Corporation selection
 * - Notice giver details
 * - Secretary information
 * 
 * @param {Object} formData - Form data object
 * @param {Function} handleInputChange - Input change handler
 * @param {Object} errors - Validation errors object
 */
const Step1BasicInfo = ({ formData, handleInputChange, errors }) => (
  <div className="step-content">
    <div className="form-group">
      <label htmlFor="title" className="form-label">Ballot Title</label>
      <input
        type="text"
        id="title"
        name="title"
        className={`form-input ${errors.title ? 'error' : ''}`}
        placeholder="e.g., Annual Budget 2025"
        value={formData.title}
        onChange={handleInputChange}
      />
      {errors.title && <p className="error-message">{errors.title}</p>}
    </div>

    <div className="form-group">
      <label htmlFor="description" className="form-label">Description</label>
      <textarea
        id="description"
        name="description"
        className={`form-textarea ${errors.description ? 'error' : ''}`}
        placeholder="Describe the purpose of this ballot..."
        rows="4"
        value={formData.description}
        onChange={handleInputChange}
      />
      {errors.description && <p className="error-message">{errors.description}</p>}
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="deadlineDate" className="form-label">Voting Deadline (Date)</label>
        <input
          type="date"
          id="deadlineDate"
          name="deadlineDate"
          className="form-input"
          value={formData.deadlineDate}
          onChange={handleInputChange}
        />
        <p className="form-hint">Must be at least 14 days from today</p>
      </div>

      <div className="form-group">
        <label htmlFor="deadlineTime" className="form-label">Voting Deadline (Time)</label>
        <input
          type="time"
          id="deadlineTime"
          name="deadlineTime"
          className="form-input"
          value={formData.deadlineTime}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="corporation" className="form-label">Owners Corporation</label>
      <select
        id="corporation"
        name="corporation"
        className="form-select"
        value={formData.corporation}
        onChange={handleInputChange}
      >
        {CORPORATIONS.map(corp => (
          <option key={corp} value={corp}>{corp}</option>
        ))}
      </select>
    </div>

    <div className="form-section">
      <h3 className="section-title">Details of Person Giving This Notice</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personName" className="form-label">Name</label>
          <input
            type="text"
            id="personName"
            name="personName"
            className="form-input"
            placeholder="Dasthagiri"
            value={formData.personName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="personPosition" className="form-label">Position</label>
          <input
            type="text"
            id="personPosition"
            name="personPosition"
            className="form-input"
            placeholder="Owners Corporation Manager"
            value={formData.personPosition}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="personAddress" className="form-label">Address</label>
          <input
            type="text"
            id="personAddress"
            name="personAddress"
            className="form-input"
            placeholder="Kadapa"
            value={formData.personAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="personContact" className="form-label">Contact Number</label>
          <input
            type="tel"
            id="personContact"
            name="personContact"
            className="form-input"
            placeholder="9999999999"
            value={formData.personContact}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>

    <div className="form-section">
      <h3 className="section-title">Alternative Return Via Secretary</h3>
      <div className="form-group">
        <label htmlFor="secretaryName" className="form-label">Secretary Name</label>
        <input
          type="text"
          id="secretaryName"
          name="secretaryName"
          className="form-input"
          placeholder="Dasthagiri"
          value={formData.secretaryName}
          onChange={handleInputChange}
        />
      </div>
    </div>
  </div>
)

// ============================================================================
// MOTION CARD COMPONENT
// ============================================================================

/**
 * MotionCard Component
 * 
 * Displays a single motion card with:
 * - Motion title and description
 * - Hurdle rate
 * - Attachment count
 * - Edit and remove actions
 * 
 * @param {Object} motion - Motion object
 * @param {number} index - Motion index
 * @param {Function} onEdit - Edit handler
 * @param {Function} onRemove - Remove handler
 */
const MotionCard = ({ motion, index, onEdit, onRemove }) => (
  <div className="motion-card">
    <div className="motion-card-header">
      <h4 className="motion-card-title">{motion.title}</h4>
      <div className="motion-card-actions">
        <button 
          className="motion-edit-btn"
          onClick={() => onEdit(motion)}
          title="Edit"
        >
          Edit
        </button>
        <button 
          className="motion-remove-btn"
          onClick={() => onRemove(motion.id)}
          title="Delete"
          aria-label="Delete motion"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
    <p className="motion-card-description">The Committee resolve to {motion.description}</p>
    <div className="motion-card-meta">
      <span className="motion-meta-item">Hurdle: {motion.hurdleRate}%</span>
      {motion.attachments.length > 0 && (
        <span className="motion-meta-item">{motion.attachments.length} file(s) attached</span>
      )}
    </div>
  </div>
)

// ============================================================================
// STEP 2 - MOTIONS
// ============================================================================

/**
 * Step2Motions Component
 * 
 * Second step of ballot creation - manage motions:
 * - Add new motions with title, description, and hurdle rate
 * - Attach files to motions
 * - View, edit, and remove existing motions
 * - Requires at least one motion to proceed
 * 
 * @param {Array} motions - Array of added motions
 * @param {Object} newMotion - Current motion being added
 * @param {Function} onMotionInputChange - Motion input change handler
 * @param {Function} onFileChange - File input change handler
 * @param {Function} onAddMotion - Add motion handler
 * @param {Function} onEditMotion - Edit motion handler
 * @param {Function} onRemoveMotion - Remove motion handler
 */
const Step2Motions = ({ 
  motions, 
  newMotion, 
  onMotionInputChange, 
  onFileChange, 
  onAddMotion, 
  onEditMotion, 
  onRemoveMotion 
}) => (
  <div className="step-content">
    <div className="motions-header">
      <h2 className="motions-title">Add Motions</h2>
      <p className="motions-description">Add at least one motion for members to vote on</p>
    </div>

    <div className="motion-form-wrapper">
      <h3 className="motion-form-title">New Motion</h3>

      <div className="form-group">
        <label htmlFor="motionTitle" className="form-label">Motion Title</label>
        <input
          type="text"
          id="motionTitle"
          name="title"
          className="form-input"
          placeholder="e.g., Approve Annual Budget 2025"
          value={newMotion.title}
          onChange={onMotionInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="motionDescription" className="form-label">Motion Description</label>
        <div className="motion-description-label">The Committee resolve to</div>
        <textarea
          id="motionDescription"
          name="description"
          className="form-textarea"
          placeholder="approve the maintenance budget for the upcoming year..."
          rows="4"
          value={newMotion.description}
          onChange={onMotionInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="hurdleRate" className="form-label">Hurdle Rate (%)</label>
        <input
          type="number"
          id="hurdleRate"
          name="hurdleRate"
          className="form-input"
          placeholder="50"
          min="0"
          max="100"
          value={newMotion.hurdleRate}
          onChange={onMotionInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="motionAttachments" className="form-label">Motion Attachments (Optional)</label>
        <input
          type="file"
          id="motionAttachments"
          name="attachments"
          className="form-file-input"
          multiple
          onChange={onFileChange}
        />
      </div>

      <div className="motion-form-actions">
        <button className="btn-primary" onClick={onAddMotion}>
          <Icon name="plus" size={16} />
          Add Motion
        </button>
      </div>
    </div>

    {motions.length > 0 ? (
      <>
        <h3 className="added-motions-title">Added Motions ({motions.length})</h3>
        <div className="motions-list">
          {motions.map((motion, index) => (
            <MotionCard 
              key={motion.id}
              motion={motion}
              index={index}
              onEdit={onEditMotion}
              onRemove={onRemoveMotion}
            />
          ))}
        </div>
      </>
    ) : (
      <div className="motions-empty-message">
        <p>No motions added yet. Add at least one motion to continue.</p>
      </div>
    )}
  </div>
)

// ============================================================================
// STEP 3 - ATTACHMENTS
// ============================================================================

/**
 * Step3Attachments Component
 * 
 * Third step of ballot creation - attach general documents:
 * - Drag and drop file upload
 * - Browse for files
 * - View uploaded files with size
 * - Remove attachments
 * - Optional step
 * 
 * @param {Array} generalAttachments - Array of uploaded files
 * @param {boolean} isDragging - Drag state indicator
 * @param {Function} onDragOver - Drag over handler
 * @param {Function} onDragLeave - Drag leave handler
 * @param {Function} onDrop - Drop handler
 * @param {Function} onFileChange - File input change handler
 * @param {Function} onRemoveAttachment - Remove attachment handler
 */
const Step3Attachments = ({ 
  generalAttachments, 
  isDragging, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onFileChange, 
  onRemoveAttachment 
}) => (
  <div className="step-content">
    <div className="attachments-header">
      <h2 className="attachments-title">General Attachments</h2>
      <p className="attachments-description">Upload documents relevant to the entire ballot (optional)</p>
    </div>

    <div 
      className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="file-drop-icon">
        <Icon name="fileUpload" size={48} strokeWidth={1.5} />
      </div>
      <p className="file-drop-text">Drag and drop files here, or click to browse</p>
      <label htmlFor="generalAttachments" className="file-drop-button">
        Choose Files
      </label>
      <input
        type="file"
        id="generalAttachments"
        className="file-input-hidden"
        multiple
        onChange={onFileChange}
      />
    </div>

    {generalAttachments.length > 0 && (
      <div className="attachments-list">
        <h3 className="attachments-list-title">Uploaded Files ({generalAttachments.length})</h3>
        {generalAttachments.map((file, index) => (
          <div key={index} className="attachment-item">
            <div className="attachment-info">
              <Icon name="file" size={20} className="attachment-icon" />
              <div className="attachment-details">
                <span className="attachment-name">{file.name}</span>
                <span className="attachment-size">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            </div>
            <button 
              className="attachment-remove-btn"
              onClick={() => onRemoveAttachment(index)}
              aria-label="Remove attachment"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)

// ============================================================================
// STEP 4 - REVIEW
// ============================================================================

/**
 * Step4Review Component
 * 
 * Fourth step of ballot creation - review all details:
 * - Ballot details summary
 * - Notice giver information
 * - List of motions
 * - Attached files
 * - Final check before publishing
 * 
 * @param {Object} formData - Complete form data
 * @param {Array} motions - Array of motions
 * @param {Array} generalAttachments - Array of attachments
 */
const Step4Review = ({ formData, motions, generalAttachments }) => (
  <div className="step-content">
    <div className="review-page-header">
      <h2 className="review-page-title">Review Ballot</h2>
      <p className="review-page-subtitle">Review all details before publishing</p>
    </div>

    {/* Ballot Details Section */}
    <div className="review-card">
      <h3 className="review-card-title">Ballot Details</h3>
      
      <div className="review-field">
        <label className="review-field-label">Title</label>
        <div className="review-field-value">{formData.title}</div>
      </div>

      <div className="review-field">
        <label className="review-field-label">Description</label>
        <div className="review-field-value">{formData.description}</div>
      </div>

      <div className="review-field-row">
        <div className="review-field">
          <label className="review-field-label">Votes must be submitted by</label>
          <div className="review-field-value">
            {formData.deadlineTime} on {new Date(formData.deadlineDate).toLocaleDateString('en-GB', { 
              day: '2-digit', 
              month: 'short', 
              year: '2-digit' 
            }).toUpperCase()}
          </div>
        </div>
        <div className="review-field">
          <label className="review-field-label">Owners Corporation</label>
          <div className="review-field-value">{formData.corporation}</div>
        </div>
      </div>
    </div>

    {/* Notice Giver Details Section */}
    <div className="review-card">
      <h3 className="review-card-title">Notice Giver Details</h3>
      
      <div className="review-field-inline">
        <span className="review-inline-label">Name:</span>
        <span className="review-inline-value">{formData.personName || 'Not provided'}</span>
      </div>

      <div className="review-field-inline">
        <span className="review-inline-label">Position:</span>
        <span className="review-inline-value">{formData.personPosition || 'Not provided'}</span>
      </div>

      <div className="review-field-inline">
        <span className="review-inline-label">Address:</span>
        <span className="review-inline-value">{formData.personAddress || 'Not provided'}</span>
      </div>

      <div className="review-field-inline">
        <span className="review-inline-label">Contact:</span>
        <span className="review-inline-value">{formData.personContact || 'Not provided'}</span>
      </div>

      {formData.secretaryName && (
        <>
          <div className="review-field-divider"></div>
          <p className="review-alternative-label">Alternatively, return to Secretary via:</p>
          <div className="review-field-inline">
            <span className="review-inline-label">Name:</span>
            <span className="review-inline-value">{formData.secretaryName}</span>
          </div>
        </>
      )}
    </div>

    {/* Motions Section */}
    {motions.length > 0 && (
      <div className="review-card">
        <h3 className="review-card-title">Motions ({motions.length})</h3>
        {motions.map((motion, index) => (
          <div key={motion.id} className="review-motion-item">
            <div className="review-motion-number">{index + 1}. {motion.title}</div>
            <div className="review-motion-desc">The Committee resolve to {motion.description}</div>
            <div className="review-motion-hurdle">Hurdle: {motion.hurdleRate}%</div>
          </div>
        ))}
      </div>
    )}

    {/* Attachments Section */}
    {generalAttachments.length > 0 && (
      <div className="review-card">
        <h3 className="review-card-title">General Attachments ({generalAttachments.length})</h3>
        {generalAttachments.map((file, index) => (
          <div key={index} className="review-attachment-item">
            <span>{file.name}</span>
            <span className="review-attachment-size">{(file.size / 1024).toFixed(2)} KB</span>
          </div>
        ))}
      </div>
    )}
  </div>
)

// ============================================================================
// MAIN MODAL COMPONENT
// ============================================================================

/**
 * BallotCreationModal Component
 * 
 * Multi-step modal for creating a new ballot.
 * 
 * Steps:
 * 1. Basic Info - Title, description, deadline, corporation
 * 2. Motions - Add motions for voting
 * 3. Attachments - Upload supporting documents
 * 4. Review - Review all information before publishing
 * 
 * Features:
 * - Step-by-step wizard interface
 * - Form validation
 * - Progress indicator
 * - Draft saving capability
 * - Drag-and-drop file upload
 * - Edit motion functionality
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback to close modal
 * @param {Function} onSubmit - Callback when ballot is published
 */
const BallotCreationModal = React.memo(({ isOpen, onClose, onSubmit }) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadlineDate: '',
    deadlineTime: '05:00 PM',
    corporation: DEFAULT_CORPORATION,
    personName: '',
    personPosition: '',
    personAddress: '',
    personContact: '',
    secretaryName: ''
  })
  const [motions, setMotions] = useState([])
  const [newMotion, setNewMotion] = useState({
    title: '',
    description: '',
    hurdleRate: '',
    attachments: []
  })
  const [generalAttachments, setGeneralAttachments] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState({})

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle form input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = useCallback((e) => {
    try {
      const { name, value } = e.target
      
      if (!name) {
        console.error('Input element missing name attribute')
        return
      }

      setFormData(prev => ({ ...prev, [name]: value }))
      
      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    } catch (error) {
      console.error('Error handling input change:', error)
    }
  }, [errors])

  /**
   * Handle motion input change
   * @param {Event} e - Input change event
   */
  const handleMotionInputChange = useCallback((e) => {
    try {
      const { name, value } = e.target
      
      if (!name) {
        console.error('Input element missing name attribute')
        return
      }

      setNewMotion(prev => ({ ...prev, [name]: value }))
    } catch (error) {
      console.error('Error handling motion input change:', error)
    }
  }, [])

  /**
   * Handle motion file attachment
   * @param {Event} e - File input change event
   */
  const handleFileChange = useCallback((e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      const files = Array.from(e.target.files)
      setNewMotion(prev => ({ ...prev, attachments: files }))
    } catch (error) {
      console.error('Error handling file change:', error)
      alert('Failed to attach files. Please try again.')
    }
  }, [])

  /**
   * Add a new motion to the list
   */
  const handleAddMotion = useCallback(() => {
    try {
      // Validate motion data
      if (!newMotion.title || !newMotion.title.trim()) {
        alert('Please enter a motion title')
        return
      }

      if (!newMotion.description || !newMotion.description.trim()) {
        alert('Please enter a motion description')
        return
      }

      if (!newMotion.hurdleRate || isNaN(newMotion.hurdleRate)) {
        alert('Please enter a valid hurdle rate')
        return
      }

      const hurdleRate = parseFloat(newMotion.hurdleRate)
      if (hurdleRate < 0 || hurdleRate > 100) {
        alert('Hurdle rate must be between 0 and 100')
        return
      }

      // Add motion with unique ID
      setMotions(prev => [...prev, { ...newMotion, id: Date.now() }])
      
      // Reset form
      setNewMotion({ title: '', description: '', hurdleRate: '', attachments: [] })
    } catch (error) {
      console.error('Error adding motion:', error)
      alert('Failed to add motion. Please try again.')
    }
  }, [newMotion])

  /**
   * Remove a motion from the list
   * @param {number} id - Motion ID to remove
   */
  const handleRemoveMotion = useCallback((id) => {
    try {
      if (!id) {
        console.error('No motion ID provided')
        return
      }

      setMotions(prev => prev.filter(motion => motion.id !== id))
    } catch (error) {
      console.error('Error removing motion:', error)
      alert('Failed to remove motion. Please try again.')
    }
  }, [])

  /**
   * Edit an existing motion
   * @param {Object} motion - Motion to edit
   */
  const handleEditMotion = useCallback((motion) => {
    try {
      if (!motion || !motion.id) {
        console.error('Invalid motion object')
        return
      }

      // Populate form with motion data
      setNewMotion({
        title: motion.title || '',
        description: motion.description || '',
        hurdleRate: motion.hurdleRate || '',
        attachments: motion.attachments || []
      })
      
      // Remove motion from list (will be re-added when saved)
      setMotions(prev => prev.filter(m => m.id !== motion.id))
    } catch (error) {
      console.error('Error editing motion:', error)
      alert('Failed to edit motion. Please try again.')
    }
  }, [])

  /**
   * Handle general attachment file selection
   * @param {Event} e - File input change event
   */
  const handleGeneralAttachmentChange = useCallback((e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }

      const files = Array.from(e.target.files)
      setGeneralAttachments(prev => [...prev, ...files])
    } catch (error) {
      console.error('Error handling attachment change:', error)
      alert('Failed to attach files. Please try again.')
    }
  }, [])

  /**
   * Remove a general attachment
   * @param {number} index - Index of attachment to remove
   */
  const handleRemoveGeneralAttachment = useCallback((index) => {
    try {
      if (typeof index !== 'number' || index < 0) {
        console.error('Invalid attachment index')
        return
      }

      setGeneralAttachments(prev => prev.filter((_, i) => i !== index))
    } catch (error) {
      console.error('Error removing attachment:', error)
      alert('Failed to remove attachment. Please try again.')
    }
  }, [])

  /**
   * Handle drag over event for file drop zone
   * @param {DragEvent} e - Drag event
   */
  const handleDragOver = useCallback((e) => {
    try {
      e.preventDefault()
      setIsDragging(true)
    } catch (error) {
      console.error('Error handling drag over:', error)
    }
  }, [])

  /**
   * Handle drag leave event for file drop zone
   * @param {DragEvent} e - Drag event
   */
  const handleDragLeave = useCallback((e) => {
    try {
      e.preventDefault()
      setIsDragging(false)
    } catch (error) {
      console.error('Error handling drag leave:', error)
    }
  }, [])

  /**
   * Handle file drop event
   * @param {DragEvent} e - Drop event
   */
  const handleDrop = useCallback((e) => {
    try {
      e.preventDefault()
      setIsDragging(false)
      
      if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
        return
      }

      const files = Array.from(e.dataTransfer.files)
      setGeneralAttachments(prev => [...prev, ...files])
    } catch (error) {
      console.error('Error handling file drop:', error)
      alert('Failed to upload files. Please try again.')
    }
  }, [])

  /**
   * Handle next button click
   * Validates current step before proceeding
   */
  const handleNext = useCallback(() => {
    try {
      // Clear previous errors
      setErrors({})
      
      // Validate Step 1 - Basic Info
      if (currentStep === 1) {
        const newErrors = {}
        
        if (!formData.title || formData.title.trim().length < 5) {
          newErrors.title = 'Ballot title must be at least 5 characters'
        }
        
        if (!formData.description || formData.description.trim().length < 10) {
          newErrors.description = 'Ballot description must be at least 10 characters'
        }
        
        // If validation fails, show errors and don't proceed
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors)
          return
        }
      }
      
      // Validate Step 2 - Motions
      if (currentStep === 2 && motions.length === 0) {
        alert('Please add at least one motion before continuing.')
        return
      }
      
      // Move to next step
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    } catch (error) {
      console.error('Error proceeding to next step:', error)
      alert('An error occurred. Please try again.')
    }
  }, [currentStep, motions.length, formData.title, formData.description])

  /**
   * Handle back button click
   * Navigate to previous step
   */
  const handleBack = useCallback(() => {
    try {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1)
      }
    } catch (error) {
      console.error('Error going back:', error)
    }
  }, [currentStep])

  /**
   * Handle save draft button click
   * In a real app, this would save the current state to localStorage or backend
   */
  const handleSaveDraft = useCallback(() => {
    try {
      console.log('Saving draft...')
      // TODO: Implement draft saving functionality
      // This could save to localStorage or send to backend
      const draftData = {
        formData,
        motions,
        generalAttachments: generalAttachments.map(f => f.name), // Can't serialize File objects
        currentStep
      }
      
      console.log('Draft data:', draftData)
      alert('Draft saved! (This is a placeholder - implement actual save logic)')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save draft. Please try again.')
    }
  }, [formData, motions, generalAttachments, currentStep])

  /**
   * Handle final submit
   * Validates all data and calls onSubmit callback
   */
  const handleSubmit = useCallback(() => {
    try {
      // Final validation
      if (!formData.title || !formData.description) {
        alert('Please complete all required fields')
        return
      }

      if (motions.length === 0) {
        alert('Please add at least one motion')
        return
      }

      // Prepare ballot data
      const ballotData = {
        title: formData.title,
        description: formData.description,
        deadlineDate: formData.deadlineDate,
        deadlineTime: formData.deadlineTime,
        corporation: formData.corporation,
        personName: formData.personName,
        personPosition: formData.personPosition,
        personAddress: formData.personAddress,
        personContact: formData.personContact,
        secretaryName: formData.secretaryName,
        motions: motions,
        attachments: generalAttachments
      }

      console.log('Submitting ballot:', ballotData)
      onSubmit(ballotData)
    } catch (error) {
      console.error('Error submitting ballot:', error)
      alert('Failed to publish ballot. Please try again.')
    }
  }, [formData, motions, generalAttachments, onSubmit])

  /**
   * Check if current step is valid
   * Used to enable/disable the Next button
   * @returns {boolean} Whether the current step has valid data
   */
  const isStepValid = useCallback(() => {
    try {
      if (currentStep === 1) {
        return formData.title.trim().length >= 5 && 
               formData.description.trim().length >= 10
      }
      if (currentStep === 2) {
        return motions.length > 0
      }
      // Steps 3 and 4 are always valid (attachments are optional)
      return true
    } catch (error) {
      console.error('Error validating step:', error)
      return false
    }
  }, [currentStep, formData.title, formData.description, motions.length])

  // ============================================================================
  // RENDER
  // ============================================================================

  // Don't render modal if not open
  if (!isOpen) return null

  /**
   * Render the appropriate step content based on currentStep
   * @returns {JSX.Element} The step component
   */
  const renderStepContent = () => {
    try {
      switch (currentStep) {
        case 1:
          return <Step1BasicInfo formData={formData} handleInputChange={handleInputChange} errors={errors} />
        case 2:
          return (
            <Step2Motions
              motions={motions}
              newMotion={newMotion}
              onMotionInputChange={handleMotionInputChange}
              onFileChange={handleFileChange}
              onAddMotion={handleAddMotion}
              onEditMotion={handleEditMotion}
              onRemoveMotion={handleRemoveMotion}
            />
          )
        case 3:
          return (
            <Step3Attachments
              generalAttachments={generalAttachments}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileChange={handleGeneralAttachmentChange}
              onRemoveAttachment={handleRemoveGeneralAttachment}
            />
          )
        case 4:
          return (
            <Step4Review
              formData={formData}
              motions={motions}
              generalAttachments={generalAttachments}
            />
          )
        default:
          console.error('Invalid step:', currentStep)
          return null
      }
    } catch (error) {
      console.error('Error rendering step content:', error)
      return (
        <div className="error-state">
          <p>An error occurred while loading this step. Please try again.</p>
        </div>
      )
    }
  }

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <h2 className="modal-title">Create Ballot</h2>
            <p className="modal-subtitle">Create a new ballot for member voting</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <Icon name="close" size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {BALLOT_STEPS.map((step, index) => (
            <div key={step.number} className="step-wrapper">
              <div className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
                <div className="step-circle">
                  {currentStep > step.number ? (
                    <Icon name="check" size={16} strokeWidth={3} />
                  ) : (
                    step.number
                  )}
                </div>
                <div className="step-labels">
                  <div className="step-label">{step.label}</div>
                  <div className="step-subtitle">{step.subtitle}</div>
                </div>
              </div>
              {index < BALLOT_STEPS.length - 1 && (
                <div className={`step-connector ${currentStep > step.number ? 'completed' : ''}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="modal-content">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-text" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <div className="footer-actions">
            {currentStep > 1 && (
              <button className="btn-secondary" onClick={handleBack}>
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Next
                <Icon name="chevronRight" size={16} />
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit}>
                Publish Ballot
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

BallotCreationModal.displayName = 'BallotCreationModal'

export default BallotCreationModal
