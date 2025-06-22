import { useState } from 'react';
import { Room } from '@/types/room';
import styles from './RoomList.module.css';

interface RoomListProps {
  rooms: Room[];
  onEdit: (room: Room) => void;
  onDelete: (room: Room) => void;
}

export default function RoomList({ rooms, onEdit, onDelete }: RoomListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredRooms = rooms.filter(room => {
    const searchTermLower = searchTerm.toLowerCase();
    const roomNumberLower = room.roomNumber?.toLowerCase() || '';
    const roomTypeLower = room.roomType?.toLowerCase() || '';
    
    const matchesSearch = roomNumberLower.includes(searchTermLower) ||
      roomTypeLower.includes(searchTermLower);
    const matchesType = typeFilter === 'all' || room.roomType === typeFilter;
    return matchesSearch && matchesType;
  });

  // Get unique room types for the filter dropdown
  const roomTypes = Array.from(new Set(rooms.map(room => room.roomType).filter(Boolean)));

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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={styles.statusSelect}
        >
          <option value="all">All Types</option>
          {roomTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {filteredRooms.length === 0 ? (
        <div className={styles.emptyState}>No rooms found</div>
      ) : (
        <div className={styles.roomGrid}>
          {filteredRooms.map((room) => (
            <div key={room.roomNumber} className={styles.roomCard}>
              <div className={styles.roomHeader}>
                <div>
                  <h3 className={styles.roomTitle}>Room {room.roomNumber}</h3>
                  <p className={styles.roomFloor}>{room.Floor} Floor</p>
                </div>
                <span className={styles.statusBadge}>
                  {room.roomType}
                </span>
              </div>
              <div className={styles.roomDetails}>
                <p className={styles.detailItem}>
                  <span className={styles.detailLabel}>Type:</span>
                  {room.roomType}
                </p>
                <p className={styles.detailItem}>
                  <span className={styles.detailLabel}>Rent:</span>
                  KES {room.roomRent}/month
                </p>
                <p className={styles.detailItem}>
                  <span className={styles.detailLabel}>Deposit:</span>
                  KES {room.roomDeposit}
                </p>
              </div>
              <button
                onClick={() => onEdit(room)}
                className={styles.editButton}
              >
                Edit Room
              </button>
              <button
                onClick={() => onDelete(room)}
                className={styles.deleteButton}
              >
                Delete Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 