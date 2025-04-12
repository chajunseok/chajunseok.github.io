import React from 'react';
import { motion, useScroll } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <PS.MotionContainer>
      <div style={{ height: '600px', position: 'relative' }}>
        <motion.div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '10px solid rgba(100, 255, 218, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64ffda',
            fontSize: '1rem'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: -10,
              left: -10,
              right: -10,
              bottom: -10,
              borderRadius: '50%',
              border: '10px solid #64ffda',
              scaleX: scrollYProgress,
              scaleY: scrollYProgress,
              opacity: scrollYProgress
            }}
          />
          <motion.span style={{ opacity: scrollYProgress }}>
            Scroll me!
          </motion.span>
        </motion.div>
        <div style={{ 
          padding: '20px',
          color: '#ccc',
          fontSize: '0.9rem',
          textAlign: 'center',
          marginTop: '400px'
        }}>
          계속 스크롤 해보세요!
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default ScrollProgress; 