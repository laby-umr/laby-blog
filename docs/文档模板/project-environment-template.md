---
sidebar_position: 4
title: 项目环境模板
description: 项目各环境配置信息、访问地址、账号密码
tags: [模板, 项目环境, 环境配置]
keywords: [项目环境, 配置信息, 访问地址]
authors: [Laby]
last_update:
  date: 2026-05-11
  author: Laby
---

# 项目环境模板

记录项目各环境的配置信息、访问地址及账号密码。

---

## 一、项目信息

<div className="card">

| 项目 | 信息 |
|:-----|:-----|
| 项目名称 | Laby 管理系统 |
| 项目版本 | v1.0.0 |
| 项目负责人 | 张三（zhangsan@company.com） |
| 技术负责人 | 李四（lisi@company.com） |
| 后端仓库 | https://gitee.com/company/laby-server |
| 前端仓库 | https://gitee.com/company/laby-web |

</div>

---

## 二、技术栈

**后端：**

<div className="card">

| 技术 | 版本 | 说明 |
|:-----|:----:|:-----|
| Spring Boot | 3.2.0 | 基础框架 |
| MyBatis Plus | 3.5.5 | ORM 框架 |
| MySQL | 8.0.33 | 关系型数据库 |
| Redis | 7.0.12 | 缓存 |
| Nacos | 2.3.0 | 注册中心 / 配置中心 |
| Kafka | 3.6.0 | 消息队列 |
| XXL-Job | 2.4.0 | 分布式任务调度 |
| Sa-Token | 1.37.0 | 权限认证 |

</div>

**前端：**

<div className="card">

| 技术 | 版本 | 说明 |
|:-----|:----:|:-----|
| Vue | 3.4.0 | 前端框架 |
| Element Plus | 2.5.0 | UI 组件库 |
| Vite | 5.0.0 | 构建工具 |
| Pinia | 2.1.0 | 状态管理 |

</div>

---

## 三、本地环境

### 3.1 中间件信息

通过项目根目录 `docker-compose.yml` 一键启动。

<div className="card">

| 服务 | 地址 | 账号 / 密码 |
|:-----|:-----|:-----------|
| MySQL | localhost:3306 | root / root123456 |
| Redis | localhost:6379 | - / redis123456 |
| Nacos | localhost:8848 | nacos / nacos |
| Kafka | localhost:9092 | - |
| XXL-Job | localhost:8090 | admin / 123456 |

</div>

:::tip 注意事项
如果不想在本地配置中间件环境，可以直接使用测试环境的配置。

将 `application-local.yml` 中的地址和账号密码替换为以下内容：

| 服务 | 地址 | 账号 / 密码 | 备注 |
|:-----|:-----|:-----------|:-----|
| MySQL | 192.168.1.101:3306 | laby_test / Test@Laby2024 | 数据库：laby_test |
| Redis | 192.168.1.102:6379 | - / Redis@Test2024 | db：2 |
| Nacos | 192.168.1.103:8848 | nacos / Nacos@Test2024 | 命名空间：test |
| Kafka | 192.168.1.104:9092 | - | Topic 前缀：laby-test |
| XXL-Job | 192.168.1.105:8090 | admin / Xxl@Test2024 | - |

请勿修改或删除测试环境数据，仅用于本地开发调试。
:::

### 3.2 后端配置（application-local.yml）

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/laby_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: root123456
  redis:
    host: localhost
    port: 6379
    password: redis123456
  kafka:
    bootstrap-servers: localhost:9092
  cloud:
    nacos:
      server-addr: localhost:8848
      username: nacos
      password: nacos

xxl:
  job:
    admin:
      addresses: http://localhost:8090/xxl-job-admin
    executor:
      appname: laby-executor
      port: 9999
```

### 3.3 前端配置（.env.local）

```bash
VITE_APP_BASE_API=http://localhost:8080
VITE_PORT=3000
```


---

## 四、测试环境

### 4.1 中间件信息

<div className="card">

| 服务 | 地址 | 账号 / 密码 | 备注 |
|:-----|:-----|:-----------|:-----|
| MySQL | 192.168.1.101:3306 | laby_test / Test@Laby2024 | 数据库：laby_test |
| Redis | 192.168.1.102:6379 | - / Redis@Test2024 | db：2 |
| Nacos | 192.168.1.103:8848 | nacos / Nacos@Test2024 | 命名空间：test |
| Kafka | 192.168.1.104:9092 | - | Topic 前缀：laby-test |
| XXL-Job | 192.168.1.105:8090 | admin / Xxl@Test2024 | - |

</div>

### 4.2 后端配置（application-test.yml）

```yaml
spring:
  datasource:
    url: jdbc:mysql://192.168.1.101:3306/laby_test?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: laby_test
    password: Test@Laby2024
  redis:
    host: 192.168.1.102
    port: 6379
    password: Redis@Test2024
    database: 2
  kafka:
    bootstrap-servers: 192.168.1.104:9092
    consumer:
      group-id: laby-test-group
  cloud:
    nacos:
      server-addr: 192.168.1.103:8848
      username: nacos
      password: Nacos@Test2024
      namespace: test

xxl:
  job:
    admin:
      addresses: http://192.168.1.105:8090/xxl-job-admin
      accessToken: Xxl@Test2024
    executor:
      appname: laby-test-executor
      port: 9999
```

### 4.3 前端配置（.env.test）

```bash
VITE_APP_BASE_API=https://api-test.laby.com
VITE_APP_ROUTER_MODE=history
```


---

## 五、生产环境

### 5.1 服务器集群

<div className="card">

| 层级 | 服务器 | 内网 IP | 配置 | 角色 |
|:-----|:-------|:--------|:-----|:-----|
| 负载均衡 | Nginx-1 | 172.16.0.1 | 4核 8GB | 主 |
| 负载均衡 | Nginx-2 | 172.16.0.2 | 4核 8GB | 备 |
| 应用层 | App-1 | 172.16.0.11 | 8核 16GB | laby-server |
| 应用层 | App-2 | 172.16.0.12 | 8核 16GB | laby-server |
| 应用层 | App-3 | 172.16.0.13 | 8核 16GB | laby-server |
| 数据库 | MySQL-Master | 172.16.1.11 | 16核 32GB | 主库（写） |
| 数据库 | MySQL-Slave | 172.16.1.12 | 16核 32GB | 从库（读） |
| 缓存 | Redis-1 | 172.16.2.11 | 8核 16GB | Master |
| 缓存 | Redis-2 | 172.16.2.12 | 8核 16GB | Sentinel |
| 缓存 | Redis-3 | 172.16.2.13 | 8核 16GB | Sentinel |

</div>

### 5.2 中间件信息

<div className="card">

| 服务 | 地址 | 账号 / 密码 | 备注 |
|:-----|:-----|:-----------|:-----|
| MySQL 主库 | 172.16.1.11:3306 | laby_prod / Prod@Master#2024 | 数据库：laby_prod，写操作 |
| MySQL 从库 | 172.16.1.12:3306 | laby_readonly / Prod@Slave#2024 | 只读 |
| Redis | 172.16.2.11~13:26379 | - / Prod@Redis#2024 | 哨兵模式，Master：laby-master |
| Nacos | 172.16.3.11:8848 | nacos / Prod@Nacos#2024 | 命名空间：prod |
| Kafka | 172.16.4.11~13:9092 | - | 集群模式 |
| XXL-Job | 172.16.5.11:8090 | admin / Prod@Xxl#2024 | - |

</div>

### 5.3 后端配置（application-prod.yml）

```yaml
spring:
  datasource:
    dynamic:
      primary: master
      datasource:
        master:
          url: jdbc:mysql://172.16.1.11:3306/laby_prod?useSSL=true
          username: laby_prod
          password: Prod@Master#2024
        slave:
          url: jdbc:mysql://172.16.1.12:3306/laby_prod?useSSL=true
          username: laby_readonly
          password: Prod@Slave#2024
  redis:
    sentinel:
      master: laby-master
      nodes:
        - 172.16.2.11:26379
        - 172.16.2.12:26379
        - 172.16.2.13:26379
    password: Prod@Redis#2024
  kafka:
    bootstrap-servers: 172.16.4.11:9092,172.16.4.12:9092,172.16.4.13:9092
    consumer:
      group-id: laby-prod-group
  cloud:
    nacos:
      server-addr: 172.16.3.11:8848
      username: nacos
      password: Prod@Nacos#2024
      namespace: prod

xxl:
  job:
    admin:
      addresses: http://172.16.5.11:8090/xxl-job-admin
      accessToken: Prod@Xxl#2024
    executor:
      appname: laby-prod-executor
      port: 9999
```

### 5.4 前端配置（.env.production）

```bash
VITE_APP_BASE_API=https://api.laby.com
VITE_APP_ROUTER_MODE=history
VITE_APP_CDN_URL=https://cdn.laby.com
```


---

## 六、CI/CD

### 6.1 流水线说明

<div className="card">

| 分支 | 触发方式 | 部署环境 | 审批 |
|:-----|:---------|:---------|:-----|
| test | push 自动触发 | 测试环境 | 无需审批 |
| main | push 自动触发 | 生产环境 | 需技术负责人审批 |

</div>

### 6.2 Harbor 镜像仓库

**Harbor 信息：**

<div className="card">

| 配置项 | 值 |
|:-------|:---|
| 地址 | https://harbor.laby.com |
| 账号 / 密码 | admin / Harbor@Laby2024 |
| 项目空间 | laby |
| 测试镜像 | harbor.laby.com/laby/laby-server:test |
| 生产镜像 | harbor.laby.com/laby/laby-server:latest |

</div>

**登录 / 推送镜像：**

```bash
# 登录 Harbor
docker login harbor.laby.com -u admin -p Harbor@Laby2024

# 构建并推送镜像
docker build -t harbor.laby.com/laby/laby-server:1.0.0 .
docker push harbor.laby.com/laby/laby-server:1.0.0

# 拉取镜像
docker pull harbor.laby.com/laby/laby-server:latest
```

---

### 6.3 GitLab CI

**GitLab Runner 信息：**

<div className="card">

| 配置项 | 值 |
|:-------|:---|
| Runner 地址 | http://gitlab.laby.com |
| Executor | Docker |
| 构建镜像 | maven:3.8-openjdk-17 |
| Runner 标签 | laby-runner |

</div>

**.gitlab-ci.yml：**

```yaml
stages:
  - build
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  paths:
    - .m2/repository/

build:
  stage: build
  tags:
    - laby-runner
  script:
    - mvn clean package -DskipTests
  artifacts:
    paths:
      - target/*.jar
    expire_in: 1 hour
  only:
    - test
    - main

build:image:
  stage: build
  tags:
    - laby-runner
  script:
    - docker build -t harbor.laby.com/laby/laby-server:$CI_COMMIT_SHORT_SHA .
    - docker login harbor.laby.com -u $HARBOR_USER -p $HARBOR_PASSWORD
    - docker push harbor.laby.com/laby/laby-server:$CI_COMMIT_SHORT_SHA
  only:
    - test
    - main

deploy:test:
  stage: deploy
  tags:
    - laby-runner
  script:
    - ssh deploy@192.168.1.100 "docker pull harbor.laby.com/laby/laby-server:$CI_COMMIT_SHORT_SHA"
    - ssh deploy@192.168.1.100 "sh /data/scripts/restart.sh test $CI_COMMIT_SHORT_SHA"
  only:
    - test

deploy:prod:
  stage: deploy
  tags:
    - laby-runner
  script:
    - ssh deploy@172.16.0.11 "docker pull harbor.laby.com/laby/laby-server:$CI_COMMIT_SHORT_SHA"
    - ssh deploy@172.16.0.11 "sh /data/scripts/restart.sh prod $CI_COMMIT_SHORT_SHA"
  only:
    - main
  when: manual
```

### 6.4 Jenkins

**Jenkins 信息：**

<div className="card">

| 配置项 | 值 |
|:-------|:---|
| 地址 | http://jenkins.laby.com |
| 账号 / 密码 | admin / Jenkins@Laby2024 |
| JDK | 17 |
| Maven | 3.8.8 |
| Node.js | 18.18.0 |

</div>

**流水线任务：**

<div className="card">

| 任务名称 | 触发方式 | 部署环境 |
|:---------|:---------|:---------|
| laby-server-test | test 分支 push | 测试环境 |
| laby-server-prod | 手动触发 | 生产环境 |
| laby-web-test | test 分支 push | 测试环境 |
| laby-web-prod | 手动触发 | 生产环境 |

</div>


---

## 七、快速入口

<details>
<summary>本地环境</summary>

<div className="card card-primary">

| 服务 | 地址 | 账号 / 密码 |
|:-----|:-----|:-----------|
| 前端 | http://localhost:3000 | admin / admin123 |
| 接口文档 | http://localhost:8080/doc.html | - |
| Nacos | http://localhost:8848/nacos | nacos / nacos |
| XXL-Job | http://localhost:8090/xxl-job-admin | admin / 123456 |

</div>

</details>

<details>
<summary>测试环境</summary>

<div className="card card-warning">

| 服务 | 地址 | 账号 / 密码 |
|:-----|:-----|:-----------|
| 前端 | https://test.laby.com | admin / test123 |
| 接口文档 | https://api-test.laby.com/doc.html | admin / laby@doc2024 |
| Nacos | http://192.168.1.103:8848/nacos | nacos / Nacos@Test2024 |
| XXL-Job | http://192.168.1.105:8090/xxl-job-admin | admin / Xxl@Test2024 |

</div>

</details>

<details>
<summary>生产环境</summary>

<div className="card card-danger">

| 服务 | 地址 | 账号 / 密码 |
|:-----|:-----|:-----------|
| 前端 | https://www.laby.com | admin / admin123 |
| 接口文档 | https://api.laby.com/doc.html | admin / laby@doc2024 |
| 监控 | https://monitor.laby.com | admin / laby@grafana2024 |
| 日志 | https://log.laby.com | admin / laby@elk2024 |
| Harbor | https://harbor.laby.com | admin / Harbor@Laby2024 |

</div>

</details>

:::warning 安全提示
本文档包含敏感配置信息，请勿外传。如有人员变动，请及时更新账号密码。
:::
