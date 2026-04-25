import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './projects.module.css';

export default function Projects() {
  const [showToast, setShowToast] = useState(false);

  // 处理查看详情点击
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const projects = [
    {
      title: '智慧城市安全监控系统',
      description: '基于微服务架构的城市安全监控系统，实现了视频监控、报警处理和AI识别分析等功能。',
      image: '/img/projects/project.png',
      date: '2024-03-15',
      tags: ['微服务', 'AI识别', '视频监控'],
    },
    {
      title: '智慧仓储大屏',
      description: '实时监控仓储状态的数据可视化系统，包含人员调度、车辆管理和任务分配功能。',
      image: '/img/projects/project2.png',
      date: '2024-02-20',
      tags: ['数据可视化', '实时监控', '调度管理'],
    },
    {
      title: '光纤线路安防预警监测平台',
      description: '对光纤线路进行实时监测和预警，支持区域管理和异常情况快速响应。',
      image: '/img/projects/project3.png',
      date: '2024-01-10',
      tags: ['实时监测', '预警系统', '区域管理'],
    },
    {
      title: '智慧营地管理系统',
      description: '营地人员、设备和资源的智能管理平台，提供实时状态监控和数据统计。',
      image: '/img/projects/project4.png',
      date: '2023-12-05',
      tags: ['智能管理', '状态监控', '数据统计'],
    },
    {
      title: 'WMS仓储管理系统',
      description: '基于RuoYi-Pro框架的仓储管理系统，集成仓库管理、库位管理、物料管理、供应商管理等核心业务功能。',
      image: '/img/projects/project5.png',
      date: '2023-11-18',
      tags: ['RuoYi-Pro', '仓库管理', '供应商管理'],
    },
    {
      title: '考勤打卡管理系统',
      description: '企业级考勤打卡管理系统，支持多种打卡方式、排班管理、请假审批、考勤统计等功能。',
      image: '/img/projects/project6.png',
      date: '2023-10-22',
      tags: ['考勤管理', '排班系统', '审批流程'],
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
        {/* Toast Notification */}
        {showToast && (
          <div className={styles.toast}>
            项目代码开源中...
          </div>
        )}

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
              <article key={index} className={styles.projectCard}>
                <div className={styles.cardShadow}></div>
                <div className={styles.cardContent}>
                  {/* Card Image */}
                  <div className={styles.cardImage}>
                    <img src={project.image} alt={project.title} />
                  </div>

                  {/* Card Info */}
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDescription}>{project.description}</p>
                    
                    {/* Tags */}
                    <div className={styles.cardTags}>
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <span className={styles.cardDate}>
                        {new Date(project.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <div className={styles.readMore} onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
                        <span>
                          <Translate id="projects.readMore">查看详情</Translate>
                        </span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </div>
                    </div>
                  </div>
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
