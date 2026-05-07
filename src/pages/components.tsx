import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import {
  Tag,
  Badge,
  Hero,
  Button,
  Card,
  CollapsibleCard,
  Toast,
  CTASection,
  StatsCard,
  ContactCard,
  TechCard,
  ImageCard,
  CodeBlock,
  Timeline,
  BentoCard,
  Alert,
  Input,
  Bubble,
  Table,
  DataTable,
  ProgressBar,
  Avatar,
  Modal,
  Slider,
  Divider,
  Skeleton,
  Tabs,
  Accordion,
  Pagination,
  Breadcrumb,
  Dropdown,
  Sidebar,
} from '@site/src/components/Common';
import styles from './components.module.css';

export default function ComponentsLibrary(): JSX.Element {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<'default' | 'success' | 'error' | 'warning' | 'info'>('default');
  const [showModal, setShowModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  const handleShowToast = (variant: typeof toastVariant) => {
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <Layout
      title={translate({ id: 'components.title', message: '组件库' })}
      description={translate({ id: 'components.description', message: 'DevManga 漫画风格组件库' })}
    >
      <main className={styles.componentsMain}>
        {/* Toast Demo */}
        <Toast
          message={`这是${toastVariant}类型的提示框！`}
          visible={showToast}
          variant={toastVariant}
          onClose={() => setShowToast(false)}
        />

        {/* Hero Section */}
        <Hero
          badge="COMPONENT LIBRARY"
          title="DevManga 组件库"
          description="完整的漫画风格React组件集合，包含多种变体和样式"
          align="center"
        />

        {/* Components Showcase */}
        <div className={styles.showcase}>
          {/* Tag Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tag 标签</h2>
            <p className={styles.sectionDesc}>方角标签，支持倾斜动画和4色循环</p>
            <div className={styles.demo}>
              <Tag label="React" />
              <Tag label="Vue" href="/blog" />
              <Tag label="Angular" onClick={() => alert('Clicked!')} />
              <Tag label="Svelte" />
            </div>
          </section>


          {/* Badge Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Badge 徽章</h2>
            <p className={styles.sectionDesc}>4种动画变体：bounce、static、rotate、pulse</p>
            <div className={styles.demo}>
              <Badge variant="bounce">BOUNCE</Badge>
              <Badge variant="static">STATIC</Badge>
              <Badge variant="rotate">ROTATE</Badge>
              <Badge variant="pulse">PULSE</Badge>
            </div>
          </section>

          {/* Button Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Button 按钮</h2>
            <p className={styles.sectionDesc}>5种变体：primary、secondary、tertiary、outline、ghost</p>
            <div className={styles.demo}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button icon="arrow_forward">With Icon</Button>
            </div>
          </section>

          {/* Card Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Card 卡片</h2>
            <p className={styles.sectionDesc}>多种变体：default、comic、monitor、float、minimal、square、rounded、skewed</p>
            <div className={styles.cardGrid}>
              <Card
                title="Default 默认"
                description="默认倾斜风格的卡片，带有4色阴影循环效果"
                variant="default"
                tags={[{ label: 'React' }]}
              />
              <Card
                title="Comic 漫画"
                description="更夸张的漫画效果，带有旋转动画"
                variant="comic"
                tags={[{ label: 'Vue' }]}
              />
              <Card
                title="Square 方角"
                description="完全方角的卡片设计，简洁现代"
                variant="square"
                tags={[{ label: 'Angular' }]}
              />
              <Card
                title="Rounded 圆角"
                description="大圆角设计，柔和友好的视觉效果"
                variant="rounded"
                tags={[{ label: 'Svelte' }]}
              />
              <Card
                title="Skewed 倾斜"
                description="Y轴倾斜效果，独特的视觉风格"
                variant="skewed"
                tags={[{ label: 'Next.js' }]}
              />
            </div>
          </section>

          {/* CollapsibleCard Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>CollapsibleCard 折叠卡片</h2>
            <p className={styles.sectionDesc}>可折叠的卡片组件，支持多种颜色和变体</p>
            <div className={styles.cardGrid}>
              <CollapsibleCard
                title="新安CRM系统"
                subtitle="全栈开发工程师"
                badge="2025.11 - 至今"
                color="red"
                defaultExpanded={true}
              >
                <p>项目概述：新安CRM是一套面向消防器材服务行业的客户关系管理系统，覆盖客户管理、商机跟踪、合同签订、工单派发、业务员自行等全流程，支持企业日常业务运营。</p>
              </CollapsibleCard>
              <CollapsibleCard
                title="智慧仓储/智慧营地"
                subtitle="全栈开发工程师"
                badge="2025.01 - 2025.11"
                color="cyan"
              >
                <p>智慧仓储是以物联网为基础的三维建模与AI大模型为方向的企业级WMS解决方案，系统集成仓储管理、库位管理、物位管理、物料分析、供应商管理、入库管理、出库管理、库存管理、盘点管理、报废管理等功能。</p>
              </CollapsibleCard>
              <CollapsibleCard
                title="数据治理中心"
                subtitle="全栈开发工程师"
                badge="2023.09 - 2024.12"
                color="yellow"
                variant="comic"
              >
                <p>数据治理中心（DataArts Studio）是整合全生命周期应用一站式开发运营平台，提供数据集成、数据开发、数据治理、数据服务等功能，支持行业知识库智能化建设，支持大数据存储与计算分析等数据能能，帮助企业客户快速构建数据运营能力。</p>
              </CollapsibleCard>
            </div>
          </section>

          {/* StatsCard Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>StatsCard 统计卡片</h2>
            <p className={styles.sectionDesc}>用于展示统计数据</p>
            <div className={styles.statsGrid}>
              <StatsCard number="9年+" label="工作经验" />
              <StatsCard number="10+" label="核心项目" />
              <StatsCard number="20+" label="技术栈" />
              <StatsCard number="6家" label="知名企业" />
            </div>
          </section>

          {/* ContactCard Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ContactCard 联系卡片</h2>
            <p className={styles.sectionDesc}>用于展示联系信息</p>
            <div className={styles.contactGrid}>
              <ContactCard icon="phone" label="电话" value="13261915710" />
              <ContactCard icon="email" label="邮箱" value="example@qq.com" />
              <ContactCard icon="location_on" label="位置" value="北京 · 32岁" />
              <ContactCard icon="payments" label="期望薪资" value="20-25K" />
            </div>
          </section>

          {/* TechCard Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>TechCard 技术卡片</h2>
            <p className={styles.sectionDesc}>用于展示技术栈，支持3种颜色变体：primary、secondary、tertiary</p>
            <div className={styles.techGrid}>
              <TechCard icon="data_object" name="TypeScript" variant="primary" />
              <TechCard icon="layers" name="React/Next" variant="secondary" />
              <TechCard icon="database" name="PostgreSQL" variant="tertiary" />
              <TechCard icon="cloud_done" name="Cloudflare" variant="primary" />
            </div>
          </section>


          {/* ImageCard Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ImageCard 图片卡片</h2>
            <p className={styles.sectionDesc}>用于角色/柱选择，支持光环效果</p>
            <div className={styles.imageGrid}>
              <ImageCard
                image="/img/home/beatrice.jpg"
                name="贝蒂"
                nameEn="Beatrice"
                color="yellow-blue"
                isActive={true}
              />
              <ImageCard
                image="/img/home/emilia.jpg"
                name="艾米莉亚"
                nameEn="Emilia"
                title="主角"
                color="purple-pink"
              />
              <ImageCard
                image="/img/home/rem-blue.jpg"
                name="蕾姆"
                nameEn="Rem"
                color="pink-blue"
              />
            </div>
          </section>

          {/* Toast Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Toast 提示框</h2>
            <p className={styles.sectionDesc}>漫画风格的提示框，支持5种变体和4种位置</p>
            <div className={styles.demo}>
              <Button onClick={() => handleShowToast('default')}>默认 Toast</Button>
              <Button onClick={() => handleShowToast('success')}>成功 Toast</Button>
              <Button onClick={() => handleShowToast('error')}>错误 Toast</Button>
              <Button onClick={() => handleShowToast('warning')}>警告 Toast</Button>
              <Button onClick={() => handleShowToast('info')}>信息 Toast</Button>
            </div>
          </section>

          {/* Alert Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Alert 警告框</h2>
            <p className={styles.sectionDesc}>多种类型的警告提示框</p>
            <div className={styles.alertGrid}>
              <Alert
                variant="success"
                title="操作成功"
                message="你的更改已成功保存！"
                closable
              />
              <Alert
                variant="error"
                title="操作失败"
                message="发生了一个错误，请稍后重试。"
                closable
              />
              <Alert
                variant="warning"
                title="注意"
                message="此操作可能会影响系统性能。"
                closable
              />
              <Alert
                variant="info"
                message="这是一条信息提示。"
              />
            </div>
          </section>

          {/* CTASection Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>CTASection 行动号召</h2>
            <p className={styles.sectionDesc}>带呼吸火花动画的CTA区域</p>
            <CTASection
              quote="代码不仅是工具，更是创造价值的艺术"
              tags={['创新', '品质', '卓越']}
              icon="flare"
            />
          </section>

          {/* CodeBlock Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>CodeBlock 代码块</h2>
            <p className={styles.sectionDesc}>漫画风格的代码块，支持行号和高亮</p>
            <CodeBlock
              code={`function hello() {\n  console.log('Hello World!');\n  return true;\n}`}
              language="javascript"
              title="example.js"
              showLineNumbers={true}
              highlightLines={[2]}
            />
          </section>

          {/* Timeline Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Timeline 时间线</h2>
            <p className={styles.sectionDesc}>用于展示工作/项目经历</p>
            <Timeline
              items={[
                {
                  date: '2024-01',
                  title: '高级全栈工程师',
                  subtitle: 'XX科技公司',
                  items: [
                    '负责核心业务系统的架构设计和开发',
                    '带领团队完成多个重点项目',
                  ],
                },
                {
                  date: '2022-06',
                  title: '全栈工程师',
                  subtitle: 'YY互联网公司',
                  items: ['参与大型电商平台的开发', '优化系统性能'],
                },
              ]}
            />
          </section>

          {/* BentoCard Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>BentoCard Bento网格卡片</h2>
            <p className={styles.sectionDesc}>用于技能展示的网格卡片</p>
            <div className={styles.bentoGrid}>
              <BentoCard
                title="后端框架"
                icon="terminal"
                colSpan={8}
                bgColor="white"
                tags={['SPRING', 'MYBATIS-PLUS', 'SPRINGBOOT', 'SPRINGCLOUD']}
              />
              <BentoCard
                title="前端框架"
                icon="draw"
                colSpan={4}
                bgColor="yellow"
                tags={['VUE', 'REACT', 'ANGULAR']}
              />
            </div>
          </section>

          {/* Input Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Input 输入框</h2>
            <p className={styles.sectionDesc}>多种样式的输入框组件</p>
            <div className={styles.inputGrid}>
              <Input
                label="用户名"
                placeholder="请输入用户名"
                icon="person"
                required
              />
              <Input
                label="邮箱"
                type="email"
                placeholder="example@email.com"
                icon="email"
                variant="filled"
              />
              <Input
                label="密码"
                type="password"
                placeholder="请输入密码"
                icon="lock"
                variant="outlined"
                error="密码长度至少8位"
              />
              <Input
                placeholder="搜索..."
                icon="search"
                size="lg"
              />
            </div>
          </section>

          {/* Bubble Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Bubble 气泡卡片</h2>
            <p className={styles.sectionDesc}>对话气泡，支持多种样式</p>
            <div className={styles.bubbleDemo}>
              <Bubble
                variant="speech"
                position="left"
                author="开发者"
                avatar="/img/home/beatrice.jpg"
              >
                这是一个普通的对话气泡！
              </Bubble>
              <Bubble
                variant="thought"
                position="right"
                author="设计师"
                avatar="/img/home/emilia.jpg"
              >
                这是一个思考气泡...
              </Bubble>
              <Bubble
                variant="shout"
                position="left"
                author="产品经理"
              >
                这个功能必须今天上线！！！
              </Bubble>
            </div>
          </section>

          {/* Table Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Table 表格</h2>
            <p className={styles.sectionDesc}>漫画风格的数据表格</p>
            <Table
              columns={[
                { key: 'name', title: '组件名称' },
                { key: 'type', title: '类型' },
                { key: 'status', title: '状态', align: 'center' },
                { key: 'version', title: '版本', align: 'right' },
              ]}
              data={[
                { name: 'Button', type: '按钮', status: '✅ 完成', version: 'v1.0.0' },
                { name: 'Card', type: '卡片', status: '✅ 完成', version: 'v1.2.0' },
                { name: 'Input', type: '输入框', status: '✅ 完成', version: 'v1.0.0' },
                { name: 'Table', type: '表格', status: '✅ 完成', version: 'v1.0.0' },
                { name: 'Modal', type: '弹窗', status: '✅ 完成', version: 'v1.0.0' },
              ]}
            />
          </section>

          {/* ProgressBar Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ProgressBar 进度条</h2>
            <p className={styles.sectionDesc}>多种样式的进度条组件</p>
            <div className={styles.progressGrid}>
              <ProgressBar value={75} label="默认进度条" showValue />
              <ProgressBar value={60} variant="striped" color="secondary" label="条纹进度条" />
              <ProgressBar value={85} variant="animated" color="tertiary" label="动画进度条" />
              <ProgressBar value={90} variant="gradient" color="primary" label="渐变进度条" showValue />
              <ProgressBar value={45} variant="glow" color="error" label="发光进度条" size="lg" />
            </div>
          </section>

          {/* Avatar Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Avatar 头像</h2>
            <p className={styles.sectionDesc}>用户头像组件，支持多种尺寸和样式</p>
            <div className={styles.avatarGrid}>
              <Avatar src="/img/home/beatrice.jpg" alt="Beatrice" size="xs" />
              <Avatar src="/img/home/emilia.jpg" alt="Emilia" size="sm" online />
              <Avatar src="/img/home/rem.jpg" alt="Rem" size="md" badge="5" />
              <Avatar src="/img/home/ram.jpg" alt="Ram" size="lg" variant="rounded" />
              <Avatar fallback="DM" size="xl" variant="square" />
            </div>
          </section>

          {/* Modal Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Modal 弹窗</h2>
            <p className={styles.sectionDesc}>模态对话框组件</p>
            <div className={styles.modalDemo}>
              <Button onClick={() => setShowModal(true)}>打开弹窗</Button>
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="欢迎使用组件库"
                size="md"
                footer={
                  <>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      取消
                    </Button>
                    <Button onClick={() => setShowModal(false)}>确认</Button>
                  </>
                }
              >
                <p>这是一个漫画风格的弹窗组件，支持多种尺寸和自定义内容。</p>
                <p>你可以在这里放置任何内容，包括表单、图片、文本等。</p>
              </Modal>
            </div>
          </section>

          {/* Slider Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Slider 滑块</h2>
            <p className={styles.sectionDesc}>滑动选择器组件</p>
            <div className={styles.sliderGrid}>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                label="音量"
                showValue
              />
              <Slider
                value={70}
                onChange={() => {}}
                variant="manga"
                label="亮度"
              />
              <Slider
                value={30}
                onChange={() => {}}
                variant="minimal"
                label="对比度"
                showValue
              />
            </div>
          </section>

          {/* Divider Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Divider 分隔线</h2>
            <p className={styles.sectionDesc}>内容分隔组件</p>
            <div className={styles.dividerDemo}>
              <Divider variant="solid" />
              <Divider variant="dashed" label="虚线分隔" />
              <Divider variant="dotted" />
              <Divider variant="gradient" label="渐变分隔" />
              <Divider variant="comic" label="漫画风格" />
            </div>
          </section>

          {/* Skeleton Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skeleton 骨架屏</h2>
            <p className={styles.sectionDesc}>加载占位组件</p>
            <div className={styles.skeletonDemo}>
              <div className={styles.skeletonCard}>
                <Skeleton variant="circular" width={60} height={60} />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" count={3} />
                </div>
              </div>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="rounded" height={150} />
            </div>
          </section>

          {/* DataTable Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>DataTable 增强表格</h2>
            <p className={styles.sectionDesc}>支持搜索、排序、分页的数据表格</p>
            <DataTable
              columns={[
                { key: 'name', title: '姓名', sortable: true },
                { key: 'age', title: '年龄', sortable: true, align: 'center' },
                { key: 'city', title: '城市', sortable: true },
                { key: 'role', title: '职位' },
              ]}
              data={[
                { name: '张三', age: 28, city: '北京', role: '前端工程师' },
                { name: '李四', age: 32, city: '上海', role: '后端工程师' },
                { name: '王五', age: 25, city: '深圳', role: '全栈工程师' },
                { name: '赵六', age: 30, city: '杭州', role: '架构师' },
                { name: '钱七', age: 27, city: '成都', role: 'UI设计师' },
                { name: '孙八', age: 29, city: '广州', role: '产品经理' },
              ]}
              searchable
              paginated
              pageSize={5}
              variant="default"
            />
          </section>

          {/* Tabs Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tabs 标签页</h2>
            <p className={styles.sectionDesc}>4种变体：default、pills、underline、comic</p>
            <Tabs
              items={[
                {
                  key: 'tab1',
                  label: '基础信息',
                  icon: 'person',
                  content: (
                    <div>
                      <h3>个人简介</h3>
                      <p>这是第一个标签页的内容，展示基础信息。</p>
                    </div>
                  ),
                },
                {
                  key: 'tab2',
                  label: '技能特长',
                  icon: 'code',
                  content: (
                    <div>
                      <h3>技术栈</h3>
                      <p>React、TypeScript、Node.js、Python等。</p>
                    </div>
                  ),
                },
                {
                  key: 'tab3',
                  label: '项目经验',
                  icon: 'work',
                  content: (
                    <div>
                      <h3>项目列表</h3>
                      <p>参与过多个大型项目的开发和维护。</p>
                    </div>
                  ),
                },
              ]}
              variant="pills"
            />
          </section>

          {/* Accordion Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Accordion 手风琴</h2>
            <p className={styles.sectionDesc}>可折叠的内容面板</p>
            <Accordion
              items={[
                {
                  key: 'acc1',
                  title: '什么是React？',
                  icon: 'help',
                  content: (
                    <p>
                      React是一个用于构建用户界面的JavaScript库，由Facebook开发和维护。
                    </p>
                  ),
                },
                {
                  key: 'acc2',
                  title: '什么是TypeScript？',
                  icon: 'help',
                  content: (
                    <p>
                      TypeScript是JavaScript的超集，添加了静态类型检查和其他特性。
                    </p>
                  ),
                },
                {
                  key: 'acc3',
                  title: '什么是Docusaurus？',
                  icon: 'help',
                  content: (
                    <p>
                      Docusaurus是一个静态网站生成器，专为构建文档网站而设计。
                    </p>
                  ),
                },
              ]}
              variant="default"
              defaultOpenKeys={['acc1']}
            />
          </section>

          {/* Pagination Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Pagination 分页</h2>
            <p className={styles.sectionDesc}>支持页码跳转和每页数量选择</p>
            <div className={styles.paginationDemo}>
              <Pagination
                current={3}
                total={100}
                pageSize={10}
                variant="default"
                showSizeChanger
                showQuickJumper
                onChange={(page) => console.log('Page:', page)}
                onPageSizeChange={(size) => console.log('Size:', size)}
              />
            </div>
          </section>

          {/* Breadcrumb Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Breadcrumb 面包屑</h2>
            <p className={styles.sectionDesc}>导航路径指示器</p>
            <div className={styles.breadcrumbDemo}>
              <Breadcrumb
                items={[
                  { label: '首页', href: '/', icon: 'home' },
                  { label: '组件库', href: '/components' },
                  { label: '面包屑', icon: 'arrow_forward' },
                ]}
                variant="default"
              />
              <Breadcrumb
                items={[
                  { label: '首页', href: '/' },
                  { label: '文档', href: '/docs' },
                  { label: '指南' },
                ]}
                variant="comic"
              />
            </div>
          </section>

          {/* Dropdown Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Dropdown 下拉菜单</h2>
            <p className={styles.sectionDesc}>下拉选择菜单</p>
            <div className={styles.dropdownDemo}>
              <Dropdown
                trigger={<Button>操作菜单</Button>}
                items={[
                  { key: '1', label: '编辑', icon: 'edit', onClick: () => alert('编辑') },
                  { key: '2', label: '复制', icon: 'content_copy', onClick: () => alert('复制') },
                  { key: '3', label: '分享', icon: 'share', onClick: () => alert('分享') },
                  { key: '4', label: '删除', icon: 'delete', danger: true, onClick: () => alert('删除') },
                ]}
                variant="default"
              />
            </div>
          </section>

          {/* Sidebar Component */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sidebar 侧边栏</h2>
            <p className={styles.sectionDesc}>导航侧边栏组件</p>
            <div className={styles.sidebarDemo}>
              <Sidebar
                title="导航菜单"
                collapsible
                items={[
                  {
                    key: 'home',
                    label: '首页',
                    icon: 'home',
                    onClick: () => console.log('首页'),
                  },
                  {
                    key: 'docs',
                    label: '文档',
                    icon: 'description',
                    children: [
                      { key: 'intro', label: '介绍', onClick: () => console.log('介绍') },
                      { key: 'guide', label: '指南', onClick: () => console.log('指南') },
                    ],
                  },
                  {
                    key: 'components',
                    label: '组件',
                    icon: 'widgets',
                    children: [
                      { key: 'button', label: '按钮', onClick: () => console.log('按钮') },
                      { key: 'card', label: '卡片', onClick: () => console.log('卡片') },
                    ],
                  },
                  {
                    key: 'about',
                    label: '关于',
                    icon: 'info',
                    onClick: () => console.log('关于'),
                  },
                ]}
                variant="default"
              />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

