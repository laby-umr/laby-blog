---
sidebar_position: 1
title: 文档模板
description: 完整的文档模板，包含所有可用的格式、样式和组件
tags: [模板, 文档, 组件]
keywords: [文档模板, Markdown, MDX, 组件]
authors: [Laby]
last_update:
  date: 2026-04-24
  author: Laby
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 文档模板

这是一个完整的文档模板，展示了所有可用的功能。在 Docusaurus 中，`.md` 和 `.mdx` 文件功能完全相同，都可以使用 JSX 组件。

:::tip 核心价值
**完整模板 = Markdown 语法 + JSX 组件 + 样式定制 + 最佳实践**
- **Markdown 语法**：所有标准 Markdown 功能
- **JSX 组件**：Tabs、Admonition 等组件
- **数据展示**：表格、图表和对比
- **样式定制**：内联样式和 HTML
:::

---

## 一、文档元数据（Front Matter）

每个文档开头都应该包含元数据：

```yaml
---
sidebar_position: 1          # 侧边栏位置
title: 文档标题              # 页面标题
description: 文档描述        # SEO 描述
tags: [标签1, 标签2]         # 文档标签
keywords: [关键词1, 关键词2] # SEO 关键词
authors: [Laby]              # 作者
last_update:                 # 最后更新
  date: 2026-04-24
  author: Laby
---
```

---

## 二、标题层级

# 一级标题 (H1) - 通常用于文档标题

## 二级标题 (H2) - 主要章节

### 三级标题 (H3) - 子章节

#### 四级标题 (H4) - 小节

##### 五级标题 (H5) - 更小的节

###### 六级标题 (H6) - 最小的节

---

## 三、文本格式

### 3.1 基本文本样式

这是普通文本。

**这是粗体文本**

*这是斜体文本*

***这是粗斜体文本***

~~这是删除线文本~~

`这是行内代码`

这是一个[链接](https://example.com)

这是一个[带标题的链接](https://example.com "链接标题")

### 3.2 列表

**无序列表：**

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
    - 子子项目 2.2.1
- 项目 3

**有序列表：**

1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项

**任务列表：**

- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个未完成的任务

### 3.3 引用

> 这是一个引用块
> 
> 可以包含多行文本
> 
> > 这是嵌套的引用

---

## 四、Admonition（提示框）

Docusaurus 提供了多种提示框样式，在 `.md` 文件中也可以使用：

:::note
这是一个注意提示框，用于一般性说明。
:::

:::tip
这是一个提示框，用于提供有用的建议或技巧。
:::

:::info
这是一个信息提示框，用于提供额外的信息。
:::

:::warning
这是一个警告提示框，用于提醒用户注意潜在问题。
:::

:::danger
这是一个危险提示框，用于警告严重问题或错误。
:::

:::caution
这是一个注意提示框，用于提醒用户小心操作。
:::

### 4.1 自定义标题的提示框

:::tip 最佳实践
使用自定义标题可以让提示框更加醒目和有针对性。
:::

:::info 扩展阅读
可以在提示框中添加 emoji 图标，使其更加生动。
:::

:::warning 性能陷阱
注意避免在循环中进行大量的 DOM 操作！
:::

:::danger 常见错误
不要在生产环境中使用 console.log 调试代码。
:::

---

## 五、代码块

### 5.1 基本代码块

```javascript
// JavaScript 代码示例
function greet(name) {
  console.log(`Hello, ${name}!`)
}

greet('World')
```

```python
# Python 代码示例
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

```typescript
// TypeScript 代码示例
interface User {
  name: string
  age: number
}

const user: User = {
  name: 'Alice',
  age: 30
}
```

### 5.2 带标题的代码块

```jsx title="src/components/Button.jsx"
import React from 'react'

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="custom-button">
      {children}
    </button>
  )
}
```

### 5.3 高亮特定行

```javascript {2,4-6}
function calculateSum(a, b) {
  // 这一行会被高亮
  const sum = a + b
  // 这些行也会被高亮
  console.log('Sum:', sum)
  return sum
}
```

### 5.4 显示行号

```javascript showLineNumbers
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(10))
```

---

## 六、表格

### 6.1 基本表格

| 特性 | React | Vue | Angular |
|------|-------|-----|---------|
| 学习曲线 | 中等 | 简单 | 陡峭 |
| 性能 | 优秀 | 优秀 | 良好 |
| 生态系统 | 丰富 | 丰富 | 完整 |
| TypeScript | 支持 | 支持 | 原生 |

### 6.2 对齐方式

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:-------:|-------:|
| 左 | 中 | 右 |
| Left | Center | Right |
| 1 | 2 | 3 |

### 6.3 包含代码和图标的表格

| 方法 | 语法 | 说明 | 状态 |
|------|------|------|------|
| `push()` | `arr.push(item)` | 在数组末尾添加元素 | 推荐 |
| `pop()` | `arr.pop()` | 删除并返回数组最后一个元素 | 推荐 |
| `shift()` | `arr.shift()` | 删除并返回数组第一个元素 | 慎用 |
| `unshift()` | `arr.unshift(item)` | 在数组开头添加元素 | 慎用 |

### 6.4 对比表格

| 特性 | 方案 A | 方案 B | 方案 C | 推荐 |
|:-----|:------:|:------:|:------:|:----:|
| **性能** | 优秀<br/>5星 | 良好<br/>4星 | 一般<br/>3星 | A |
| **易用性** | 中等<br/>3星 | 简单<br/>5星 | 中等<br/>3星 | B |
| **成本** | 高 | 中 | 低 | C |
| **可扩展性** | 支持 | 支持 | 不支持 | A/B |

---

## 七、图片和媒体

### 7.1 基本图片

<img src="/img/home/rem-blue.jpg" alt="蕾姆" width="300" />

*图片说明：来自《Re:从零开始的异世界生活》的蕾姆*

### 7.2 带链接的图片

<a href="/img/home/rengoku2.jpg">
  <img src="/img/home/rengoku.jpg" alt="点击查看炎柱" width="300" />
</a>

*点击图片查看炎柱炼狱杏寿郎的另一张图片*

### 7.3 指定图片大小

<img src="/img/home/shinobu.jpg" alt="蝴蝶忍" width="250" />

*图片说明：虫柱蝴蝶忍*

---

## 八、链接和引用

### 8.1 外部链接

访问 [Docusaurus 官网](https://docusaurus.io/)

### 8.2 内部链接

<!-- 查看 [其他文档](./another-doc) -->
查看其他文档示例

### 8.3 锚点链接

跳转到 [代码块章节](#五代码块)

---

## 九、分隔线

使用三个或更多的连字符、星号或下划线创建分隔线：

---

***

___

---

## 十、常用 Emoji 图标

### 10.1 状态图标

- ✅ 成功/完成
- ❌ 失败/错误
- ⚠️ 警告
- 🚫 禁止
- ℹ️ 信息
- 💡 提示/想法
- 📌 重要

### 10.2 技术图标

- 🎯 目标/重点
- ⚡ 性能/快速
- 🔥 热门/流行
- 🚀 发布/启动
- 🔧 工具/配置
- 📊 数据/统计
- 🎨 设计/样式
- 📚 文档/学习
- 🔍 搜索/查找
- 🔄 更新/同步

### 10.3 评分图标

- ⭐ 星级评分
- 🟢 绿色/良好
- 🟡 黄色/警告
- 🔴 红色/危险
- 💰 成本/价格

---

## 十一、嵌套内容示例

### 11.1 提示框中的代码

:::tip 代码示例
```javascript
// 在提示框中展示代码
function example() {
  console.log('这是提示框中的代码')
}
```
:::

### 11.2 提示框中的列表

:::info 功能列表
- 支持 Markdown
- 支持代码高亮
- 支持多种主题
- 支持图片和表格
- 不支持 JSX 组件（需要 .mdx）
:::

### 11.3 提示框中的表格

:::warning 性能对比

| 操作 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 查找 | O(n) | O(1) |
| 插入 | O(1) | O(1) |
| 删除 | O(n) | O(1) |

:::

---

## 十二、实际应用示例

### 12.1 API 文档示例

:::info API 端点
**GET** `/api/users/:id`

获取指定用户的详细信息。

**参数：**
- `id` (string, required): 用户 ID

**响应：**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```
:::

### 12.2 配置文件示例

**package.json 配置：**

```json title="package.json"
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### 12.3 步骤说明

:::tip 安装步骤

1. **安装 Node.js**
   ```bash
   # 下载并安装 Node.js
   https://nodejs.org/
   ```

2. **创建项目**
   ```bash
   npx create-react-app my-app
   cd my-app
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

:::

---

## 十三、最佳实践

:::tip 文档编写建议

**结构清晰：**
- 使用合理的标题层级
- 每个章节有明确的主题
- 使用分隔线区分不同部分

**代码完整：**
- 提供可运行的完整代码
- 添加必要的注释
- 使用语法高亮

**视觉丰富：**
- 使用表格展示对比数据
- 使用提示框突出重要信息
- 使用 Emoji 增加可读性

**实例充分：**
- 提供真实的使用场景
- 包含常见问题的解决方案
- 展示最佳实践

**保持更新：**
- 定期更新文档内容
- 标注最后更新时间
- 记录版本变更

:::

---

## 十四、Tabs 组件（标签页）

在 Docusaurus 中，`.md` 文件也可以使用 JSX 组件！只需在文件开头导入即可。

### 14.1 基本 Tabs 示例

<Tabs>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 示例
function greet(name) {
  console.log(`Hello, ${name}!`)
}

greet('World')
```

</TabItem>
<TabItem value="typescript" label="TypeScript">

```typescript
// TypeScript 示例
function greet(name: string): void {
  console.log(`Hello, ${name}!`)
}

greet('World')
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Python 示例
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

</TabItem>
</Tabs>

### 14.2 默认选中的 Tabs

<Tabs defaultValue="vue">
<TabItem value="vue" label="Vue 3">

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="updateMessage">Update</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3!')

const updateMessage = () => {
  message.value = 'Updated!'
}
</script>
```

</TabItem>
<TabItem value="react" label="React">

```jsx
import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('Hello React!')
  
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage('Updated!')}>
        Update
      </button>
    </div>
  )
}
```

</TabItem>
<TabItem value="angular" label="Angular">

```typescript
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ message }}</h1>
      <button (click)="updateMessage()">Update</button>
    </div>
  `
})
export class AppComponent {
  message = 'Hello Angular!'
  
  updateMessage() {
    this.message = 'Updated!'
  }
}
```

</TabItem>
</Tabs>

### 14.3 Tabs 中嵌套 Admonition

<Tabs>
<TabItem value="best" label="最佳实践">

:::tip 推荐做法
使用 `const` 和 `let` 声明变量，避免使用 `var`。

```javascript
// 推荐
const PI = 3.14159
let count = 0

// 不推荐
var oldStyle = 'avoid this'
```
:::

</TabItem>
<TabItem value="avoid" label="应避免">

:::danger 常见错误
不要在循环中使用 `var` 声明变量，会导致作用域问题。

```javascript
// 错误示例
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100)
}
// 输出：5 5 5 5 5

// 正确示例
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100)
}
// 输出：0 1 2 3 4
```
:::

</TabItem>
<TabItem value="performance" label="性能优化">

:::info 性能提示
使用 `Object.freeze()` 可以防止对象被修改，提升性能。

```javascript
const config = Object.freeze({
  API_URL: 'https://api.example.com',
  TIMEOUT: 5000
})

// 尝试修改会失败（严格模式下会报错）
config.API_URL = 'https://other.com' // 无效
```
:::

</TabItem>
</Tabs>

### 14.4 复杂嵌套：Tabs → Admonition → Code → Table

<Tabs>
<TabItem value="comparison" label="框架对比">

:::info 主流前端框架对比

下面是 React、Vue 和 Angular 的详细对比：

| 特性 | React | Vue | Angular |
|:-----|:-----:|:---:|:-------:|
| **学习曲线** | 中等 | 简单 | 陡峭 |
| **性能** | 5星 | 5星 | 4星 |
| **生态系统** | 非常丰富 | 丰富 | 完整但封闭 |
| **TypeScript** | 支持 | 支持 | 原生 |
| **包体积** | 42KB | 34KB | 167KB |

**代码示例：**

```javascript
// React 组件
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

// Vue 组件
const Counter = {
  data: () => ({ count: 0 }),
  template: '<button @click="count++">{{ count }}</button>'
}

// Angular 组件
@Component({
  template: '<button (click)="increment()">{{ count }}</button>'
})
class Counter {
  count = 0
  increment() { this.count++ }
}
```

:::

</TabItem>
<TabItem value="images" label="角色展示">

:::tip Re:从零开始的异世界生活

**主要角色：**

<div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <img src="/img/home/rem-blue.jpg" alt="蕾姆" width="150" />
    <p><strong>蕾姆</strong></p>
    <p>温柔体贴的鬼族女仆</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <img src="/img/home/ram.jpg" alt="拉姆" width="150" />
    <p><strong>拉姆</strong></p>
    <p>毒舌傲娇的姐姐</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <img src="/img/home/emilia.jpg" alt="爱蜜莉雅" width="150" />
    <p><strong>爱蜜莉雅</strong></p>
    <p>银发半精灵女主角</p>
  </div>
</div>

**角色特点对比：**

| 角色 | 性格 | 能力 | 人气 |
|:-----|:----:|:----:|:----:|
| 蕾姆 | 温柔、忠诚 | 鬼化、流星锤 | 5星 |
| 拉姆 | 毒舌、傲娇 | 风魔法 | 4星 |
| 爱蜜莉雅 | 善良、坚强 | 冰魔法 | 5星 |

:::

</TabItem>
<TabItem value="hashira" label="鬼灭之刃·柱">

:::danger 鬼杀队·九柱

**炎柱 - 炼狱杏寿郎**

<img src="/img/home/rengoku.jpg" alt="炎柱" width="200" />

```
"心を燃やせ！"（让心燃烧起来！）
```

**特点：**
- 呼吸法：炎之呼吸
- 性格：热血、正义
- 实力：上弦之参级别
- 名场面：无限列车篇

---

**虫柱 - 蝴蝶忍**

<img src="/img/home/shinobu.jpg" alt="虫柱" width="200" />

```
"あら、あら"（哎呀，哎呀）
```

**特点：**
- 呼吸法：虫之呼吸
- 性格：温柔、腹黑
- 特技：毒药专家
- 名场面：与童磨的战斗

---

**水柱 - 富冈义勇**

<img src="/img/home/giyuu.jpg" alt="水柱" width="200" />

```
"俺は嫌われていない"（我没有被讨厌）
```

**特点：**
- 呼吸法：水之呼吸
- 性格：寡言、冷静
- 实力：最强柱之一
- 名场面：与炭治郎的初遇

:::

</TabItem>
</Tabs>

---

## 十五、高级嵌套示例

### 15.1 三层嵌套：Tabs → Admonition → Tabs

<Tabs>
<TabItem value="frontend" label="前端开发">

:::tip 前端技术栈

<Tabs>
<TabItem value="html" label="HTML">

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的网页</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

</TabItem>
<TabItem value="css" label="CSS">

```css
/* 现代 CSS 布局 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
```

</TabItem>
<TabItem value="js" label="JavaScript">

```javascript
// 现代 JavaScript 特性
const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// 使用
const users = await fetchData('/api/users')
console.log(users)
```

</TabItem>
</Tabs>

:::

</TabItem>
<TabItem value="backend" label="后端开发">

:::info 后端技术栈

<Tabs>
<TabItem value="nodejs" label="Node.js">

```javascript
// Express.js 服务器
const express = require('express')
const app = express()

app.use(express.json())

app.get('/api/users', async (req, res) => {
  const users = await db.users.findAll()
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

</TabItem>
<TabItem value="python" label="Python">

```python
# FastAPI 服务器
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.get("/api/users")
async def get_users():
    users = await db.users.find_all()
    return users

@app.post("/api/users")
async def create_user(user: User):
    new_user = await db.users.create(user)
    return new_user
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Spring Boot 控制器
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.create(user);
    }
}
```

</TabItem>
</Tabs>

:::

</TabItem>
<TabItem value="database" label="数据库">

:::warning 数据库操作

<Tabs>
<TabItem value="sql" label="SQL">

```sql
-- 创建用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查询用户
SELECT * FROM users WHERE email LIKE '%@example.com';

-- 更新用户
UPDATE users SET name = 'New Name' WHERE id = 1;

-- 删除用户
DELETE FROM users WHERE id = 1;
```

</TabItem>
<TabItem value="mongodb" label="MongoDB">

```javascript
// MongoDB 操作
const { MongoClient } = require('mongodb')

// 连接数据库
const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const db = client.db('myapp')

// 插入文档
await db.collection('users').insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
})

// 查询文档
const users = await db.collection('users').find({
  email: { $regex: /@example\.com$/ }
}).toArray()

// 更新文档
await db.collection('users').updateOne(
  { _id: userId },
  { $set: { name: 'New Name' } }
)
```

</TabItem>
<TabItem value="redis" label="Redis">

```javascript
// Redis 操作
const redis = require('redis')
const client = redis.createClient()

await client.connect()

// 字符串操作
await client.set('user:1:name', 'John Doe')
const name = await client.get('user:1:name')

// 哈希操作
await client.hSet('user:1', {
  name: 'John Doe',
  email: 'john@example.com'
})

// 列表操作
await client.lPush('tasks', 'Task 1')
await client.lPush('tasks', 'Task 2')

// 设置过期时间
await client.expire('user:1:session', 3600)
```

</TabItem>
</Tabs>

:::

</TabItem>
</Tabs>

---

## 十六、快速复制模板

下面是一个简洁的文档模板，可以直接复制使用：

```markdown
---
sidebar_position: 1
title: 文档标题
description: 文档描述
tags: [标签]
---

# 文档标题

文档简介...

:::tip 核心价值
- 要点 1
- 要点 2
- 要点 3
:::

---

## 章节标题

### 小节标题

内容...

代码示例：

\`\`\`javascript
// 代码
\`\`\`

---

## 总结

总结内容...
```

---

## 十七、折叠面板（Details）

折叠面板用于隐藏大量内容，让用户按需展开查看。

### 17.1 基础折叠面板

<details>
<summary>点击展开查看详细内容</summary>

这是折叠面板的内容。可以包含任何 Markdown 元素：

- 列表项 1
- 列表项 2
- 列表项 3

```javascript
console.log('折叠面板中的代码');
```

</details>

### 17.2 默认展开的折叠面板

<details open>
<summary>默认展开的面板</summary>

使用 `open` 属性可以让折叠面板默认处于展开状态。

这对于重要内容很有用。

</details>

### 17.3 嵌套折叠面板

<details>
<summary>外层折叠面板</summary>

外层内容...

<details>
<summary>内层折叠面板</summary>

内层内容可以进一步折叠。

</details>

</details>

### 17.4 折叠面板中的复杂内容

<details>
<summary>API 文档示例</summary>

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|:----:|------|
| userId | string | 是 | 用户ID |
| token | string | 是 | 访问令牌 |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": "12345",
    "username": "developer"
  }
}
```

#### 错误码

- `400`: 请求参数错误
- `401`: 未授权
- `500`: 服务器错误

</details>

### 17.5 折叠面板最佳实践

:::tip 使用建议
- 用于隐藏可选的详细信息
- 用于长代码示例或日志输出
- 用于 FAQ 问答列表
- 用于可选的高级配置说明
- 避免在折叠面板中放置关键信息
:::

---

## 十八、卡片组件

### 18.1 基础卡片

<div className="card">

### 基础卡片

这是一个基础卡片组件，使用 DevManga 风格的粗边框、阴影和倾斜效果。

卡片内容可以包含任何 Markdown 元素：文本、列表、代码等。

</div>

### 17.2 主题色卡片

<div className="card-grid">

<div className="card card-primary">

### Water Style (Primary)

使用主色调（蓝色）的卡片，适合展示主要功能或重点内容。

- 组件化开发
- 虚拟 DOM
- 丰富的生态系统

</div>

<div className="card card-success">

### Success Style

使用成功色（绿色）的卡片，适合展示成功状态或正面信息。

- 操作成功
- 测试通过
- 部署完成

</div>

</div>

### 17.3 警告和危险卡片

<div className="card-grid">

<div className="card card-warning">

### Thunder Style (Warning)

使用警告色（黄色）的卡片，提醒用户注意潜在问题。

**注意事项：**
- 请仔细阅读文档
- 确保配置正确
- 建议先在测试环境验证

</div>

<div className="card card-danger">

### Flame Style (Danger)

使用危险色（红色）的卡片，警告严重问题或错误。

**严重警告：**
- 此操作不可逆
- 可能导致数据丢失
- 请务必备份数据

</div>

</div>

### 17.4 Tabs + 卡片组合

<Tabs>
<TabItem value="frontend" label="前端框架">

<div className="card-grid">

<div className="card card-primary">

### React

**特点：**
- 组件化开发
- 虚拟 DOM
- 丰富的生态系统

</div>

<div className="card card-success">

### Vue

**特点：**
- 渐进式框架
- 双向数据绑定
- 简单易学

</div>

<div className="card card-danger">

### Angular

**特点：**
- 完整的框架
- TypeScript 原生支持
- 企业级解决方案

</div>

</div>

</TabItem>
<TabItem value="backend" label="后端框架">

<div className="card-grid">

<div className="card card-primary">

### Node.js + Express

**特点：**
- JavaScript 全栈
- 高性能异步 I/O
- 丰富的中间件

</div>

<div className="card card-warning">

### Python + FastAPI

**特点：**
- 现代化 Python 框架
- 自动生成 API 文档
- 类型提示支持

</div>

<div className="card card-danger">

### Java + Spring Boot

**特点：**
- 企业级框架
- 完整的生态系统
- 强大的安全性

</div>

</div>

</TabItem>
</Tabs>

---

**最后更新时间：** 2024-12-28

**文件格式：** Markdown (.md) with JSX support

**标签：** #文档模板 #Markdown #MDX #JSX组件 #卡片组件