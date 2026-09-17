export interface BidEntry {
  projectId: string;
  projectName: string;
  estimatedCost: number;
  bids: { company: string; companyId: string; amount: number; winner: boolean }[];
  finalCost: number;
  signals: string[];
}

export const procurementData: BidEntry[] = [
  {
    projectId: 'PRJ-1042',
    projectName: 'Urban Road Resurfacing',
    estimatedCost: 5.2,
    bids: [
      { company: 'Bharat InfraWorks', companyId: 'CMP-001', amount: 5.0, winner: true },
      { company: 'Apex Roads & Engineering', companyId: 'CMP-004', amount: 5.4, winner: false },
      { company: 'GreenLine Projects', companyId: 'CMP-009', amount: 5.8, winner: false },
    ],
    finalCost: 5.7,
    signals: ['Final cost 14% above winning bid', 'Large final-cost variation'],
  },
  {
    projectId: 'PRJ-1035',
    projectName: 'Community Health Center',
    estimatedCost: 3.4,
    bids: [
      { company: 'Shakti Civil Projects', companyId: 'CMP-002', amount: 3.2, winner: true },
      { company: 'Vertex Engineering', companyId: 'CMP-008', amount: 3.5, winner: false },
      { company: 'National Build Systems', companyId: 'CMP-010', amount: 3.6, winner: false },
    ],
    finalCost: 3.15,
    signals: [],
  },
  {
    projectId: 'PRJ-1040',
    projectName: 'Flyover Construction Phase-2',
    estimatedCost: 6.5,
    bids: [
      { company: 'Horizon BuildTech', companyId: 'CMP-003', amount: 6.2, winner: true },
      { company: 'MetroCore Infrastructure', companyId: 'CMP-005', amount: 6.8, winner: false },
      { company: 'Bharat InfraWorks', companyId: 'CMP-001', amount: 7.1, winner: false },
    ],
    finalCost: 6.9,
    signals: ['Final cost 11% above winning bid'],
  },
  {
    projectId: 'PRJ-1029',
    projectName: 'District Hospital Extension',
    estimatedCost: 4.5,
    bids: [
      { company: 'Bharat InfraWorks', companyId: 'CMP-001', amount: 4.2, winner: true },
      { company: 'Navya Construction Group', companyId: 'CMP-006', amount: 4.6, winner: false },
      { company: 'Shakti Civil Projects', companyId: 'CMP-002', amount: 4.8, winner: false },
    ],
    finalCost: 4.8,
    signals: ['Final cost 14.3% above winning bid'],
  },
  {
    projectId: 'PRJ-1036',
    projectName: 'Metro Station Plaza',
    estimatedCost: 5.0,
    bids: [
      { company: 'MetroCore Infrastructure', companyId: 'CMP-005', amount: 4.8, winner: true },
      { company: 'Pioneer Urban Works', companyId: 'CMP-007', amount: 5.2, winner: false },
      { company: 'Horizon BuildTech', companyId: 'CMP-003', amount: 5.4, winner: false },
    ],
    finalCost: 4.7,
    signals: [],
  },
  {
    projectId: 'PRJ-1026',
    projectName: 'Water Tank Construction',
    estimatedCost: 3.6,
    bids: [
      { company: 'Navya Construction Group', companyId: 'CMP-006', amount: 3.4, winner: true },
      { company: 'Vertex Engineering', companyId: 'CMP-008', amount: 3.7, winner: false },
    ],
    finalCost: 3.8,
    signals: ['Final cost 11.8% above winning bid'],
  },
  {
    projectId: 'PRJ-1016',
    projectName: 'Sewage Treatment Plant',
    estimatedCost: 2.8,
    bids: [
      { company: 'GreenLine Projects', companyId: 'CMP-009', amount: 2.6, winner: true },
      { company: 'Bharat InfraWorks', companyId: 'CMP-001', amount: 2.9, winner: false },
      { company: 'Apex Roads & Engineering', companyId: 'CMP-004', amount: 3.0, winner: false },
    ],
    finalCost: 3.0,
    signals: ['Final cost 15.4% above winning bid'],
  },
];
