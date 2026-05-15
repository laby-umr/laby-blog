# Templates 模板文件

此文件夹包含 Supabase Edge Function 和邮件模板文件。

## 文件结构

```
templates/
├── index.ts                  # Edge Function 主文件
├── email-verification.ts     # 验证邮件模板
├── email-welcome.ts          # 欢迎邮件模板
├── email-contact.ts          # 联系表单邮件模板
└── README.md                 # 本文档
```

## Edge Function 主文件

### index.ts

Supabase Edge Function 的主文件，用于处理邮件发送服务。

**功能：**
- 接收邮件发送请求
- 根据类型调用不同的邮件模板
- 通过 Resend API 发送邮件
- 支持三种邮件类型：
  - `verification` - 订阅验证邮件
  - `welcome` - 欢迎邮件
  - `contact` - 联系表单通知邮件

## 邮件模板文件

### email-verification.ts
订阅验证邮件模板
- 用户订阅后发送
- 包含验证链接
- 引导用户点击确认订阅

### email-welcome.ts
欢迎邮件模板
- 验证成功后自动发送
- 介绍 Laby Blog 内容
- 包含取消订阅链接

### email-contact.ts
联系表单通知邮件模板
- 用户提交联系表单后发送
- 发送到管理员邮箱
- 包含用户信息和消息内容

## 部署到 Supabase

### 1. 创建 Edge Function

在 Supabase Dashboard 中创建名为 `dynamic-processor` 的 Edge Function

### 2. 上传文件

**所有文件上传到同一层目录（不需要创建子文件夹）：**

```
dynamic-processor/
├── index.ts                  # 上传 templates/index.ts
├── email-verification.ts     # 上传 templates/email-verification.ts
├── email-welcome.ts          # 上传 templates/email-welcome.ts
└── email-contact.ts          # 上传 templates/email-contact.ts
```

### 3. 设置环境变量（Secrets）

在 Supabase Edge Function 设置中添加：

```
RESEND_API_KEY=re_TYJN9QgP_fNV5Mjb1Jo2RM7MoJewpkx4z
CONTACT_EMAIL=oilcake93@gmail.com
```

### 4. Edge Function URL

部署后的访问地址：
```
https://jylnfgiqxqqxbcpbqlkr.supabase.co/functions/v1/dynamic-processor
```

## 邮件模板样式

所有邮件模板使用 Laby 品牌样式：
- 主色：`#314ff4` (蓝色)
- 辅色：`#fae500` (黄色)
- 深色：`#383833` (深灰)
- 背景：`#fefcf4` (米白)

邮件模板使用内联 CSS 以确保在各种邮件客户端中的兼容性。

## 注意事项

- ✅ 所有文件在同一层，无需创建子文件夹
- ✅ 文件命名统一：`index.ts`、`email-*.ts`
- ✅ 环境变量必须在 Supabase 中配置
- ✅ 不要在代码中硬编码敏感信息
- ✅ 邮件模板不包含 emoji，保持专业风格
