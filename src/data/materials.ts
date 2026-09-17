export interface MaterialAuditEntry {
  projectId: string;
  projectName: string;
  material: string;
  supplier: string;
  verifiedSupplier: boolean;
  referencePrice: number;
  purchasePrice: number;
  unit: string;
  invoiceVerified: boolean;
  deviation: number;
}

export const materialsAudit: MaterialAuditEntry[] = [
  { projectId: 'PRJ-1042', projectName: 'Urban Road Resurfacing', material: 'Asphalt', supplier: 'RK Bitumen Supply', verifiedSupplier: true, referencePrice: 5200, purchasePrice: 6150, unit: 'per ton', invoiceVerified: true, deviation: 18.3 },
  { projectId: 'PRJ-1042', projectName: 'Urban Road Resurfacing', material: 'Crushed Stone', supplier: 'Deccan Aggregates', verifiedSupplier: true, referencePrice: 1800, purchasePrice: 1950, unit: 'per ton', invoiceVerified: true, deviation: 8.3 },
  { projectId: 'PRJ-1042', projectName: 'Urban Road Resurfacing', material: 'Steel Reinforcement', supplier: 'Tata Steel Dealers', verifiedSupplier: true, referencePrice: 62000, purchasePrice: 64500, unit: 'per ton', invoiceVerified: true, deviation: 4.0 },
  { projectId: 'PRJ-1042', projectName: 'Urban Road Resurfacing', material: 'Road Marking Paint', supplier: 'ColorCoat Industries', verifiedSupplier: false, referencePrice: 320, purchasePrice: 340, unit: 'per litre', invoiceVerified: false, deviation: 6.3 },
  { projectId: 'PRJ-1029', projectName: 'District Hospital Extension', material: 'Cement (PPC)', supplier: 'ACC Dealers', verifiedSupplier: true, referencePrice: 360, purchasePrice: 385, unit: 'per bag', invoiceVerified: true, deviation: 6.9 },
  { projectId: 'PRJ-1029', projectName: 'District Hospital Extension', material: 'Electrical Wiring', supplier: 'Havells Distributors', verifiedSupplier: true, referencePrice: 42, purchasePrice: 46, unit: 'per meter', invoiceVerified: true, deviation: 9.5 },
  { projectId: 'PRJ-1012', projectName: 'Market Complex Renovation', material: 'Fire Rated Doors', supplier: 'Safety First Systems', verifiedSupplier: true, referencePrice: 18000, purchasePrice: 21000, unit: 'per unit', invoiceVerified: true, deviation: 16.7 },
  { projectId: 'PRJ-1019', projectName: 'Internal Roads Phase-1', material: 'Asphalt', supplier: 'RK Bitumen Supply', verifiedSupplier: true, referencePrice: 5200, purchasePrice: 5800, unit: 'per ton', invoiceVerified: true, deviation: 11.5 },
  { projectId: 'PRJ-1035', projectName: 'Community Health Center', material: 'Cement (OPC 53)', supplier: 'UltraTech Distributors', verifiedSupplier: true, referencePrice: 380, purchasePrice: 390, unit: 'per bag', invoiceVerified: true, deviation: 2.6 },
  { projectId: 'PRJ-1035', projectName: 'Community Health Center', material: 'TMT Steel Bars', supplier: 'JSW Steel Dealers', verifiedSupplier: true, referencePrice: 60000, purchasePrice: 61200, unit: 'per ton', invoiceVerified: true, deviation: 2.0 },
  { projectId: 'PRJ-1040', projectName: 'Flyover Construction Phase-2', material: 'Pre-stressed Concrete', supplier: 'Dalmia Cement Corp', verifiedSupplier: true, referencePrice: 6500, purchasePrice: 6800, unit: 'per cu.m', invoiceVerified: true, deviation: 4.6 },
  { projectId: 'PRJ-1026', projectName: 'Water Tank Construction', material: 'Cement', supplier: 'Ambuja Dealers', verifiedSupplier: true, referencePrice: 370, purchasePrice: 395, unit: 'per bag', invoiceVerified: true, deviation: 6.8 },
  { projectId: 'PRJ-1016', projectName: 'Sewage Treatment Plant', material: 'Filtration Media', supplier: 'Aqua Systems', verifiedSupplier: false, referencePrice: 8500, purchasePrice: 9200, unit: 'per ton', invoiceVerified: false, deviation: 8.2 },
  { projectId: 'PRJ-1036', projectName: 'Metro Station Plaza', material: 'Paver Blocks', supplier: 'GreenBuild Materials', verifiedSupplier: true, referencePrice: 45, purchasePrice: 46, unit: 'per piece', invoiceVerified: true, deviation: 2.2 },
  { projectId: 'PRJ-1024', projectName: 'Pedestrian Overpass', material: 'Structural Steel', supplier: 'SAIL Distributors', verifiedSupplier: true, referencePrice: 63000, purchasePrice: 63800, unit: 'per ton', invoiceVerified: true, deviation: 1.3 },
];
