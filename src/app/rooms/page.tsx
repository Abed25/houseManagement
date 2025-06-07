'use client';

import { useState } from 'react';
import RoomForm from '@/components/rooms/RoomForm';
import RoomList from '@/components/rooms/RoomList';
import { Room } from '@/types/room';
import styles from './page.module.css';

export default function Rooms() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const handleAddRoom = async (roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to add room');
      }

      const newRoom = await response.json();
      setRooms(prev => [...prev, newRoom]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding room:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleEditRoom = async (room: Room) => {
    setEditingRoom(room);
    setShowAddForm(true);
  };

  const handleUpdateRoom = async (roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingRoom) return;

    try {
      const response = await fetch(`/api/rooms/${editingRoom.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('Failed to update room');
      }

      const updatedRoom = await response.json();
      setRooms(prev => prev.map(room => 
        room.id === editingRoom.id ? updatedRoom : room
      ));
      setShowAddForm(false);
      setEditingRoom(null);
    } catch (error) {
      console.error('Error updating room:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Room Management</h1>
        <button
          onClick={() => {
            setEditingRoom(null);
            setShowAddForm(true);
          }}
          className={styles.addButton}
        >
          Add New Room
        </button>
      </div>

      {showAddForm ? (
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>
            {editingRoom ? 'Edit Room' : 'Add New Room'}
          </h2>
          <RoomForm
            onSubmit={editingRoom ? handleUpdateRoom : handleAddRoom}
            initialData={editingRoom || undefined}
          />
          <button
            onClick={() => {
              setShowAddForm(false);
              setEditingRoom(null);
            }}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      ) : (
        <RoomList rooms={rooms} onEdit={handleEditRoom} />
      )}
    </div>
  );
}
