/**
 * Mock 视频数据
 * 模拟真实的视频数据结构
 */

export interface MockVideo {
  bvid: string;
  title: string;
  description: string;
  cover: string;
  duration: number; // 秒
  views: number;
  likes: number;
  coins: number;
  favorites: number;
  danmakuCount: number;
  publishDate: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    mid: number;
  };
  videoUrl: string;
  subtitles: Array<{
    lang: string;
    langDoc: string;
    url: string;
  }>;
}

export const mockVideos: MockVideo[] = [
  {
    bvid: 'BV1GJ411x7h7',
    title: 'React 18 新特性完全指南',
    description: '深入解析 React 18 的并发渲染、自动批处理、Suspense 等核心特性，带你掌握最新的 React 开发技巧。',
    cover: '/img/blog/blog-1.jpg',
    duration: 1842, // 30分42秒
    views: 1258000,
    likes: 45600,
    coins: 23400,
    favorites: 67800,
    danmakuCount: 8900,
    publishDate: '2024-01-15',
    category: 'Frontend',
    tags: ['React', 'JavaScript', '前端框架', '教程'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [
      {
        lang: 'zh-CN',
        langDoc: '中文（简体）',
        url: '/subtitles/cc/butter-fly-zh.vtt',
      },
    ],
  },
  {
    bvid: 'BV1Zy4y1K7SH',
    title: 'TypeScript 高级类型系统实战',
    description: 'TypeScript 高级类型系统深度讲解，包括泛型、条件类型、映射类型等，提升你的类型编程能力。',
    cover: '/img/blog/blog-2.jpg',
    duration: 2238, // 37分18秒
    views: 983000,
    likes: 38900,
    coins: 19500,
    favorites: 52300,
    danmakuCount: 6700,
    publishDate: '2024-02-10',
    category: 'Frontend',
    tags: ['TypeScript', '类型系统', '进阶', '实战'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1uK411H7on',
    title: 'Vue 3 Composition API 最佳实践',
    description: 'Vue 3 Composition API 从入门到精通，学习如何使用组合式 API 构建可维护的大型应用。',
    cover: '/img/blog/blog-3.jpg',
    duration: 1945, // 32分25秒
    views: 756000,
    likes: 29800,
    coins: 15200,
    favorites: 41500,
    danmakuCount: 5400,
    publishDate: '2024-03-05',
    category: 'Frontend',
    tags: ['Vue', 'Composition API', '前端', '最佳实践'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1Kt411w7MP',
    title: 'Next.js 14 全栈开发实战',
    description: 'Next.js 14 全栈开发完整教程，包括 App Router、Server Components、Server Actions 等新特性。',
    cover: '/img/blog/blog-4.jpg',
    duration: 2688, // 44分48秒
    views: 645000,
    likes: 25600,
    coins: 13800,
    favorites: 38900,
    danmakuCount: 4800,
    publishDate: '2024-03-20',
    category: 'Frontend',
    tags: ['Next.js', '全栈', 'React', 'SSR'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1abc123def',
    title: 'Tailwind CSS 响应式设计实战',
    description: 'Tailwind CSS 响应式设计完整指南，学习如何使用工具类快速构建美观的响应式界面。',
    cover: '/img/blog/blog-5.jpg',
    duration: 1540, // 25分40秒
    views: 892000,
    likes: 35400,
    coins: 18900,
    favorites: 48700,
    danmakuCount: 6200,
    publishDate: '2024-04-01',
    category: 'Frontend',
    tags: ['Tailwind', 'CSS', '响应式', '设计'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1xyz789ghi',
    title: 'Webpack 5 模块联邦实战',
    description: 'Webpack 5 模块联邦深度解析，学习如何构建微前端架构，实现跨应用的模块共享。',
    cover: '/img/blog/blog-13.jpg',
    duration: 2152, // 35分52秒
    views: 534000,
    likes: 21800,
    coins: 11500,
    favorites: 32400,
    danmakuCount: 3900,
    publishDate: '2024-04-15',
    category: 'Frontend',
    tags: ['Webpack', '微前端', '模块联邦', '构建工具'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1def456ghi',
    title: 'Spring Boot 3 微服务架构',
    description: 'Spring Boot 3 微服务架构实战，包括服务注册、配置中心、网关、链路追踪等核心组件。',
    cover: '/img/blog/blog-14.jpg',
    duration: 3120, // 52分
    views: 723000,
    likes: 31200,
    coins: 16800,
    favorites: 45600,
    danmakuCount: 5600,
    publishDate: '2024-05-01',
    category: 'Backend',
    tags: ['Spring Boot', '微服务', 'Java', '架构'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1ghi789jkl',
    title: 'MySQL 性能优化实战指南',
    description: 'MySQL 性能优化完整教程，包括索引优化、查询优化、表结构设计等实战技巧。',
    cover: '/img/blog/blog-8.jpg',
    duration: 2845, // 47分25秒
    views: 612000,
    likes: 28900,
    coins: 15300,
    favorites: 41200,
    danmakuCount: 4900,
    publishDate: '2024-05-15',
    category: 'Backend',
    tags: ['MySQL', '数据库', '性能优化', 'SQL'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1jkl012mno',
    title: 'Redis 缓存架构设计与实践',
    description: 'Redis 缓存架构设计完整指南，包括缓存策略、数据结构选择、高可用方案等。',
    cover: '/img/blog/blog-9.jpg',
    duration: 2456, // 40分56秒
    views: 548000,
    likes: 26700,
    coins: 14200,
    favorites: 38500,
    danmakuCount: 4500,
    publishDate: '2024-06-01',
    category: 'Backend',
    tags: ['Redis', '缓存', 'NoSQL', '架构设计'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1mno345pqr',
    title: 'MongoDB 聚合管道深度解析',
    description: 'MongoDB 聚合管道完整教程，学习如何使用聚合框架进行复杂的数据分析和处理。',
    cover: '/img/blog/blog-1.jpg',
    duration: 2134, // 35分34秒
    views: 489000,
    likes: 24300,
    coins: 13100,
    favorites: 35800,
    danmakuCount: 4100,
    publishDate: '2024-06-15',
    category: 'Backend',
    tags: ['MongoDB', 'NoSQL', '聚合', '数据分析'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1pqr678stu',
    title: 'Node.js 高性能服务端开发',
    description: 'Node.js 高性能服务端开发实战，包括异步编程、流处理、集群模式等核心技术。',
    cover: '/img/blog/blog-3.jpg',
    duration: 2678, // 44分38秒
    views: 567000,
    likes: 27800,
    coins: 14900,
    favorites: 40200,
    danmakuCount: 4700,
    publishDate: '2024-07-01',
    category: 'Backend',
    tags: ['Node.js', 'JavaScript', '后端', '高性能'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1stu901vwx',
    title: 'Python FastAPI 现代 Web 开发',
    description: 'Python FastAPI 现代 Web 开发教程，学习如何使用 FastAPI 构建高性能的 RESTful API。',
    cover: '/img/blog/blog-4.jpg',
    duration: 2345, // 39分5秒
    views: 634000,
    likes: 29500,
    coins: 15800,
    favorites: 42600,
    danmakuCount: 5100,
    publishDate: '2024-07-15',
    category: 'Backend',
    tags: ['Python', 'FastAPI', 'Web开发', 'API'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1vwx234yza',
    title: 'Docker 容器化部署实战',
    description: 'Docker 容器化部署完整指南，包括镜像构建、容器编排、网络配置等实战技巧。',
    cover: '/img/blog/blog-5.jpg',
    duration: 2567, // 42分47秒
    views: 712000,
    likes: 32100,
    coins: 17200,
    favorites: 46300,
    danmakuCount: 5500,
    publishDate: '2024-08-01',
    category: 'DevOps',
    tags: ['Docker', '容器', '部署', 'DevOps'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1yza567bcd',
    title: 'Kubernetes 集群管理与运维',
    description: 'Kubernetes 集群管理与运维实战，学习如何部署、管理和监控 K8s 集群。',
    cover: '/img/blog/blog-15.jpg',
    duration: 3234, // 53分54秒
    views: 589000,
    likes: 28200,
    coins: 15100,
    favorites: 40800,
    danmakuCount: 4800,
    publishDate: '2024-08-15',
    category: 'DevOps',
    tags: ['Kubernetes', 'K8s', '集群', '运维'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/sintel-trailer.mp4',
    subtitles: [],
  },
  {
    bvid: 'BV1bcd890efg',
    title: 'CI/CD 持续集成与部署实践',
    description: 'CI/CD 持续集成与部署完整教程，使用 Jenkins、GitLab CI 等工具构建自动化流水线。',
    cover: '/img/blog/blog-16.jpg',
    duration: 2789, // 46分29秒
    views: 523000,
    likes: 25900,
    coins: 13900,
    favorites: 37600,
    danmakuCount: 4400,
    publishDate: '2024-09-01',
    category: 'DevOps',
    tags: ['CI/CD', 'Jenkins', '自动化', '部署'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
  {
    bvid: 'BV1efg123hij',
    title: 'Prometheus + Grafana 监控实战',
    description: 'Prometheus + Grafana 监控系统搭建实战，学习如何监控应用性能和系统指标。',
    cover: '/img/blog/blog-8.jpg',
    duration: 2456, // 40分56秒
    views: 478000,
    likes: 23700,
    coins: 12800,
    favorites: 34900,
    danmakuCount: 4000,
    publishDate: '2024-09-15',
    category: 'DevOps',
    tags: ['Prometheus', 'Grafana', '监控', '可观测性'],
    author: {
      name: 'DevManga编程',
      avatar: '/img/blog/blog-2.jpg',
      mid: 123456,
    },
    videoUrl: '/videos/butter-fly.MP4',
    subtitles: [],
  },
];

// Mock 弹幕数据类型
export interface MockDanmaku {
  text: string;
  time: number;
  color: string;
  mode: number; // 0-滚动 1-顶部 2-底部
  gradient?: boolean; // 是否渐变边框
  gradientColors?: string[]; // 渐变颜色数组
  gradientAngle?: number; // 渐变角度
}
