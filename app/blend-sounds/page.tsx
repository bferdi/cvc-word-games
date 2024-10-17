"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const words = [
  { word: 'cat', sounds: ['c', 'a', 't'] },
  { word: 'dog', sounds: ['d', 'o', 'g'] },
  { word: 'pig', sounds: ['p', 'i', 'g'] },
];

export default function BlendSoundsPage() {
  const [currentWord, setCurrentWord] = useState<{ word: string; sounds: string[] } | null>(null);
  const [playedSounds, setPlayedSounds] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setPlayedSounds(0);
    setUserGuess('');
  };

  const playNextSound = () => {
    if (currentWord && playedSounds < currentWord.sounds.length) {
      const audio = new Audio(`/sounds/${currentWord.sounds[playedSounds]}.mp3`);
      audio.onerror = () => {
        console.error(`Failed to load audio file: ${currentWord.sounds[playedSounds]}.mp3`);
        // Use text-to-speech as a fallback
        const utterance = new SpeechSynthesisUtterance(currentWord.sounds[playedSounds]);
        speechSynthesis.speak(utterance);
      };
      audio.play();
      setPlayedSounds(playedSounds + 1);
    }
  };

  const checkAnswer = () => {
    if (currentWord && userGuess.toLowerCase() === currentWord.word) {
      setScore(score + 1);
      alert('Correct! Great job!');
      newWord();
    } else {
      alert(`Not quite right. The word was "${currentWord?.word}". Try again!`);
      newWord();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Blend Sounds to Read Words</h1>
      <div className="mb-8">
        <Button onClick={playNextSound} className="bg-green-500 hover:bg-green-600 mb-4">
          Play Next Sound
        </Button>
        <p className="text-xl">Sounds played: {playedSounds} / 3</p>
      </div>
      <div className="mb-8">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="border-2 border-gray-300 rounded-lg p-2 text-xl w-48 mb-4"
          placeholder="Type the word"
        />
        <br />
        <Button onClick={checkAnswer} className="bg-blue-500 hover:bg-blue-600">
          Check Answer
        </Button>
      </div>
      <p className="text-2xl font-bold">Score: {score}</p>
    </div>
  );
}