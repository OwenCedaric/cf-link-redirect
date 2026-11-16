export function renderUnauthorizedHtml(domain: string, siteName: string = 'Link Gateway'): string {
  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>管理员认证 · ${siteName}</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <style>
    /* Chronicle Design System - Core Tokens */
    :root {
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

      --reading-max-width: 480px;
    }

    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
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
      --base-surface: #121418;
      --primary-ink: #e8ecf1;
      --secondary-ink: #a3abb8;
      --sole-accent: #9cb4cd;
      --subtle-border: rgba(232, 236, 241, 0.16);
      --subtle-fill: rgba(232, 236, 241, 0.05);
      --stroke-tint: rgba(232, 236, 241, 0.55);
    }

    :root[data-theme="light"] {
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

    html {
      background-color: var(--base-surface);
      color: var(--primary-ink);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      background-color: var(--base-surface);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 24px;
      line-height: 1.6;
    }

    ::selection {
      background-color: var(--sole-accent);
      color: var(--base-surface);
    }

    .top-bar {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    .theme-toggle-btn {
      background: none;
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      padding: 6px 12px;
      font-family: var(--font-serif);
      font-size: 12px;
      color: var(--secondary-ink);
      cursor: pointer;
      transition: all 0.2s;
    }

    .theme-toggle-btn:hover {
      border-color: var(--sole-accent);
      color: var(--primary-ink);
    }

    .auth-card {
      width: 100%;
      max-width: var(--reading-max-width);
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      border-radius: 4px;
      padding: 36px 32px;
    }

    @media (max-width: 640px) {
      .auth-card {
        padding: 28px 20px;
      }
    }

    .pressmark-icon {
      width: 42px;
      height: 42px;
      border: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-serif);
      font-size: 18px;
      color: var(--primary-ink);
      margin-bottom: 20px;
    }

    .title {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 22px;
      color: var(--primary-ink);
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    .description {
      font-size: 13.5px;
      color: var(--secondary-ink);
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-ink);
      margin-bottom: 6px;
    }

    .input-row {
      display: flex;
      gap: 8px;
    }

    .form-input {
      flex: 1;
      background-color: var(--base-surface);
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      padding: 9px 12px;
      font-size: 13px;
      font-family: var(--font-mono);
      color: var(--primary-ink);
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--sole-accent);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 13px;
      padding: 9px 18px;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      white-space: nowrap;
    }

    .btn-primary {
      background: var(--primary-ink);
      color: var(--base-surface);
      border: 1px solid var(--primary-ink);
      font-weight: 500;
    }

    .btn-primary:hover {
      opacity: 0.88;
    }

    /* Chronicle Minimalist Toast */
    .chronicle-toast {
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(16px);
      background-color: var(--primary-ink);
      color: var(--base-surface);
      font-family: var(--font-serif);
      font-size: 13px;
      padding: 9px 18px;
      border-radius: 4px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 2000;
      letter-spacing: 0.02em;
    }

    .chronicle-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  </style>
</head>
<body>
  <div class="top-bar">
    <button class="theme-toggle-btn" id="themeBtn" onclick="toggleTheme()" title="切换主题">Theme</button>
  </div>

  <div class="auth-card">
    <div class="pressmark-icon">§</div>
    <h1 class="title">管理员认证</h1>
    <p class="description">
      当前控制台仅限管理员访问。请输入管理口令（ADMIN_TOKEN）以进入管理面板：
    </p>

    <form onsubmit="handleTokenSubmit(event)">
      <div class="form-group">
        <label class="form-label" for="manualToken">访问凭据 Token</label>
        <div class="input-row">
          <input type="password" id="manualToken" placeholder="输入 ADMIN_TOKEN" required autofocus class="form-input">
          <button type="submit" class="btn btn-primary">
            验证并进入
          </button>
        </div>
      </div>
    </form>
  </div>

  <div id="chronicleToast" class="chronicle-toast"></div>

  <script>
    // Theme Management
    function initTheme() {
      const saved = localStorage.getItem('chronicle_theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        updateThemeBtn(saved);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeBtn('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeBtn('light');
      }
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('chronicle_theme', next);
      updateThemeBtn(next);
    }

    function updateThemeBtn(theme) {
      const btn = document.getElementById('themeBtn');
      if (btn) btn.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }

    initTheme();

    function showToast(msg) {
      const toast = document.getElementById('chronicleToast');
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
    }

    function handleTokenSubmit(e) {
      e.preventDefault();
      const token = document.getElementById('manualToken').value.trim();
      if (!token) {
        showToast('请输入有效的 Token');
        return;
      }
      localStorage.setItem('ADMIN_TOKEN', token);
      document.cookie = 'ADMIN_TOKEN=' + encodeURIComponent(token) + '; path=/; max-age=2592000; SameSite=Lax';
      showToast('口令已保存，正在验证...');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }

    // Auto login check if already cached in localStorage
    const cached = localStorage.getItem('ADMIN_TOKEN');
    if (cached && !document.cookie.includes('ADMIN_TOKEN=')) {
      document.cookie = 'ADMIN_TOKEN=' + encodeURIComponent(cached) + '; path=/; max-age=2592000; SameSite=Lax';
      window.location.reload();
    }
  </script>
</body>
</html>`;
}
