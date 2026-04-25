import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return isVisible ? (
    <button 
      onClick={scrollToTop} 
      className={styles.backToTop}
      aria-label="返回顶部"
    >
      <span className="material-symbols-outlined">arrow_upward</span>
      <span className={styles.text}>TOP</span>
    </button>
  ) : null;
}
