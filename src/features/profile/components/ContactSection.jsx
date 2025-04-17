import React from 'react';
import * as S from '../styles/ContactStyles';

const ContactSection = () => {
  return (
    <S.Section>
      <S.SectionTitle>Contact</S.SectionTitle>
      <S.ContactList>
        <S.ContactItem>
          <i className="fas fa-envelope"></i>
          <span>wnstjr401@naver.com</span>
        </S.ContactItem>
        <S.ContactItem>
          <i className="fab fa-github"></i>
          <a href="https://github.com/chajunseok" target="_blank" rel="noopener noreferrer">
            github.com/chajunseok
          </a>
        </S.ContactItem>
      </S.ContactList>
    </S.Section>
  );
};

export default ContactSection; 