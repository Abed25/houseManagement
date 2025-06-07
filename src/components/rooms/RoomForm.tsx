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
    Floor: initialData?.Floor || 'ground',
    roomType: initialData?.roomType || 'Single',
    roomRent: initialData?.roomRent || 0,
    roomDeposit: initialData?.roomDeposit || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'roomRent' || name === 'roomDeposit' ? Number(value) : value
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
        <label htmlFor="Floor" className={styles.label}>Floor</label>
        <select
          id="Floor"
          name="Floor"
          value={formData.Floor}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="ground">Ground Floor</option>
          <option value="First">First Floor</option>
          <option value="Second">Second Floor</option>
          <option value="Third">Third Floor</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="roomType" className={styles.label}>Room Type</label>
        <select
          id="roomType"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="Single">Single</option>
          <option value="Bed sitter">Bed sitter</option>
          <option value="One Bedroom">One Bedroom</option>
          <option value="Two Bedroom">Two Bedroom</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="roomRent" className={styles.label}>Monthly Rent (KES)</label>
        <input
          type="number"
          id="roomRent"
          name="roomRent"
          value={formData.roomRent}
          onChange={handleChange}
          required
          min="0"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="roomDeposit" className={styles.label}>Deposit Amount (KES)</label>
        <input
          type="number"
          id="roomDeposit"
          name="roomDeposit"
          value={formData.roomDeposit}
          onChange={handleChange}
          required
          min="0"
          className={styles.input}
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