/**
 * Bilibili API 服务
 * 使用本地 Mock 数据
 */

import { mockVideos, type MockVideo, type MockDanmaku } from '@site/src/data/mockVideos';

/**
 * 获取视频信息
 * @param bvid 视频BV号
 */
export async function getVideoInfo(bvid: string): Promise<MockVideo> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const video = mockVideos.find(v => v.bvid === bvid);
  if (!video) {
    throw new Error(`视频 ${bvid} 不存在`);
  }
  
  return video;
}

/**
 * 获取视频标签
 * @param bvid 视频BV号
 */
export async function getVideoTags(bvid: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const video = mockVideos.find(v => v.bvid === bvid);
  return video?.tags || [];
}

/**
 * 获取弹幕列表
 * @param bvid 视频BV号
 */
export async function getDanmakuList(bvid: string): Promise<MockDanmaku[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // 动态加载弹幕数据
  try {
    const response = await fetch('/danmaku/butter-fly.js');
    const text = await response.text();
    
    // 提取 danmakuData 数组
    const match = text.match(/export const danmakuData = (\[[\s\S]*?\]);/);
    if (match) {
      const danmakuData = JSON.parse(match[1]);
      return danmakuData;
    }
  } catch (e) {
    console.error('加载弹幕失败:', e);
  }
  
  // 如果加载失败，返回空数组
  return [];
}

/**
 * 获取推荐视频列表
 */
export function getRecommendedVideos() {
  return mockVideos.map(v => ({
    bvid: v.bvid,
    title: v.title,
    description: v.description,
    category: v.category,
  }));
}

/**
 * 获取所有视频
 */
export async function getAllVideos(): Promise<MockVideo[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockVideos;
}

/**
 * 根据分类获取视频
 */
export async function getVideosByCategory(category: string): Promise<MockVideo[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (category === 'All') {
    return mockVideos;
  }
  
  return mockVideos.filter(v => v.category === category);
}

/**
 * 格式化播放量
 */
export function formatViews(views: number): string {
  if (views >= 10000) {
    return `${(views / 10000).toFixed(1)}万`;
  }
  return views.toString();
}

/**
 * 格式化时长（秒 -> MM:SS）
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
