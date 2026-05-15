// 欢迎邮件模板
export function getWelcomeEmailHTML(name: string, email: string = '', unsubscribeUrl: string = ''): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>欢迎加入 - Laby</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fefcf4">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:4px solid #383833">
    
    <!-- Header -->
    <div style="background:#fae500;padding:40px 30px;text-align:center;border-bottom:4px solid #383833">
      <h1 style="margin:0;font-size:42px;font-weight:900;color:#383833;text-transform:uppercase;letter-spacing:1px">
        欢迎加入
      </h1>
      <p style="margin:10px 0 0;font-size:16px;color:#383833;font-weight:700;text-transform:uppercase;letter-spacing:2px">
        Laby Community
      </p>
    </div>

    <!-- Content -->
    <div style="padding:40px 30px;color:#383833">
      <div style="background:#f5f4eb;border:3px solid #fae500;padding:25px;margin-bottom:30px">
        <p style="margin:0;font-size:20px;font-weight:900;color:#383833;text-transform:uppercase">
          你好${name ? ` <span style="color:#314ff4">${name}</span>` : ''}
        </p>
      </div>

      <p style="font-size:18px;line-height:1.8;color:#383833;margin:0 0 30px;font-weight:600">
        感谢订阅！你现在是 <span style="color:#314ff4;font-weight:900">Laby</span> 社区的一员了
      </p>

      <h2 style="font-size:24px;font-weight:900;color:#383833;margin:40px 0 20px;text-transform:uppercase;letter-spacing:1px">
        你将收到
      </h2>

      <!-- Feature 1 -->
      <div style="background:#f5f4eb;border-left:5px solid #314ff4;padding:20px;margin:15px 0">
        <h3 style="margin:0 0 10px;font-size:18px;font-weight:900;color:#314ff4;text-transform:uppercase">
          最新技术文章
        </h3>
        <p style="margin:0;font-size:14px;color:#383833;line-height:1.6">
          深入浅出的编程教程和技术分享
        </p>
      </div>

      <!-- Feature 2 -->
      <div style="background:#f5f4eb;border-left:5px solid #fae500;padding:20px;margin:15px 0">
        <h3 style="margin:0 0 10px;font-size:18px;font-weight:900;color:#6f6600;text-transform:uppercase">
          项目实战
        </h3>
        <p style="margin:0;font-size:14px;color:#383833;line-height:1.6">
          真实项目案例和最佳实践
        </p>
      </div>

      <!-- Feature 3 -->
      <div style="background:#f5f4eb;border-left:5px solid #ff8fa9;padding:20px;margin:15px 0">
        <h3 style="margin:0 0 10px;font-size:18px;font-weight:900;color:#c60159;text-transform:uppercase">
          技术更新
        </h3>
        <p style="margin:0;font-size:14px;color:#383833;line-height:1.6">
          前沿技术动态和工具推荐
        </p>
      </div>

      <div style="background:#f5f4eb;border:2px dashed #fae500;padding:25px;margin:40px 0;text-align:center">
        <p style="margin:0;font-size:16px;color:#383833;font-weight:700;line-height:1.8">
          期待与你分享更多精彩内容
        </p>
      </div>

      <p style="margin:30px 0 0;font-size:12px;color:#65655f;text-align:center">
        不想再收到邮件？
        <a href="${unsubscribeUrl || 'https://laby.top/newsletter/unsubscribe'}" style="color:#314ff4;text-decoration:underline">取消订阅</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f5f4eb;padding:30px;text-align:center;border-top:4px solid #383833">
      <p style="margin:0;font-size:12px;color:#65655f;text-transform:uppercase;letter-spacing:1px;font-weight:600">
        © 2025 Laby Blog
      </p>
    </div>
  </div>
</body>
</html>`;
}
