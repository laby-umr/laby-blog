import React from 'react';
import Badge from '../Badge';
import styles from './styles.module.css';

export type HeroVariant = 'default' | 'minimal' | 'comic' | 'gradient';

export interface HeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'center' | 'left';
  variant?: HeroVariant;
  children?: React.ReactNode;
  className?: string;
}

export default function Hero({ 
  badge, 
  title, 
  description, 
  align = 'center',
  variant = 'default',
  children,
  className 
}: HeroProps): JSX.Element {
  const heroClassName = `${styles.hero} ${styles[align]} ${styles[variant]} ${className || ''}`;

  return (
    <section className={heroClassName}>
      {badge && <Badge>{badge}</Badge>}
      
      <h1 className={styles.title}>
        {title}
      </h1>
      
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
      
      {children}
    </section>
  );
}
