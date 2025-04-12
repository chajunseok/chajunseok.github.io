import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const InfiniteScrollAnimation = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  const generateItems = (pageNum) => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: pageNum * 10 + i,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`,
      height: Math.floor(Math.random() * 50) + 100
    }));
  };

  const loadMore = () => {
    setLoading(true);
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    setTimeout(() => {
      const newItems = generateItems(page);
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <PS.ScrollContainer>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '1rem'
      }}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              width: '100%',
              height: item.height,
              background: `linear-gradient(135deg, ${item.color} 0%, rgba(10,25,47,0.8) 100%)`,
              marginBottom: '1rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            Item {item.id}
          </motion.div>
        ))}
        <div ref={containerRef} style={{ height: '20px' }}>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                color: '#64ffda',
                marginTop: '1rem'
              }}
            >
              Loading...
            </motion.div>
          )}
        </div>
      </div>
    </PS.ScrollContainer>
  );
};

export default InfiniteScrollAnimation; 