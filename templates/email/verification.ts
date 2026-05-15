// 验证邮件模板
export function getVerificationEmailHTML(name: string, verifyUrl: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>确认订阅 - Laby</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fefcf4">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:4px solid #383833">
    
    <!-- Header -->
    <div style="background:#314ff4;padding:40px 30px;text-align:center;border-bottom:4px solid #383833">
      <h1 style="margin:0;font-size:36px;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:1px">
        确认订阅
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;text-transform:uppercase;letter-spacing:1px">
        Laby Newsletter
      </p>
    </div>

    <!-- Content -->
    <div style="padding:40px 30px;color:#383833">
      <div style="background:#f5f4eb;border-left:4px solid #314ff4;padding:20px;margin-bottom:30px">
        <p style="margin:0;font-size:18px;font-weight:700;color:#383833">
          你好${name ? ` <strong style="color:#314ff4">${name}</strong>` : ''}
        </p>
      </div>

      <p style="font-size:16px;line-height:1.8;color:#383833;margin:0 0 20px">
        感谢订阅 <strong style="color:#314ff4">Laby Blog</strong>
      </p>

      <p style="font-size:16px;line-height:1.8;color:#383833;margin:0 0 30px">
        请点击下面的按钮确认你的邮箱地址
      </p>

      <!-- CTA Button -->
      <div style="text-align:center;margin:40px 0">
        <a href="${verifyUrl}" 
           style="display:inline-block;padding:18px 40px;background:#314ff4;color:#fff;text-decoration:none;font-weight:900;font-size:18px;text-transform:uppercase;letter-spacing:1px;border:3px solid #383833;box-shadow:6px 6px 0 #383833">
          确认订阅
        </a>
      </div>

      <div style="background:#f5f4eb;border:2px dashed #bab9b2;padding:20px;margin:30px 0">
        <p style="margin:0 0 10px;font-size:14px;color:#65655f;font-weight:600">
          或复制此链接到浏览器
        </p>
        <p style="margin:0;font-size:12px;color:#314ff4;word-break:break-all;font-family:'Courier New',monospace">
          ${verifyUrl}
        </p>
      </div>

      <p style="margin:30px 0 0;font-size:14px;color:#65655f;font-style:italic">
        如果你没有订阅，请忽略此邮件
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
