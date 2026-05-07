import React, { useState } from 'react';
import styles from './styles.module.css';

export type SidebarVariant = 'default' | 'minimal' | 'comic';
export type SidebarPosition = 'left' | 'right';

export interface SidebarItem {
  key: string;
  label: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  variant?: SidebarVariant;
  position?: SidebarPosition;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  title?: string;
  className?: string;
}

export default function Sidebar({
  items,
  variant = 'default',
  position = 'left',
  collapsible = false,
  defaultCollapsed = false,
  title,
  className,
}: SidebarProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedKeys.includes(item.key);

    return (
      <div key={item.key} className={styles.sidebarItemWrapper}>
        <div
          className={`${styles.sidebarItem} ${styles[`level${level}`]}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.key);
            } else if (item.onClick) {
              item.onClick();
            }
          }}
        >
          {item.icon && (
            <span className="material-symbols-outlined">{item.icon}</span>
          )}
          <span className={styles.itemLabel}>{item.label}</span>
          {hasChildren && (
            <span className={`material-symbols-outlined ${styles.expandIcon}`}>
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className={styles.sidebarChildren}>
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`${styles.sidebar} ${styles[variant]} ${styles[position]} ${
        isCollapsed ? styles.collapsed : ''
      } ${className || ''}`}
    >
      {title && (
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>{title}</h3>
          {collapsible && (
            <button
              className={styles.collapseButton}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span className="material-symbols-outlined">
                {isCollapsed ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
          )}
        </div>
      )}
      <nav className={styles.sidebarNav}>
        {items.map((item) => renderItem(item))}
      </nav>
    </aside>
  );
}
