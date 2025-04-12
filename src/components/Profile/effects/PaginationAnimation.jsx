import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const PaginationAnimation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = 5;

  const generateItems = (page) => {
    return Array.from({ length: itemsPerPage }, (_, i) => ({
      id: (page - 1) * itemsPerPage + i + 1,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    }
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.2
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {generateItems(currentPage).map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, rgba(10,25,47,0.8) 100%)`,
                    height: '120px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '1.2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {item.id}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '2rem'
        }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(1)}
            style={{
              background: 'rgba(100, 255, 218, 0.1)',
              border: '1px solid #64ffda',
              color: '#64ffda',
              padding: '0.5rem',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            disabled={currentPage === 1}
          >
            <i className="fas fa-angles-left" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            style={{
              background: 'rgba(100, 255, 218, 0.1)',
              border: '1px solid #64ffda',
              color: '#64ffda',
              padding: '0.5rem',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left" />
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(i + 1)}
              style={{
                background: currentPage === i + 1 ? '#64ffda' : 'rgba(100, 255, 218, 0.1)',
                border: '1px solid #64ffda',
                color: currentPage === i + 1 ? '#0a192f' : '#64ffda',
                width: '40px',
                height: '40px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {i + 1}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            style={{
              background: 'rgba(100, 255, 218, 0.1)',
              border: '1px solid #64ffda',
              color: '#64ffda',
              padding: '0.5rem',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(totalPages)}
            style={{
              background: 'rgba(100, 255, 218, 0.1)',
              border: '1px solid #64ffda',
              color: '#64ffda',
              padding: '0.5rem',
              borderRadius: '5px',
              cursor: 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-angles-right" />
          </motion.button>
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default PaginationAnimation; 