export interface AssetEvent {
  year: number;
  type: string;
  projectId: string;
  projectName: string;
  contractor: string;
  amount: number;
  description: string;
}

export interface Asset {
  id: string;
  name: string;
  location: string;
  events: AssetEvent[];
  earlyReintervention: boolean;
  reinterventionMonths?: number;
}

export const assets: Asset[] = [
  {
    id: 'AST-001',
    name: 'SH-204 — Main Road Segment',
    location: 'Hyderabad, Telangana',
    events: [
      { year: 2022, type: 'Construction', projectId: 'PRJ-1008', projectName: 'Municipal Drain Network', contractor: 'Bharat InfraWorks', amount: 2.6, description: 'Original drainage construction along SH-204' },
      { year: 2024, type: 'Drainage Repair', projectId: 'PRJ-1038', projectName: 'NH-44 Bridge Repair', contractor: 'Bharat InfraWorks', amount: 0.8, description: 'Drainage maintenance and repair work' },
      { year: 2025, type: 'Resurfacing', projectId: 'PRJ-1042', projectName: 'Urban Road Resurfacing', contractor: 'Bharat InfraWorks', amount: 5.0, description: 'Complete road resurfacing — 11 months after drainage work' },
    ],
    earlyReintervention: true,
    reinterventionMonths: 11,
  },
  {
    id: 'AST-002',
    name: 'District Hospital Complex',
    location: 'Nizamabad, Telangana',
    events: [
      { year: 2020, type: 'Construction', projectId: 'PRJ-1010', projectName: 'Hospital Main Building', contractor: 'Shakti Civil Projects', amount: 6.2, description: 'Original hospital construction' },
      { year: 2023, type: 'Extension', projectId: 'PRJ-1029', projectName: 'District Hospital Extension', contractor: 'Bharat InfraWorks', amount: 4.2, description: '100-bed ward extension — 36 months after original' },
    ],
    earlyReintervention: false,
  },
  {
    id: 'AST-003',
    name: 'NH-44 Bridge Structure',
    location: 'Karimnagar, Telangana',
    events: [
      { year: 2018, type: 'Construction', projectId: 'PRJ-0985', projectName: 'NH-44 Bridge Construction', contractor: 'MetroCore Infrastructure', amount: 8.5, description: 'Original bridge construction' },
      { year: 2024, type: 'Repair', projectId: 'PRJ-1038', projectName: 'NH-44 Bridge Repair', contractor: 'Bharat InfraWorks', amount: 3.8, description: 'Structural repair — 72 months after construction' },
    ],
    earlyReintervention: false,
  },
  {
    id: 'AST-004',
    name: 'Central Market Complex',
    location: 'Aurangabad, Maharashtra',
    events: [
      { year: 2019, type: 'Construction', projectId: 'PRJ-0990', projectName: 'Market Complex Construction', contractor: 'Navya Construction Group', amount: 4.8, description: 'Original market complex' },
      { year: 2023, type: 'Renovation', projectId: 'PRJ-1012', projectName: 'Market Complex Renovation', contractor: 'Horizon BuildTech', amount: 2.2, description: 'Fire safety upgrade renovation' },
    ],
    earlyReintervention: false,
  },
  {
    id: 'AST-005',
    name: 'Industrial Area Roads',
    location: 'Solapur, Maharashtra',
    events: [
      { year: 2021, type: 'Construction', projectId: 'PRJ-0998', projectName: 'Industrial Road Network', contractor: 'Apex Roads & Engineering', amount: 3.5, description: 'Original road construction' },
      { year: 2023, type: 'Phase-1 Repair', projectId: 'PRJ-1019', projectName: 'Internal Roads Phase-1', contractor: 'Apex Roads & Engineering', amount: 2.8, description: 'Road repair — 18 months after construction' },
    ],
    earlyReintervention: true,
    reinterventionMonths: 18,
  },
  {
    id: 'AST-006',
    name: 'Government School Campus',
    location: 'Medak, Telangana',
    events: [
      { year: 2015, type: 'Construction', projectId: 'PRJ-0920', projectName: 'School Original Building', contractor: 'National Build Systems', amount: 2.0, description: 'Original school construction' },
      { year: 2022, type: 'New Complex', projectId: 'PRJ-1015', projectName: 'School Building Complex', contractor: 'Bharat InfraWorks', amount: 2.8, description: 'New building complex — 84 months after original' },
    ],
    earlyReintervention: false,
  },
];
