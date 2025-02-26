import React from 'react';
import * as S from '../styles/SkillStyles';
import { skills } from '../constants/skillsData';

const SkillsSection = () => {
  return (
    <S.Section>
      <S.SectionTitle>SKILLS ABILITY</S.SectionTitle>
      <S.SkillsContainer>
        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-code" />
            <S.CategoryTitle>LANGUAGE</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {skills.mainSkills.slice(0, 4).map(skill => (
              <S.SkillTag key={skill.name}>
                <i className={skill.icon} />
                {skill.name}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>

        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-laptop-code" />
            <S.CategoryTitle>FRONTEND & FRAMEWORK</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {[...skills.mainSkills.slice(4), ...skills.subSkills].map(skill => (
              <S.SkillTag key={skill.name}>
                <i className={skill.icon} />
                {skill.name}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>

        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-robot" />
            <S.CategoryTitle>AI & ML</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {skills.aiSkills.map(skill => (
              <S.SkillTag key={skill.name}>
                <i className={skill.icon} />
                {skill.name}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>

        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-tools" />
            <S.CategoryTitle>Tools</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {skills.tools.map(skill => (
              <S.SkillTag key={skill.name}>
                <i className={skill.icon} />
                {skill.name}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>
      </S.SkillsContainer>
    </S.Section>
  );
};

export default SkillsSection; 