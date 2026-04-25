// 关于页面数据类型定义

export interface Achievement {
  value: string;
  label: string;
}

export interface Project {
  date: string;
  title: string;
  position: string;
  overview: string;
  techStack: string[];
  responsibilities: string[];
  achievements: Achievement[];
}

export interface WorkExperience {
  date: string;
  company: string;
  position: string;
  duties: string[];
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  highlights: string[];
}

// 个人基本信息
export interface PersonalInfo {
  name: string;
  nameEn: string;
  title: string;
  intro: string;
  avatar: string;
  resumeUrl: string;
  stats: {
    experience: string;
    experienceLabel: string;
    projects: string;
    projectsLabel: string;
    skills: string;
    skillsLabel: string;
    companies: string;
    companiesLabel: string;
  };
  contact: {
    phone: string;
    email: string;
    location: string;
    age: string;
    salary: string;
  };
}

export interface AboutData {
  personalInfo: PersonalInfo;
  projects: Project[];
  workExperiences: WorkExperience[];
  education: Education[];
}
