-- ============================================
-- Laby Blog 完整数据库表结构
-- ============================================
-- 包含所有功能的数据库表：Newsletter、联系表单、访客统计

-- ============================================
-- 1. 访客统计系统
-- ============================================

CREATE TABLE IF NOT EXISTS public.visitor_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  page_url TEXT NOT NULL,
  page_title TEXT NULL,
  referrer TEXT NULL,
  user_agent TEXT NULL,
  browser TEXT NULL,
  os TEXT NULL,
  device_type TEXT NULL,
  session_id TEXT NULL,
  is_new_visitor BOOLEAN NULL DEFAULT true,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  duration INTEGER NULL DEFAULT 0,
  CONSTRAINT visitor_logs_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_visitor_logs_visited_at ON public.visitor_logs USING btree (visited_at DESC) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_visitor_logs_session_id ON public.visitor_logs USING btree (session_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_visitor_logs_page_url ON public.visitor_logs USING btree (page_url) TABLESPACE pg_default;

-- ============================================
-- 2. Newsletter 订阅系统
-- ============================================

-- 订阅者表
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NULL,
  status TEXT NULL DEFAULT 'pending'::text,
  verification_token TEXT NULL,
  verified_at TIMESTAMP WITH TIME ZONE NULL,
  preferences JSONB NULL DEFAULT '{"blog": true, "tech": true, "updates": true}'::jsonb,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  unsubscribed_at TIMESTAMP WITH TIME ZONE NULL,
  source TEXT NULL,
  ip_address TEXT NULL,
  user_agent TEXT NULL,
  CONSTRAINT subscribers_pkey PRIMARY KEY (id),
  CONSTRAINT subscribers_email_key UNIQUE (email),
  CONSTRAINT subscribers_verification_token_key UNIQUE (verification_token),
  CONSTRAINT subscribers_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'active'::text, 'unsubscribed'::text])))
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers USING btree (email) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers USING btree (status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON public.subscribers USING btree (verification_token) TABLESPACE pg_default;

-- Newsletter 活动表
CREATE TABLE IF NOT EXISTS public.newsletter_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT NULL DEFAULT 'draft'::text,
  total_sent INTEGER NULL DEFAULT 0,
  total_opened INTEGER NULL DEFAULT 0,
  total_clicked INTEGER NULL DEFAULT 0,
  scheduled_at TIMESTAMP WITH TIME ZONE NULL,
  sent_at TIMESTAMP WITH TIME ZONE NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT newsletter_campaigns_pkey PRIMARY KEY (id),
  CONSTRAINT newsletter_campaigns_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'scheduled'::text, 'sending'::text, 'sent'::text])))
) TABLESPACE pg_default;

-- 邮件日志表
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  subscriber_id UUID NULL,
  campaign_id UUID NULL,
  email_type TEXT NOT NULL,
  status TEXT NULL DEFAULT 'pending'::text,
  error_message TEXT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT email_logs_pkey PRIMARY KEY (id),
  CONSTRAINT email_logs_campaign_id_fkey FOREIGN KEY (campaign_id) REFERENCES newsletter_campaigns (id),
  CONSTRAINT email_logs_subscriber_id_fkey FOREIGN KEY (subscriber_id) REFERENCES subscribers (id),
  CONSTRAINT email_logs_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'sent'::text, 'failed'::text, 'opened'::text, 'clicked'::text])))
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_email_logs_subscriber ON public.email_logs USING btree (subscriber_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_email_logs_campaign ON public.email_logs USING btree (campaign_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON public.email_logs USING btree (email_type) TABLESPACE pg_default;

-- ============================================
-- 3. 联系表单系统
-- ============================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  objective TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  read BOOLEAN NULL DEFAULT false,
  replied BOOLEAN NULL DEFAULT false,
  CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages USING btree (created_at DESC) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON public.contact_messages USING btree (read) TABLESPACE pg_default;

-- ============================================
-- 禁用 RLS（允许匿名访问）
-- ============================================

ALTER TABLE public.visitor_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_campaigns DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 完成
-- ============================================

SELECT 'All tables created successfully!' as message;
SELECT 'Total tables: 5' as info;
SELECT '- visitor_logs (访客日志)' as table_1;
SELECT '- subscribers (订阅者)' as table_2;
SELECT '- newsletter_campaigns (Newsletter活动)' as table_3;
SELECT '- email_logs (邮件日志)' as table_4;
SELECT '- contact_messages (联系消息)' as table_5;
