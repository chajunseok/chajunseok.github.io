import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const SeasonSimulation = () => {
  const [currentSeason, setCurrentSeason] = useState('spring');

  const seasons = [
    { id: 'spring', name: '봄', color: '#ffcad4', particleEmoji: '🌸' },
    { id: 'summer', name: '여름', color: '#87ceeb', particleEmoji: '☀️' },
    { id: 'autumn', name: '가을', color: '#ffa500', particleEmoji: '🍁' },
    { id: 'winter', name: '겨울', color: '#f0f8ff', particleEmoji: '❄️' }
  ];

  const Particles = ({ emoji }) => {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {Array(20).fill().map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: -20
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: `${Math.sin(i) * 200 + Math.random() * 200}px`,
              y: window.innerHeight + 20
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              pointerEvents: 'none'
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>
    );
  };

  const seasonBackgrounds = {
    spring: {
      background: 'linear-gradient(to bottom, #ffcad4 0%, #ffd1dc 100%)',
      elements: <Particles emoji="🌸" />
    },
    summer: {
      background: 'linear-gradient(to bottom, #87ceeb 0%, #87cefa 100%)',
      elements: <Particles emoji="☀️" />
    },
    autumn: {
      background: 'linear-gradient(to bottom, #ffa500 0%, #ff8c00 100%)',
      elements: <Particles emoji="🍁" />
    },
    winter: {
      background: 'linear-gradient(to bottom, #f0f8ff 0%, #e6e6fa 100%)',
      elements: <Particles emoji="❄️" />
    }
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '15px',
        background: seasonBackgrounds[currentSeason].background,
        transition: 'background 0.5s ease'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSeason}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%' }}
          >
            {seasonBackgrounds[currentSeason].elements}
          </motion.div>
        </AnimatePresence>

        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '10px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          {seasons.map(season => (
            <motion.button
              key={season.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSeason(season.id)}
              style={{
                background: currentSeason === season.id 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '15px',
                cursor: 'pointer',
                color: currentSeason === season.id ? '#000' : '#fff',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              {season.name}
            </motion.button>
          ))}
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default SeasonSimulation; 