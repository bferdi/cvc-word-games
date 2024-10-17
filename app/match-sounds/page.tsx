"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const sounds = [
  { letter: 'c', sound: 'c' },
  { letter: 'a', sound: 'a' },
  { letter: 't', sound: 't' },
  { letter: 'd', sound: 'd' },
  { letter: 'o', sound: 'o' },
  { letter: 'g', sound: 'g' },
];

export default function MatchSoundsPage() {
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    newRound();
  }, []);

  const newRound = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    setCurrentSound(randomSound.sound);
    
    const correctLetter = randomSound.letter;
    const wrongOptions = sounds
      .filter((s) => s.letter !== correctLetter)
      .map((s) => s.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    setOptions([correctLetter, ...wrongOptions].sort(() => Math.random() - 0.5));
  };

  const playSound = () => {
    if (currentSound) {
      const audio = new Audio(`/sounds/${currentSound}.mp3`);
      audio.onerror = () => {
        console.error(`Failed to load audio file: ${currentSound}.mp3`);
        // Use text-to-speech as a fallback
        const utterance = new SpeechSynthesisUtterance(currentSound);
        speechSynthesis.speak(utterance);
      };
      audio.play();
    }
  };

  const checkAnswer = (letter: string) => {
    const correctLetter = sounds.find((s) => s.sound === currentSound)?.letter;
    if (letter === correctLetter) {
      setScore(score + 1);
      alert('Correct! Great job!');
    } else {
      alert('Not quite right. Try again!');
    }
    newRound();
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">Match Letters to Sounds</h1>
      <div className="mb-8">
        <Button onClick={playSound} className="bg-blue-500 hover:bg-blue-600">
          Play Sound
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {options.map((letter, index) => (
          <Button
            key={index}
            onClick={() => checkAnswer(letter)}
            className="w-24 h-24 text-4xl bg-yellow-400 hover:bg-yellow-500"
          >
            {letter}
          </Button>
        ))}
      </div>
      <p className="text-2xl font-bold">Score: {score}</p>
    </div>
  );
}