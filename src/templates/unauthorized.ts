export function renderUnauthorizedHtml(domain: string, siteName: string = 'Link Gateway'): string {
  const surgeModuleUrl = `https://${domain}/auth.sgmodule`;
  const surgeInstallScheme = `surge:///install-config?url=${encodeURIComponent(surgeModuleUrl)}`;

  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>管理员认证 · ${siteName}</title>
  
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/favicon.ico">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css">
  
  <style>
    /* Chronicle Design System - Core Tokens */
    :root {
      color-scheme: light;
      --base-surface: #fbf9f6;
      --primary-ink: #16181d;
      --secondary-ink: #464e5f;
      --sole-accent: #537791;
      --subtle-border: rgba(22, 24, 29, 0.14);
      --subtle-fill: rgba(22, 24, 29, 0.04);
      --stroke-tint: rgba(22, 24, 29, 0.55);

      --color-success: #15803d;
      --color-success-bg: rgba(21, 128, 61, 0.08);
      --color-success-border: rgba(21, 128, 61, 0.3);

      --font-body: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: "Noto Serif SC", "Songti SC", "Source Han Serif SC", SimSun, Georgia, serif;
      --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

      --reading-max-width: 520px;
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

        --color-success: #4ade80;
        --color-success-bg: rgba(74, 222, 128, 0.12);
        --color-success-border: rgba(74, 222, 128, 0.35);
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

      --color-success: #4ade80;
      --color-success-bg: rgba(74, 222, 128, 0.12);
      --color-success-border: rgba(74, 222, 128, 0.35);
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

      --color-success: #15803d;
      --color-success-bg: rgba(21, 128, 61, 0.08);
      --color-success-border: rgba(21, 128, 61, 0.3);
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
      width: 34px;
      height: 34px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: var(--secondary-ink);
      cursor: pointer;
      transition: all 0.2s;
    }

    .theme-toggle-btn:hover {
      border-color: var(--sole-accent);
      color: var(--primary-ink);
      background-color: var(--subtle-fill);
    }

    .auth-card {
      width: 100%;
      max-width: var(--reading-max-width);
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      background-color: var(--base-surface);
      padding: 40px 36px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }

    .pressmark-icon {
      font-family: var(--font-serif);
      font-size: 32px;
      line-height: 1;
      color: var(--sole-accent);
      margin-bottom: 20px;
      user-select: none;
    }

    .title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--primary-ink);
      margin-bottom: 8px;
    }

    .description {
      font-size: 13.5px;
      color: var(--secondary-ink);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .surge-notice {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: var(--subtle-fill);
      border: 1px solid var(--subtle-border);
      padding: 12px 14px;
      border-radius: 4px;
      font-size: 12.5px;
      color: var(--primary-ink);
      margin-bottom: 24px;
      transition: all 0.3s ease;
    }

    .surge-notice.success {
      border-color: var(--color-success-border);
      background-color: var(--color-success-bg);
      color: var(--color-success);
    }

    .pulse-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--sole-accent);
      animation: pulseAnim 1.8s infinite;
      flex-shrink: 0;
    }

    .surge-notice.success .pulse-indicator {
      background-color: var(--color-success);
      animation: none;
    }

    @keyframes pulseAnim {
      0% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 var(--stroke-tint); }
      70% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 0 6px transparent; }
      100% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 0 0 transparent; }
    }

    .surge-box {
      border: 1px dashed var(--stroke-tint);
      border-radius: 4px;
      padding: 18px 20px;
      background-color: var(--subtle-fill);
      margin-bottom: 24px;
    }

    .surge-box-title {
      font-family: var(--font-serif);
      font-size: 14.5px;
      font-weight: 600;
      color: var(--primary-ink);
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .surge-box-desc {
      font-size: 12.5px;
      color: var(--secondary-ink);
      line-height: 1.5;
      margin-bottom: 14px;
    }

    .surge-btn-group {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .divider {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 28px 0 20px 0;
      color: var(--secondary-ink);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .divider::before, .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid var(--subtle-border);
    }

    .divider span {
      padding: 0 12px;
      opacity: 0.8;
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
      font-size: 12.5px;
      padding: 8px 14px;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      white-space: nowrap;
    }

    .btn-secondary {
      background-color: var(--base-surface);
      color: var(--primary-ink);
      border: 1px solid var(--subtle-border);
    }

    .btn-secondary:hover {
      border-color: var(--sole-accent);
      color: var(--sole-accent);
    }

    .btn-primary {
      background-color: var(--primary-ink);
      color: var(--base-surface);
      border: 1px solid var(--primary-ink);
      font-weight: 500;
    }

    .btn-primary:hover {
      opacity: 0.88;
    }

    .chronicle-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
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
    <button class="theme-toggle-btn" id="themeBtn" onclick="toggleTheme()" title="切换主题">
      <i class="ri-moon-line"></i>
    </button>
  </div>

  <div class="auth-card">
    <div class="pressmark-icon">§</div>
    <h1 class="title">管理员认证</h1>
    <p class="description">
      当前控制台仅限管理员访问。通过 Surge 注入鉴权 Header 可<strong>直接免密进入</strong>，或手动输入口令验证。
    </p>

    <!-- Surge 自动监听状态指示条 -->
    <div id="surgeNotice" class="surge-notice">
      <span class="pulse-indicator"></span>
      <span id="surgeNoticeText">正在监听 Surge 鉴权注入，检测到注入后将自动进入...</span>
    </div>

    <!-- Surge 模块导入卡片 -->
    <div class="surge-box">
      <div class="surge-box-title">
        <i class="ri-flashlight-line" style="color: var(--sole-accent);"></i>
        Surge 无感直入配置
      </div>
      <p class="surge-box-desc">
        在 Surge 中导入当前域名模块并填入 <code>ADMIN_TOKEN</code>，请求时将自动注入 Header，无需手动输入即可秒级直入控制台。
      </p>
      <div class="surge-btn-group">
        <a href="${surgeInstallScheme}" class="btn btn-secondary" title="点击直接调起 Surge 安装模块">
          <i class="ri-download-cloud-2-line"></i> 一键导入 Surge 模块
        </a>
        <a href="/auth.sgmodule" download class="btn btn-secondary" title="下载 .sgmodule 配置文件">
          <i class="ri-file-code-line"></i> 下载模块文件
        </a>
      </div>
    </div>

    <div class="divider">
      <span>或 手动输入验证</span>
    </div>

    <form onsubmit="handleTokenSubmit(event)">
      <div class="form-group">
        <label class="form-label" for="manualToken">访问凭据 Token</label>
        <div class="input-row">
          <input type="password" id="manualToken" placeholder="输入 ADMIN_TOKEN" required autofocus class="form-input">
          <button type="submit" class="btn btn-primary">
            <i class="ri-login-box-line"></i> 验证并进入
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
      if (btn) {
        btn.innerHTML = theme === 'dark' ? '<i class="ri-sun-line"></i>' : '<i class="ri-moon-line"></i>';
      }
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
        window.location.href = '/admin';
      }, 300);
    }

    // Auto login check if already cached in localStorage
    const cached = localStorage.getItem('ADMIN_TOKEN');
    if (cached && !document.cookie.includes('ADMIN_TOKEN=')) {
      document.cookie = 'ADMIN_TOKEN=' + encodeURIComponent(cached) + '; path=/; max-age=2592000; SameSite=Lax';
      window.location.href = '/admin';
    }

    // Active Surge Auto-Detection Probe
    let hasAuthed = false;

    async function checkSurgeAuth() {
      if (hasAuthed) return;
      try {
        const res = await fetch('/api/auth/check', {
          method: 'GET',
          cache: 'no-store'
        });
        if (res.ok) {
          hasAuthed = true;
          const notice = document.getElementById('surgeNotice');
          const noticeText = document.getElementById('surgeNoticeText');
          if (notice) notice.classList.add('success');
          if (noticeText) noticeText.textContent = 'Surge 鉴权注入成功！正在直接进入管理控制台...';
          showToast('Surge 注入鉴权成功，正在直接进入...');
          setTimeout(() => {
            window.location.href = '/admin';
          }, 350);
          return true;
        }
      } catch (e) {
        // Network or still unauthed
      }
      return false;
    }

    // Immediately test on load
    checkSurgeAuth();

    // Re-check when window regains focus or visibility (e.g. user toggled Surge or imported module)
    window.addEventListener('focus', checkSurgeAuth);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) checkSurgeAuth();
    });

    // Background interval check
    const pollInterval = setInterval(() => {
      if (hasAuthed) {
        clearInterval(pollInterval);
        return;
      }
      checkSurgeAuth();
    }, 1500);

    // Stop polling after 60 seconds to save power
    setTimeout(() => clearInterval(pollInterval), 60000);
  </script>
</body>
</html>`;
}
