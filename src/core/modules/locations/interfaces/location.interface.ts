export interface Location {
    id: number;
    city: string;
    state: string;
    zipCode: number;
    areaName: string;
    wardNo: number;
    dist: string;
    createdAt: Date;
    updatedAt: Date;
}

export const DEFAULT_LOCATION: Partial<Location> = {
  city: 'Dhubri',
  state: 'Assam',
  dist: 'Dhubri',
  createdAt: new Date(),
  updatedAt: new Date()
};