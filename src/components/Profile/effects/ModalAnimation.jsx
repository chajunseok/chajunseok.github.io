import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const ModalAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: "100vh",
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <PS.MotionContainer>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
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
        Click me!
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
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
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
              style={{
                width: '90%',
                maxWidth: '500px',
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, #0a192f 100%)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  color: '#64ffda',
                  fontSize: '1.5rem',
                  textAlign: 'center'
                }}
              >
              반가워요!
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: '#ccc',
                  textAlign: 'center',
                  lineHeight: '1.6'
                }}
              >
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(100, 255, 218, 0.1)',
                  border: '1px solid #64ffda',
                  color: '#64ffda',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: 'auto'
                }}
              >
                닫기
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PS.MotionContainer>
  );
};

export default ModalAnimation; 