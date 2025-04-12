import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '../styles/PlaygroundStyles';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // 승리 조건 체크
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
      [0, 4, 8], [2, 4, 6] // 대각선
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }

    if (squares.every(square => square !== null)) {
      return { winner: 'draw' };
    }

    return null;
  };

  // 게임 초기화
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // 칸 클릭 처리
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result);
    }
  };

  // 게임 상태 메시지
  const getStatus = () => {
    if (winner) {
      if (winner.winner === 'draw') {
        return '무승부입니다!';
      }
      return `${winner.winner}가 승리했습니다!`;
    }
    return `다음 차례: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          color: '#64ffda',
          fontSize: '1.2rem',
          marginBottom: '1rem'
        }}>
          {getStatus()}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5rem',
          maxWidth: '300px',
          width: '100%',
          marginBottom: '1.5rem'
        }}>
          {board.map((square, index) => (
            <motion.button
              key={index}
              whileHover={!square && !winner ? { scale: 1.05 } : {}}
              whileTap={!square && !winner ? { scale: 0.95 } : {}}
              onClick={() => handleClick(index)}
              style={{
                aspectRatio: '1',
                background: winner?.line?.includes(index)
                  ? 'linear-gradient(135deg, #64ffda 0%, #0a192f 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(100, 255, 218, 0.1)',
                borderRadius: '8px',
                color: square === 'X' ? '#64ffda' : '#ff6b6b',
                fontSize: '2rem',
                fontWeight: 'bold',
                cursor: square || winner ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AnimatePresence mode="wait">
                {square && (
                  <motion.span
                    key={square}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {square}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          style={{
            background: '#64ffda',
            color: '#0a192f',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          새 게임
        </motion.button>
      </div>
    </PS.MotionContainer>
  );
};

export default TicTacToe; 