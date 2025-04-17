import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const cardContents = [
    { id: 1, emoji: '🌟' },
    { id: 2, emoji: '🎨' },
    { id: 3, emoji: '🎮' },
    { id: 4, emoji: '🎵' },
    { id: 5, emoji: '🚀' },
    { id: 6, emoji: '💡' },
    { id: 7, emoji: '🎯' },
    { id: 8, emoji: '🎪' }
  ];

  // 게임 초기화
  const initializeGame = () => {
    const duplicatedCards = [...cardContents, ...cardContents]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    
    setCards(duplicatedCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // 화면 크기에 따른 카드 크기 계산 수정
  const calculateCardSize = () => {
    const containerWidth = Math.min(window.innerWidth - 64, 600); // maxWidth를 800에서 600으로 줄임
    const gap = 12; // gap을 16에서 12로 줄임
    const columns = window.innerWidth < 500 ? 3 : 4; // 모바일 기준을 600에서 500으로 변경
    return (containerWidth - (gap * (columns - 1))) / columns;
  };

  const [cardSize, setCardSize] = useState(calculateCardSize());

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setCardSize(calculateCardSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 카드 클릭 처리
  const handleCardClick = (uniqueId) => {
    if (disabled || flipped.length === 2 || flipped.includes(uniqueId) || matched.includes(uniqueId)) return;

    setFlipped(prev => [...prev, uniqueId]);
    
    if (flipped.length === 1) {
      setDisabled(true);
      setMoves(prev => prev + 1);
      
      const firstCard = cards.find(card => card.uniqueId === flipped[0]);
      const secondCard = cards.find(card => card.uniqueId === uniqueId);

      if (firstCard.id === secondCard.id) {
        setMatched(prev => [...prev, flipped[0], uniqueId]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // 게임 완료 체크
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameComplete(true);
    }
  }, [matched, cards]);

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.8rem' // 패딩 줄임
      }}>
        <div style={{
          width: '100%',
          maxWidth: `${cardSize * 4 + 36}px`, // 간격 조정 (48에서 36으로)
          marginBottom: '0.8rem', // 마진 줄임
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: '#64ffda', fontSize: '1rem' }}> {/* 폰트 크기 줄임 */}
            움직임: {moves}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initializeGame}
            style={{
              background: '#64ffda',
              color: '#0a192f',
              border: 'none',
              padding: '0.4rem 0.8rem', // 패딩 줄임
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem' // 폰트 크기 줄임
            }}
          >
            새 게임
          </motion.button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 500 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gap: '0.75rem', // gap 줄임
          width: '100%',
          maxWidth: `${cardSize * 4 + 36}px` // 간격 조정
        }}>
          {cards.map(card => (
            <motion.div
              key={card.uniqueId}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.uniqueId)}
              style={{
                width: `${cardSize}px`,
                height: `${cardSize}px`,
                background: flipped.includes(card.uniqueId) || matched.includes(card.uniqueId)
                  ? 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${cardSize * 0.4}px`, // 카드 크기에 비례한 이모지 크기
                border: '2px solid rgba(100, 255, 218, 0.1)',
                transition: 'background 0.3s'
              }}
            >
              <AnimatePresence>
                {(flipped.includes(card.uniqueId) || matched.includes(card.uniqueId)) && (
                  <motion.div
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.emoji}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                color: '#64ffda',
                fontSize: '1.2rem', // 폰트 크기 줄임
                marginTop: '0.8rem',
                textAlign: 'center'
              }}
            >
              🎉 축하해요! {moves} 번 만에 성공하셨네요?
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PS.MotionContainer>
  );
};

export default MemoryGame; 