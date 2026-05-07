/**
 * Docusaurus 插件：自动为博客文章的 frontMatter image 添加 baseUrl
 */

module.exports = function blogImagePlugin(context, options) {
  return {
    name: 'blog-image-plugin',
    
    async contentLoaded({ content, actions }) {
      const { blogPosts } = content;
      const { setGlobalData } = actions;
      
      // 处理每篇博客文章的图片路径
      const processedPosts = blogPosts.map(post => {
        if (post.metadata.frontMatter && post.metadata.frontMatter.image) {
          const image = post.metadata.frontMatter.image;
          
          // 如果是相对路径，添加 baseUrl
          if (image.startsWith('/') && !image.startsWith('//') && !image.match(/^https?:\/\//)) {
            const baseUrl = context.siteConfig.baseUrl;
            post.metadata.frontMatter.image = `${baseUrl}${image.replace(/^\//, '')}`;
          }
        }
        
        return post;
      });
      
      setGlobalData({ blogPosts: processedPosts });
    },
  };
};
