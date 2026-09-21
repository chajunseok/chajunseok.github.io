import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const SpringMotion = () => {
  const [isRight, setIsRight] = useState(false);
  
  return (
    <PS.MotionContainer>
      <motion.div
        animate={{ 
          x: isRight ? 200 : -200,
          rotate: isRight ? 180 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 1
        }}
        onClick={() => setIsRight(!isRight)}
        style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '0.9rem'
        }}
      >
        Click me!
      </motion.div>
    </PS.MotionContainer>
  );
};

export default SpringMotion; 