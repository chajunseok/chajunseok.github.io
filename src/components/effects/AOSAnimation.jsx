import React from 'react';
import { motion } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const AOSAnimation = () => {
  return (
    <PS.ScrollContainer style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15rem',
      padding: '2rem',
      height: '1500px',
      overflowY: 'auto',
      paddingTop: '10rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px", amount: 0.5 }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          padding: '3rem',
          background: 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)',
          borderRadius: '20px',
          color: '#fff',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}
      >
        Fade Up
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          padding: '3rem',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '20px',
          color: '#64ffda',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}
      >
        Fade Left
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          padding: '3rem',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '20px',
          color: '#64ffda',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}
      >
        Fade Right
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          padding: '3rem',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '20px',
          color: '#64ffda',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}
      >
        Zoom In
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 360 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        style={{
          width: '100%',
          padding: '3rem',
          background: 'rgba(100, 255, 218, 0.1)',
          borderRadius: '20px',
          color: '#64ffda',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}
      >
        Rotate
      </motion.div>
    </PS.ScrollContainer>
  );
};

export default AOSAnimation; 