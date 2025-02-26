import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
import { particlesOptions } from '../constants/particlesConfig';
import * as S from '../styles';
import * as CS from '../styles/ContactStyles';

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const contactItems = [
    { icon: "fas fa-phone", content: "010-6649-5142" },
    { icon: "fas fa-envelope", content: "wnstjr401@naver.com" },
    { 
      icon: "fab fa-github", 
      content: "github.com/chajunseok",
      link: "https://github.com/chajunseok"
    }
  ];

  const navItems = [
    { path: '/', label: 'Home', active: false },
    { path: '/projects', label: 'Projects', active: false },
    { path: '/contact', label: 'Contact', active: true }
  ];

  return (
    <>
      <S.ParticlesBackground
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
      <S.SideNav>
        {navItems.map(item => (
          <S.NavItem 
            key={item.path}
            active={item.active} 
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </S.NavItem>
        ))}
      </S.SideNav>

      <CS.ContactContainer>
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
                  <span>{item.content}</span>
                )}
              </CS.ContactItem>
            ))}
          </CS.ContactList>
        </CS.ContactContent>
      </CS.ContactContainer>
    </>
  );
};

export default Contact; 