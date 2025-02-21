import React, { useState } from 'react';
import styled from 'styled-components';

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

export default Profile; 