"use client";

import { useDrag } from 'react-dnd';

interface DraggableLetterProps {
  letter: string;
}

const DraggableLetter: React.FC<DraggableLetterProps> = ({ letter }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'letter',
    item: { letter },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {letter}
    </div>
  );
};

export default DraggableLetter;