# Java 分层架构开发规范

## 概述
本规范定义了 Java 项目中各层的代码标准，包括 VO、DO、DTO、Controller、Service、ServiceImpl、Mapper(DAO) 层的命名、结构和实现规范。

## 1. 数据对象层规范

### 1.1 DO (Data Object) - 数据库实体对象

**位置**: `dal/dataobject/{模块名}/`

**命名规范**:
- 类名: `{业务名}DO`，例如 `CrmBusinessDO`
- 表名注解: `@TableName("{表名}")`
- 继承: `extends BaseDO` (包含通用字段如 createTime, updateTime, creator, updater)

**注解要求**:
```java
@TableName("表名")
@KeySequence("表名_seq") // 如果使用序列
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
```

**字段规范**:
- 主键使用 `@TableId` 注解
- 字段名使用驼峰命名，对应数据库下划线命名
- 使用包装类型 (Long, Integer, Boolean) 而非基本类型
- 金额字段使用 `BigDecimal` 类型
- 时间字段使用 `LocalDateTime` 类型
- 布尔字段命名: `is{属性名}` 或直接使用状态名

**示例**:
```java
/**
 * CRM 产品执行阶段 DO
 *
 * @author 芋道源码
 */
@TableName("crm_product_stage")
@KeySequence("crm_product_stage_seq")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrmProductStageDO extends BaseDO {

    /**
     * 阶段ID
     */
    @TableId
    private Long id;

    /**
     * 产品分类ID
     */
    private Long categoryId;

    /**
     * 阶段名称
     */
    private String stageName;

    /**
     * 阶段顺序
     */
    private Integer stageOrder;

    /**
     * 是否必填
     */
    private Boolean isRequired;

}
```

### 1.2 VO (View Object) - 视图对象

**位置**: `controller/admin/{模块名}/vo/{子模块}/`

**分类**:
- **ReqVO (Request VO)**: 接收前端请求参数
  - `{业务名}SaveReqVO`: 创建和更新请求
  - `{业务名}PageReqVO`: 分页查询请求
  - `{业务名}UpdateStatusReqVO`: 状态更新请求
  - `{业务名}TransferReqVO`: 转移请求
- **RespVO (Response VO)**: 返回给前端的数据
  - `{业务名}RespVO`: 详情和列表响应

**注解要求**:
```java
@Schema(description = "管理后台 - {业务描述} Request/Response VO")
@Data
```

**ReqVO 额外注解**:
- 字段校验: `@NotNull`, `@NotEmpty`, `@NotBlank`
- 分页继承: `extends PageParam`

**RespVO 额外注解**:
- Excel 导出: `@ExcelIgnoreUnannotated` + `@ExcelProperty("列名")`
- 字段说明: `@Schema(description = "字段说明", example = "示例值")`

**示例**:
```java
/**
 * 管理后台 - CRM 商机 Response VO
 */
@Schema(description = "管理后台 - CRM 商机 Response VO")
@Data
@ExcelIgnoreUnannotated
public class CrmBusinessRespVO {

    @Schema(description = "编号", requiredMode = Schema.RequiredMode.REQUIRED)
    @ExcelProperty("编号")
    private Long id;
    
    @Schema(description = "商机名称")
    @ExcelProperty("商机名称")
    private String name;

}
```

### 1.3 DTO (Data Transfer Object) - 数据传输对象

**位置**: `api/{模块名}/dto/`

**用途**: 跨模块、跨服务调用时的数据传输

**命名规范**: `{业务名}RespDTO` 或 `{业务名}ReqDTO`

**注解要求**:
```java
@Data
```

## 2. Controller 层规范

**位置**: `controller/admin/{模块名}/`

**命名规范**: `{业务名}Controller`

**类注解**:
```java
@Tag(name = "管理后台 - {业务描述}")
@RestController
@RequestMapping("/{模块}/{业务}")
@Validated
```

**方法规范**:

### 2.1 创建接口
```java
@PostMapping("/create")
@Operation(summary = "创建{业务}")
@PreAuthorize("@ss.hasPermission('{模块}:{业务}:create')")
public CommonResult<Long> create{业务}(@Valid @RequestBody {业务}SaveReqVO createReqVO) {
    return success({业务}Service.create{业务}(createReqVO, getLoginUserId()));
}
```

### 2.2 更新接口
```java
@PutMapping("/update")
@Operation(summary = "更新{业务}")
@PreAuthorize("@ss.hasPermission('{模块}:{业务}:update')")
public CommonResult<Boolean> update{业务}(@Valid @RequestBody {业务}SaveReqVO updateReqVO) {
    {业务}Service.update{业务}(updateReqVO);
    return success(true);
}
```

### 2.3 删除接口
```java
@DeleteMapping("/delete")
@Operation(summary = "删除{业务}")
@Parameter(name = "id", description = "编号", required = true)
@PreAuthorize("@ss.hasPermission('{模块}:{业务}:delete')")
public CommonResult<Boolean> delete{业务}(@RequestParam("id") Long id) {
    {业务}Service.delete{业务}(id);
    return success(true);
}
```

### 2.4 查询接口
```java
@GetMapping("/get")
@Operation(summary = "获得{业务}")
@Parameter(name = "id", description = "编号", required = true)
@PreAuthorize("@ss.hasPermission('{模块}:{业务}:query')")
public CommonResult<{业务}RespVO> get{业务}(@RequestParam("id") Long id) {
    {业务}DO {业务} = {业务}Service.get{业务}(id);
    return success(BeanUtils.toBean({业务}, {业务}RespVO.class));
}
```

### 2.5 分页查询接口
```java
@GetMapping("/page")
@Operation(summary = "获得{业务}分页")
@PreAuthorize("@ss.hasPermission('{模块}:{业务}:query')")
public CommonResult<PageResult<{业务}RespVO>> get{业务}Page(@Valid {业务}PageReqVO pageVO) {
    PageResult<{业务}DO> pageResult = {业务}Service.get{业务}Page(pageVO, getLoginUserId());
    return success(new PageResult<>(convertList(pageResult.getList()), pageResult.getTotal()));
}
```

### 2.6 导出接口
```java
@GetMapping("/export-excel")
@Operation(summary = "导出{业务} Excel")
@PreAuthorize("@ss.hasPermission('{模块}:{业务}:export')")
@ApiAccessLog(operateType = EXPORT)
public void export{业务}Excel(@Valid {业务}PageReqVO exportReqVO,
                              HttpServletResponse response) throws IOException {
    exportReqVO.setPageSize(PAGE_SIZE_NONE);
    List<{业务}DO> list = {业务}Service.get{业务}Page(exportReqVO, getLoginUserId()).getList();
    ExcelUtils.write(response, "{业务}.xls", "数据", {业务}RespVO.class, 
                     BeanUtils.toBean(list, {业务}RespVO.class));
}
```

**Controller 层规范要点**:
- 只负责参数接收、权限校验、结果返回
- 不包含业务逻辑
- 不包含数据组装逻辑（数据组装应在 Service 层完成）
- 统一返回 `CommonResult<T>`
- 使用 `@Valid` 进行参数校验
- 使用 `@PreAuthorize` 进行权限控制
- Controller 方法应该尽可能简洁，通常只有 1-3 行代码

## 3. Service 接口层规范

**位置**: `service/{模块名}/`

**命名规范**: `{业务名}Service`

**方法命名规范**:
- 创建: `create{业务}()`
- 更新: `update{业务}()`
- 删除: `delete{业务}()`
- 查询单个: `get{业务}()`
- 查询列表: `get{业务}List()`
- 查询分页: `get{业务}Page()`
- 校验: `validate{业务}()`
- 统计: `get{业务}Count()`

**示例**:
```java
public interface CrmBusinessService {
    
    /**
     * 创建商机
     */
    Long createBusiness(CrmBusinessSaveReqVO createReqVO, Long userId);
    
    /**
     * 更新商机
     */
    void updateBusiness(CrmBusinessSaveReqVO updateReqVO);
    
    /**
     * 删除商机
     */
    void deleteBusiness(Long id);
    
    /**
     * 获得商机
     */
    CrmBusinessDO getBusiness(Long id);
    
    /**
     * 获得商机分页
     */
    PageResult<CrmBusinessDO> getBusinessPage(CrmBusinessPageReqVO pageReqVO, Long userId);
}
```

## 4. ServiceImpl 实现层规范

**位置**: `service/{模块名}/`

**命名规范**: `{业务名}ServiceImpl`

**类注解**:
```java
@Service
@Validated
```

**依赖注入**:
- 使用 `@Resource` 注入依赖
- Mapper 注入命名: `{业务名}Mapper`
- 其他 Service 注入: 如有循环依赖使用 `@Lazy`

**事务注解**:
```java
@Transactional(rollbackFor = Exception.class)
```

**日志记录注解**:
```java
@LogRecord(type = CRM_{业务}_TYPE, 
           subType = CRM_{业务}_{操作}_SUB_TYPE, 
           bizNo = "{{#id}}", 
           success = CRM_{业务}_{操作}_SUCCESS)
```

**权限注解**:
```java
@CrmPermission(bizType = CrmBizTypeEnum.CRM_{业务}, 
               bizId = "#id", 
               level = CrmPermissionLevelEnum.WRITE)
```

**实现规范**:

### 4.1 创建方法
```java
@Override
@Transactional(rollbackFor = Exception.class)
@LogRecord(type = CRM_BUSINESS_TYPE, subType = CRM_BUSINESS_CREATE_SUB_TYPE, 
           bizNo = "{{#business.id}}", success = CRM_BUSINESS_CREATE_SUCCESS)
public Long createBusiness(CrmBusinessSaveReqVO createReqVO, Long userId) {
    // 1. 数据校验
    validateRelationDataExists(createReqVO);
    
    // 2. 数据转换和插入
    CrmBusinessDO business = BeanUtils.toBean(createReqVO, CrmBusinessDO.class);
    businessMapper.insert(business);
    
    // 3. 关联数据处理
    // ...
    
    // 4. 记录操作日志
    LogRecordContext.putVariable("business", business);
    
    return business.getId();
}
```

### 4.2 更新方法
```java
@Override
@Transactional(rollbackFor = Exception.class)
@LogRecord(type = CRM_BUSINESS_TYPE, subType = CRM_BUSINESS_UPDATE_SUB_TYPE, 
           bizNo = "{{#updateReqVO.id}}", success = CRM_BUSINESS_UPDATE_SUCCESS)
@CrmPermission(bizType = CrmBizTypeEnum.CRM_BUSINESS, bizId = "#updateReqVO.id", 
               level = CrmPermissionLevelEnum.WRITE)
public void updateBusiness(CrmBusinessSaveReqVO updateReqVO) {
    // 1. 校验存在
    CrmBusinessDO oldBusiness = validateBusinessExists(updateReqVO.getId());
    
    // 2. 数据校验
    validateRelationDataExists(updateReqVO);
    
    // 3. 更新数据
    CrmBusinessDO updateObj = BeanUtils.toBean(updateReqVO, CrmBusinessDO.class);
    businessMapper.updateById(updateObj);
    
    // 4. 记录操作日志
    LogRecordContext.putVariable(DiffParseFunction.OLD_OBJECT, 
                                 BeanUtils.toBean(oldBusiness, CrmBusinessSaveReqVO.class));
}
```

### 4.3 删除方法
```java
@Override
@Transactional(rollbackFor = Exception.class)
@LogRecord(type = CRM_BUSINESS_TYPE, subType = CRM_BUSINESS_DELETE_SUB_TYPE, 
           bizNo = "{{#id}}", success = CRM_BUSINESS_DELETE_SUCCESS)
@CrmPermission(bizType = CrmBizTypeEnum.CRM_BUSINESS, bizId = "#id", 
               level = CrmPermissionLevelEnum.OWNER)
public void deleteBusiness(Long id) {
    // 1. 校验存在
    CrmBusinessDO business = validateBusinessExists(id);
    
    // 2. 校验关联数据
    validateRelatedData(id);
    
    // 3. 删除数据
    businessMapper.deleteById(id);
    
    // 4. 删除关联数据
    // ...
    
    // 5. 记录操作日志
    LogRecordContext.putVariable("businessName", business.getName());
}
```

### 4.4 查询方法
```java
@Override
@CrmPermission(bizType = CrmBizTypeEnum.CRM_BUSINESS, bizId = "#id", 
               level = CrmPermissionLevelEnum.READ)
public CrmBusinessDO getBusiness(Long id) {
    return businessMapper.selectById(id);
}

@Override
public PageResult<CrmBusinessDO> getBusinessPage(CrmBusinessPageReqVO pageReqVO, Long userId) {
    return businessMapper.selectPage(pageReqVO, userId);
}
```

### 4.5 校验方法
```java
private CrmBusinessDO validateBusinessExists(Long id) {
    CrmBusinessDO business = businessMapper.selectById(id);
    if (business == null) {
        throw exception(BUSINESS_NOT_EXISTS);
    }
    return business;
}

private void validateRelationDataExists(CrmBusinessSaveReqVO saveReqVO) {
    if (saveReqVO.getCustomerId() != null) {
        customerService.validateCustomer(saveReqVO.getCustomerId());
    }
    // 其他关联数据校验...
}
```

**ServiceImpl 层规范要点**:
- 包含核心业务逻辑
- 负责数据校验、转换、持久化
- 负责数据组装（如关联查询、VO 组装）
- 处理事务边界
- 记录操作日志
- 校验方法使用 `private` 修饰
- 数据组装方法使用 `private` 修饰
- 异常使用 `throw exception(错误码)` 抛出
- 使用 `BeanUtils.toBean()` 进行对象转换
- 集合操作使用 `CollUtil` 工具类

**数据组装规范**:
- 查询详情时，Service 返回 RespVO 而不是 DO
- 分页查询时，Service 返回 `PageResult<RespVO>` 而不是 `PageResult<DO>`
- 数据组装逻辑统一在 Service 层的 `private` 方法中完成
- 避免 N+1 查询，使用批量查询优化性能

## 5. Mapper (DAO) 层规范

**位置**: `dal/mysql/{模块名}/`

**命名规范**: `{业务名}Mapper`

**接口定义**:
```java
@Mapper
public interface CrmBusinessMapper extends BaseMapperX<CrmBusinessDO> {
    
    default PageResult<CrmBusinessDO> selectPage(CrmBusinessPageReqVO reqVO, Long userId) {
        return selectPage(reqVO, new LambdaQueryWrapperX<CrmBusinessDO>()
                .likeIfPresent(CrmBusinessDO::getName, reqVO.getName())
                .eqIfPresent(CrmBusinessDO::getCustomerId, reqVO.getCustomerId())
                .orderByDesc(CrmBusinessDO::getId));
    }
    
    default List<CrmBusinessDO> selectListByCustomerId(Long customerId) {
        return selectList(new LambdaQueryWrapperX<CrmBusinessDO>()
                .eq(CrmBusinessDO::getCustomerId, customerId));
    }
}
```

**方法命名规范**:
- 查询单个: `select{条件}` 或 `selectById`
- 查询列表: `selectList{条件}`
- 查询分页: `selectPage{条件}`
- 统计: `selectCount{条件}`
- 更新: `updateById` 或 `updateBatch`
- 删除: `deleteById` 或 `deleteByIds`

**查询构造器规范**:
- 使用 `LambdaQueryWrapperX` 构建查询条件
- 条件方法:
  - `eqIfPresent`: 等于（参数不为空时）
  - `likeIfPresent`: 模糊查询（参数不为空时）
  - `betweenIfPresent`: 范围查询（参数不为空时）
  - `inIfPresent`: IN 查询（参数不为空时）
  - `geIfPresent`: 大于等于（参数不为空时）
  - `leIfPresent`: 小于等于（参数不为空时）
- 排序: `orderByDesc` 或 `orderByAsc`

**Mapper 层规范要点**:
- 继承 `BaseMapperX<DO>`
- 使用 `@Mapper` 注解
- 复杂查询使用 `default` 方法实现
- 避免在 Mapper 中写业务逻辑
- 使用 Lambda 方式引用字段，避免硬编码字符串

## 6. 通用规范

### 6.0 阿里 P3C 代码格式规范（强制）

#### 6.0.1 类格式规范
- 类注释必须包含类的用途说明和作者信息
- 注解顺序：类注解 → 类定义
- 类注解之间不空行
- 类注解与类定义之间不空行
- 类定义的左大括号 `{` 不换行

```java
/**
 * CRM 产品执行阶段 DO
 *
 * @author 芋道源码
 */
@TableName("crm_product_stage")
@KeySequence("crm_product_stage_seq")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrmProductStageDO extends BaseDO {
    // 类体
}
```

#### 6.0.2 字段格式规范
- 每个字段必须有 Javadoc 注释
- 字段注释使用 `/** */` 格式
- 字段注解与字段声明之间不空行
- 字段之间用空行分隔
- 字段注释在字段注解之前

```java
/**
 * 阶段ID
 */
@TableId
private Long id;

/**
 * 产品分类ID
 */
private Long categoryId;

/**
 * 阶段名称
 */
private String stageName;
```

#### 6.0.3 方法格式规范
- 方法之间用空行分隔
- 方法注释使用 Javadoc 格式
- 方法注解与方法声明之间不空行
- 方法左大括号 `{` 不换行
- 方法体内逻辑块之间用空行分隔

```java
/**
 * 创建商机
 *
 * @param createReqVO 创建请求VO
 * @param userId 用户ID
 * @return 商机ID
 */
@Override
@Transactional(rollbackFor = Exception.class)
public Long createBusiness(CrmBusinessSaveReqVO createReqVO, Long userId) {
    // 1. 数据校验
    validateRelationDataExists(createReqVO);
    
    // 2. 数据转换和插入
    CrmBusinessDO business = BeanUtils.toBean(createReqVO, CrmBusinessDO.class);
    businessMapper.insert(business);
    
    // 3. 返回结果
    return business.getId();
}
```

#### 6.0.4 缩进和空格规范
- 使用 4 个空格缩进，禁止使用 Tab
- 运算符两侧必须有空格
- 关键字（if、for、while 等）与左括号之间有空格
- 左大括号前有空格
- 方法参数之间的逗号后有空格

```java
// 正确
if (condition) {
    doSomething();
}

for (int i = 0; i < 10; i++) {
    process(i);
}

// 错误
if(condition){
    doSomething();
}

for(int i=0;i<10;i++){
    process(i);
}
```

#### 6.0.5 大括号规范
- 左大括号不换行
- 右大括号换行
- if/else/for/while/do 语句必须使用大括号，即使只有一行

```java
// 正确
if (condition) {
    doSomething();
}

// 错误
if (condition) 
{
    doSomething();
}

// 错误 - 缺少大括号
if (condition) doSomething();
```

#### 6.0.6 空行规范
- 类内成员之间用空行分隔（字段、方法）
- 方法内逻辑块之间用空行分隔
- 不同类型的 import 之间用空行分隔
- 类注释与 package 之间有空行
- import 与类定义之间有空行

#### 6.0.7 注释规范
- 类、类属性、类方法必须使用 Javadoc 注释
- 方法内部单行注释使用 `//`，多行注释使用 `/* */`
- 所有的抽象方法必须用 Javadoc 注释
- 所有的枚举类型字段必须有注释

```java
/**
 * 校验商机是否存在
 *
 * @param id 商机ID
 * @return 商机DO
 */
private CrmBusinessDO validateBusinessExists(Long id) {
    // 查询商机
    CrmBusinessDO business = businessMapper.selectById(id);
    
    // 校验是否存在
    if (business == null) {
        throw exception(BUSINESS_NOT_EXISTS);
    }
    
    return business;
}
```

#### 6.0.8 命名规范
- 类名使用 UpperCamelCase 风格
- 方法名、参数名、成员变量、局部变量使用 lowerCamelCase 风格
- 常量命名全部大写，单词间用下划线隔开
- 包名统一使用小写，点分隔符之间有且仅有一个自然语义的英语单词
- 抽象类命名使用 Abstract 或 Base 开头
- 异常类命名使用 Exception 结尾
- 测试类命名以它要测试的类的名称开始，以 Test 结尾

```java
// 类名
public class CrmBusinessServiceImpl { }

// 方法名
public void createBusiness() { }

// 常量
public static final String DEFAULT_STATUS = "ACTIVE";

// 包名
package com.laby.boot.module.crm.service.business;
```

#### 6.0.9 其他格式规范
- 单行字符数限制不超过 120 个
- 方法参数过多时，每个参数占一行，与第一个参数对齐
- 链式调用超过 3 个时换行，点号与下文一起换行
- 数组初始化可以写在一行，也可以每个元素一行

```java
// 方法参数换行
public void createBusiness(CrmBusinessSaveReqVO createReqVO,
                          Long userId,
                          String remark,
                          LocalDateTime createTime) {
    // 方法体
}

// 链式调用换行
return selectPage(reqVO, new LambdaQueryWrapperX<CrmBusinessDO>()
        .likeIfPresent(CrmBusinessDO::getName, reqVO.getName())
        .eqIfPresent(CrmBusinessDO::getCustomerId, reqVO.getCustomerId())
        .orderByDesc(CrmBusinessDO::getId));
```

### 6.1 包导入规范
- 按顺序导入: Java 标准库 → 第三方库 → 项目内部包
- 避免使用 `import *`
- 使用 IDE 自动优化导入

### 6.2 异常处理规范
- 使用 `ServiceExceptionUtil.exception(错误码)` 抛出业务异常
- 错误码定义在 `ErrorCodeConstants` 中
- 不捕获不处理的异常

### 6.3 日志规范
- 使用 `@LogRecord` 注解记录操作日志
- 使用 `LogRecordContext.putVariable()` 记录上下文变量
- 日志类型和子类型定义在 `LogRecordConstants` 中

### 6.4 权限规范
- Controller 层使用 `@PreAuthorize("@ss.hasPermission('{权限标识}')")`
- Service 层使用 `@CrmPermission` 进行数据权限控制
- 权限级别: READ(读), WRITE(写), OWNER(拥有者)

### 6.5 事务规范
- 涉及多表操作使用 `@Transactional(rollbackFor = Exception.class)`
- 只在 Service 层使用事务注解
- 避免事务嵌套和长事务

### 6.6 对象转换规范
- 使用 `BeanUtils.toBean()` 进行单对象转换
- 使用 `BeanUtils.toBean(list, TargetClass.class)` 进行列表转换
- 使用 `convertList()` 进行自定义转换
- 使用 `convertSet()` 提取集合中的某个字段

### 6.7 集合操作规范
- 判空: `CollUtil.isEmpty()` 或 `CollUtil.isNotEmpty()`
- 转换: `convertList()`, `convertSet()`, `convertMap()`
- 过滤: `filterList()`
- 求和: `getSumValue()`

### 6.8 金额计算规范
- 使用 `MoneyUtils.priceMultiply()` 进行金额乘法
- 使用 `MoneyUtils.priceMultiplyPercent()` 进行百分比计算
- 金额字段统一使用 `BigDecimal` 类型

### 6.9 时间处理规范
- 使用 `LocalDateTime` 类型
- 不使用 `Date` 类型
- 时间比较使用 `isBefore()`, `isAfter()`, `isEqual()`

### 6.10 注释规范
- 类注释: 说明类的用途和作者
- 方法注释: 说明方法功能、参数、返回值
- 复杂逻辑添加行内注释
- 使用中文注释

## 7. 枚举类规范

### 7.1 枚举定义规范

**位置**: `enums/{模块名}/`

**命名规范**: `{业务名}Enum`

**注解要求**:
```java
@Getter
@AllArgsConstructor
```

**枚举规范**:
- 每个枚举值必须有 Javadoc 注释
- 枚举字段必须有注释
- 枚举值之间用空行分隔
- 提供静态方法用于枚举值查找
- 实现 IntArrayValuable 接口（如果需要）

**示例**:
```java
/**
 * CRM 测试订单状态枚举
 *
 * @author Kiro
 */
@Getter
@AllArgsConstructor
public enum CrmTestOrderStatusEnum implements IntArrayValuable {

    /**
     * 待支付
     */
    WAIT_PAY(1, "待支付"),

    /**
     * 已支付
     */
    PAID(2, "已支付"),

    /**
     * 已取消
     */
    CANCELLED(3, "已取消");

    /**
     * 状态值
     */
    private final Integer status;

    /**
     * 状态名称
     */
    private final String name;

    /**
     * 所有状态值数组
     */
    public static final int[] ARRAYS = Arrays.stream(values()).mapToInt(CrmTestOrderStatusEnum::getStatus).toArray();

    /**
     * 根据状态值获取枚举
     *
     * @param status 状态值
     * @return 枚举对象
     */
    public static CrmTestOrderStatusEnum valueOf(Integer status) {
        return ArrayUtil.firstMatch(o -> o.getStatus().equals(status), values());
    }

    /**
     * 根据状态值获取状态名称
     *
     * @param status 状态值
     * @return 状态名称
     */
    public static String getNameByStatus(Integer status) {
        CrmTestOrderStatusEnum statusEnum = valueOf(status);
        return statusEnum != null ? statusEnum.getName() : "";
    }

    @Override
    public int[] array() {
        return ARRAYS;
    }

}
```

### 7.2 枚举使用规范
- 使用枚举代替魔法值
- 状态、类型等固定值使用枚举
- 枚举值不要使用 ordinal() 方法
- 枚举比较使用 == 而不是 equals()

## 8. 常量类规范

### 8.1 常量类定义规范

**位置**: `constants/{模块名}/`

**命名规范**: `{业务名}Constants`

**常量规范**:
- 常量类必须是 final 类或接口
- 常量名全部大写，单词间用下划线分隔
- 每个常量必须有 Javadoc 注释
- 相关常量分组，组之间用空行分隔
- 提供私有构造函数防止实例化（如果是类）

**示例**:
```java
/**
 * CRM 测试订单常量类
 *
 * @author Kiro
 */
public class CrmTestOrderConstants {

    /**
     * 订单编号前缀
     */
    public static final String ORDER_NO_PREFIX = "ORD";

    /**
     * 订单编号长度
     */
    public static final int ORDER_NO_LENGTH = 20;

    /**
     * 默认订单状态 - 待支付
     */
    public static final Integer DEFAULT_ORDER_STATUS = 1;

    /**
     * 订单金额最小值
     */
    public static final String MIN_ORDER_AMOUNT = "0.01";

    /**
     * 订单金额最大值
     */
    public static final String MAX_ORDER_AMOUNT = "999999999.99";

    /**
     * Redis Key 前缀 - 订单锁
     */
    public static final String REDIS_KEY_ORDER_LOCK = "crm:test-order:lock:";

    /**
     * Redis Key 过期时间（秒）- 订单锁
     */
    public static final long REDIS_EXPIRE_ORDER_LOCK = 60L;

    /**
     * 私有构造函数，防止实例化
     */
    private CrmTestOrderConstants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

}
```

### 8.2 错误码常量规范

**位置**: `enums/`

**命名规范**: `ErrorCodeConstants`

**错误码规范**:
- 使用接口定义错误码
- 每个错误码必须有注释说明
- 错误码按模块分组
- 错误码区间在类注释中说明
- 错误码格式: `new ErrorCode(错误码, "错误信息")`

**示例**:
```java
/**
 * CRM 错误码常量类
 * 
 * CRM 系统错误码区间：[1-008-000-000 ~ 1-008-999-999]
 * 测试订单模块错误码区间：[1-008-100-000 ~ 1-008-100-999]
 *
 * @author Kiro
 */
public interface ErrorCodeConstants {

    // ========== 测试订单模块 1-008-100-000 ==========

    /**
     * 测试订单不存在
     */
    ErrorCode TEST_ORDER_NOT_EXISTS = new ErrorCode(1_008_100_001, "测试订单不存在");

    /**
     * 测试订单编号重复
     */
    ErrorCode TEST_ORDER_NO_DUPLICATE = new ErrorCode(1_008_100_002, "测试订单编号已存在");

    /**
     * 测试订单状态不允许修改
     */
    ErrorCode TEST_ORDER_STATUS_NOT_ALLOW_UPDATE = new ErrorCode(1_008_100_003, "当前订单状态不允许修改");

}
```

### 8.3 日志常量规范

**位置**: `enums/`

**命名规范**: `LogRecordConstants`

**日志常量规范**:
- 使用类定义日志常量
- 每个常量必须有注释
- 日志常量按模块分组
- 提供私有构造函数防止实例化

**示例**:
```java
/**
 * CRM 操作日志常量类
 *
 * @author Kiro
 */
public class LogRecordConstants {

    // ========== 测试订单模块 ==========

    /**
     * 测试订单日志类型
     */
    public static final String CRM_TEST_ORDER_TYPE = "CRM 测试订单";

    /**
     * 测试订单创建子类型
     */
    public static final String CRM_TEST_ORDER_CREATE_SUB_TYPE = "创建测试订单";

    /**
     * 测试订单创建成功日志模板
     */
    public static final String CRM_TEST_ORDER_CREATE_SUCCESS = "创建了测试订单【{{#testOrder.orderNo}}】";

    /**
     * 私有构造函数，防止实例化
     */
    private LogRecordConstants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

}
```

## 9. Controller 方法注释规范

### 9.1 CRUD 方法注释模板

**创建方法**:
```java
/**
 * 创建{业务名称}
 *
 * @param createReqVO 创建请求VO
 * @return {业务}ID
 */
```

**更新方法**:
```java
/**
 * 更新{业务名称}
 *
 * @param updateReqVO 更新请求VO
 * @return 是否成功
 */
```

**删除方法**:
```java
/**
 * 删除{业务名称}
 *
 * @param id {业务}ID
 * @return 是否成功
 */
```

**查询单个方法**:
```java
/**
 * 获得{业务名称}详情
 *
 * @param id {业务}ID
 * @return {业务}详情
 */
```

**分页查询方法**:
```java
/**
 * 获得{业务名称}分页列表
 *
 * @param pageVO 分页查询条件
 * @return 分页结果
 */
```

**导出方法**:
```java
/**
 * 导出{业务名称} Excel
 *
 * @param exportReqVO 导出查询条件
 * @param response HTTP响应
 * @throws IOException IO异常
 */
```

## 10. 代码检查清单

### 创建新功能时检查:
- [ ] 类是否有完整的 Javadoc 注释（包含类说明和 @author）
- [ ] 所有字段是否有 Javadoc 注释
- [ ] 所有公共方法是否有 Javadoc 注释（包含 @param 和 @return）
- [ ] Controller 的 CRUD 方法是否有完整注释
- [ ] 枚举值是否有注释
- [ ] 枚举字段是否有注释
- [ ] 常量是否有注释
- [ ] 静态方法是否有注释
- [ ] 私有方法是否有注释
- [ ] 类注解之间是否没有空行
- [ ] 类注解与类定义之间是否没有空行
- [ ] 字段之间是否有空行分隔
- [ ] 枚举值之间是否有空行分隔
- [ ] 常量分组之间是否有空行分隔
- [ ] 字段注解与字段声明之间是否没有空行
- [ ] 方法之间是否有空行分隔
- [ ] 左大括号是否不换行
- [ ] if/for/while 是否都使用了大括号
- [ ] 缩进是否使用 4 个空格（不使用 Tab）
- [ ] 运算符两侧是否有空格
- [ ] 单行字符数是否不超过 120 个
- [ ] 枚举是否使用 @Getter 和 @AllArgsConstructor 注解
- [ ] 常量类是否提供了私有构造函数
- [ ] 错误码是否有注释和错误码区间说明
- [ ] 日志常量是否有注释
- [ ] DO 是否继承 BaseDO
- [ ] DO 是否添加了 @TableName 注解
- [ ] VO 是否添加了 @Schema 注解和字段说明
- [ ] ReqVO 是否添加了参数校验注解
- [ ] Controller 方法是否添加了权限注解
- [ ] Controller 方法是否添加了 @Operation 注解
- [ ] Service 接口方法是否有注释
- [ ] ServiceImpl 是否添加了 @Service 和 @Validated 注解
- [ ] 涉及多表操作是否添加了 @Transactional 注解
- [ ] 是否添加了操作日志 @LogRecord 注解
- [ ] 是否进行了数据校验
- [ ] 是否使用了正确的异常抛出方式
- [ ] Mapper 是否继承了 BaseMapperX
- [ ] Mapper 是否添加了 @Mapper 注解
- [ ] 是否使用了 BeanUtils 进行对象转换
- [ ] 金额字段是否使用了 BigDecimal 类型
- [ ] 时间字段是否使用了 LocalDateTime 类型

## 11. 示例代码模板

### 完整的 CRUD 示例

参考 `test-example` 目录中的完整示例代码：
- `CrmTestOrderDO.java` - DO 层示例
- `CrmTestOrderSaveReqVO.java` - 请求 VO 示例
- `CrmTestOrderRespVO.java` - 响应 VO 示例
- `CrmTestOrderPageReqVO.java` - 分页查询 VO 示例
- `CrmTestOrderMapper.java` - Mapper 层示例
- `CrmTestOrderService.java` - Service 接口示例
- `CrmTestOrderServiceImpl.java` - Service 实现示例
- `CrmTestOrderController.java` - Controller 层示例
- `CrmTestOrderStatusEnum.java` - 枚举类示例
- `CrmTestOrderConstants.java` - 常量类示例
- `ErrorCodeConstants.java` - 错误码常量示例
- `LogRecordConstants.java` - 日志常量示例

## 12. 高级规范与最佳实践

### 12.1 参数校验规范

**基础校验注解**:
- `@NotNull`: 不能为 null（可以为空字符串）
- `@NotEmpty`: 不能为 null 且长度/大小必须大于 0（用于字符串、集合、数组）
- `@NotBlank`: 不能为 null 且去除空格后长度必须大于 0（仅用于字符串）
- `@Size(min, max)`: 字符串、集合、数组的大小范围
- `@Length(min, max)`: 字符串长度范围
- `@Min(value)`: 数值最小值
- `@Max(value)`: 数值最大值
- `@DecimalMin(value)`: BigDecimal 最小值
- `@DecimalMax(value)`: BigDecimal 最大值
- `@Pattern(regexp)`: 正则表达式校验
- `@Email`: 邮箱格式校验
- `@Past`: 必须是过去的时间
- `@Future`: 必须是未来的时间

**自定义校验消息**:
```java
@NotBlank(message = "订单编号不能为空")
private String orderNo;

@DecimalMin(value = "0.01", message = "订单金额必须大于0.01")
@DecimalMax(value = "999999999.99", message = "订单金额不能超过999999999.99")
private BigDecimal orderAmount;

@Size(max = 500, message = "备注长度不能超过500个字符")
private String remark;
```

**分组校验**:
```java
public interface CreateGroup {}
public interface UpdateGroup {}

public class CrmTestOrderSaveReqVO {
    @NotNull(groups = UpdateGroup.class, message = "更新时ID不能为空")
    private Long id;
    
    @NotBlank(groups = {CreateGroup.class, UpdateGroup.class}, message = "订单编号不能为空")
    private String orderNo;
}

// Controller 中使用
@PostMapping("/create")
public CommonResult<Long> create(@Validated(CreateGroup.class) @RequestBody CrmTestOrderSaveReqVO createReqVO) {
    // ...
}
```

### 12.2 分页查询优化规范

**分页参数规范**:
```java
@Schema(description = "管理后台 - CRM 测试订单分页查询 Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class CrmTestOrderPageReqVO extends PageParam {

    @Schema(description = "页码", example = "1")
    @Min(value = 1, message = "页码最小值为 1")
    private Integer pageNo = 1;

    @Schema(description = "每页条数", example = "10")
    @Min(value = 1, message = "每页条数最小值为 1")
    @Max(value = 100, message = "每页条数最大值为 100")
    private Integer pageSize = 10;

}
```

**深分页优化**:
- 避免使用 `OFFSET` 进行深分页
- 使用游标分页（基于 ID 或时间戳）
- 限制最大页码或总数

### 12.3 批量操作规范

**批量删除**:
```java
/**
 * 批量删除测试订单
 *
 * @param ids 订单ID列表
 * @return 是否成功
 */
@DeleteMapping("/batch-delete")
@Operation(summary = "批量删除测试订单")
@PreAuthorize("@ss.hasPermission('crm:test-order:delete')")
public CommonResult<Boolean> batchDeleteTestOrder(@RequestParam("ids") List<Long> ids) {
    // 限制批量操作数量
    if (CollUtil.isEmpty(ids) || ids.size() > 100) {
        throw exception(BATCH_DELETE_SIZE_EXCEED);
    }
    testOrderService.batchDeleteTestOrder(ids);
    return success(true);
}
```

**批量操作规范要点**:
- 限制批量操作的数量（建议不超过 100 条）
- 使用事务保证原子性
- 提供批量操作进度反馈（异步任务）
- 记录批量操作日志

### 12.4 异步任务规范

**异步方法定义**:
```java
/**
 * 异步导出测试订单
 *
 * @param exportReqVO 导出查询条件
 * @param userId 用户ID
 */
@Async
@Transactional(rollbackFor = Exception.class)
public void asyncExportTestOrder(CrmTestOrderPageReqVO exportReqVO, Long userId) {
    try {
        // 1. 查询数据
        List<CrmTestOrderDO> list = testOrderMapper.selectPage(exportReqVO).getList();
        
        // 2. 生成文件
        String filePath = generateExcelFile(list);
        
        // 3. 通知用户
        notifyUserExportComplete(userId, filePath);
    } catch (Exception e) {
        log.error("异步导出订单失败", e);
        notifyUserExportFailed(userId, e.getMessage());
    }
}
```

**异步任务规范要点**:
- 使用 `@Async` 注解标记异步方法
- 异步方法必须在不同的类中调用（避免自调用失效）
- 异步任务必须有异常处理和日志记录
- 长时间任务提供进度反馈机制

### 12.5 缓存使用规范

**缓存注解使用**:
```java
/**
 * 获取测试订单（带缓存）
 *
 * @param id 订单ID
 * @return 订单DO
 */
@Cacheable(value = "testOrder", key = "#id", unless = "#result == null")
public CrmTestOrderDO getTestOrderWithCache(Long id) {
    return testOrderMapper.selectById(id);
}

/**
 * 更新测试订单（清除缓存）
 *
 * @param updateReqVO 更新请求VO
 */
@CacheEvict(value = "testOrder", key = "#updateReqVO.id")
public void updateTestOrder(CrmTestOrderSaveReqVO updateReqVO) {
    // 更新逻辑
}
```

**缓存规范要点**:
- 缓存 Key 设计要有业务含义
- 设置合理的过期时间
- 更新/删除操作要清除相关缓存
- 避免缓存穿透、击穿、雪崩

### 12.6 性能优化规范

**N+1 查询优化**:
```java
// 错误示例 - N+1 查询
public List<CrmTestOrderRespVO> getTestOrderList(List<Long> ids) {
    List<CrmTestOrderDO> orders = testOrderMapper.selectByIds(ids);
    return orders.stream().map(order -> {
        // 每次循环都查询一次数据库
        CrmCustomerDO customer = customerService.getCustomer(order.getCustomerId());
        CrmTestOrderRespVO vo = BeanUtils.toBean(order, CrmTestOrderRespVO.class);
        vo.setCustomerName(customer.getName());
        return vo;
    }).collect(Collectors.toList());
}

// 正确示例 - 批量查询
public List<CrmTestOrderRespVO> getTestOrderList(List<Long> ids) {
    List<CrmTestOrderDO> orders = testOrderMapper.selectByIds(ids);
    
    // 批量查询客户信息
    Set<Long> customerIds = convertSet(orders, CrmTestOrderDO::getCustomerId);
    Map<Long, CrmCustomerDO> customerMap = customerService.getCustomerMap(customerIds);
    
    return BeanUtils.toBean(orders, CrmTestOrderRespVO.class, vo -> {
        MapUtils.findAndThen(customerMap, vo.getCustomerId(), 
            customer -> vo.setCustomerName(customer.getName()));
    });
}
```

**性能优化要点**:
- 避免 N+1 查询，使用批量查询
- 合理使用索引
- 避免全表扫描
- 大数据量操作使用分批处理
- 使用连接池复用数据库连接

### 12.7 安全规范

**SQL 注入防护**:
```java
// 正确 - 使用参数化查询
default List<CrmTestOrderDO> selectByOrderNo(String orderNo) {
    return selectList(new LambdaQueryWrapperX<CrmTestOrderDO>()
            .eq(CrmTestOrderDO::getOrderNo, orderNo));
}

// 错误 - 字符串拼接（存在 SQL 注入风险）
// 不要这样写！
```

**XSS 防护**:
- 前端输入进行 HTML 转义
- 使用 `@SafeHtml` 注解校验
- 富文本内容使用白名单过滤

**敏感信息处理**:
```java
/**
 * 用户手机号（脱敏）
 */
@Schema(description = "用户手机号", example = "138****5678")
private String phone;

// Service 层脱敏处理
public String maskPhone(String phone) {
    if (StrUtil.isBlank(phone) || phone.length() < 11) {
        return phone;
    }
    return phone.substring(0, 3) + "****" + phone.substring(7);
}
```

### 12.8 日志规范

**日志级别使用**:
- `ERROR`: 系统错误，需要立即处理
- `WARN`: 警告信息，可能存在问题
- `INFO`: 重要业务流程信息
- `DEBUG`: 调试信息，开发环境使用

**日志内容规范**:
```java
// 正确 - 包含关键信息
log.info("创建订单成功，订单ID：{}，订单编号：{}，用户ID：{}", 
         orderId, orderNo, userId);

// 正确 - 异常日志包含上下文
log.error("创建订单失败，订单编号：{}，用户ID：{}，错误信息：{}", 
          orderNo, userId, e.getMessage(), e);

// 错误 - 信息不足
log.info("创建订单成功");

// 错误 - 没有记录异常堆栈
log.error("创建订单失败：" + e.getMessage());
```

**日志规范要点**:
- 不要在循环中打印日志
- 敏感信息不要记录到日志
- 使用占位符而不是字符串拼接
- 异常日志必须包含堆栈信息

### 12.9 代码复用规范

**工具类提取**:
```java
/**
 * 订单工具类
 *
 * @author Kiro
 */
public class OrderUtils {

    /**
     * 生成订单编号
     *
     * @return 订单编号
     */
    public static String generateOrderNo() {
        return ORDER_NO_PREFIX + DateUtil.format(LocalDateTime.now(), "yyyyMMddHHmmss") 
               + RandomUtil.randomNumbers(6);
    }

    /**
     * 计算订单折扣金额
     *
     * @param totalAmount 总金额
     * @param discountPercent 折扣百分比
     * @return 折扣金额
     */
    public static BigDecimal calculateDiscountAmount(BigDecimal totalAmount, BigDecimal discountPercent) {
        if (totalAmount == null || discountPercent == null) {
            return BigDecimal.ZERO;
        }
        return MoneyUtils.priceMultiplyPercent(totalAmount, discountPercent);
    }

    /**
     * 私有构造函数，防止实例化
     */
    private OrderUtils() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }

}
```

**通用方法抽取**:
- 相同逻辑出现 3 次以上，考虑抽取为方法
- 工具类方法必须是静态方法
- 避免过度封装，保持代码可读性

### 12.10 单元测试规范

**测试类命名**:
- 测试类命名: `{被测试类名}Test`
- 测试方法命名: `test{方法名}_{场景描述}`

**测试方法示例**:
```java
/**
 * CRM 测试订单 Service 测试类
 *
 * @author Kiro
 */
@SpringBootTest
public class CrmTestOrderServiceTest {

    @Resource
    private CrmTestOrderService testOrderService;

    /**
     * 测试创建订单 - 正常场景
     */
    @Test
    public void testCreateTestOrder_success() {
        // 1. 准备测试数据
        CrmTestOrderSaveReqVO createReqVO = new CrmTestOrderSaveReqVO();
        createReqVO.setOrderNo("ORD20240101001");
        createReqVO.setCustomerId(1L);
        createReqVO.setOrderAmount(new BigDecimal("1000.00"));

        // 2. 执行测试
        Long orderId = testOrderService.createTestOrder(createReqVO, 1L);

        // 3. 断言结果
        assertNotNull(orderId);
        assertTrue(orderId > 0);
    }

    /**
     * 测试创建订单 - 订单编号重复
     */
    @Test
    public void testCreateTestOrder_duplicateOrderNo() {
        // 测试逻辑
        assertThrows(ServiceException.class, () -> {
            // 执行会抛出异常的代码
        });
    }

}
```

**测试规范要点**:
- 每个公共方法都应该有对应的测试
- 测试要覆盖正常场景和异常场景
- 使用 `@Transactional` 保证测试数据回滚
- 测试方法之间不要有依赖关系

## 13. 代码审查要点

**注意**: 
1. 本规范是强制性的，所有新代码必须遵循此规范
2. 严格遵循阿里巴巴 Java 开发手册（P3C）的代码格式规范
3. 代码审查时将严格检查是否符合规范
4. 特别注意：
   - 类注解之间不空行、字段之间要空行
   - 所有成员必须有 Javadoc 注释（包括 Controller 方法、枚举值、常量）
   - 枚举值之间要空行分隔
   - 常量类必须提供私有构造函数防止实例化
   - 错误码必须有注释和区间说明
   - 使用枚举代替魔法值


## 13. 代码审查要点

### 13.1 功能性审查
- [ ] 代码是否实现了需求的所有功能
- [ ] 边界条件是否处理正确
- [ ] 异常情况是否有适当的处理
- [ ] 是否有遗漏的业务逻辑

### 13.2 安全性审查
- [ ] 是否存在 SQL 注入风险
- [ ] 是否存在 XSS 攻击风险
- [ ] 敏感信息是否做了脱敏处理
- [ ] 权限校验是否完整
- [ ] 是否有越权访问的风险

### 13.3 性能审查
- [ ] 是否存在 N+1 查询问题
- [ ] 是否有不必要的数据库查询
- [ ] 循环中是否有数据库操作
- [ ] 是否合理使用了缓存
- [ ] 大数据量操作是否分批处理

### 13.4 代码质量审查
- [ ] 代码是否符合命名规范
- [ ] 代码是否有适当的注释
- [ ] 是否有重复代码需要抽取
- [ ] 方法是否过长（建议不超过 50 行）
- [ ] 类是否职责单一

### 13.5 可维护性审查
- [ ] 代码逻辑是否清晰易懂
- [ ] 是否使用了合适的设计模式
- [ ] 是否有硬编码需要提取为常量
- [ ] 是否有魔法值需要使用枚举
- [ ] 日志是否完整且有意义

## 14. 常见问题与解决方案

### 14.1 循环依赖问题
**问题**: Service 之间相互依赖导致启动失败

**解决方案**: 使用 `@Lazy` 延迟加载

### 14.2 事务失效问题
**问题**: 事务注解不生效

**常见原因**: 方法不是 public、同类内部调用、异常被捕获

### 14.3 BigDecimal 精度问题
**问题**: 金额计算精度丢失

**解决方案**: 使用 String 构造 BigDecimal，不使用 double

### 14.4 空指针异常问题
**问题**: NullPointerException 频繁出现

**解决方案**: 使用 Optional、工具类判空、提供默认值

## 15. 版本控制规范

### 15.1 Git 提交规范
**提交信息格式**: `<type>(<scope>): <subject>`

**Type 类型**: feat、fix、docs、style、refactor、perf、test、chore

### 15.2 分支管理规范
**分支类型**: master、develop、feature/xxx、bugfix/xxx、hotfix/xxx、release/xxx

---

**规范总结**:
本规范涵盖了 Java 分层架构开发的所有方面，从代码格式、命名规范、注释规范，到性能优化、安全规范、测试规范等。严格遵循本规范可以保证代码质量、提高开发效率、降低维护成本。
