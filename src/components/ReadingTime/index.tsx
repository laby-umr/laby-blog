import React from 'react';
import styles from './styles.module.css';

interface ReadingTimeProps {
  content?: string;
  wordCount?: number;
}

export default function ReadingTime({ content, wordCount }: ReadingTimeProps) {
  // 计算阅读时间
  const calculateReadingTime = () => {
    let words = 0;
    
    if (wordCount) {
      words = wordCount;
    } else if (content) {
      // 移除 HTML 标签和 Markdown 语法
      const plainText = content
        .replace(/<[^>]*>/g, '')
        .replace(/[#*`_~\[\]()]/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '');
      
      // 分别计算中文字符和英文单词
      const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
      const englishWords = plainText
        .replace(/[\u4e00-\u9fa5]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 0).length;
      
      // 中文：300字/分钟，英文：200词/分钟
      words = chineseChars + englishWords;
    }
    
    // 混合计算：假设平均阅读速度为 250 字/词 每分钟
    const minutes = Math.ceil(words / 250);
    return Math.max(1, minutes); // 至少显示 1 分钟
  };

  const minutes = calculateReadingTime();

  return (
    <span className={styles.readingTime}>
      <span className="material-symbols-outlined">schedule</span>
      <span>{minutes} 分钟阅读</span>
    </span>
  );
}
