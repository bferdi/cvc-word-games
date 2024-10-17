"use client";

import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import DraggableLetter from '@/components/DraggableLetter';
import DropZone from '@/components/DropZone';

const words = [
  { word: 'cat', emoji: '🐱' },
  { word: 'dog', emoji: '🐶' },
  { word: 'pig', emoji: '🐷' },
  { word: 'sun', emoji: '☀️' },
  { word: 'hat', emoji: '🎩' },
];

export default function DragAndDropPage() {
  const [currentWord, setCurrentWord] = useState({ word: '', emoji: '' });
  const [letters, setLetters] = useState<string[]>([]);
  const [droppedLetters, setDroppedLetters] = useState<string[]>([]);

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    const wordObj = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(wordObj);
    setLetters(wordObj.word.split('').sort(() => Math.random() - 0.5));
    setDroppedLetters(Array(wordObj.word.length).fill(''));
  };

  const handleDrop = (letter: string, index: number) => {
    const newDroppedLetters = [...droppedLetters];
    newDroppedLetters[index] = letter;
    setDroppedLetters(newDroppedLetters);
  };

  const checkWord = () => {
    if (droppedLetters.join('') === currentWord.word) {
      alert('Correct! Great job!');
      newWord();
    } else {
      alert('Not quite right. Try again!');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Drag and Drop Letters</h1>
        <div className="text-6xl mb-4">{currentWord.emoji}</div>
        <div className="mb-8">
          <DropZone onDrop={handleDrop} letters={droppedLetters} />
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          {letters.map((letter, index) => (
            <DraggableLetter key={index} letter={letter} />
          ))}
        </div>
        <Button onClick={checkWord} className="bg-yellow-400 hover:bg-yellow-500 text-black">
          Check Word
        </Button>
      </div>
    </DndProvider>
  );
}