/**
 * Default ballot data for initial display
 * Used to populate the ballot table when no user-created ballots exist
 */

export const DEFAULT_BALLOTS = [
  {
    id: 1,
    corporation: 'Riverside Towers OC',
    title: 'Annual Budget Approval 2024',
    status: 'Active',
    participation: 68,
    deadline: '2025-12-31',
    createdAt: '2024-01-15T10:00:00Z',
    description: 'Vote on the proposed annual budget for fiscal year 2024-2025',
    motions: [
      'Approve annual budget',
      'Allocate reserve funds',
      'Approve maintenance schedule'
    ],
    attachments: []
  },
  {
    id: 2,
    corporation: 'Parkview Gardens OC',
    title: 'Swimming Pool Renovation',
    status: 'Active',
    participation: 45,
    deadline: '2025-12-15',
    createdAt: '2024-01-10T14:30:00Z',
    description: 'Proposal to renovate and upgrade the community swimming pool facilities',
    motions: [
      'Approve renovation plans',
      'Approve contractor selection',
      'Approve budget allocation'
    ],
    attachments: []
  },
  {
    id: 3,
    corporation: 'Harbour View Estate OC',
    title: 'New Security System Implementation',
    status: 'Active',
    participation: 82,
    deadline: '2026-01-30',
    createdAt: '2024-01-05T09:15:00Z',
    description: 'Vote on installing a new modern security system with cameras and access control',
    motions: [
      'Approve security system upgrade',
      'Approve vendor contract',
      'Approve installation timeline'
    ],
    attachments: []
  }
]
