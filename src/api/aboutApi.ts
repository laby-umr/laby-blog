import { AboutData, Project, WorkExperience, Education } from '../types/about';
import { aboutData } from '../data/aboutData';

// 模拟API延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API服务
export const aboutApi = {
  // 获取所有关于页面数据
  async getAboutData(): Promise<AboutData> {
    await delay(300); // 模拟网络延迟
    return aboutData;
  },

  // 获取项目列表
  async getProjects(): Promise<Project[]> {
    await delay(200);
    return aboutData.projects;
  },

  // 获取单个项目详情
  async getProjectById(index: number): Promise<Project | null> {
    await delay(150);
    return aboutData.projects[index] || null;
  },

  // 获取工作经历列表
  async getWorkExperiences(): Promise<WorkExperience[]> {
    await delay(200);
    return aboutData.workExperiences;
  },

  // 获取教育经历
  async getEducation(): Promise<Education[]> {
    await delay(150);
    return aboutData.education;
  }
};
