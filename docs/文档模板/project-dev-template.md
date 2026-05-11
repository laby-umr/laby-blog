---
sidebar_position: 5
title: 开发规范模板
description: 项目开发规范，包含克隆项目、分支管理、提交规范、代码注释规范
tags: [模板, 开发规范, Git]
keywords: [开发规范, Git, 提交规范, 代码注释]
authors: [Laby]
last_update:
  date: 2026-05-11
  author: Laby
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 开发规范模板

项目开发规范文档，包含从克隆项目到提交代码的完整流程规范。

:::tip 包含内容
**克隆项目 + 分支管理 + 合并代码 + 提交规范 + 代码注释规范**
:::

---

## 一、克隆项目

```bash
# 克隆后端
git clone https://gitee.com/company/laby-server.git

# 克隆前端
git clone https://gitee.com/company/laby-web.git
```

---

## 二、分支管理

### 2.1 分支说明

<div className="card">

| 分支 | 说明 | 部署环境 |
|:-----|:-----|:---------|
| main | 生产分支，禁止直接提交 | 生产环境 |
| test | 测试分支，禁止直接提交 | 测试环境 |
| develop | 开发主分支 | 开发环境 |
| feature/xxx | 个人功能开发分支 | 本地 |
| bugfix/xxx | Bug 修复分支 | 本地 |
| hotfix/xxx | 紧急修复分支 | 本地 |

</div>

### 2.2 分支命名规范

格式：`类型/姓名缩写-功能描述`

<div className="card">

| 类型 | 格式 | 示例 |
|:-----|:-----|:-----|
| 功能开发 | feature/缩写-功能模块 | feature/zs-user-module |
| Bug 修复 | bugfix/缩写-问题描述 | bugfix/ls-login-error |
| 紧急修复 | hotfix/缩写-问题描述 | hotfix/ww-security-fix |

</div>

### 2.3 创建个人分支

```bash
# 切换到 develop 分支并拉取最新代码
git checkout develop
git pull origin develop

# 创建并切换到个人分支
git checkout -b feature/zs-user-module
```

---

## 三、合并代码

### 3.1 合并到测试分支

开发完成后，将个人分支合并到 `test` 分支触发测试环境部署：

```bash
# 先同步最新代码，避免冲突
git checkout develop
git pull origin develop
git checkout feature/zs-user-module
git rebase develop

# 切换到 test 分支合并
git checkout test
git pull origin test
git merge feature/zs-user-module
git push origin test
```

### 3.2 合并到 develop 分支

功能测试通过后，合并到 develop：

```bash
git checkout develop
git pull origin develop
git merge feature/zs-user-module
git push origin develop
```

### 3.3 合并到生产分支（main）

:::danger 注意
合并到 main 分支需要技术负责人审批，不得自行操作。
:::

```bash
# 由技术负责人执行
git checkout main
git pull origin main
git merge test
git tag v1.0.1
git push origin main --tags
```

### 3.4 解决冲突

```bash
# 查看冲突文件
git status

# 编辑冲突文件，解决冲突后
git add .
git commit -m "fix: 解决合并冲突"
git push origin feature/zs-user-module
```

---

## 四、提交规范

### 4.1 提交格式

```
<type>(<scope>): <subject>
```

- `type`：提交类型
- `scope`：影响范围（可选），如模块名
- `subject`：简短描述，不超过 50 个字符

### 4.2 提交类型

<div className="card">

| type | 说明 | 示例 |
|:-----|:-----|:-----|
| feat | 新功能 | `feat(user): 新增用户列表查询` |
| fix | Bug 修复 | `fix(login): 修复登录失败问题` |
| docs | 文档更新 | `docs(readme): 更新部署文档` |
| style | 代码格式（不影响逻辑） | `style(user): 格式化代码` |
| refactor | 代码重构 | `refactor(order): 重构订单模块` |
| perf | 性能优化 | `perf(query): 优化用户列表查询` |
| test | 测试相关 | `test(user): 新增用户单元测试` |
| chore | 构建 / 依赖变更 | `chore(deps): 升级 Spring Boot` |
| revert | 回滚提交 | `revert: 回滚用户模块变更` |

</div>

### 4.3 提交示例

```bash
git commit -m "feat(user): 新增用户分页查询接口"
git commit -m "fix(login): 修复 token 过期后未跳转登录页"
git commit -m "refactor(order): 重构订单状态流转逻辑"
git commit -m "perf(dict): 字典数据增加 Redis 缓存"
git commit -m "docs(env): 更新测试环境配置文档"
```

---

## 五、代码注释规范

### 5.1 后端注释规范（Java）

**类注释：**

```java
/**
 * 用户管理 Controller
 *
 * @author zs
 * @date 2026-05-11
 */
@RestController
@RequestMapping("/user")
public class UserController {
}
```

**方法注释：**

```java
/**
 * 分页查询用户列表
 *
 * @param pageReqVO 分页请求参数
 * @return 用户分页数据
 */
@GetMapping("/page")
public CommonResult<PageResult<UserRespVO>> getUserPage(@Valid UserPageReqVO pageReqVO) {
    return success(userService.getUserPage(pageReqVO));
}
```

**行内注释：**

```java
// 校验用户是否存在
UserDO user = userMapper.selectById(id);
if (user == null) {
    throw exception(USER_NOT_EXISTS);
}

// 更新用户状态
user.setStatus(status);
userMapper.updateById(user);
```

:::tip 注意事项
- 类和方法必须写注释，行内注释按需添加
- 注释要说明"为什么"，而不是重复代码本身
- 禁止提交无意义注释，如 `// test`、`// 123`
:::

---

### 5.2 前端注释规范（TypeScript / Vue）

**组件注释：**

```vue
<!--
 * 用户列表组件
 * @description 展示用户分页列表，支持搜索、新增、编辑、删除
 * @author zs
 * @date 2026-05-11
-->
<template>
  <div class="user-list">
  </div>
</template>
```

**函数注释（JSDoc）：**

```typescript
/**
 * 获取用户分页列表
 * @param params 查询参数
 * @returns 用户分页数据
 */
export const getUserPage = async (params: UserPageReqVO) => {
  return await request.get({ url: '/user/page', params })
}
```

**行内注释：**

```typescript
// 过滤掉已禁用的用户
const activeUsers = users.filter(user => user.status === 1)

// 格式化时间为 YYYY-MM-DD
const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD')
```

:::tip 注意事项
- 组件必须写头部注释
- 公共函数、工具函数必须写 JSDoc 注释
- 复杂逻辑必须写行内注释说明意图
:::

---

## 六、代码规范

### 6.1 命名规范

#### 后端（Java）

**命名规范**

<div className="card">

| 类型 | 规范 | 示例 |
|:-----|:-----|:-----|
| 类名 | UpperCamelCase | `UserController` |
| 方法名 | lowerCamelCase | `getUserById` |
| 变量名 | lowerCamelCase | `userId` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| 包名 | 全小写，点分隔 | `com.laby.user` |
| 数据库表名 | snake_case | `sys_user` |
| 数据库字段 | snake_case | `user_id` |
| 枚举类 | UpperCamelCase，枚举值全大写 | `UserStatusEnum.ENABLE` |

</div>

**类名后缀约定**

<div className="card">

| 后缀 | 说明 | 示例 |
|:-----|:-----|:-----|
| `Controller` | 控制层 | `UserController` |
| `Service` | 服务接口 | `UserService` |
| `ServiceImpl` | 服务实现 | `UserServiceImpl` |
| `Mapper` | 数据访问层 | `UserMapper` |
| `DO` | 数据库实体 | `UserDO` |
| `VO` | 视图对象 | `UserRespVO` |
| `ReqVO` | 请求参数对象 | `UserPageReqVO` |
| `DTO` | 数据传输对象 | `UserDTO` |
| `Convert` | 对象转换器 | `UserConvert` |
| `Enum` | 枚举类 | `UserStatusEnum` |
| `Utils` | 工具类 | `DateUtils` |
| `Config` | 配置类 | `RedisConfig` |

</div>

#### 前端（TypeScript）

<div className="card">

| 类型 | 规范 | 示例 |
|:-----|:-----|:-----|
| 组件名 | UpperCamelCase | `UserList.vue`、`OrderDetail.vue` |
| 变量 / 函数 | lowerCamelCase | `userList`、`getUserPage` |
| 常量 | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE`、`BASE_URL` |
| 类型 / 接口 | UpperCamelCase | `UserVO`、`PageResult` |
| CSS 类名 | kebab-case | `user-list`、`order-detail` |
| 文件名（非组件） | kebab-case | `user-api.ts`、`date-utils.ts` |
| Props | lowerCamelCase | `userId`、`pageSize` |
| Emit 事件 | kebab-case | `update:modelValue`、`page-change` |

</div>

---

### 6.2 代码风格

#### 后端（Java）

**缩进与格式：**
- 使用 4 个空格缩进，不使用 Tab
- 每行不超过 120 个字符
- 方法之间空一行，逻辑块之间空一行
- 左大括号不换行，右大括号单独一行

```java
// 正确
public UserRespVO getUserById(Long id) {
    UserDO user = userMapper.selectById(id);
    if (user == null) {
        throw exception(USER_NOT_EXISTS);
    }
    return UserConvert.INSTANCE.convert(user);
}

// 错误 - 大括号换行、缩进混乱
public UserRespVO getUserById(Long id)
{
  UserDO user = userMapper.selectById(id);
  return UserConvert.INSTANCE.convert(user);
}
```

**其他约定：**
- 方法参数超过 3 个时，换行对齐
- 链式调用每个方法单独一行
- 不允许出现魔法值，统一定义为常量
- 集合初始化指定大小：`new ArrayList<>(16)`

```java
// 不允许魔法值
if (user.getStatus() == 1) { }       // 错误

if (user.getStatus() == UserStatusEnum.ENABLE.getStatus()) { }  // 正确

// 链式调用换行
LambdaQueryWrapper<UserDO> wrapper = new LambdaQueryWrapper<UserDO>()
        .eq(UserDO::getStatus, status)
        .like(UserDO::getUsername, keyword)
        .orderByDesc(UserDO::getCreateTime);
```

#### 前端（TypeScript / Vue）

**缩进与格式：**
- 使用 2 个空格缩进
- 每行不超过 100 个字符
- 字符串统一使用单引号
- 语句末尾不加分号（遵循项目 ESLint 配置）

```typescript
// 正确
const getUserList = async (params: UserPageReqVO) => {
  const { list, total } = await getUserPage(params)
  userList.value = list
  totalCount.value = total
}

// 错误
const getUserList = async(params:UserPageReqVO)=>{
  const {list,total} = await getUserPage(params);
  userList.value=list;
}
```

**Vue 组件结构顺序：**

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 1. import 导入
// 2. defineProps / defineEmits
// 3. 响应式数据
// 4. 计算属性
// 5. 方法
// 6. 生命周期
</script>

<style scoped lang="scss">
/* 样式 */
</style>
```

---

### 6.3 其他规范

#### 异常处理规范

- 不允许吞掉异常（catch 后不处理）
- 业务异常统一使用项目封装的 `ServiceException`
- 不允许直接返回 null，使用 `Optional` 或抛出异常

```java
// 错误 - 吞掉异常
try {
    doSomething();
} catch (Exception e) {
    // 什么都不做
}

// 错误 - 直接打印堆栈
} catch (Exception e) {
    e.printStackTrace();
}

// 正确 - 记录日志 + 抛出业务异常
} catch (Exception e) {
    log.error("[getUserById] 查询用户失败，id: {}", id, e);
    throw exception(USER_QUERY_FAILED);
}
```

#### 日志规范

- 使用 `@Slf4j` 注解，不允许使用 `System.out.println`
- 日志级别：DEBUG（调试）、INFO（关键流程）、WARN（潜在问题）、ERROR（异常）
- 日志内容要包含关键参数，方便排查问题

```java
// 错误
System.out.println("用户不存在");
log.info("查询用户");

// 正确
log.info("[getUserById] 开始查询用户，id: {}", id);
log.warn("[getUserById] 用户状态异常，id: {}，status: {}", id, user.getStatus());
log.error("[getUserById] 查询用户失败，id: {}", id, e);
```

#### 接口规范

- 统一使用 RESTful 风格
- 接口路径使用小写 kebab-case
- 统一返回 `CommonResult<T>` 包装类

<div className="card">

| 操作 | 方法 | 路径示例 |
|:-----|:-----|:---------|
| 分页查询 | GET | `/user/page` |
| 详情查询 | GET | `/user/{id}` |
| 新增 | POST | `/user/create` |
| 修改 | PUT | `/user/update` |
| 删除 | DELETE | `/user/delete` |
| 批量删除 | DELETE | `/user/delete-batch` |

</div>

```java
// 统一返回格式
@GetMapping("/page")
public CommonResult<PageResult<UserRespVO>> getUserPage(@Valid UserPageReqVO reqVO) {
    return success(userService.getUserPage(reqVO));
}

@PostMapping("/create")
public CommonResult<Long> createUser(@Valid @RequestBody UserSaveReqVO reqVO) {
    return success(userService.createUser(reqVO));
}
```

:::warning 注意事项
- 接口入参必须加 `@Valid` 注解进行参数校验
- 敏感字段（手机号、身份证等）返回时需要脱敏处理
- 删除操作统一使用逻辑删除，不允许物理删除
:::


---

## 七、写在最后

> 规范不是束缚，是团队协作的基础。
> 好的代码让人一眼看懂，好的提交让人一目了然。
> 每一次认真对待规范，都是在为团队节省时间、为自己积累口碑。

:::tip
遇到规范中未覆盖的场景，以**可读性优先、团队一致性优先**为原则处理，并及时同步给团队。
:::
