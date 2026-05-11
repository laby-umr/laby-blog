import React, { useState, useEffect, useRef } from 'react';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [isStruggling, setIsStruggling] = useState(false);
  const [isBurstMode, setIsBurstMode] = useState(false);
  const [statusText, setStatusText] = useState('初始化中...');
  const [techniqueLabel, setTechniqueLabel] = useState('呼吸法：待机状态');
  const [instructionText, setInstructionText] = useState('同步中...');
  const [btnLabel, setBtnLabel] = useState('点击进入');
  const [glitchActive, setGlitchActive] = useState(false);
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [canvasShake, setCanvasShake] = useState(false);
  
  const clicksDone = useRef(0);
  const clicksToWin = 3; // 改为3次点击
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Phase 1: Auto-load to 97%
  useEffect(() => {
    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = 1 - Math.pow(1 - t, 3); // Cubic ease out
      
      const currentProgress = easedT * 97;
      setProgress(currentProgress);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        startStrugglePhase();
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Phase 2: Struggle at 97%
  const startStrugglePhase = () => {
    setIsStruggling(true);
    setStatusText('专注巅峰');
    setTechniqueLabel('呼吸法：全集中');
    
    // 直接修改进度条样式（模拟原 HTML 的做法）
    if (progressBarRef.current) {
      progressBarRef.current.style.backgroundColor = '#c60159';
    }
    
    setTimeout(() => {
      setIsBurstMode(true);
      setInstructionText('点击或按空格键继续');
      setBtnLabel('点击进入');
    }, 500);
  };

  // Handle mash/click
  const handleMash = () => {
    if (!isBurstMode) return;
    
    clicksDone.current++;

    // 每次点击增加1%进度（从97%到100%）
    const newProgress = Math.min(97 + clicksDone.current, 100);
    setProgress(newProgress);

    // Trigger effects
    triggerHitFX();

    if (clicksDone.current >= clicksToWin) {
      completeSequence();
    }
  };

  // Visual effects on click
  const triggerHitFX = () => {
    // Screen shake
    setCanvasShake(true);
    setTimeout(() => setCanvasShake(false), 50);

    // Glitch effect
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 150);

    // Shockwave
    setShockwaveActive(true);
    setTimeout(() => setShockwaveActive(false), 400);
  };

  // Complete and transition
  const completeSequence = () => {
    setIsBurstMode(false);
    setStatusText('领域解放');
    
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isBurstMode) {
        e.preventDefault();
        handleMash();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBurstMode]);

  return (
    <div className={styles.loadingScreen}>
      {/* SVG Filters */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="fire-filter">
          <feTurbulence baseFrequency="0.05" numOctaves="3" seed="1" type="fractalNoise">
            <animate attributeName="seed" dur="0.5s" repeatCount="indefinite" values="1;100" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="15" />
        </filter>
      </svg>

      {/* Shockwave Effect */}
      <div className={`${styles.shockwave} ${shockwaveActive ? styles.shockwaveActive : ''}`} />

      {/* Background Grid */}
      <div className={styles.bgLayer}>
        <div className={styles.kineticGrid} />
        <div className={styles.bgGradient} />
        
        {/* 杂志风格装饰元素 */}
        <div className={styles.magazineDecor}>
          {/* 漂浮的几何图形 */}
          <div className={`${styles.floatingShape} ${styles.shape1}`} />
          <div className={`${styles.floatingShape} ${styles.shape2}`} />
          <div className={`${styles.floatingShape} ${styles.shape3}`} />
          <div className={`${styles.floatingShape} ${styles.shape4}`} />
          
          {/* 代码片段装饰 */}
          <div className={`${styles.codeSnippet} ${styles.snippet1}`}>
            <span>{'{ code: "斩妖" }'}</span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet2}`}>
            <span>{'console.log("LABY")'}</span>
          </div>
          <div className={`${styles.codeSnippet} ${styles.snippet3}`}>
            <span>{'// 全栈开发'}</span>
          </div>
          
          {/* 装饰线条 */}
          <div className={`${styles.decorLine} ${styles.line1}`} />
          <div className={`${styles.decorLine} ${styles.line2}`} />
          <div className={`${styles.decorLine} ${styles.line3}`} />
          
          {/* 圆点装饰 */}
          <div className={`${styles.decorDot} ${styles.dot1}`} />
          <div className={`${styles.decorDot} ${styles.dot2}`} />
          <div className={`${styles.decorDot} ${styles.dot3}`} />
          <div className={`${styles.decorDot} ${styles.dot4}`} />
        </div>
      </div>

      <main className={`${styles.canvas} ${canvasShake ? styles.canvasShake : ''}`}>
        {/* Top Status Bar */}
        <div className={styles.topStatus}>
          <div className={styles.statusLeft}>
            <span className={styles.statusLabel}>核心状态</span>
            <span className={`${styles.statusValue} ${isStruggling ? styles.statusDanger : ''}`}>
              {statusText}
            </span>
          </div>
          <div className={styles.statusDivider} />
          <div className={styles.statusRight}>
            <span className={styles.statusLabel}>用户等级</span>
            <span className={styles.statusValue}>HASHIRA_DEV_L7</span>
          </div>
        </div>

        {/* Center Content */}
        <div className={styles.centerpiece}>
          {/* Branding */}
          <div className={styles.branding}>
            <h1 className={styles.brandTitle}>
              LABY <span className={`${styles.brandAccent} ${glitchActive ? styles.glitchActive : ''}`} data-text="博客">博客</span>
            </h1>
            <div className={styles.brandSubtitle}>
              <span className={styles.brandLine} />
              <p className={styles.brandTagline}>代码斩妖师</p>
              <span className={styles.brandLine} />
            </div>
          </div>

          {/* Progress Section */}
          <div className={styles.progressContainer}>
            <div className={styles.progressHeader}>
              <div className={styles.progressLeft}>
                <span className={styles.progressTitle}>全神贯注</span>
                <span className={styles.progressTechnique}>{techniqueLabel}</span>
              </div>
              <div className={styles.progressRight}>
                <span className={styles.progressPercent}>{Math.floor(progress)}%</span>
              </div>
            </div>

            {/* 完全按照参考 HTML 的结构 */}
            <div className={styles.progressBarWrapper}>
              <div 
                ref={progressBarRef}
                className={`${styles.progressBar} ${isStruggling ? styles.progressStruggle : ''}`}
                style={{ width: `${progress}%` }}
              >
                <div className={styles.progressShimmer} />
              </div>
              <div className={`${styles.struggleGlow} ${isStruggling ? styles.struggleGlowActive : ''}`} />
            </div>

            <div className={styles.progressFooter}>
              <span>数据流：已连接</span>
              <span>缓冲区：已稳定</span>
              <span>神经：就绪</span>
            </div>
          </div>

          {/* CTA & Awakening */}
          <div className={styles.ctaSection}>
            {/* Button */}
            {isBurstMode && (
              <div className={styles.btnWrapper}>
                <button 
                  className={`${styles.mashButton} ${isStruggling ? styles.mashButtonDanger : ''}`}
                  onClick={handleMash}
                >
                  <span className={styles.btnLabel}>{btnLabel}</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>swords</span>
                </button>
              </div>
            )}

            <p className={`${styles.instructionText} ${isBurstMode ? styles.instructionVisible : ''}`}>
              点击<span className={styles.keyHighlight}>按钮</span>或按<span className={styles.keyHighlight}>空格</span>键继续
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <span>版本: 2024.LABY_DEV</span>
            <span className={styles.footerDivider} />
            <span>编码: NEOTOKYO_CEL</span>
          </div>
        </div>
      </main>

      {/* Noise Overlay */}
      <div className={styles.noiseOverlay} />
    </div>
  );
}
