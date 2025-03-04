import React from 'react';
import * as S from '../styles/ProfileStyles';
import { profileData } from '../constants/profileData';

const ProfileSection = () => {
  const { name, birthDate, tags, description } = profileData;
  
  return (
    <S.ProfileInfo>
      <S.ProfileImage src="/assets/profile.jpg" alt="프로필 이미지" />
      <S.ProfileName>{name}</S.ProfileName>
      <S.ProfileDate>{birthDate}</S.ProfileDate>
      <S.TagContainer>
        {tags.map(tag => (
          <S.Tag key={tag}>{tag}</S.Tag>
        ))}
      </S.TagContainer>
      <S.ProfileDescription>
        {description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </S.ProfileDescription>
    </S.ProfileInfo>
  );
};

export default ProfileSection; 