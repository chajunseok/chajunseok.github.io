import React from 'react';
import { motion } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const SimpleMotion = () => (
  <PS.MotionContainer>
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }}
      style={{
        width: '100px',
        height: '100px',
        background: '#64ffda',
      }}
    />
  </PS.MotionContainer>
);

export default SimpleMotion; 