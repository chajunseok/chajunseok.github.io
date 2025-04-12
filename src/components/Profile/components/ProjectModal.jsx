import React from 'react';
import * as PS from '../styles/ProjectStyles';
import { logEvent } from '../../../analytics';

const ProjectModal = ({ project, onClose }) => {
  const handleProjectClick = (url, type) => {
    logEvent('Project', 'click', `${type} - ${project.title}`);
    window.open(url, '_blank');
  };

  return (
    <PS.Modal onClick={onClose}>
      <PS.ModalWrapper onClick={(e) => e.stopPropagation()}>
        <PS.ModalContent>
          <h2>{project.title}</h2>
          
          <PS.ModalSection>
            <h3><i className="fas fa-info-circle"></i>프로젝트 소개</h3>
            <PS.ProjectInfoGrid>
              <PS.ProjectInfoItem>
                <i className="fas fa-desktop"></i>
                <div>
                  <PS.InfoLabel>서비스 타입</PS.InfoLabel>
                  <PS.InfoValue>{project.serviceType}</PS.InfoValue>
                </div>
              </PS.ProjectInfoItem>
              <PS.ProjectInfoItem>
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <PS.InfoLabel>기간</PS.InfoLabel>
                  <PS.InfoValue>{project.period}</PS.InfoValue>
                </div>
              </PS.ProjectInfoItem>
              <PS.ProjectInfoItem>
                <i className="fas fa-users"></i>
                <div>
                  <PS.InfoLabel>인원</PS.InfoLabel>
                  <PS.InfoValue>{project.team}</PS.InfoValue>
                </div>
              </PS.ProjectInfoItem>
              <PS.ProjectInfoItem>
                <i className="fas fa-building"></i>
                <div>
                  <PS.InfoLabel>기관</PS.InfoLabel>
                  <PS.InfoValue>{project.organization}</PS.InfoValue>
                </div>
              </PS.ProjectInfoItem>
            </PS.ProjectInfoGrid>
          </PS.ModalSection>

          <PS.ModalSection>
            <h3><i className="fas fa-file-alt"></i>프로젝트 개요</h3>
            {project.overview ? (
              <PS.OverviewList>
                {project.overview.map((item, index) => (
                  <li key={index}>
                    <i className="fas fa-angle-right"></i>
                    {item}
                  </li>
                ))}
              </PS.OverviewList>
            ) : (
              <p>{project.description}</p>
            )}
          </PS.ModalSection>
          
          <PS.ModalSection>
            <h3><i className="fas fa-list-ul"></i>주요 기능</h3>
            <PS.FeatureList>
              {project.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle"></i>{feature}
                </li>
              ))}
            </PS.FeatureList>
          </PS.ModalSection>

          <PS.ModalSection>
            <h3><i className="fas fa-tools"></i>사용 기술 스택</h3>
            <PS.TechStackModal>
              {project.tech.map((tech, index) => (
                <PS.TechItem key={index}>
                  <h4><i className="fas fa-code"></i>{tech}</h4>
                  <p>{project.techReasons?.[tech] || "프로젝트에 적합한 기술 스택으로 선정"}</p>
                </PS.TechItem>
              ))}
            </PS.TechStackModal>
          </PS.ModalSection>

          {project.roles && (
            <PS.ModalSection>
              <h3><i className="fas fa-user-cog"></i>담당 역할</h3>
              <PS.FeatureList>
                {project.roles.map((role, index) => (
                  <li key={index}>
                    <i className="fas fa-angle-right"></i>{role}
                  </li>
                ))}
              </PS.FeatureList>
            </PS.ModalSection>
          )}

          {project.troubleshooting && (
            <PS.ModalSection>
              <h3><i className="fas fa-exclamation-circle"></i>트러블 슈팅</h3>
              {project.troubleshooting.map((trouble, index) => (
                <PS.TroubleItem key={index}>
                  <h4><i className="fas fa-bug"></i>{trouble.issue}</h4>
                  <p><strong>문제:</strong> {trouble.problem}</p>
                  <p><strong>해결:</strong> {trouble.solution}</p>
                </PS.TroubleItem>
              ))}
            </PS.ModalSection>
          )}

          {project.review && (
            <PS.ModalSection>
              <h3><i className="fas fa-comment-dots"></i>프로젝트 리뷰</h3>
              <PS.FeatureList>
                {project.review.map((item, index) => (
                  <li key={index}>
                    <i className="fas fa-quote-right"></i>{item}
                  </li>
                ))}
              </PS.FeatureList>
            </PS.ModalSection>
          )}
        </PS.ModalContent>
        
        <PS.ModalSideButtons>
          {project.githubUrl && (
            <PS.ModalIconButton 
              onClick={() => handleProjectClick(project.githubUrl, 'GitHub')}
            >
              <i className="fab fa-github"></i>
            </PS.ModalIconButton>
          )}
          {project.demoUrl !== 0 && (
            <PS.ModalIconButton 
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={project.title === "BeddingHome" ? "fas fa-globe" : "fas fa-external-link-alt"}></i>
            </PS.ModalIconButton>
          )}
          <PS.ModalIconButton 
            as="button" 
            onClick={onClose}
            className="close-button"
          >
            <i className="fas fa-times"></i>
          </PS.ModalIconButton>
        </PS.ModalSideButtons>
      </PS.ModalWrapper>
    </PS.Modal>
  );
};

export default ProjectModal; 