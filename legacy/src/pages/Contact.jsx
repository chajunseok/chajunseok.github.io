import React, { useEffect, useState } from 'react';
import * as S from '@styles/index';
import * as CS from '@styles/ContactStyles';

const Contact = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("wnstjr401@naver.com");
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const contactItems = [
    { icon: "fas fa-phone", content: "010-6649-5142" },
    { 
      icon: "fas fa-envelope", 
      content: "wnstjr401@naver.com",
      style: { cursor: 'pointer' },
      onClick: handleEmailClick
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
                  onClick={item.onClick}
                >
                  {item.content}
                </span>
              )}
            </CS.ContactItem>
          ))}
        </CS.ContactList>
      </CS.ContactContent>
      
      {showNotification && (
        <CS.Notification>
          <i className="fas fa-check"></i>
          이메일이 클립보드에 복사되었습니다!
        </CS.Notification>
      )}
    </S.ContactContainer>
  );
};

export default Contact; 