import type { Award, Contact, Education, Profile } from './profile.types';

export const contacts: Contact[] = [
  { kind: 'email', value: 'wnstjr401@gmail.com', href: 'mailto:wnstjr401@gmail.com' },
  { kind: 'github', value: 'github.com/chajunseok', href: 'https://github.com/chajunseok' },
  { kind: 'phone', value: '010-6649-5142', href: 'tel:010-6649-5142' },
];

export const profile: Profile = {
  name: '차준석',
  birthDate: '1998.04.01',
  tags: ['Frontend-Developer', 'React.js', 'Vue.js'],
  description: `🚀 도전과 성장으로 나아가는 프론트엔드 개발자, 차준석입니다.
끊임없는 도전과 성장을 통해 더 나은 사용자 경험을 만들어가는 프론트엔드 개발자입니다.
새로운 기술을 배우고 적용하는 데 주저하지 않으며, 효율적인 코드와 세련된 UI를 구현하는 데 집중합니다.
더 나은 웹 서비스를 고민하며 한 걸음씩 나아가는 과정이 즐겁습니다.

🔥 성장을 멈추지 않는 개발자, 차준석. 함께 만들어갈 미래를 기대합니다.`,
};

export const educations: Education[] = [
  { school: '한국항공대학교', department: '전자정보공학부 신호처리전공', period: '2017.03 ~ 2023.02' },
  { school: '한국항공대학교', department: '미디어통신 연구실 학부연구생', period: '2022.11 ~ 2023.01' },
  { school: '삼성 청년 SW 아카데미', department: '10기 수료', period: '2023.07 ~ 2024.06' },
  { school: '스타트업 베딩홈', department: '웹사이트 제작 외주', period: '2024.07 ~ 2025.02' },
];

export const awards: Award[] = [
  {
    title: '삼성 청년 SW 아카데미 최종 프로젝트 대상',
    organization: '삼성전자주식회사',
    date: '2024.06',
    subtitle: '(전국 168개팀 중 1위)',
  },
  {
    title: '삼성 청년 SW 아카데미 프로젝트 우수상',
    organization: '삼성전자주식회사',
    date: '2024.02',
    subtitle: '(22개팀 중 3위)',
  },
  {
    title: '삼성 청년 SW 아카데미 프로젝트 최우수상',
    organization: '삼성전자주식회사',
    date: '2023.12',
    subtitle: '(20개팀 중 1위)',
  },
];
