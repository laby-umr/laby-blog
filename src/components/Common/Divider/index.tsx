import React from 'react';
import styles from './styles.module.css';

export type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'gradient' | 'comic';
export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export default function Divider({
  variant = 'solid',
  orientation = 'horizontal',
  label,
  className
}: DividerProps): JSX.Element {
  return (
    <div
      className={`${styles.divider} ${styles[variant]} ${styles[orientation]} ${className || ''}`}
      role="separator"
    >
      {label && orientation === 'horizontal' && (
        <span className={styles.label}>{label}</span>
      )}
    </div>
  );
}
