import React, { useState } from 'react';
import { subscribeNewsletter } from '../lib/supabase';
import Toast from './Toast';
import styles from './NewsletterSubscribe.module.css';

interface NewsletterSubscribeProps {
  source?: 'footer' | 'sidebar' | 'popup';
  compact?: boolean;
}

export default function NewsletterSubscribe({ source = 'sidebar', compact = false }: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: 'success' as 'success' | 'error', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);

    try {
      const result = await subscribeNewsletter({
        email,
        name: name || undefined,
        source
      });

      if (result.success) {
        setToastMessage({ type: 'success', text: result.message || '订阅成功！请查收验证邮件。' });
        setShowToast(true);
        setEmail('');
        setName('');
      } else {
        setToastMessage({ type: 'error', text: result.error?.message || '订阅失败，请稍后重试' });
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage({ type: 'error', text: '订阅失败，请稍后重试' });
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (compact) {
    return (
      <>
        <form className={styles.compactForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={styles.input}
              required
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : '订阅'}
            </button>
          </div>
        </form>
        
        {showToast && (
          <div className={styles.toastWrapper}>
            <Toast
              message={toastMessage.text}
              type={toastMessage.type}
              onClose={() => setShowToast(false)}
            />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>邮箱地址 *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className={styles.input}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>姓名（可选）</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="你的名字"
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className={styles.submitButtonFull}
          disabled={isSubmitting}
        >
          <span>{isSubmitting ? '提交中...' : '订阅 Newsletter'}</span>
          <span className="material-symbols-outlined">mail</span>
        </button>

        <p className={styles.privacy}>
          订阅即表示您同意接收我们的邮件通知。您可以随时取消订阅。
        </p>
      </form>
      
      {showToast && (
        <div className={styles.toastWrapper}>
          <Toast
            message={toastMessage.text}
            type={toastMessage.type}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
}
