import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { verifySubscription } from '@site/src/lib/supabase';
import styles from './verify.module.css';

export default function NewsletterVerify() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      // 从 URL 获取 token
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        setStatus('error');
        setMessage('验证链接无效，缺少验证令牌');
        return;
      }

      try {
        const result = await verifySubscription(token);
        
        if (result.success) {
          setStatus('success');
          setMessage(result.message || '订阅验证成功！感谢您的订阅');
        } else {
          setStatus('error');
          setMessage(result.error?.message || '验证失败，请重试');
        }
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : '验证失败，请重试');
      }
    };

    verifyToken();
  }, []);

  return (
    <Layout
      title="验证订阅"
      description="Newsletter 订阅验证"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          {status === 'loading' && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <h2>正在验证您的订阅...</h2>
              <p>请稍候</p>
            </div>
          )}

          {status === 'success' && (
            <div className={styles.success}>
              <div className={styles.icon}>✓</div>
              <h2>验证成功！</h2>
              <p>{message}</p>
              <p className={styles.subtext}>
                您将开始收到来自 Laby Blog 的最新内容更新
              </p>
              <a href="/" className={styles.button}>
                返回首页
              </a>
            </div>
          )}

          {status === 'error' && (
            <div className={styles.error}>
              <div className={styles.icon}>✕</div>
              <h2>验证失败</h2>
              <p>{message}</p>
              <div className={styles.actions}>
                <a href="/" className={styles.button}>
                  返回首页
                </a>
                <a href="/blog" className={styles.buttonSecondary}>
                  浏览博客
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
