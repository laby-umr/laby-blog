import React, { useEffect } from 'react';
import styles from './styles.module.css';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';

export interface ToastProps {
  message: string;
  visible: boolean;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ 
  message, 
  visible, 
  variant = 'default',
  position = 'top-center',
  duration = 3000,
  onClose 
}: ToastProps): JSX.Element | null {
  useEffect(() => {
    if (visible && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const icons = {
    default: '',
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return (
    <div className={`${styles.toast} ${styles[variant]} ${styles[position]}`}>
      {icons[variant] && (
        <span className="material-symbols-outlined">{icons[variant]}</span>
      )}
      {message}
    </div>
  );
}
