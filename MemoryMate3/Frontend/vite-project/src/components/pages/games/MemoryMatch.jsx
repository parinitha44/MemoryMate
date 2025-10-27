// src/components/pages/games/MemoryMatch.jsx

import React, { useState, useEffect } from 'react';
import { Shuffle, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

// Initial set of card values (each needed twice for matching)
const cardIcons = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐘', '🦒']; 

// Helper function to initialize and shuffle the cards
const initializeCards = () => {
  const cards = [...cardIcons, ...cardIcons]
    .map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5); // Shuffle the array
  return cards;
};

const MemoryMatch = () => {
  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);

  // Check for matches whenever two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setLockBoard(true);
      const [card1, card2] = flippedCards;

      if (card1.icon === card2.icon) {
        // Match found!
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === card1.id || card.id === card2.id ? { ...card, isMatched: true } : card
          )
        );
        // Check if the game is complete
        setTimeout(() => {
          if (cards.every(card => card.isMatched)) {
            setGameComplete(true);
          }
          setFlippedCards([]);
          setLockBoard(false);
        }, 500);
      } else {
        // No match, flip them back
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === card1.id || card.id === card2.id ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
          setLockBoard(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (clickedCard) => {
    if (lockBoard || clickedCard.isFlipped || gameComplete) return;

    setMoves(prevMoves => prevMoves + 1);

    setCards(prevCards => 
      prevCards.map(card => 
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prevFlipped => [...prevFlipped, { ...clickedCard, isFlipped: true }]);
  };

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
    setLockBoard(false);
  };

  const Card = ({ card }) => {
    const cardStyle = `
      w-full h-24 sm:h-32 flex items-center justify-center text-4xl sm:text-5xl font-bold rounded-lg shadow-md transition-all duration-300 cursor-pointer 
      ${card.isFlipped || card.isMatched ? 'bg-white transform rotate-y-180' : 'bg-blue-300 hover:bg-blue-400'}
      ${card.isMatched ? 'opacity-50' : ''}
    `;

    return (
      <div className={cardStyle} onClick={() => handleCardClick(card)}>
        {card.isFlipped || card.isMatched ? card.icon : '?'}
      </div>
    );
  };


  return (
    <div className="min-h-full flex flex-col items-center p-8 bg-blue-50">
      <div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-2xl text-center space-y-6">
        
        <Shuffle className="w-16 h-16 text-red-600 mx-auto" />
        <h1 className="text-4xl font-extrabold text-gray-900">Memory Match Game</h1>
        
        {/* Game Stats */}
        <div className="flex justify-around text-xl font-semibold text-gray-700 p-4 border-y border-gray-200">
          <span>Moves: <span className="text-blue-600">{Math.floor(moves / 2)}</span></span>
          <button onClick={resetGame} className="text-sm text-red-500 hover:text-red-700 transition">
            (Restart Game)
          </button>
        </div>

        {/* Game Complete Message */}
        {gameComplete && (
          <div className="p-4 bg-emerald-100 text-emerald-800 rounded-lg text-2xl font-bold flex justify-center items-center space-x-3">
            <CheckCircle className="w-8 h-8" />
            <span>Congratulations! Game Completed in {Math.floor(moves / 2)} moves.</span>
          </div>
        )}

        {/* Interactive Game Grid */}
        <div className="grid grid-cols-4 gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100">
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        
        <p className="text-base text-gray-500 pt-4">
          This game focuses on **visual short-term recall**. Progress is automatically logged.
        </p>
        
        {/* Navigation Button */}
        <Link to="/cognitive-support">
          <Button primary={false} className="bg-red-600 hover:bg-red-700 text-white flex items-center mx-auto space-x-2">
            <X className="w-5 h-5" />
            End Game & Return
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MemoryMatch;