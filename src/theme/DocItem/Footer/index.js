import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import ShareButtons from '@site/src/components/ShareButtons';
import { useLocation } from '@docusaurus/router';

export default function FooterWrapper(props) {
  const location = useLocation();
  
  // 从 DOM 获取标题，或使用默认值
  const title = typeof document !== 'undefined' 
    ? document.title 
    : 'Share this page';
  
  const url = typeof window !== 'undefined'
    ? window.location.href
    : `https://laby.top${location.pathname}`;

  return (
    <>
      <Footer {...props} />
      <ShareButtons title={title} url={url} />
    </>
  );
}
