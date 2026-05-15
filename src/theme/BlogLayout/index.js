/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

export default function BlogLayout(props) {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  
  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className="row">
          {/* 左侧边栏 */}
          <BlogSidebar sidebar={sidebar} />
          
          {/* 中间内容区域 - 添加内边距 */}
          <main
            className={clsx('col', {
              'col--6': hasSidebar,
              'col--12': !hasSidebar,
            })}
            style={{
              paddingLeft: hasSidebar ? '2rem' : '0',
              paddingRight: toc ? '2rem' : '0',
            }}>
            {children}
          </main>
          
          {/* 右侧目录 */}
          {toc && <div className="col col--3">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
} 