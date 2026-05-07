import React from 'react';
import styles from './styles.module.css';

export type SliderVariant = 'default' | 'manga' | 'minimal';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  variant?: SliderVariant;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  variant = 'default',
  label,
  showValue = false,
  disabled = false,
  className
}: SliderProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`${styles.sliderWrapper} ${className || ''}`}>
      {(label || showValue) && (
        <div className={styles.sliderHeader}>
          {label && <label className={styles.sliderLabel}>{label}</label>}
          {showValue && <span className={styles.sliderValue}>{value}</span>}
        </div>
      )}
      <div className={`${styles.sliderContainer} ${styles[variant]}`}>
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderProgress}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={styles.sliderInput}
        />
      </div>
    </div>
  );
}
