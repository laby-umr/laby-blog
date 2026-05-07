import React from 'react';
import styles from './styles.module.css';

export type ContactCardVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

export interface ContactCardProps {
  icon: string;
  label: string;
  value: string;
  variant?: ContactCardVariant;
  className?: string;
}

export default function ContactCard({ 
  icon, 
  label, 
  value,
  variant = 'default',
  className 
}: ContactCardProps): JSX.Element {
  return (
    <div className={`${styles.contactCard} ${styles[variant]} ${className || ''}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <div>
        <p className={styles.contactLabel}>{label}</p>
        <p className={styles.contactValue}>{value}</p>
      </div>
    </div>
  );
}
