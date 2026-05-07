/**
 * 视频分类配置
 * 包含分类名称、颜色、图标等信息
 */

export interface Category {
  id: string;
  name: string;
  color: string;
  textColor: string;
  icon?: string;
}

export const categories: Category[] = [
  {
    id: 'All',
    name: 'All',
    color: '#8999ff',
    textColor: '#001470',
  },
  {
    id: 'Frontend',
    name: 'Frontend',
    color: '#314ff4',
    textColor: '#ffffff',
  },
  {
    id: 'Backend',
    name: 'Backend',
    color: '#ff7a5e',
    textColor: '#ffffff',
  },
  {
    id: 'DevOps',
    name: 'DevOps',
    color: '#fae500',
    textColor: '#000000',
  },
];

/**
 * 根据分类ID获取分类配置
 */
export function getCategoryConfig(categoryId: string): Category {
  return categories.find(c => c.id === categoryId) || categories[0];
}

/**
 * 获取所有分类名称列表
 */
export function getCategoryNames(): string[] {
  return categories.map(c => c.name);
}
