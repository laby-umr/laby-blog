import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Pagination from '@site/src/components/Common/Pagination';
import { getAllVideos, formatViews, formatDuration } from '@site/src/api/bilibiliApi';
import type { MockVideo } from '@site/src/data/mockVideos';
import { categories, getCategoryConfig } from '@site/src/data/categories';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './videos.module.css';

export default function Videos(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [videos, setVideos] = useState<MockVideo[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载视频数据
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const allVideos = await getAllVideos();
      setVideos(allVideos);
    } catch (err) {
      console.error('加载视频列表失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = useMemo(() => {
    return selectedCategory === 'All' 
      ? videos 
      : videos.filter(v => v.category === selectedCategory);
  }, [selectedCategory, videos]);

  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredVideos.slice(start, end);
  }, [filteredVideos, currentPage, pageSize]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // 加载状态
  if (loading) {
    return (
      <Layout title={translate({ id: 'videos.title', message: '视频教程' })} description={translate({ id: 'videos.description', message: 'DevManga 视频教程 - 技术学习' })}>
        <main className={styles.videosMain}>
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}><Translate id="videos.loading">加载中...</Translate></h1>
              <p className={styles.heroDesc}><Translate id="videos.loadingData">正在加载视频数据</Translate></p>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title={translate({ id: 'videos.title', message: '视频教程' })}
      description={translate({ id: 'videos.description', message: 'DevManga 视频教程 - 技术学习' })}>
      <main className={styles.videosMain}>
        {/* 背景英文装饰 */}
        <div style={{ fontSize: '22rem', top: '5%', right: '2%', transform: 'rotate(10deg)', opacity: 0.06, fontWeight: 900, fontStyle: 'italic', position: 'absolute', pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '-0.05em', fontFamily: 'var(--dm-font-headline)', color: 'var(--dm-on-surface)' }}>LEARN</div>
        <div style={{ fontSize: '20rem', bottom: '8%', left: '3%', transform: 'rotate(-12deg)', opacity: 0.06, fontWeight: 900, fontStyle: 'italic', position: 'absolute', pointerEvents: 'none', zIndex: 0, userSelect: 'none', letterSpacing: '-0.05em', fontFamily: 'var(--dm-font-headline)', color: 'var(--dm-on-surface)' }}>TECH</div>
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className="material-symbols-outlined">play_circle</span>
              <Translate id="videos.hero.badge">技术教程</Translate>
            </div>
            <h1 className={styles.heroTitle}>
              <Translate id="videos.hero.title.part1">掌握</Translate>
              <span className={styles.highlight}><Translate id="videos.hero.title.part2">前沿技术</Translate></span>
            </h1>
            <p className={styles.heroDesc}>
              <Translate id="videos.hero.description">从基础到高级的完整视频教程系列，助你成为技术专家</Translate>
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}><Translate id="videos.hero.stats.videos">视频教程</Translate></span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100K+</span>
                <span className={styles.statLabel}><Translate id="videos.hero.stats.views">总观看量</Translate></span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}><Translate id="videos.hero.stats.stacks">技术栈</Translate></span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className={styles.filterSection}>
          <div className={styles.filterContainer}>
            <h2 className={styles.filterTitle}><Translate id="videos.filter.title">选择技术分类</Translate></h2>
            <div className={styles.categoryTags}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`${styles.categoryTag} ${selectedCategory === category.id ? styles.activeTag : ''}`}
                  style={{
                    backgroundColor: category.color,
                    color: category.textColor,
                  }}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section className={styles.videoGrid}>
          {paginatedVideos.map((video, index) => {
            const categoryConfig = getCategoryConfig(video.category);
            return (
              <Link
                to={`/video?bvid=${video.bvid}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article
                  key={video.bvid}
                  className={styles.videoCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <div className={styles.thumbnailContainer}>
                  <div className={styles.thumbnail}>
                    {video.cover ? (
                      <img 
                        src={video.cover} 
                        alt={video.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          // 图片加载失败时显示占位符
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="${styles.placeholderImage}">
                              <span class="material-symbols-outlined">play_circle</span>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className={styles.placeholderImage}>
                        <span className="material-symbols-outlined">
                          play_circle
                        </span>
                      </div>
                    )}
                    <div className={styles.duration}>{formatDuration(video.duration)}</div>
                    <div className={styles.playOverlay}>
                      <span className="material-symbols-outlined">
                        play_arrow
                      </span>
                    </div>
                  </div>
                  <div 
                    className={styles.categoryBadge}
                    style={{ 
                      backgroundColor: categoryConfig.color,
                      color: categoryConfig.textColor
                    }}
                  >
                    {video.category}
                  </div>
                </div>

              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoDesc}>{video.description}</p>

                <div className={styles.videoMeta}>
                  <div className={styles.metaItem}>
                    <span className="material-symbols-outlined">visibility</span>
                    <span>{formatViews(video.views)}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className="material-symbols-outlined">calendar_today</span>
                    <span>{video.publishDate}</span>
                  </div>
                </div>

                <div className={styles.videoTags}>
                  {video.tags.map((tag) => (
                    <span key={tag} className={styles.videoTag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
                </article>
              </Link>
            );
          })}
        </section>

        {/* Pagination */}
        {filteredVideos.length > 0 && (
          <section className={styles.paginationSection}>
            <div className={styles.paginationControls}>
              <div className={styles.pageSizeSelector}>
                <span className={styles.pageSizeLabel}><Translate id="videos.pagination.perPage">每页显示</Translate></span>
                <div className={styles.pageSizeSelect}>
                  <select 
                    value={pageSize} 
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  >
                    <option value={6}>6 {translate({ id: 'videos.pagination.items', message: '条' })}</option>
                    <option value={9}>9 {translate({ id: 'videos.pagination.items', message: '条' })}</option>
                    <option value={12}>12 {translate({ id: 'videos.pagination.items', message: '条' })}</option>
                    <option value={15}>15 {translate({ id: 'videos.pagination.items', message: '条' })}</option>
                  </select>
                </div>
              </div>
              <Pagination
                current={currentPage}
                total={filteredVideos.length}
                pageSize={pageSize}
                variant="comic"
                onChange={handlePageChange}
              />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          {/* Breathing Sparks */}
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>
          <div className={styles.breathingSpark}></div>

          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}><Translate id="videos.cta.title">准备好开始学习了吗？</Translate></h2>
            <p className={styles.ctaDesc}>
              <Translate id="videos.cta.description">订阅频道，获取最新的技术教程和编程分享</Translate>
            </p>
            <button className={styles.ctaButton}>
              <span className="material-symbols-outlined">notifications</span>
              <Translate id="videos.cta.button">订阅更新</Translate>
            </button>
          </div>
        </section>
      </main>
    </Layout>
  );
}
