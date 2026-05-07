import React from 'react';
import styles from './styles.module.css';

export default function PwaReloadPopup({ onReload }: { onReload: () => void }): JSX.Element {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p className={styles.popupMessage}>
          发现新版本！
        </p>
        <button className={styles.reloadButton} onClick={onReload}>
          刷新
        </button>
      </div>
    </div>
  );
}
