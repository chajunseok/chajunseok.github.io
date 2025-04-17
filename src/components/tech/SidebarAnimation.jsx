import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const SidebarAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 1, title: '대시보드', icon: 'fas fa-home' },
    { id: 2, title: '프로필', icon: 'fas fa-user' },
    { id: 3, title: '프로젝트', icon: 'fas fa-project-diagram' },
    { id: 4, title: '설정', icon: 'fas fa-cog' },
    { id: 5, title: '로그아웃', icon: 'fas fa-sign-out-alt' }
  ];

  const sidebarVariants = {
    open: {
      width: '240px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      width: '60px',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        maxWidth: '670px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '10px',
          border: '1px solid rgba(100, 255, 218, 0.1)',
          overflow: 'hidden',
          width: '100%',
          height: '400px'
        }}>
          {/* 사이드바 */}
          <motion.div
            initial="closed"
            animate={isOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRight: '1px solid rgba(100, 255, 218, 0.2)',
              height: '100%',
              position: 'relative'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: '#64ffda',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <i className={`fas fa-${isOpen ? 'chevron-left' : 'bars'}`} />
            </motion.button>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              gap: '0.5rem',
              marginTop: '3rem'
            }}>
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    scale: 1.02
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#64ffda'
                  }}
                >
                  <i className={item.icon} style={{ width: '20px' }} />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={{
                          marginLeft: '1rem',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 메인 콘텐츠 영역 */}
          <motion.div
            animate={{
              width: isOpen ? 'calc(100% - 240px)' : 'calc(100% - 60px)'
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
            style={{
              padding: '1.5rem',
              height: '100%'
            }}
          >
            {/* 헤더 영역 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              padding: '0.5rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{ color: '#64ffda', fontSize: '1.2rem' }}></div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                color: '#64ffda'
              }}>
                <i className="fas fa-bell" style={{ cursor: 'pointer' }} />
                <i className="fas fa-user-circle" style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* 콘텐츠 그리드 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              height: 'calc(100% - 4rem)'
            }}>
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(100, 255, 218, 0.1)',
                    height: '100%'
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default SidebarAnimation; 