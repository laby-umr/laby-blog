import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  className,
  disabled = false
}: ButtonProps): JSX.Element {
  const buttonClassName = `${styles.button} ${styles[variant]} ${className || ''}`;
  
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <Link to={href} className={buttonClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      className={buttonClassName} 
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
