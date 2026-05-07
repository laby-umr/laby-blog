/**
 * 字幕管理 Hook
 * 处理CC字幕(VTT/SRT)和ASS字幕的加载和设置
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type Artplayer from 'artplayer';

// 默认CC字幕设置
export const DEFAULT_CC_SETTINGS = {
  enabled: 'off',
  fontSize: '适中',
  fontColor: 'white',
  strokeStyle: '无描边',
  position: '底部居中',
  offset: 0,
  bgOpacity: 0,
};

// 默认ASS字幕设置
export const DEFAULT_ASS_SETTINGS = {
  enabled: 'off',
  currentFont: '',
  forceCC: false,
  useDefaultFont: false,
  offset: 0,
};

// CC字幕列表
export const CC_SUBTITLE_LIST = [
  { id: 'off', name: '关闭', url: '' },
  { id: 'butter-fly-zh', name: '中文字幕', url: '/subtitles/cc/butter-fly-zh.vtt' },
  { id: 'butter-fly-jp', name: '日文字幕', url: '/subtitles/cc/butter-fly-jp.vtt' },
  { id: 'butter-fly-dual', name: '双语字幕', url: '/subtitles/cc/butter-fly-dual.vtt' },
];

// ASS字幕列表
export const ASS_SUBTITLE_LIST = [
  { id: 'off', name: '关闭', url: '' },
  { id: 'butter-fly-zh', name: '中文字幕 (ASS)', url: '/subtitles/ass/butter-fly-zh.ass' },
  { id: 'butter-fly-jp', name: '日文字幕 (ASS)', url: '/subtitles/ass/butter-fly-jp.ass' },
  { id: 'butter-fly-dual', name: '双语字幕 (ASS)', url: '/subtitles/ass/butter-fly-dual.ass' },
];

export function useSubtitle(artRef: React.RefObject<Artplayer | null>) {
  // CC字幕设置
  const [ccSettings, setCCSettings] = useState(DEFAULT_CC_SETTINGS);
  const [ccSubtitles] = useState(CC_SUBTITLE_LIST);
  const [currentCCSubtitle, setCurrentCCSubtitle] = useState<any>(null);

  // ASS字幕设置
  const [assSettings, setASSSettings] = useState(DEFAULT_ASS_SETTINGS);
  const [assSubtitles] = useState(ASS_SUBTITLE_LIST);
  const [currentASSSubtitle, setCurrentASSSubtitle] = useState<any>(null);

  // ASS实例引用
  const assInstanceRef = useRef<any>(null);
  const originalCueTimesRef = useRef<any>(null);

  /**
   * 应用CC字幕样式
   */
  const applyCCStyle = useCallback((customSettings?: Partial<typeof DEFAULT_CC_SETTINGS>) => {
    const art = artRef.current;
    if (!art) return;

    // 使用传入的设置或当前设置
    const settings = customSettings ? { ...ccSettings, ...customSettings } : ccSettings;

    try {
      const fontSizeMap: Record<string, number> = {
        极小: 14,
        小: 18,
        适中: 22,
        大: 28,
        极大: 34,
      };

      const colorMap: Record<string, string> = {
        white: '#ffffff',
        yellow: '#ffff00',
        green: '#00ff00',
        cyan: '#00ffff',
        blue: '#0000ff',
        magenta: '#ff00ff',
        red: '#ff0000',
      };

      const strokeMap: Record<string, string> = {
        无描边: 'none',
        描边: '1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000',
        重墨描边:
          '2px 2px 4px #000, -2px -2px 4px #000, 2px -2px 4px #000, -2px 2px 4px #000',
        '45°投影': '2px 2px 4px rgba(0,0,0,0.8)',
      };

      const positionMap: Record<string, any> = {
        顶部居中: { bottom: 'auto', top: '5%', right: '50%', transform: 'translateX(50%)' },
        底部居中: { top: 'auto', bottom: '15%', right: '50%', transform: 'translateX(50%)' },
        顶部左侧: { bottom: 'auto', top: '5%', right: '8%', transform: 'none' },
        底部左侧: { top: 'auto', bottom: '15%', right: '8%', transform: 'none' },
      };

      const fontSize = fontSizeMap[settings.fontSize] || 22;
      const fontColor = colorMap[settings.fontColor] || '#ffffff';
      const textShadow = strokeMap[settings.strokeStyle] || 'none';
      const position = positionMap[settings.position] || positionMap['底部居中'];
      const bgOpacity = settings.bgOpacity || 0;

      if ((art as any).subtitle) {
        (art as any).subtitle.style({
          fontSize: `${fontSize}px`,
          color: fontColor,
          textShadow: textShadow,
          ...position,
          backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
          padding: bgOpacity > 0 ? '4px 8px' : '0',
        });
        
        console.log('[Subtitle] CC style applied:', {
          fontSize: `${fontSize}px`,
          fontColor,
          textShadow,
          position,
          bgOpacity,
        });
      } else {
        console.warn('[Subtitle] player.subtitle not available for styling');
      }
    } catch (e) {
      console.error('[Subtitle] Error applying CC style:', e);
    }
  }, [artRef, ccSettings]);

  /**
   * 加载CC字幕
   */
  const loadCCSubtitle = useCallback(
    async (subtitleId: string) => {
      const art = artRef.current;
      if (!art) {
        console.warn('[Subtitle] Player not ready');
        return false;
      }

      console.log('[Subtitle] Loading CC subtitle:', subtitleId);

      const subtitle = ccSubtitles.find((s) => s.id === subtitleId);
      if (!subtitle) {
        console.warn('[Subtitle] Subtitle not found:', subtitleId);
        return false;
      }

      // 关闭字幕
      if (subtitleId === 'off' || !subtitle.url) {
        try {
          if ((art as any).subtitle) {
            (art as any).subtitle.show = false;
          }
          setCurrentCCSubtitle(null);
          console.log('[Subtitle] CC subtitle disabled');
        } catch (e) {
          console.error('[Subtitle] Error disabling CC subtitle:', e);
        }
        return true;
      }

      // 加载字幕
      try {
        originalCueTimesRef.current = null;

        if ((art as any).subtitle && (art as any).subtitle.switch) {
          (art as any).subtitle.switch(subtitle.url, {
            name: subtitle.name,
            type: 'vtt',
          });
          (art as any).subtitle.show = true;
          setCurrentCCSubtitle(subtitle);
          console.log('[Subtitle] CC subtitle loaded:', subtitle.name);

          // 延迟应用样式，确保字幕元素已经渲染
          setTimeout(() => {
            applyCCStyle();
          }, 200); // 增加延迟到200ms

          return true;
        } else {
          console.warn('[Subtitle] player.subtitle not available');
          return false;
        }
      } catch (e) {
        console.error('[Subtitle] Error loading CC subtitle:', e);
        return false;
      }
    },
    [artRef, ccSubtitles, applyCCStyle]
  );

  /**
   * 更新CC字幕设置
   */
  const updateCCSettings = useCallback(
    (newSettings: Partial<typeof DEFAULT_CC_SETTINGS>) => {
      console.log('[Subtitle] Updating CC settings:', newSettings);
      
      if (newSettings.enabled !== undefined && newSettings.enabled !== 'off') {
        // 先更新状态
        setCCSettings((prev) => ({ ...prev, ...newSettings }));
        
        // 关闭ASS字幕
        if (assSettings.enabled !== 'off') {
          console.log('[Subtitle] CC enabled, closing ASS subtitle');
          setASSSettings((prev) => ({ ...prev, enabled: 'off' }));
          // 销毁ASS实例
          if (assInstanceRef.current) {
            try {
              if (assInstanceRef.current.destroy) {
                assInstanceRef.current.destroy();
              }
            } catch (e) {
              console.error('[Subtitle] Error destroying ASS:', e);
            }
            assInstanceRef.current = null;
          }
          // ASS关闭后再加载CC
          setTimeout(() => {
            console.log('[Subtitle] ASS closed, now loading CC');
            loadCCSubtitle(newSettings.enabled);
          }, 100);
        } else {
          // 直接加载CC
          loadCCSubtitle(newSettings.enabled);
        }
      } else if (newSettings.enabled === 'off') {
        setCCSettings((prev) => ({ ...prev, ...newSettings }));
        loadCCSubtitle('off');
      } else {
        // 其他设置更新（样式等）
        setCCSettings((prev) => ({ ...prev, ...newSettings }));
        // 立即应用样式，传入新设置
        applyCCStyle(newSettings);
      }
    },
    [assSettings.enabled, loadCCSubtitle, applyCCStyle]
  );

  /**
   * 销毁ASS实例
   */
  const destroyASSInstance = useCallback(() => {
    if (assInstanceRef.current) {
      try {
        if (assInstanceRef.current.destroy) {
          assInstanceRef.current.destroy();
        }
        console.log('[Subtitle] ASS instance destroyed');
      } catch (e) {
        console.error('[Subtitle] Error destroying ASS instance:', e);
      }
      assInstanceRef.current = null;
    }

    // 清理ASS容器
    const art = artRef.current;
    if (art && (art as any).template?.$player) {
      const assContainer = (art as any).template.$player.querySelector('.ass-container');
      if (assContainer) {
        assContainer.remove(); // 完全移除容器，而不是只清空内容
        console.log('[Subtitle] ASS container removed');
      }
    }
  }, [artRef]);

  /**
   * 加载ASS字幕
   */
  const loadASSSubtitle = useCallback(
    async (subtitleId: string) => {
      const art = artRef.current;
      if (!art) {
        console.warn('[Subtitle] Player not ready');
        return false;
      }

      console.log('[Subtitle] Loading ASS subtitle:', subtitleId);

      const subtitle = assSubtitles.find((s) => s.id === subtitleId);
      if (!subtitle) {
        console.warn('[Subtitle] Subtitle not found:', subtitleId);
        return false;
      }

      destroyASSInstance();

      if (subtitleId === 'off' || !subtitle.url) {
        setCurrentASSSubtitle(null);
        console.log('[Subtitle] ASS subtitle disabled');
        return true;
      }

      try {
        const videoElement = (art as any).template?.$video;
        const playerContainer = (art as any).template?.$player;

        if (!videoElement || !playerContainer) {
          console.error('[Subtitle] Cannot find video or player container');
          return false;
        }

        console.log('[Subtitle] Video element found:', {
          paused: videoElement.paused,
          currentTime: videoElement.currentTime,
          duration: videoElement.duration,
        });

        // 确保旧容器被完全移除
        const oldContainer = playerContainer.querySelector('.ass-container');
        if (oldContainer) {
          oldContainer.remove();
          console.log('[Subtitle] Old ASS container removed');
        }

        // 创建新的ASS容器
        const assContainer = document.createElement('div');
        assContainer.className = 'ass-container';
        assContainer.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 20;
          overflow: hidden;
        `;
        playerContainer.appendChild(assContainer);
        console.log('[Subtitle] New ASS container created');

        // 加载ASS文件
        const response = await fetch(subtitle.url);
        if (!response.ok) {
          throw new Error(`Failed to fetch ASS file: ${response.status}`);
        }
        const assText = await response.text();
        console.log('[Subtitle] ASS file loaded');

        // 动态导入ASS.js
        const ASS = (await import('assjs')).default;

        // 创建ASS实例
        const assInstance = new ASS(assText, videoElement, {
          container: assContainer,
          resampling: 'video_height',
        });

        assInstanceRef.current = assInstance;

        // 强制触发时间更新，让字幕立即同步
        setTimeout(() => {
          if (assInstance && (assInstance as any).resize) {
            try {
              (assInstance as any).resize();
              console.log('[Subtitle] ASS instance resized');
            } catch (e) {
              console.error('[Subtitle] Error resizing ASS:', e);
            }
          }
          
          // 触发 playing 事件确保字幕同步
          if (videoElement && !videoElement.paused) {
            try {
              videoElement.dispatchEvent(new Event('playing'));
              console.log('[Subtitle] Triggered playing event for ASS sync');
            } catch (e) {
              console.error('[Subtitle] Error triggering playing event:', e);
            }
          }
        }, 100);

        setCurrentASSSubtitle(subtitle);
        console.log('[Subtitle] ASS subtitle loaded:', subtitle.name);
        return true;
      } catch (e) {
        console.error('[Subtitle] Error loading ASS subtitle:', e);
        return false;
      }
    },
    [artRef, assSubtitles, destroyASSInstance]
  );

  /**
   * 更新ASS字幕设置
   */
  const updateASSSettings = useCallback(
    (newSettings: Partial<typeof DEFAULT_ASS_SETTINGS>) => {
      console.log('[Subtitle] Updating ASS settings:', newSettings);
      
      if (newSettings.enabled !== undefined && newSettings.enabled !== 'off') {
        // 先更新状态
        setASSSettings((prev) => ({ ...prev, ...newSettings }));
        
        // 关闭CC字幕
        if (ccSettings.enabled !== 'off') {
          console.log('[Subtitle] ASS enabled, closing CC subtitle');
          setCCSettings((prev) => ({ ...prev, enabled: 'off' }));
          loadCCSubtitle('off').then(() => {
            // CC关闭后再加载ASS
            console.log('[Subtitle] CC closed, now loading ASS');
            setTimeout(() => {
              loadASSSubtitle(newSettings.enabled);
            }, 150); // 增加延迟确保CC完全关闭
          });
        } else {
          // 直接加载ASS
          loadASSSubtitle(newSettings.enabled);
        }
      } else if (newSettings.enabled === 'off') {
        setASSSettings((prev) => ({ ...prev, ...newSettings }));
        loadASSSubtitle('off');
      } else {
        // 其他设置更新
        setASSSettings((prev) => ({ ...prev, ...newSettings }));
      }
    },
    [ccSettings.enabled, loadCCSubtitle, loadASSSubtitle]
  );

  /**
   * 重置CC设置
   */
  const resetCCSettings = useCallback(() => {
    console.log('[Subtitle] Resetting CC settings');
    setCCSettings(DEFAULT_CC_SETTINGS);
    loadCCSubtitle('off');
  }, [loadCCSubtitle]);

  /**
   * 重置ASS设置
   */
  const resetASSSettings = useCallback(() => {
    console.log('[Subtitle] Resetting ASS settings');
    setASSSettings(DEFAULT_ASS_SETTINGS);
    loadASSSubtitle('off');
  }, [loadASSSubtitle]);

  // 清理和事件监听
  useEffect(() => {
    const art = artRef.current;
    
    const handleResize = () => {
      if (assInstanceRef.current && (assInstanceRef.current as any).resize) {
        try {
          (assInstanceRef.current as any).resize();
          console.log('[Subtitle] ASS resized on window resize');
        } catch (e) {
          console.error('[Subtitle] Error resizing ASS:', e);
        }
      }
    };

    // 监听视频播放事件，确保ASS字幕同步
    const handlePlay = () => {
      if (assInstanceRef.current && art) {
        const videoElement = (art as any).template?.$video;
        if (videoElement) {
          console.log('[Subtitle] Video playing, syncing ASS subtitle');
          // 触发一次时间更新确保同步
          setTimeout(() => {
            if (videoElement && !videoElement.paused) {
              videoElement.dispatchEvent(new Event('timeupdate'));
            }
          }, 50);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    if (art) {
      art.on('play', handlePlay);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (art) {
        art.off('play', handlePlay);
      }
      destroyASSInstance();
    };
  }, [destroyASSInstance, artRef]);

  return {
    // CC字幕
    ccSettings,
    ccSubtitles,
    currentCCSubtitle,
    updateCCSettings,
    resetCCSettings,

    // ASS字幕
    assSettings,
    assSubtitles,
    currentASSSubtitle,
    updateASSSettings,
    resetASSSettings,
  };
}
