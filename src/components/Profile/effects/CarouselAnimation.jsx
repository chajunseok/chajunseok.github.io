import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const CarouselAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      title: "React.js",
      color: "#61DAFB",
      icon: "fab fa-react"
    },
    {
      title: "Vue.js",
      color: "#42B883",
      icon: "fab fa-vuejs"
    },
    {
      title: "JavaScript",
      color: "#F7DF1E",
      icon: "fab fa-js"
    },
    {
      title: "Python",
      color: "#3776AB",
      icon: "fab fa-python"
    }
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (
      (prevIndex + newDirection + slides.length) % slides.length
    ));
  };

  return (
    <PS.MotionContainer style={{
      minHeight: '450px'
    }}>
      <div style={{
        position: 'relative',
        width: '600px',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <motion.div
          whileHover={{ scale: 1.2, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          style={{
            position: 'absolute',
            left: '10px',
            zIndex: 2,
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(100, 255, 218, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            border: '1px solid rgba(100, 255, 218, 0.2)'
          }}
        >
          <i className="fas fa-chevron-left" style={{ color: '#64ffda' }} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          style={{
            position: 'absolute',
            right: '10px',
            zIndex: 2,
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(100, 255, 218, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            border: '1px solid rgba(100, 255, 218, 0.2)'
          }}
        >
          <i className="fas fa-chevron-right" style={{ color: '#64ffda' }} />
        </motion.div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(10,25,47,0.8) 100%)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              cursor: 'grab'
            }}
          >
            <i 
              className={slides[currentIndex].icon}
              style={{
                fontSize: '4rem',
                color: slides[currentIndex].color,
                marginBottom: '2rem'
              }}
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                color: '#fff',
                fontSize: '1.5rem',
                margin: 0
              }}
            >
              {slides[currentIndex].title}
            </motion.h2>
          </motion.div>
        </AnimatePresence>

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          gap: '0.5rem'
        }}>
          {slides.map((_, index) => (
            <motion.div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: currentIndex === index ? '#64ffda' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer'
              }}
              onClick={() => {
                const direction = index > currentIndex ? 1 : -1;
                setDirection(direction);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '-0.0003rem',
        color: '#ccc',
        fontSize: '0.9rem',
        textAlign: 'center',
      }}>
        드래그 또는 화살표를 클릭하여 슬라이드를 넘겨보세요
      </div>
    </PS.MotionContainer>
  );
};

export default CarouselAnimation; 