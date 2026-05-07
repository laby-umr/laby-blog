import React, { useState, useMemo } from 'react';
import styles from './styles.module.css';

export interface DataTableColumn {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export type DataTableVariant = 'default' | 'minimal' | 'comic' | 'striped';

export interface DataTableProps {
  columns: DataTableColumn[];
  data: Array<Record<string, any>>;
  variant?: DataTableVariant;
  searchable?: boolean;
  searchPlaceholder?: string;
  paginated?: boolean;
  pageSize?: number;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
}

export default function DataTable({
  columns,
  data,
  variant = 'default',
  searchable = false,
  searchPlaceholder = '搜索...',
  paginated = false,
  pageSize = 10,
  hoverable = true,
  bordered = true,
  className,
}: DataTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;
    
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  return (
    <div className={`${styles.dataTableWrapper} ${styles[variant]} ${className || ''}`}>
      {/* Search Bar */}
      {searchable && (
        <div className={styles.searchBar}>
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
        </div>
      )}

      {/* Table */}
      <div className={styles.tableContainer}>
        <table
          className={`${styles.table} ${hoverable ? styles.hoverable : ''} ${
            bordered ? styles.bordered : ''
          }`}
        >
          <thead className={styles.thead}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    width: column.width,
                    textAlign: column.align || 'left',
                  }}
                  className={column.sortable ? styles.sortable : ''}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className={styles.thContent}>
                    <span>{column.title}</span>
                    {column.sortable && (
                      <span className={styles.sortIcon}>
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <span className="material-symbols-outlined">arrow_upward</span>
                          ) : (
                            <span className="material-symbols-outlined">arrow_downward</span>
                          )
                        ) : (
                          <span className="material-symbols-outlined">unfold_more</span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{ textAlign: column.align || 'left' }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  <span className="material-symbols-outlined">inbox</span>
                  <p>暂无数据</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageNumber} ${
                  page === currentPage ? styles.active : ''
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={styles.pageButton}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          <div className={styles.pageInfo}>
            第 {currentPage} / {totalPages} 页 · 共 {sortedData.length} 条
          </div>
        </div>
      )}
    </div>
  );
}
