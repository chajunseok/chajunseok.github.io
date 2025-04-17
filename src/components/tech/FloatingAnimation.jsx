import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const FloatingAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const menuItems = [
    { 
      id: 1, 
      icon: 'fas fa-arrow-up', 
      label: '맨 위로', 
      color: 'hsl(171, 100%, 70%)',
      action: () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    { 
      id: 2, 
      icon: 'fas fa-arrow-down', 
      label: '맨 아래로', 
      color: 'hsl(280, 100%, 70%)',
      action: () => {
        if (containerRef.current) {
          containerRef.current.scrollTo({ 
            top: containerRef.current.scrollHeight, 
            behavior: 'smooth' 
          });
        }
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PS.MotionContainer>
      <div style={{ 
        height: '400px', 
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div 
          ref={containerRef}
          style={{
            height: '100%',
            overflowY: 'auto',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '10px',
            width: '100%'
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                marginBottom: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(100, 255, 218, 0.1)',
                width: '100%'
              }}
            >
              스크롤 영역 {i + 1}
            </div>
          ))}
        </div>

        {/* 플로팅 메뉴 */}
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem',
          zIndex: 1000
        }}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  minWidth: '200px'
                }}
              >
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={item.action}
                    style={{
                      padding: '0.8rem 1rem',
                      background: `linear-gradient(135deg, ${item.color} 0%, rgba(10,25,47,0.8) 100%)`,
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className={item.icon} />
                    </div>
                    <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#64ffda',
              border: 'none',
              color: '#0a192f',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px rgba(100, 255, 218, 0.3)'
            }}
          >
            <i className={`fas fa-${isOpen ? 'times' : 'plus'}`} />
          </motion.button>
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default FloatingAnimation; 