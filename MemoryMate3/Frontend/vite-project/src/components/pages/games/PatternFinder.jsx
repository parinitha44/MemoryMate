// src/components/pages/games/PatternFinder.jsx

import React, { useState } from 'react';
import { Shapes, X, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

// Game Configuration
const PATTERNS = [
  { sequence: ['Square', 'Circle', 'Triangle'], answer: 'Square', color: 'bg-red-500' },
  { sequence: ['Blue', 'Red', 'Blue', 'Red'], answer: 'Blue', color: 'bg-blue-500' },
  { sequence: ['Big', 'Small', 'Big'], answer: 'Small', color: 'bg-green-500' },
];

const ShapeDisplay = ({ shape, colorClass }) => {
  const baseStyle = "w-16 h-16 flex items-center justify-center text-white font-bold text-lg rounded-lg shadow-md";
  let shapeContent = shape;
  let customClass = '';

  switch (shape.toLowerCase()) {
    case 'circle':
    case 'blue':
      customClass = 'rounded-full';
      shapeContent = '🔵';
      break;
    case 'triangle':
    case 'red':
      customClass = 'clip-triangle'; // Assuming you have this CSS class or use a text/icon
      shapeContent = '🔺';
      break;
    case 'square':
    case 'green':
      customClass = '';
      shapeContent = '🟥';
      break;
    case 'small':
    case 'big':
      shapeContent = shape.slice(0, 1);
      customClass = shape === 'Small' ? 'w-10 h-10 text-sm' : 'w-20 h-20 text-xl';
      break;
    default:
      shapeContent = '?';
  }

  return (
    <div className={`${baseStyle} ${colorClass} ${customClass}`}>{shapeContent}</div>
  );
};


const PatternFinder = () => {
  const [patternIndex, setPatternIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  
  const currentPattern = PATTERNS[patternIndex];
  const possibleAnswers = ['Square', 'Circle', 'Triangle', 'Blue', 'Red', 'Green', 'Small', 'Big'].filter(a => a !== currentPattern.answer);
  // Simple way to select 3 distinct choices including the correct one
  const choices = [...new Set([currentPattern.answer, ...possibleAnswers.sort(() => 0.5 - Math.random()).slice(0, 2)])].sort(() => 0.5 - Math.random());


  const handleGuess = (guess) => {
    if (isCorrect !== null) return; // Prevent multiple guesses
    
    setSelectedAnswer(guess);
    const correct = guess === currentPattern.answer;
    
    if (correct) {
      setFeedback('Correct! You found the pattern.');
      setIsCorrect(true);
      console.log(`Pattern Finder: Guessed correctly.`);
    } else {
      setFeedback(`Not quite. The correct answer was "${currentPattern.answer}".`);
      setIsCorrect(false);
      console.log(`Pattern Finder: Guessed incorrectly.`);
    }
  };

  const nextPattern = () => {
    setPatternIndex((patternIndex + 1) % PATTERNS.length);
    setSelectedAnswer(null);
    setFeedback('');
    setIsCorrect(null);
  };

  return (
    <div className="min-h-full flex flex-col items-center p-8 bg-purple-50">
      <div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-2xl text-center space-y-6">
        <Shapes className="w-16 h-16 text-purple-600 mx-auto" />
        <h1 className="text-4xl font-extrabold text-gray-900">Pattern Finder Game</h1>
        
        <p className="text-lg text-gray-600">
          What comes next in the sequence below? This game focuses on **visual working memory**.
        </p>

        {/* Pattern Sequence */}
        <div className="flex justify-center space-x-4 p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100">
          {currentPattern.sequence.map((item, index) => (
            <ShapeDisplay key={index} shape={item} colorClass={currentPattern.color} />
          ))}
          <div className="w-16 h-16 flex items-center justify-center text-xl font-bold rounded-lg shadow-inner bg-gray-200">
            ?
          </div>
        </div>

        {/* Feedback Area */}
        {feedback && (
          <div className={`p-3 rounded-lg text-lg font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {feedback}
          </div>
        )}

        {/* Answer Choices */}
        <div className="flex justify-center flex-wrap gap-4 pt-4">
          {choices.map((choice) => (
            <Button
              key={choice}
              primary={choice === selectedAnswer && isCorrect === true}
              className={`py-3 px-6 ${choice === selectedAnswer && isCorrect === false ? 'bg-red-500 text-white' : ''} ${selectedAnswer !== null && choice !== selectedAnswer ? 'opacity-50' : ''}`}
              onClick={() => handleGuess(choice)}
              disabled={isCorrect !== null}
            >
              {choice}
            </Button>
          ))}
        </div>

        {/* Navigation & Next Button */}
        <div className="flex justify-center space-x-4 pt-6">
          {isCorrect !== null && (
            <Button primary={false} onClick={nextPattern} className="bg-purple-600 hover:bg-purple-700 text-white flex items-center">
              <RefreshCw className="w-5 h-5 mr-2" /> Next Pattern
            </Button>
          )}
          <Link to="/cognitive-support">
            <Button primary={false} className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2">
              <X className="w-5 h-5" />
              End Game & Return
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatternFinder;