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
