import React from 'react'

// Centralized icon component to reduce SVG duplication
const Icon = ({ name, size = 20, strokeWidth = 2, className = '', ...props }) => {
  const icons = {
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
      </svg>
    ),
    building: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="9" y1="6" x2="15" y2="6"></line>
        <line x1="9" y1="10" x2="15" y2="10"></line>
        <line x1="9" y1="14" x2="15" y2="14"></line>
        <line x1="9" y1="18" x2="15" y2="18"></line>
      </svg>
    ),
    chevronDown: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    moon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ),
    close: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    sort: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="m21 16-4 4-4-4"></path>
        <path d="M17 20V4"></path>
        <path d="m3 8 4-4 4 4"></path>
        <path d="M7 4v16"></path>
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    ),
    file: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    ),
    fileUpload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    ),
    grid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    ballot: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M9 11H15M9 15H15M21 11.5V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H12.5M15 9V3M12 6H18"></path>
      </svg>
    ),
    message: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.9706 16.9706 21 12 21C10.4607 21 9.01172 20.6146 7.74467 19.9389L3 21L4.06106 16.2553C3.38541 14.9883 3 13.5393 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path>
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
        <polyline points="3 7 12 13 21 7"></polyline>
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} {...props}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m9-9h-6M7 12H1m16.24-7.24l-4.24 4.24m0 5.66l4.24 4.24M7.76 4.76l4.24 4.24m0 5.66l-4.24 4.24"></path>
      </svg>
    ),
  }

  return icons[name] || null
}

export default Icon
