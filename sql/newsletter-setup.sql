-- ============================================
-- Newsletter 订阅系统数据库表
-- ============================================

-- 1. 订阅者表
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  
  -- 订阅状态
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),
  
  -- 验证
  verification_token TEXT UNIQUE,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- 订阅偏好
  preferences JSONB DEFAULT '{"blog": true, "tech": true, "updates": true}'::jsonb,
  
  -- 时间戳
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  
  -- 元数据
  source TEXT, -- 订阅来源（footer, sidebar, popup）
  ip_address TEXT,
  user_agent TEXT
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(verification_token);

-- 2. Newsletter 活动表
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- 状态
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent')),
  
  -- 统计
  total_sent INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_clicked INTEGER DEFAULT 0,
  
  -- 时间
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. 邮件日志表
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES subscribers(id),
  campaign_id UUID REFERENCES newsletter_campaigns(id),
  
  email_type TEXT NOT NULL, -- 'verification', 'welcome', 'newsletter', 'unsubscribe_confirm'
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'opened', 'clicked')),
  
  error_message TEXT,
  
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_email_logs_subscriber ON email_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign ON email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);

-- 禁用 RLS（允许匿名访问）
ALTER TABLE subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_campaigns DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs DISABLE ROW LEVEL SECURITY;

-- 完成
SELECT 'Newsletter tables created successfully!' as message;
