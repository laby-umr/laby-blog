import React from 'react';
import styles from './styles.module.css';

export type BadgeVariant = 'bounce' | 'static' | 'rotate' | 'pulse';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'bounce',
  className 
}: BadgeProps): JSX.Element {
  const badgeClassName = `${styles.badge} ${styles[variant]} ${className || ''}`;

  return (
    <div className={badgeClassName}>
      {children}
    </div>
  );
}
