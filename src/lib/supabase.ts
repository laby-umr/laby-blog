import { createClient } from '@supabase/supabase-js';

// Supabase 配置
// Docusaurus 在构建时会注入环境变量，在浏览器中直接使用硬编码的值
const supabaseUrl = 'https://jylnfgiqxqqxbcpbqlkr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5bG5mZ2lxeHFxeGJjcGJxbGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NzYzMjksImV4cCI6MjA5NDM1MjMyOX0.R3LNMlRS-aP6N6LwuEyQ3ol25zd-X-jW1ArLa8OHBIw';

// 创建 Supabase 客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 联系表单数据类型
export interface ContactFormData {
  name: string;
  email: string;
  objective: string;
  message: string;
  created_at?: string;
}

// 提交联系表单到 Supabase
export async function submitContactForm(data: ContactFormData) {
  try {
    // 1. 保存到数据库
    const { data: result, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: data.name,
          email: data.email,
          objective: data.objective,
          message: data.message,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    // 2. 发送邮件通知
    try {
      const EDGE_FUNCTION_URL = 'https://jylnfgiqxqqxbcpbqlkr.supabase.co/functions/v1/dynamic-processor';
      
      const emailResponse = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          type: 'contact',
          name: data.name,
          email: data.email,
          objective: data.objective,
          message: data.message
        })
      });

      if (!emailResponse.ok) {
        console.error('Failed to send email notification:', await emailResponse.text());
        // 邮件发送失败不影响表单提交成功
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // 邮件发送失败不影响表单提交成功
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return { success: false, error };
  }
}

// ============================================
// Newsletter 订阅功能
// ============================================

// 订阅者数据类型
export interface SubscriberData {
  email: string;
  name?: string;
  source?: string; // 'footer' | 'sidebar' | 'popup'
  preferences?: {
    blog?: boolean;
    tech?: boolean;
    updates?: boolean;
  };
}

// 生成验证 token
function generateVerificationToken(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 订阅 Newsletter
export async function subscribeNewsletter(data: SubscriberData) {
  try {
    console.log('开始订阅:', data);
    
    // 检查邮箱是否已存在
    const { data: existing, error: queryError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', data.email)
      .maybeSingle(); // 使用 maybeSingle 而不是 single，避免没有结果时报错

    console.log('现有订阅者:', existing, '查询错误:', queryError);

    if (existing) {
      // 如果已经是活跃订阅者
      if (existing.status === 'active') {
        return { success: false, error: { message: '该邮箱已订阅' } };
      }
      
      // 如果是 pending 状态，重新发送验证邮件
      if (existing.status === 'pending') {
        console.log('重新发送验证邮件');
        await sendVerificationEmail(data.email, existing.verification_token, data.name);
        return { success: true, message: '验证邮件已重新发送，请查收' };
      }
      
      // 如果之前取消订阅，重新激活
      if (existing.status === 'unsubscribed') {
        const token = generateVerificationToken();
        const { error } = await supabase
          .from('subscribers')
          .update({
            status: 'pending',
            verification_token: token,
            subscribed_at: new Date().toISOString()
          })
          .eq('email', data.email);

        if (error) {
          console.error('更新订阅者失败:', error);
          throw error;
        }

        // 发送验证邮件
        console.log('发送验证邮件到:', data.email);
        await sendVerificationEmail(data.email, token, data.name);
        
        return { success: true, message: '请查收验证邮件' };
      }
    }

    // 新订阅者
    const token = generateVerificationToken();
    console.log('生成 token:', token);
    
    const { data: insertResult, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email: data.email,
          name: data.name,
          status: 'pending',
          verification_token: token,
          source: data.source || 'unknown',
          preferences: data.preferences || { blog: true, tech: true, updates: true }
        }
      ])
      .select();

    console.log('插入结果:', insertResult, '错误:', error);

    if (error) {
      console.error('插入订阅者失败:', error);
      throw error;
    }

    // 发送验证邮件
    console.log('发送验证邮件到:', data.email);
    const emailResult = await sendVerificationEmail(data.email, token, data.name);
    console.log('邮件发送结果:', emailResult);

    return { success: true, message: '请查收验证邮件' };
  } catch (error) {
    console.error('订阅失败:', error);
    return { success: false, error };
  }
}

// 验证订阅
export async function verifySubscription(token: string) {
  try {
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (error || !subscriber) {
      return { success: false, error: { message: '无效的验证链接' } };
    }

    if (subscriber.status === 'active') {
      return { success: false, error: { message: '该邮箱已验证' } };
    }

    // 更新为已验证
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        status: 'active',
        verified_at: new Date().toISOString()
      })
      .eq('verification_token', token);

    if (updateError) throw updateError;

    // 发送欢迎邮件
    await sendWelcomeEmail(subscriber.email, subscriber.name);

    return { success: true, message: '订阅成功！' };
  } catch (error) {
    console.error('Failed to verify subscription:', error);
    return { success: false, error };
  }
}

// 取消订阅
export async function unsubscribe(email: string) {
  try {
    const { error } = await supabase
      .from('subscribers')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email);

    if (error) throw error;

    return { success: true, message: '已取消订阅' };
  } catch (error) {
    console.error('Failed to unsubscribe:', error);
    return { success: false, error };
  }
}

// 更新订阅偏好
export async function updatePreferences(email: string, preferences: any) {
  try {
    const { error } = await supabase
      .from('subscribers')
      .update({ preferences })
      .eq('email', email);

    if (error) throw error;

    return { success: true, message: '偏好已更新' };
  } catch (error) {
    console.error('Failed to update preferences:', error);
    return { success: false, error };
  }
}

// ============================================
// 邮件发送功能（调用 Supabase Edge Function）
// ============================================

const EDGE_FUNCTION_URL = 'https://jylnfgiqxqqxbcpbqlkr.supabase.co/functions/v1/dynamic-processor';

// 发送验证邮件
async function sendVerificationEmail(email: string, token: string, name?: string) {
  try {
    const verifyUrl = `${window.location.origin}/newsletter/verify?token=${token}`;
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        type: 'verification',
        to: email,
        name,
        verifyUrl
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}

// 发送欢迎邮件
async function sendWelcomeEmail(email: string, name?: string) {
  try {
    const unsubscribeUrl = `${window.location.origin}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
    
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`
      },
      body: JSON.stringify({
        type: 'welcome',
        to: email,
        name,
        unsubscribeUrl
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

// ============================================
// 访客追踪功能
// ============================================

// 访客信息类型
export interface VisitorLog {
  page_url: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  session_id?: string;
  is_new_visitor?: boolean;
  duration?: number;
}

// 获取浏览器信息
function getBrowserInfo() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';
  let deviceType = 'Desktop';

  // 检测浏览器
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';

  // 检测操作系统
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  // 检测设备类型
  if (/Mobile|Android|iPhone/i.test(ua)) deviceType = 'Mobile';
  else if (/Tablet|iPad/i.test(ua)) deviceType = 'Tablet';

  return { browser, os, deviceType };
}

// 获取或创建会话ID
function getSessionId(): string {
  const key = 'visitor_session_id';
  let sessionId = sessionStorage.getItem(key);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  
  return sessionId;
}

// 检查是否是新访客
function isNewVisitor(): boolean {
  const key = 'visitor_returning';
  const returning = localStorage.getItem(key);
  
  if (!returning) {
    localStorage.setItem(key, 'true');
    return true;
  }
  
  return false;
}

// 记录访客信息
export async function logVisitor(customData?: Partial<VisitorLog>) {
  try {
    const { browser, os, deviceType } = getBrowserInfo();
    const sessionId = getSessionId();
    const isNew = isNewVisitor();

    const visitorData: VisitorLog = {
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer || 'Direct',
      user_agent: navigator.userAgent,
      browser,
      os,
      device_type: deviceType,
      session_id: sessionId,
      is_new_visitor: isNew,
      duration: 0,
      ...customData
    };

    const { error } = await supabase
      .from('visitor_logs')
      .insert([visitorData]);

    if (error) {
      console.error('Failed to log visitor:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error logging visitor:', error);
    return { success: false, error };
  }
}

// 更新访问时长
export async function updateVisitorDuration(sessionId: string, duration: number) {
  try {
    const { error } = await supabase
      .from('visitor_logs')
      .update({ duration })
      .eq('session_id', sessionId)
      .order('visited_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Failed to update duration:', error);
    }
  } catch (error) {
    console.error('Error updating duration:', error);
  }
}

