import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { unsubscribe } from '@site/src/lib/supabase';
import styles from './unsubscribe.module.css';

export default function NewsletterUnsubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // 从 URL 参数中读取邮箱
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('请输入邮箱地址');
      return;
    }

    setStatus('loading');

    try {
      const result = await unsubscribe(email);
      
      if (result.success) {
        setStatus('success');
        setMessage('已成功取消订阅');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(result.error?.message || '取消订阅失败，请重试');
      }
    } catch (error) {
      setStatus('error');
      setMessage('取消订阅失败，请重试');
    }
  };

  return (
    <Layout
      title="取消订阅"
      description="取消 Newsletter 订阅"
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1>取消订阅</h1>
            <p>我们很遗憾看到您离开</p>
          </div>

          {status === 'success' ? (
            <div className={styles.success}>
              <div className={styles.icon}>✓</div>
              <h2>取消成功</h2>
              <p>{message}</p>
              <p className={styles.subtext}>
                您将不再收到来自 Laby Blog 的邮件
              </p>
              <p className={styles.subtext}>
                如果改变主意，随时欢迎您重新订阅
              </p>
              <a href="/" className={styles.button}>
                返回首页
              </a>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">邮箱地址</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                {status === 'error' && (
                  <div className={styles.errorMessage}>
                    {message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '处理中...' : '确认取消订阅'}
                </button>
              </form>

              <div className={styles.info}>
                <p>取消订阅后：</p>
                <ul>
                  <li>您将不再收到我们的邮件通知</li>
                  <li>您的订阅偏好将被保存</li>
                  <li>您可以随时重新订阅</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
