import React from 'react';
import { motion } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const TransformEffect = () => (
  <PS.MotionContainer>
    <motion.div
      animate={{
        rotateX: [0, 180, 180, 0],
        rotateY: [0, 0, 180, 0],
        z: [0, 50, -50, 0],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      }}
      style={{
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
        borderRadius: '20px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)'
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}
      >
        차준석
      </motion.div>
    </motion.div>
  </PS.MotionContainer>
);

export default TransformEffect; 