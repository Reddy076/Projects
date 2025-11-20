import React, { useState, useCallback } from 'react'
import { CORPORATIONS, DEFAULT_CORPORATION, BALLOT_STEPS } from '../../constants'
import Icon from '../common/Icon'
import '../../styles/BallotCreationModal.css'

// ============================================================================
// STEP COMPONENTS - Each step is a separate component for better organization
// ============================================================================

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

const BallotCreationModal = React.memo(({ isOpen, onClose, onSubmit }) => {
  // State Management
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

  // Event Handlers
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleMotionInputChange = useCallback((e) => {
    const { name, value } = e.target
    setNewMotion(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleFileChange = useCallback((e) => {
    const files = Array.from(e.target.files)
    setNewMotion(prev => ({ ...prev, attachments: files }))
  }, [])

  const handleAddMotion = useCallback(() => {
    if (newMotion.title && newMotion.description && newMotion.hurdleRate) {
      setMotions(prev => [...prev, { ...newMotion, id: Date.now() }])
      setNewMotion({ title: '', description: '', hurdleRate: '', attachments: [] })
    }
  }, [newMotion])

  const handleRemoveMotion = useCallback((id) => {
    setMotions(prev => prev.filter(motion => motion.id !== id))
  }, [])

  const handleEditMotion = useCallback((motion) => {
    setNewMotion({
      title: motion.title,
      description: motion.description,
      hurdleRate: motion.hurdleRate,
      attachments: motion.attachments
    })
    setMotions(prev => prev.filter(m => m.id !== motion.id))
  }, [])

  const handleGeneralAttachmentChange = useCallback((e) => {
    const files = Array.from(e.target.files)
    setGeneralAttachments(prev => [...prev, ...files])
  }, [])

  const handleRemoveGeneralAttachment = useCallback((index) => {
    setGeneralAttachments(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setGeneralAttachments(prev => [...prev, ...files])
  }, [])

  const handleNext = useCallback(() => {
    // Clear previous errors
    setErrors({})
    
    // Validate Step 1
    if (currentStep === 1) {
      const newErrors = {}
      
      if (!formData.title || formData.title.trim().length < 5) {
        newErrors.title = 'Ballot title must be at least 5 characters'
      }
      
      if (!formData.description || formData.description.trim().length < 10) {
        newErrors.description = 'Ballot description must be at least 10 characters'
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
    }
    
    // Validate Step 2
    if (currentStep === 2 && motions.length === 0) {
      alert('Please add at least one motion before continuing.')
      return
    }
    
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }, [currentStep, motions.length, formData.title, formData.description])

  const handleBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }, [currentStep])

  const handleSaveDraft = useCallback(() => {
    console.log('Saving draft...')
  }, [])

  const handleSubmit = useCallback(() => {
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
    onSubmit(ballotData)
  }, [formData, motions, generalAttachments, onSubmit])

  // Check if current step is valid
  const isStepValid = useCallback(() => {
    if (currentStep === 1) {
      return formData.title.trim().length >= 5 && 
             formData.description.trim().length >= 10
    }
    if (currentStep === 2) {
      return motions.length > 0
    }
    return true
  }, [currentStep, formData.title, formData.description, motions.length])

  if (!isOpen) return null

  // Render Step Content
  const renderStepContent = () => {
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
        return null
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
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
