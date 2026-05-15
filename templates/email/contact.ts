// 联系表单邮件模板
export function getContactEmailHTML(name: string, email: string, objective: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新的联系消息</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#fefcf4">
  <div style="max-width:600px;margin:40px auto;background:#fff;border:4px solid #383833">
    
    <!-- Header -->
    <div style="background:#314ff4;padding:40px 30px;text-align:center;border-bottom:4px solid #383833">
      <h1 style="margin:0;font-size:36px;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:1px">
        新的联系消息
      </h1>
      <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;text-transform:uppercase;letter-spacing:1px">
        来自 Laby Blog
      </p>
    </div>

    <!-- Content -->
    <div style="padding:40px 30px;color:#383833">
      <div style="background:#f5f4eb;border-left:4px solid #314ff4;padding:20px;margin-bottom:30px">
        <p style="margin:0;font-size:18px;font-weight:700;color:#383833">
          发件人：<strong style="color:#314ff4">${name}</strong>
        </p>
      </div>

      <div style="background:#f5f4eb;border:2px solid #383833;padding:20px;margin-bottom:20px;border-radius:8px">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#65655f;text-transform:uppercase">
          邮箱地址
        </p>
        <p style="margin:0;font-size:16px;color:#383833;font-weight:600">
          ${email}
        </p>
      </div>

      <div style="background:#f5f4eb;border:2px solid #383833;padding:20px;margin-bottom:20px;border-radius:8px">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#65655f;text-transform:uppercase">
          任务目标
        </p>
        <p style="margin:0;font-size:16px;color:#314ff4;font-weight:700">
          ${objective}
        </p>
      </div>

      <div style="background:#f5f4eb;border:2px solid #383833;padding:20px;margin-bottom:20px;border-radius:8px">
        <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#65655f;text-transform:uppercase">
          消息内容
        </p>
        <p style="margin:0;font-size:16px;color:#383833;line-height:1.8;white-space:pre-wrap">
          ${message}
        </p>
      </div>

      <p style="margin:30px 0 0;font-size:14px;color:#65655f;font-style:italic;text-align:center">
        此邮件由 Laby Blog 联系表单自动发送
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
