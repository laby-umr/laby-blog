# SQL 脚本

此文件夹包含 Supabase 数据库的 SQL 脚本。

## 文件说明

- `newsletter-setup.sql` - Newsletter 订阅系统的数据库表结构（仅 Newsletter 功能）
- `complete-setup.sql` - **完整数据库表结构**（推荐使用，包含所有功能）

## 使用方法

### 推荐：使用完整安装脚本

1. 登录 Supabase Dashboard
2. 进入 SQL Editor
3. 复制 `complete-setup.sql` 的内容
4. 执行脚本创建所有表

### 或：分别安装

如果只需要 Newsletter 功能，可以只执行 `newsletter-setup.sql`

## 表结构说明

### complete-setup.sql 包含所有表：

#### 1. Newsletter 订阅系统（3个表）

**subscribers** - 订阅者表
- 存储订阅者信息（邮箱、姓名）
- 订阅状态：pending（待验证）、active（已激活）、unsubscribed（已取消）
- 验证 token 和验证时间
- 订阅偏好设置（blog、tech、updates）
- 订阅来源、IP 地址、User Agent

**newsletter_campaigns** - Newsletter 活动表
- 管理邮件发送活动
- 活动标题、主题、内容
- 状态：draft（草稿）、scheduled（已计划）、sending（发送中）、sent（已发送）
- 统计数据：发送数、打开数、点击数
- **注：此表为未来群发 Newsletter 功能预留，当前未使用**

**email_logs** - 邮件日志表
- 记录所有邮件发送历史
- 邮件类型：verification（验证）、welcome（欢迎）、newsletter（通讯）、unsubscribe_confirm（取消确认）
- 发送状态：pending、sent、failed、opened、clicked
- 关联订阅者和活动
- **注：此表为邮件发送日志功能预留，当前未使用**

#### 2. 联系表单系统（1个表）

**contact_messages** - 联系表单消息表
- 存储用户通过联系表单提交的消息
- 姓名、邮箱、任务目标、消息内容
- 状态字段：
  - `read` (BOOLEAN) - 是否已读，默认 false
  - `replied` (BOOLEAN) - 是否已回复，默认 false
- 时间戳：创建时间

#### 3. 访客统计系统（1个表）

**visitor_logs** - 访客日志表
- 记录网站访客信息
- 页面信息：URL、标题、来源
- Session ID、User Agent
- 设备信息：浏览器、操作系统、设备类型
- `is_new_visitor` (BOOLEAN) - 是否新访客，默认 true
- 访问时长（秒）
- 访问时间戳
- 用于统计分析

## 注意事项

- 所有表都已禁用 RLS（Row Level Security），允许匿名访问
- 使用 UUID 作为主键
- 时间戳使用 UTC 时区
- 邮箱字段有唯一约束
- 验证 token 有唯一约束
- 已创建必要的索引以优化查询性能

## 数据库关系

```
subscribers (订阅者)
    ↓
email_logs (邮件日志) ← newsletter_campaigns (活动)

contact_messages (联系消息) - 独立表

visitor_logs (访客日志) - 独立表
```


