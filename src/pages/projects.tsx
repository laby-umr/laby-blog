import React, { useEffect, useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate';
import { Card, Toast, Badge, Tag, Hero, Button } from '@site/src/components/Common';
import Pagination from '@site/src/components/Common/Pagination';
import styles from './projects.module.css';

export default function Projects() {
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // 处理查看详情点击
  const handleViewDetails = (url?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  interface Project {
    title: string;
    description: string;
    image: string;
    date: string;
    tags: string[];
    url?: string;
  }

  const projects: Project[] = [
    {
      title: 'Elite Kids English',
      description: '少儿英语在线学习平台，提供互动式英语课程、智能评测和个性化学习路径。',
      image: '/img/projects/English.png',
      date: '2024-05-20',
      tags: ['在线教育', '英语学习', '智能评测'],
      url: 'http://120.48.86.168:8087',
    },
    {
      title: 'Laby CRM 管理系统',
      description: '客户关系管理系统，支持客户信息管理、销售跟进、商机管理和数据分析。',
      image: '/img/projects/crm.png',
      date: '2024-05-10',
      tags: ['CRM系统', '客户管理', '销售管理'],
      url: 'http://120.48.86.168:8090',
    },
    {
      title: 'Laby Camp',
      description: 'Laby夏令营门户网站，展示夏令营活动信息、课程安排、报名流程和精彩瞬间。',
      image: '/img/projects/camp.png',
      date: '2024-04-28',
      tags: ['门户网站', '夏令营', '活动展示'],
      url: 'http://120.48.86.168:8085',
    },
    {
      title: 'Modern Coffee Atelier',
      description: 'Laby咖啡店门户网站，展示咖啡产品、店铺环境、品牌故事和在线预订功能。',
      image: '/img/projects/coffee.png',
      date: '2024-04-15',
      tags: ['门户网站', '咖啡店', '品牌展示'],
      url: 'http://120.48.86.168:8086',
    },
    {
      title: '广东省数据大屏',
      description: '基于Three.js的3D数据可视化大屏，展示广东省地图、实时数据统计和动态效果。',
      image: '/img/projects/screen.png',
      date: '2024-04-10',
      tags: ['数据可视化', 'Three.js', '3D地图'],
      url: 'http://120.48.86.168:8084',
    },
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

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return projects.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

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
        {/* 背景英文装饰 */}
        <div style={{ fontSize: '22rem', top: '5%', right: '2%', transform: 'rotate(15deg)', opacity: 0.06, fontWeight: 900, fontStyle: 'italic', position: 'absolute', pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '-0.05em', fontFamily: 'var(--dm-font-headline)', color: 'var(--dm-on-surface)' }}>BUILD</div>
        <div style={{ fontSize: '20rem', bottom: '8%', left: '3%', transform: 'rotate(-12deg)', opacity: 0.06, fontWeight: 900, fontStyle: 'italic', position: 'absolute', pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '-0.05em', fontFamily: 'var(--dm-font-headline)', color: 'var(--dm-on-surface)' }}>SHIP</div>

        {/* Toast Notification */}
        <Toast
          message="项目代码开源中..."
          visible={showToast}
          onClose={() => setShowToast(false)}
          variant="default"
          position="top-center"
        />

        {/* Hero Section */}
        <Hero
          badge={translate({id: 'projects.header.badge', message: '武器库'})}
          title={translate({id: 'projects.header.title', message: '我的武器库'})}
          description={translate({id: 'projects.header.subtitle', message: '每个项目都是一把锻造的日轮刀'})}
          align="center"
        />

        {/* Projects Grid */}
        <section className={styles.projectsSection}>
          <div className={styles.projectsGrid}>
            {paginatedProjects.map((project, index) => (
              <Card
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                date={new Date(project.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
                tags={project.tags.map(tag => ({ label: tag }))}
                readMore={translate({id: 'projects.readMore', message: '查看详情'})}
                onClick={handleViewDetails(project.url)}
                variant="default"
                size="md"
              />
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.paginationWrapper}>
            <div className={styles.paginationControls}>
              <div className={styles.pageSizeSelector}>
                <span className={styles.pageSizeLabel}>
                  <Translate id="projects.pagination.perPage">每页显示</Translate>
                </span>
                <div className={styles.pageSizeSelect}>
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  >
                    <option value={6}>6 条</option>
                    <option value={9}>9 条</option>
                    <option value={12}>12 条</option>
                    <option value={15}>15 条</option>
                  </select>
                </div>
              </div>
              <Pagination
                current={currentPage}
                total={projects.length}
                pageSize={pageSize}
                variant="comic"
                onChange={handlePageChange}
              />
            </div>
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
              <Button 
                href="/about"
                variant="primary"
                icon="person"
              >
                <Translate id="projects.cta.about">关于我</Translate>
              </Button>
              <Button 
                href="/contact"
                variant="secondary"
                icon="send"
              >
                <Translate id="projects.cta.contact">联系我</Translate>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
