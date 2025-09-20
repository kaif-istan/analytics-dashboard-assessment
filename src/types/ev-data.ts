export interface EVData {
  'VIN (1-10)': string;
  'County': string;
  'City': string;
  'State': string;
  'Postal Code': string;
  'Model Year': number;
  'Make': string;
  'Model': string;
  'Electric Vehicle Type': 'Battery Electric Vehicle (BEV)' | 'Plug-in Hybrid Electric Vehicle (PHEV)';
  'Clean Alternative Fuel Vehicle (CAFV) Eligibility': string;
  'Electric Range': number;
  'Base MSRP': number;
  'Legislative District': string;
  'DOL Vehicle ID': string;
  'Vehicle Location': string;
  'Electric Utility': string;
  '2020 Census Tract': string;
}

export interface EVStats {
  totalVehicles: number;
  bevCount: number;
  phevCount: number;
  mostPopularMake: string;
  mostCommonModelYear: number;
}

export interface MakeData {
  make: string;
  count: number;
}

export interface YearData {
  year: number;
  count: number;
}