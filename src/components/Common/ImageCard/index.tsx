import React from 'react';
import styles from './styles.module.css';

export type ImageCardVariant = 'default' | 'minimal' | 'comic' | 'float';

export interface ImageCardProps {
  image: string;
  name: string;
  nameEn?: string;
  title?: string;
  color?: string;
  variant?: ImageCardVariant;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ImageCard({ 
  image, 
  name, 
  nameEn,
  title,
  color = 'primary',
  variant = 'default',
  isActive = false,
  onClick,
  className 
}: ImageCardProps): JSX.Element {
  return (
    <div
      className={`${styles.imageCard} ${styles[variant]} ${isActive ? styles.activeCard : ''} ${className || ''}`}
      data-color={color}
      onClick={onClick}
    >
      <div className={styles.imageCardContent}>
        <div className={`${styles.imageAura} ${styles[`aura${color}`]}`}></div>
        <div className={styles.imageCardBorder}></div>
        <img
          src={image}
          alt={name}
          className={styles.imageCardImage}
        />
        <div className={styles.imageCardInfo}>
          <div className={styles.imageCardName}>{name}</div>
          {nameEn && <div className={styles.imageCardNameEn}>{nameEn}</div>}
          {title && (
            <div className={`${styles.imageCardTitle} ${styles[`imageCardTitle${color}`]}`}>
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
