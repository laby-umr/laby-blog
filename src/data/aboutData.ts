import { AboutData } from '../types/about';

export const aboutData: AboutData = {
  personalInfo: {
    name: '刘佳兴',
    nameEn: 'LABY',
    title: '全栈工程师',
    intro: '9年全栈开发经验，精通前后端技术栈。擅长从0到1搭建系统架构，熟练使用Spring Cloud微服务、Vue3/React前端框架，有丰富的大数据平台、CRM系统、智慧仓储等项目经验。',
    avatar: '/img/user/about-hero.jpg',
    resumeUrl: '/file/刘佳兴-vibe coding工程师.pdf',
    stats: {
      experience: '9年+',
      experienceLabel: '工作经验',
      projects: '10+',
      projectsLabel: '核心项目',
      skills: '20+',
      skillsLabel: '技术栈',
      companies: '6家',
      companiesLabel: '知名企业'
    },
    contact: {
      phone: '13261915710',
      email: '1521170425@qq.com',
      location: '北京',
      age: '32岁',
      salary: '20-25K'
    }
  },
  projects: [
    {
      date: '2025.11 - 至今',
      title: '祈安CRM系统',
      position: '全栈开发工程师',
      overview: '祈安CRM是一套面向消防安全服务行业的客户关系管理系统，覆盖客户管理、商机跟踪、合同签订、立项审批、业务项目执行等全流程，支撑企业日常业务运营。',
      techStack: ['Vue3', 'TypeScript', 'Element Plus', 'Spring Boot 3', 'MyBatis Plus', 'MySQL 8.0', 'Redis', 'Flowable', 'MinIO', 'Docker', 'GitLab CI/CD'],
      responsibilities: [
        '独立负责系统整体架构设计与核心模块开发',
        '设计并实现客户360°视图，支持多场所、安全要素等行业特性',
        '开发商机→合同→立项→项目的全链路业务流程',
        '设计业务项目简化方案，将12张表优化为1张表+JSON动态扩展',
        '使用Liquibase管理数据库版本迭代，保障多环境数据结构一致性',
        '实现部门级+项目级多维度数据权限控制',
        '开发产品分类扩展字段可视化配置功能，实现零代码扩展',
        '编写.gitlab-ci.yml配置，实现代码提交自动构建、测试、部署'
      ],
      achievements: [
        { value: '90%+', label: '查询效率提升' },
        { value: '70%', label: '代码量减少' },
        { value: '80%', label: '发布效率提升' },
        { value: '30+', label: '支撑员工数' }
      ]
    },
    {
      date: '2025.01 - 2025.11',
      title: '智慧仓储/智慧营地',
      position: '全栈开发工程师',
      overview: '智慧仓储是以物联网三维建模与AI决策为核心的企业级WMS解决方案，系统集成仓库管理、库位管理、物料分类、供应商管理、入库管理、出库管理、库存管理、供应商协同门户等核心业务，通过RFID自动识别与数字孪生技术，赋能企业仓储全链路智能化升级。',
      techStack: ['若依3.8.9', 'Spring Boot', 'MyBatis Plus', 'Vue3', 'Element Plus', 'ECharts', 'Redis', 'Redisson', 'DeepSeek AI', 'RFID', 'PDA', '数字孪生3D'],
      responsibilities: [
        '独立完成若依框架架构改造，实现多租户、多营地的SaaS化架构',
        '负责仓储核心模块开发：仓库管理、库位管理、入库/出库、库存盘点',
        '设计智能出入库引擎，集成PDA扫码与路径优化算法',
        '引入Redis + Redisson实现分布式锁，解决高并发库存扣减问题',
        '统一编码规则与ID生成策略，保障多营地数据隔离与唯一性',
        '统一国际化方案与前端页面样式，提升用户体验一致性',
        '规范后端代码风格与异常处理机制，提高代码可维护性',
        '独立完成智慧员工(报表)模块DeepSeek大模型集成，实现智能数据分析'
      ],
      achievements: [
        { value: '99.6%', label: 'RFID识别准确率' },
        { value: '50%', label: '入库效率提升' },
        { value: '500+', label: '高峰TPS' },
        { value: '100万+', label: '唯一编码生成' }
      ]
    },
    {
      date: '2023.09 - 2024.12',
      title: '工业大数据平台',
      position: '软件开发工程师',
      overview: '数据治理中心（DataArts Studio）是数据全生命周期一站式开发运营平台，提供数据集成、数据开发、数据治理、数据服务等功能，支持行业知识库智能化建设，支持大数据存储与计算分析引擎等数据底座，帮助企业客户快速构建数据运营能力。',
      techStack: ['Spring Cloud', 'Hive', 'Vue', 'Element UI', 'DataArts', 'DataWorks', '开源BI'],
      responsibilities: [
        '独立完成数据指标、数据建模、数据质量三大核心模块的开发设计',
        '参考华为DataArts、阿里DataWorks设计理念，输出符合行业标准的产品方案',
        '使用开源BI技术替代商业方案，为公司节省40万+研发成本',
        '编写完整技术文档（详设、概设、用户手册），保障项目可持续维护',
        '数据质量模块上线后，数据问题发现率提升60%，数据治理效率显著提升'
      ],
      achievements: [
        { value: '3大', label: '核心模块开发' },
        { value: '40万+', label: '节省成本' },
        { value: '60%', label: '问题发现率提升' },
        { value: '100%', label: '文档完整度' }
      ]
    },
    {
      date: '2023.03 - 2023.07',
      title: '国家电网思极安全接入网关',
      position: '全栈开发工程师',
      overview: '国家电网思极网安自主研发的安全接入网关系统，实现对安全控制网关的统一配置管理，包括访问IP地址管理、存储资源管理、用户黑白名单、资源访问控制列表（ACL）配置，对外提供安全访问控制、用户身份认证、安全审计及透明存储加解密能力，保障电力系统数据安全。',
      techStack: ['Spring Boot', 'MyBatis Plus', 'JNI', 'MySQL', 'LayUI', 'ECharts', 'EasyPoi', 'Swagger', 'Maven', 'Nginx'],
      responsibilities: [
        '负责项目技术选型与整体架构设计，基于若依脚手架快速搭建',
        '开发安全网关配置管理模块：IP访问控制、用户黑白名单、ACL策略配置',
        '独立完成运维监控看板开发，实时展示网关运行状态与安全事件',
        '开发ETL数据对接模块，实现安全日志采集与数据同步',
        '搭建分布式任务调度平台，实现定时任务统一管理与监控',
        '使用JNI技术对接底层安全硬件设备，实现加解密功能调用'
      ],
      achievements: [
        { value: '30%', label: '项目周期缩短' },
        { value: '1分钟', label: '安全事件响应' },
        { value: '50万+', label: '日均处理日志' },
        { value: '60%', label: '运维效率提升' }
      ]
    },
    {
      date: '2021.11 - 2023.03',
      title: 'SSC LVR Portal',
      position: '小组组长',
      overview: 'SSC LVR Portal是惠普全球共享服务中心的供应链订单管理平台，为国外业务部门提供订单全生命周期管理服务，包括订单生成、订单查询、订单跟进、订单维护、物流同步、订单延期、费用结算等核心功能，支撑全球供应链业务高效运转。',
      techStack: ['Spring Cloud', 'XXL-JOB', 'JDK11', 'Gradle', 'MyBatis Plus', 'MySQL', 'Redis', 'Vue', 'Element UI', 'Swagger'],
      responsibilities: [
        '担任小组组长，负责项目整体进度把控与团队协调',
        '对接国外业务部门，分析业务需求并输出技术设计方案',
        '独立完成系统整体架构设计与技术选型',
        '负责订单管理核心模块开发：订单生成、订单跟进、订单延期处理',
        '开发物流同步功能，实现与第三方物流系统数据对接',
        '开发费用结算模块，支持多币种结算与账单生成',
        '实现邮件提醒与意见反馈功能，提升用户服务体验',
        '搭建微服务基础框架，完成服务模块划分与配置管理'
      ],
      achievements: [
        { value: '40%', label: '订单处理效率提升' },
        { value: '50%', label: '人工工作量减少' },
        { value: '100%', label: '结算准确率' },
        { value: '3天', label: '月结周期缩短' }
      ]
    },
    {
      date: '2020.12 - 2021.11',
      title: 'SCI Quality Portal',
      position: 'Java顾问',
      overview: '联想供应链质量管理门户，实现供应商质量评估、来料检验、质量追溯等全流程质量管控。',
      techStack: ['Spring Boot', 'JPA', 'SAP HANA', 'Maven', 'Angular', 'Ant Design', 'ECharts', 'Nginx', 'FTP', 'Postman', 'Mockito', 'JUnit'],
      responsibilities: [
        '负责供应商质量评分模块开发，实现多维度KPI计算',
        '开发SAP系统数据对接，实现ERP数据实时同步',
        '设计质量追溯链路，支持产品全生命周期质量查询',
        '开发批量数据导入导出功能，支持Excel/PDF报表生成',
        '集成BSDM/OGAS/Onesupply多系统，实现数据互通',
        '编写单元测试与接口测试，保障代码质量'
      ],
      achievements: [
        { value: '3天', label: '评估周期缩短' },
        { value: '100%', label: '产品可追溯' },
        { value: '80%', label: '定位效率提升' },
        { value: '2秒', label: '查询响应时间' }
      ]
    },
    {
      date: '2020.02 - 2020.12',
      title: '智能制造大数据实训平台',
      position: '全栈开发工程师',
      overview: '面向制造企业的工业互联网平台，实现设备联网、数据采集、生产监控、智能分析，推动工厂数字化转型。',
      techStack: ['Spring Cloud', 'Spring Boot', 'MyBatis Plus', 'MySQL', 'Vue', 'Element UI', 'ECharts', 'Swagger', 'Maven', 'Nginx'],
      responsibilities: [
        '负责设备数据采集模块开发，实现PLC/SCADA数据接入',
        '开发生产监控大屏，实时展示产线OEE、良品率等指标',
        '设计告警规则引擎，实现异常自动检测与通知推送',
        '开发报表统计模块，支持日/周/月生产报表自动生成',
        '实现实时数据推送，保障监控大屏数据实时性',
        '优化数据采集性能，确保高频数据稳定传输'
      ],
      achievements: [
        { value: '100+', label: '设备接入' },
        { value: '99%+', label: '数据完整率' },
        { value: '5分钟', label: '异常响应时间' },
        { value: '15%', label: '产能提升' }
      ]
    },
    {
      date: '2019.02 - 2020.01',
      title: 'HC大数据可视化平台',
      position: '项目经理',
      overview: '企业级大数据可视化分析平台，提供拖拽式报表设计、多数据源接入、实时数据大屏等能力，赋能业务数据分析。',
      techStack: ['Spring Boot', 'MyBatis Plus', 'MySQL', 'Vue', 'Element UI', 'ECharts', 'Data-V', 'Swagger', 'Maven', 'Nginx'],
      responsibilities: [
        '担任团队经理，负责5人团队管理与项目进度把控',
        '主导可视化引擎架构设计，支持20+图表类型动态渲染',
        '开发拖拽式报表设计器，实现零代码报表配置',
        '设计多数据源适配层，支持MySQL/Oracle/API等数据接入',
        '负责技术方案评审与代码Review，保障交付质量'
      ],
      achievements: [
        { value: '95分', label: '客户满意度' },
        { value: '20+', label: '业务部门支撑' },
        { value: '500+', label: '月均生成报表' },
        { value: '70%', label: '制作效率提升' }
      ]
    },
    {
      date: '2018.03 - 2019.02',
      title: 'CRM后台管理系统',
      position: '全栈开发工程师',
      overview: '广告行业CRM系统，管理客户资源、广告排期、合同执行、财务对账等业务，实现广告业务全流程数字化。',
      techStack: ['Spring Boot', 'MyBatis', 'SqlServer', 'Maven', 'React', 'Ant Design', 'OrgChart', 'Redis'],
      responsibilities: [
        '负责客户管理模块开发，实现客户画像与跟进记录',
        '开发广告排期系统，支持多媒体资源统一调度',
        '设计合同执行跟踪功能，实现广告投放进度可视化',
        '开发财务对账模块，自动生成应收应付报表',
        '实现组织架构可视化，支持团队协作管理',
        '优化系统性能，使用Redis缓存提升查询速度'
      ],
      achievements: [
        { value: '50%', label: '录入效率提升' },
        { value: '60%', label: '遗漏率下降' },
        { value: '15分钟', label: '排期耗时' },
        { value: '100%', label: '对账准确率' }
      ]
    },
    {
      date: '2017.07 - 2018.03',
      title: '煤矿安全监控系统',
      position: 'Java开发工程师',
      overview: '煤矿安全生产综合监控平台，融合人员定位、环境监测、视频监控等多子系统，实现井下安全态势一张图管控。',
      techStack: ['Spring MVC', 'Maven', 'Tomcat', 'MongoDB', 'Vue', 'Socket.io', 'Redis', 'Junit'],
      responsibilities: [
        '负责人员定位系统对接，实现井下人员实时位置追踪',
        '开发环境监测数据采集模块，对接瓦斯、一氧化碳等传感器',
        '设计告警联动机制，实现多系统协同告警响应',
        '开发安全态势大屏，实时展示井下安全状态',
        '使用Socket.io实现实时数据推送，保障监控实时性',
        '编写单元测试，保障系统稳定性与可靠性'
      ],
      achievements: [
        { value: '5套', label: '子系统整合' },
        { value: '米级', label: '定位精度' },
        { value: '100%', label: '轨迹可追溯' },
        { value: '30秒', label: '告警响应时间' }
      ]
    }
  ],
  workExperiences: [
    {
      date: '2025.11 - 至今',
      company: '北京祈安注册安全工程师事务所有限公司',
      position: '全栈工程师',
      duties: [
        '参与项目原始需求分析与技术方案讨论，明确开发目标与实现路径',
        '负责前后端功能模块的代码开发与接口联调，保障系统功能完整性和稳定性',
        '参与团队代码评审，提升代码质量与团队开发规范一致性',
        '协同测试团队跟进联调进度，及时推动问题定位与修复',
        '独立解决开发过程中前后端集成的技术难题，保障开发效率与项目进度'
      ]
    },
    {
      date: '2025.01 - 2025.11',
      company: '中联智航（北京）科技有限公司',
      position: '全栈工程师',
      duties: [
        '参与产品需求讨论，协助明确功能实现方向',
        '负责前后端功能开发、联调及测试，保障系统稳定运行',
        '解决开发过程中的技术问题，提升开发效率与代码质量'
      ]
    },
    {
      date: '2023.07 - 2024.12',
      company: '北京君盾科技有限公司',
      position: 'Java开发工程师',
      duties: [
        '参与项目原始需求分析与技术方案讨论，明确开发目标与实现路径',
        '负责前后端功能模块的代码开发与接口联调，保障系统功能完整性和稳定性',
        '参与团队代码评审，提升代码质量与团队开发规范一致性',
        '协同测试团队跟进联调进度，及时推动问题定位与修复',
        '独立解决开发过程中前后端集成的技术难题，保障开发效率与项目进度'
      ]
    },
    {
      date: '2023.03 - 2023.07',
      company: '北京企幕科技有限公司',
      position: 'Java开发工程师',
      duties: [
        '参与项目原始需求分析与技术方案讨论，明确开发目标实现路径',
        '负责前后端功能模块的代码开发与接口联调，保障系统功能完整性和稳定性',
        '参与团队代码评审，提升代码质量与团队开发规范一致性',
        '协同测试团队跟进联调进度，及时推动问题定位与修复',
        '独立解决开发过程中前后端集成的技术难题，保障开发效率与项目进度'
      ]
    },
    {
      date: '2020.01 - 2023.03',
      company: '北京科锐国际人力资源股份有限公司',
      position: 'Java开发工程师',
      duties: [
        '参与项目原始需求分析与技术方案讨论，明确开发目标与实现路径',
        '负责前后端功能模块的代码开发与接口联调，保障系统功能完整性和稳定性',
        '参与团队代码评审，提升代码质量与团队开发规范一致性',
        '协同测试团队跟进联调进度，及时推动问题定位与修复',
        '独立解决开发过程中前后端集成的技术难题，保障开发效率与项目进度'
      ]
    },
    {
      date: '2017.07 - 2020.01',
      company: '河南元博软件有限公司',
      position: 'Java开发工程师',
      duties: [
        '对新老系统遇到的问题 提供相应的解决方案',
        '对新系统开发做出技术支持',
        '对项目进度做出跟进把控',
        '对当月已完成 未完成工作 做出风险评估',
        '对项目遇到的问题，组织相关的评审，验收会议调内外部团队的工作内容，兼一部分的项目开发工作'
      ]
    }
  ],
  education: [
    {
      school: '天津工业大学',
      degree: '本科',
      major: '软件工程',
      period: '2015 - 2017',
      highlights: ['软件开发', '数据结构', '算法设计', '数据库原理']
    }
  ]
};
