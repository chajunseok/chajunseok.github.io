import React from 'react';
import { motion } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const HoverAnimation = () => {
  return (
    <PS.MotionContainer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      flexWrap: 'wrap',
      minHeight: '500px'
    }}>
      <motion.div
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          boxShadow: '0 5px 20px rgba(100, 255, 218, 0.4)'
        }}
        style={{
          width: '200px',
          height: '250px',
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            position: 'absolute',
            bottom: '20px',
            color: '#fff',
            textAlign: 'center'
          }}
        >
          Hover me!
        </motion.div>
      </motion.div>

      <motion.div
        whileHover={{ 
          scale: 1.05,
        }}
        style={{
          width: '200px',
          height: '250px',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '20px',
          cursor: 'pointer',
          padding: '20px',
          border: '2px solid transparent',
          position: 'relative'
        }}
      >
        <motion.div
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -5 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#64ffda',
            }}
          />
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: 5 }}
            style={{
              color: '#64ffda',
              fontSize: '0.9rem'
            }}
          >
            마우스를 올려보세요!
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        whileHover="hover"
        style={{
          width: '200px',
          height: '250px',
          background: '#0a192f',
          borderRadius: '20px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div
          variants={{
            hover: {
              scale: [null, 1.3, 1],
              rotate: [null, 90, 0],
              transition: {
                duration: 0.5
              }
            }
          }}
          style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
            borderRadius: '12px'
          }}
        />
      </motion.div>
    </PS.MotionContainer>
  );
};

export default HoverAnimation; 