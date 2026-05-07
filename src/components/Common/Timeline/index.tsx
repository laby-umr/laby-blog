import React from 'react';
import styles from './styles.module.css';

export type TimelineVariant = 'default' | 'compact' | 'minimal';

export interface TimelineItemProps {
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  items?: string[];
  children?: React.ReactNode;
  className?: string;
}

export interface TimelineProps {
  items: TimelineItemProps[];
  variant?: TimelineVariant;
  className?: string;
}

export function TimelineItem({
  date,
  title,
  subtitle,
  description,
  items = [],
  children,
  className,
}: TimelineItemProps): JSX.Element {
  return (
    <div className={`${styles.timelineItem} ${className || ''}`}>
      <div className={styles.timelineDateWrapper}>
        <div className={styles.timelineDate}>{date}</div>
      </div>
      <div className={styles.timelineDot}></div>
      <div className={styles.timelineContentWrapper}>
        <div className={styles.timelineContent}>
          <div className={styles.timelineHeader}>
            <h3>{title}</h3>
            {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
          </div>
          {description && <p className={styles.description}>{description}</p>}
          {items.length > 0 && (
            <ul className={styles.itemsList}>
              {items.map((item, index) => (
                <li key={index}>
                  <span className={styles.itemIndex}>
                    {String(index + 1).padStart(2, '0')}.
                  </span>{' '}
                  {item}
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Timeline({ items, variant = 'default', className }: TimelineProps): JSX.Element {
  return (
    <div className={`${styles.timelineList} ${styles[variant]} ${className || ''}`}>
      {items.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  );
}
