import styled from 'styled-components';

export const ContactContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

export const ContactTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #fff;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #64ffda;
  }
`;

export const ContactContent = styled.div`
  max-width: 600px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
`;

export const ContactList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ContactItem = styled.li`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #fff;

  i {
    font-size: 1.5rem;
    margin-right: 1.5rem;
    color: #64ffda;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #64ffda;
    }
  }
`;

export const CopyNotification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: 8px;
  color: #64ffda;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(100, 255, 218, 0.2);
  animation: slideUp 0.3s ease-out;
  z-index: 1000;
  
  i {
    color: #64ffda;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

export const Notification = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(100, 255, 218, 0.1);
  color: #64ffda;
  padding: 1rem 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 1px solid rgba(100, 255, 218, 0.3);
  backdrop-filter: blur(10px);
  animation: slideUp 0.3s ease;

  i {
    color: #64ffda;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`; 