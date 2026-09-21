import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const SelectFilterAnimation = () => {
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [items, setItems] = useState([
    { id: 1, name: '프로젝트 A', category: 'web', status: 'active' },
    { id: 2, name: '프로젝트 B', category: 'mobile', status: 'completed' },
    { id: 3, name: '프로젝트 C', category: 'web', status: 'pending' },
    { id: 4, name: '프로젝트 D', category: 'design', status: 'active' },
    { id: 5, name: '프로젝트 E', category: 'mobile', status: 'pending' },
    { id: 6, name: '프로젝트 F', category: 'design', status: 'completed' }
  ]);

  const filteredItems = items.filter(item => {
    const categoryMatch = category === 'all' || item.category === category;
    const statusMatch = status === 'all' || item.status === status;
    return categoryMatch && statusMatch;
  });

  const categories = [
    { value: 'all', label: '전체' },
    { value: 'web', label: '웹' },
    { value: 'mobile', label: '모바일' },
    { value: 'design', label: '디자인' }
  ];

  const statuses = [
    { value: 'all', label: '전체' },
    { value: 'active', label: '진행중' },
    { value: 'pending', label: '대기중' },
    { value: 'completed', label: '완료' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#64ffda';
      case 'pending': return '#ffd700';
      case 'completed': return '#ff69b4';
      default: return '#ccc';
    }
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        padding: '2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ color: '#ccc', marginBottom: '0.5rem', display: 'block' }}>
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #64ffda',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ color: '#ccc', marginBottom: '0.5rem', display: 'block' }}>
              상태
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #64ffda',
                borderRadius: '5px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {statuses.map(stat => (
                <option key={stat.value} value={stat.value}>{stat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              >
                <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{item.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'rgba(100, 255, 218, 0.1)',
                    color: '#64ffda',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}>
                    {categories.find(cat => cat.value === item.category)?.label}
                  </span>
                  <span style={{
                    background: `${getStatusColor(item.status)}20`,
                    color: getStatusColor(item.status),
                    padding: '0.2rem 0.5rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}>
                    {statuses.find(stat => stat.value === item.status)?.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PS.MotionContainer>
  );
};

export default SelectFilterAnimation; 