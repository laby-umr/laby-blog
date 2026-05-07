/**
 * Controls - 播放器控制栏
 * 包含进度条、播放控制、音量、倍速、设置等所有控制功能
 */
import React from 'react';
import './styles.css';

interface ControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  progressPercent: number;
  settings: any;
  episodes?: any[];
  currentEpisode?: number;
  ccSettings: any;
  ccSubtitles: any[];
  assSettings: any;
  assSubtitles: any[];
  onTogglePlay: () => void;
  onSeek: (percent: number) => void;
  onSetVolume: (volume: number) => void;
  onToggleMute: () => void;
  onSetSpeed: (speed: number) => void;
  onToggleFullscreen: () => void;
  onToggleWebFullscreen: () => void;
  onTogglePip: () => void;
  onTakeScreenshot: () => void;
  onUpdateSettings: (settings: any) => void;
  onResetSettings: () => void;
  onUpdateCCSettings: (settings: any) => void;
  onResetCCSettings: () => void;
  onUpdateASSSettings: (settings: any) => void;
  onResetASSSettings: () => void;
  onSelectEpisode?: (episode: any) => void;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];

export default function Controls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  isFullscreen,
  progressPercent,
  settings,
  episodes = [],
  currentEpisode = 1,
  ccSettings,
  ccSubtitles,
  assSettings,
  assSubtitles,
  onTogglePlay,
  onSeek,
  onSetVolume,
  onToggleMute,
  onSetSpeed,
  onToggleFullscreen,
  onToggleWebFullscreen,
  onTogglePip,
  onTakeScreenshot,
  onUpdateSettings,
  onResetSettings,
  onUpdateCCSettings,
  onResetCCSettings,
  onUpdateASSSettings,
  onResetASSSettings,
  onSelectEpisode,
}: ControlsProps) {
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent);
  };

  return (
    <div className="controls" onClick={(e) => e.stopPropagation()}>
      {/* 进度条 */}
      <div className="progress-wrap" onClick={handleProgressClick}>
        <div className="progress-bar">
          <div className="progress-buffered"></div>
          <div className="progress-played" style={{ width: `${progressPercent}%` }}></div>
          <div className="progress-handle" style={{ left: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* 控制按钮行 */}
      <div className="controls-row">
        {/* 左侧 */}
        <div className="controls-left">
          {/* 播放/暂停 */}
          <button className="ctrl-btn" onClick={onTogglePlay}>
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          {/* 时间 */}
          <span className="time-text">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* 右侧 */}
        <div className="controls-right">
          {/* 选集 */}
          {episodes.length > 0 && (
            <div className="ctrl-item has-panel">
              <button className="ctrl-text-btn">选集</button>
              <div className="panel-wrapper">
                <div className="panel episode-panel">
                  <div className="panel-title">选择集数</div>
                  <div className="episode-list">
                    {episodes.map((ep) => (
                      <div
                        key={ep.id}
                        className={`episode-item ${ep.id === currentEpisode ? 'active' : ''}`}
                        onClick={() => onSelectEpisode?.(ep)}
                      >
                        第{ep.id}集
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 倍速 */}
          <div className="ctrl-item has-panel">
            <button className="ctrl-text-btn">倍速</button>
            <div className="panel-wrapper">
              <div className="panel speed-panel">
                {SPEED_OPTIONS.map((speed) => (
                  <div
                    key={speed}
                    className={`speed-item ${speed === playbackRate ? 'active' : ''}`}
                    onClick={() => onSetSpeed(speed)}
                  >
                    {speed === 1.0 ? '正常' : `${speed}x`}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 音量 */}
          <div className="ctrl-item has-panel volume-ctrl">
            <button className="ctrl-icon-btn" onClick={onToggleMute}>
              <span className="material-symbols-outlined">
                {isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
              </span>
            </button>
            <div className="panel-wrapper volume-panel-wrapper">
              <div className="volume-panel">
                <span className="volume-value">{Math.round(volume * 100)}</span>
                <div className="volume-slider-vertical">
                  <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onSetVolume(parseFloat(e.target.value))}
                  />
                  <div className="volume-track">
                    <div className="volume-fill" style={{ height: `${volume * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 设置 */}
          <div className="ctrl-item has-panel">
            <button className="ctrl-icon-btn">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="panel-wrapper">
              <div className="panel settings-panel">
                <div className="panel-title">播放设置</div>

                {/* 画面比例 */}
                <div className="setting-item">
                  <span className="setting-label">画面比例</span>
                  <select
                    value={settings.aspectRatio || 'auto'}
                    onChange={(e) => onUpdateSettings({ aspectRatio: e.target.value })}
                  >
                    <option value="auto">自动</option>
                    <option value="4:3">4:3</option>
                    <option value="16:9">16:9</option>
                  </select>
                </div>

                {/* 循环播放 */}
                <div className="setting-item">
                  <label className="setting-checkbox">
                    <input
                      type="checkbox"
                      checked={settings.loop || false}
                      onChange={(e) => onUpdateSettings({ loop: e.target.checked })}
                    />
                    <span>洗脑循环</span>
                  </label>
                </div>

                {/* 自动播放 */}
                <div className="setting-item">
                  <label className="setting-checkbox">
                    <input
                      type="checkbox"
                      checked={settings.autoPlay !== false}
                      onChange={(e) => onUpdateSettings({ autoPlay: e.target.checked })}
                    />
                    <span>自动播放</span>
                  </label>
                </div>

                {/* 迷你进度 */}
                <div className="setting-item">
                  <label className="setting-checkbox">
                    <input
                      type="checkbox"
                      checked={settings.miniProgress !== false}
                      onChange={(e) => onUpdateSettings({ miniProgress: e.target.checked })}
                    />
                    <span>迷你进度</span>
                  </label>
                </div>

                {/* 镜像翻转 */}
                <div className="setting-item">
                  <label className="setting-checkbox">
                    <input
                      type="checkbox"
                      checked={settings.mirror || false}
                      onChange={(e) => onUpdateSettings({ mirror: e.target.checked })}
                    />
                    <span>镜像翻转</span>
                  </label>
                </div>

                {/* 恢复默认 */}
                <div className="setting-item">
                  <button className="reset-btn" onClick={onResetSettings}>
                    恢复默认设置
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CC字幕 */}
          <div className="ctrl-item has-panel">
            <button className="ctrl-icon-btn has-tooltip">
              <span className="material-symbols-outlined">closed_caption</span>
              <span className="tooltip">CC字幕</span>
            </button>
            <div className="panel-wrapper">
              <div className="panel cc-subtitle-panel">
                <div className="panel-title">CC字幕</div>

                {/* 字幕选择 */}
                <div className="subtitle-section">
                  <div className="subtitle-label">字幕文件</div>
                  <select
                    value={ccSettings.enabled}
                    onChange={(e) => onUpdateCCSettings({ enabled: e.target.value })}
                    className="subtitle-select"
                  >
                    {ccSubtitles.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 字体大小 & 颜色 */}
                <div className="subtitle-row">
                  <div className="subtitle-col">
                    <div className="subtitle-label">字体大小</div>
                    <select
                      value={ccSettings.fontSize}
                      onChange={(e) => onUpdateCCSettings({ fontSize: e.target.value })}
                      className="subtitle-select"
                    >
                      <option value="极小">极小</option>
                      <option value="小">小</option>
                      <option value="适中">适中</option>
                      <option value="大">大</option>
                      <option value="极大">极大</option>
                    </select>
                  </div>
                  <div className="subtitle-col">
                    <div className="subtitle-label">字幕颜色</div>
                    <select
                      value={ccSettings.fontColor}
                      onChange={(e) => onUpdateCCSettings({ fontColor: e.target.value })}
                      className="subtitle-select"
                    >
                      <option value="white">白色</option>
                      <option value="yellow">黄色</option>
                      <option value="green">绿色</option>
                      <option value="cyan">青色</option>
                      <option value="blue">蓝色</option>
                      <option value="magenta">紫色</option>
                      <option value="red">红色</option>
                    </select>
                  </div>
                </div>

                {/* 描边 & 位置 */}
                <div className="subtitle-row">
                  <div className="subtitle-col">
                    <div className="subtitle-label">描边方式</div>
                    <select
                      value={ccSettings.strokeStyle}
                      onChange={(e) => onUpdateCCSettings({ strokeStyle: e.target.value })}
                      className="subtitle-select"
                    >
                      <option value="无描边">无描边</option>
                      <option value="描边">描边</option>
                      <option value="重墨描边">重墨描边</option>
                      <option value="45°投影">45°投影</option>
                    </select>
                  </div>
                  <div className="subtitle-col">
                    <div className="subtitle-label">默认位置</div>
                    <select
                      value={ccSettings.position}
                      onChange={(e) => onUpdateCCSettings({ position: e.target.value })}
                      className="subtitle-select"
                    >
                      <option value="顶部居中">顶部居中</option>
                      <option value="底部居中">底部居中</option>
                      <option value="顶部左侧">顶部左侧</option>
                      <option value="底部左侧">底部左侧</option>
                    </select>
                  </div>
                </div>

                {/* 背景不透明度 */}
                <div className="subtitle-section">
                  <div className="subtitle-label">背景不透明度</div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={ccSettings.bgOpacity}
                    onChange={(e) => onUpdateCCSettings({ bgOpacity: parseFloat(e.target.value) })}
                    className="subtitle-slider"
                  />
                </div>

                {/* 恢复默认 */}
                <button className="subtitle-reset-btn" onClick={onResetCCSettings}>
                  恢复默认设置
                </button>
              </div>
            </div>
          </div>

          {/* ASS字幕 */}
          <div className="ctrl-item has-panel">
            <button className="ctrl-icon-btn has-tooltip">
              <span className="material-symbols-outlined">subtitles</span>
              <span className="tooltip">ASS字幕</span>
            </button>
            <div className="panel-wrapper">
              <div className="panel ass-subtitle-panel">
                <div className="panel-title">ASS字幕</div>

                {/* 字幕选择 */}
                <div className="subtitle-section">
                  <div className="subtitle-label">字幕文件</div>
                  <select
                    value={assSettings.enabled}
                    onChange={(e) => onUpdateASSSettings({ enabled: e.target.value })}
                    className="subtitle-select"
                  >
                    {assSubtitles.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 当前字幕字体 */}
                <div className="subtitle-section">
                  <div className="subtitle-label">当前字幕字体</div>
                  <input
                    type="text"
                    value={assSettings.currentFont}
                    onChange={(e) => onUpdateASSSettings({ currentFont: e.target.value })}
                    className="subtitle-input"
                    placeholder="留空使用字幕文件字体"
                  />
                </div>

                {/* 其他设置 */}
                <div className="subtitle-section">
                  <div className="subtitle-label">其他设置</div>
                  <label className="subtitle-checkbox">
                    <input
                      type="checkbox"
                      checked={assSettings.forceCC}
                      onChange={(e) => onUpdateASSSettings({ forceCC: e.target.checked })}
                    />
                    <span>强制转为 CC 字幕</span>
                  </label>
                  <label className="subtitle-checkbox">
                    <input
                      type="checkbox"
                      checked={assSettings.useDefaultFont}
                      onChange={(e) => onUpdateASSSettings({ useDefaultFont: e.target.checked })}
                    />
                    <span>仅使用默认字体</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 截图 */}
          <div className="ctrl-item">
            <button className="ctrl-icon-btn has-tooltip" onClick={onTakeScreenshot}>
              <span className="material-symbols-outlined">photo_camera</span>
              <span className="tooltip">截图</span>
            </button>
          </div>

          {/* 画中画 */}
          <div className="ctrl-item">
            <button className="ctrl-icon-btn has-tooltip" onClick={onTogglePip}>
              <span className="material-symbols-outlined">picture_in_picture_alt</span>
              <span className="tooltip">画中画</span>
            </button>
          </div>

          {/* 网页全屏 */}
          <div className="ctrl-item">
            <button className="ctrl-icon-btn has-tooltip" onClick={onToggleWebFullscreen}>
              <span className="material-symbols-outlined">fit_screen</span>
              <span className="tooltip">网页全屏</span>
            </button>
          </div>

          {/* 全屏 */}
          <div className="ctrl-item">
            <button className="ctrl-icon-btn has-tooltip" onClick={onToggleFullscreen}>
              <span className="material-symbols-outlined">
                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
              <span className="tooltip">{isFullscreen ? '退出全屏' : '进入全屏'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
