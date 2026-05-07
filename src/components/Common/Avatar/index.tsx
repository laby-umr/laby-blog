import React from 'react';
import styles from './styles.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  fallback?: string;
  badge?: React.ReactNode;
  online?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'circle',
  fallback,
  badge,
  online,
  className,
  onClick
}: AvatarProps): JSX.Element {
  const [imageError, setImageError] = React.useState(false);

  const showFallback = !src || imageError;
  const initials = fallback || alt.substring(0, 2).toUpperCase();

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${styles[variant]} ${className || ''} ${
        onClick ? styles.clickable : ''
      }`}
      onClick={onClick}
    >
      {showFallback ? (
        <div className={styles.fallback}>{initials}</div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}
      {badge && <div className={styles.badge}>{badge}</div>}
      {online !== undefined && (
        <div className={`${styles.status} ${online ? styles.online : styles.offline}`}></div>
      )}
    </div>
  );
}
