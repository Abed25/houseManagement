import { useState } from 'react';
import styles from './RoomList.module.css';

interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
  price: number;
  description: string;
}

interface RoomListProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
}

export default function RoomList({ rooms, onEdit }: RoomListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return styles.statusAvailable;
      case 'occupied':
        return styles.statusOccupied;
      case 'maintenance':
        return styles.statusMaintenance;
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {filteredRooms.length === 0 ? (
        <div className={styles.emptyState}>No rooms found</div>
      ) : (
        <div className={styles.roomGrid}>
          {filteredRooms.map((room) => (
            <div key={room.id} className={styles.roomCard}>
              <div className={styles.roomHeader}>
                <div>
                  <h3 className={styles.roomTitle}>Room {room.number}</h3>
                  <p className={styles.roomFloor}>Floor {room.floor}</p>
                </div>
                <span className={`${styles.statusBadge} ${getStatusColor(room.status)}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
              <div className={styles.roomDetails}>
                <p className={styles.detailItem}>
                  <span className={styles.detailLabel}>Type:</span>
                  {room.type}
                </p>
                <p className={styles.detailItem}>
                  <span className={styles.detailLabel}>Price:</span>
                  ${room.price}/night
                </p>
                <p className={styles.detailItem}>
                  <span className={styles.detailLabel}>Description:</span>
                  {room.description}
                </p>
              </div>
              <button
                onClick={() => onEdit(room)}
                className={styles.editButton}
              >
                Edit Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 