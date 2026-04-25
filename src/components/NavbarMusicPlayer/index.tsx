import React, { useState, useRef, useEffect } from 'react';
import { getPlaylistSongs, MY_PLAYLIST_ID } from '@site/src/utils/neteaseApi';
import type { Song } from '@site/src/utils/neteaseApi';
import styles from './styles.module.css';

// 全局状态键
const STORAGE_KEYS = {
  PLAYLIST: 'navbar_music_playlist',
  CURRENT_INDEX: 'navbar_music_current_index',
  IS_PLAYING: 'navbar_music_is_playing',
  CURRENT_TIME: 'navbar_music_current_time',
};

// 全局audio元素（单例）
let globalAudio: HTMLAudioElement | null = null;

function getGlobalAudio(): HTMLAudioElement | null {
  // 只在浏览器环境创建 Audio
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!globalAudio) {
    globalAudio = new Audio();
    globalAudio.preload = 'auto';
  }
  return globalAudio;
}

export default function NavbarMusicPlayer(): JSX.Element {
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(getGlobalAudio());

  // 从localStorage恢复状态
  useEffect(() => {
    // 服务端渲染时直接返回
    if (typeof window === 'undefined' || !audioRef.current) {
      return;
    }
    
    const audio = audioRef.current;
    const savedPlaylist = localStorage.getItem(STORAGE_KEYS.PLAYLIST);
    const savedIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_INDEX);
    const savedIsPlaying = localStorage.getItem(STORAGE_KEYS.IS_PLAYING);
    const savedTime = localStorage.getItem(STORAGE_KEYS.CURRENT_TIME);

    if (savedPlaylist) {
      try {
        const parsedPlaylist = JSON.parse(savedPlaylist);
        setPlaylist(parsedPlaylist);
        const index = parseInt(savedIndex || '0');
        setCurrentIndex(index);
        
        // 恢复音频源和播放进度
        const track = parsedPlaylist[index];
        if (track && audio.src !== track.src) {
          audio.src = track.src;
          if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
          }
        }
        
        // 恢复播放状态（页面切换时继续播放）
        const wasPlaying = savedIsPlaying === 'true';
        if (wasPlaying && !audio.paused) {
          // 如果audio已经在播放，只更新状态
          setIsPlaying(true);
        } else if (wasPlaying) {
          // 尝试继续播放
          audio.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch(err => {
              console.warn('继续播放失败（可能是刷新页面导致）:', err);
              // 刷新页面后浏览器阻止自动播放，设置为暂停状态
              setIsPlaying(false);
            });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('恢复播放状态失败:', error);
        loadPlaylist();
      }
    } else {
      loadPlaylist();
    }
  }, []);

  // 加载歌单
  const loadPlaylist = async () => {
    try {
      setIsLoading(true);
      const songs = await getPlaylistSongs(MY_PLAYLIST_ID, 20);
      
      if (songs.length > 0) {
        setPlaylist(songs);
        localStorage.setItem(STORAGE_KEYS.PLAYLIST, JSON.stringify(songs));
        
        // 默认播放第一首
        const defaultIndex = 0;
        setCurrentIndex(defaultIndex);
        localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, defaultIndex.toString());
        
        // 设置音频源并自动播放
        audioRef.current.src = songs[defaultIndex].src;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'true');
          })
          .catch(err => {
            console.warn('自动播放失败:', err);
          });
      }
    } catch (error) {
      console.error('加载歌单失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 更新进度和歌词
  useEffect(() => {
    // 服务端渲染时直接返回
    if (typeof window === 'undefined' || !audioRef.current) {
      return;
    }
    
    const audio = audioRef.current;

    const updateProgress = () => {
      const current = audio.currentTime;
      const total = audio.duration;

      if (total) {
        setProgress((current / total) * 100);
        localStorage.setItem(STORAGE_KEYS.CURRENT_TIME, current.toString());

        // 更新歌词
        const currentTrack = playlist[currentIndex];
        if (currentTrack?.lyrics && currentTrack.lyrics.length > 0) {
          const index = currentTrack.lyrics.findIndex((lyric, i) => {
            const nextLyric = currentTrack.lyrics[i + 1];
            return current >= lyric.time && (!nextLyric || current < nextLyric.time);
          });
          setCurrentLyricIndex(index);
        }
      }
    };

    const handleEnded = () => {
      playNext();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'true');
    };

    const handlePause = () => {
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'false');
    };

    const handleError = (e: Event) => {
      const audioElement = e.target as HTMLAudioElement;
      const error = audioElement.error;
      
      if (error) {
        console.warn(`播放失败: ${playlist[currentIndex]?.name}`);
      }
      
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'false');
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [currentIndex, playlist]);

  // 切换歌曲
  const changeSong = (newIndex: number) => {
    if (!audioRef.current || !playlist[newIndex]) {
      return;
    }
    
    if (playlist[newIndex]) {
      setCurrentIndex(newIndex);
      setCurrentLyricIndex(-1);
      setProgress(0);
      localStorage.setItem(STORAGE_KEYS.CURRENT_INDEX, newIndex.toString());
      localStorage.setItem(STORAGE_KEYS.CURRENT_TIME, '0');
      
      const audio = audioRef.current;
      audio.src = playlist[newIndex].src;
      audio.currentTime = 0;
      
      if (isPlaying) {
        audio.play().catch(err => {
          console.error('播放失败:', err);
        });
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      return;
    }
    
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play().catch(err => {
        console.error('播放失败:', err);
      });
    } else {
      audio.pause();
    }
  };

  const playPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    changeSong(newIndex);
  };

  const playNext = () => {
    const newIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
    changeSong(newIndex);
  };

  if (isLoading || playlist.length === 0 || typeof window === 'undefined') {
    return null;
  }

  const currentTrack = playlist[currentIndex];
  const currentLyric = currentLyricIndex >= 0 && currentTrack?.lyrics?.[currentLyricIndex]?.text || '♪';

  return (
    <div className={styles.musicPlayer}>
      {/* 上一曲 */}
      <button
        className={styles.controlButton}
        onClick={playPrevious}
        title="上一曲"
      >
        <span className="material-symbols-outlined">skip_previous</span>
      </button>

      {/* 圆形海报 - 点击暂停/播放 */}
      <button
        className={styles.coverButton}
        onClick={togglePlay}
        title={isPlaying ? '暂停' : '播放'}
      >
        <img src={currentTrack.cover} alt={currentTrack.name} className={`${styles.cover} ${isPlaying ? styles.rotating : ''}`} />
        {isPlaying && <div className={styles.playingIndicator}></div>}
        <div className={styles.playOverlay}>
          <span className="material-symbols-outlined">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </div>
      </button>

      {/* 下一曲 */}
      <button
        className={styles.controlButton}
        onClick={playNext}
        title="下一曲"
      >
        <span className="material-symbols-outlined">skip_next</span>
      </button>

      {/* 歌词滚动显示 */}
      <div className={styles.lyricsDisplay}>
        <div className={styles.lyricText} key={currentLyricIndex}>{currentLyric}</div>
      </div>
    </div>
  );
}
