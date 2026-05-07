import React from 'react';
import styles from './styles.module.css';

export type PaginationVariant = 'default' | 'minimal' | 'comic';

export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  variant?: PaginationVariant;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
  onChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export default function Pagination({
  current,
  total,
  pageSize = 10,
  variant = 'default',
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = false,
  onChange,
  onPageSizeChange,
  className,
}: PaginationProps): JSX.Element {
  const totalPages = Math.ceil(total / pageSize);
  const [jumpValue, setJumpValue] = React.useState('');

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      onChange?.(page);
    }
  };

  const handleJump = () => {
    const page = parseInt(jumpValue);
    if (!isNaN(page)) {
      handlePageChange(page);
      setJumpValue('');
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push('...');
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`${styles.pagination} ${styles[variant]} ${className || ''}`}>
      {/* Previous Button */}
      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Page Numbers */}
      <div className={styles.pageNumbers}>
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              className={`${styles.pageNumber} ${
                page === current ? styles.active : ''
              }`}
              onClick={() => handlePageChange(page as number)}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(current + 1)}
        disabled={current === totalPages}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Page Size Changer */}
      {showSizeChanger && (
        <select
          className={styles.sizeChanger}
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / 页
            </option>
          ))}
        </select>
      )}

      {/* Quick Jumper */}
      {showQuickJumper && (
        <div className={styles.quickJumper}>
          <span>跳至</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpValue}
            onChange={(e) => setJumpValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleJump()}
            className={styles.jumpInput}
          />
          <span>页</span>
          <button className={styles.jumpButton} onClick={handleJump}>
            GO
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className={styles.pageInfo}>
        第 {current} / {totalPages} 页 · 共 {total} 条
      </div>
    </div>
  );
}
