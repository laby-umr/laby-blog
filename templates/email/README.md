# 邮件模板

此文件夹包含所有邮件模板的 TypeScript 文件。

## 文件说明

- `verification.ts` - 订阅验证邮件模板
- `welcome.ts` - 欢迎邮件模板
- `contact.ts` - 联系表单通知邮件模板

## 使用方法

这些模板文件会被 Supabase Edge Function 导入使用：

```typescript
import { getVerificationEmailHTML } from './templates/email/verification.ts'
import { getWelcomeEmailHTML } from './templates/email/welcome.ts'
import { getContactEmailHTML } from './templates/email/contact.ts'
```

## 部署到 Supabase

在 Supabase Edge Function 编辑器中：
1. 创建 `templates/email/` 文件夹结构
2. 上传这三个模板文件
3. 确保主 Edge Function 文件正确导入这些模板

## 样式说明

所有邮件模板使用 Laby Blog 的漫画风格设计：
- 主色：#314ff4 (蓝色)
- 辅色：#fae500 (黄色)
- 边框：4px solid #383833
- 字体：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
