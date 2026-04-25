#!/bin/bash

# 网易云音乐API Docker部署脚本
# 使用方法：bash deploy-netease-api.sh

set -e  # 遇到错误立即退出

echo "=========================================="
echo "网易云音乐API Docker部署脚本"
echo "=========================================="
echo ""

# 配置变量
CONTAINER_NAME="netease-music-api"
IMAGE_NAME="binaryify/netease_cloud_music_api"
HOST_PORT=3001
CONTAINER_PORT=3000

# 检查是否以root权限运行
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  建议使用root权限运行此脚本"
    echo "请使用: sudo bash deploy-netease-api.sh"
    echo ""
fi

# 1. 检查Docker是否已安装
echo "📦 检查Docker安装状态..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker未安装，开始安装Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl start docker
    systemctl enable docker
    echo "✅ Docker安装完成"
else
    echo "✅ Docker已安装: $(docker --version)"
fi
echo ""

# 2. 停止并删除旧容器（如果存在）
echo "🔍 检查是否存在旧容器..."
if docker ps -a | grep -q $CONTAINER_NAME; then
    echo "⚠️  发现旧容器，正在删除..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    echo "✅ 旧容器已删除"
else
    echo "✅ 没有旧容器"
fi
echo ""

# 3. 拉取最新镜像
echo "📥 拉取网易云音乐API镜像..."
docker pull $IMAGE_NAME
echo "✅ 镜像拉取完成"
echo ""

# 4. 运行容器
echo "🚀 启动网易云音乐API容器..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart=always \
  -p $HOST_PORT:$CONTAINER_PORT \
  $IMAGE_NAME

echo "✅ 容器启动成功"
echo ""

# 5. 等待服务启动
echo "⏳ 等待服务启动（5秒）..."
sleep 5
echo ""

# 6. 检查容器状态
echo "📊 检查容器状态..."
if docker ps | grep -q $CONTAINER_NAME; then
    echo "✅ 容器运行正常"
    docker ps | grep $CONTAINER_NAME
else
    echo "❌ 容器启动失败，查看日志："
    docker logs $CONTAINER_NAME
    exit 1
fi
echo ""

# 7. 测试API
echo "🧪 测试API连接..."
if curl -s http://localhost:$HOST_PORT/ | grep -q "Netease"; then
    echo "✅ API测试成功"
else
    echo "⚠️  API测试失败，但容器正在运行"
    echo "请稍等片刻后手动测试: curl http://localhost:$HOST_PORT/"
fi
echo ""

# 8. 配置防火墙（可选）
echo "🔥 配置防火墙..."
if command -v ufw &> /dev/null; then
    echo "检测到ufw防火墙"
    ufw allow $HOST_PORT/tcp 2>/dev/null || echo "⚠️  需要root权限配置防火墙"
    echo "✅ 防火墙规则已添加（如果有权限）"
elif command -v firewall-cmd &> /dev/null; then
    echo "检测到firewalld防火墙"
    firewall-cmd --permanent --add-port=$HOST_PORT/tcp 2>/dev/null || echo "⚠️  需要root权限配置防火墙"
    firewall-cmd --reload 2>/dev/null || true
    echo "✅ 防火墙规则已添加（如果有权限）"
else
    echo "⚠️  未检测到防火墙，跳过配置"
fi
echo ""

# 9. 显示部署信息
echo "=========================================="
echo "🎉 部署完成！"
echo "=========================================="
echo ""
echo "📍 API地址："
echo "   - 本地访问: http://localhost:$HOST_PORT"
echo "   - 外网访问: http://$(curl -s ifconfig.me):$HOST_PORT"
echo ""
echo "📝 常用命令："
echo "   查看状态: docker ps | grep $CONTAINER_NAME"
echo "   查看日志: docker logs -f $CONTAINER_NAME"
echo "   停止服务: docker stop $CONTAINER_NAME"
echo "   启动服务: docker start $CONTAINER_NAME"
echo "   重启服务: docker restart $CONTAINER_NAME"
echo "   删除容器: docker rm -f $CONTAINER_NAME"
echo ""
echo "🧪 测试API："
echo "   curl http://localhost:$HOST_PORT/"
echo "   curl http://localhost:$HOST_PORT/playlist/detail?id=7890260677"
echo ""
echo "=========================================="
