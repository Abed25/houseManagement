import { NextResponse } from 'next/server';

// GET /api/rooms/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${process.env.API_URL}/rooms/${params.id}`);
    if (!response.ok) {
      throw new Error('Room not found');
    }
    const room = await response.json();
    return NextResponse.json(room);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 404 }
    );
  }
}

// PUT /api/rooms/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const roomData = await request.json();
    
    const response = await fetch(`${process.env.API_URL}/rooms/${params.id}`, {
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
    return NextResponse.json(updatedRoom);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    );
  }
}

// DELETE /api/rooms/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${process.env.API_URL}/rooms/${params.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete room');
    }

    return NextResponse.json({ message: 'Room deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete room' },
      { status: 500 }
    );
  }
} 