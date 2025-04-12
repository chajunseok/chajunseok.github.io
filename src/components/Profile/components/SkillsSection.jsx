import React, { useState } from 'react';
import * as S from '../styles/SkillStyles';
import { skills } from '../constants/skillsData';

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const getSkillLevel = (skill) => {
    return skill.level || 0;
  };

  return (
    <S.Section>
      <S.SectionTitle>SKILLS ABILITY</S.SectionTitle>
      <S.HintText>
        <i className="fas fa-mouse-pointer" />
        스킬에 마우스를 올려 숙련도를 확인해보세요
      </S.HintText>
      <S.SkillsContainer>
        {/* Language Skills */}
        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-code" />
            <S.CategoryTitle>LANGUAGE</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {skills.mainSkills.slice(0, 4).map(skill => (
              <S.SkillTag 
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <i className={skill.icon} />
                {skill.name}
                {hoveredSkill === skill && (
                  <S.SkillTooltip>
                    <S.SkillLevelContainer>
                      <S.SkillLevelBar width={getSkillLevel(skill)} />
                    </S.SkillLevelContainer>
                    <S.SkillLevelText>
                      {skill.description || `Proficiency: ${getSkillLevel(skill)}%`}
                    </S.SkillLevelText>
                  </S.SkillTooltip>
                )}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>

        {/* Frontend & Framework Skills */}
        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-laptop-code" />
            <S.CategoryTitle>FRONTEND & FRAMEWORK</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {[...skills.mainSkills.slice(4), ...skills.subSkills].map(skill => (
              <S.SkillTag 
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <i className={skill.icon} />
                {skill.name}
                {hoveredSkill === skill && (
                  <S.SkillTooltip>
                    <S.SkillLevelContainer>
                      <S.SkillLevelBar width={getSkillLevel(skill)} />
                    </S.SkillLevelContainer>
                    <S.SkillLevelText>
                      {skill.description || `Proficiency: ${getSkillLevel(skill)}%`}
                    </S.SkillLevelText>
                  </S.SkillTooltip>
                )}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>

        {/* AI & ML Skills */}
        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-robot" />
            <S.CategoryTitle>AI & ML</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {skills.aiSkills.map(skill => (
              <S.SkillTag 
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <i className={skill.icon} />
                {skill.name}
                {hoveredSkill === skill && (
                  <S.SkillTooltip>
                    <S.SkillLevelContainer>
                      <S.SkillLevelBar width={getSkillLevel(skill)} />
                    </S.SkillLevelContainer>
                    <S.SkillLevelText>
                      {skill.description || `Proficiency: ${getSkillLevel(skill)}%`}
                    </S.SkillLevelText>
                  </S.SkillTooltip>
                )}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>

        {/* Tools Skills */}
        <S.SkillBox>
          <S.CategoryHeader>
            <S.CategoryIcon className="fas fa-tools" />
            <S.CategoryTitle>Tools</S.CategoryTitle>
          </S.CategoryHeader>
          <S.SkillsList>
            {skills.tools.map(skill => (
              <S.SkillTag 
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <i className={skill.icon} />
                {skill.name}
                {hoveredSkill === skill && (
                  <S.SkillTooltip>
                    <S.SkillLevelContainer>
                      <S.SkillLevelBar width={getSkillLevel(skill)} />
                    </S.SkillLevelContainer>
                    <S.SkillLevelText>
                      {skill.description || `Proficiency: ${getSkillLevel(skill)}%`}
                    </S.SkillLevelText>
                  </S.SkillTooltip>
                )}
              </S.SkillTag>
            ))}
          </S.SkillsList>
        </S.SkillBox>
      </S.SkillsContainer>
    </S.Section>
  );
};

export default SkillsSection; 