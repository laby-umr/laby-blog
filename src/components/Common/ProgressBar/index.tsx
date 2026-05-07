import React from 'react';
import styles from './styles.module.css';

export type ProgressVariant = 'default' | 'striped' | 'animated' | 'gradient' | 'glow';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  color?: ProgressColor;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  color = 'primary',
  label,
  showValue = false,
  className
}: ProgressBarProps): JSX.Element {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`${styles.progressWrapper} ${className || ''}`}>
      {(label || showValue) && (
        <div className={styles.progressHeader}>
          {label && <span className={styles.progressLabel}>{label}</span>}
          {showValue && (
            <span className={styles.progressValue}>
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`${styles.progressBar} ${styles[variant]} ${styles[size]}`}>
        <div
          className={`${styles.progressFill} ${styles[color]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {variant === 'glow' && <div className={styles.glowEffect}></div>}
        </div>
      </div>
    </div>
  );
}
