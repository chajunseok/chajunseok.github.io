export interface Skill {
  name: string;
  /** 0~100 숙련도 */
  level: number;
  description: string;
}

export type SkillGroupId = 'frontend' | 'backend' | 'ai' | 'tool';

export interface SkillGroup {
  id: SkillGroupId;
  skills: Skill[];
}
