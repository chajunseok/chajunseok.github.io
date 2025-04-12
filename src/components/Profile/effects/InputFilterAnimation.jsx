import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const InputFilterAnimation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState('');

  const searchTypes = [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
    { value: 'tag', label: '태그' }
  ];

  const items = [
    {
      id: 1,
      title: "포트폴리오 웹사이트",
      content: "프론트엔드 개발자 차준석의 포트폴리오 웹사이트",
      tags: ["React.js"],
      color: "hsl(171, 100%, 70%)"
    },
    {
      id: 2,
      title: "Web-Rtc 기반 실시간 욕설 필터링 + 한/영 번역 웹 라이브 스트리밍 서비스",
      content: "WebRtc를 활용한 실시간 스트리밍 웹사이트",
      tags: ["Vue.js"],
      color: "hsl(210, 100%, 70%)"
    },
    {
      id: 3,
      title: "침구류 쇼핑몰 프로젝트",
      content: "침구류 쇼핑몰 웹사이트와 운영자를 위한 관리 페이지",
      tags: ["React.js", "Three.js", "Styled-components"],
      color: "hsl(280, 100%, 70%)"
    },
    {
      id: 4,
      title: "포트홀 자동 탐지 AI 및 도로 파손 통합 관리 시스템",
      content: "온디바이스 AI를 활용한 애플리케이션과 관리 운영자를 위한 웹 관리페이지",
      tags: ["Vue.js", "Pinia", "YOLOv8"],
      color: "hsl(340, 100%, 70%)"
    },
    {
      id: 5,
      title: "빅데이터 분산처리를 기반한 재난 대피 모바일 애플리케이션 서비스",
      content: "대전 시의 비상 상황 별 안전 대피소를 안내하는 애플리케이션",
      tags: ["Firebase", "React Native"],
      color: "hsl(40, 100%, 70%)"
    }
  ];

  // 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 검색 처리
  useEffect(() => {
    if (debouncedTerm === '') {
      setFilteredItems([]);
      return;
    }

    setIsFiltering(true);
    const term = debouncedTerm.toLowerCase();

    const filtered = items.filter(item => {
      switch (searchType) {
        case 'title':
          return item.title.toLowerCase().includes(term);
        case 'content':
          return item.content.toLowerCase().includes(term);
        case 'tag':
          return item.tags.some(tag => tag.toLowerCase().includes(term));
        default:
          return false;
      }
    });

    setTimeout(() => {
      setFilteredItems(filtered);
      setIsFiltering(false);
    }, 300);
  }, [debouncedTerm, searchType, items]);

  const clearFilter = () => {
    setSearchTerm('');
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
            marginBottom: '2rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
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
              {searchTypes.map(type => (
                <option 
                  key={type.value} 
                  value={type.value}
                  style={{
                    background: '#1a1a1a',
                    color: '#fff',
                    padding: '0.5rem'
                  }}
                >
                  {type.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="검색어를 입력하세요..."
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                flex: 1,
                minWidth: '200px'
              }}
            />

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
                whiteSpace: 'nowrap'
              }}
            >
              초기화
            </motion.button>
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
              검색 중...
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}
        >
          {(filteredItems.length > 0 || searchTerm ? filteredItems : items).map(item => (
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
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ 
                marginBottom: '0.5rem', 
                fontSize: '1.2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '0.5rem'
              }}>
                {item.title}
              </div>
              <div style={{ 
                fontSize: '0.9rem', 
                opacity: 0.8,
                marginBottom: '1rem'
              }}>
                {item.content}
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(100, 255, 218, 0.1)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(100, 255, 218, 0.2)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PS.MotionContainer>
  );
};

export default InputFilterAnimation; 