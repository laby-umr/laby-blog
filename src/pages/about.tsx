import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import { 
  StatsCard, 
  ContactCard, 
  Tag, 
  CTASection, 
  Avatar,
  Button,
  Badge,
  Divider
} from '@site/src/components/Common';
import styles from './about.module.css';
import { skillsData } from '../data/skills';
import { Project, WorkExperience, Education } from '../types/about';
import { aboutApi } from '../api/aboutApi';
import LoadingScreen from '@site/src/components/Loading/LoadingScreen';

// 项目卡片组件
function ProjectCard({ date, title, position, overview, techStack, responsibilities, achievements, isOdd }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDateWrapper}>
        <div className={styles.timelineDate}>{date}</div>
      </div>
      <div className={styles.timelineDot}></div>
      <div className={styles.timelineContentWrapper}>
        <div className={`${styles.timelineContent} ${styles.projectCard}`}>
          <div className={styles.timelineHeader}>
            <h3>{title}</h3>
            <h4 className={styles.position}>{position}</h4>
          </div>
          
          <div className={styles.projectSection}>
            <h5 className={styles.projectSectionTitle}>项目概述</h5>
            <p className={styles.projectDesc}>{overview}</p>
          </div>

          {isExpanded && (
            <div className={styles.projectDetails}>
              <div className={styles.projectSection}>
                <h5 className={styles.projectSectionTitle}>技术架构</h5>
                <div className={styles.techStack}>
                  {techStack.map((tech, index) => (
                    <span key={index} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.projectSection}>
                <h5 className={styles.projectSectionTitle}>我的职责</h5>
                <ul className={styles.duties}>
                  {responsibilities.map((item, index) => (
                    <li key={index}><span className={styles.dutyIndex}>•</span> {item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.projectSection}>
                <h5 className={styles.projectSectionTitle}>业绩成果</h5>
                <div className={styles.achievements}>
                  {achievements.map((item, index) => (
                    <div key={index} className={styles.achievementItem}>
                      <span className={styles.achievementValue}>{item.value}</span>
                      <span className={styles.achievementLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <button 
            className={styles.expandIcon} 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            aria-label={isExpanded ? '收起详情' : '展开详情'}
          >
            <span className="material-symbols-outlined">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function About(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'work' | 'projects' | 'education'>('work');
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  // 检查是否已经访问过（本次会话）
  useEffect(() => {
    const visited = sessionStorage.getItem('hasVisitedSite');
    if (visited) {
      setShowLoading(false);
      setHasVisited(true);
    }
  }, []);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await aboutApi.getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error('Failed to load about data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!showLoading || hasVisited) {
      loadData();
    }
  }, [showLoading, hasVisited]);

  // 滚动动画 - Hero Section
  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      // Hero section animations
      const heroLeft = document.querySelector(`.${styles.heroLeft}`);
      const heroRight = document.querySelector(`.${styles.heroRight}`);
      if (heroLeft) observer.observe(heroLeft);
      if (heroRight) observer.observe(heroRight);

      // Stats cards
      const statCards = document.querySelectorAll(`.${styles.statCard}`);
      statCards.forEach((card, index) => {
        setTimeout(() => {
          if (card) observer.observe(card);
        }, index * 100);
      });

      // Contact cards
      const contactCards = document.querySelectorAll(`.${styles.contactCard}`);
      contactCards.forEach((card, index) => {
        setTimeout(() => {
          if (card) observer.observe(card);
        }, index * 100);
      });

      // Tech Stack cards
      const bentoCards = document.querySelectorAll(`.${styles.bentoCard}`);
      bentoCards.forEach((card, index) => {
        setTimeout(() => {
          if (card) observer.observe(card);
        }, index * 50);
      });

      // Timeline items
      const timelineItems = document.querySelectorAll(`.${styles.timelineItem}`);
      timelineItems.forEach((item, index) => {
        setTimeout(() => {
          if (item) observer.observe(item);
        }, index * 100);
      });

      // Education cards
      const educationCards = document.querySelectorAll(`.${styles.educationCard}`);
      educationCards.forEach((card, index) => {
        setTimeout(() => {
          if (card) observer.observe(card);
        }, index * 100);
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [loading, activeTab]); // 添加activeTab依赖，切换tab时重新观察

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasVisitedSite', 'true');
    setShowLoading(false);
    setHasVisited(true);
  };

  // 如果显示 loading，只渲染 loading 页面
  if (showLoading && !hasVisited) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // 数据加载中显示骨架屏
  if (loading) {
    return (
      <Layout
        title={translate({ id: 'about.title', message: '关于我' })}
        description={translate({ id: 'about.description', message: '猎鬼人档案 - 我的故事' })}>
        <main className={styles.aboutMain}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading data...</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title={translate({ id: 'about.title', message: '关于我' })}
      description={translate({ id: 'about.description', message: '猎鬼人档案 - 我的故事' })}>
      <main className={styles.aboutMain}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge}>
                <Translate id="about.hero.badge">全栈工程师</Translate>
              </div>

              <h1 className={styles.heroName}>
                {aboutData?.personalInfo?.name || '刘佳兴'}
              </h1>

              <p className={styles.heroIntro}>
                {aboutData?.personalInfo?.intro || (
                  <Translate id="about.hero.intro">
                    9年全栈开发经验，精通前后端技术栈。擅长从0到1搭建系统架构，
                    熟练使用Spring Cloud微服务、Vue3/React前端框架，
                    有丰富的大数据平台、CRM系统、智慧仓储等项目经验。
                  </Translate>
                )}
              </p>

              <div className={styles.heroButtons}>
                <a href="/contact" className={styles.heroPrimaryBtn}>
                  <Translate id="about.hero.contactBtn">联系我</Translate>
                  <span className={styles.btnBadge}>
                    <Translate id="about.hero.contactBadge">可远程</Translate>
                  </span>
                </a>
                <a
                  href={aboutData?.personalInfo?.resumeUrl || '/file/刘佳兴-vibe coding工程师.pdf'}
                  download={`${aboutData?.personalInfo?.name || '刘佳兴'}-vibe coding工程师.pdf`}
                  className={styles.heroDownloadBtn}
                >
                  <span className="material-symbols-outlined">download</span>
                  <Translate id="about.hero.downloadBtn">下载简历</Translate>
                </a>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.heroVisual}>
                <div className={styles.heroImageContainer} data-color="purple-pink">
                  <div className={styles.heroImageBorder}></div>
                  <div className={styles.heroImage}>
                    <div className={styles.heroImageContent}>
                      <img 
                        src={aboutData?.personalInfo?.avatar || '/img/user/about-hero.jpg'}
                        alt={aboutData?.personalInfo?.name || '刘佳兴'}
                        className={styles.heroImageReal} 
                      />
                      <div className={styles.heroCharacterInfo}>
                        <div className={styles.heroCharacterName}>{aboutData?.personalInfo?.name || '刘佳兴'}</div>
                        <div className={styles.heroCharacterNameEn}>{aboutData?.personalInfo?.nameEn || 'JIAXING LIU'}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.heroSticker}>
                    <Translate id="about.hero.sticker">9年经验 · 全栈开发</Translate>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <StatsCard
              number={aboutData?.personalInfo?.stats?.experience || '9年+'}
              label={translate({id: 'about.stats.experienceLabel', message: '工作经验'})}
            />
            <StatsCard
              number={aboutData?.personalInfo?.stats?.projects || '10+'}
              label={translate({id: 'about.stats.projectsLabel', message: '核心项目'})}
            />
            <StatsCard
              number={aboutData?.personalInfo?.stats?.skills || '20+'}
              label={translate({id: 'about.stats.skillsLabel', message: '技术栈'})}
            />
            <StatsCard
              number={aboutData?.personalInfo?.stats?.companies || '6家'}
              label={translate({id: 'about.stats.companiesLabel', message: '知名企业'})}
            />
          </div>
        </section>

        {/* Contact Info */}
        <section className={styles.contactSection}>
          <div className={styles.contactGrid}>
            <ContactCard
              icon="phone"
              label={translate({id: 'about.contact.phone', message: '电话'})}
              value={aboutData?.personalInfo?.contact?.phone || '13261915710'}
            />
            <ContactCard
              icon="email"
              label={translate({id: 'about.contact.email', message: '邮箱'})}
              value={aboutData?.personalInfo?.contact?.email || '1521170425@qq.com'}
            />
            <ContactCard
              icon="location_on"
              label={translate({id: 'about.contact.location', message: '位置'})}
              value={`${aboutData?.personalInfo?.contact?.location || '北京'} · ${aboutData?.personalInfo?.contact?.age || '32岁'}`}
            />
            <ContactCard
              icon="payments"
              label={translate({id: 'about.contact.salary', message: '期望薪资'})}
              value={aboutData?.personalInfo?.contact?.salary || '20-25K'}
            />
          </div>
        </section>

        <section className={styles.skillsSection}>
          <h2 className={styles.sectionTitleArsenal}>
            <Translate id="about.skills.title">TACTICAL_ARSENAL</Translate>
          </h2>

          <div className={styles.bentoGrid}>
            {/* 1. 后端框架 - Large Panel */}
            <div className={`${styles.bentoCard} ${styles.colSpan8} ${styles.bgWhite}`}>
              <h2 className={styles.bentoTitle}>
                <span className="material-symbols-outlined">terminal</span>
                后端框架
              </h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>SPRING</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>MYBATIS-PLUS</span>
                <span className={`${styles.bentoTag} ${styles.textVariant}`}>SPRING DATA JPA</span>
                <span className={`${styles.bentoTag} ${styles.textTertiary}`}>SPRINGBOOT</span>
                <span className={styles.bentoTag}>SPRINGCLOUD</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>SPRINGCLOUD ALIBABA</span>
                <span className={`${styles.bentoTag} ${styles.textVariant}`}>DUBBO</span>
                <span className={`${styles.bentoTag} ${styles.textSecondary}`}>SPRING SECURITY</span>
                <span className={styles.bentoTag}>SA-TOKEN</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>XXL-JOB</span>
                <span className={`${styles.bentoTag} ${styles.textTertiary}`}>APACHE KAFKA</span>
              </div>
            </div>

            {/* 2. 前端框架 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgYellow}`}>
              <h2 className={styles.bentoTitle}>
                <span className="material-symbols-outlined">draw</span>
                前端框架
              </h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>VUE</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>ANGULAR</span>
                <span className={`${styles.bentoTag} ${styles.textWhite}`}>REACT</span>
              </div>
            </div>

            {/* 3. UI框架 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgPink}`}>
              <h2 className={styles.bentoTitle}>
                <span className="material-symbols-outlined">palette</span>
                UI框架
              </h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>ELEMENT UI</span>
                <span className={styles.bentoTag}>ANT DESIGN</span>
                <span className={styles.bentoTag}>ARCO DESIGN</span>
                <span className={`${styles.bentoTag} ${styles.textWhite}`}>NAIVE UI</span>
                <span className={styles.bentoTag}>TAILWINDCSS</span>
                <span className={styles.bentoTag}>DAISYUI</span>
                <span className={styles.bentoTag}>VBEN5</span>
              </div>
            </div>

            {/* 4. 开发工具 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgGray}`}>
              <h2 className={styles.bentoTitle}>开发工具</h2>
              <div className={styles.bentoTagContainer}>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>ECLIPSE</span>
                <span className={styles.bentoTag}>IDEA</span>
                <span className={`${styles.bentoTag} ${styles.textTertiary}`}>POSTMAN</span>
                <span className={styles.bentoTag}>NAVICAT</span>
              </div>
            </div>

            {/* 5. 项目管理工具 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgBlue}`}>
              <h2 className={styles.bentoTitle}>项目管理</h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>GIT</span>
                <span className={styles.bentoTag}>SVN</span>
                <span className={styles.bentoTag}>GITHUB</span>
                <span className={styles.bentoTag}>GITLAB</span>
                <span className={styles.bentoTag}>JIRA</span>
                <span className={styles.bentoTag}>禅道</span>
              </div>
            </div>

            {/* 6. 数据库 */}
            <div className={`${styles.bentoCard} ${styles.colSpan5} ${styles.bgHighest}`}>
              <h2 className={styles.bentoTitle}>
                <span className="material-symbols-outlined">database</span>
                数据库
              </h2>
              <div className={styles.bentoTagContainer}>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>MYSQL</span>
                <span className={styles.bentoTag}>POSTGRESQL</span>
                <span className={`${styles.bentoTag} ${styles.textTertiary}`}>ORACLE</span>
                <span className={styles.bentoTag}>SQLSERVER</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>REDIS</span>
                <span className={styles.bentoTag}>MONGODB</span>
              </div>
            </div>

            {/* 7. AI编程工具 */}
            <div className={`${styles.bentoCard} ${styles.colSpan7} ${styles.bgBlack}`}>
              <h2 className={styles.bentoTitle}>AI编程工具</h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>CURSOR</span>
                <span className={`${styles.bentoTag} ${styles.textSecondary}`}>WINDSURF</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>TRAE</span>
                <span className={styles.bentoTag}>KIRO</span>
                <span className={styles.bentoTag}>CODE BUDDY</span>
                <span className={styles.bentoTag}>QODER</span>
                <span className={styles.bentoTag}>CHAT2DB</span>
                <span className={styles.bentoTag}>GITHUB COPILOT</span>
                <span className={styles.bentoTag}>CLAUDE CODE</span>
                <span className={styles.bentoTag}>CODEX</span>
                <span className={styles.bentoTag}>ANTIGRAVITY</span>
              </div>
            </div>

            {/* 8. 运维工具 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgWhite}`}>
              <h2 className={styles.bentoTitle}>运维工具</h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>DOCKER COMPOSE</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>NGINX</span>
                <span className={`${styles.bentoTag} ${styles.textVariant}`}>JENKINS</span>
                <span className={styles.bentoTag}>GITLAB CI/CD</span>
                <span className={styles.bentoTag}>XSHELL</span>
                <span className={styles.bentoTag}>HEXHUB</span>
              </div>
            </div>

            {/* 9. 开源架构 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgPurple}`}>
              <h2 className={styles.bentoTitle}>开源架构</h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>若依</span>
                <span className={`${styles.bentoTag} ${styles.textWhite}`}>若依-PLUS</span>
                <span className={styles.bentoTag}>若依-PRO</span>
                <span className={styles.bentoTag}>若依-AI</span>
                <span className={styles.bentoTag}>MALL</span>
                <span className={styles.bentoTag}>SMART ADMIN</span>
                <span className={styles.bentoTag}>CONTINEW ADMIN</span>
                <span className={styles.bentoTag}>NAIVE ADMIN</span>
              </div>
            </div>

            {/* 10. 开源项目集成 */}
            <div className={`${styles.bentoCard} ${styles.colSpan4} ${styles.bgYellow}`}>
              <h2 className={styles.bentoTitle}>开源项目集成</h2>
              <div className={styles.bentoTagContainer}>
                <span className={styles.bentoTag}>DOCUSAURUS</span>
                <span className={`${styles.bentoTag} ${styles.textPrimary}`}>VITEPRESS</span>
                <span className={`${styles.bentoTag} ${styles.textWhite}`}>SPRINGREPORT</span>
                <span className={styles.bentoTag}>DATAEASE</span>
                <span className={styles.bentoTag}>DATART</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className={styles.tabsSection}>
          <h2 className={styles.sectionTitle}>
            <Translate id="about.tabs.title">职业历程</Translate>
          </h2>

          {/* Tab Navigation */}
          <div className={styles.tabNav}>
            <button
              className={`${styles.tabButton} ${activeTab === 'work' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('work')}
            >
              <span className="material-symbols-outlined">work</span>
              <Translate id="about.tabs.work">工作经历</Translate>
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'projects' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              <Translate id="about.tabs.projects">项目经历</Translate>
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'education' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <span className="material-symbols-outlined">school</span>
              <Translate id="about.tabs.education">教育经历</Translate>
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {/* Work Experience */}
            {activeTab === 'work' && (
              <div className={styles.timelineList}>
                {aboutData?.workExperiences?.map((work, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineDateWrapper}>
                      <div className={styles.timelineDate}>{work.date}</div>
                    </div>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContentWrapper}>
                      <div className={styles.timelineContent}>
                        <div className={styles.timelineHeader}>
                          <h3>{work.company}</h3>
                          <h4 className={styles.position}>{work.position}</h4>
                        </div>
                        <ul className={styles.duties}>
                          {work.duties.map((duty, dutyIndex) => (
                            <li key={dutyIndex}>
                              <span className={styles.dutyIndex}>{String(dutyIndex + 1).padStart(2, '0')}.</span> {duty}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Project Experience */}
            {activeTab === 'projects' && (
              <div className={styles.timelineList}>
                {aboutData?.projects?.map((project, index) => (
                  <ProjectCard key={index} {...project} isOdd={index % 2 === 0} />
                ))}
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div className={styles.educationGrid}>
                {aboutData?.education?.map((edu, index) => (
                  <div key={index} className={styles.educationCard}>
                    <div className={styles.educationIcon}>
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div className={styles.educationContent}>
                      <h3>{edu.school}</h3>
                      <p className={styles.educationDegree}>{edu.degree} · {edu.major}</p>
                      <p className={styles.educationPeriod}>{edu.period}</p>
                      <div className={styles.educationHighlights}>
                        {edu.highlights.map((highlight, hIndex) => (
                          <span key={hIndex}>{highlight}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          {/* Breathing Sparks */}
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>

          <span className={`material-symbols-outlined ${styles.ctaFlare}`}>flare</span>
          <h2><Translate id="about.cta.title">准备好下一个挑战了吗？</Translate></h2>
          <p><Translate id="about.cta.description">我已准备好为您的下一个高风险任务拔刀相助。无论是战斗还是构建，我都已做好准备。</Translate></p>
          <div className={styles.ctaButtons}>
            <Button 
              href="/contact"
              icon="send"
            >
              <Translate id="about.cta.contact">发送消息</Translate>
            </Button>
            <Button 
              href="/projects"
              variant="secondary"
              icon="menu_book"
            >
              <Translate id="about.cta.projects">查看数据日志</Translate>
            </Button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
