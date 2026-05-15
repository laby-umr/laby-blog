// ============================================
// Laby Newsletter 邮件发送服务
// Supabase Edge Function
// ============================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { getVerificationEmailHTML } from './templates/email/verification.ts'
import { getWelcomeEmailHTML } from './templates/email/welcome.ts'
import { getContactEmailHTML } from './templates/email/contact.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || 're_TYJN9QgP_fNV5Mjb1Jo2RM7MoJewpkx4z'
const CONTACT_EMAIL = Deno.env.get('CONTACT_EMAIL') || 'oilcake93@gmail.com'

// ============================================
// Edge Function 主函数
// ============================================

serve(async (req) => {
  // 处理 CORS 预检请求
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { type, to, name, verifyUrl, email, objective, message } = await req.json()

    let subject = ''
    let html = ''
    let recipient = to

    // 根据类型生成不同的邮件内容
    if (type === 'verification') {
      subject = '确认您的订阅 - Laby Blog'
      html = getVerificationEmailHTML(name || '', verifyUrl || '')
    } else if (type === 'welcome') {
      subject = '欢迎加入 Laby Blog'
      html = getWelcomeEmailHTML(name || '')
    } else if (type === 'contact') {
      // 联系表单邮件发送到配置的邮箱地址
      subject = `【${objective}】来自 ${name} 的消息 - Laby Blog`
      html = getContactEmailHTML(name || '', email || '', objective || '', message || '')
      recipient = CONTACT_EMAIL // 从环境变量读取
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid email type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // 调用 Resend API 发送邮件
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Laby <noreply@laby.top>',
        to: [recipient],
        subject,
        html,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Resend API error:', data)
      throw new Error(data.message || 'Failed to send email')
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})
