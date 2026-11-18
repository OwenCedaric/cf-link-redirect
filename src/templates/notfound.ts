export function renderNotFoundHtml(siteName: string = 'Link Gateway', slug?: string, reason: string = '该短链不存在或已被删除。'): string {
  const displaySlug = slug ? `/${slug}` : '';
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 未找到 · ${siteName}</title>
  
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/favicon.ico">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css">
  
  <script>
    (function() {
      try {
        const saved = localStorage.getItem('chronicle_theme');
        if (saved) {
          document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } catch (e) {}
    })();
  </script>

  <style>
    :root {
      color-scheme: light;
      --base-surface: #fbf9f6;
      --primary-ink: #16181d;
      --secondary-ink: #464e5f;
      --sole-accent: #537791;
      --subtle-border: rgba(22, 24, 29, 0.14);
      --subtle-fill: rgba(22, 24, 29, 0.04);
      --stroke-tint: rgba(22, 24, 29, 0.55);

      --font-body: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: "Noto Serif SC", "Songti SC", "Source Han Serif SC", SimSun, Georgia, serif;
      --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    }

    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        color-scheme: dark;
        --base-surface: #121418;
        --primary-ink: #e8ecf1;
        --secondary-ink: #a3abb8;
        --sole-accent: #9cb4cd;
        --subtle-border: rgba(232, 236, 241, 0.16);
        --subtle-fill: rgba(232, 236, 241, 0.05);
        --stroke-tint: rgba(232, 236, 241, 0.55);
      }
    }

    :root[data-theme="dark"] {
      color-scheme: dark;
      --base-surface: #121418;
      --primary-ink: #e8ecf1;
      --secondary-ink: #a3abb8;
      --sole-accent: #9cb4cd;
      --subtle-border: rgba(232, 236, 241, 0.16);
      --subtle-fill: rgba(232, 236, 241, 0.05);
      --stroke-tint: rgba(232, 236, 241, 0.55);
    }

    :root[data-theme="light"] {
      color-scheme: light;
      --base-surface: #fbf9f6;
      --primary-ink: #16181d;
      --secondary-ink: #464e5f;
      --sole-accent: #537791;
      --subtle-border: rgba(22, 24, 29, 0.14);
      --subtle-fill: rgba(22, 24, 29, 0.04);
      --stroke-tint: rgba(22, 24, 29, 0.55);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      background-color: var(--base-surface);
      color: var(--primary-ink);
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 24px;
      -webkit-font-smoothing: antialiased;
    }

    .error-card {
      max-width: 480px;
      width: 100%;
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      padding: 48px 36px;
      text-align: center;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
    }

    .pressmark-icon {
      font-family: var(--font-serif);
      font-size: 28px;
      color: var(--sole-accent);
      margin-bottom: 16px;
      line-height: 1;
    }

    .error-code {
      font-family: var(--font-serif);
      font-size: 56px;
      font-weight: 700;
      letter-spacing: -2px;
      line-height: 1;
      color: var(--primary-ink);
      margin-bottom: 8px;
    }

    .error-title {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-ink);
      margin-bottom: 12px;
    }

    .slug-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-family: var(--font-mono);
      font-size: 13px;
      padding: 3px 12px;
      background-color: var(--subtle-fill);
      border: 1px solid var(--subtle-border);
      border-radius: 3px;
      color: var(--sole-accent);
      margin-bottom: 16px;
    }

    .error-desc {
      font-size: 14px;
      color: var(--secondary-ink);
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      padding: 8px 24px;
      background-color: var(--primary-ink);
      color: var(--base-surface);
      border-radius: 3px;
      transition: opacity 0.15s ease;
    }

    .btn-back:hover {
      opacity: 0.85;
    }

    .footer-site {
      margin-top: 24px;
      font-size: 12px;
      color: var(--secondary-ink);
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="error-card">
    <div class="pressmark-icon">§</div>
    <div class="error-code">404</div>
    <h1 class="error-title">短链无法访问</h1>
    ${displaySlug ? `<div class="slug-badge"><i class="ri-link-unlink-m"></i> ${displaySlug}</div>` : ''}
    <p class="error-desc">${reason}</p>
    <a href="/" class="btn-back"><i class="ri-home-4-line"></i> 返回首页</a>
  </div>
  <div class="footer-site">${siteName}</div>
</body>
</html>`;
}
