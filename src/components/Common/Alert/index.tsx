import React from 'react';
import styles from './styles.module.css';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export type AlertSize = 'sm' | 'md' | 'lg';

export interface AlertProps {
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  message: string;
  icon?: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  variant = 'info',
  size = 'md',
  title,
  message,
  icon,
  closable = false,
  onClose,
  className,
}: AlertProps): JSX.Element {
  const defaultIcons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <div
      className={`${styles.alert} ${styles[variant]} ${styles[size]} ${className || ''}`}
      role="alert"
    >
      <div className={styles.alertIcon}>
        <span className="material-symbols-outlined">
          {icon || defaultIcons[variant]}
        </span>
      </div>
      <div className={styles.alertContent}>
        {title && <div className={styles.alertTitle}>{title}</div>}
        <div className={styles.alertMessage}>{message}</div>
      </div>
      {closable && (
        <button className={styles.alertClose} onClick={onClose} aria-label="Close">
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  );
}
