import React from 'react';
import Link from '@docusaurus/Link';
import Tag from '../Tag';
import styles from './styles.module.css';

export type CardVariant = 'default' | 'comic' | 'monitor' | 'float' | 'minimal' | 'square' | 'rounded' | 'skewed';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  date?: string;
  readMore?: string;
  tags?: Array<{ label: string; href?: string }>;
  variant?: CardVariant;
  size?: CardSize;
  badge?: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Card({ 
  title,
  description,
  image,
  href,
  date,
  readMore = '阅读更多',
  tags = [],
  variant = 'default',
  size = 'md',
  badge,
  icon,
  children,
  className,
  onClick
}: CardProps): JSX.Element {
  const cardClassName = `${styles.card} ${styles[variant]} ${styles[size]} ${className || ''}`;

  const cardContent = (
    <>
      <div className={styles.cardShadow}></div>
      <div className={styles.cardContent}>
        {/* Monitor Header (for monitor variant) */}
        {variant === 'monitor' && (
          <div className={styles.monitorHeader}>
            <div className={styles.monitorDots}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
            </div>
            {badge && <div className={styles.monitorBadge}>{badge}</div>}
          </div>
        )}

        {/* Image */}
        {image && (
          <div className={styles.cardImage}>
            <img src={image} alt={title} loading="lazy" />
            {badge && variant !== 'monitor' && (
              <div className={styles.imageBadge}>{badge}</div>
            )}
            {icon && variant === 'float' && (
              <div className={styles.floatIcon}>
                <span className="material-symbols-outlined">{icon}</span>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className={styles.cardInfo}>
          {icon && variant !== 'float' && (
            <span className={`material-symbols-outlined ${styles.cardIcon}`}>
              {icon}
            </span>
          )}
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.cardTags}>
              {tags.slice(0, 3).map((tag, index) => (
                <Tag 
                  key={index} 
                  label={tag.label} 
                  href={tag.href}
                  onClick={(e) => tag.href && e.stopPropagation()}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          {(date || readMore) && (
            <div className={styles.cardFooter}>
              {date && <span className={styles.cardDate}>{date}</span>}
              {readMore && (
                <div className={styles.readMore}>
                  <span>{readMore}</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <article className={cardClassName}>
        <Link to={href} className={styles.cardLink} onClick={onClick}>
          {cardContent}
        </Link>
      </article>
    );
  }

  return (
    <article className={cardClassName} onClick={onClick}>
      {cardContent}
    </article>
  );
}
