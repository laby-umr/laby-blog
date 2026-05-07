import React from 'react';
import styles from './styles.module.css';

export type TechCardVariant = 'primary' | 'secondary' | 'tertiary';

export interface TechCardProps {
  icon: string;
  name: string;
  variant?: TechCardVariant;
  className?: string;
}

export default function TechCard({ 
  icon, 
  name, 
  variant = 'primary',
  className 
}: TechCardProps): JSX.Element {
  return (
    <div className={`${styles.techCard} ${styles[variant]} ${className || ''}`}>
      <span className={`material-symbols-outlined ${styles.techIcon}`}>
        {icon}
      </span>
      <span className={styles.techName}>{name}</span>
    </div>
  );
}
