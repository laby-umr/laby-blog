import React from 'react';
import styles from './styles.module.css';

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps {
  columns: TableColumn[];
  data: Array<Record<string, any>>;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  className?: string;
}

export default function Table({
  columns,
  data,
  striped = true,
  hoverable = true,
  bordered = true,
  className,
}: TableProps): JSX.Element {
  return (
    <div className={`${styles.tableContainer} ${className || ''}`}>
      <table
        className={`${styles.table} ${striped ? styles.striped : ''} ${
          hoverable ? styles.hoverable : ''
        } ${bordered ? styles.bordered : ''}`}
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
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
