import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const buttons = [
    { value: 'C', type: 'function', color: '#ff6b6b' },
    { value: '±', type: 'function', color: '#64ffda' },
    { value: '%', type: 'operator', color: '#64ffda' },
    { value: '÷', type: 'operator', color: '#64ffda' },
    { value: '7', type: 'number' },
    { value: '8', type: 'number' },
    { value: '9', type: 'number' },
    { value: '×', type: 'operator', color: '#64ffda' },
    { value: '4', type: 'number' },
    { value: '5', type: 'number' },
    { value: '6', type: 'number' },
    { value: '-', type: 'operator', color: '#64ffda' },
    { value: '1', type: 'number' },
    { value: '2', type: 'number' },
    { value: '3', type: 'number' },
    { value: '+', type: 'operator', color: '#64ffda' },
    { value: '0', type: 'number', span: 2 },
    { value: '.', type: 'number' },
    { value: '=', type: 'operator', color: '#64ffda' }
  ];

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    
    if (prevValue === null || operator === null) {
      // 이전 값이 없으면 단순히 100으로 나누기
      setDisplay(String(value / 100));
    } else {
      // 이전 값의 퍼센트 계산
      const percentValue = (prevValue * value) / 100;
      
      switch (operator) {
        case '+':
          setDisplay(String(prevValue + percentValue));
          break;
        case '-':
          setDisplay(String(prevValue - percentValue));
          break;
        case '×':
          setDisplay(String(percentValue));
          break;
        case '÷':
          setDisplay(String(percentValue));
          break;
        default:
          setDisplay(String(value / 100));
      }
      
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator) => {
    const value = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(value);
    } else if (operator) {
      const currentValue = prevValue;
      let newValue;

      switch (operator) {
        case '+':
          newValue = currentValue + value;
          break;
        case '-':
          newValue = currentValue - value;
          break;
        case '×':
          newValue = currentValue * value;
          break;
        case '÷':
          newValue = currentValue / value;
          break;
        default:
          newValue = value;
      }

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleButtonClick = (button) => {
    switch (button.type) {
      case 'number':
        if (button.value === '.') {
          inputDot();
        } else {
          inputDigit(parseInt(button.value, 10));
        }
        break;
      case 'operator':
        if (button.value === '=') {
          performOperation(null);
        } else {
          performOperation(button.value);
        }
        break;
      case 'function':
        if (button.value === 'C') {
          clearAll();
        } else if (button.value === '±') {
          toggleSign();
        } else if (button.value === '%') {
          inputPercent();
        }
        break;
      default:
        break;
    }
  };

  return (
    <PS.MotionContainer>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <motion.div
            layout
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1rem',
              textAlign: 'right',
              fontSize: '2rem',
              color: '#fff',
              fontFamily: 'monospace',
              minHeight: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'hidden'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={display}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {display}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem'
          }}>
            {buttons.map((button, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleButtonClick(button)}
                style={{
                  gridColumn: button.span ? `span ${button.span}` : 'span 1',
                  background: button.color || 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '1.2rem',
                  color: button.color ? '#0a192f' : '#fff',
                  cursor: 'pointer',
                  aspectRatio: button.span ? '2/1' : '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {button.value}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </PS.MotionContainer>
  );
};

export default Calculator; 