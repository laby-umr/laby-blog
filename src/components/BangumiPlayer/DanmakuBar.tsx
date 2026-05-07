/**
 * Danmaku Bar - 弹幕发送栏
 * 完全1:1复刻 laby-player 的弹幕发送栏
 * 包含：弹幕发送、样式设置、弹幕配置面板
 */
import React, { useState, useRef, useEffect } from 'react';

interface DanmakuBarProps {
  watchingCount: number;
  danmakuCount: number;
  danmakuEnabled: boolean;
  danmakuConfig?: any;
  onSend: (danmaku: any) => void;
  onToggle: (enabled: boolean) => void;
  onConfigUpdate?: (config: any) => void;
}

// 预设颜色
const PRESET_COLORS = [
  '#FE0302',
  '#FF7204',
  '#FFAA02',
  '#FFD302',
  '#FFFF00',
  '#A0EE00',
  '#00CD00',
  '#019899',
  '#4266BE',
  '#89D5FF',
  '#CC0273',
  '#222222',
  '#9B9B9B',
  '#FFFFFF',
];

export default function DanmakuBar({
  watchingCount,
  danmakuCount,
  danmakuEnabled,
  danmakuConfig = {},
  onSend,
  onToggle,
  onConfigUpdate,
}: DanmakuBarProps): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [danmakuStyle, setDanmakuStyle] = useState({
    size: 'standard',
    mode: 'scroll',
    color: '#FFFFFF',
    gradient: false,
    gradientAngle: 90,
    gradientColors: ['#F2509E', '#3180D4'],
  });

  const handleSend = () => {
    if (inputValue.trim()) {
      const sizeMap: Record<string, string> = { small: '小', standard: '标准' };
      const sendData = {
        text: inputValue.trim(),
        color: danmakuStyle.color,
        mode: danmakuStyle.mode,
        size: sizeMap[danmakuStyle.size] || '标准',
        gradient: danmakuStyle.gradient,
        gradientAngle: danmakuStyle.gradientAngle,
        gradientColors: [...danmakuStyle.gradientColors],
      };
      onSend(sendData);
      setInputValue('');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleColorClick = (color: string) => {
    if (danmakuStyle.gradient) {
      const colors = [...danmakuStyle.gradientColors];
      const idx = colors.indexOf(color);
      if (idx >= 0) {
        colors.splice(idx, 1);
      } else {
        colors.push(color);
      }
      setDanmakuStyle({ ...danmakuStyle, gradientColors: colors });
    } else {
      setDanmakuStyle({ ...danmakuStyle, color });
    }
  };

  const isColorActive = (color: string) => {
    if (danmakuStyle.gradient) {
      return danmakuStyle.gradientColors.includes(color);
    }
    return danmakuStyle.color === color;
  };

  const getMainColorStyle = () => {
    if (danmakuStyle.gradient && danmakuStyle.gradientColors.length >= 2) {
      const colors = danmakuStyle.gradientColors;
      const angle = danmakuStyle.gradientAngle;
      return {
        background: `linear-gradient(${angle}deg, ${colors.join(', ')})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }
    return {
      color: danmakuStyle.color,
    };
  };

  return (
    <div className="danmaku-bar">
      <div className="main-row">
        {/* 统计文字 */}
        <span className="stat-text">
          {watchingCount} 人正在看，已装填 {danmakuCount} 条弹幕
        </span>

        {/* 弹幕开关 */}
        <div className="icon-wrapper">
          <button
            className={`icon-btn danmaku-toggle ${danmakuEnabled ? 'active' : ''}`}
            onClick={() => onToggle(!danmakuEnabled)}
            title="弹幕开关"
          >
            <span className="material-symbols-outlined">
              {danmakuEnabled ? 'subtitles' : 'subtitles_off'}
            </span>
          </button>
        </div>

        {/* 弹幕设置 */}
        {onConfigUpdate && (
          <div className="icon-wrapper has-panel">
            <button className="icon-btn" title="弹幕设置">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="panel-wrapper settings-panel-wrapper">
              <div className="panel-content danmaku-settings">
                {/* 按类型屏蔽 */}
                <div className="section">
                  <div className="section-label">按类型屏蔽</div>
                  <div className="type-grid">
                    <a
                      className={`type-btn ${danmakuConfig.showScroll ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ showScroll: !danmakuConfig.showScroll })}
                    >
                      <span className="material-symbols-outlined">view_headline</span>
                      <span>滚动</span>
                    </a>
                    <a
                      className={`type-btn ${danmakuConfig.showTop ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ showTop: !danmakuConfig.showTop })}
                    >
                      <span className="material-symbols-outlined">vertical_align_top</span>
                      <span>顶部</span>
                    </a>
                    <a
                      className={`type-btn ${danmakuConfig.showBottom ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ showBottom: !danmakuConfig.showBottom })}
                    >
                      <span className="material-symbols-outlined">vertical_align_bottom</span>
                      <span>底部</span>
                    </a>
                    <a
                      className={`type-btn ${danmakuConfig.showColor ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ showColor: !danmakuConfig.showColor })}
                    >
                      <span className="material-symbols-outlined">palette</span>
                      <span>彩色</span>
                    </a>
                  </div>
                </div>

                {/* 弹幕字体 */}
                <div className="section">
                  <div className="section-label">弹幕字体</div>
                  <div className="font-row">
                    <select
                      value={danmakuConfig.fontFamily || '微软雅黑'}
                      onChange={(e) => onConfigUpdate({ fontFamily: e.target.value })}
                    >
                      <option value="黑体">黑体</option>
                      <option value="宋体">宋体</option>
                      <option value="微软雅黑">微软雅黑</option>
                    </select>
                    <label
                      className="checkbox-label"
                      onClick={() => onConfigUpdate({ bold: !danmakuConfig.bold })}
                    >
                      <span className={`checkbox-box ${danmakuConfig.bold ? 'checked' : ''}`}></span>
                      <span>粗体</span>
                    </label>
                  </div>
                </div>

                {/* 描边类型 */}
                <div className="section">
                  <div className="section-label">描边类型</div>
                  <div className="stroke-row">
                    <a
                      className={`stroke-btn ${danmakuConfig.strokeType === '重墨' ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ strokeType: '重墨' })}
                    >
                      重墨
                    </a>
                    <a
                      className={`stroke-btn ${danmakuConfig.strokeType === '描边' ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ strokeType: '描边' })}
                    >
                      描边
                    </a>
                    <a
                      className={`stroke-btn ${danmakuConfig.strokeType === '45°投影' ? 'active' : ''}`}
                      onClick={() => onConfigUpdate({ strokeType: '45°投影' })}
                    >
                      45°投影
                    </a>
                  </div>
                </div>

                {/* 不透明度 */}
                <div className="section slider-section">
                  <div className="slider-row">
                    <span className="slider-label">不透明度</span>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={danmakuConfig.opacity || 0.8}
                        style={{
                          background: `linear-gradient(to right, #ff7a5e 0%, #ff7a5e ${(danmakuConfig.opacity || 0.8) * 100}%, rgba(255,255,255,0.2) ${(danmakuConfig.opacity || 0.8) * 100}%)`,
                        }}
                        onChange={(e) =>
                          onConfigUpdate({ opacity: parseFloat(e.target.value) })
                        }
                      />
                    </div>
                    <span className="slider-value">
                      {Math.round((danmakuConfig.opacity || 0.8) * 100)}%
                    </span>
                  </div>
                </div>

                {/* 显示区域 */}
                <div className="section slider-section">
                  <div className="slider-row">
                    <span className="slider-label">显示区域</span>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="0.25"
                        max="1"
                        step="0.25"
                        value={danmakuConfig.area || 1}
                        style={{
                          background: `linear-gradient(to right, #ff7a5e 0%, #ff7a5e ${((danmakuConfig.area || 1) - 0.25) / 0.75 * 100}%, rgba(255,255,255,0.2) ${((danmakuConfig.area || 1) - 0.25) / 0.75 * 100}%)`,
                        }}
                        onChange={(e) => onConfigUpdate({ area: parseFloat(e.target.value) })}
                      />
                    </div>
                    <span className="slider-value">
                      {danmakuConfig.area >= 1
                        ? '满屏'
                        : danmakuConfig.area >= 0.75
                          ? '3/4屏'
                          : danmakuConfig.area >= 0.5
                            ? '半屏'
                            : '1/4屏'}
                    </span>
                  </div>
                </div>

                {/* 弹幕字号 */}
                <div className="section slider-section">
                  <div className="slider-row">
                    <span className="slider-label">弹幕字号</span>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="50"
                        max="150"
                        step="10"
                        value={danmakuConfig.fontSizePercent || 100}
                        style={{
                          background: `linear-gradient(to right, #ff7a5e 0%, #ff7a5e ${((danmakuConfig.fontSizePercent || 100) - 50) / 100 * 100}%, rgba(255,255,255,0.2) ${((danmakuConfig.fontSizePercent || 100) - 50) / 100 * 100}%)`,
                        }}
                        onChange={(e) =>
                          onConfigUpdate({ fontSizePercent: parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <span className="slider-value">{danmakuConfig.fontSizePercent || 100}%</span>
                  </div>
                </div>

                {/* 弹幕速度 */}
                <div className="section slider-section">
                  <div className="slider-row">
                    <span className="slider-label">弹幕速度</span>
                    <div className="slider-container">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={danmakuConfig.speed || 5}
                        style={{
                          background: `linear-gradient(to right, #ff7a5e 0%, #ff7a5e ${((danmakuConfig.speed || 5) - 1) / 9 * 100}%, rgba(255,255,255,0.2) ${((danmakuConfig.speed || 5) - 1) / 9 * 100}%)`,
                        }}
                        onChange={(e) => onConfigUpdate({ speed: parseInt(e.target.value) })}
                      />
                    </div>
                    <span className="slider-value">
                      {danmakuConfig.speed <= 3
                        ? '慢'
                        : danmakuConfig.speed >= 8
                          ? '快'
                          : '适中'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 样式按钮 */}
        <div className="icon-wrapper has-panel">
          <button className="icon-btn" title="弹幕样式">
            <span className="material-symbols-outlined">palette</span>
          </button>
          <div className="panel-wrapper style-panel-wrapper">
            <div className="panel-content style-panel">
              {/* 字号 */}
              <div className="panel-section">
                <div className="panel-label">字号</div>
                <div className="size-btns">
                  <a
                    className={danmakuStyle.size === 'small' ? 'active' : ''}
                    onClick={() => setDanmakuStyle({ ...danmakuStyle, size: 'small' })}
                  >
                    小
                  </a>
                  <a
                    className={danmakuStyle.size === 'standard' ? 'active' : ''}
                    onClick={() => setDanmakuStyle({ ...danmakuStyle, size: 'standard' })}
                  >
                    标准
                  </a>
                </div>
              </div>

              {/* 模式 */}
              <div className="panel-section">
                <div className="panel-label">模式</div>
                <div className="mode-btns">
                  <a
                    className={danmakuStyle.mode === 'scroll' ? 'active' : ''}
                    onClick={() => setDanmakuStyle({ ...danmakuStyle, mode: 'scroll' })}
                  >
                    <span className="material-symbols-outlined">arrow_forward</span>
                    <span>滚动</span>
                  </a>
                  <a
                    className={danmakuStyle.mode === 'top' ? 'active' : ''}
                    onClick={() => setDanmakuStyle({ ...danmakuStyle, mode: 'top' })}
                  >
                    <span className="material-symbols-outlined">arrow_upward</span>
                    <span>顶部</span>
                  </a>
                  <a
                    className={danmakuStyle.mode === 'bottom' ? 'active' : ''}
                    onClick={() => setDanmakuStyle({ ...danmakuStyle, mode: 'bottom' })}
                  >
                    <span className="material-symbols-outlined">arrow_downward</span>
                    <span>底部</span>
                  </a>
                </div>
              </div>

              {/* 颜色 */}
              <div className="panel-section">
                <div className="panel-label">颜色</div>
                <div className="color-row">
                  <span className="color-preview-text" style={getMainColorStyle()}>
                    {danmakuStyle.color}
                  </span>
                  <label className="gradient-check">
                    <input
                      type="checkbox"
                      checked={danmakuStyle.gradient}
                      onChange={(e) =>
                        setDanmakuStyle({ ...danmakuStyle, gradient: e.target.checked })
                      }
                    />
                    <span>渐变边框</span>
                  </label>
                </div>

                {/* 渐变设置 */}
                {danmakuStyle.gradient && (
                  <div className="gradient-row">
                    <input
                      type="number"
                      className="angle-input"
                      value={danmakuStyle.gradientAngle}
                      min="0"
                      max="360"
                      onChange={(e) =>
                        setDanmakuStyle({
                          ...danmakuStyle,
                          gradientAngle: parseInt(e.target.value),
                        })
                      }
                    />
                    <input
                      type="text"
                      className="gradient-colors-input"
                      value={danmakuStyle.gradientColors.join(',')}
                      onChange={(e) => {
                        const colors = e.target.value
                          .split(',')
                          .map((c) => c.trim())
                          .filter((c) => c && c.startsWith('#'));
                        setDanmakuStyle({ ...danmakuStyle, gradientColors: colors });
                      }}
                      placeholder="#F2509E,#3180D4"
                    />
                  </div>
                )}

                <div className="color-grid">
                  {PRESET_COLORS.map((color) => (
                    <a
                      key={color}
                      className={`color-item ${isColorActive(color) ? 'active' : ''}`}
                      onClick={() => handleColorClick(color)}
                    >
                      <em style={{ background: color }}></em>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 输入框 */}
        <input
          type="text"
          className="danmaku-input"
          placeholder="发个友善的弹幕见证当下"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
        />

        {/* 发送按钮 */}
        <button className="send-btn" onClick={handleSend}>
          发送
        </button>
      </div>
    </div>
  );
}
