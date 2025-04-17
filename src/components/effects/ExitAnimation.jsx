import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const ExitAnimation = () => {
  const [cards, setCards] = useState([
    { id: 1, color: '#64ffda' },
    { id: 2, color: '#64d8ff' },
    { id: 3, color: '#64a1ff' },
    { id: 4, color: '#6475ff' },
    { id: 5, color: '#7864ff' }
  ]);

  const removeCard = () => {
    setCards(prev => prev.slice(0, -1));
  };

  const resetCards = () => {
    setCards([
      { id: 1, color: '#64ffda' },
      { id: 2, color: '#64d8ff' },
      { id: 3, color: '#64a1ff' },
      { id: 4, color: '#6475ff' },
      { id: 5, color: '#7864ff' }
    ]);
  };

  return (
    <PS.MotionContainer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '500px'
    }}>
      <div style={{ 
        position: 'relative',
        width: '300px',
        height: '250px'
      }}>
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: (index - 2) * 3
              }}
              exit={{ 
                opacity: 0,
                x: 100,
                rotate: 20,
                transition: { duration: 0.5 }
              }}
              style={{
                position: 'absolute',
                top: index * 20,
                width: '100%',
                height: '200px',
                background: `linear-gradient(135deg, ${card.color} 0%, #0a192f 100%)`,
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.2rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
              onClick={removeCard}
            >
              Card {card.id}
            </motion.div>
          ))}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={resetCards}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'transparent',
              border: '1px solid #64ffda',
              color: '#64ffda',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap'
            }}
          >
            Reset Cards
          </motion.button>
        )}
      </div>
    </PS.MotionContainer>
  );
};

export default ExitAnimation; 