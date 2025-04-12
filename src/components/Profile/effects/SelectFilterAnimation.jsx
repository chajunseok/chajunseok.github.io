import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const SelectFilterAnimation = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const categories = [
    { value: 'all', label: '전체 카테고리' },
    { value: 'tech', label: '기술' },
    { value: 'design', label: '디자인' },
    { value: 'marketing', label: '마케팅' }
  ];

  const statuses = [
    { value: 'all', label: '전체 상태' },
    { value: 'active', label: '진행중' },
    { value: 'completed', label: '완료' },
    { value: 'pending', label: '대기중' }
  ];

  const generateSampleData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        title: `Project ${i + 1}`,
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].value,
        status: statuses[Math.floor(Math.random() * (statuses.length - 1)) + 1].value,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`
      });
    }
    return data;
  };

  const [items] = useState(generateSampleData());

  const handleFilter = () => {
    setIsFiltering(true);
    const filtered = items.filter(item => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
    
    setTimeout(() => {
      setFilteredItems(filtered);
      setIsFiltering(false);
    }, 500);
  };

  const clearFilter = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setFilteredItems([]);
  };

  const getStatusLabel = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#64ffda';
      case 'completed': return '#95ff64';
      case 'pending': return '#ffd964';
      default: return '#fff';
    }
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        maxWidth: '670px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <motion.div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          border: '1px solid rgba(100, 255, 218, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.7rem top 50%',
                backgroundSize: '1.2rem auto',
                paddingRight: '2rem'
              }}
            >
              {categories.map(category => (
                <option 
                  key={category.value} 
                  value={category.value}
                  style={{
                    background: '#1a1a1a',
                    color: '#fff',
                    padding: '0.5rem'
                  }}
                >
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.7rem top 50%',
                backgroundSize: '1.2rem auto',
                paddingRight: '2rem'
              }}
            >
              {statuses.map(status => (
                <option 
                  key={status.value} 
                  value={status.value}
                  style={{
                    background: '#1a1a1a',
                    color: '#fff',
                    padding: '0.5rem'
                  }}
                >
                  {status.label}
                </option>
              ))}
            </select>

            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexShrink: 0
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFilter}
                style={{
                  background: '#64ffda',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  color: '#0a192f',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  minWidth: '80px'
                }}
              >
                검색
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilter}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid #64ffda',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  color: '#64ffda',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  minWidth: '80px'
                }}
              >
                초기화
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isFiltering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                color: '#64ffda',
                marginBottom: '1rem'
              }}
            >
              필터링 중...
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1rem'
          }}
        >
          {(filteredItems.length > 0 ? filteredItems : items).map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                background: `linear-gradient(135deg, ${item.color} 0%, rgba(10,25,47,0.8) 100%)`,
                padding: '1rem',
                borderRadius: '10px',
                color: '#fff',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{item.title}</div>
              <div style={{ 
                fontSize: '0.9rem', 
                opacity: 0.8,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <span>{categories.find(c => c.value === item.category)?.label}</span>
                <span style={{ color: getStatusColor(item.status) }}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PS.MotionContainer>
  );
};

export default SelectFilterAnimation; 