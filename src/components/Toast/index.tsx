import React, { useEffect } from 'react';
import styles from './styles.module.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <span className="material-symbols-outlined">check_circle</span>
        );
      case 'error':
        return (
          <span className="material-symbols-outlined">error</span>
        );
      case 'info':
      default:
        return (
          <span className="material-symbols-outlined">info</span>
        );
    }
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.toastIcon}>
        {getIcon()}
      </div>
      <div className={styles.toastMessage}>{message}</div>
      <button 
        className={styles.toastClose}
        onClick={onClose}
        aria-label="关闭"
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}

// Toast 容器组件
export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.toastContainer}>
      {children}
    </div>
  );
}
