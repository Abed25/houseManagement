export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: 'Single' | 'Double' | 'Suite';
  status: 'Available' | 'Occupied' | 'Maintenance';
  price: number;
  description?: string;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
} 