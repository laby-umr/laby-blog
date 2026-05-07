/**
 * Bangumi Player - 完整功能的视频播放器
 * 完全1:1复刻 laby-player 的所有功能
 * 包含：播放控制、弹幕系统、字幕、设置面板等
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Artplayer from 'artplayer';
import type { Option } from 'artplayer/types/option';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import DanmakuBar from './DanmakuBar';
import Controls from './Controls';
import { useSubtitle } from './useSubtitle';
import './styles.css';

export interface Episode {
  id: number;
  title: string;
  url: string;
}

export interface Danmaku {
  text: string;
  time: number;
  color?: string;
  mode?: number;
  border?: boolean;
  gradient?: boolean;
  gradientColors?: string[];
  gradientAngle?: number;
}

export interface BangumiPlayerProps {
  videoUrl: string;
  title?: string;
  poster?: string;
  danmakuList?: Danmaku[];
  episodes?: Episode[];
  currentEpisode?: number;
  autoplay?: boolean;
  onTimeUpdate?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onSelectEpisode?: (episode: Episode) => void;
  onDanmakuSend?: (danmaku: any) => void;
}

const THEME_COLOR = '#ff7a5e';

// 默认弹幕配置
const DEFAULT_DANMAKU_CONFIG = {
  enabled: true,
  opacity: 0.8,
  fontSizePercent: 100,
  speed: 5,
  area: 1,
  showScroll: true,
  showTop: true,
  showBottom: true,
  showColor: true,
  fontFamily: '微软雅黑',
  bold: false,
  strokeType: '重墨',
};

// 默认播放器设置
const DEFAULT_PLAYER_SETTINGS = {
  playMode: 'autoNext',
  aspectRatio: 'auto',
  hideBorder: false,
  mirror: false,
  autoPlay: true,
  loop: false,
  miniProgress: true,
};

export default function BangumiPlayer({
  videoUrl,
  title = '',
  poster = '',
  danmakuList = [],
  episodes = [],
  currentEpisode = 1,
  autoplay = false,
  onTimeUpdate,
  onPlay,
  onPause,
  onEnded,
  onSelectEpisode,
  onDanmakuSend,
}: BangumiPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<Artplayer | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [danmakuEnabled, setDanmakuEnabled] = useState(true);
  const [danmakuConfig, setDanmakuConfig] = useState(DEFAULT_DANMAKU_CONFIG);
  const [playerSettings, setPlayerSettings] = useState(DEFAULT_PLAYER_SETTINGS);
  const [watchingCount] = useState(Math.floor(Math.random() * 10) + 1);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 字幕管理
  const {
    ccSettings,
    ccSubtitles,
    currentCCSubtitle,
    updateCCSettings,
    resetCCSettings,
    assSettings,
    assSubtitles,
    currentASSSubtitle,
    updateASSSettings,
    resetASSSettings,
  } = useSubtitle(artRef);

  let hideControlsTimer: NodeJS.Timeout | null = null;

  // 判断颜色是否为白色
  const isWhiteColor = (color?: string) => {
    if (!color) return true;
    const c = color.toUpperCase().trim();
    return (
      c === '#FFFFFF' ||
      c === '#FFF' ||
      c === 'WHITE' ||
      c === 'RGB(255, 255, 255)' ||
      c === 'RGB(255,255,255)'
    );
  };

  // 生成渐变阴影样式
  const generateGradientShadow = (colors: string[], gradientAngle: number) => {
    const angle = (gradientAngle * Math.PI) / 180;
    const thickness = 2;
    const shadows: string[] = [];
    const angleStep = (2 * Math.PI) / 8;

    for (let dir = 0; dir < 8; dir++) {
      const dirAngle = dir * angleStep;
      const x = Math.round(Math.cos(dirAngle) * thickness);
      const y = Math.round(Math.sin(dirAngle) * thickness);
      const colorIndex =
        Math.floor(((dirAngle + angle) / (2 * Math.PI)) * colors.length) % colors.length;
      shadows.push(`${x}px ${y}px 0px ${colors[Math.abs(colorIndex)]}`);
    }

    shadows.push('0 0 4px rgba(0,0,0,0.9)');
    return shadows.join(', ');
  };

  // 初始化播放器
  useEffect(() => {
    if (!containerRef.current) return;

    const art = new Artplayer({
      container: containerRef.current,
      url: videoUrl,
      poster: poster,
      volume: 0.7,
      autoplay: autoplay,
      autoMini: true,
      muted: false,
      loop: playerSettings.loop,
      setting: false,
      hotkey: true,
      pip: true,
      fullscreen: true,
      fullscreenWeb: true,
      screenshot: true,
      theme: THEME_COLOR,
      lang: 'zh-cn',
      controls: [],
      plugins: [
        artplayerPluginDanmuku({
          danmuku: danmakuList.map((d) => ({
            text: d.text,
            time: d.time,
            color: d.color || '#FFFFFF',
            mode: (d.mode || 0) as 0 | 1 | 2,
            border: d.border || false,
          })),
          speed: 6,
          opacity: danmakuConfig.opacity,
          fontSize: 25,
          color: '#FFFFFF',
          margin: [10, '50%'],
          antiOverlap: true,
          visible: danmakuConfig.enabled,
          emitter: true,
        }),
      ],
    } as Option);

    artRef.current = art;

    // 创建渐变弹幕映射表
    const gradientDanmakuMap = new Map();
    danmakuList.forEach((d) => {
      if (d.gradient && d.gradientColors && d.gradientColors.length >= 2) {
        const key = d.text.substring(0, 20);
        gradientDanmakuMap.set(key, {
          colors: d.gradientColors,
          angle: d.gradientAngle || 90,
        });
      }
    });

    // 绑定事件
    art.on('ready', () => {
      setIsReady(true);
      setDuration(art.duration);
      setIsPlaying(art.playing);
      applyAllSettings();

      // 监听弹幕元素，应用渐变样式
      const $danmuku = (art as any).template?.$danmuku;
      if ($danmuku && gradientDanmakuMap.size > 0) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1 && (node as HTMLElement).textContent) {
                const text = (node as HTMLElement).textContent!.substring(0, 20);
                const gradientInfo = gradientDanmakuMap.get(text);
                if (gradientInfo) {
                  const shadow = generateGradientShadow(gradientInfo.colors, gradientInfo.angle);
                  (node as HTMLElement).style.setProperty('text-shadow', shadow, 'important');
                  (node as HTMLElement).setAttribute('data-gradient', 'true');
                }
              }
            });
          });
        });
        observer.observe($danmuku, { childList: true, subtree: true });
      }

      onPlay?.();
    });

    art.on('play', () => {
      setIsPlaying(true);
      onPlay?.();
    });

    art.on('pause', () => {
      setIsPlaying(false);
      onPause?.();
    });

    art.on('video:timeupdate', () => {
      setCurrentTime(art.currentTime);
      onTimeUpdate?.(art.currentTime);

      // 更新迷你进度条
      if (playerSettings.miniProgress && art.duration) {
        const percent = (art.currentTime / art.duration) * 100;
        (art as any).template.$player.style.setProperty('--mini-progress', `${percent}%`);
      }
    });

    art.on('ended', () => {
      setIsPlaying(false);
      onEnded?.();
    });

    art.on('volumechange', () => {
      setVolumeState(art.volume);
      setIsMuted(art.muted);
    });

    art.on('fullscreen', (state: boolean) => {
      setIsFullscreen(state);
    });

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [videoUrl, title, poster, autoplay, danmakuList]);

  // 应用所有设置
  const applyAllSettings = () => {
    if (!artRef.current) return;

    const art = artRef.current;

    // 应用画面比例
    if (playerSettings.aspectRatio !== 'auto') {
      (art as any).aspectRatio = playerSettings.aspectRatio;
    }

    // 应用镜像
    const video = (art as any).template.$video;
    if (video) {
      video.style.transform = playerSettings.mirror ? 'scaleX(-1)' : 'none';
    }

    // 应用循环 - 直接设置video元素
    const videoEl = (art as any).template.$video;
    if (videoEl) {
      videoEl.loop = playerSettings.loop;
    }

    // 应用迷你进度条
    const $player = (art as any).template.$player;
    if ($player) {
      if (playerSettings.miniProgress) {
        $player.classList.add('show-mini-progress');
      } else {
        $player.classList.remove('show-mini-progress');
      }

      // 应用隐藏边框
      if (playerSettings.hideBorder) {
        $player.classList.add('hide-border');
      } else {
        $player.classList.remove('hide-border');
      }
    }

    // 应用弹幕配置
    applyDanmakuConfig();
  };

  // 应用弹幕配置
  const applyDanmakuConfig = () => {
    if (!artRef.current) return;

    const art = artRef.current;
    const danmuku = (art as any).plugins?.artplayerPluginDanmuku;
    if (!danmuku) return;

    try {
      const baseFontSize = 25;
      const fontSize = Math.round(baseFontSize * (danmakuConfig.fontSizePercent / 100));

      // 计算显示模式
      const modes = [];
      if (danmakuConfig.showScroll) modes.push(0);
      if (danmakuConfig.showTop) modes.push(1);
      if (danmakuConfig.showBottom) modes.push(2);

      // 计算边距
      const marginBottom = `${Math.round((1 - danmakuConfig.area) * 100)}%`;

      // 速度（反转：1=慢, 10=快）
      const speed = 11 - danmakuConfig.speed;

      // 过滤函数
      const filter = (danmu: any) => {
        const mode = danmu.mode ?? 0;
        if (!danmakuConfig.showScroll && mode === 0) return false;
        if (!danmakuConfig.showTop && mode === 1) return false;
        if (!danmakuConfig.showBottom && mode === 2) return false;

        if (!danmakuConfig.showColor) {
          if (!isWhiteColor(danmu.color)) {
            return false;
          }
        }

        return true;
      };

      danmuku.config({
        opacity: danmakuConfig.opacity,
        fontSize: fontSize,
        speed: speed,
        modes: modes,
        margin: [10, marginBottom],
        antiOverlap: true,
        filter: filter,
      });

      // 控制显示/隐藏
      if (danmakuConfig.enabled) {
        danmuku.show();
      } else {
        danmuku.hide();
      }

      // 应用字体和描边样式
      applyDanmakuStyles();
    } catch (e) {
      console.error('Error applying danmaku config:', e);
    }
  };

  // 应用弹幕字体和描边样式
  const applyDanmakuStyles = () => {
    if (!artRef.current) return;

    try {
      const $danmuku = (artRef.current as any).template?.$danmuku;
      if (!$danmuku) return;

      const fontFamily = danmakuConfig.fontFamily || '微软雅黑';
      const fontWeight = danmakuConfig.bold ? 'bold' : 'normal';

      let textShadow = '';
      switch (danmakuConfig.strokeType) {
        case '重墨':
          textShadow =
            'rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px';
          break;
        case '描边':
          textShadow =
            '1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000';
          break;
        case '45°投影':
          textShadow = '2px 2px 3px rgba(0, 0, 0, 0.8)';
          break;
        default:
          textShadow =
            'rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px';
      }

      $danmuku.style.setProperty('--danmaku-font-family', fontFamily);
      $danmuku.style.setProperty('--danmaku-font-weight', fontWeight);
      $danmuku.style.setProperty('--danmaku-text-shadow', textShadow);

      // 注入全局样式
      let styleEl = document.getElementById('danmaku-custom-styles');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'danmaku-custom-styles';
        document.head.appendChild(styleEl);
      }

      styleEl.textContent = `
        .art-danmuku > div {
          font-family: var(--danmaku-font-family, 'Microsoft JhengHei', SimHei, Arial) !important;
          font-weight: var(--danmaku-font-weight, normal) !important;
        }
        .art-danmuku > div:not([data-gradient="true"]) {
          text-shadow: var(--danmaku-text-shadow, rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px) !important;
        }
        ${!danmakuConfig.showScroll ? '.art-danmuku > div[data-mode="0"] { display: none !important; }' : ''}
        ${!danmakuConfig.showTop ? '.art-danmuku > div[data-mode="1"] { display: none !important; }' : ''}
        ${!danmakuConfig.showBottom ? '.art-danmuku > div[data-mode="2"] { display: none !important; }' : ''}
      `;
    } catch (e) {
      console.error('Error applying danmaku styles:', e);
    }
  };

  // 控制条显示/隐藏
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimer) clearTimeout(hideControlsTimer);
    if (isPlaying) {
      hideControlsTimer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControls(false);
    }
  }, [isPlaying]);

  // 播放/暂停
  const togglePlay = useCallback(() => {
    if (!artRef.current) return;
    if (isPlaying) {
      artRef.current.pause();
    } else {
      artRef.current.play();
    }
  }, [isPlaying]);

  // 发送弹幕
  const handleDanmakuSend = useCallback(
    (danmaku: any) => {
      if (!artRef.current?.plugins?.artplayerPluginDanmuku) return;

      const text = typeof danmaku === 'string' ? danmaku : danmaku.text;
      if (!text || !text.trim()) return;

      try {
        const modeMap: Record<string, number> = { scroll: 0, top: 1, bottom: 2, reverse: 0 };
        const mode = modeMap[danmaku.mode || 'scroll'] ?? 0;

        const style: any = {};

        // 渐变效果
        if (danmaku.gradient && danmaku.gradientColors?.length >= 2) {
          const angle = ((danmaku.gradientAngle || 90) * Math.PI) / 180;
          const colors = danmaku.gradientColors;
          const shadows: string[] = [];
          const thickness = 2;
          const angleStep = (2 * Math.PI) / 8;

          for (let dir = 0; dir < 8; dir++) {
            const dirAngle = dir * angleStep;
            const x = Math.round(Math.cos(dirAngle) * thickness);
            const y = Math.round(Math.sin(dirAngle) * thickness);
            const colorIndex =
              Math.floor(((dirAngle + angle) / (2 * Math.PI)) * colors.length) % colors.length;
            shadows.push(`${x}px ${y}px 0px ${colors[Math.abs(colorIndex)]}`);
          }

          shadows.push('0 0 4px rgba(0,0,0,0.9)');
          style.textShadow = shadows.join(', ');
        }

        (artRef.current as any).plugins.artplayerPluginDanmuku.emit({
          text: text.trim(),
          color: danmaku.color || '#FFFFFF',
          border: false,
          mode: mode,
          style: style,
        });

        onDanmakuSend?.(danmaku);
      } catch (e) {
        console.error('Error sending danmaku:', e);
      }
    },
    [onDanmakuSend]
  );

  // 弹幕开关
  const handleDanmakuToggle = useCallback((enabled: boolean) => {
    setDanmakuEnabled(enabled);
    setDanmakuConfig((prev) => ({ ...prev, enabled }));
  }, []);

  // 弹幕配置更新
  const handleDanmakuConfigUpdate = useCallback((newConfig: any) => {
    setDanmakuConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  // 监听弹幕配置变化
  useEffect(() => {
    applyDanmakuConfig();
  }, [danmakuConfig]);

  // 监听播放器设置变化
  useEffect(() => {
    applyAllSettings();
  }, [playerSettings]);

  // 进度跳转
  const handleSeek = useCallback((percent: number) => {
    if (!artRef.current || !duration) return;
    artRef.current.currentTime = percent * duration;
  }, [duration]);

  // 音量控制
  const handleSetVolume = useCallback((vol: number) => {
    if (!artRef.current) return;
    artRef.current.volume = vol;
    setVolumeState(vol);
    if (vol > 0) setIsMuted(false);
  }, []);

  // 静音切换
  const handleToggleMute = useCallback(() => {
    if (!artRef.current) return;
    artRef.current.muted = !artRef.current.muted;
    setIsMuted(artRef.current.muted);
  }, []);

  // 倍速设置
  const handleSetSpeed = useCallback((speed: number) => {
    if (!artRef.current) return;
    artRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  }, []);

  // 全屏切换
  const handleToggleFullscreen = useCallback(() => {
    if (!artRef.current) return;
    try {
      artRef.current.fullscreen = !artRef.current.fullscreen;
    } catch (e) {
      console.error('Fullscreen error:', e);
    }
  }, []);

  // 网页全屏切换
  const handleToggleWebFullscreen = useCallback(() => {
    if (!artRef.current) return;
    try {
      artRef.current.fullscreenWeb = !artRef.current.fullscreenWeb;
    } catch (e) {
      console.error('Web fullscreen error:', e);
    }
  }, []);

  // 画中画切换
  const handleTogglePip = useCallback(() => {
    if (!artRef.current) return;
    try {
      artRef.current.pip = !artRef.current.pip;
    } catch (e) {
      console.error('PiP error:', e);
    }
  }, []);

  // 截图
  const handleTakeScreenshot = useCallback(() => {
    if (!artRef.current) return;
    try {
      artRef.current.screenshot();
    } catch (e) {
      console.error('Screenshot error:', e);
    }
  }, []);

  // 更新播放器设置
  const handleUpdateSettings = useCallback((newSettings: any) => {
    setPlayerSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  // 重置播放器设置
  const handleResetSettings = useCallback(() => {
    setPlayerSettings(DEFAULT_PLAYER_SETTINGS);
  }, []);

  // 进度百分比
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      className="bangumi-player-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 播放器主体 */}
      <div className={`player-main ${showControls || !isPlaying ? 'show-controls' : ''}`}>
        {/* ArtPlayer容器 */}
        <div ref={containerRef} className="art-container"></div>

        {/* 视频标题 */}
        {title && <div className="video-title">{title}</div>}

        {/* 中央播放图标 */}
        {!isPlaying && isReady && (
          <div className="center-play-icon" onClick={togglePlay}>
            <svg viewBox="0 0 990 720" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="rgba(255, 255, 255, 0.6)"
                d="M984.1 432.4 972.2 319c-2.8-26.3-26.3-45.3-52.5-42.5-26.3 2.8-45.3 26.3-42.5 52.5l11.3 108.6c4.2 40.3-25 76.4-65.2 80.6l-49 5.1V289.1c0-82.5-64.1-150.1-145.2-155.6L654.2 90c16-27.4 6.6-62.8-21.1-78.7l-.8-.5c-27.6-15.9-62.8-6.6-78.8 21.1L495 133.1H272.2L213.7 31.9c-16-27.5-51.1-37.1-78.8-21.1l-.8.5C106.6 27.3 97 62.4 113 90.1l25.8 44.6C63.2 145.5 5 210.5 5 289.1v271.8c0 86.1 69.8 156 156 156h457.4c64.5 0 119.8-39.1 143.6-94.9l75-7.9c90.9-9.6 156.7-90.9 147.1-181.7zM86.5 559.8V289.7c0-41.8 34-75.8 75.8-75.8h454.6c41.8 0 75.8 34 75.8 75.8V559.8c0 41.9-33.9 75.8-75.8 75.8H162.3c-41.8 0-75.8-34-75.8-75.8z"
              />
              <path
                fill="rgba(255, 255, 255, 0.6)"
                d="m524.1 445.5-248 126.6c-15.3 7.8-33.5-3.3-33.5-20.5V298.4c0-17.2 18.2-28.3 33.5-20.5l248 126.6c16.7 8.6 16.7 32.5 0 41z"
              />
            </svg>
          </div>
        )}

        {/* 控制栏 */}
        <Controls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          isMuted={isMuted}
          playbackRate={playbackRate}
          isFullscreen={isFullscreen}
          progressPercent={progressPercent}
          settings={playerSettings}
          episodes={episodes}
          currentEpisode={currentEpisode}
          ccSettings={ccSettings}
          ccSubtitles={ccSubtitles}
          assSettings={assSettings}
          assSubtitles={assSubtitles}
          onTogglePlay={togglePlay}
          onSeek={handleSeek}
          onSetVolume={handleSetVolume}
          onToggleMute={handleToggleMute}
          onSetSpeed={handleSetSpeed}
          onToggleFullscreen={handleToggleFullscreen}
          onToggleWebFullscreen={handleToggleWebFullscreen}
          onTogglePip={handleTogglePip}
          onTakeScreenshot={handleTakeScreenshot}
          onUpdateSettings={handleUpdateSettings}
          onResetSettings={handleResetSettings}
          onUpdateCCSettings={updateCCSettings}
          onResetCCSettings={resetCCSettings}
          onUpdateASSSettings={updateASSSettings}
          onResetASSSettings={resetASSSettings}
          onSelectEpisode={onSelectEpisode}
        />
      </div>

      {/* 弹幕发送栏 */}
      <DanmakuBar
        watchingCount={watchingCount}
        danmakuCount={danmakuList.length}
        danmakuEnabled={danmakuEnabled}
        danmakuConfig={danmakuConfig}
        onSend={handleDanmakuSend}
        onToggle={handleDanmakuToggle}
        onConfigUpdate={handleDanmakuConfigUpdate}
      />
    </div>
  );
}
