import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

export type DropdownVariant = 'default' | 'minimal' | 'comic';
export type DropdownPlacement = 'bottom' | 'top' | 'left' | 'right';

export interface DropdownItem {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  variant?: DropdownVariant;
  placement?: DropdownPlacement;
  className?: string;
}

export default function Dropdown({
  trigger,
  items,
  variant = 'default',
  placement = 'bottom',
  className,
}: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick?.();
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${styles[variant]} ${className || ''}`}
    >
      <div
        className={styles.dropdownTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      {isOpen && (
        <div className={`${styles.dropdownMenu} ${styles[placement]}`}>
          {items.map((item) => (
            <button
              key={item.key}
              className={`${styles.dropdownItem} ${
                item.disabled ? styles.disabled : ''
              } ${item.danger ? styles.danger : ''}`}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
            >
              {item.icon && (
                <span className="material-symbols-outlined">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
