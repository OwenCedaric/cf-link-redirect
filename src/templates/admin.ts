export function renderAdminHtml(siteName: string = 'Link Redirect Gateway'): string {
  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>控制台 · ${siteName}</title>
  
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
      --nav-bg: rgba(251, 249, 246, 0.88);
      --modal-backdrop: rgba(22, 24, 29, 0.45);

      --font-body: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: "Noto Serif SC", "Songti SC", "Source Han Serif SC", SimSun, Georgia, serif;
      --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

      --reading-max-width: 960px;
      --safe-padding-x: 24px;
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
        --nav-bg: rgba(18, 20, 24, 0.88);
        --modal-backdrop: rgba(0, 0, 0, 0.65);
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
      --nav-bg: rgba(18, 20, 24, 0.88);
      --modal-backdrop: rgba(0, 0, 0, 0.65);
    }

    :root[data-theme="light"] {
      --base-surface: #fbf9f6;
      --primary-ink: #16181d;
      --secondary-ink: #464e5f;
      --sole-accent: #537791;
      --subtle-border: rgba(22, 24, 29, 0.14);
      --subtle-fill: rgba(22, 24, 29, 0.04);
      --stroke-tint: rgba(22, 24, 29, 0.55);
      --nav-bg: rgba(251, 249, 246, 0.88);
      --modal-backdrop: rgba(22, 24, 29, 0.45);
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
      color: var(--primary-ink);
      line-height: 1.6;
    }

    ::selection {
      background-color: var(--sole-accent);
      color: var(--base-surface);
    }

    /* Chronicle Container & Layout */
    .chronicle-layout {
      max-width: var(--reading-max-width);
      margin: 0 auto;
      padding: 48px var(--safe-padding-x) 96px;
    }

    @media (max-width: 640px) {
      .chronicle-layout {
        padding: 24px 16px 64px;
      }
    }

    /* Header & Pressmark */
    .chronicle-header {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--subtle-border);
    }

    @media (min-width: 640px) {
      .chronicle-header {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .pressmark-icon {
      width: 38px;
      height: 38px;
      border: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-serif);
      font-size: 17px;
      color: var(--primary-ink);
    }

    .brand-title {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 22px;
      letter-spacing: 0.04em;
      color: var(--primary-ink);
      line-height: 1.2;
    }

    .brand-desc {
      font-size: 12px;
      color: var(--secondary-ink);
      margin-top: 4px;
      letter-spacing: 0.02em;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 400;
      padding: 7px 14px;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease-in-out;
      white-space: nowrap;
    }

    .btn-secondary {
      background: transparent;
      color: var(--primary-ink);
      border: 1px solid var(--subtle-border);
    }

    .btn-secondary:hover {
      border-color: var(--sole-accent);
      background-color: var(--subtle-fill);
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

    /* Metrics Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin: 28px 0;
    }

    @media (min-width: 640px) {
      .metrics-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .metric-card {
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      border-radius: 4px;
      padding: 20px 22px;
      transition: border-color 0.2s;
    }

    .metric-card:hover {
      border-color: var(--stroke-tint);
    }

    .metric-label {
      font-size: 12px;
      color: var(--secondary-ink);
      letter-spacing: 0.04em;
    }

    .metric-value {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 700;
      color: var(--primary-ink);
      margin-top: 8px;
      line-height: 1.1;
    }

    .metric-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--secondary-ink);
      background: var(--subtle-fill);
      padding: 3px 8px;
      border-radius: 3px;
      border: 1px solid var(--subtle-border);
    }

    .metric-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--sole-accent);
    }

    /* Data Table Section */
    .table-section {
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      border-radius: 4px;
      overflow: hidden;
    }

    .table-toolbar {
      padding: 14px 20px;
      border-bottom: 1px solid var(--subtle-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .table-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-ink);
    }

    .table-scroll {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }

    thead th {
      font-family: var(--font-serif);
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.04em;
      color: var(--secondary-ink);
      background-color: var(--subtle-fill);
      padding: 12px 18px;
      border-bottom: 1px solid var(--subtle-border);
    }

    tbody td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--subtle-border);
      color: var(--primary-ink);
      vertical-align: middle;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover {
      background-color: var(--subtle-fill);
    }

    .slug-cell {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-weight: 500;
    }

    .slug-link {
      color: var(--primary-ink);
      text-decoration: underline;
      text-decoration-color: var(--subtle-border);
      text-underline-offset: 3px;
      transition: all 0.15s;
    }

    .slug-link:hover {
      color: var(--sole-accent);
      text-decoration-color: var(--sole-accent);
    }

    .copy-btn {
      background: none;
      border: none;
      color: var(--secondary-ink);
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 2px;
      font-size: 12px;
      transition: color 0.15s;
    }

    .copy-btn:hover {
      color: var(--primary-ink);
    }

    .url-cell {
      max-width: 280px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--secondary-ink);
    }

    .url-cell a {
      color: var(--secondary-ink);
      text-decoration: none;
      transition: color 0.15s;
    }

    .url-cell a:hover {
      color: var(--sole-accent);
    }

    .clicks-cell {
      font-family: var(--font-serif);
      font-weight: 600;
      text-align: center;
      color: var(--primary-ink);
    }

    .status-badge {
      display: inline-block;
      font-family: var(--font-serif);
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 3px;
      border: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
      color: var(--primary-ink);
    }

    .status-badge.disabled {
      opacity: 0.45;
      color: var(--secondary-ink);
    }

    .actions-cell {
      text-align: right;
      white-space: nowrap;
    }

    .table-action-btn {
      background: none;
      border: none;
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--secondary-ink);
      cursor: pointer;
      margin-left: 10px;
      transition: color 0.15s;
    }

    .table-action-btn:hover {
      color: var(--primary-ink);
    }

    .table-action-btn.delete:hover {
      color: #b91c1c;
    }

    /* Modal Form */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background-color: var(--modal-backdrop);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 1000;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-card {
      background-color: var(--base-surface);
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      width: 100%;
      max-width: 540px;
      padding: 28px;
      position: relative;
      animation: modalFadeIn 0.2s ease-out;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--subtle-border);
      margin-bottom: 20px;
    }

    .modal-title {
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-ink);
    }

    .modal-close-btn {
      background: none;
      border: none;
      color: var(--secondary-ink);
      cursor: pointer;
      font-size: 16px;
      transition: color 0.15s;
    }

    .modal-close-btn:hover {
      color: var(--primary-ink);
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

    .form-input-row {
      display: flex;
    }

    .form-prefix {
      background-color: var(--subtle-fill);
      border: 1px solid var(--subtle-border);
      border-right: none;
      border-radius: 4px 0 0 4px;
      padding: 8px 12px;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--secondary-ink);
    }

    .form-input {
      width: 100%;
      background-color: var(--base-surface);
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: var(--font-body);
      color: var(--primary-ink);
      transition: border-color 0.2s;
    }

    .form-input.has-prefix {
      border-radius: 0 4px 4px 0;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--sole-accent);
    }

    .form-input.font-mono {
      font-family: var(--font-mono);
    }

    .form-hint {
      font-size: 11px;
      color: var(--secondary-ink);
      margin-top: 5px;
      line-height: 1.5;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    @media (min-width: 500px) {
      .form-grid-2 {
        grid-template-columns: 1fr 1fr;
      }
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }

    .checkbox-wrap input[type="checkbox"] {
      accent-color: var(--sole-accent);
      cursor: pointer;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 24px;
      padding-top: 18px;
      border-top: 1px solid var(--subtle-border);
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
  <div class="chronicle-layout">
    <!-- Header -->
    <header class="chronicle-header">
      <div class="brand-wrap">
        <div class="pressmark-icon">§</div>
        <div>
          <h1 class="brand-title">${siteName}</h1>
          <p class="brand-desc">边缘路由 · 短链重定向 · 访问数据洞察</p>
        </div>
      </div>
      <div class="header-actions">
        <button class="theme-toggle-btn" id="themeBtn" onclick="toggleTheme()" title="切换主题">Theme</button>
        <button onclick="openModal()" class="btn btn-primary">
          <i class="fa-solid fa-plus"></i> 新建短链
        </button>
      </div>
    </header>

    <!-- Metrics Cards -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">已配置短链数 / SHORT LINKS</div>
        <div class="metric-value" id="metricTotalLinks">-</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">累计跳转点击 / CLICKS</div>
        <div class="metric-value" id="metricTotalClicks">-</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">鉴权模式 / AUTHENTICATION</div>
        <div class="metric-badge">
          <span class="metric-dot"></span> Bearer Authorization
        </div>
      </div>
    </div>

    <!-- Links Table Section -->
    <div class="table-section">
      <div class="table-toolbar">
        <h2 class="table-title">已配置短链列表</h2>
        <button onclick="loadLinks()" class="btn btn-secondary" style="padding: 4px 10px; font-size: 12px;">
          <i class="fa-solid fa-arrows-rotate"></i> 刷新列表
        </button>
      </div>

      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>短链路径 (Slug)</th>
              <th>目标地址 (Target URL)</th>
              <th>卡片标题 / 描述</th>
              <th style="text-align: center;">累计访问</th>
              <th style="text-align: center;">状态</th>
              <th style="text-align: right;">操作</th>
            </tr>
          </thead>
          <tbody id="linksTableBody">
            <tr>
              <td colspan="6" style="text-align: center; padding: 36px; color: var(--secondary-ink);">
                正在加载短链数据...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Create/Edit Modal -->
  <div id="linkModal" class="modal-overlay" onclick="handleOverlayClick(event)">
    <div class="modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h3 class="modal-title" id="modalTitle">新建短链重定向</h3>
        <button onclick="closeModal()" class="modal-close-btn" title="关闭">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form id="linkForm" onsubmit="handleFormSubmit(event)">
        <div class="form-group">
          <label class="form-label">短链路径 (Slug)</label>
          <div class="form-input-row">
            <span class="form-prefix">/</span>
            <input type="text" id="formSlug" required placeholder="如 yt, x, blog" class="form-input has-prefix font-mono">
          </div>
          <p class="form-hint">
            输入自定义短链路径，例如输入 <code>yt</code>，访问者访问 <code>${siteName}/yt</code> 时将自动跳转。
          </p>
        </div>

        <div class="form-group">
          <label class="form-label">目标地址 (Target URL)</label>
          <input type="url" id="formUrl" required placeholder="https://example.com/target" class="form-input font-mono">
          <p class="form-hint">
            重定向的目标网址（需以 http:// 或 https:// 开头），支持自动合并并透传访问者的 UTM 营销参数。
          </p>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">社交预览标题 (可选)</label>
            <input type="text" id="formTitle" placeholder="如：我的官方频道" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">社交卡片配图 (可选)</label>
            <input type="url" id="formOgImage" placeholder="https://.../preview.jpg" class="form-input font-mono">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">社交卡片描述 (可选)</label>
          <textarea id="formDescription" rows="2" placeholder="展示在社交平台抓取预览中的简短说明" class="form-input" style="resize: vertical;"></textarea>
        </div>

        <div class="form-group checkbox-wrap">
          <input type="checkbox" id="formEnabled" checked>
          <label for="formEnabled" class="form-label" style="margin-bottom: 0; cursor: pointer;">启用此短链跳转</label>
        </div>

        <div class="modal-footer">
          <button type="button" onclick="closeModal()" class="btn btn-secondary">取消</button>
          <button type="submit" class="btn btn-primary" id="submitBtn">保存短链</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Toast Element -->
  <div id="chronicleToast" class="chronicle-toast"></div>

  <script>
    let links = [];

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

    // Toast Notice
    function showToast(msg) {
      const toast = document.getElementById('chronicleToast');
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.remove('show'), 2400);
    }

    function getAuthHeaders() {
      const headers = { 'Content-Type': 'application/json' };
      const localToken = localStorage.getItem('ADMIN_TOKEN');
      if (localToken) {
        headers['Authorization'] = 'Bearer ' + localToken;
      }
      return headers;
    }

    async function loadLinks() {
      try {
        const res = await fetch('/api/links', { headers: getAuthHeaders() });
        if (res.status === 401) {
          window.location.reload();
          return;
        }
        const data = await res.json();
        links = data.links || [];
        renderTable();
        updateMetrics(data);
      } catch (err) {
        console.error('Failed to load links:', err);
        showToast('加载失败，请检查网络或口令');
      }
    }

    function updateMetrics(data) {
      document.getElementById('metricTotalLinks').innerText = links.length;
      const totalClicks = links.reduce((sum, item) => sum + (item.clicks || 0), 0);
      document.getElementById('metricTotalClicks').innerText = totalClicks;
    }

    function renderTable() {
      const tbody = document.getElementById('linksTableBody');
      if (!links.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 36px; color: var(--secondary-ink);">暂无短链记录，点击右上角新建</td></tr>';
        return;
      }

      tbody.innerHTML = links.map(link => {
        const displayPath = '/' + link.slug;
        const fullUrl = window.location.origin + '/' + link.slug;
        const encodedTarget = encodeURI(link.url);

        return \`
          <tr>
            <td>
              <div class="slug-cell">
                <a href="\${displayPath}" target="_blank" class="slug-link">\${displayPath}</a>
                <button onclick="copyToClipboard('\${fullUrl}')" title="复制完整短链地址" class="copy-btn">
                  <i class="fa-regular fa-copy"></i>
                </button>
              </div>
            </td>
            <td>
              <div class="url-cell">
                <a href="\${encodedTarget}" target="_blank" title="\${link.url}">
                  \${link.url}
                </a>
              </div>
            </td>
            <td style="color: var(--secondary-ink); font-size: 12px; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              \${link.title || '<span style="opacity: 0.35;">-</span>'}
            </td>
            <td class="clicks-cell">
              \${link.clicks || 0}
            </td>
            <td style="text-align: center;">
              \${link.enabled 
                ? '<span class="status-badge">生效中</span>' 
                : '<span class="status-badge disabled">已禁用</span>'
              }
            </td>
            <td class="actions-cell">
              <button onclick="editLink('\${link.slug}')" class="table-action-btn">编辑</button>
              <button onclick="deleteLink('\${link.slug}')" class="table-action-btn delete">删除</button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function openModal(slug) {
      const modal = document.getElementById('linkModal');
      modal.classList.add('active');
      document.getElementById('modalTitle').innerText = '新建短链重定向';
      document.getElementById('linkForm').reset();
      document.getElementById('formSlug').value = '';
      document.getElementById('formSlug').disabled = false;
      document.getElementById('formEnabled').checked = true;
    }

    function closeModal() {
      const modal = document.getElementById('linkModal');
      modal.classList.remove('active');
    }

    function handleOverlayClick(e) {
      if (e.target.id === 'linkModal') {
        closeModal();
      }
    }

    function editLink(slug) {
      const item = links.find(l => l.slug === slug);
      if (!item) return;
      openModal();
      document.getElementById('modalTitle').innerText = '编辑短链 /' + item.slug;
      document.getElementById('formSlug').value = item.slug;
      document.getElementById('formSlug').disabled = true;
      document.getElementById('formUrl').value = item.url;
      document.getElementById('formTitle').value = item.title || '';
      document.getElementById('formDescription').value = item.description || '';
      document.getElementById('formOgImage').value = item.ogImage || '';
      document.getElementById('formEnabled').checked = item.enabled !== false;
    }

    async function handleFormSubmit(e) {
      e.preventDefault();
      let slug = document.getElementById('formSlug').value.trim();
      const url = document.getElementById('formUrl').value.trim();
      const title = document.getElementById('formTitle').value.trim();
      const description = document.getElementById('formDescription').value.trim();
      const ogImage = document.getElementById('formOgImage').value.trim();
      const enabled = document.getElementById('formEnabled').checked;

      if (slug.startsWith('/')) {
        slug = slug.slice(1);
      }
      if (!slug) {
        showToast('请填写短链路径');
        return;
      }

      const payload = { slug, url, title, description, ogImage, enabled };

      try {
        const res = await fetch('/api/links', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const err = await res.json();
          showToast('保存失败: ' + (err.error || res.statusText));
          return;
        }

        closeModal();
        showToast('保存成功');
        loadLinks();
      } catch (err) {
        showToast('提交出错: ' + err.message);
      }
    }

    async function deleteLink(slug) {
      if (!confirm('确定删除短链 /' + slug + ' 吗？')) return;

      try {
        const res = await fetch('/api/links/' + encodeURIComponent(slug), {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        if (res.ok) {
          showToast('已删除 /' + slug);
          loadLinks();
        } else {
          showToast('删除失败');
        }
      } catch (err) {
        showToast('删除出错: ' + err.message);
      }
    }

    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('已复制: ' + text);
      }).catch(() => {
        showToast('复制失败，请手动选择复制');
      });
    }

    // Auto initialize
    loadLinks();
  </script>
</body>
</html>`;
}
