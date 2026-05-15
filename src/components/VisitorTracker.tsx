import { useEffect, useRef } from 'react';
import { logVisitor, updateVisitorDuration } from '../lib/supabase';

export default function VisitorTracker() {
  const startTimeRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    // 记录访客进入
    const trackVisit = async () => {
      const result = await logVisitor();
      if (result.success) {
        console.log('✅ 访客信息已记录');
      }
    };

    trackVisit();

    // 获取会话ID
    const sessionId = sessionStorage.getItem('visitor_session_id') || '';
    sessionIdRef.current = sessionId;

    // 页面卸载时更新停留时长
    const handleBeforeUnload = () => {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (sessionId && duration > 0) {
        // 使用 sendBeacon 确保数据发送
        updateVisitorDuration(sessionId, duration);
      }
    };

    // 定期更新停留时长（每30秒）
    const intervalId = setInterval(() => {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (sessionId && duration > 0) {
        updateVisitorDuration(sessionId, duration);
      }
    }, 30000);

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      
      // 组件卸载时也更新一次
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (sessionId && duration > 0) {
        updateVisitorDuration(sessionId, duration);
      }
    };
  }, []);

  return null; // 不渲染任何内容
}
