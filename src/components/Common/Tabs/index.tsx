import React, { useState } from 'react';
import styles from './styles.module.css';

export type TabsVariant = 'default' | 'pills' | 'underline' | 'comic';

export interface TabItem {
  key: string;
  label: string;
  icon?: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  variant?: TabsVariant;
  onChange?: (key: string) => void;
  className?: string;
}

export default function Tabs({
  items,
  defaultActiveKey,
  variant = 'default',
  onChange,
  className,
}: TabsProps): JSX.Element {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ''
  );

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    onChange?.(key);
  };

  const activeItem = items.find((item) => item.key === activeKey);

  return (
    <div className={`${styles.tabs} ${styles[variant]} ${className || ''}`}>
      <div className={styles.tabList}>
        {items.map((item) => (
          <button
            key={item.key}
            className={`${styles.tabButton} ${
              activeKey === item.key ? styles.active : ''
            }`}
            onClick={() => handleTabClick(item.key)}
          >
            {item.icon && (
              <span className="material-symbols-outlined">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {activeItem?.content}
      </div>
    </div>
  );
}
