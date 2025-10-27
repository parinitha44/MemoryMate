// src/components/pages/games/WordRecall.jsx

import React, { useState } from 'react';
import { ListChecks, X, CheckCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

// Game Configuration
const CATEGORY = "Things you find in a Kitchen";
const VALID_WORDS = ['stove', 'oven', 'fridge', 'cup', 'plate', 'fork', 'spoon', 'knife', 'sink', 'toaster', 'blender', 'microwave', 'cabinet', 'table', 'chair', 'salt', 'pepper', 'pot', 'pan', 'kettle'];

const WordRecall = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [recalledWords, setRecalledWords] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = currentWord.trim().toLowerCase();
    
    if (word.length === 0) {
      setMessage('Please enter a word.');
      return;
    }

    if (recalledWords.includes(word)) {
      setMessage(`"${word}" has already been recalled.`);
    } else if (VALID_WORDS.includes(word)) {
      setRecalledWords([...recalledWords, word]);
      setScore(score + 1);
      setMessage(`Great! Added "${word}".`);
    } else {
      setMessage(`"${word}" is not recognized or relevant to the category.`);
    }

    setCurrentWord('');
    // Log performance for caregiver dashboard
    console.log(`Word Recall: Added "${word}". Current Score: ${score + 1}`);
  };

  return (
    <div className="min-h-full flex flex-col items-center p-8 bg-green-50">
      <div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-2xl text-center space-y-6">
        <ListChecks className="w-16 h-16 text-green-600 mx-auto" />
        <h1 className="text-4xl font-extrabold text-gray-900">Word Recall Game</h1>
        <p className="text-xl font-bold text-gray-800">
          Category: <span className="text-green-600">{CATEGORY}</span>
        </p>

        {/* Game Stats */}
        <div className="text-2xl font-semibold text-gray-700 p-4 border-y border-gray-200">
          Total Recalled Words: <span className="text-green-600">{score}</span>
        </div>

        {/* Word Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-3 max-w-lg mx-auto">
          <input
            type="text"
            value={currentWord}
            onChange={(e) => setCurrentWord(e.target.value)}
            placeholder="Type a word..."
            className="flex-grow p-3 border border-gray-300 rounded-lg text-lg focus:ring-green-500 focus:border-green-500"
          />
          <Button type="submit" primary={true} className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="w-5 h-5 mr-2" />Add
          </Button>
        </form>

        <p className={`text-base font-medium ${message.includes('Great') ? 'text-green-600' : 'text-red-500'}`}>
          {message || "Enter words related to the category above."}
        </p>
        
        {/* Recalled Word History */}
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 max-h-40 overflow-y-auto">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Recalled List ({recalledWords.length}):</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {recalledWords.map((word, index) => (
              <span key={index} className="px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm">
                {word}
              </span>
            ))}
            {recalledWords.length === 0 && <p className="text-gray-500">Start recalling words now!</p>}
          </div>
        </div>
        
        {/* Navigation Button */}
        <Link to="/cognitive-support">
          <Button primary={false} className="mt-6 bg-red-600 hover:bg-red-700 text-white flex items-center mx-auto space-x-2">
            <X className="w-5 h-5" />
            End Game & Return
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WordRecall;