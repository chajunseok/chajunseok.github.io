export interface Troubleshooting {
  issue: string;
  problem: string;
  solution: string;
}

export interface Project {
  /** slug — 상세 경로·key로 쓴다 */
  id: string;
  title: string;
  serviceType: string;
  period: string;
  team: string;
  organization: string;
  description: string;
  overview: string[];
  tech: string[];
  /** public/ 기준 경로 */
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  isMobile: boolean;
  features: string[];
  techReasons: Record<string, string>;
  roles: string[];
  troubleshooting: Troubleshooting[];
  review: string[];
}
