import React, { useState } from 'react';
import styles from './styles.module.css';

export type AccordionVariant = 'default' | 'minimal' | 'comic';

export interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  variant?: AccordionVariant;
  allowMultiple?: boolean;
  defaultOpenKeys?: string[];
  className?: string;
}

export default function Accordion({
  items,
  variant = 'default',
  allowMultiple = false,
  defaultOpenKeys = [],
  className,
}: AccordionProps): JSX.Element {
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const toggleItem = (key: string) => {
    if (allowMultiple) {
      setOpenKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    } else {
      setOpenKeys((prev) => (prev.includes(key) ? [] : [key]));
    }
  };

  return (
    <div className={`${styles.accordion} ${styles[variant]} ${className || ''}`}>
      {items.map((item, index) => {
        const isOpen = openKeys.includes(item.key);
        return (
          <div
            key={item.key}
            className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}
          >
            <button
              className={styles.accordionHeader}
              onClick={() => toggleItem(item.key)}
            >
              <div className={styles.headerContent}>
                {item.icon && (
                  <span className="material-symbols-outlined">{item.icon}</span>
                )}
                <span className={styles.title}>{item.title}</span>
              </div>
              <span className={`material-symbols-outlined ${styles.chevron}`}>
                {isOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            <div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>
              <div className={styles.contentInner}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
