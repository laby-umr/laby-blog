/**
 * 网易云音乐 API 工具
 * 使用公开的网易云音乐 API
 */

// 网易云音乐 API 基础地址
// 可选的公开API列表（如果一个不行就换另一个）：
// - https://netease-cloud-music-api-eta-six.vercel.app
// - https://music-api.gdstudio.xyz
// - https://api.injahow.cn/meting/
// - http://120.48.86.168:3001 (你自己的服务器)
const API_BASE = 'http://120.48.86.168:3001';

/**
 * 获取歌曲详情
 * @param {number|string} id - 歌曲ID
 */
export async function getSongDetail(id) {
  try {
    const response = await fetch(`${API_BASE}/song/detail?ids=${id}`);
    const data = await response.json();
    if (data.songs && data.songs.length > 0) {
      const song = data.songs[0];
      return {
        id: song.id,
        name: song.name,
        artist: song.ar.map(a => a.name).join(' / '),
        album: song.al.name,
        cover: song.al.picUrl,
        duration: song.dt / 1000, // 转换为秒
      };
    }
    return null;
  } catch (error) {
    console.error('获取歌曲详情失败:', error);
    return null;
  }
}

/**
 * 获取歌曲播放地址
 * @param {number|string} id - 歌曲ID
 */
export async function getSongUrl(id) {
  try {
    const response = await fetch(`${API_BASE}/song/url?id=${id}`);
    const data = await response.json();
    if (data.data && data.data.length > 0 && data.data[0].url) {
      return data.data[0].url;
    }
    // 备用方案：直接构造URL
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  } catch (error) {
    console.error('获取歌曲URL失败:', error);
    // 备用方案
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
  }
}

/**
 * 获取歌词
 * @param {number|string} id - 歌曲ID
 */
export async function getLyric(id) {
  try {
    const response = await fetch(`${API_BASE}/lyric?id=${id}`);
    const data = await response.json();
    if (data.lrc && data.lrc.lyric) {
      return parseLyric(data.lrc.lyric);
    }
    return [];
  } catch (error) {
    console.error('获取歌词失败:', error);
    return [];
  }
}

/**
 * 解析歌词
 * @param {string} lyricStr - 原始歌词字符串
 */
function parseLyric(lyricStr) {
  const lines = lyricStr.split('\n');
  const lyrics = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;

  lines.forEach(line => {
    const timeMatches = [...line.matchAll(timeRegex)];
    const text = line.replace(timeRegex, '').trim();
    
    if (text && timeMatches.length > 0) {
      timeMatches.forEach(match => {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const milliseconds = parseInt(match[3].padEnd(3, '0'));
        const time = minutes * 60 + seconds + milliseconds / 1000;
        
        lyrics.push({ time, text });
      });
    }
  });

  return lyrics.sort((a, b) => a.time - b.time);
}

/**
 * 搜索歌曲
 * @param {string} keyword - 搜索关键词
 * @param {number} limit - 返回数量
 */
export async function searchSongs(keyword, limit = 10) {
  try {
    const response = await fetch(`${API_BASE}/search?keywords=${encodeURIComponent(keyword)}&limit=${limit}`);
    const data = await response.json();
    if (data.result && data.result.songs) {
      return data.result.songs.map(song => ({
        id: song.id,
        name: song.name,
        artist: song.artists.map(a => a.name).join(' / '),
        album: song.album.name,
      }));
    }
    return [];
  } catch (error) {
    console.error('搜索歌曲失败:', error);
    return [];
  }
}

/**
 * 获取歌单歌曲
 * @param {number|string} playlistId - 歌单ID
 * @param {number} limit - 获取数量，默认20首
 */
export async function getPlaylistSongs(playlistId, limit = 20) {
  try {
    const response = await fetch(`${API_BASE}/playlist/detail?id=${playlistId}`);
    const data = await response.json();
    if (data.playlist && data.playlist.tracks) {
      const tracks = data.playlist.tracks.slice(0, limit);
      
      // 获取每首歌的播放URL和歌词
      const songsWithDetails = await Promise.all(
        tracks.map(async (song) => {
          const [url, lyrics] = await Promise.all([
            getSongUrl(song.id),
            getLyric(song.id),
          ]);
          
          return {
            id: song.id,
            name: song.name,
            artist: song.ar.map(a => a.name).join(' / '),
            album: song.al.name,
            cover: song.al.picUrl,
            duration: song.dt / 1000,
            src: url,
            lyrics,
          };
        })
      );
      
      return songsWithDetails;
    }
    return [];
  } catch (error) {
    console.error('获取歌单失败:', error);
    return [];
  }
}

/**
 * 批量获取歌曲完整信息（包含URL和歌词）
 * @param {Array} ids - 歌曲ID数组
 */
export async function getFullSongsInfo(ids) {
  const songs = [];
  
  for (const id of ids) {
    const [detail, url, lyrics] = await Promise.all([
      getSongDetail(id),
      getSongUrl(id),
      getLyric(id),
    ]);
    
    if (detail) {
      songs.push({
        ...detail,
        src: url,
        lyrics,
      });
    }
  }
  
  return songs;
}

// 预设的周杰伦歌曲ID列表
export const JAY_CHOU_SONGS = [
  185868,   // 晴天
  185813,   // 稻香
  185812,   // 七里香
  185820,   // 夜曲
  186016,   // 青花瓷
  186001,   // 东风破
  185899,   // 简单爱
  185876,   // 告白气球
  1308406542, // Mojito
  185809,   // 听妈妈的话
];

// ============================================
// 🎵 在这里配置你的网易云歌单ID
// ============================================
// 获取方法：
// 1. 打开网易云音乐网页版
// 2. 进入你喜欢的歌单
// 3. 复制URL中的ID，例如：https://music.163.com/#/playlist?id=123456789
// 4. 将 123456789 填入下方
// ============================================
export const MY_PLAYLIST_ID = '7890260677'; // 你的网易云歌单

// 每次加载的歌曲数量
export const PLAYLIST_LIMIT = 15;
