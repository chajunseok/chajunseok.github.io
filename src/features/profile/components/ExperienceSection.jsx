import React from 'react';
import styled from 'styled-components';
import { experienceData } from '../constants/experienceData';

const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  i {
    color: #64ffda;
  }
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2.5rem;
  margin-bottom: 2rem;

  > div {
    max-width: 900px;
    margin: 0 auto;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const SchoolName = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
  line-height: 1.4;
  word-break: keep-all;
  font-weight: 600;
`;

const Department = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const Period = styled.span`
  color: #64ffda;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Organization = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const Subtitle = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: block;
  margin-top: 0.25rem;
`;

const ExperienceSection = () => {
  return (
    <Section>
      <ContentBox>
        <div>
          <Title>
            <i className="fas fa-graduation-cap"></i>
            EDUCATION
          </Title>
          {experienceData.education.slice().reverse().map((edu, index) => (
            <GridContainer key={index}>
              <SchoolName>{edu.school}</SchoolName>
              <div>
                <Department>{edu.department}</Department>
                <Period>{edu.period}</Period>
              </div>
            </GridContainer>
          ))}
        </div>
      </ContentBox>

      <ContentBox>
        <div>
          <Title>
            <i className="fas fa-trophy"></i>
            AWARDS
          </Title>
          {experienceData.certificate.map((cert, index) => (
            <GridContainer key={index}>
              <SchoolName>{cert.title}</SchoolName>
              <div>
                <Organization>{cert.organization}</Organization>
                <Period>{cert.date}</Period>
                {cert.subtitle && <Subtitle>{cert.subtitle}</Subtitle>}
              </div>
            </GridContainer>
          ))}
        </div>
      </ContentBox>
    </Section>
  );
};

export default ExperienceSection; 