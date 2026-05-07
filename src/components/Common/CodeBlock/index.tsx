import React, { useState } from 'react';
import styles from './styles.module.css';

export type CodeBlockTheme = 'dark' | 'light' | 'comic' | 'minimal';

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  theme?: CodeBlockTheme;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'javascript',
  title,
  theme = 'dark',
  showLineNumbers = true,
  highlightLines = [],
  className,
}: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className={`${styles.codeBlockContainer} ${styles[theme]} ${className || ''}`}>
      <div className={styles.codeBlockHeader}>
        <div className={styles.codeBlockControls}>
          <span className={`${styles.codeDot} ${styles.codeDotRed}`}></span>
          <span className={`${styles.codeDot} ${styles.codeDotYellow}`}></span>
          <span className={`${styles.codeDot} ${styles.codeDotGreen}`}></span>
        </div>
        {title && <div className={styles.codeBlockTitle}>{title}</div>}
        <div className={styles.codeBlockMeta}>
          <span className={styles.codeBlockLanguage}>
            <span className="material-symbols-outlined">code</span>
            {language}
          </span>
          <button className={styles.copyButton} onClick={handleCopy}>
            <span className="material-symbols-outlined">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className={styles.codeBlockContent}>
        <pre className={styles.codeBlock}>
          <code className={styles.codeBlockLines}>
            {lines.map((line, index) => (
              <div
                key={index}
                className={`${styles.codeLine} ${
                  highlightLines.includes(index + 1) ? styles.highlightedLine : ''
                }`}
              >
                {showLineNumbers && (
                  <span className={styles.codeLineNumber}>{index + 1}</span>
                )}
                <span className={styles.codeLineContent}>{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
