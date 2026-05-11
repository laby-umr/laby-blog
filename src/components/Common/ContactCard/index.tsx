import React from 'react';
import styles from './styles.module.css';

export type ContactCardVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

export interface ContactCardProps {
  icon: string;
  label: string;
  value: string;
  variant?: ContactCardVariant;
  iconColor?: string;
  className?: string;
}

export default function ContactCard({ 
  icon, 
  label, 
  value,
  variant = 'default',
  iconColor,
  className 
}: ContactCardProps): JSX.Element {
  return (
    <div className={`${styles.contactCard} ${styles[variant]} ${className || ''}`}>
      <span className="material-symbols-outlined" style={iconColor ? { color: iconColor } : undefined}>{icon}</span>
      <div>
        <p className={styles.contactLabel}>{label}</p>
        <p className={styles.contactValue}>{value}</p>
      </div>
    </div>
  );
}
