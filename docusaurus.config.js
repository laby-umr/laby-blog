// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Laby Blog',
  tagline: '探索现代Web开发的全部领域',
  favicon: 'img/logo.jpg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    faster: true, // Build acceleration
  },

  // Set the production url of your site here
  url: 'https://laby-umr.github.io',
  baseUrl: '/',

  // 性能优化：预连接和 DNS 预解析
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'dns-prefetch',
        href: 'http://120.48.86.168:48080',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'http://120.48.86.168:48080',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
      },
    },
  ],

  // GitHub pages deployment config.
  organizationName: 'laby-umr', // GitHub username
  projectName: 'laby-umr.github.io', // 用户级 GitHub Pages 仓库名

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  // i18n 配置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
      },
      'en': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en',
      },
    },
  },

  plugins: [
    // PWA 支持
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.jpg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#667eea',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/logo.jpg',
          },
        ],
      },
    ],
    [
      'docusaurus-plugin-module-alias',
      {
        alias: {
          '@site/blog/authors': './blog/authors',
        },
      },
    ],
    // 本地搜索插件
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
        indexDocs: true,
        indexBlog: true,
        docsRouteBasePath: "/docs",
        blogRouteBasePath: "/blog",
        docsDir: "docs",
        blogDir: "blog",
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutHint: false,
        searchBarShortcut: false,
      },
    ],
    
    // 图片放大查看插件
    'plugin-image-zoom',

    // Blog API 配置插件
    function blogApiConfigPlugin(context, options) {
      return {
        name: 'blog-api-config-plugin',
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script',
                innerHTML: `
                  window.blogApiConfig = {
                    apiBaseUrl: '${process.env.NODE_ENV === 'production' 
                      ? 'http://120.48.86.168:48080' 
                      : 'http://120.48.86.168:48080'}'
                  };
                `,
              },
            ],
          };
        },
      };
    },
  ],

  // Markdown 配置
  markdown: {
    mermaid: true,
    format: 'mdx',
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/laby-umr/laby-umr.github.io/tree/main/',
          routeBasePath: 'docs',
          path: 'docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/laby-umr/laby-umr.github.io/tree/main/',
          postsPerPage: 10,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '全部博客文章',
          blogDescription: '关注前后端开发、DevOps和系统架构设计的技术博客',
          truncateMarker: /<!--\s*truncate\s*-->/,
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: 'all',
            title: 'Laby Blog',
            description: '关注前后端开发、DevOps和系统架构设计的技术博客',
            copyright: `Copyright © ${new Date().getFullYear()} Laby Blog`,
            language: 'zh-CN',
          },
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        // Google Analytics 4 配置
        gtag: {
          trackingID: 'G-03NXQZ7S0Z',
          anonymizeIP: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Add Mermaid theme
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
    // 设置图片亮暗模式
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
      // Algolia DocSearch 配置（已禁用，改用本地搜索）
      /*
      algolia: {
        // Algolia 提供的 Application ID
        appId: 'Z8PAZK675G',
        
        // 公开的 Search API Key（安全，可以暴露在前端）
        apiKey: 'aac29efdff8fd36c7e557850f37d75e7',
        
        // 索引名称
        indexName: 'laby-umr',
        
        // 可选：上下文搜索
        contextualSearch: true,
        
        // 可选：搜索页面路径（默认启用）
        searchPagePath: 'search',
        
        // 可选：自定义搜索参数
        searchParameters: {},
        
        // 🆕 DocSearch v4 新特性：AI 助手配置
        insights: true, // 启用搜索分析
        
        // 🤖 AI 助手配置（可选）
        // TODO: 在 Algolia 控制台创建 Assistant 后，取消注释并替换下面的 ID
        // 访问：https://dashboard.algolia.com/apps/Z8PAZK675G/ai
        // askAi: 'YOUR_ALGOLIA_ASSISTANT_ID',  // 替换为真实的 Assistant ID（格式：ast_xxxxxxxx）
        
        // 可选：自定义占位符和翻译
        placeholder: '搜索文档...',
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档',
          },
        },
      },
      */
      // 添加Giscus评论系统
      giscus: {
        repo: 'laby-umr/laby-umr.github.io',
        repoId: 'R_kgDOQkvCIQ',
        category: 'Announcements',
        categoryId: 'DIC_kwDOQkvCIc4Czr7V',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '1',
        inputPosition: 'bottom',
        theme: 'preferred_color_scheme',
        lang: 'zh-CN',
      },
      // 顶部公告栏
      announcementBar: {
        id: 'support_star',
        content:
          '⭐️ 如果觉得这个项目对你有帮助，请给个 <a target="_blank" rel="noopener noreferrer" href="https://github.com/laby-umr/laby-umr.github.io">Star</a> 支持一下！',
        backgroundColor: '#667eea',
        textColor: '#ffffff',
        isCloseable: true,
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Laby Blog',
        logo: {
          alt: 'Laby Blog Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          {to: '/blog', label: '博客', position: 'left'},
          {to: '/projects', label: '项目', position: 'left'},
          {to: '/videos', label: '视频', position: 'left'},
          {to: '/music', label: '音乐', position: 'left'},
          {to: '/contact', label: '联系我', position: 'left'},
          {to: '/about', label: '关于我', position: 'left'},
          {
            type: 'custom-musicPlayer',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/laby-umr',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // Footer配置
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} Laby Blog. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'java', 'scala', 'go', 'rust', 'swift', 
          'kotlin', 'csharp', 'php', 'python', 'bash', 
          'powershell', 'sql', 'typescript', 'jsx', 'tsx',
          'yaml', 'json', 'css', 'markdown', 'diff'
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          }
        ],
        defaultLanguage: 'javascript',
      },
      // 添加元数据
      metadata: [
        {name: 'keywords', content: 'blog, javascript, typescript, react, vue, java, spring, 前端, 后端, 全栈开发'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {property: 'og:type', content: 'website'},
        {property: 'og:title', content: 'Laby Blog - 探索现代Web开发的全部领域'},
        {property: 'og:description', content: '关注前后端开发、DevOps和系统架构设计的技术博客'},
      ],
    }),
};

// 直接导出配置对象
module.exports = config;
