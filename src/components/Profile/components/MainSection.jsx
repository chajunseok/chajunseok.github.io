import React from 'react';
import * as S from '../styles/MainStyles';

const MainSection = () => {
  return (
    <S.MainSection>
      <S.Header>
        <S.Title>Front-end Developer</S.Title>
      </S.Header>
      <S.MainContent>
        <S.Name>JUNSEOK</S.Name>
        <S.MainSubTitle>PORTFOLIO</S.MainSubTitle>
      </S.MainContent>
      <S.ScrollDown>
        <i className="fas fa-chevron-down first"></i>
        <i className="fas fa-chevron-down second"></i>
      </S.ScrollDown>
    </S.MainSection>
  );
};

export default MainSection; 