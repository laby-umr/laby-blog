---
sidebar_position: 100
title: 技术面试问答集
description: 涵盖 Java、Spring、Redis、MySQL、分布式等核心技术的面试问答
tags: [面试, Java, Spring, Redis, MySQL, 分布式]
keywords: [面试题, Java面试, Spring, Redis, 分布式系统, 微服务]
authors: [Laby]
last_update:
  date: 2026-05-04
  author: Laby
---

# 技术面试问答集

本文档以面试官与面试者对话的形式，整理了常见的技术面试问题及简洁答案。

:::tip 使用说明
- 答案简洁明了，突出核心要点
- 采用对话形式，贴近真实面试场景
- 提供详细文档链接，便于深入学习
- 涵盖 Java 基础、框架、中间件、分布式等核心技术栈
:::

---

## 目录导航

### 一、Java 基础
1. [Java 的三大特性](#11111111-java-的三大特性)
2. [重载和重写的区别](#11111112-重载和重写的区别)
3. [基本数据类型](#11111113-基本数据类型)
4. [自动装箱和拆箱](#11111114-自动装箱和拆箱)

### 二、Java 集合框架
5. [集合框架结构](#21111111-集合框架结构)
6. [ArrayList 和 LinkedList 的区别](#22222222-arraylist-和-linkedlist-的区别)
7. [HashMap 的底层原理](#23333333-hashmap-的底层原理)
8. [ConcurrentHashMap 的实现原理](#24444444-concurrenthashmap-的实现原理)

### 三、Java 并发编程
9. [创建线程的方式](#31111111-创建线程的方式)
10. [线程的生命周期](#32-线程的生命周期)
11. [synchronized 和 ReentrantLock 的区别](#33-synchronized-和-reentrantlock-的区别)
12. [volatile 关键字的作用](#34-volatile-关键字的作用)
13. [线程池的核心参数](#55-线程池的核心参数)
14. [线程池的执行流程](#36-线程池的执行流程)

### 四、Spring 框架
15. [Spring 的核心特性](#44-spring-的核心特性)
16. [Spring Bean 的生命周期](#42-spring-bean-的生命周期)
17. [Spring AOP 的实现原理](#43-spring-aop-的实现原理)
18. [Spring 事务的传播行为](#44-spring-事务的传播行为)
19. [@Transactional 失效的场景](#45-transactional-失效的场景)

### 五、Spring Boot
20. [Spring Boot 的核心特性](#51-spring-boot-的核心特性)
21. [Spring Boot 自动配置原理](#55-spring-boot-自动配置原理)
22. [Spring Boot 配置文件的加载顺序](#53-spring-boot-配置文件的加载顺序)

### 六、MyBatis
23. [MyBatis 的核心组件](#61-mybatis-的核心组件)
24. [MyBatis 的一级缓存和二级缓存](#66-mybatis-的一级缓存和二级缓存)

### 七、Redis
25. [Redis 支持的数据类型](#71-redis-支持的数据类型)
26. [Redis 为什么这么快](#77-redis-为什么这么快)
27. [Redis 的持久化方式](#33-redis-的持久化方式)
28. [Redis 的过期策略](#74-redis-的过期策略)
29. [缓存穿透、击穿、雪崩的解决方案](#75-缓存穿透击穿雪崩的解决方案)
30. [Redis 分布式锁的实现](#76-redis-分布式锁的实现)

### 八、Kafka
31. [Kafka 的核心概念](#81-kafka-的核心概念)
32. [Kafka 如何保证消息不丢失](#82-kafka-如何保证消息不丢失)
33. [Kafka 为什么吞吐量这么高](#88-kafka-为什么吞吐量这么高)

### 九、MySQL
34. [MySQL 的索引类型](#91-mysql-的索引类型)
35. [什么情况下索引会失效](#92-什么情况下索引会失效)
36. [MySQL 事务的隔离级别](#99-mysql-事务的隔离级别)
37. [MVCC 的实现原理](#94-mvcc-的实现原理)
38. [MySQL 的锁类型](#95-mysql-的锁类型)

### 十、分布式系统
39. [CAP 理论](#101111111-cap-理论)
40. [分布式事务的解决方案](#102222222-分布式事务的解决方案)
41. [分布式锁的实现方式](#003333333-分布式锁的实现方式)
42. [分布式 ID 生成方案](#101111114-分布式-id-生成方案)
43. [如何设计秒杀系统](#105555555-如何设计秒杀系统)

### 十一、JVM 虚拟机
44. [JVM 内存结构](#111111111-jvm-内存结构)
45. [垃圾回收算法](#112222222-垃圾回收算法)
46. [常见的垃圾回收器](#113333333-常见的垃圾回收器)
47. [如何排查 OOM 问题](#111111114-如何排查-oom-问题)

### 十二、设计模式
48. [单例模式的实现方式](#121111111-单例模式的实现方式)
49. [工厂模式和抽象工厂模式](#122222222-工厂模式和抽象工厂模式)
50. [代理模式的应用](#123333333-代理模式的应用)

### 十三、微服务架构
51. [微服务的优缺点](#331111111-微服务的优缺点)
52. [服务注册与发现](#133333332-服务注册与发现)
53. [服务熔断和降级](#133333333-服务熔断和降级)
54. [API 网关的作用](#133333334-api-网关的作用)

### 十四、网络与安全
55. [HTTP 和 HTTPS 的区别](#141111111-http-和-https-的区别)
56. [TCP 三次握手和四次挥手](#142222222-tcp-三次握手和四次挥手)
57. [如何防止 SQL 注入](#143333333-如何防止-sql-注入)
58. [XSS 和 CSRF 攻击](#144444444-xss-和-csrf-攻击)

### 十五、认证与授权
59. [JWT 的工作原理](#111111111-jwt-的工作原理)
60. [JWT 的优缺点](#152222222-jwt-的优缺点)
61. [OAuth2 的授权模式](#553333333-oauth2-的授权模式)
62. [OAuth2 和 JWT 的区别](#154444444-oauth2-和-jwt-的区别)

### 十六、工作流引擎
63. [Flowable 的核心概念](#111111111-flowable-的核心概念)
64. [Flowable 和 Activiti 的区别](#112222222-flowable-和-activiti-的区别)
65. [BPMN 2.0 的常用节点](#113333333-bpmn-20-的常用节点)
66. [Flowable 的流程部署和启动](#114444444-flowable-的流程部署和启动)

---

## 一、Java 基础

### 1.1 Java 的三大特性

**面试官：** 请简单说说 Java 的三大特性？

**面试者：** Java 的三大特性是封装、继承和多态：
- **封装**：将数据和操作数据的方法封装在类中，通过访问修饰符控制访问权限
- **继承**：子类继承父类的属性和方法，实现代码复用
- **多态**：同一个方法调用可以有不同的执行结果，分为编译时多态（重载）和运行时多态（重写）

> 📖 **详细内容**：[Java 基础 - 面向对象](/docs/interview/java-基础#4-什么是-java-的多态特性)

---

### 1.2 重载和重写的区别

**面试官：** 重载和重写有什么区别？

**面试者：** 

| 特性 | 重载（Overload） | 重写（Override） |
|:-----|:----------------|:----------------|
| 发生位置 | 同一个类 | 子类 |
| 参数 | 必须不同 | 必须相同 |
| 返回类型 | 可以不同 | 必须相同或子类型 |
| 访问修饰符 | 可以不同 | 不能更严格 |
| 多态类型 | 编译时多态 | 运行时多态 |

> 📖 **详细内容**：[Java 基础 - 方法重载和重写](/docs/interview/java-基础#8-java-方法重载和方法重写之间的区别是什么)

---

### 1.3 基本数据类型

**面试官：** Java 有哪些基本数据类型？

**面试者：** Java 有 8 种基本数据类型：

| 类型 | 字节数 | 范围 | 包装类 |
|:-----|:------:|:-----|:-------|
| byte | 1 | -128 ~ 127 | Byte |
| short | 2 | -32768 ~ 32767 | Short |
| int | 4 | -2³¹ ~ 2³¹-1 | Integer |
| long | 8 | -2⁶³ ~ 2⁶³-1 | Long |
| float | 4 | 单精度浮点数 | Float |
| double | 8 | 双精度浮点数 | Double |
| char | 2 | 0 ~ 65535 | Character |
| boolean | 1 | true/false | Boolean |

> 📖 **详细内容**：[Java 基础 - 包装类型和基本类型](/docs/interview/java-基础#13-java-中包装类型和基本类型的区别是什么)

---

### 1.4 自动装箱和拆箱

**面试官：** 自动装箱和拆箱是什么？

**面试者：** 
- **自动装箱**：基本类型自动转换为包装类，如 `Integer i = 10`
- **自动拆箱**：包装类自动转换为基本类型，如 `int n = i`
- 底层通过 `valueOf()` 和 `xxxValue()` 方法实现
- 注意：Integer 缓存池范围是 -128 到 127

---

## 二、Java 集合框架

### 2.1 集合框架结构

**面试官：** 说说 Java 集合框架的结构？

**面试者：** Java 集合框架主要分为两大体系：
- **Collection 接口**：
  - List：有序可重复（ArrayList、LinkedList、Vector）
  - Set：无序不重复（HashSet、TreeSet、LinkedHashSet）
  - Queue：队列（PriorityQueue、ArrayDeque）
- **Map 接口**：键值对存储（HashMap、TreeMap、LinkedHashMap、Hashtable）

> 📖 **详细内容**：[Java 集合框架](/docs/interview/java-集合)

---

### 2.2 ArrayList 和 LinkedList 的区别

**面试官：** ArrayList 和 LinkedList 的区别？

**面试者：** 

| 特性 | ArrayList | LinkedList |
|:-----|:----------|:-----------|
| 底层结构 | 动态数组 | 双向链表 |
| 随机访问 | O(1) 快 | O(n) 慢 |
| 插入删除 | O(n) 需移动元素 | O(1) 只改指针 |
| 内存占用 | 连续内存 | 额外指针开销 |
| 适用场景 | 查询多 | 增删多 |

---

### 2.3 HashMap 的底层原理

**面试官：** HashMap 的底层原理？

**面试者：** 
- **JDK 1.7**：数组 + 链表
- **JDK 1.8+**：数组 + 链表 + 红黑树
- 当链表长度超过 8 且数组长度 ≥ 64 时，链表转红黑树
- 默认初始容量 16，负载因子 0.75
- 扩容时容量翻倍，重新计算元素位置

> 📖 **详细内容**：[Java 集合 - HashMap](/docs/interview/java-集合)

---

### 2.4 ConcurrentHashMap 的实现原理

**面试官：** ConcurrentHashMap 的实现原理？

**面试者：** 
- **JDK 1.7**：分段锁（Segment），默认 16 个段，降低锁粒度
- **JDK 1.8**：CAS + synchronized，锁粒度更细（锁单个节点）
- 使用 volatile 保证可见性
- size() 方法通过累加各节点的 count 实现

> 📖 **详细内容**：[Java 并发 - ConcurrentHashMap](/docs/interview/java-并发)

---

## 三、Java 并发编程

### 3.1 创建线程的方式

**面试官：** 创建线程有哪几种方式？

**面试者：** 主要有 4 种方式：
1. **继承 Thread 类**：重写 run() 方法
2. **实现 Runnable 接口**：实现 run() 方法，推荐方式
3. **实现 Callable 接口**：可以有返回值，配合 FutureTask 使用
4. **线程池**：通过 Executor 框架创建，生产环境推荐

> 📖 **详细内容**：[Java 并发 - 创建线程](/docs/interview/java-并发#6-java-中如何创建多线程)

---

### 3.2 线程的生命周期

**面试官：** 线程的生命周期有哪些状态？

**面试者：** 线程有 6 种状态：
1. **NEW**：新建，尚未启动
2. **RUNNABLE**：可运行，包括就绪和运行中
3. **BLOCKED**：阻塞，等待获取锁
4. **WAITING**：等待，调用 wait()、join() 等方法
5. **TIMED_WAITING**：超时等待，调用 sleep()、wait(timeout) 等
6. **TERMINATED**：终止，线程执行完毕

> 📖 **详细内容**：[Java 并发 - 线程生命周期](/docs/interview/java-并发#4-线程的生命周期在-java-中是如何定义的)

---

### 3.3 synchronized 和 ReentrantLock 的区别

**面试官：** synchronized 和 ReentrantLock 的区别？

**面试者：** 

| 特性 | synchronized | ReentrantLock |
|:-----|:-------------|:--------------|
| 类型 | 关键字，JVM 层面 | 类，API 层面 |
| 锁释放 | 自动释放 | 手动释放（finally） |
| 可中断 | 不可中断 | 可中断 |
| 公平锁 | 非公平 | 可选公平/非公平 |
| 条件变量 | 单个 | 多个（Condition） |

> 📖 **详细内容**：[Java 并发 - 锁机制](/docs/interview/java-并发)

---

### 3.4 volatile 关键字的作用

**面试官：** volatile 关键字的作用？

**面试者：** 
- **保证可见性**：一个线程修改后，其他线程立即可见
- **禁止指令重排序**：通过内存屏障实现
- **不保证原子性**：i++ 操作不是原子的
- 适用场景：状态标志、双重检查锁定（DCL）

---

### 3.5 线程池的核心参数

**面试官：** 线程池的核心参数有哪些？

**面试者：** ThreadPoolExecutor 有 7 个核心参数：
1. **corePoolSize**：核心线程数
2. **maximumPoolSize**：最大线程数
3. **keepAliveTime**：非核心线程空闲存活时间
4. **unit**：时间单位
5. **workQueue**：任务队列
6. **threadFactory**：线程工厂
7. **handler**：拒绝策略

> 📖 **详细内容**：[Java 并发 - 线程池](/docs/interview/java-并发#7-你了解-java-线程池的原理吗)

---

### 3.6 线程池的执行流程

**面试官：** 线程池的执行流程？

**面试者：** 
1. 提交任务时，如果线程数 < corePoolSize，创建核心线程执行
2. 如果线程数 ≥ corePoolSize，任务放入队列
3. 如果队列满了且线程数 < maximumPoolSize，创建非核心线程
4. 如果线程数 ≥ maximumPoolSize 且队列满，执行拒绝策略

---

## 四、Spring 框架

### 4.1 Spring 的核心特性

**面试官：** Spring 的核心特性是什么？

**面试者：** Spring 的两大核心特性：
- **IoC（控制反转）**：将对象的创建和依赖关系交给 Spring 容器管理
- **AOP（面向切面编程）**：将横切关注点（日志、事务等）从业务逻辑中分离
- 其他特性：声明式事务、MVC 框架、数据访问抽象等

> 📖 **详细内容**：[Java Spring](/docs/interview/java-spring)

---

### 4.2 Spring Bean 的生命周期

**面试官：** Spring Bean 的生命周期？

**面试者：** 
1. **实例化**：通过反射创建 Bean 实例
2. **属性赋值**：依赖注入，填充属性
3. **初始化前**：调用 BeanPostProcessor 的 postProcessBeforeInitialization
4. **初始化**：调用 InitializingBean 的 afterPropertiesSet 或自定义 init-method
5. **初始化后**：调用 BeanPostProcessor 的 postProcessAfterInitialization
6. **使用**：Bean 可以被使用
7. **销毁**：调用 DisposableBean 的 destroy 或自定义 destroy-method

> 📖 **详细内容**：[Java Spring - Bean 生命周期](/docs/interview/java-spring)

---

### 4.3 Spring AOP 的实现原理

**面试官：** Spring AOP 的实现原理？

**面试者：** 
- **JDK 动态代理**：基于接口，通过反射实现
- **CGLIB 代理**：基于继承，通过字节码生成子类
- Spring 默认策略：有接口用 JDK 代理，无接口用 CGLIB
- 通知类型：前置、后置、环绕、异常、最终通知

> 📖 **详细内容**：[Java Spring - AOP](/docs/interview/java-spring)

---

### 4.4 Spring 事务的传播行为

**面试官：** Spring 事务的传播行为有哪些？

**面试者：** 常用的 7 种传播行为：

| 传播行为 | 说明 |
|:---------|:-----|
| REQUIRED | 默认，有事务加入，无事务新建 |
| SUPPORTS | 有事务加入，无事务非事务执行 |
| MANDATORY | 必须在事务中，否则抛异常 |
| REQUIRES_NEW | 总是新建事务，挂起当前事务 |
| NOT_SUPPORTED | 非事务执行，挂起当前事务 |
| NEVER | 非事务执行，有事务抛异常 |
| NESTED | 嵌套事务，有保存点可回滚 |

> 📖 **详细内容**：[Java Spring - 事务管理](/docs/interview/java-spring)

---

### 4.5 @Transactional 失效的场景

**面试官：** @Transactional 失效的场景？

**面试者：** 
1. **方法不是 public**：Spring AOP 只能代理 public 方法
2. **同类调用**：内部方法调用不走代理
3. **异常被捕获**：事务默认只回滚 RuntimeException
4. **数据库不支持事务**：如 MyISAM 引擎
5. **未被 Spring 管理**：类没有被 @Component 等注解标注

---

## 五、Spring Boot

### 5.1 Spring Boot 的核心特性

**面试官：** Spring Boot 的核心特性？

**面试者：** 
- **自动配置**：根据依赖自动配置 Spring 应用
- **起步依赖**：简化 Maven/Gradle 配置
- **内嵌服务器**：Tomcat、Jetty、Undertow
- **生产就绪**：Actuator 提供监控、健康检查等功能
- **无代码生成**：不需要 XML 配置

> 📖 **详细内容**：[Java Spring Boot](/docs/interview/java-SpringBoot)

---

### 5.2 Spring Boot 自动配置原理

**面试官：** Spring Boot 自动配置原理？

**面试者：** 
1. **@SpringBootApplication** 包含 @EnableAutoConfiguration
2. **@EnableAutoConfiguration** 导入 AutoConfigurationImportSelector
3. 读取 `META-INF/spring.factories` 中的自动配置类
4. 根据 @Conditional 条件注解判断是否生效
5. 加载满足条件的配置类到容器

> 📖 **详细内容**：[Java Spring Boot - 自动配置](/docs/interview/java-SpringBoot)

---

### 5.3 Spring Boot 配置文件的加载顺序

**面试官：** Spring Boot 配置文件的加载顺序？

**面试者：** 优先级从高到低：
1. 命令行参数
2. SPRING_APPLICATION_JSON 环境变量
3. ServletConfig/ServletContext 初始化参数
4. JNDI 属性
5. Java 系统属性
6. 操作系统环境变量
7. jar 包外的 `application-{profile}.properties/yml`
8. jar 包内的 `application-{profile}.properties/yml`
9. jar 包外的 `application.properties/yml`
10. jar 包内的 `application.properties/yml`

---

## 六、MyBatis

### 6.1 MyBatis 的核心组件

**面试官：** MyBatis 的核心组件有哪些？

**面试者：** 
- **SqlSessionFactory**：会话工厂，创建 SqlSession
- **SqlSession**：执行 SQL 的会话，线程不安全
- **Mapper**：映射器接口，定义 SQL 操作
- **Executor**：执行器，负责 SQL 执行和缓存维护
- **StatementHandler**：语句处理器，处理 JDBC Statement
- **ParameterHandler**：参数处理器，设置预编译参数
- **ResultSetHandler**：结果集处理器，封装返回结果

> 📖 **详细内容**：[Java MyBatis](/docs/interview/java-mybatis)

---

### 6.2 MyBatis 的一级缓存和二级缓存

**面试官：** MyBatis 的一级缓存和二级缓存？

**面试者：** 
- **一级缓存**：
  - SqlSession 级别，默认开启
  - 同一个 SqlSession 内有效
  - 执行 update/insert/delete 或手动清空时失效
- **二级缓存**：
  - Mapper 级别，需手动开启
  - 多个 SqlSession 共享
  - 需要实体类实现 Serializable
  - 事务提交后才会写入二级缓存

> 📖 **详细内容**：[Java MyBatis - 缓存机制](/docs/interview/java-mybatis)

---

## 七、Redis

### 7.1 Redis 支持的数据类型

**面试官：** Redis 支持哪些数据类型？

**面试者：** Redis 支持 5 种基本数据类型和 3 种特殊类型：

**基本类型**：
- **String**：字符串，最大 512MB
- **Hash**：哈希表，适合存储对象
- **List**：列表，双向链表
- **Set**：集合，无序不重复
- **ZSet**：有序集合，带分数排序

**特殊类型**：
- **Bitmap**：位图，适合签到、布隆过滤器
- **HyperLogLog**：基数统计，UV 统计
- **Geo**：地理位置，附近的人

> 📖 **详细内容**：[Redis 面试题 - 数据类型](/docs/interview/Redis-interview#6-redis-中常见的数据类型有哪些)

---

### 7.2 Redis 为什么这么快

**面试官：** Redis 为什么这么快？

**面试者：** 
1. **基于内存操作**：数据存储在内存中，避免磁盘 I/O
2. **高效的数据结构**：专为内存访问优化
3. **单线程模型**：避免线程切换和锁竞争（6.0 后 I/O 多线程）
4. **I/O 多路复用**：epoll/kqueue 高效处理并发连接
5. **代码级优化**：C 语言实现，贴近底层硬件

> 📖 **详细内容**：[Redis 面试题 - 性能](/docs/interview/Redis-interview#4-redis-为什么这么快)

---

### 7.3 Redis 的持久化方式

**面试官：** Redis 的持久化方式有哪些？

**面试者：** 

| 方式 | RDB | AOF |
|:-----|:----|:----|
| 全称 | Redis Database | Append Only File |
| 原理 | 快照，保存某时刻数据 | 记录写命令 |
| 优点 | 文件小，恢复快 | 数据完整性好 |
| 缺点 | 可能丢失数据 | 文件大，恢复慢 |
| 触发 | save/bgsave 命令 | always/everysec/no |

**混合持久化（4.0+）**：RDB + AOF，兼顾性能和数据安全

> 📖 **详细内容**：[Redis 面试题 - 持久化](/docs/interview/Redis-interview#11-redis-的持久化机制有哪些)

---

### 7.4 Redis 的过期策略

**面试官：** Redis 的过期策略有哪些？

**面试者：** Redis 使用**定期删除 + 惰性删除**的组合策略：

**惰性删除**：
- 访问键时检查是否过期
- 过期则删除并返回空

**定期删除**：
- 每隔一段时间随机抽取一批键检查过期
- 默认每秒执行 10 次

**内存淘汰策略**：
- `volatile-lru`：从设置过期时间的键中，淘汰最少使用的
- `allkeys-lru`：从所有键中，淘汰最少使用的
- `volatile-lfu`：从设置过期时间的键中，淘汰最不经常使用的
- `allkeys-lfu`：从所有键中，淘汰最不经常使用的
- `noeviction`：不淘汰，写入时返回错误（默认）

> 📖 **详细内容**：[Redis 面试题 - 过期策略](/docs/interview/Redis-interview#12-redis-的过期策略有哪些)

---

### 7.5 缓存穿透、击穿、雪崩的解决方案

**面试官：** 如何解决缓存穿透、击穿、雪崩？

**面试者：** 

**缓存穿透**（查询不存在的数据）：
- 布隆过滤器：拦截不存在的 key
- 缓存空值：设置较短过期时间

**缓存击穿**（热点 key 过期）：
- 互斥锁：只允许一个线程查询数据库
- 热点数据永不过期：逻辑过期，异步更新

**缓存雪崩**（大量 key 同时过期）：
- 过期时间加随机值：避免同时过期
- 多级缓存：本地缓存 + Redis
- 限流降级：保护数据库

> 📖 **详细内容**：[Redis 面试题 - 缓存问题](/docs/interview/Redis-interview#13-什么是缓存穿透缓存击穿缓存雪崩如何解决)

---

### 7.6 Redis 分布式锁的实现

**面试官：** Redis 分布式锁如何实现？

**面试者：** 

**基本实现**：
```java
// 加锁
String lockKey = "lock:resource";
String requestId = UUID.randomUUID().toString();
Boolean success = redis.set(lockKey, requestId, "NX", "PX", 30000);

// 解锁（Lua 脚本保证原子性）
String script = 
    "if redis.call('get', KEYS[1]) == ARGV[1] then " +
    "    return redis.call('del', KEYS[1]) " +
    "else " +
    "    return 0 " +
    "end";
redis.eval(script, Collections.singletonList(lockKey), 
           Collections.singletonList(requestId));
```

**关键要点**：
1. 设置过期时间：防止死锁
2. 唯一标识：防止误删
3. 原子操作：使用 Lua 脚本
4. 可重入：使用 Redisson
5. 主从切换：使用 RedLock

> 📖 **详细内容**：[Redis 面试题 - 分布式锁](/docs/interview/Redis-interview#14-redis-如何实现分布式锁)

---

## 八、Kafka

### 8.1 Kafka 的核心概念

**面试官：** Kafka 的核心概念有哪些？

**面试者：** 
- **Producer**：生产者，发送消息
- **Consumer**：消费者，消费消息
- **Broker**：服务器节点，存储消息
- **Topic**：主题，消息分类
- **Partition**：分区，Topic 的物理分组
- **Offset**：偏移量，消息在分区中的位置
- **Consumer Group**：消费者组，实现负载均衡

> 📖 **详细内容**：[Java 消息队列](/docs/interview/java-消息队列)

---

### 8.2 Kafka 如何保证消息不丢失

**面试官：** Kafka 如何保证消息不丢失？

**面试者：** 

**生产者端**：
- 设置 `acks=all`：所有副本确认后才返回
- 设置 `retries > 0`：失败自动重试
- 设置 `max.in.flight.requests.per.connection=1`：保证顺序

**Broker 端**：
- 设置 `replication.factor ≥ 3`：多副本
- 设置 `min.insync.replicas ≥ 2`：最少同步副本数

**消费者端**：
- 手动提交 offset：处理完再提交
- 关闭自动提交：`enable.auto.commit=false`

> 📖 **详细内容**：[Java 消息队列 - Kafka](/docs/interview/java-消息队列)

---

### 8.3 Kafka 为什么吞吐量这么高

**面试官：** Kafka 为什么吞吐量这么高？

**面试者：** 
1. **顺序写磁盘**：追加写入，性能接近内存
2. **零拷贝**：sendfile 系统调用，减少数据拷贝
3. **批量发送**：减少网络开销
4. **消息压缩**：支持 GZIP、Snappy、LZ4
5. **分区并行**：多分区并行读写

---

## 九、MySQL

### 9.1 MySQL 的索引类型

**面试官：** MySQL 的索引类型有哪些？

**面试者：** 

**按数据结构分**：
- **B+Tree 索引**：InnoDB 默认，适合范围查询
- **Hash 索引**：Memory 引擎，适合等值查询
- **Full-Text 索引**：全文索引，适合文本搜索

**按功能分**：
- **主键索引**：PRIMARY KEY，唯一且非空
- **唯一索引**：UNIQUE，值唯一但可为 NULL
- **普通索引**：INDEX，无限制
- **组合索引**：多列组合，遵循最左前缀原则

> 📖 **详细内容**：[MySQL 面试题](/docs/interview/mysql-interview)

---

### 9.2 什么情况下索引会失效

**面试官：** 什么情况下索引会失效？

**面试者：** 
1. **使用函数或表达式**：`WHERE YEAR(date) = 2024`
2. **隐式类型转换**：`WHERE varchar_col = 123`
3. **模糊查询前缀通配符**：`WHERE name LIKE '%abc'`
4. **OR 条件**：OR 两边的列都要有索引
5. **NOT、!=、不等于**：无法使用索引
6. **IS NULL、IS NOT NULL**：可能失效
7. **违反最左前缀**：组合索引 (a,b,c)，查询 b 或 c

---

### 9.3 MySQL 事务的隔离级别

**面试官：** MySQL 事务的隔离级别有哪些？

**面试者：** 

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|:---------|:----:|:----------:|:----:|
| READ UNCOMMITTED | 可能 | 可能 | 可能 |
| READ COMMITTED | 不可能 | 可能 | 可能 |
| REPEATABLE READ | 不可能 | 不可能 | 可能 |
| SERIALIZABLE | 不可能 | 不可能 | 不可能 |

**InnoDB 默认**：REPEATABLE READ，通过 MVCC 和间隙锁解决幻读

> 📖 **详细内容**：[MySQL 面试题 - 事务](/docs/interview/mysql-interview)

---

### 9.4 MVCC 的实现原理

**面试官：** MVCC 的实现原理？

**面试者：** 
- **隐藏字段**：
  - DB_TRX_ID：事务 ID
  - DB_ROLL_PTR：回滚指针，指向 undo log
  - DB_ROW_ID：隐藏主键
- **Read View**：读视图，记录活跃事务列表
- **undo log**：版本链，记录历史版本
- **可见性判断**：根据 Read View 判断版本是否可见

---

### 9.5 MySQL 的锁类型

**面试官：** MySQL 的锁有哪些类型？

**面试者：** 

**按粒度分**：
- **表锁**：锁整张表，开销小，并发低
- **行锁**：锁单行，开销大，并发高
- **间隙锁**：锁索引记录之间的间隙，防止幻读

**按模式分**：
- **共享锁（S锁）**：读锁，多个事务可同时持有
- **排他锁（X锁）**：写锁，独占

**按算法分**：
- **Record Lock**：记录锁，锁单条记录
- **Gap Lock**：间隙锁，锁索引间隙
- **Next-Key Lock**：Record Lock + Gap Lock

---

## 十、分布式系统

### 10.1 CAP 理论

**面试官：** CAP 理论是什么？

**面试者：** CAP 理论指分布式系统无法同时满足三个特性：
- **C（Consistency）**：一致性，所有节点数据一致
- **A（Availability）**：可用性，服务一直可用
- **P（Partition Tolerance）**：分区容错性，网络分区时系统仍能工作

**权衡**：
- **CP**：牺牲可用性，如 ZooKeeper、HBase
- **AP**：牺牲一致性，如 Cassandra、DynamoDB
- **CA**：不存在，网络分区无法避免

> 📖 **详细内容**：[分布式系统设计](/docs/interview/后端系统设计)

---

### 10.2 分布式事务的解决方案

**面试官：** 分布式事务有哪些解决方案？

**面试者：** 主要有以下几种：

**1. 2PC（两阶段提交）**：
- 准备阶段 + 提交阶段
- 缺点：同步阻塞，单点故障

**2. TCC（Try-Confirm-Cancel）**：
- Try：预留资源
- Confirm：确认提交
- Cancel：取消回滚
- 优点：性能好，业务侵入性强

**3. Saga 模式**：
- 将长事务拆分为多个本地事务
- 每个本地事务有对应的补偿事务
- 优点：适合长流程，最终一致性

**4. 本地消息表**：
- 业务操作和消息发送在同一事务
- 定时任务扫描消息表并发送

**5. MQ 事务消息**：
- 使用 RocketMQ 等支持事务消息的 MQ

> 📖 **详细内容**：[Spring Cloud - 分布式事务](/docs/interview/java-SpringCloud#1-什么是分布式事务的防悬挂空回滚)

---

### 10.3 分布式锁的实现方式

**面试官：** 分布式锁有哪些实现方式？

**面试者：** 

**1. Redis 实现**：
- SETNX + EXPIRE：设置 key 和过期时间
- Redisson：看门狗机制，自动续期
- RedLock：多节点加锁，提高可靠性

**2. ZooKeeper 实现**：
- 创建临时顺序节点
- 判断是否是最小节点
- 监听前一个节点删除事件

**3. 数据库实现**：
- 唯一索引 + 乐观锁
- for update 悲观锁

> 📖 **详细内容**：[Redis 分布式锁](/docs/interview/Redis-interview#14-redis-如何实现分布式锁)

---

### 10.4 分布式 ID 生成方案

**面试官：** 分布式 ID 生成方案有哪些？

**面试者：** 

**1. UUID**：
- 优点：简单，本地生成
- 缺点：无序，占用空间大

**2. 数据库自增 ID**：
- 优点：简单，有序
- 缺点：性能瓶颈，单点故障

**3. 号段模式**：
- 批量获取 ID 段，本地分配
- 优点：性能好，减少数据库压力

**4. 雪花算法（Snowflake）**：
```
64位ID结构：
1位符号位 + 41位时间戳 + 10位机器ID + 12位序列号
```
- 优点：趋势递增，高性能
- 缺点：依赖系统时钟

**5. 美团 Leaf**：
- 支持号段模式和雪花算法
- 解决了时钟回拨问题

---

### 10.5 如何设计秒杀系统

**面试官：** 如何设计一个秒杀系统？

**面试者：** 

**核心问题**：
- 高并发：瞬间大量请求
- 超卖：库存扣减不准确
- 恶意请求：刷单、爬虫

**解决方案**：

**1. 前端优化**：
- 按钮置灰，防止重复提交
- 验证码，防止机器刷单
- 静态资源 CDN 加速

**2. 后端限流**：
- 令牌桶、漏桶算法
- Sentinel/Hystrix 限流

**3. Redis 预减库存**：
```java
// Redis预减库存
Long stock = redis.decr("stock:" + productId);
if (stock < 0) {
    return Result.fail("库存不足");
}
```

**4. MQ 削峰**：
- 发送 MQ 消息异步处理
- 数据库扣减库存

**5. 防止超卖**：
```sql
-- 乐观锁
UPDATE product 
SET stock = stock - 1 
WHERE id = #{id} AND stock > 0;
```

> 📖 **详细内容**：[后端系统设计 - 秒杀系统](/docs/interview/后端系统设计)

---

## 十一、JVM 虚拟机

### 11.1 JVM 内存结构

**面试官：** JVM 内存结构有哪些部分？

**面试者：** JVM 内存主要分为以下几个区域：

**线程共享区域**：
- **堆（Heap）**：存储对象实例，GC 主要区域
  - 年轻代（Young Generation）：Eden + Survivor
  - 老年代（Old Generation）
- **方法区（Method Area）**：存储类信息、常量、静态变量
  - JDK 8 之前：永久代（PermGen）
  - JDK 8 之后：元空间（Metaspace）

**线程私有区域**：
- **程序计数器（PC Register）**：记录当前线程执行的字节码行号
- **虚拟机栈（VM Stack）**：存储局部变量、操作数栈、方法出口等
- **本地方法栈（Native Method Stack）**：为 Native 方法服务

> 📖 **详细内容**：[Java 虚拟机](/docs/interview/java-虚拟机)

---

### 11.2 垃圾回收算法

**面试官：** 常见的垃圾回收算法有哪些？

**面试者：** 

**1. 标记-清除（Mark-Sweep）**：
- 标记所有需要回收的对象，然后清除
- 缺点：产生内存碎片

**2. 标记-复制（Mark-Copy）**：
- 将内存分为两块，每次只使用一块
- 垃圾回收时将存活对象复制到另一块
- 优点：无碎片，缺点：浪费空间

**3. 标记-整理（Mark-Compact）**：
- 标记后将存活对象移动到一端
- 优点：无碎片，缺点：移动对象开销大

**4. 分代收集**：
- 年轻代：标记-复制（对象存活率低）
- 老年代：标记-清除或标记-整理（对象存活率高）

> 📖 **详细内容**：[Java 虚拟机 - GC 算法](/docs/interview/java-虚拟机)

---

### 11.3 常见的垃圾回收器

**面试官：** 常见的垃圾回收器有哪些？

**面试者：** 

| 回收器 | 类型 | 特点 | 适用场景 |
|:-------|:-----|:-----|:---------|
| Serial | 单线程 | 简单高效 | 客户端应用 |
| ParNew | 多线程 | Serial 的多线程版本 | 配合 CMS |
| Parallel Scavenge | 多线程 | 关注吞吐量 | 后台计算 |
| CMS | 并发 | 关注停顿时间 | 互联网应用 |
| G1 | 分区 | 可预测停顿 | 大内存应用 |
| ZGC | 并发 | 超低延迟 | 大内存低延迟 |

**推荐组合**：
- JDK 8：ParNew + CMS
- JDK 11+：G1（默认）
- 大内存低延迟：ZGC

---

### 11.4 如何排查 OOM 问题

**面试官：** 如何排查 OOM 问题？

**面试者：** 

**1. 分析堆转储文件**：
```bash
# 生成堆转储
jmap -dump:format=b,file=heap.hprof <pid>

# 使用 MAT 或 jhat 分析
jhat heap.hprof
```

**2. 查看内存使用情况**：
```bash
# 查看堆内存
jmap -heap <pid>

# 查看对象统计
jmap -histo <pid> | head -20
```

**3. 监控 GC 情况**：
```bash
# 实时查看 GC
jstat -gc <pid> 1000
```

**4. 常见 OOM 原因**：
- 堆内存溢出：对象过多，内存不足
- 栈溢出：递归调用过深
- 方法区溢出：类加载过多
- 直接内存溢出：NIO 使用过多

> 📖 **详细内容**：[Java 虚拟机 - 问题排查](/docs/interview/java-虚拟机)

---

## 十二、设计模式

### 12.1 单例模式的实现方式

**面试官：** 单例模式有哪些实现方式？

**面试者：** 

**1. 饿汉式（线程安全）**：
```java
public class Singleton {
    private static final Singleton INSTANCE = new Singleton();
    private Singleton() {}
    public static Singleton getInstance() {
        return INSTANCE;
    }
}
```

**2. 懒汉式（双重检查锁）**：
```java
public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**3. 静态内部类（推荐）**：
```java
public class Singleton {
    private Singleton() {}
    
    private static class Holder {
        private static final Singleton INSTANCE = new Singleton();
    }
    
    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}
```

**4. 枚举（最安全）**：
```java
public enum Singleton {
    INSTANCE;
    
    public void doSomething() {
        // 业务方法
    }
}
```

> 📖 **详细内容**：[Java 设计模式](/docs/interview/java-设计模式)

---

### 12.2 工厂模式和抽象工厂模式

**面试官：** 工厂模式和抽象工厂模式的区别？

**面试者：** 

**工厂模式**：
- 定义一个创建对象的接口，让子类决定实例化哪个类
- 适用于创建单一产品

**抽象工厂模式**：
- 提供一个创建一系列相关或相互依赖对象的接口
- 适用于创建产品族

**区别**：
- 工厂模式：一个工厂创建一种产品
- 抽象工厂：一个工厂创建多种相关产品

> 📖 **详细内容**：[Java 设计模式 - 工厂模式](/docs/interview/java-设计模式)

---

### 12.3 代理模式的应用

**面试官：** 代理模式在实际开发中的应用？

**面试者：** 

**应用场景**：
1. **Spring AOP**：方法拦截、事务管理、日志记录
2. **RPC 框架**：Dubbo、Feign 远程调用
3. **延迟加载**：Hibernate 懒加载
4. **权限控制**：访问控制、安全检查
5. **缓存代理**：结果缓存

**实现方式**：
- **静态代理**：编译时确定代理类
- **JDK 动态代理**：基于接口，运行时生成
- **CGLIB 代理**：基于继承，运行时生成

> 📖 **详细内容**：[Java 设计模式 - 代理模式](/docs/interview/java-设计模式)

---

## 十三、微服务架构

### 13.1 微服务的优缺点

**面试官：** 微服务架构的优缺点？

**面试者：** 

**优点**：
- **独立部署**：服务独立，部署灵活
- **技术异构**：不同服务可用不同技术栈
- **故障隔离**：单个服务故障不影响整体
- **团队自治**：小团队独立开发维护
- **可扩展性**：按需扩展单个服务

**缺点**：
- **复杂度增加**：分布式系统复杂
- **数据一致性**：分布式事务难处理
- **运维成本**：需要完善的监控和运维
- **网络延迟**：服务间调用增加延迟
- **测试困难**：集成测试复杂

> 📖 **详细内容**：[Spring Cloud](/docs/interview/java-SpringCloud)

---

### 13.2 服务注册与发现

**面试官：** 服务注册与发现的原理？

**面试者：** 

**核心流程**：
1. **服务注册**：服务启动时向注册中心注册
2. **健康检查**：定期发送心跳保持注册状态
3. **服务发现**：消费者从注册中心获取服务列表
4. **负载均衡**：根据策略选择服务实例
5. **服务下线**：服务停止时注销注册

**常见注册中心**：
- **Eureka**：Netflix 开源，AP 模型
- **Nacos**：阿里开源，支持 AP 和 CP
- **Consul**：HashiCorp 开源，CP 模型
- **ZooKeeper**：Apache 开源，CP 模型

> 📖 **详细内容**：[Spring Cloud - 服务注册](/docs/interview/java-SpringCloud)

---

### 13.3 服务熔断和降级

**面试官：** 服务熔断和降级的区别？

**面试者：** 

**服务熔断**：
- 当服务调用失败率达到阈值时，自动切断服务调用
- 类似电路保护器，防止故障扩散
- 状态：关闭 → 打开 → 半开

**服务降级**：
- 当系统压力过大时，暂时关闭非核心功能
- 保证核心功能可用
- 返回默认值或友好提示

**区别**：
- 熔断：被动触发，保护系统
- 降级：主动触发，保证核心

**实现方案**：
- Hystrix（Netflix，已停更）
- Sentinel（阿里，推荐）
- Resilience4j（轻量级）

> 📖 **详细内容**：[Spring Cloud - 熔断降级](/docs/interview/java-SpringCloud)

---

### 13.4 API 网关的作用

**面试官：** API 网关的作用是什么？

**面试者：** 

**核心功能**：
1. **路由转发**：请求路由到对应的微服务
2. **负载均衡**：分发请求到多个实例
3. **统一鉴权**：集中处理认证授权
4. **限流熔断**：保护后端服务
5. **日志监控**：统一日志收集和监控
6. **协议转换**：HTTP/gRPC 等协议转换

**常见网关**：
- **Spring Cloud Gateway**：Spring 官方，基于 WebFlux
- **Zuul**：Netflix 开源，基于 Servlet
- **Kong**：基于 Nginx，高性能
- **Nginx**：传统反向代理

> 📖 **详细内容**：[Spring Cloud - API 网关](/docs/interview/java-SpringCloud)

---

## 十四、网络与安全

### 14.1 HTTP 和 HTTPS 的区别

**面试官：** HTTP 和 HTTPS 的区别？

**面试者：** 

| 特性 | HTTP | HTTPS |
|:-----|:-----|:------|
| 协议 | 明文传输 | SSL/TLS 加密 |
| 端口 | 80 | 443 |
| 安全性 | 不安全 | 安全 |
| 证书 | 不需要 | 需要 CA 证书 |
| 性能 | 快 | 稍慢（加密开销） |
| SEO | 一般 | 更好 |

**HTTPS 工作流程**：
1. 客户端发起 HTTPS 请求
2. 服务器返回证书
3. 客户端验证证书
4. 协商加密算法
5. 生成会话密钥
6. 加密通信

---

### 14.2 TCP 三次握手和四次挥手

**面试官：** TCP 三次握手和四次挥手的过程？

**面试者：** 

**三次握手（建立连接）**：
1. **SYN**：客户端发送 SYN 包，进入 SYN_SENT 状态
2. **SYN+ACK**：服务器返回 SYN+ACK 包，进入 SYN_RCVD 状态
3. **ACK**：客户端发送 ACK 包，双方进入 ESTABLISHED 状态

**为什么三次**：
- 防止已失效的连接请求到达服务器
- 确认双方收发能力正常

**四次挥手（断开连接）**：
1. **FIN**：客户端发送 FIN 包，进入 FIN_WAIT_1 状态
2. **ACK**：服务器返回 ACK 包，进入 CLOSE_WAIT 状态
3. **FIN**：服务器发送 FIN 包，进入 LAST_ACK 状态
4. **ACK**：客户端发送 ACK 包，进入 TIME_WAIT 状态

**为什么四次**：
- 服务器可能还有数据要发送
- 需要等待数据发送完毕

---

### 14.3 如何防止 SQL 注入

**面试官：** 如何防止 SQL 注入？

**面试者：** 

**1. 使用预编译语句**：
```java
// 不安全
String sql = "SELECT * FROM users WHERE name = '" + name + "'";

// 安全
String sql = "SELECT * FROM users WHERE name = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, name);
```

**2. 使用 ORM 框架**：
```java
// MyBatis 参数化查询
@Select("SELECT * FROM users WHERE name = #{name}")
User findByName(@Param("name") String name);
```

**3. 输入验证**：
- 白名单验证
- 长度限制
- 类型检查

**4. 最小权限原则**：
- 数据库账号只授予必要权限
- 禁止使用 root 账号

---

### 14.4 XSS 和 CSRF 攻击

**面试官：** XSS 和 CSRF 攻击如何防御？

**面试者：** 

**XSS（跨站脚本攻击）**：
- **攻击方式**：注入恶意脚本到网页
- **防御措施**：
  - 输入过滤和转义
  - 使用 HttpOnly Cookie
  - Content Security Policy（CSP）
  - 前端框架自动转义（React、Vue）

**CSRF（跨站请求伪造）**：
- **攻击方式**：诱导用户在已登录状态下执行非本意操作
- **防御措施**：
  - CSRF Token 验证
  - 验证 Referer 头
  - SameSite Cookie 属性
  - 重要操作二次验证

**区别**：
- XSS：注入恶意脚本
- CSRF：伪造用户请求

---

## 十五、认证与授权

### 15.1 JWT 的工作原理

**面试官：** JWT 的工作原理是什么？

**面试者：** JWT（JSON Web Token）是一种用于身份验证的开放标准：

**JWT 结构**（三部分，用 `.` 分隔）：
```
Header.Payload.Signature
```

**1. Header（头部）**：
```json
{
  "alg": "HS256",  // 签名算法
  "typ": "JWT"     // 令牌类型
}
```

**2. Payload（载荷）**：
```json
{
  "sub": "1234567890",    // 主题（用户ID）
  "name": "John Doe",     // 用户名
  "iat": 1516239022,      // 签发时间
  "exp": 1516242622       // 过期时间
}
```

**3. Signature（签名）**：
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

**工作流程**：
1. 用户登录，服务器验证成功后生成 JWT
2. 服务器将 JWT 返回给客户端
3. 客户端存储 JWT（localStorage/Cookie）
4. 后续请求在 Header 中携带 JWT：`Authorization: Bearer <token>`
5. 服务器验证 JWT 签名和有效期

**代码示例**：
```java
// 生成 JWT
String token = Jwts.builder()
    .setSubject(userId)
    .setIssuedAt(new Date())
    .setExpiration(new Date(System.currentTimeMillis() + 3600000))
    .signWith(SignatureAlgorithm.HS256, secretKey)
    .compact();

// 验证 JWT
Claims claims = Jwts.parser()
    .setSigningKey(secretKey)
    .parseClaimsJws(token)
    .getBody();
```

> 📖 **详细内容**：[Spring Security - JWT](/docs/interview/java-spring)

---

### 15.2 JWT 的优缺点

**面试官：** JWT 有哪些优缺点？

**面试者：** 

**优点**：
- **无状态**：服务器不需要存储 Session，易于扩展
- **跨域支持**：可以跨域使用，适合分布式系统
- **性能好**：不需要查询数据库验证
- **移动端友好**：适合 App、小程序等场景
- **自包含**：Token 包含用户信息，减少查询

**缺点**：
- **无法主动失效**：Token 签发后无法撤销，只能等过期
- **Token 较大**：包含用户信息，比 Session ID 大
- **安全性**：需要妥善保管密钥，防止泄露
- **续期问题**：Token 过期需要重新登录或使用 Refresh Token
- **时间敏感**：依赖服务器时间，需要时间同步

**解决方案**：
- **Token 失效**：使用 Redis 黑名单
- **Token 续期**：双 Token 机制（Access Token + Refresh Token）
- **安全性**：HTTPS 传输，HttpOnly Cookie

| 特性 | JWT | Session |
|:-----|:----|:--------|
| 存储位置 | 客户端 | 服务器 |
| 扩展性 | 好 | 差（需要共享） |
| 性能 | 好 | 需要查询 |
| 安全性 | 需要加密传输 | 相对安全 |
| 失效控制 | 困难 | 容易 |

---

### 15.3 OAuth2 的授权模式

**面试官：** OAuth2 有哪些授权模式？

**面试者：** OAuth2 定义了 4 种授权模式：

**1. 授权码模式（Authorization Code）**：
- **最安全**，适合有后端的 Web 应用
- 流程：
  1. 用户访问客户端，重定向到授权服务器
  2. 用户同意授权，返回授权码
  3. 客户端用授权码换取 Access Token
  4. 使用 Access Token 访问资源

**2. 隐式模式（Implicit）**：
- 简化版，适合纯前端应用（已不推荐）
- 直接返回 Access Token，跳过授权码步骤
- 安全性较低，Token 暴露在 URL 中

**3. 密码模式（Password）**：
- 用户直接提供用户名密码给客户端
- 适合高度信任的应用（如官方 App）
- 不推荐使用，违背 OAuth2 初衷

**4. 客户端模式（Client Credentials）**：
- 客户端以自己的名义访问资源
- 适合服务器间通信（M2M）
- 不涉及用户授权

**推荐使用**：
- Web 应用：授权码模式 + PKCE
- 单页应用：授权码模式 + PKCE
- 移动应用：授权码模式 + PKCE
- 服务间调用：客户端模式

**授权码模式示例**：
```java
// 1. 重定向到授权页面
String authUrl = "https://auth.example.com/oauth/authorize?" +
    "response_type=code&" +
    "client_id=CLIENT_ID&" +
    "redirect_uri=CALLBACK_URL&" +
    "scope=read write";

// 2. 用授权码换取 Token
RestTemplate restTemplate = new RestTemplate();
MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
params.add("grant_type", "authorization_code");
params.add("code", authCode);
params.add("client_id", clientId);
params.add("client_secret", clientSecret);
params.add("redirect_uri", redirectUri);

TokenResponse response = restTemplate.postForObject(
    "https://auth.example.com/oauth/token",
    params,
    TokenResponse.class
);
```

> 📖 **详细内容**：[Spring Security - OAuth2](/docs/interview/java-spring)

---

### 15.4 OAuth2 和 JWT 的区别

**面试官：** OAuth2 和 JWT 有什么区别？

**面试者：** OAuth2 和 JWT 是两个不同层面的概念：

**本质区别**：
- **OAuth2**：授权框架，解决"如何授权"的问题
- **JWT**：Token 格式，解决"如何表示 Token"的问题

**关系**：
- OAuth2 可以使用 JWT 作为 Token 格式
- JWT 也可以独立使用，不依赖 OAuth2

| 对比项 | OAuth2 | JWT |
|:-------|:-------|:----|
| 类型 | 授权协议 | Token 格式 |
| 目的 | 第三方授权 | 身份认证 |
| 场景 | 微信登录、GitHub 登录 | 用户登录、API 认证 |
| Token | 可以是任意格式 | 固定的 JSON 格式 |
| 验证 | 需要调用授权服务器 | 本地验证签名 |

**实际应用**：
```java
// OAuth2 + JWT 组合使用
@Configuration
@EnableAuthorizationServer
public class AuthServerConfig extends AuthorizationServerConfigurerAdapter {
    
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
            .tokenStore(tokenStore())
            .accessTokenConverter(jwtAccessTokenConverter());  // 使用 JWT
    }
    
    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey("secret-key");
        return converter;
    }
}
```

**使用场景**：
- **单独使用 JWT**：自己的系统内部认证
- **单独使用 OAuth2**：第三方登录（微信、QQ）
- **组合使用**：微服务架构，OAuth2 授权 + JWT Token

---

## 十六、工作流引擎

### 16.1 Flowable 的核心概念

**面试官：** Flowable 的核心概念有哪些？

**面试者：** Flowable 是一个轻量级的工作流和业务流程管理（BPM）平台，核心概念包括：

**核心组件**：

**1. ProcessEngine（流程引擎）**：
- Flowable 的核心，管理所有服务
- 通过配置文件创建，线程安全

**2. 七大 Service**：

| Service | 作用 |
|:--------|:-----|
| RepositoryService | 流程定义和部署管理 |
| RuntimeService | 流程实例管理（启动、查询、删除） |
| TaskService | 任务管理（查询、完成、委派） |
| HistoryService | 历史数据查询 |
| ManagementService | 引擎管理和维护 |
| IdentityService | 用户和组管理 |
| FormService | 表单管理 |

**核心概念**：

**流程定义（Process Definition）**：
- BPMN 2.0 XML 文件
- 描述业务流程的静态结构
- 可以多次部署，每次生成新版本

**流程实例（Process Instance）**：
- 流程定义的运行实例
- 一个流程定义可以启动多个实例
- 包含流程变量（Process Variables）

**任务（Task）**：
- **用户任务（User Task）**：需要人工处理
- **服务任务（Service Task）**：自动执行
- **脚本任务（Script Task）**：执行脚本

**执行（Execution）**：
- 流程实例的执行路径
- 并行网关会产生多个执行

**代码示例**：
```java
// 1. 创建流程引擎
ProcessEngine processEngine = ProcessEngines.getDefaultProcessEngine();

// 2. 获取服务
RepositoryService repositoryService = processEngine.getRepositoryService();
RuntimeService runtimeService = processEngine.getRuntimeService();
TaskService taskService = processEngine.getTaskService();

// 3. 部署流程
Deployment deployment = repositoryService.createDeployment()
    .addClasspathResource("processes/leave.bpmn20.xml")
    .name("请假流程")
    .deploy();

// 4. 启动流程实例
Map<String, Object> variables = new HashMap<>();
variables.put("days", 3);
variables.put("reason", "旅游");
ProcessInstance processInstance = runtimeService
    .startProcessInstanceByKey("leaveProcess", variables);

// 5. 查询任务
List<Task> tasks = taskService.createTaskQuery()
    .processInstanceId(processInstance.getId())
    .list();

// 6. 完成任务
taskService.complete(tasks.get(0).getId());
```

---

### 16.2 Flowable 和 Activiti 的区别

**面试官：** Flowable 和 Activiti 有什么区别？

**面试者：** Flowable 是从 Activiti 6 分支出来的，两者有以下区别：

**历史关系**：
- Activiti 由 jBPM 创始人开发
- 2016 年核心团队离开，创建 Flowable
- Flowable 基于 Activiti 6，持续演进

**主要区别**：

| 对比项 | Flowable | Activiti |
|:-------|:---------|:---------|
| 开发团队 | 原 Activiti 核心团队 | 新团队 |
| 更新频率 | 活跃，频繁更新 | 相对缓慢 |
| Spring Boot | 完美支持 | 支持一般 |
| 异步执行器 | 改进的异步执行器 | 传统异步执行器 |
| DMN 支持 | 原生支持决策引擎 | 支持较弱 |
| CMMN 支持 | 支持案例管理 | 不支持 |
| 事务管理 | 更好的事务处理 | 一般 |
| 性能 | 更优 | 一般 |
| 社区活跃度 | 高 | 中等 |

**Flowable 的优势**：

**1. 更好的 Spring Boot 集成**：
```java
@SpringBootApplication
public class FlowableApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlowableApplication.class, args);
    }
}

// 自动注入服务
@Service
public class LeaveService {
    @Autowired
    private RuntimeService runtimeService;
    
    @Autowired
    private TaskService taskService;
}
```

**2. 多引擎支持**：
- BPMN 引擎（流程）
- DMN 引擎（决策）
- CMMN 引擎（案例）
- Form 引擎（表单）

**3. 异步执行器改进**：
- 更高效的异步任务处理
- 更好的线程池管理
- 支持消息队列集成

**选择建议**：
- **新项目**：推荐 Flowable（更活跃，功能更强）
- **老项目**：Activiti 迁移到 Flowable 成本较低
- **简单场景**：两者都可以
- **复杂场景**：Flowable 更合适（DMN、CMMN）

---

### 16.3 BPMN 2.0 的常用节点

**面试官：** BPMN 2.0 有哪些常用节点？

**面试者：** BPMN 2.0（Business Process Model and Notation）定义了丰富的流程元素：

**事件（Events）**：

| 事件类型 | 说明 | 示例 |
|:---------|:-----|:-----|
| 开始事件 | 流程的起点 | 启动请假流程 |
| 结束事件 | 流程的终点 | 请假流程结束 |
| 定时事件 | 定时触发 | 每天凌晨执行 |
| 消息事件 | 接收/发送消息 | 收到审批通知 |
| 错误事件 | 捕获错误 | 处理异常情况 |

**任务（Tasks）**：

**1. 用户任务（User Task）**：
```xml
<userTask id="approveTask" name="经理审批" 
          flowable:assignee="${manager}">
  <extensionElements>
    <flowable:formProperty id="approved" name="是否同意" 
                           type="boolean" required="true"/>
    <flowable:formProperty id="comment" name="审批意见" 
                           type="string"/>
  </extensionElements>
</userTask>
```

**2. 服务任务（Service Task）**：
```xml
<!-- Java 类实现 -->
<serviceTask id="sendEmail" name="发送邮件" 
             flowable:class="com.example.SendEmailTask"/>

<!-- 表达式 -->
<serviceTask id="calculateTask" name="计算" 
             flowable:expression="${calculationService.calculate(days)}"/>

<!-- 委托表达式 -->
<serviceTask id="notifyTask" name="通知" 
             flowable:delegateExpression="${notificationDelegate}"/>
```

**3. 脚本任务（Script Task）**：
```xml
<scriptTask id="scriptTask" name="计算总价" 
            scriptFormat="groovy">
  <script>
    def total = price * quantity
    execution.setVariable("total", total)
  </script>
</scriptTask>
```

**网关（Gateways）**：

**1. 排他网关（Exclusive Gateway）**：
```xml
<exclusiveGateway id="decision" name="判断天数"/>

<sequenceFlow sourceRef="decision" targetRef="managerApprove">
  <conditionExpression xsi:type="tFormalExpression">
    ${days <= 3}
  </conditionExpression>
</sequenceFlow>

<sequenceFlow sourceRef="decision" targetRef="bossApprove">
  <conditionExpression xsi:type="tFormalExpression">
    ${days > 3}
  </conditionExpression>
</sequenceFlow>
```

**2. 并行网关（Parallel Gateway）**：
```xml
<!-- 并行执行多个任务 -->
<parallelGateway id="fork" name="并行开始"/>
<parallelGateway id="join" name="并行结束"/>

<sequenceFlow sourceRef="fork" targetRef="task1"/>
<sequenceFlow sourceRef="fork" targetRef="task2"/>
<sequenceFlow sourceRef="task1" targetRef="join"/>
<sequenceFlow sourceRef="task2" targetRef="join"/>
```

**3. 包容网关（Inclusive Gateway）**：
- 可以选择一个或多个分支
- 类似排他网关 + 并行网关

**子流程（Sub-Process）**：
```xml
<subProcess id="subProcess" name="子流程">
  <startEvent id="subStart"/>
  <userTask id="subTask" name="子任务"/>
  <endEvent id="subEnd"/>
  <sequenceFlow sourceRef="subStart" targetRef="subTask"/>
  <sequenceFlow sourceRef="subTask" targetRef="subEnd"/>
</subProcess>
```

**完整示例（请假流程）**：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             targetNamespace="http://flowable.org/test">
  
  <process id="leaveProcess" name="请假流程" isExecutable="true">
    
    <!-- 开始事件 -->
    <startEvent id="start" name="开始"/>
    
    <!-- 用户任务：填写请假单 -->
    <userTask id="fillForm" name="填写请假单" 
              flowable:assignee="${applicant}"/>
    
    <!-- 排他网关：判断天数 -->
    <exclusiveGateway id="daysDecision" name="判断天数"/>
    
    <!-- 用户任务：经理审批 -->
    <userTask id="managerApprove" name="经理审批" 
              flowable:candidateGroups="managers"/>
    
    <!-- 用户任务：总监审批 -->
    <userTask id="bossApprove" name="总监审批" 
              flowable:candidateGroups="directors"/>
    
    <!-- 服务任务：发送通知 -->
    <serviceTask id="sendNotification" name="发送通知" 
                 flowable:class="com.example.SendNotificationTask"/>
    
    <!-- 结束事件 -->
    <endEvent id="end" name="结束"/>
    
    <!-- 连线 -->
    <sequenceFlow sourceRef="start" targetRef="fillForm"/>
    <sequenceFlow sourceRef="fillForm" targetRef="daysDecision"/>
    
    <sequenceFlow sourceRef="daysDecision" targetRef="managerApprove">
      <conditionExpression>${days <= 3}</conditionExpression>
    </sequenceFlow>
    
    <sequenceFlow sourceRef="daysDecision" targetRef="bossApprove">
      <conditionExpression>${days > 3}</conditionExpression>
    </sequenceFlow>
    
    <sequenceFlow sourceRef="managerApprove" targetRef="sendNotification"/>
    <sequenceFlow sourceRef="bossApprove" targetRef="sendNotification"/>
    <sequenceFlow sourceRef="sendNotification" targetRef="end"/>
    
  </process>
</definitions>
```

---

### 16.4 Flowable 的流程部署和启动

**面试官：** Flowable 如何部署和启动流程？

**面试者：** Flowable 的流程部署和启动主要通过 API 完成：

**1. 流程部署**：

**方式一：通过文件部署**：
```java
@Service
public class ProcessDeploymentService {
    
    @Autowired
    private RepositoryService repositoryService;
    
    // 部署单个文件
    public String deploySingleFile() {
        Deployment deployment = repositoryService.createDeployment()
            .addClasspathResource("processes/leave.bpmn20.xml")
            .name("请假流程")
            .category("HR")
            .deploy();
        
        return deployment.getId();
    }
    
    // 部署多个文件
    public String deployMultipleFiles() {
        Deployment deployment = repositoryService.createDeployment()
            .addClasspathResource("processes/leave.bpmn20.xml")
            .addClasspathResource("processes/leave.png")
            .addClasspathResource("forms/leave-form.form")
            .name("请假流程包")
            .deploy();
        
        return deployment.getId();
    }
    
    // 部署 ZIP 文件
    public String deployZip() {
        InputStream inputStream = this.getClass()
            .getClassLoader()
            .getResourceAsStream("processes/leave.zip");
        
        Deployment deployment = repositoryService.createDeployment()
            .addZipInputStream(new ZipInputStream(inputStream))
            .name("请假流程ZIP")
            .deploy();
        
        return deployment.getId();
    }
}
```

**方式二：Spring Boot 自动部署**：
```yaml
# application.yml
flowable:
  # 自动部署
  check-process-definitions: true
  # 流程定义位置
  process-definition-location-prefix: classpath*:/processes/
  process-definition-location-suffixes:
    - **.bpmn20.xml
    - **.bpmn
```

**2. 流程启动**：

**基本启动**：
```java
@Service
public class ProcessStartService {
    
    @Autowired
    private RuntimeService runtimeService;
    
    // 通过流程定义 Key 启动
    public String startByKey() {
        ProcessInstance processInstance = runtimeService
            .startProcessInstanceByKey("leaveProcess");
        
        return processInstance.getId();
    }
    
    // 带流程变量启动
    public String startWithVariables() {
        Map<String, Object> variables = new HashMap<>();
        variables.put("applicant", "zhangsan");
        variables.put("days", 3);
        variables.put("reason", "旅游");
        variables.put("startDate", new Date());
        
        ProcessInstance processInstance = runtimeService
            .startProcessInstanceByKey("leaveProcess", variables);
        
        return processInstance.getId();
    }
    
    // 带业务 Key 启动
    public String startWithBusinessKey() {
        String businessKey = "LEAVE-2024-001";
        
        ProcessInstance processInstance = runtimeService
            .startProcessInstanceByKey(
                "leaveProcess", 
                businessKey, 
                variables
            );
        
        return processInstance.getId();
    }
}
```

**3. 任务处理**：

```java
@Service
public class TaskHandleService {
    
    @Autowired
    private TaskService taskService;
    
    // 查询待办任务
    public List<Task> queryTasks(String assignee) {
        return taskService.createTaskQuery()
            .taskAssignee(assignee)
            .orderByTaskCreateTime()
            .desc()
            .list();
    }
    
    // 查询候选任务
    public List<Task> queryCandidateTasks(String userId) {
        return taskService.createTaskQuery()
            .taskCandidateUser(userId)
            .list();
    }
    
    // 认领任务
    public void claimTask(String taskId, String userId) {
        taskService.claim(taskId, userId);
    }
    
    // 完成任务
    public void completeTask(String taskId) {
        taskService.complete(taskId);
    }
    
    // 完成任务并传递变量
    public void completeTaskWithVariables(String taskId) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("approved", true);
        variables.put("comment", "同意");
        
        taskService.complete(taskId, variables);
    }
    
    // 委派任务
    public void delegateTask(String taskId, String userId) {
        taskService.delegateTask(taskId, userId);
    }
    
    // 转办任务
    public void transferTask(String taskId, String userId) {
        taskService.setAssignee(taskId, userId);
    }
}
```

**4. 流程查询**：

```java
@Service
public class ProcessQueryService {
    
    @Autowired
    private RuntimeService runtimeService;
    
    @Autowired
    private HistoryService historyService;
    
    // 查询运行中的流程实例
    public List<ProcessInstance> queryRunningProcesses() {
        return runtimeService.createProcessInstanceQuery()
            .active()
            .orderByProcessInstanceStartTime()
            .desc()
            .list();
    }
    
    // 查询流程变量
    public Map<String, Object> getVariables(String processInstanceId) {
        return runtimeService.getVariables(processInstanceId);
    }
    
    // 查询历史流程实例
    public List<HistoricProcessInstance> queryHistoricProcesses() {
        return historyService.createHistoricProcessInstanceQuery()
            .finished()
            .orderByProcessInstanceEndTime()
            .desc()
            .list();
    }
    
    // 查询历史任务
    public List<HistoricTaskInstance> queryHistoricTasks(String processInstanceId) {
        return historyService.createHistoricTaskInstanceQuery()
            .processInstanceId(processInstanceId)
            .orderByHistoricTaskInstanceEndTime()
            .desc()
            .list();
    }
}
```

**5. 流程控制**：

```java
@Service
public class ProcessControlService {
    
    @Autowired
    private RuntimeService runtimeService;
    
    // 挂起流程实例
    public void suspendProcessInstance(String processInstanceId) {
        runtimeService.suspendProcessInstanceById(processInstanceId);
    }
    
    // 激活流程实例
    public void activateProcessInstance(String processInstanceId) {
        runtimeService.activateProcessInstanceById(processInstanceId);
    }
    
    // 删除流程实例
    public void deleteProcessInstance(String processInstanceId, String reason) {
        runtimeService.deleteProcessInstance(processInstanceId, reason);
    }
    
    // 设置流程变量
    public void setVariable(String processInstanceId, String key, Object value) {
        runtimeService.setVariable(processInstanceId, key, value);
    }
}
```

**完整示例（请假流程）**：
```java
@RestController
@RequestMapping("/leave")
public class LeaveController {
    
    @Autowired
    private RuntimeService runtimeService;
    
    @Autowired
    private TaskService taskService;
    
    // 提交请假申请
    @PostMapping("/apply")
    public Result apply(@RequestBody LeaveRequest request) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("applicant", request.getApplicant());
        variables.put("days", request.getDays());
        variables.put("reason", request.getReason());
        
        ProcessInstance processInstance = runtimeService
            .startProcessInstanceByKey("leaveProcess", variables);
        
        return Result.success(processInstance.getId());
    }
    
    // 查询待办任务
    @GetMapping("/tasks")
    public Result queryTasks(@RequestParam String userId) {
        List<Task> tasks = taskService.createTaskQuery()
            .taskAssignee(userId)
            .list();
        
        return Result.success(tasks);
    }
    
    // 审批任务
    @PostMapping("/approve")
    public Result approve(@RequestBody ApproveRequest request) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("approved", request.isApproved());
        variables.put("comment", request.getComment());
        
        taskService.complete(request.getTaskId(), variables);
        
        return Result.success();
    }
}
```

**关键点**：
- 流程定义是静态的，可以多次部署
- 流程实例是动态的，每次启动创建新实例
- 流程变量在整个流程中共享
- 任务分配可以使用 assignee（指定人）或 candidateUsers/candidateGroups（候选人/组）

---

## 总结

:::tip 面试建议
- **基础扎实**：Java 基础、集合、并发是重点
- **框架原理**：不仅会用，还要懂原理
- **中间件**：Redis、Kafka、MySQL 是高频考点
- **系统设计**：分布式、高并发场景设计能力
- **认证授权**：JWT、OAuth2 是现代应用必备
- **工作流引擎**：Flowable/Activiti 在企业应用中很常见
- **项目经验**：结合实际项目，突出亮点
- **持续学习**：技术更新快，保持学习热情
:::

---

**最后更新时间：** 2026-05-04

**相关文档**：
- [Java 基础面试题](/docs/interview/java-基础)
- [Java 并发面试题](/docs/interview/java-并发)
- [Java 集合面试题](/docs/interview/java-集合)
- [Spring 面试题](/docs/interview/java-spring)
- [Spring Boot 面试题](/docs/interview/java-SpringBoot)
- [MyBatis 面试题](/docs/interview/java-mybatis)
- [Redis 面试题](/docs/interview/Redis-interview)
- [MySQL 面试题](/docs/interview/mysql-interview)
- [Spring Cloud 面试题](/docs/interview/java-SpringCloud)
- [系统设计面试题](/docs/interview/后端系统设计)
