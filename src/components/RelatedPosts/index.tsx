import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface RelatedPost {
  title: string;
  permalink: string;
  description?: string;
  tags?: string[];
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  currentTags?: string[];
}

export default function RelatedPosts({ posts, currentTags = [] }: RelatedPostsProps) {
  // 根据标签相似度排序
  const sortedPosts = posts
    .map(post => {
      const commonTags = post.tags?.filter(tag => currentTags.includes(tag)).length || 0;
      return { ...post, score: commonTags };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // 只显示前 3 篇

  if (sortedPosts.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedPosts}>
      <div className={styles.header}>
        <span className="material-symbols-outlined">auto_stories</span>
        <h3 className={styles.title}>相关文章 / Related Posts</h3>
      </div>
      <div className={styles.postList}>
        {sortedPosts.map((post, index) => (
          <Link 
            key={index} 
            to={post.permalink} 
            className={styles.postCard}
          >
            <div className={styles.postNumber}>{index + 1}</div>
            <div className={styles.postContent}>
              <h4 className={styles.postTitle}>{post.title}</h4>
              {post.description && (
                <p className={styles.postDescription}>{post.description}</p>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className={styles.postTags}>
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <span className={`material-symbols-outlined ${styles.arrow}`}>
              arrow_forward
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
