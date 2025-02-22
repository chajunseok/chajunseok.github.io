import React from 'react';
import styled from 'styled-components';
import profileImage from '../assets/profile.jpg';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Profile = () => {
  const skills = {
    frontend: ["JavaScript", "TypeScript", "React", "Vue.js", "React Native"],
    backend: ["Node.js", "Spring Boot", "MySQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Firebase"]
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = async (container) => {
    // particles 로드 완료 후 실행될 코드
  };

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#333333"
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 2,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#222222",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };

  return (
    <>
      <ParticlesBackground
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
      <MainSection>
        <Header>
          <Title>Front-end Developer</Title>
        </Header>
        <MainContent style={{ position: 'relative', zIndex: 1 }}>
          <Name>JUNSEOK</Name>
          <SubTitle>PORTFOLIO</SubTitle>
          <ScrollDown>
            <i className="fas fa-angle-down"></i>
            <i className="fas fa-angle-down"></i>
          </ScrollDown>
        </MainContent>
      </MainSection>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <SkillsContainer>
          <SkillCategory>
            <CategoryTitle>Frontend</CategoryTitle>
            <SkillsList>
              {skills.frontend.map(skill => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </SkillCategory>
          <SkillCategory>
            <CategoryTitle>Backend</CategoryTitle>
            <SkillsList>
              {skills.backend.map(skill => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </SkillCategory>
          <SkillCategory>
            <CategoryTitle>Tools</CategoryTitle>
            <SkillsList>
              {skills.tools.map(skill => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
            </SkillsList>
          </SkillCategory>
        </SkillsContainer>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <ContactList>
          <ContactItem>
            <i className="fas fa-envelope"></i>
            <span>wnstjr401@naver.com</span>
          </ContactItem>
          <ContactItem>
            <i className="fab fa-github"></i>
            <a href="https://github.com/chajunseok" target="_blank" rel="noopener noreferrer">
              github.com/chajunseok
            </a>
          </ContactItem>
        </ContactList>
      </Section>
    </>
  );
};

const ParticlesBackground = styled(Particles)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const MainSection = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  background: transparent;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 50%
    );
    pointer-events: none;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Header = styled.header`
  padding: 2rem;
  margin-top: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  position: relative;
  display: inline-block;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #fff;
    animation: lineLoad 1s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes lineLoad {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  padding-bottom: 120px;
`;

const Name = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: -0.5rem;
  letter-spacing: 2px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 1.5s;
  line-height: 1;
`;

const SubTitle = styled.h3`
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: 2px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  animation-delay: 2s;
  line-height: 1;
`;

const ScrollDown = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeIn 0.5s ease forwards, bounce 2s infinite;
  animation-delay: 2.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  
  i {
    font-size: 1.8rem;
    display: block;
    line-height: 0.6;
    font-weight: 900;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translate(-50%, 0);
    }
    40% {
      transform: translate(-50%, -15px);
    }
    60% {
      transform: translate(-50%, -8px);
    }
  }
`;

const Section = styled.section`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 40px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #fff;
  margin-bottom: 30px;
  font-weight: 600;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const SkillCategory = styled.div`
  padding: 25px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
`;

const CategoryTitle = styled.h3`
  color: #fff;
  margin-bottom: 20px;
  font-size: 1.3em;
  font-weight: 600;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SkillTag = styled.span`
  background: #1a1a1a;
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.95em;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    background: #333;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 1.1em;
  color: #fff;

  i {
    margin-right: 15px;
    color: #a0a0a0;
    width: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #a0a0a0;
    }
  }
`;

export default Profile;