import { NextResponse } from 'next/server';
import { Room } from '@/types/room';

// GET /api/rooms
export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/rooms`);
    const rooms = await response.json();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

// POST /api/rooms
export async function POST(request: Request) {
  try {
    const roomData = await request.json();
    
    const response = await fetch(`${process.env.API_URL}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }

    const newRoom = await response.json();
    return NextResponse.json(newRoom);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
} 