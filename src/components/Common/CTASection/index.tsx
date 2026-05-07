import React from 'react';
import styles from './styles.module.css';

export interface CTASectionProps {
  quote: string;
  tags?: string[];
  icon?: string;
  className?: string;
}

export default function CTASection({ 
  quote, 
  tags = [], 
  icon = 'flare',
  className 
}: CTASectionProps): JSX.Element {
  return (
    <section className={`${styles.ctaSection} ${className || ''}`}>
      <span className={`material-symbols-outlined ${styles.ctaBackground}`}>
        {icon}
      </span>
      <div className={styles.ctaContent}>
        <blockquote className={styles.ctaQuote}>
          {quote}
        </blockquote>
        {tags.length > 0 && (
          <div className={styles.ctaTags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.ctaTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
