import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const DateFilterAnimation = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // 샘플 데이터 생성
  const generateSampleData = () => {
    const data = [];
    // 현재 날짜를 기준으로 한 달 전후의 범위 설정
    const today = new Date();
    const startTimestamp = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).getTime();
    const endTimestamp = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).getTime();
    
    for (let i = 0; i < 20; i++) {
      const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
      const date = new Date(randomTimestamp);
      data.push({
        id: i + 1,
        date: date.toISOString().split('T')[0],
        title: `Item ${i + 1}`,
        color: `hsl(${Math.random() * 360}, 70%, 70%)`
      });
    }
    return data;
  };

  const [items] = useState(generateSampleData());

  const handleFilter = () => {
    setIsFiltering(true);
    const filtered = items.filter(item => {
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      // 시작일과 종료일 모두 없는 경우
      if (!start && !end) return true;
      
      // 시작일만 있는 경우
      if (start && !end) {
        // 시작일의 시작(00:00:00)으로 설정
        start.setHours(0, 0, 0, 0);
        return itemDate >= start;
      }
      
      // 종료일만 있는 경우
      if (!start && end) {
        // 종료일의 끝(23:59:59)으로 설정
        end.setHours(23, 59, 59, 999);
        return itemDate <= end;
      }
      
      // 둘 다 있는 경우
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return itemDate >= start && itemDate <= end;
    });
    
    setTimeout(() => {
      setFilteredItems(filtered);
      setIsFiltering(false);
    }, 500);
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredItems([]);
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
            <motion.input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #64ffda',
                borderRadius: '5px',
                padding: '0.5rem',
                color: '#fff',
                cursor: 'pointer',
                minWidth: '140px'
              }}
            />
            <span style={{ color: '#64ffda' }}>~</span>
            <motion.input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #64ffda',
                borderRadius: '5px',
                padding: '0.5rem',
                color: '#fff',
                cursor: 'pointer',
                minWidth: '140px'
              }}
            />
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
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.date}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PS.MotionContainer>
  );
};

export default DateFilterAnimation; 