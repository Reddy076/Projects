/**
 * Application Constants
 * 
 * Centralized location for all application-wide constants.
 * This makes it easy to update values and maintain consistency.
 */

// ============================================================================
// CORPORATION CONSTANTS
// ============================================================================

/**
 * List of all available Owners Corporations
 * Used in dropdowns and filters throughout the application
 */
export const CORPORATIONS = [
  'Riverside Towers OC',
  'Parkview Gardens OC',
  'Harbour View Estate OC',
  'Sunset Apartments OC'
]

/**
 * Default corporation to show on initial load
 */
export const DEFAULT_CORPORATION = 'Riverside Towers OC'

// ============================================================================
// USER INFORMATION
// ============================================================================

/**
 * Current user information
 * In a real application, this would come from authentication/session
 */
export const USER_INFO = {
  initials: 'DR',
  name: 'Dasthagiri',
  location: 'Riverside Towers OC',
  role: 'Pod Leader'
}

// ============================================================================
// BALLOT CREATION STEPS
// ============================================================================

/**
 * Steps for the ballot creation wizard
 * Each step has a number, label, and subtitle for the progress indicator
 */
export const BALLOT_STEPS = [
  { number: 1, label: 'Basic Info', subtitle: 'Ballot details' },
  { number: 2, label: 'Motions', subtitle: 'Add motions' },
  { number: 3, label: 'Attachments', subtitle: 'Upload documents' },
  { number: 4, label: 'Review', subtitle: 'Review and publish' }
]

// ============================================================================
// APPLICATION METADATA
// ============================================================================

/**
 * Application version
 * Displayed in the sidebar footer
 */
export const APP_VERSION = 'v1.0'
