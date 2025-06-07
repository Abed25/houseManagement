import { useState } from 'react';
import { Room } from '@/types/room';
import styles from './RoomForm.module.css';

interface RoomFormProps {
  onSubmit: (room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Room>;
}

export default function RoomForm({ onSubmit, initialData }: RoomFormProps) {
  const [formData, setFormData] = useState({
    roomNumber: initialData?.roomNumber || '',
    floor: initialData?.floor || 1,
    type: initialData?.type || 'Single',
    status: initialData?.status || 'Available',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    amenities: initialData?.amenities || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'floor' || name === 'price' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="roomNumber" className={styles.label}>Room Number</label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="floor" className={styles.label}>Floor</label>
        <input
          type="number"
          id="floor"
          name="floor"
          value={formData.floor}
          onChange={handleChange}
          required
          min="1"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="type" className={styles.label}>Room Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="status" className={styles.label}>Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price" className={styles.label}>Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={styles.textarea}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.submitButton}
        >
          {initialData ? 'Update Room' : 'Add Room'}
        </button>
      </div>
    </form>
  );
} 