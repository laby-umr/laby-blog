import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './projects.module.css';

export default function Projects() {
  const projects = [
    {
      title: '智慧城市安全监控系统',
      description: '基于微服务架构的城市安全监控系统，实现了视频监控、报警处理和AI识别分析等功能。',
      image: '/img/projects/project.png',
      mode: 'PRODUCTION',
    },
    {
      title: '智慧仓储大屏',
      description: '实时监控仓储状态的数据可视化系统，包含人员调度、车辆管理和任务分配功能。',
      image: '/img/projects/project2.png',
      mode: 'LIVE',
    },
    {
      title: '光纤线路安防预警监测平台',
      description: '对光纤线路进行实时监测和预警，支持区域管理和异常情况快速响应。',
      image: '/img/projects/project3.png',
      mode: 'BETA',
    },
    {
      title: '智慧营地管理系统',
      description: '营地人员、设备和资源的智能管理平台，提供实时状态监控和数据统计。',
      image: '/img/projects/project4.png',
      mode: 'PRODUCTION',
    },
    {
      title: 'WMS仓储管理系统',
      description: '基于RuoYi-Pro框架的仓储管理系统，集成仓库管理、库位管理、物料管理、供应商管理等核心业务功能。',
      image: '/img/projects/project5.png',
      mode: 'PRODUCTION',
    },
    {
      title: '考勤打卡管理系统',
      description: '企业级考勤打卡管理系统，支持多种打卡方式、排班管理、请假审批、考勤统计等功能。',
      image: '/img/projects/project6.png',
      mode: 'LIVE',
    },
  ];

  // 滚动入场动画
  useEffect(() => {
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
      // Hero section animation
      const hero = document.querySelector(`.${styles.hero}`);
      if (hero) observer.observe(hero);

      // Project cards
      const projectCards = document.querySelectorAll(`.${styles.projectCard}`);
      projectCards.forEach((card, index) => {
        setTimeout(() => {
          if (card) observer.observe(card);
        }, index * 100);
      });

      // Quote section
      const quoteSection = document.querySelector(`.${styles.quoteSection}`);
      if (quoteSection) observer.observe(quoteSection);
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout
      title={translate({id: 'projects.title', message: '项目'})}
      description={translate({id: 'projects.description', message: '我的武器库 - 代码之刃'})}>
      <main className={styles.projectsMain}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <Translate id="projects.header.badge">武器库</Translate>
          </div>
          <h1 className={styles.heroTitle}>
            <Translate id="projects.header.title">我的武器库</Translate>
          </h1>
          <p className={styles.heroDescription}>
            <Translate id="projects.header.subtitle">每个项目都是一把锻造的日轮刀</Translate>
          </p>
        </section>

        {/* Projects Grid */}
        <section className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <article key={index} className={`${styles.projectCard} ${styles[`float${index % 3}`]}`}>
                {/* Card Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardControls}>
                    <div className={`${styles.control} ${styles.controlRed}`}></div>
                    <div className={`${styles.control} ${styles.controlYellow}`}></div>
                    <div className={`${styles.control} ${styles.controlGreen}`}></div>
                  </div>
                  <div className={styles.cardMode}>{project.mode}</div>
                </div>

                {/* Card Image */}
                <div className={styles.cardImage}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className={styles.pixelIcons}>
                    <span className="material-symbols-outlined">visibility</span>
                    <span className="material-symbols-outlined">code</span>
                  </div>
                  <div className={styles.scanline}></div>
                </div>

                {/* Card Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {project.title}
                  </h3>
                  <p className={styles.cardDescription}>
                    {project.description}
                  </p>
                  <button className={styles.cardButton}>
                    <span><Translate id="projects.viewDetails">查看详情</Translate></span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className={styles.quoteSection}>
          <span className={`material-symbols-outlined ${styles.quoteBackground}`}>flare</span>
          <div className={styles.quoteContent}>
            <blockquote className={styles.quoteText}>
              <Translate id="projects.quote">代码不仅是工具，更是创造价值的艺术</Translate>
            </blockquote>
            <div className={styles.quoteTags}>
              <span className={styles.quoteTag}>
                <Translate id="projects.tag.innovation">创新</Translate>
              </span>
              <span className={styles.quoteTag}>
                <Translate id="projects.tag.quality">品质</Translate>
              </span>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
