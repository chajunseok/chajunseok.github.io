export interface Profile {
  name: string;
  /** YYYY.MM.DD */
  birthDate: string;
  tags: string[];
  description: string;
}

export interface Education {
  school: string;
  department: string;
  /** YYYY.MM ~ YYYY.MM */
  period: string;
}

export interface Award {
  title: string;
  organization: string;
  /** YYYY.MM */
  date: string;
  subtitle: string;
}

export type ContactKind = 'email' | 'github' | 'phone';

export interface Contact {
  kind: ContactKind;
  /** 화면에 보이는 값 */
  value: string;
  href: string;
}
