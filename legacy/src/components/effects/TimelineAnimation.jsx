import React from 'react';
import { motion } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const TimelineAnimation = () => {
  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1, 0.8, 1],
      rotate: [0, 180, 360, 180, 0],
      borderRadius: ["50%", "20%", "50%", "20%", "50%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pathVariants = {
    initial: {
      pathLength: 0,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const textVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <PS.MotionContainer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '500px',
      gap: '3rem',
      flexWrap: 'wrap'
    }}>
      <motion.div
        style={{
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        variants={circleVariants}
        animate="animate"
      />

      <svg 
        width="200" 
        height="200" 
        viewBox="0 0 200 200"
        style={{ overflow: 'visible' }}
      >
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="#64ffda"
          strokeWidth="4"
          fill="none"
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
        <motion.path
          d="M100 20 L100 180 M20 100 L180 100"
          stroke="#64ffda"
          strokeWidth="4"
          fill="none"
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
      </svg>

      <div style={{
        width: '200px',
        height: '200px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          style={{
            width: '100%',
            height: '2px',
            background: '#64ffda',
            position: 'absolute'
          }}
          animate={{
            scaleX: [0, 1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        <motion.div
          style={{
            width: '2px',
            height: '100%',
            background: '#64ffda',
            position: 'absolute'
          }}
          animate={{
            scaleY: [0, 1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }
          }}
        />
        <motion.div
          variants={textVariants}
          animate="animate"
          style={{
            color: '#64ffda',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}
        >
          Timeline
        </motion.div>
      </div>
    </PS.MotionContainer>
  );
};

export default TimelineAnimation; 