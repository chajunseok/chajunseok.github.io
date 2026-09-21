import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const LayoutAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <PS.MotionContainer>
      <motion.div
        layout
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '10px',
          cursor: 'pointer',
          padding: '20px',
          width: isOpen ? '400px' : '150px',
          height: isOpen ? '200px' : '150px',
          transition: 'background 0.3s',
        }}
        animate={{
          boxShadow: isOpen 
            ? '0 10px 30px rgba(100, 255, 218, 0.2)' 
            : '0 0 0 rgba(100, 255, 218, 0)'
        }}
      >
        <motion.h3
          layout="position"
          style={{
            color: '#fff',
            fontSize: isOpen ? '1.5rem' : '1rem',
            margin: 0
          }}
        >
          Click me!
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          style={{
            marginTop: '10px',
            color: '#ccc',
            fontSize: '0.9rem'
          }}
        >
        </motion.div>
      </motion.div>
    </PS.MotionContainer>
  );
};

export default LayoutAnimation; 