'use client';

import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';
import styles from './DragDropBoard.module.css';
import { useState } from 'react';

const initial = ['Sales', 'Analytics', 'Reports'];

export default function DragDropBoard() {
  const [items, setItems] = useState(initial);

  function handleDrag(result: any) {
    if (!result.destination) return;
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setItems(reordered);
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="dashboard">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={styles.board}>
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided: DraggableProvided) => (
                  <div
                    className={styles.card}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
} 