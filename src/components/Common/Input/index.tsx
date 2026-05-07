import React from 'react';
import styles from './styles.module.css';

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: string;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: InputProps): JSX.Element {
  return (
    <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={`${styles.inputContainer} ${styles[variant]} ${styles[size]} ${error ? styles.error : ''}`}>
        {icon && (
          <span className={`material-symbols-outlined ${styles.icon}`}>
            {icon}
          </span>
        )}
        <input className={styles.input} {...props} />
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
      {helperText && !error && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
}
