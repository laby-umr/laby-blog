# Templates 模板文件

此文件夹包含项目的各种模板文件。

## 文件结构

```
templates/
├── email/              # 邮件模板
│   ├── contact.ts      # 联系表单邮件
│   ├── verification.ts # 验证邮件
│   ├── welcome.ts      # 欢迎邮件
│   └── README.md
└── edge-function.ts    # Supabase Edge Function 主文件
```

## Edge Function

### edge-function.ts

这是 Supabase Edge Function 的主文件，用于处理邮件发送服务。

**功能：**
- 接收邮件发送请求
- 根据类型调用不同的邮件模板
- 通过 Resend API 发送邮件
- 支持三种邮件类型：
  - `verification` - 订阅验证邮件
  - `welcome` - 欢迎邮件
  - `contact` - 联系表单通知邮件

**部署到 Supabase：**

1. 在 Supabase Dashboard 中创建 Edge Function：
   ```bash
   # 函数名称：dynamic-processor
   ```

2. 上传文件：
   - 主文件：`edge-function.ts` → 重命名为 `index.ts`
   - 邮件模板：`email/` 文件夹中的所有文件

3. 设置环境变量（Secrets）：
   ```
   RESEND_API_KEY=re_TYJN9QgP_fNV5Mjb1Jo2RM7MoJewpkx4z
   CONTACT_EMAIL=oilcake93@gmail.com
   ```

4. Edge Function URL：
   ```
   https://jylnfgiqxqqxbcpbqlkr.supabase.co/functions/v1/dynamic-processor
   ```

**文件结构（部署到 Supabase 后）：**
```
dynamic-processor/
├── index.ts                    # edge-function.ts 重命名
└── templates/
    └── email/
        ├── contact.ts
        ├── verification.ts
        └── welcome.ts
```

## Email Templates

邮件模板详细说明请查看 `email/README.md`

## 注意事项

- 所有模板文件使用 Laby 品牌样式
- 邮件模板使用内联 CSS 以确保兼容性
- Edge Function 需要在 Supabase Dashboard 中部署
- 环境变量必须在 Supabase 中配置，不要硬编码
