---
sidebar_position: 2
title: 文档组件使用指南
description: 详细的文档组件分类和使用说明，包含所有可用的 Markdown 语法和 JSX 组件
tags: [组件, 指南, Markdown, JSX]
keywords: [文档组件, Markdown语法, JSX组件, 使用指南]
authors: [Laby]
last_update:
  date: 2026-04-26
  author: Laby
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 文档组件使用指南

本文档详细列出了所有可用的文档组件和 Markdown 语法，按类别分类，方便快速查找和使用。

:::tip 快速导航
- [标题层级](#一标题层级)
- [文本格式](#二文本格式)
- [列表](#三列表)
- [提示框](#四提示框-admonition)
- [代码块](#五代码块)
- [表格](#六表格)
- [链接](#七链接)
- [图片](#八图片和媒体)
- [Tabs 组件](#九tabs-组件)
- [卡片组件](#十卡片组件)
- [折叠面板](#十一折叠面板)
- [其他元素](#十二其他元素)
:::

---

## 一、标题层级

### 1.1 标题语法

```markdown
# 一级标题 (H1) - 文档主标题
## 二级标题 (H2) - 主要章节
### 三级标题 (H3) - 子章节
#### 四级标题 (H4) - 小节
##### 五级标题 (H5) - 更小的节
###### 六级标题 (H6) - 最小的节
```

### 1.2 标题使用规范

- H1：每个文档只有一个，用于文档主标题
- H2：主要章节，使用中文数字编号（一、二、三）
- H3：子章节，使用阿拉伯数字编号（1.1、1.2）
- H4-H6：更细的层级，根据需要使用

### 1.3 标题示例

# 一级标题示例

## 二级标题示例

### 三级标题示例

#### 四级标题示例

##### 五级标题示例

###### 六级标题示例

---

## 二、文本格式

### 2.1 基本文本样式

| 样式 | 语法 | 效果 |
|:-----|:-----|:-----|
| 粗体 | `**文本**` | **粗体文本** |
| 斜体 | `*文本*` | *斜体文本* |
| 粗斜体 | `***文本***` | ***粗斜体文本*** |
| 删除线 | `~~文本~~` | ~~删除线文本~~ |
| 行内代码 | `` `代码` `` | `行内代码` |

### 2.2 使用场景

- **粗体**：强调重要概念、关键词
- *斜体*：术语、引用、轻度强调
- `行内代码`：代码片段、命令、文件名、变量名
- ~~删除线~~：标记过时内容

### 2.3 组合使用

可以组合使用多种格式：

- **粗体中的 `代码`**
- *斜体中的 **粗体***
- ~~删除的 **粗体** 内容~~

---

## 三、列表

### 3.1 无序列表

**语法：**
```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3
```

**效果：**
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
- 项目 3

### 3.2 有序列表

**语法：**
```markdown
1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项
```

**效果：**
1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
3. 第三项

### 3.3 任务列表

**语法：**
```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个未完成的任务
```

**效果：**
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个未完成的任务

### 3.4 列表使用规范

- 无序列表：用于无顺序关系的项目
- 有序列表：用于有步骤或优先级的内容
- 任务列表：用于待办事项或检查清单
- 列表项要简洁，每项一个要点
- 嵌套列表不超过 3 层

---

## 四、提示框 (Admonition)

### 4.1 提示框类型

<Tabs>
<TabItem value="note" label="Note">

**语法：**
```markdown
:::note
这是一个注意提示框，用于一般性说明。
:::
```

**效果：**
:::note
这是一个注意提示框，用于一般性说明。
:::

</TabItem>
<TabItem value="tip" label="Tip">

**语法：**
```markdown
:::tip
这是一个提示框，用于提供有用的建议或技巧。
:::
```

**效果：**
:::tip
这是一个提示框，用于提供有用的建议或技巧。
:::

</TabItem>
<TabItem value="info" label="Info">

**语法：**
```markdown
:::info
这是一个信息提示框，用于提供额外的信息。
:::
```

**效果：**
:::info
这是一个信息提示框，用于提供额外的信息。
:::

</TabItem>
<TabItem value="warning" label="Warning">

**语法：**
```markdown
:::warning
这是一个警告提示框，用于提醒用户注意潜在问题。
:::
```

**效果：**
:::warning
这是一个警告提示框，用于提醒用户注意潜在问题。
:::

</TabItem>
<TabItem value="danger" label="Danger">

**语法：**
```markdown
:::danger
这是一个危险提示框，用于警告严重问题或错误。
:::
```

**效果：**
:::danger
这是一个危险提示框，用于警告严重问题或错误。
:::

</TabItem>
<TabItem value="caution" label="Caution">

**语法：**
```markdown
:::caution
这是一个注意提示框，用于提醒用户小心操作。
:::
```

**效果：**
:::caution
这是一个注意提示框，用于提醒用户小心操作。
:::

</TabItem>
</Tabs>

### 4.2 自定义标题

**语法：**
```markdown
:::tip 最佳实践
使用自定义标题可以让提示框更加醒目和有针对性。
:::
```

**效果：**
:::tip 最佳实践
使用自定义标题可以让提示框更加醒目和有针对性。
:::

### 4.3 提示框中嵌套内容

提示框可以包含：
- 代码块
- 列表
- 表格
- 图片
- 其他 Markdown 元素

**示例：**

:::info 功能列表
- 支持 Markdown
- 支持代码高亮
- 支持多种主题
- 支持图片和表格

```javascript
console.log('提示框中的代码');
```
:::

### 4.4 使用场景

| 类型 | 使用场景 |
|:-----|:---------|
| `note` | 一般性说明、补充信息 |
| `tip` | 有用的建议、技巧、最佳实践 |
| `info` | 额外信息、扩展阅读、背景知识 |
| `warning` | 警告、注意事项、潜在问题 |
| `danger` | 严重问题、错误、禁止操作 |
| `caution` | 小心操作、谨慎使用 |

---

## 五、代码块

### 5.1 基本代码块

**语法：**
````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`)
}
```
````

**效果：**
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`)
}
```

### 5.2 带标题的代码块

**语法：**
````markdown
```jsx title="src/components/Button.jsx"
export default function Button({ children }) {
  return <button>{children}</button>
}
```
````

**效果：**
```jsx title="src/components/Button.jsx"
export default function Button({ children }) {
  return <button>{children}</button>
}
```

### 5.3 高亮特定行

**语法：**
````markdown
```javascript {2,4-6}
function calculateSum(a, b) {
  // 这一行会被高亮
  const sum = a + b
  // 这些行也会被高亮
  console.log('Sum:', sum)
  return sum
}
```
````

**效果：**
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

**语法：**
````markdown
```javascript showLineNumbers
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```
````

**效果：**
```javascript showLineNumbers
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```

### 5.5 支持的语言

常用语言：
- `javascript` / `js`
- `typescript` / `ts`
- `jsx` / `tsx`
- `python`
- `java`
- `css` / `scss`
- `html`
- `json`
- `yaml`
- `bash` / `shell`
- `sql`
- `markdown`

### 5.6 代码块使用规范

- 必须指定语言类型
- 复杂代码添加标题
- 需要强调的行使用高亮
- 长代码块使用行号
- 代码要完整可运行
- 添加必要注释

---

## 六、表格

### 6.1 基本表格

**语法：**
```markdown
| 特性 | React | Vue | Angular |
|------|-------|-----|---------|
| 学习曲线 | 中等 | 简单 | 陡峭 |
| 性能 | 优秀 | 优秀 | 良好 |
```

**效果：**
| 特性 | React | Vue | Angular |
|------|-------|-----|---------|
| 学习曲线 | 中等 | 简单 | 陡峭 |
| 性能 | 优秀 | 优秀 | 良好 |

### 6.2 对齐方式

**语法：**
```markdown
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:-------:|-------:|
| 左 | 中 | 右 |
```

**效果：**
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:-------:|-------:|
| 左 | 中 | 右 |

### 6.3 包含代码的表格

**效果：**
| 方法 | 语法 | 说明 |
|------|------|------|
| `push()` | `arr.push(item)` | 在数组末尾添加元素 |
| `pop()` | `arr.pop()` | 删除并返回数组最后一个元素 |
| `shift()` | `arr.shift()` | 删除并返回数组第一个元素 |

### 6.4 多行内容

使用 `<br/>` 在单元格内换行：

| 特性 | 方案 A | 方案 B |
|:-----|:------:|:------:|
| **性能** | 优秀<br/>5星 | 良好<br/>4星 |
| **易用性** | 中等<br/>3星 | 简单<br/>5星 |

### 6.5 表格使用规范

- 表头使用粗体，内容简洁
- 合理使用对齐方式
- 表格列数不超过 6 列
- 使用 `<br/>` 在单元格内换行
- 复杂数据使用表格展示

---

## 七、链接

### 7.1 外部链接

**语法：**
```markdown
[链接文本](https://example.com)
[带标题的链接](https://example.com "链接标题")
```

**效果：**
- [Docusaurus 官网](https://docusaurus.io/)
- [带标题的链接](https://docusaurus.io/ "访问 Docusaurus")

### 7.2 内部链接

**语法：**
```markdown
[其他文档](./another-doc)
[文档章节](./doc#section)
```

### 7.3 锚点链接

**语法：**
```markdown
[跳转到代码块章节](#五代码块)
```

**效果：**
[跳转到代码块章节](#五代码块)

### 7.4 引用

**语法：**
```markdown
> 这是一个引用块
> 
> 可以包含多行文本
```

**效果：**
> 这是一个引用块
> 
> 可以包含多行文本

---

## 八、图片和媒体

### 8.1 基本图片

**语法：**
```markdown
![图片描述](图片路径)
```

**HTML 语法（推荐）：**
```html
<img src="/img/path/to/image.jpg" alt="图片描述" width="300" />
```

### 8.2 指定图片大小

```html
<img src="/img/home/rem-blue.jpg" alt="蕾姆" width="300" />
```

### 8.3 带链接的图片

```html
<a href="/img/home/large-image.jpg">
  <img src="/img/home/thumbnail.jpg" alt="点击查看大图" width="200" />
</a>
```

### 8.4 图片使用规范

- 图片必须有 alt 属性
- 指定合适的宽度
- 图片下方添加说明文字（斜体）
- 图片路径使用 `/img/` 开头的绝对路径
- 图片文件名使用小写字母和连字符

---

## 九、Tabs 组件

### 9.1 基本用法

**必须先导入：**
```javascript
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

**语法：**
```jsx
<Tabs>
<TabItem value="js" label="JavaScript">

JavaScript 内容

</TabItem>
<TabItem value="ts" label="TypeScript">

TypeScript 内容

</TabItem>
</Tabs>
```

### 9.2 默认选中

```jsx
<Tabs defaultValue="vue">
<TabItem value="vue" label="Vue 3">

Vue 内容

</TabItem>
<TabItem value="react" label="React">

React 内容

</TabItem>
</Tabs>
```

### 9.3 Tabs 中嵌套内容

Tabs 可以包含：
- 代码块
- 提示框
- 列表
- 表格
- 图片
- 其他 Markdown 元素

**示例：**

<Tabs>
<TabItem value="code" label="代码示例">

```javascript
console.log('Hello World');
```

</TabItem>
<TabItem value="tip" label="提示">

:::tip
这是 Tab 中的提示框
:::

</TabItem>
</Tabs>

### 9.4 使用场景

- 展示多种实现方式
- 多语言代码对比
- 不同框架的示例
- 多个配置选项

---

## 十、卡片组件

### 10.1 基础卡片

**语法：**
```html
<div className="card">

### 卡片标题

卡片内容...

</div>
```

**效果：**

<div className="card">

### 基础卡片

这是一个基础卡片组件，使用 DevManga 风格的粗边框、阴影和倾斜效果。

</div>

### 10.2 主题色卡片

<div className="card-grid">

<div className="card card-primary">

### Primary 卡片

使用主色调（蓝色）的卡片

</div>

<div className="card card-success">

### Success 卡片

使用成功色（绿色）的卡片

</div>

</div>

### 10.3 警告卡片

<div className="card-grid">

<div className="card card-warning">

### Warning 卡片

使用警告色（黄色）的卡片

</div>

<div className="card card-danger">

### Danger 卡片

使用危险色（红色）的卡片

</div>

</div>

### 10.4 卡片类型

| 类名 | 颜色 | 使用场景 |
|:-----|:-----|:---------|
| `card` | 默认 | 基础卡片 |
| `card-primary` | 蓝色 | 主要功能、重点内容 |
| `card-success` | 绿色 | 成功状态、正面信息 |
| `card-warning` | 黄色 | 警告、注意事项 |
| `card-danger` | 红色 | 危险、错误、禁止 |

### 10.5 卡片网格

使用 `card-grid` 创建卡片网格布局：

```html
<div className="card-grid">
  <div className="card">卡片 1</div>
  <div className="card">卡片 2</div>
  <div className="card">卡片 3</div>
</div>
```

---

## 十一、折叠面板

### 11.1 基础折叠面板

**语法：**
```html
<details>
<summary>点击展开查看详细内容</summary>

这是折叠面板的内容。

</details>
```

**效果：**

<details>
<summary>点击展开查看详细内容</summary>

这是折叠面板的内容。可以包含任何 Markdown 元素。

</details>

### 11.2 默认展开

**语法：**
```html
<details open>
<summary>默认展开的面板</summary>

内容...

</details>
```

**效果：**

<details open>
<summary>默认展开的面板</summary>

使用 `open` 属性可以让折叠面板默认处于展开状态。

</details>

### 11.3 嵌套折叠面板

<details>
<summary>外层折叠面板</summary>

外层内容...

<details>
<summary>内层折叠面板</summary>

内层内容可以进一步折叠。

</details>

</details>

### 11.4 使用场景

- 隐藏可选的详细信息
- 长代码示例或日志输出
- FAQ 问答列表
- 可选的高级配置说明

---

## 十二、其他元素

### 12.1 分隔线

**语法：**
```markdown
---
***
___
```

**效果：**

---

### 12.2 行内 HTML

可以在 Markdown 中使用 HTML 标签：

```html
<div style={{color: 'red', fontWeight: 'bold'}}>
  红色粗体文本
</div>
```

**效果：**

<div style={{color: 'red', fontWeight: 'bold'}}>
  红色粗体文本
</div>

### 12.3 注释

**语法：**
```markdown
<!-- 这是注释，不会显示在页面上 -->
```

### 12.4 转义字符

使用反斜杠转义特殊字符：

```markdown
\* 不是列表
\# 不是标题
\` 不是代码
```

**效果：**

\* 不是列表  
\# 不是标题  
\` 不是代码

---

## 十三、组合使用示例

### 13.1 Tabs + 提示框 + 代码

<Tabs>
<TabItem value="best" label="最佳实践">

:::tip 推荐做法
使用 `const` 和 `let` 声明变量。

```javascript
const PI = 3.14159
let count = 0
```
:::

</TabItem>
<TabItem value="avoid" label="应避免">

:::danger 常见错误
不要使用 `var` 声明变量。

```javascript
// 错误示例
var oldStyle = 'avoid this'
```
:::

</TabItem>
</Tabs>

### 13.2 卡片 + 列表 + 代码

<div className="card card-primary">

### React 组件

**特点：**
- 组件化开发
- 虚拟 DOM
- 丰富的生态系统

**示例：**
```jsx
function App() {
  return <h1>Hello React</h1>
}
```

</div>

### 13.3 折叠面板 + 表格 + 代码

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
  "data": {
    "userId": "12345"
  }
}
```

</details>

---

## 十四、快速参考

### 14.1 常用语法速查

| 元素 | 语法 |
|:-----|:-----|
| 粗体 | `**文本**` |
| 斜体 | `*文本*` |
| 代码 | `` `代码` `` |
| 链接 | `[文本](URL)` |
| 图片 | `![描述](路径)` |
| 标题 | `# H1` `## H2` `### H3` |
| 列表 | `- 项目` 或 `1. 项目` |
| 引用 | `> 引用文本` |
| 代码块 | ` ```语言 ` |
| 分隔线 | `---` |

### 14.2 组件导入

```javascript
// 在文件开头导入需要的组件
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

### 14.3 Front Matter 模板

```yaml
---
sidebar_position: 1
title: 文档标题
description: 文档描述
tags: [标签1, 标签2]
keywords: [关键词1, 关键词2]
authors: [Laby]
last_update:
  date: 2026-04-26
  author: Laby
---
```

---

## 十五、最佳实践

:::tip 编写建议

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
- 合理使用卡片和 Tabs

**实例充分：**
- 提供真实的使用场景
- 包含常见问题的解决方案
- 展示最佳实践

:::

---

**最后更新时间：** 2026-04-26

**标签：** 组件指南 Markdown JSX 使用说明
