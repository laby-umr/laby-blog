import React from 'react';
import styles from './styles.module.css';

export type BentoCardSize = 'small' | 'medium' | 'large' | 'xlarge';
export type BentoCardVariant = 'default' | 'minimal' | 'comic' | 'gradient';

export interface BentoCardProps {
  title: string;
  icon?: string;
  tags?: string[];
  colSpan?: 4 | 5 | 7 | 8 | 12;
  bgColor?: 'white' | 'yellow' | 'pink' | 'gray' | 'blue' | 'highest' | 'black' | 'purple';
  variant?: BentoCardVariant;
  className?: string;
  children?: React.ReactNode;
}

export default function BentoCard({
  title,
  icon,
  tags = [],
  colSpan = 4,
  bgColor = 'white',
  variant = 'default',
  className,
  children,
}: BentoCardProps): JSX.Element {
  return (
    <div
      className={`${styles.bentoCard} ${styles[variant]} ${styles[`colSpan${colSpan}`]} ${
        styles[`bg${bgColor.charAt(0).toUpperCase() + bgColor.slice(1)}`]
      } ${className || ''}`}
    >
      <h2 className={styles.bentoTitle}>
        {icon && <span className="material-symbols-outlined">{icon}</span>}
        {title}
      </h2>
      {tags.length > 0 && (
        <div className={styles.bentoTagContainer}>
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`${styles.bentoTag} ${
                index % 3 === 1
                  ? styles.textPrimary
                  : index % 3 === 2
                  ? styles.textVariant
                  : ''
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
