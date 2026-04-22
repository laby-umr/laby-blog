import React from 'react';
import styles from './styles.module.css';

export default function ComparisonTable({ data, headers, rows, caption }) {
  // 支持两种数据格式：
  // 1. data={{ headers: [...], rows: [...] }}
  // 2. headers={[...]} rows={[...]}
  const tableHeaders = data?.headers || headers;
  const tableRows = data?.rows || rows;

  if (!tableHeaders || !tableRows) {
    return <div className={styles.error}>ComparisonTable: Invalid data format. Please provide either 'data' prop with headers and rows, or separate 'headers' and 'rows' props.</div>;
  }

  return (
    <div className={styles.tableWrapper}>
      {caption && <div className={styles.caption}>{caption}</div>}
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className={styles.tableHeader}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.tableCell}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
