import React from 'react';
import styles from './styles.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  className
}: SkeletonProps): JSX.Element {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${styles.skeleton} ${styles[variant]} ${className || ''}`}
      style={style}
    />
  ));

  return count > 1 ? <div className={styles.skeletonGroup}>{skeletons}</div> : skeletons[0];
}
