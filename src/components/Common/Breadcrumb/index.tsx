import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type BreadcrumbVariant = 'default' | 'minimal' | 'comic';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: BreadcrumbVariant;
  separator?: string;
  className?: string;
}

export default function Breadcrumb({
  items,
  variant = 'default',
  separator = 'chevron_right',
  className,
}: BreadcrumbProps): JSX.Element {
  return (
    <nav className={`${styles.breadcrumb} ${styles[variant]} ${className || ''}`}>
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={styles.breadcrumbItem}>
              {item.href && !isLast ? (
                <Link to={item.href} className={styles.breadcrumbLink}>
                  {item.icon && (
                    <span className="material-symbols-outlined">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className={`${styles.breadcrumbText} ${isLast ? styles.current : ''}`}>
                  {item.icon && (
                    <span className="material-symbols-outlined">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}
              {!isLast && (
                <span className={`material-symbols-outlined ${styles.separator}`}>
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
