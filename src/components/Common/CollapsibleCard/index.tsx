import React, { useState } from 'react';
import styles from './styles.module.css';

export type CollapsibleCardVariant = 'default' | 'minimal' | 'comic';
export type CollapsibleCardColor = 'primary' | 'secondary' | 'tertiary' | 'yellow' | 'pink' | 'blue' | 'cyan' | 'red';

export interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  variant?: CollapsibleCardVariant;
  color?: CollapsibleCardColor;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function CollapsibleCard({
  title,
  subtitle,
  badge,
  variant = 'default',
  color = 'primary',
  defaultExpanded = false,
  children,
  className,
}: CollapsibleCardProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`${styles.collapsibleCard} ${styles[variant]} ${styles[color]} ${className || ''}`}>
      <div 
        className={styles.cardHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.headerContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
        </div>
        {badge && <div className={styles.cardBadge}>{badge}</div>}
        <button 
          className={`${styles.toggleButton} ${isExpanded ? styles.expanded : ''}`}
          aria-label={isExpanded ? '收起' : '展开'}
        >
          <span className="material-symbols-outlined">
            {isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>
      
      <div className={`${styles.cardBody} ${isExpanded ? styles.expanded : ''}`}>
        <div className={styles.cardContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
