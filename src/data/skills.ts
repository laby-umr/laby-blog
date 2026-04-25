export interface Skill {
  name: string;
  level: number;
  color: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning';
  rating: 'A' | 'A+' | 'S' | 'S+' | 'SS' | 'SSS';
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: Skill[];
}

// 根据等级生成评级和颜色
function getRatingAndColor(level: number): { rating: Skill['rating']; color: Skill['color'] } {
  if (level >= 95) return { rating: 'SSS', color: 'error' };
  if (level >= 90) return { rating: 'SS', color: 'tertiary' };
  if (level >= 85) return { rating: 'S+', color: 'primary' };
  if (level >= 80) return { rating: 'S', color: 'secondary' };
  if (level >= 75) return { rating: 'A+', color: 'success' };
  return { rating: 'A', color: 'warning' };
}

const colors: Skill['color'][] = ['primary', 'secondary', 'tertiary', 'error', 'success', 'warning'];

export const skillsData: SkillCategory[] = [
  {
    id: 'backend',
    title: '后端',
    icon: 'code',
    skills: [
      { name: 'Spring', level: 90, ...getRatingAndColor(90) },
      { name: 'Mybatis-plus', level: 90, ...getRatingAndColor(90) },
      { name: 'Spring Data JPA', level: 85, ...getRatingAndColor(85) },
      { name: 'SpringBoot', level: 95, ...getRatingAndColor(95) },
      { name: 'SpringCloud', level: 85, ...getRatingAndColor(85) },
      { name: 'SpringCloud Alibaba', level: 80, ...getRatingAndColor(80) },
      { name: 'Dubbo', level: 75, ...getRatingAndColor(75) },
      { name: 'Spring Security', level: 85, ...getRatingAndColor(85) },
      { name: 'Sa-Token', level: 90, ...getRatingAndColor(90) },
      { name: 'XXL-JOB', level: 85, ...getRatingAndColor(85) },
      { name: 'Apache Kafka', level: 75, ...getRatingAndColor(75) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'frontend',
    title: '前端',
    icon: 'web',
    skills: [
      { name: 'Vue', level: 90, ...getRatingAndColor(90) },
      { name: 'Angular', level: 75, ...getRatingAndColor(75) },
      { name: 'React', level: 80, ...getRatingAndColor(80) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'uiux',
    title: 'UI/UX',
    icon: 'palette',
    skills: [
      { name: 'Element UI', level: 95, ...getRatingAndColor(95) },
      { name: 'Ant Design', level: 90, ...getRatingAndColor(90) },
      { name: 'Arco Design', level: 85, ...getRatingAndColor(85) },
      { name: 'Naive UI', level: 85, ...getRatingAndColor(85) },
      { name: 'TailWindCss', level: 90, ...getRatingAndColor(90) },
      { name: 'DaisyUI', level: 80, ...getRatingAndColor(80) },
      { name: 'Vben5', level: 75, ...getRatingAndColor(75) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'devtools',
    title: '开发工具',
    icon: 'build',
    skills: [
      { name: 'Eclipse', level: 85, ...getRatingAndColor(85) },
      { name: 'Idea', level: 95, ...getRatingAndColor(95) },
      { name: 'PostMan', level: 90, ...getRatingAndColor(90) },
      { name: 'Navicat', level: 90, ...getRatingAndColor(90) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'pm',
    title: '项目管理',
    icon: 'task',
    skills: [
      { name: 'Git', level: 95, ...getRatingAndColor(95) },
      { name: 'SVN', level: 85, ...getRatingAndColor(85) },
      { name: 'GitHub', level: 90, ...getRatingAndColor(90) },
      { name: 'GitLab', level: 90, ...getRatingAndColor(90) },
      { name: 'Jira', level: 80, ...getRatingAndColor(80) },
      { name: '禅道', level: 85, ...getRatingAndColor(85) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'database',
    title: '数据库',
    icon: 'storage',
    skills: [
      { name: 'Mysql', level: 95, ...getRatingAndColor(95) },
      { name: 'PostgreSql', level: 85, ...getRatingAndColor(85) },
      { name: 'Oracle', level: 80, ...getRatingAndColor(80) },
      { name: 'SqlServer', level: 75, ...getRatingAndColor(75) },
      { name: 'Redis', level: 90, ...getRatingAndColor(90) },
      { name: 'MongoDB', level: 80, ...getRatingAndColor(80) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'ai',
    title: 'AI编程工具',
    icon: 'smart_toy',
    skills: [
      { name: 'Cursor', level: 95, ...getRatingAndColor(95) },
      { name: 'Windsurf', level: 90, ...getRatingAndColor(90) },
      { name: 'Trae', level: 85, ...getRatingAndColor(85) },
      { name: 'Kiro', level: 90, ...getRatingAndColor(90) },
      { name: 'Code buddy', level: 80, ...getRatingAndColor(80) },
      { name: 'Qoder', level: 80, ...getRatingAndColor(80) },
      { name: 'chat2DB', level: 85, ...getRatingAndColor(85) },
      { name: 'GitHub Copilot', level: 90, ...getRatingAndColor(90) },
      { name: 'Claude Code', level: 85, ...getRatingAndColor(85) },
      { name: 'CodeX', level: 75, ...getRatingAndColor(75) },
      { name: 'Antigravity', level: 75, ...getRatingAndColor(75) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'devops',
    title: '运维',
    icon: 'deployed_code',
    skills: [
      { name: 'Docker Compose', level: 90, ...getRatingAndColor(90) },
      { name: 'Nginx', level: 85, ...getRatingAndColor(85) },
      { name: 'Jenkins', level: 80, ...getRatingAndColor(80) },
      { name: 'GitLab CI/CD', level: 85, ...getRatingAndColor(85) },
      { name: 'Xshell', level: 90, ...getRatingAndColor(90) },
      { name: 'HexHub', level: 75, ...getRatingAndColor(75) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'framework',
    title: '开源架构',
    icon: 'architecture',
    skills: [
      { name: '若依', level: 95, ...getRatingAndColor(95) },
      { name: '若依-plus', level: 95, ...getRatingAndColor(95) },
      { name: '若依-pro', level: 90, ...getRatingAndColor(90) },
      { name: '若依-AI', level: 85, ...getRatingAndColor(85) },
      { name: 'mall', level: 85, ...getRatingAndColor(85) },
      { name: 'Smart Admin', level: 80, ...getRatingAndColor(80) },
      { name: 'Continew Admin', level: 80, ...getRatingAndColor(80) },
      { name: 'Naive Admin', level: 85, ...getRatingAndColor(85) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
  {
    id: 'integration',
    title: '开源项目集成',
    icon: 'integration_instructions',
    skills: [
      { name: 'Docusaurus', level: 90, ...getRatingAndColor(90) },
      { name: 'VitePress', level: 85, ...getRatingAndColor(85) },
      { name: 'SpringReport', level: 80, ...getRatingAndColor(80) },
      { name: 'DataEase', level: 85, ...getRatingAndColor(85) },
      { name: 'DataRt', level: 80, ...getRatingAndColor(80) },
    ].map((skill, i) => ({ ...skill, color: colors[i % colors.length] as Skill['color'] })),
  },
];
