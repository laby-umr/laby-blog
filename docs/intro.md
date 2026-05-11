---
sidebar_position: 1
title: 文档编写使用手册
description: Laby Blog 文档系统完整使用指南，快速上手文档创作的两种方式
tags: [使用手册, 文档规范, 快速入门]
keywords: [文档编写, 使用手册, AI 辅助, Markdown, Docusaurus, 编写规范]
authors: [Laby]
last_update:
  date: 2026-04-24
  author: Laby
---

# 文档编写使用手册

欢迎来到 Laby Blog 文档系统！本手册将指导你快速创建专业、规范的技术文档。

:::tip 核心价值
- **两种编写方式**：AI 辅助编写 + 手动编写，灵活选择
- **完整模板库**：标准模板、日报模板、周报模板，开箱即用
- **规范体系**：统一的编写规范，确保文档质量
- **炫酷风格**：DevManga 主题，粗边框、阴影、漫画风格
:::

---

## 一、快速开始

### 1.1 选择编写方式

<div className="card-grid">

<div className="card card-primary">

### AI 辅助编写

**适合场景：**
- 快速生成文档框架
- 需要大量技术细节
- 多文档批量创建

**优势：**
- 几分钟完成文档
- 自动遵循规范
- 内容丰富完整

</div>

<div className="card card-success">

### 手动编写

**适合场景：**
- 完全掌控内容
- 个性化定制
- 精细化调整

**优势：**
- 灵活自由
- 精准表达
- 深度优化

</div>

</div>

### 1.2 三步创建文档

```mermaid
graph LR
    A[选择模板] --> B[填写内容]
    B --> C[预览发布]
    
    style A fill:#4285f4,stroke:#333,stroke-width:4px,color:#fff
    style B fill:#34a853,stroke:#333,stroke-width:4px,color:#fff
    style C fill:#fbbc04,stroke:#333,stroke-width:4px,color:#fff
```

---

## 二、AI 辅助编写

### 2.1 准备提示词

复制以下提示词模板，替换 `[你的主题]` 为具体内容：

```text
我需要编写一篇关于 [你的主题] 的技术文档。

请严格遵循以下规范：
1. 文档编写规范：.kiro/steering/document-writing-standards.md
2. 参考模板：docs/document-template/template.md

要求：
- 禁止使用 Emoji 图标
- 使用中文数字编号（一、二、三）作为主章节
- 使用阿拉伯数字编号（1.1、1.2）作为子章节
- 包含完整的 Front Matter
- 使用提示框突出重点
- 代码块必须指定语言类型
```

### 2.2 AI 生成流程

:::note 生成步骤
1. **提供提示词** → 告诉 AI 你的需求和规范
2. **AI 生成内容** → 获得完整的文档框架和内容
3. **人工审查** → 检查准确性、代码示例、链接
4. **保存发布** → 放入 `docs` 目录相应位置
:::

### 2.3 最佳实践

| 技巧 | 说明 | 效果 |
|------|------|------|
| 提供上下文 | 说明目标读者、技术栈版本 | 内容更精准 |
| 分段生成 | 先大纲，再逐章节生成 | 结构更清晰 |
| 迭代优化 | 要求 AI 补充和优化 | 质量更高 |

---

## 三、手动编写

### 3.1 创建文档结构

#### 文件组织规则

```
docs/
├── frontend/              # 文件夹 = 菜单分类
│   ├── react-guide.md    # 文件 = 文档页面
│   └── vue-guide.md
├── backend/
│   ├── spring-boot.md
│   └── database.md
└── document-template/
    └── template.md       # 标准模板
```

:::tip 命名规范
- 文件夹和文件名：小写字母 + 连字符（kebab-case）
- 避免：中文、空格、特殊字符
- 示例：`react-hooks-guide.md` ✓  `React Hooks 指南.md` ✗
:::

#### 配置目录（可选）

在文件夹中创建 `_category_.json`：

```json title="docs/frontend/_category_.json"
{
  "label": "前端开发",
  "position": 1,
  "link": {
    "type": "generated-index",
    "description": "前端开发技术文档"
  }
}
```

### 3.2 使用标准模板

:::tip 模板位置
[文档标准模板](文档模板/template.md) 包含 18 个章节的完整示例
:::

### 3.3 编写步骤

**步骤 1：复制模板**

从 [template.md](文档模板/template.md) 复制内容作为起点。

**步骤 2：填写 Front Matter**

```yaml
---
sidebar_position: 1          # 侧边栏位置
title: React 开发指南        # 页面标题
description: React 框架完整开发指南，包含组件、Hooks、状态管理等核心概念
tags: [React, 前端, JavaScript]
keywords: [React, 组件, Hooks, 状态管理, 前端开发]
authors: [Laby]
last_update:
  date: 2026-04-24
  author: Laby
---
```

**步骤 3：编写内容**

参考 [template.md](文档模板/template.md) 中的所有组件和格式示例。

**步骤 4：本地预览**

```bash
npm start
# 访问 http://localhost:3000
```

### 3.4 核心规范

<div className="card-grid">

<div className="card card-danger">

### 禁止事项

- 禁止使用 Emoji 图标
- 禁止中文文件名
- 禁止省略代码块语言类型
- 禁止空格和特殊字符命名

</div>

<div className="card card-success">

### 推荐做法

- 清晰的标题层级
- 完整可运行的代码
- 使用提示框突出重点
- 保持段落简洁（3-5 句）
- 技术术语首次出现时解释

</div>

</div>

---

## 四、组件速查

### 4.1 常用组件

| 组件 | 用途 | 查看示例 |
|------|------|----------|
| Front Matter | 文档元数据配置 | [第一章](文档模板/template.md#一文档元数据front-matter) |
| 标题层级 | 文档结构组织 | [第二章](文档模板/template.md#二标题层级) |
| 文本格式 | 基本文本样式 | [第三章](文档模板/template.md#三文本格式) |
| 提示框 | 突出重点信息 | [第四章](文档模板/template.md#四admonition提示框) |
| 代码块 | 展示代码 | [第五章](文档模板/template.md#五代码块) |
| 表格 | 结构化数据 | [第六章](文档模板/template.md#六表格) |
| 图片媒体 | 插入图片视频 | [第七章](文档模板/template.md#七图片和媒体) |
| 链接引用 | 文档链接 | [第八章](文档模板/template.md#八链接和引用) |
| 分隔线 | 章节分隔 | [第九章](文档模板/template.md#九分隔线) |
| Emoji | 图标使用 | [第十章](文档模板/template.md#十常用-emoji-图标) |
| 嵌套内容 | 复杂结构 | [第十一章](文档模板/template.md#十一嵌套内容示例) |
| 实际应用 | 真实案例 | [第十二章](文档模板/template.md#十二实际应用示例) |
| 最佳实践 | 编写建议 | [第十三章](文档模板/template.md#十三最佳实践) |
| Tabs | 多选项展示 | [第十四章](文档模板/template.md#十四tabs-组件标签页) |
| 高级嵌套 | 复杂嵌套 | [第十五章](文档模板/template.md#十五高级嵌套示例) |
| 快速模板 | 复制使用 | [第十六章](文档模板/template.md#十六快速复制模板) |
| 折叠面板 | 隐藏详情 | [第十七章](文档模板/template.md#十七折叠面板details) |
| 卡片 | 内容分组 | [第十八章](文档模板/template.md#十八卡片组件) |

### 4.2 提示框类型

<div className="card-grid">

<div className="card card-primary">

```markdown
:::tip 技巧
有用的建议和最佳实践
:::
```

</div>

<div className="card card-warning">

```markdown
:::warning 警告
需要注意的事项和潜在问题
:::
```

</div>

<div className="card card-danger">

```markdown
:::danger 危险
严重问题和禁止操作
:::
```

</div>

</div>

---

## 五、发布前检查

### 5.1 内容检查

- [ ] Front Matter 完整且正确
- [ ] 标题层级合理，编号正确
- [ ] 没有使用 Emoji 图标
- [ ] 技术内容准确无误
- [ ] 代码示例完整可运行
- [ ] 链接有效且文字有意义

### 5.2 格式检查

- [ ] 代码块指定了语言类型
- [ ] 提示框类型使用恰当
- [ ] 表格格式规范
- [ ] 图片有 alt 属性和说明
- [ ] 文档结构清晰，易于阅读

### 5.3 规范检查

- [ ] 样式符合 [template.md](文档模板/template.md) 规范
- [ ] 文件命名规范（小写字母和连字符）
- [ ] 标注了最后更新时间
- [ ] 遵循 DevManga 主题风格

---

## 六、FAQ（常见问题）

<details>
<summary>文档不显示在侧边栏？</summary>

**可能原因：**
- 文件不在 `docs` 目录下
- 文件名或路径不正确
- Front Matter 格式错误

**解决方法：**
1. 确认文件在 `docs` 目录下
2. 检查文件名是否使用小写字母和连字符
3. 检查 Front Matter 格式是否正确

</details>

<details>
<summary>代码块显示异常？</summary>

**可能原因：**
- 没有指定语言类型
- 代码块标记不完整

**解决方法：**

查看 [代码块示例](文档模板/template.md#五代码块)，确保指定了语言类型。

</details>

<details>
<summary>提示框不生效？</summary>

**可能原因：**
- 语法格式不正确
- 缺少空行

**解决方法：**

查看 [提示框示例](文档模板/template.md#四admonition提示框)，确保语法正确。

</details>

<details>
<summary>图片无法显示？</summary>

**可能原因：**
- 图片路径不正确
- 图片文件不存在

**解决方法：**
- 使用绝对路径：`/img/example.jpg`
- 确认图片在 `static/img` 目录下
- 检查文件名大小写

</details>

---

## 七、参考资源

### 7.1 必读文档

<div className="card-grid">

<div className="card card-primary">

### 标准模板

[文档标准模板](文档模板/template.md)

包含 18 个章节的完整示例，涵盖所有组件和格式。

</div>

<div className="card card-success">

### 编写规范

查看项目根目录 `.kiro/steering/document-writing-standards.md`

详细的编写规范、检查清单、最佳实践。

</div>

<div className="card card-warning">

### 报告模板

- [日报模板](文档模板/daily-report-template.md)
- [周报模板](文档模板/weekly-report-template.md)

</div>

</div>

### 7.2 快速链接

**内部链接**
- [首页](/) | [博客](/blog) | [项目](/projects) | [关于我](/about) | [联系我](/contact)

**外部资源**
- [Docusaurus 官方文档](https://docusaurus.io/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [MDX 文档](https://mdxjs.com/)

---

## 八、获取帮助

如果遇到问题，按以下顺序寻求帮助：

1. 查看 [文档标准模板](文档模板/template.md) 寻找示例
2. 查看项目根目录 `.kiro/steering/document-writing-standards.md` 文档编写规范
3. 查看本手册的常见问题部分
4. 使用搜索功能查找相关文档
5. 访问 [联系我](/contact) 页面反馈问题

---

**最后更新时间：2026-04-24**

**祝你编写出专业、规范、炫酷的技术文档！**
