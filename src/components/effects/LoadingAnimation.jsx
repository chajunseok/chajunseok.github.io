import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const loadingContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const dotVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: [-10, 0, -10],
      opacity: 1,
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <PS.MotionContainer>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={startLoading}
        style={{
          background: 'transparent',
          border: '2px solid #64ffda',
          color: '#64ffda',
          padding: '1rem 2rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1.1rem'
        }}
      >
        Start Loading
      </motion.button>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50
            }}
          >
            <motion.div
              variants={loadingContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem'
              }}
            >
              <motion.div
                variants={circleVariants}
                animate="animate"
                style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(100, 255, 218, 0.1)',
                  borderTop: '4px solid #64ffda',
                  borderRadius: '50%'
                }}
              />
              
              <motion.div
                style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    variants={dotVariants}
                    style={{
                      width: '10px',
                      height: '10px',
                      background: '#64ffda',
                      borderRadius: '50%'
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: '#64ffda',
                  fontSize: '1.1rem',
                  textAlign: 'center'
                }}
              >
                로딩중...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PS.MotionContainer>
  );
};

export default LoadingAnimation; 