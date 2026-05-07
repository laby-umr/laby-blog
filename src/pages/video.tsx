import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BangumiPlayer from '@site/src/components/BangumiPlayer';
import { getVideoInfo, getVideoTags, getDanmakuList, getAllVideos, formatViews, formatDuration } from '@site/src/api/bilibiliApi';
import type { MockVideo } from '@site/src/data/mockVideos';
import { getCategoryConfig } from '@site/src/data/categories';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './video.module.css';

export default function VideoPage(): JSX.Element {
  const [currentBvid, setCurrentBvid] = useState('');
  const [videoInfo, setVideoInfo] = useState<MockVideo | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<MockVideo[]>([]);
  const [danmakuList, setDanmakuList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDanmakuList, setShowDanmakuList] = useState(true);
  const [showVideoList, setShowVideoList] = useState(true);

  // 从URL获取视频BV号
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bvid = params.get('bvid') || 'BV1GJ411x7h7'; // 默认视频
    setCurrentBvid(bvid);
  }, []);

  // 加载视频数据
  useEffect(() => {
    if (currentBvid) {
      loadVideoData(currentBvid);
      loadRelatedVideos();
    }
  }, [currentBvid]);

  const loadVideoData = async (bvid: string) => {
    try {
      setLoading(true);

      // 获取视频信息
      const info = await getVideoInfo(bvid);
      setVideoInfo(info);

      // 获取弹幕
      const danmaku = await getDanmakuList(bvid);
      setDanmakuList(danmaku);

      console.log('视频信息:', info);
      console.log('弹幕:', danmaku);
    } catch (err) {
      console.error('加载视频失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedVideos = async () => {
    try {
      const allVideos = await getAllVideos();
      setRelatedVideos(allVideos.slice(0, 6));
    } catch (err) {
      console.error('加载相关视频失败:', err);
    }
  };

  const handleVideoSelect = (video: MockVideo) => {
    setCurrentBvid(video.bvid);
    window.history.pushState({}, '', `/video?bvid=${video.bvid}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 加载状态
  if (loading) {
    return (
      <Layout title={translate({ id: 'video.loading', message: '加载中...' })} description={translate({ id: 'video.description', message: '观看视频教程' })}>
        <div className={styles.videoPage}>
          <div className={styles.container}>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2><Translate id="video.loading">加载中...</Translate></h2>
              <p><Translate id="video.loadingData">正在加载视频数据</Translate></p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // 错误状态
  if (!videoInfo) {
    return (
      <Layout title={translate({ id: 'video.notFound', message: '视频不存在' })} description={translate({ id: 'video.description', message: '观看视频教程' })}>
        <div className={styles.videoPage}>
          <div className={styles.container}>
            <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
              <h2><Translate id="video.notFound">视频不存在</Translate></h2>
              <p><Translate id="video.notFoundDesc">未找到该视频</Translate></p>
              <Link 
                to="/videos"
                style={{ 
                  display: 'inline-block',
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                <Translate id="video.backToList">返回视频列表</Translate>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={videoInfo.title} description={videoInfo.description}>
      <div className={styles.videoPage}>
        <div className={styles.container}>
          {/* 左侧：播放器区域 */}
          <div className={styles.leftColumn}>
            {/* 播放器 */}
            <div className={styles.playerSection}>
              <BangumiPlayer
                videoUrl={videoInfo.videoUrl}
                title={videoInfo.title}
                danmakuList={danmakuList}
                autoplay={false}
              />
            </div>

            {/* 视频信息卡片 */}
            <div className={styles.videoInfoCard}>
              <div 
                className={styles.categoryBadge}
                style={{ 
                  backgroundColor: getCategoryConfig(videoInfo.category).color,
                  color: getCategoryConfig(videoInfo.category).textColor
                }}
              >
                {videoInfo.category}
              </div>
              <h1 className={styles.videoTitle}>{videoInfo.title}</h1>
              <div className={styles.videoMeta}>
                <span className={styles.metaItem}>
                  <span className="material-symbols-outlined">visibility</span>
                  {formatViews(videoInfo.views)}
                </span>
                <span className={styles.metaItem}>
                  <span className="material-symbols-outlined">thumb_up</span>
                  {formatViews(videoInfo.likes)}
                </span>
                <span className={styles.metaItem}>
                  <span className="material-symbols-outlined">chat</span>
                  {formatViews(videoInfo.danmakuCount)}
                </span>
                <span className={styles.metaItem}>
                  <span className="material-symbols-outlined">star</span>
                  {formatViews(videoInfo.favorites)}
                </span>
              </div>
              <p className={styles.videoDesc}>{videoInfo.description}</p>
              
              {/* UP主信息 */}
              <div className={styles.authorInfo}>
                <img 
                  src={videoInfo.author.avatar} 
                  alt={videoInfo.author.name}
                  className={styles.authorAvatar}
                  onError={(e) => {
                    e.currentTarget.src = '/img/avatars/devmanga.jpg';
                  }}
                />
                <div>
                  <div className={styles.authorName}>
                    {videoInfo.author.name}
                  </div>
                  <div className={styles.authorRole}><Translate id="video.author.label">UP主</Translate></div>
                </div>
              </div>

              {/* 标签 */}
              {videoInfo.tags.length > 0 && (
                <div className={styles.videoTags}>
                  {videoInfo.tags.map((tag, index) => (
                    <span 
                      key={tag} 
                      className={styles.tag} 
                      style={{ transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})` }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右侧：弹幕库 + 视频列表 */}
          <div className={styles.rightColumn}>
            {/* 弹幕库 - 在上面 */}
            <div className={styles.danmakuPanel}>
              <div
                className={styles.panelHeader}
                onClick={() => setShowDanmakuList(!showDanmakuList)}
              >
                <div className={styles.panelHeaderLeft}>
                  <span className="material-symbols-outlined">chat</span>
                  <h3 className={styles.panelTitle}><Translate id="video.danmaku.title">弹幕库</Translate></h3>
                  <span className={styles.danmakuCount}>{danmakuList.length}</span>
                </div>
                <span className={`material-symbols-outlined ${styles.expandIcon}`}>
                  {showDanmakuList ? 'expand_more' : 'chevron_right'}
                </span>
              </div>
              {showDanmakuList && (
                <div className={styles.danmakuList}>
                  {danmakuList.length > 0 ? (
                    danmakuList.map((danmaku, index) => {
                      // 格式化时间 MM:SS
                      const minutes = Math.floor(danmaku.time / 60);
                      const seconds = Math.floor(danmaku.time % 60);
                      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                      
                      // 判断弹幕模式
                      const modeIcon = danmaku.mode === 1 ? 'vertical_align_top' : 
                                      danmaku.mode === 2 ? 'vertical_align_bottom' : 
                                      'arrow_forward';
                      const modeText = danmaku.mode === 1 ? translate({ id: 'video.danmaku.mode.top', message: '顶部' }) : 
                                      danmaku.mode === 2 ? translate({ id: 'video.danmaku.mode.bottom', message: '底部' }) : 
                                      translate({ id: 'video.danmaku.mode.scroll', message: '滚动' });
                      
                      // 判断是否为白色弹幕（亮色主题下需要特殊处理）
                      const isWhite = danmaku.color === '#FFFFFF' || danmaku.color === '#FFF';
                      const textColor = isWhite ? '#383833' : danmaku.color;
                      
                      return (
                        <div key={index} className={styles.danmakuItem}>
                          <span className={styles.danmakuTime}>{timeStr}</span>
                          <div className={styles.danmakuContent}>
                            <span 
                              className={styles.danmakuText} 
                              style={{ color: textColor }}
                            >
                              {danmaku.text}
                            </span>
                            <div className={styles.danmakuMeta}>
                              <span className={styles.danmakuMode}>
                                <span className="material-symbols-outlined">{modeIcon}</span>
                                {modeText}
                              </span>
                              {danmaku.gradient && (
                                <span className={styles.danmakuGradient}>
                                  <span className="material-symbols-outlined">gradient</span>
                                  <Translate id="video.danmaku.gradient">渐变</Translate>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                      <p><Translate id="video.danmaku.empty">暂无弹幕</Translate></p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 视频列表 - 在下面 */}
            <div className={styles.videoListPanel}>
              <div
                className={styles.panelHeader}
                onClick={() => setShowVideoList(!showVideoList)}
              >
                <div className={styles.panelHeaderLeft}>
                  <span className="material-symbols-outlined">playlist_play</span>
                  <h3 className={styles.panelTitle}><Translate id="video.playlist.title">播放列表</Translate></h3>
                  <span className={styles.videoCount}>{relatedVideos.length}</span>
                </div>
                <span className={`material-symbols-outlined ${styles.expandIcon}`}>
                  {showVideoList ? 'expand_more' : 'chevron_right'}
                </span>
              </div>
              {showVideoList && (
                <div className={styles.videoList}>
                  {relatedVideos.map((video) => (
                    <div
                      key={video.bvid}
                      className={`${styles.videoItem} ${video.bvid === currentBvid ? styles.active : ''}`}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <div className={styles.videoItemThumb}>
                        {video.cover ? (
                          <img 
                            src={video.cover} 
                            alt={video.title}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const placeholder = document.createElement('div');
                              placeholder.className = styles.thumbPlaceholder;
                              placeholder.innerHTML = '<span class="material-symbols-outlined">play_circle</span>';
                              e.currentTarget.parentElement!.appendChild(placeholder);
                            }}
                          />
                        ) : (
                          <div className={styles.thumbPlaceholder}>
                            <span className="material-symbols-outlined">play_circle</span>
                          </div>
                        )}
                        <span className={styles.videoDuration}>{formatDuration(video.duration)}</span>
                      </div>
                      <div className={styles.videoItemInfo}>
                        <h4 className={styles.videoItemTitle}>{video.title}</h4>
                        <div className={styles.videoItemMeta}>
                          <span>{formatViews(video.views)}</span>
                          <span>·</span>
                          <span>{video.publishDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
