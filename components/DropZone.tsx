"use client";

import { useDrop } from 'react-dnd';

interface DropZoneProps {
  onDrop: (letter: string) => void;
  letters: string[];
}

const DropZone: React.FC<DropZoneProps> = ({ onDrop, letters }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'letter',
    drop: (item: { letter: string }) => onDrop(item.letter),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-64 h-16 border-4 ${
        isOver ? 'border-green-500' : 'border-gray-300'
      } rounded-lg flex items-center justify-center space-x-2 mx-auto`}
    >
      {letters.map((letter, index) => (
        <div
          key={index}
          className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-xl font-bold"
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default DropZone;