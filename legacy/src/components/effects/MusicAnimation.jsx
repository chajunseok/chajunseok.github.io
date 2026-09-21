import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as PS from '@styles/PlaygroundStyles';

const MusicAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Audio 객체 생성
    const audio = new Audio('/music/background.mp3');
    audio.preload = 'auto';
    audioRef.current = audio;

    // 로드 완료 시
    audio.addEventListener('loadeddata', () => {
      setAudioLoaded(true);
    });

    // 에러 처리
    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      setAudioLoaded(false);
    });

    // 재생 종료 시
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleClick = async () => {
    if (!audioLoaded) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  const barVariants = {
    playing: (i) => ({
      scaleY: [1, 2, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    }),
    stopped: {
      scaleY: 1
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0 0 25px rgba(100, 255, 218, 0.5)'
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <PS.MotionContainer>
      <motion.div
        variants={buttonVariants}
        whileHover={audioLoaded ? "hover" : {}}
        whileTap={audioLoaded ? "tap" : {}}
        onClick={handleClick}
        style={{
          background: isPlaying ? 'rgba(100, 255, 218, 0.2)' : 'transparent',
          border: '2px solid #64ffda',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: audioLoaded ? 'pointer' : 'not-allowed',
          position: 'relative',
          transition: 'background 0.3s',
          opacity: audioLoaded ? 1 : 0.6
        }}
      >
        <motion.div
          animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            color: '#64ffda',
            fontSize: '2rem'
          }}
        >
          {isPlaying ? '❚❚' : '▶'}
        </motion.div>
      </motion.div>

      <motion.div
        style={{
          display: 'flex',
          gap: '6px',
          marginTop: '2rem',
          height: '60px',
          alignItems: 'center',
          padding: '0 1rem'
        }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={barVariants}
            animate={isPlaying ? "playing" : "stopped"}
            style={{
              width: '6px',
              height: '40px',
              background: '#64ffda',
              borderRadius: '4px',
              originY: 1,
              opacity: isPlaying ? 1 : 0.5
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          color: '#64ffda',
          marginTop: '1.5rem',
          fontSize: '1rem',
          textAlign: 'center'
        }}
      >
        {!audioLoaded ? '오디오 로딩중...' : 
         isPlaying ? '음악 재생중...' : '클릭하여 재생'}
      </motion.div>
    </PS.MotionContainer>
  );
};

export default MusicAnimation; 