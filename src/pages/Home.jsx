import React, { useEffect } from 'react';
import * as S from '@styles/index';
import MainSection from '@features/profile/components/MainSection';
import ProfileSection from '@features/profile/components/ProfileSection';
import SkillsSection from '@features/profile/components/SkillsSection';
import ExperienceSection from '@features/profile/components/ExperienceSection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <S.HomeContainer>
      <MainSection />
      <ProfileSection />
      <SkillsSection />
      <ExperienceSection />
    </S.HomeContainer>
  );
};

export default Home; 