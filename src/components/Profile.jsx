import React, { useState } from 'react';
import styled from 'styled-components';
// 프로젝트 이미지 import
import vueShopImage from '../assets/projects/vue-shop.png';
import reactNativeAppImage from '../assets/projects/react-native-app.png';
import portfolioImage from '../assets/projects/portfolio.png';

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/300");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const projects = [
    {
      id: 1,
      title: "POTLESS",
      description: "포트홀 자동 탐지 AI 및 도로 파손 통합 관리 시스템. Vue.js와 Spring Boot를 활용한 웹 애플리케이션입니다.",
      image: "/projects/potless/thumbnail.png",
      demoUrl: "/projects/potless/demo",  // 정적 데모 페이지 경로
      sourceCode: "https://github.com/chajunseok/potless",
      skills: ["Vue.js", "Spring Boot", "MySQL", "FastAPI", "Flutter"]
    },
    {
      id: 2,
      title: "React Native 모바일 앱",
      description: "React Native로 개발한 크로스 플랫폼 모바일 애플리케이션입니다. iOS와 Android 모두 지원합니다.",
      image: reactNativeAppImage,
      projectUrl: "/projects/react-native-app",
      sourceCode: "https://github.com/chajunseok/react-native-app",
      skills: ["React Native", "Expo", "Redux"]
    },
    {
      id: 3,
      title: "React 포트폴리오",
      description: "React와 Styled Components를 사용한 개인 포트폴리오 웹사이트입니다.",
      image: portfolioImage,
      projectUrl: "/projects/portfolio",
      sourceCode: "https://github.com/chajunseok/portfolio",
      skills: ["React", "Styled Components"]
    }
  ];

  // 기술 스택별 필터링을 위한 상태 추가
  const [selectedTech, setSelectedTech] = useState('all');

  // 모든 기술 스택 추출
  const allTechnologies = ['all', ...new Set(projects.flatMap(project => project.skills))];

  // 프로젝트 필터링 함수
  const filteredProjects = selectedTech === 'all' 
    ? projects 
    : projects.filter(project => project.skills.includes(selectedTech));

  return (
    <Container>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src={imageUrl} alt="프로필 이미지" />
          <ImageUpload>
            <label htmlFor="file-input">
              <i className="fas fa-camera"></i>
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
          </ImageUpload>
        </AvatarContainer>
        <Name>홍길동</Name>
        <Title>프론트엔드 개발자</Title>
      </ProfileHeader>
      
      <Content>
        <Section>
          <SectionTitle>소개</SectionTitle>
          <Bio>
            안녕하세요! 저는 웹 개발을 좋아하는 프론트엔드 개발자입니다.
            사용자 경험을 개선하고 아름다운 인터페이스를 만드는 것을 좋아합니다.
          </Bio>
        </Section>
        
        <Section>
          <SectionTitle>연락처</SectionTitle>
          <ContactList>
            <ContactItem>
              <i className="fas fa-envelope"></i>
              <span>example@email.com</span>
            </ContactItem>
            <ContactItem>
              <i className="fas fa-phone"></i>
              <span>010-1234-5678</span>
            </ContactItem>
            <ContactItem>
              <i className="fab fa-github"></i>
              <span>github.com/username</span>
            </ContactItem>
          </ContactList>
        </Section>
        
        <Section>
          <SectionTitle>기술 스택</SectionTitle>
          <SkillsList>
            <SkillTag>React</SkillTag>
            <SkillTag>JavaScript</SkillTag>
            <SkillTag>TypeScript</SkillTag>
            <SkillTag>HTML5</SkillTag>
            <SkillTag>CSS3</SkillTag>
            <SkillTag>Node.js</SkillTag>
          </SkillsList>
        </Section>
        
        <Section>
          <SectionTitle>프로젝트</SectionTitle>
          <FilterContainer>
            {allTechnologies.map(tech => (
              <FilterButton 
                key={tech}
                isSelected={selectedTech === tech}
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </FilterButton>
            ))}
          </FilterContainer>
          <ProjectGrid>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id}>
                <ProjectImage src={project.image} alt={project.title} />
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectSkills>
                    {project.skills.map(skill => (
                      <SkillTag key={skill}>{skill}</SkillTag>
                    ))}
                  </ProjectSkills>
                  <ProjectLinks>
                    <ProjectLink href={project.demoUrl} target="_blank">
                      <i className="fas fa-desktop"></i> 데모 보기
                    </ProjectLink>
                    <ProjectLink href={project.sourceCode} target="_blank">
                      <i className="fab fa-github"></i> 소스 코드
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </Section>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
`;

const AvatarContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3498db;
  transition: all 0.3s ease;
`;

const ImageUpload = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #3498db;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  input {
    display: none;
  }

  i {
    color: white;
  }
`;

const Name = styled.h1`
  font-size: 2.5em;
  margin: 10px 0;
  color: #1a365d;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const Title = styled.p`
  color: #4a5568;
  font-size: 1.2em;
  margin-bottom: 20px;
  font-weight: 300;
`;

const Content = styled.div``;

const Section = styled.section`
  margin-bottom: 40px;
  padding: 25px;
  background-color: rgba(248, 249, 250, 0.8);
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    background-color: rgba(255, 255, 255, 0.95);
  }
`;

const SectionTitle = styled.h2`
  color: #2d3748;
  border-bottom: 2px solid #4299e1;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Bio = styled.p`
  line-height: 1.6;
  color: #34495e;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  color: #34495e;

  i {
    margin-right: 15px;
    color: #3498db;
    width: 20px;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillTag = styled.span`
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9em;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(66, 153, 225, 0.3);
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectContent = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  color: #2d3748;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  color: #4a5568;
  font-size: 0.9em;
  margin-bottom: 15px;
`;

const ProjectSkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: rgba(66, 153, 225, 0.1);

  &:hover {
    background-color: #4299e1;
    color: white;
  }

  i {
    font-size: 0.9em;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.isSelected ? 
    'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)' : 
    'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.isSelected ? 'white' : '#4a5568'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default Profile; 