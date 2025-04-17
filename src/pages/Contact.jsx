import React, { useEffect } from 'react';
import * as S from '@styles/index';
import * as CS from '@styles/ContactStyles';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactItems = [
    { icon: "fas fa-phone", content: "010-6649-5142" },
    { 
      icon: "fas fa-envelope", 
      content: "wnstjr401@naver.com",
      style: { cursor: 'pointer' }
    },
    { 
      icon: "fab fa-github", 
      content: "github.com/chajunseok",
      link: "https://github.com/chajunseok"
    }
  ];

  return (
    <S.ContactContainer>
      <CS.ContactTitle>CONTACT ME</CS.ContactTitle>
      <CS.ContactContent>
        <CS.ContactList>
          {contactItems.map((item, index) => (
            <CS.ContactItem key={index}>
              <i className={item.icon}></i>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.content}
                </a>
              ) : (
                <span 
                  style={item.style}
                >
                  {item.content}
                </span>
              )}
            </CS.ContactItem>
          ))}
        </CS.ContactList>
      </CS.ContactContent>
    </S.ContactContainer>
  );
};

export default Contact; 