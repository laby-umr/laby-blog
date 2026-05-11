import React from 'react';
import styles from './styles.module.css';

export type StatsCardVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

export interface StatsCardProps {
  number: string;
  label: string;
  variant?: StatsCardVariant;
  numberColor?: string;
  className?: string;
}

export default function StatsCard({ 
  number, 
  label,
  variant = 'default',
  numberColor,
  className 
}: StatsCardProps): JSX.Element {
  return (
    <div className={`${styles.statCard} ${styles[variant]} ${className || ''}`}>
      <h3 className={styles.statNumber} style={numberColor ? { color: numberColor } : undefined}>{number}</h3>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}
