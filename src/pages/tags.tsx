import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './tags.module.css';

// 这里需要手动维护标签列表，或者从博客数据中动态获取
// 标签数据需要与实际博客文章中使用的标签保持一致
const TAGS = [
  { name: '数字孪生', count: 4, slug: 'digital-twin' },
  { name: 'AI大模型', count: 4, slug: 'ai-large-model' },
  { name: '可视化大屏', count: 3, slug: 'visualization' },
  { name: '技术架构', count: 2, slug: 'tech-architecture' },
  { name: '工业4.0', count: 1, slug: 'industry-4' },
  { name: '智能制造', count: 1, slug: 'smart-manufacturing' },
  { name: '工业互联网', count: 1, slug: 'industrial-internet' },
  { name: '案例分析', count: 1, slug: 'case-study' },
  { name: '开发实践', count: 1, slug: 'dev-practice' },
  { name: '趋势预测', count: 1, slug: 'trend-forecast' },
  { name: 'AI融合', count: 1, slug: 'ai-integration' },
  { name: '元宇宙', count: 1, slug: 'metaverse' },
  { name: '欢迎', count: 1, slug: 'welcome' },
  { name: 'AI', count: 1, slug: 'ai' },
  { name: '大模型', count: 1, slug: 'large-model' },
  { name: '介绍', count: 1, slug: 'introduction' },
  { name: '企业落地', count: 1, slug: 'enterprise-implementation' },
  { name: '实施策略', count: 1, slug: 'implementation-strategy' },
  { name: '数字化转型', count: 2, slug: 'digital-transformation' },
  { name: '行业应用', count: 1, slug: 'industry-application' },
  { name: '案例研究', count: 1, slug: 'case-research' },
  { name: '部署实践', count: 1, slug: 'deployment-practice' },
  { name: '系统设计', count: 1, slug: 'system-design' },
  { name: 'ROI分析', count: 1, slug: 'roi-analysis' },
  { name: '投资回报', count: 1, slug: 'investment-return' },
  { name: '价值评估', count: 1, slug: 'value-assessment' },
];

function getTagSize(count: number): 'small' | 'medium' | 'large' {
  if (count >= 15) return 'large';
  if (count >= 10) return 'medium';
  return 'small';
}

export default function TagsPage() {
  // 按文章数量排序
  const sortedTags = [...TAGS].sort((a, b) => b.count - a.count);

  return (
    <Layout
      title="标签云"
      description="浏览所有文章标签"
    >
      <div className={styles.tagsPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', verticalAlign: 'middle' }}>
              sell
            </span>
            {' '}标签云
          </h1>
          <p className={styles.subtitle}>
            探索 {TAGS.length} 个技术标签，共 {TAGS.reduce((sum, tag) => sum + tag.count, 0)} 篇文章
          </p>
        </div>

        <div className={styles.tagsCloud}>
          {sortedTags.map((tag) => (
            <Link
              key={tag.slug}
              to={`/blog/tags/${tag.slug}`}
              className={styles.tagItem}
              data-size={getTagSize(tag.count)}
            >
              <span className={`material-symbols-outlined ${styles.tagIcon}`}>
                tag
              </span>
              <span className={styles.tagName}>{tag.name}</span>
              <span className={styles.tagCount}>{tag.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
