import React, { useState, useEffect } from 'react';
import * as S from '../styles/MainStyles';

const MainSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateOffset = () => {
    const maxScroll = 500;
    const offset = (scrollY / window.innerHeight) * maxScroll;
    return Math.min(offset, maxScroll);
  };

  return (
    <S.MainSection>
      <S.Header>
        <S.Title>Front-end Developer</S.Title>
      </S.Header>
      <S.MainContent>
        <S.Name x={calculateOffset()}>JUNSEOK</S.Name>
        <S.MainSubTitle x={-calculateOffset()}>PORTFOLIO</S.MainSubTitle>
      </S.MainContent>
      <S.ScrollDown>
        <i className="fas fa-chevron-down first"></i>
        <i className="fas fa-chevron-down second"></i>
      </S.ScrollDown>
    </S.MainSection>
  );
};

export default MainSection; 