import React from 'react';
import styles from './styles.module.css';

export type BubbleVariant = 'speech' | 'thought' | 'shout' | 'whisper';
export type BubblePosition = 'left' | 'right' | 'top' | 'bottom';

export interface BubbleProps {
  children: React.ReactNode;
  variant?: BubbleVariant;
  position?: BubblePosition;
  author?: string;
  avatar?: string;
  className?: string;
}

export default function Bubble({
  children,
  variant = 'speech',
  position = 'left',
  author,
  avatar,
  className,
}: BubbleProps): JSX.Element {
  return (
    <div className={`${styles.bubbleContainer} ${styles[position]} ${className || ''}`}>
      {avatar && (
        <div className={styles.avatar}>
          <img src={avatar} alt={author || 'Avatar'} />
        </div>
      )}
      <div className={`${styles.bubble} ${styles[variant]}`}>
        {author && <div className={styles.author}>{author}</div>}
        <div className={styles.content}>{children}</div>
        <div className={styles.tail}></div>
      </div>
    </div>
  );
}
