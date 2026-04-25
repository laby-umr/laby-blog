import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

// 图片懒加载组件
const LazyImage = (props) => (
  <img {...props} loading="lazy" />
);

export default {
  ...MDXComponents,
  img: LazyImage,
};
