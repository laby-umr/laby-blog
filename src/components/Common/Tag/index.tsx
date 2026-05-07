import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export interface TagProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export default function Tag({ label, href, onClick, className }: TagProps): JSX.Element {
  const tagClassName = `${styles.tag} ${className || ''}`;

  if (href) {
    return (
      <Link to={href} className={tagClassName} onClick={onClick}>
        {label}
      </Link>
    );
  }

  return (
    <span className={tagClassName} onClick={onClick}>
      {label}
    </span>
  );
}
