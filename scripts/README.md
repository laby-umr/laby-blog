# 部署脚本

此文件夹包含项目的部署和自动化脚本及 Docker 配置文件。

## 文件说明

- `deploy.sh` - Docker 容器部署脚本
- `Dockerfile` - Docker 镜像构建文件
- `docker-compose.yml` - Docker Compose 配置
- `nginx.conf` - Nginx 服务器配置
- `.dockerignore` - Docker 构建忽略文件

## 部署流程

### 前置要求

1. 安装 Docker 和 Docker Compose
2. 构建项目生成 `build` 文件夹

### 使用方法

#### 1. 本地构建和部署

```bash
# 1. 构建 Docusaurus 项目
npm run build

# 2. 进入 scripts 目录
cd scripts

# 3. 运行部署脚本
chmod +x deploy.sh
./deploy.sh
```

#### 2. 服务器部署

将 `scripts/` 文件夹和 `build/` 文件夹（或 `build.zip`）上传到服务器 `/root/blog/` 目录：

```
/root/blog/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
├── deploy.sh
└── build/              # 或 build.zip
```

然后在服务器上执行：

```bash
cd /root/blog
chmod +x deploy.sh
./deploy.sh
```

### 部署脚本功能

`deploy.sh` 会自动执行以下操作：

1. **解压构建文件**（如果存在 `build.zip`）
   ```bash
   unzip -o build.zip -d build
   ```

2. **停止现有容器**
   ```bash
   docker-compose down
   ```

3. **清理旧镜像**
   ```bash
   docker image prune -f
   ```

4. **构建并启动新容器**
   ```bash
   docker-compose up -d --build
   ```

5. **健康检查**
   - 检查服务是否正常运行
   - 访问地址：`http://localhost:8089`

### Docker 配置说明

#### Dockerfile
- 基于 `nginx:latest` 镜像
- 复制 `build/` 目录到 `/usr/share/nginx/html`
- 使用自定义 `nginx.conf` 配置
- 暴露 80 端口

#### docker-compose.yml
- 服务名：`fullstack-dev-blog`
- 端口映射：`8089:80`
- 自动重启：`unless-stopped`
- 健康检查：每 30 秒检查一次

#### nginx.conf
- 启用 Gzip 压缩
- 静态资源缓存 1 年
- SPA 路由回退支持
- 健康检查端点：`/health`

### 常用命令

```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 进入容器
docker exec -it fullstack-dev-blog sh
```

### 故障排查

1. **端口被占用**
   ```bash
   # 检查端口占用
   lsof -i :8089
   # 或修改 docker-compose.yml 中的端口映射
   ```

2. **构建失败**
   ```bash
   # 查看详细日志
   docker-compose logs
   ```

3. **健康检查失败**
   ```bash
   # 手动测试健康检查
   curl http://localhost:8089/health
   ```

## 注意事项

- 确保 `build/` 目录存在且包含完整的构建产物
- 服务器需要开放 8089 端口（或修改为其他端口）
- 首次部署可能需要较长时间下载 nginx 镜像
- 建议在生产环境使用 HTTPS 和域名配置
- 所有部署相关文件都在 `scripts/` 文件夹中，方便统一管理
