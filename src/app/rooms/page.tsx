'use client';

import { useState, useEffect } from 'react';
import RoomForm from '@/components/rooms/RoomForm';
import RoomList from '@/components/rooms/RoomList';
import { Room } from '@/types/room';
import styles from './page.module.css';

export default function Rooms() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = async (roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/rooms', {
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
      setError('Failed to add room. Please try again.');
    }
  };

  const handleEditRoom = async (room: Room) => {
    setEditingRoom(room);
    setShowAddForm(true);
  };

  const handleUpdateRoom = async (roomData: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingRoom) return;

    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${editingRoom.roomNumber}`, {
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
        room.roomNumber === editingRoom.roomNumber ? updatedRoom : room
      ));
      setShowAddForm(false);
      setEditingRoom(null);
    } catch (error) {
      console.error('Error updating room:', error);
      setError('Failed to update room. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading rooms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

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
