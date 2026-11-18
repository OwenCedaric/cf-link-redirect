export function renderAdminHtml(siteName: string = 'Link Redirect Gateway', token?: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>控制台 · ${siteName}</title>
  
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
      --sole-accent-contrast: #ffffff;
      --subtle-border: rgba(22, 24, 29, 0.14);
      --subtle-fill: rgba(22, 24, 29, 0.04);
      --stroke-tint: rgba(22, 24, 29, 0.55);
      --nav-bg: rgba(251, 249, 246, 0.88);
      --modal-backdrop: rgba(22, 24, 29, 0.45);
      --track-bg: rgba(22, 24, 29, 0.08);

      --color-danger: #b91c1c;
      --color-danger-bg: rgba(185, 28, 28, 0.08);
      --color-danger-border: rgba(185, 28, 28, 0.3);
      --color-warning: #b45309;
      --color-warning-bg: rgba(180, 83, 9, 0.08);
      --color-warning-border: rgba(180, 83, 9, 0.3);
      --color-success: #15803d;
      --color-success-bg: rgba(21, 128, 61, 0.08);
      --color-success-border: rgba(21, 128, 61, 0.3);

      --brand-telegram: #0284c7;
      --brand-linkedin: #0a66c2;
      --brand-zhihu: #0284c7;
      --brand-facebook: #1877f2;
      --brand-discord: #5865f2;

      --font-body: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, BlinkMacSystemFont, sans-serif;
      --font-serif: "Noto Serif SC", "Songti SC", "Source Han Serif SC", SimSun, Georgia, serif;
      --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;

      --reading-max-width: 1040px;
      --safe-padding-x: 24px;
    }

    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        color-scheme: dark;
        --base-surface: #121418;
        --primary-ink: #e8ecf1;
        --secondary-ink: #a3abb8;
        --sole-accent: #9cb4cd;
        --sole-accent-contrast: #121418;
        --subtle-border: rgba(232, 236, 241, 0.16);
        --subtle-fill: rgba(232, 236, 241, 0.05);
        --stroke-tint: rgba(232, 236, 241, 0.55);
        --nav-bg: rgba(18, 20, 24, 0.88);
        --modal-backdrop: rgba(0, 0, 0, 0.65);
        --track-bg: rgba(232, 236, 241, 0.14);

        --color-danger: #f87171;
        --color-danger-bg: rgba(248, 113, 113, 0.12);
        --color-danger-border: rgba(248, 113, 113, 0.35);
        --color-warning: #fbbf24;
        --color-warning-bg: rgba(251, 191, 36, 0.12);
        --color-warning-border: rgba(251, 191, 36, 0.35);
        --color-success: #4ade80;
        --color-success-bg: rgba(74, 222, 128, 0.12);
        --color-success-border: rgba(74, 222, 128, 0.35);

        --brand-telegram: #38bdf8;
        --brand-linkedin: #60a5fa;
        --brand-zhihu: #38bdf8;
        --brand-facebook: #60a5fa;
        --brand-discord: #818cf8;
      }
    }

    :root[data-theme="dark"] {
      color-scheme: dark;
      --base-surface: #121418;
      --primary-ink: #e8ecf1;
      --secondary-ink: #a3abb8;
      --sole-accent: #9cb4cd;
      --sole-accent-contrast: #121418;
      --subtle-border: rgba(232, 236, 241, 0.16);
      --subtle-fill: rgba(232, 236, 241, 0.05);
      --stroke-tint: rgba(232, 236, 241, 0.55);
      --nav-bg: rgba(18, 20, 24, 0.88);
      --modal-backdrop: rgba(0, 0, 0, 0.65);
      --track-bg: rgba(232, 236, 241, 0.14);

      --color-danger: #f87171;
      --color-danger-bg: rgba(248, 113, 113, 0.12);
      --color-danger-border: rgba(248, 113, 113, 0.35);
      --color-warning: #fbbf24;
      --color-warning-bg: rgba(251, 191, 36, 0.12);
      --color-warning-border: rgba(251, 191, 36, 0.35);
      --color-success: #4ade80;
      --color-success-bg: rgba(74, 222, 128, 0.12);
      --color-success-border: rgba(74, 222, 128, 0.35);

      --brand-telegram: #38bdf8;
      --brand-linkedin: #60a5fa;
      --brand-zhihu: #38bdf8;
      --brand-facebook: #60a5fa;
      --brand-discord: #818cf8;
    }

    :root[data-theme="light"] {
      color-scheme: light;
      --base-surface: #fbf9f6;
      --primary-ink: #16181d;
      --secondary-ink: #464e5f;
      --sole-accent: #537791;
      --sole-accent-contrast: #ffffff;
      --subtle-border: rgba(22, 24, 29, 0.14);
      --subtle-fill: rgba(22, 24, 29, 0.04);
      --stroke-tint: rgba(22, 24, 29, 0.55);
      --nav-bg: rgba(251, 249, 246, 0.88);
      --modal-backdrop: rgba(22, 24, 29, 0.45);
      --track-bg: rgba(22, 24, 29, 0.08);

      --color-danger: #b91c1c;
      --color-danger-bg: rgba(185, 28, 28, 0.08);
      --color-danger-border: rgba(185, 28, 28, 0.3);
      --color-warning: #b45309;
      --color-warning-bg: rgba(180, 83, 9, 0.08);
      --color-warning-border: rgba(180, 83, 9, 0.3);
      --color-success: #15803d;
      --color-success-bg: rgba(21, 128, 61, 0.08);
      --color-success-border: rgba(21, 128, 61, 0.3);

      --brand-telegram: #0284c7;
      --brand-linkedin: #0a66c2;
      --brand-zhihu: #0284c7;
      --brand-facebook: #1877f2;
      --brand-discord: #5865f2;
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
      align-items: center;
      padding: 0 0 80px 0;
      line-height: 1.6;
    }

    ::selection {
      background-color: var(--sole-accent);
      color: var(--base-surface);
    }

    .font-mono {
      font-family: var(--font-mono);
    }

    /* Remix Icon spin animation */
    @keyframes riSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .ri-spin {
      animation: riSpin 1s linear infinite;
      display: inline-block;
    }

    /* Layout & Header */
    .chronicle-layout {
      width: 100%;
      max-width: var(--reading-max-width);
      padding: 40px var(--safe-padding-x) 0 var(--safe-padding-x);
    }

    .chronicle-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--subtle-border);
      margin-bottom: 32px;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .pressmark-icon {
      font-family: var(--font-serif);
      font-size: 28px;
      line-height: 1;
      color: var(--sole-accent);
      user-select: none;
    }

    .brand-title {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--primary-ink);
      line-height: 1.2;
    }

    .brand-desc {
      font-size: 13px;
      color: var(--secondary-ink);
      margin-top: 2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
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
      transition: all 0.15s ease;
    }

    .theme-toggle-btn:hover {
      color: var(--primary-ink);
      border-color: var(--stroke-tint);
      background-color: var(--subtle-fill);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 500;
      padding: 7px 16px;
      border-radius: 3px;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
    }

    .btn-primary {
      background-color: var(--primary-ink);
      color: var(--base-surface);
      border-color: var(--primary-ink);
    }

    .btn-primary:hover {
      opacity: 0.88;
    }

    .btn-secondary {
      background-color: var(--base-surface);
      color: var(--primary-ink);
      border-color: var(--subtle-border);
    }

    .btn-secondary:hover {
      border-color: var(--stroke-tint);
      background-color: var(--subtle-fill);
    }

    /* Metric Cards */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .metric-card {
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      padding: 18px 20px;
      border-radius: 4px;
    }

    .metric-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .metric-label {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-ink);
    }

    .metric-icon {
      font-size: 18px;
      color: var(--sole-accent);
      opacity: 0.75;
    }

    .metric-value {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 700;
      color: var(--primary-ink);
      line-height: 1.1;
    }

    .metric-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--sole-accent);
      margin-top: 4px;
    }

    .metric-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #22c55e;
    }

    /* Standalone Analytics Card */
    .analytics-card {
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      background-color: var(--base-surface);
      margin-bottom: 32px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
    }

    .analytics-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
      flex-wrap: wrap;
      gap: 12px;
    }

    .analytics-header-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .analytics-card-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-ink);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .analytics-card-subtitle {
      font-size: 12px;
      color: var(--secondary-ink);
    }

    .analytics-tab-group {
      display: inline-flex;
      background-color: var(--base-surface);
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      padding: 2px;
      gap: 2px;
    }

    .analytics-tab {
      background: none;
      border: none;
      font-family: var(--font-body);
      font-size: 12px;
      color: var(--secondary-ink);
      padding: 5px 12px;
      border-radius: 3px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .analytics-tab:hover {
      color: var(--primary-ink);
    }

    .analytics-tab.active {
      background-color: var(--sole-accent);
      color: var(--sole-accent-contrast);
      font-weight: 500;
    }

    .analytics-card-body {
      padding: 20px;
    }

    .analytics-grid-3 {
      display: grid;
      grid-template-columns: 1.15fr 1fr 1fr;
      gap: 24px;
    }

    @media (max-width: 860px) {
      .analytics-grid-3 {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    .analytics-subcard {
      display: flex;
      flex-direction: column;
    }

    .analytics-subcard-title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--primary-ink);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding-bottom: 6px;
      border-bottom: 1px solid var(--subtle-border);
    }

    .analytics-empty-state {
      text-align: center;
      padding: 32px 20px;
      color: var(--secondary-ink);
    }

    .analytics-empty-icon {
      font-size: 32px;
      color: var(--sole-accent);
      opacity: 0.7;
      margin-bottom: 8px;
    }

    .analytics-empty-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-ink);
      margin-bottom: 4px;
    }

    .analytics-empty-desc {
      font-size: 12.5px;
      max-width: 440px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* Table Section */
    .table-section {
      border: 1px solid var(--subtle-border);
      border-radius: 4px;
      background-color: var(--base-surface);
      overflow: hidden;
    }

    .table-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
    }

    .table-title {
      font-family: var(--font-serif);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-ink);
    }

    .table-scroll {
      overflow-x: auto;
      width: 100%;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }

    th {
      font-weight: 500;
      color: var(--secondary-ink);
      padding: 12px 18px;
      border-bottom: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
      white-space: nowrap;
      font-size: 12px;
    }

    td {
      padding: 14px 18px;
      border-bottom: 1px solid var(--subtle-border);
      color: var(--primary-ink);
      vertical-align: middle;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background-color: var(--subtle-fill);
    }

    .slug-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .slug-link {
      font-family: var(--font-mono);
      font-weight: 500;
      color: var(--sole-accent);
      text-decoration: none;
      word-break: break-all;
    }

    .slug-link:hover {
      text-decoration: underline;
    }

    .copy-btn {
      background: none;
      border: none;
      color: var(--secondary-ink);
      cursor: pointer;
      padding: 2px 4px;
      font-size: 13px;
      border-radius: 3px;
      transition: all 0.15s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .copy-btn:hover {
      color: var(--primary-ink);
      background-color: var(--subtle-fill);
    }

    .url-cell {
      max-width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .url-cell a {
      color: var(--secondary-ink);
      text-decoration: none;
      transition: color 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .url-cell a:hover {
      color: var(--sole-accent);
    }

    .clicks-cell {
      text-align: center;
    }

    .clicks-btn {
      background: none;
      border: 1px solid transparent;
      font-family: var(--font-serif);
      font-weight: 600;
      color: var(--sole-accent);
      cursor: pointer;
      padding: 3px 8px;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }

    .clicks-btn:hover {
      background-color: var(--subtle-fill);
      border-color: var(--subtle-border);
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
      white-space: nowrap;
    }

    .status-badge.expired {
      color: var(--color-danger);
      border-color: var(--color-danger-border);
      background-color: var(--color-danger-bg);
    }

    .status-badge.expiring {
      color: var(--color-warning);
      border-color: var(--color-warning-border);
      background-color: var(--color-warning-bg);
    }

    .status-badge.permanent {
      color: var(--sole-accent);
    }

    .status-badge.disabled {
      opacity: 0.65;
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
      margin-left: 8px;
      transition: color 0.15s;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }

    .table-action-btn:hover {
      color: var(--primary-ink);
    }

    .table-action-btn.delete:hover {
      color: var(--color-danger);
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
      max-width: 560px;
      padding: 28px;
      position: relative;
      animation: modalFadeIn 0.2s ease-out;
      max-height: 90vh;
      overflow-y: auto;
    }

    .stats-modal-card {
      max-width: 680px;
    }

    @keyframes modalFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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
      font-size: 18px;
      transition: color 0.15s;
      padding: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
      color: var(--primary-ink);
      margin-bottom: 6px;
    }

    .form-hint {
      font-size: 12px;
      color: var(--secondary-ink);
      margin-top: 5px;
      line-height: 1.4;
    }

    .form-input {
      width: 100%;
      padding: 8px 12px;
      font-family: var(--font-body);
      font-size: 13px;
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      color: var(--primary-ink);
      border-radius: 4px;
      outline: none;
      transition: border-color 0.15s;
    }

    .form-input:focus {
      border-color: var(--sole-accent);
    }

    .form-input-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .form-prefix {
      background-color: var(--subtle-fill);
      border: 1px solid var(--subtle-border);
      border-right: none;
      border-radius: 4px 0 0 4px;
      padding: 8px 12px;
      font-size: 13px;
      color: var(--secondary-ink);
      user-select: none;
      font-family: var(--font-mono);
    }

    .form-input.has-prefix {
      border-radius: 0 4px 4px 0;
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--subtle-border);
    }

    /* Expiry Presets Styling */
    .expiry-presets {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }

    .preset-btn {
      font-family: var(--font-body);
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 3px;
      border: 1px solid var(--subtle-border);
      background-color: var(--base-surface);
      color: var(--secondary-ink);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .preset-btn:hover {
      border-color: var(--sole-accent);
      color: var(--primary-ink);
    }

    .preset-btn.active {
      background-color: var(--sole-accent);
      color: var(--sole-accent-contrast);
      border-color: var(--sole-accent);
      font-weight: 500;
    }

    /* Stats Modal Specific Styling */
    .stats-modal-subtitle {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--sole-accent);
      margin-top: 2px;
    }

    .stats-overview-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }

    .stats-metric-card {
      border: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
      padding: 14px;
      border-radius: 4px;
      text-align: center;
    }

    .stats-metric-num {
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-ink);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .stats-metric-desc {
      font-size: 11px;
      color: var(--secondary-ink);
      margin-top: 2px;
    }

    .stats-section {
      margin-bottom: 24px;
    }

    .stats-section-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-ink);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stat-bars-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat-bar-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .stat-bar-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    .stat-name {
      color: var(--primary-ink);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .stat-name i {
      font-size: 15px;
    }

    .stat-count {
      color: var(--secondary-ink);
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .stat-bar-track {
      height: 6px;
      background-color: var(--track-bg);
      border-radius: 3px;
      overflow: hidden;
    }

    .stat-bar-fill {
      height: 100%;
      background-color: var(--sole-accent);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .stats-columns-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 3px;
      border: 1px solid var(--subtle-border);
      background-color: var(--subtle-fill);
    }

    .chip-label {
      color: var(--primary-ink);
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .chip-val {
      color: var(--secondary-ink);
      font-family: var(--font-mono);
      font-size: 11px;
    }

    .empty-stats-hint {
      font-size: 12px;
      color: var(--secondary-ink);
      padding: 12px 0;
      font-style: italic;
    }

    /* Toast */
    .chronicle-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background-color: var(--primary-ink);
      color: var(--base-surface);
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 13px;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s ease-out;
      z-index: 2000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: inline-flex;
      align-items: center;
      gap: 6px;
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
        <button class="theme-toggle-btn" id="themeBtn" onclick="toggleTheme()" title="切换明暗主题">
          <i class="ri-moon-line"></i>
        </button>
        <button onclick="openModal()" class="btn btn-primary">
          <i class="ri-add-line"></i> 新建短链
        </button>
      </div>
    </header>

    <!-- Metrics Cards -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-label">已配置短链数 / SHORT LINKS</div>
          <i class="ri-links-line metric-icon"></i>
        </div>
        <div class="metric-value" id="metricTotalLinks">-</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-label">累计跳转点击 / CLICKS</div>
          <i class="ri-cursor-line metric-icon"></i>
        </div>
        <div class="metric-value" id="metricTotalClicks">-</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-header">
          <div class="metric-label">鉴权模式 / AUTHENTICATION</div>
          <i class="ri-shield-keyhole-line metric-icon"></i>
        </div>
        <div class="metric-badge">
          <span class="metric-dot"></span> Bearer Authorization
        </div>
      </div>
    </div>

    <!-- Standalone Analytics & Traffic Sources Overview Card -->
    <div class="analytics-card" id="analyticsOverviewCard">
      <div class="analytics-card-header">
        <div class="analytics-header-left">
          <div class="analytics-card-title">
            <i class="ri-pie-chart-2-line" style="color: var(--sole-accent);"></i>
            访问来源与数据洞察
          </div>
          <div class="analytics-card-subtitle">
            全站短链多维流量分布与最近访问动态
          </div>
        </div>
        <div class="analytics-header-actions">
          <div class="analytics-tab-group">
            <button type="button" class="analytics-tab active" data-tab="overview" onclick="switchAnalyticsTab('overview')">
              <i class="ri-dashboard-line"></i> 来源与分布
            </button>
            <button type="button" class="analytics-tab" data-tab="activity" onclick="switchAnalyticsTab('activity')">
              <i class="ri-history-line"></i> 最近点击动态
            </button>
          </div>
        </div>
      </div>
      <div class="analytics-card-body" id="analyticsCardBody">
        <div class="analytics-empty-state">
          <div class="analytics-empty-icon"><i class="ri-loader-4-line ri-spin"></i></div>
          <div class="analytics-empty-title">正在汇总统计数据...</div>
        </div>
      </div>
    </div>

    <!-- Links Table Section -->
    <div class="table-section">
      <div class="table-toolbar">
        <h2 class="table-title">已配置短链列表</h2>
        <button onclick="loadLinks()" class="btn btn-secondary" style="padding: 4px 10px; font-size: 12px;">
          <i class="ri-refresh-line"></i> 刷新列表
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
              <th style="text-align: center;">状态与时效</th>
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
          <i class="ri-close-line"></i>
        </button>
      </div>

      <form id="linkForm" onsubmit="handleFormSubmit(event)">
        <div class="form-group">
          <label class="form-label">短链路径 (Slug)</label>
          <div class="form-input-row">
            <div style="display: flex; flex: 1;">
              <span class="form-prefix">/</span>
              <input type="text" id="formSlug" required placeholder="如 yt, x, blog" class="form-input has-prefix font-mono">
            </div>
            <button type="button" onclick="generateRandomSlugClient()" class="btn btn-secondary" style="padding: 0 12px; font-size: 12px; white-space: nowrap;" title="随机生成 6 位短链后缀">
              <i class="ri-dice-line"></i> 随机生成
            </button>
          </div>
          <p class="form-hint">
            支持自定义路径或点击“随机生成”获取临时后缀。访问者访问 <code>${siteName}/&lt;slug&gt;</code> 时自动跳转。
          </p>
        </div>

        <div class="form-group">
          <label class="form-label">目标地址 (Target URL)</label>
          <input type="url" id="formUrl" required placeholder="https://example.com/target" class="form-input font-mono">
          <p class="form-hint">
            重定向的目标网址（需以 http:// 或 https:// 开头），支持自动合并并透传访问者的 UTM 营销参数。
          </p>
        </div>

        <!-- Expiration / Scheduled Redirect -->
        <div class="form-group">
          <label class="form-label">有效期限 / 定期跳转 (可选)</label>
          <div class="expiry-presets">
            <button type="button" class="preset-btn active" data-preset="never" onclick="setExpirationPreset('never')">永久有效</button>
            <button type="button" class="preset-btn" data-preset="1h" onclick="setExpirationPreset('1h')">1 小时</button>
            <button type="button" class="preset-btn" data-preset="1d" onclick="setExpirationPreset('1d')">24 小时</button>
            <button type="button" class="preset-btn" data-preset="7d" onclick="setExpirationPreset('7d')">7 天</button>
            <button type="button" class="preset-btn" data-preset="30d" onclick="setExpirationPreset('30d')">30 天</button>
            <button type="button" class="preset-btn" data-preset="custom" onclick="setExpirationPreset('custom')">自定义时间</button>
          </div>
          <input type="datetime-local" id="formExpiresAt" class="form-input font-mono" style="display: none; margin-top: 8px;">
          <p class="form-hint" id="expiryHint">
            此短链将永久有效。到期后跳转将自动停用并返回 404 页面。
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
          <button type="submit" class="btn btn-primary" id="submitBtn">
            <i class="ri-check-line"></i> 保存短链
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Stats & Click Sources Modal -->
  <div id="statsModal" class="modal-overlay" onclick="handleStatsOverlayClick(event)">
    <div class="modal-card stats-modal-card" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div>
          <h3 class="modal-title" id="statsModalTitle">访问统计与来源分析</h3>
          <p class="stats-modal-subtitle" id="statsModalSubtitle">/slug</p>
        </div>
        <button onclick="closeStatsModal()" class="modal-close-btn" title="关闭">
          <i class="ri-close-line"></i>
        </button>
      </div>
      <div id="statsModalBody">
        <div style="text-align: center; padding: 36px; color: var(--secondary-ink);">
          正在加载统计...
        </div>
      </div>
    </div>
  </div>

  <!-- Toast Element -->
  <div id="chronicleToast" class="chronicle-toast"></div>

  <script>
    let links = [];
    let currentPreset = 'never';

    // Source Brand Logos via Remixicon
    function getSourceIcon(source) {
      if (!source) return '<i class="ri-global-line"></i>';
      const s = source.toLowerCase();
      if (s === 'direct') return '<i class="ri-compass-3-line" style="color: var(--sole-accent);" title="直接访问"></i>';
      if (s.startsWith('utm:') || s.startsWith('ref:') || s.startsWith('source:')) return '<i class="ri-price-tag-3-line" style="color: #8b5cf6;" title="营销参数"></i>';
      if (s.includes('twitter') || s.includes('t.co') || s === 'x.com' || s.includes('x.com')) return '<i class="ri-twitter-x-line" style="color: var(--primary-ink);" title="X (Twitter)"></i>';
      if (s.includes('youtube') || s.includes('youtu.be')) return '<i class="ri-youtube-fill" style="color: #ef4444;" title="YouTube"></i>';
      if (s.includes('wechat') || s.includes('weixin')) return '<i class="ri-wechat-fill" style="color: #10b981;" title="微信"></i>';
      if (s.includes('telegram') || s.includes('t.me')) return '<i class="ri-telegram-fill" style="color: var(--brand-telegram);" title="Telegram"></i>';
      if (s.includes('github')) return '<i class="ri-github-fill" style="color: var(--primary-ink);" title="GitHub"></i>';
      if (s.includes('bilibili')) return '<i class="ri-bilibili-fill" style="color: #06b6d4;" title="哔哩哔哩"></i>';
      if (s.includes('weibo') || s.includes('t.cn')) return '<i class="ri-weibo-fill" style="color: #f43f5e;" title="微博"></i>';
      if (s.includes('zhihu')) return '<i class="ri-zhihu-line" style="color: var(--brand-zhihu);" title="知乎"></i>';
      if (s.includes('google')) return '<i class="ri-google-fill" style="color: #ea4335;" title="Google"></i>';
      if (s.includes('facebook') || s.includes('fb.com')) return '<i class="ri-facebook-circle-fill" style="color: var(--brand-facebook);" title="Facebook"></i>';
      if (s.includes('instagram')) return '<i class="ri-instagram-line" style="color: #e1306c;" title="Instagram"></i>';
      if (s.includes('linkedin')) return '<i class="ri-linkedin-box-fill" style="color: var(--brand-linkedin);" title="LinkedIn"></i>';
      if (s.includes('reddit')) return '<i class="ri-reddit-fill" style="color: #ff4500;" title="Reddit"></i>';
      if (s.includes('tiktok') || s.includes('douyin')) return '<i class="ri-tiktok-fill" style="color: var(--primary-ink);" title="TikTok"></i>';
      if (s.includes('discord')) return '<i class="ri-discord-fill" style="color: var(--brand-discord);" title="Discord"></i>';
      return '<i class="ri-global-line" style="color: var(--secondary-ink);" title="外部网站"></i>';
    }

    // Device Category Icons via Remixicon
    function getDeviceIcon(device) {
      const d = (device || '').toLowerCase();
      if (d.includes('mobile')) return '<i class="ri-smartphone-line"></i>';
      if (d.includes('tablet') || d.includes('ipad')) return '<i class="ri-tablet-line"></i>';
      if (d.includes('desktop') || d.includes('mac') || d.includes('windows') || d.includes('linux')) return '<i class="ri-computer-line"></i>';
      return '<i class="ri-device-line"></i>';
    }

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

    // Auto-seed token from server authentication
    const serverToken = ${JSON.stringify(token || '')};
    if (serverToken) {
      try {
        localStorage.setItem('ADMIN_TOKEN', serverToken);
        if (!document.cookie.includes('ADMIN_TOKEN=')) {
          document.cookie = 'ADMIN_TOKEN=' + encodeURIComponent(serverToken) + '; path=/; max-age=2592000; SameSite=Lax';
        }
      } catch (e) {}
    }

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
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      const localToken = localStorage.getItem('ADMIN_TOKEN');
      if (localToken) {
        headers['X-Admin-Token'] = localToken;
      }
      return headers;
    }

    async function safeParseResponse(res) {
      let rawText = '';
      try {
        rawText = await res.text();
      } catch (e) {
        return {
          ok: false,
          status: res.status,
          data: null,
          isJson: false,
          rawText: '',
          extractedError: '无法读取响应数据: ' + e.message
        };
      }

      let data = null;
      let isJson = false;
      const trimmed = (rawText || '').trim();

      if (trimmed) {
        try {
          data = JSON.parse(trimmed);
          isJson = true;
        } catch (e) {
          isJson = false;
        }
      }

      if (isJson && data && typeof data === 'object') {
        return {
          ok: res.ok,
          status: res.status,
          data,
          isJson: true,
          rawText
        };
      }

      let extractedError = '';
      if (trimmed.startsWith('<')) {
        function getTagText(tag) {
          const lower = trimmed.toLowerCase();
          const open = '<' + tag;
          const close = '</' + tag + '>';
          const start = lower.indexOf(open);
          if (start === -1) return '';
          const endOpen = lower.indexOf('>', start);
          if (endOpen === -1) return '';
          const end = lower.indexOf(close, endOpen);
          if (end === -1) return '';
          return trimmed.slice(endOpen + 1, end).replace(/<[^>]+>/g, '').trim();
        }

        const titleText = getTagText('title');
        const h1Text = getTagText('h1');
        const pText = getTagText('p');

        if (titleText) {
          extractedError = titleText;
        } else if (h1Text) {
          extractedError = h1Text;
        } else if (pText) {
          extractedError = pText;
        } else {
          extractedError = trimmed.replace(/<[^>]+>/g, ' ').trim().slice(0, 150);
        }
      } else {
        extractedError = trimmed.slice(0, 150);
      }

      if (!extractedError) {
        extractedError = 'HTTP ' + res.status + ' ' + (res.statusText || 'Error');
      }

      return {
        ok: false,
        status: res.status,
        data: null,
        isJson: false,
        rawText,
        extractedError
      };
    }

    function renderErrorState(title, message, isAuth) {
      const tbody = document.getElementById('linksTableBody');
      if (tbody) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="6" style="text-align: center; padding: 48px 24px;">
              <div style="max-width: 480px; margin: 0 auto;">
                <div style="font-size: 32px; color: \${isAuth ? 'var(--sole-accent)' : 'var(--color-danger)'}; margin-bottom: 12px;">
                  <i class="\${isAuth ? 'ri-shield-keyhole-line' : 'ri-error-warning-line'}"></i>
                </div>
                <div style="font-family: var(--font-serif); font-size: 16px; font-weight: 700; color: var(--primary-ink); margin-bottom: 8px;">
                  \${title}
                </div>
                <div style="font-size: 13px; color: var(--secondary-ink); line-height: 1.6; margin-bottom: 20px;">
                  \${message}
                </div>
                <div style="display: flex; justify-content: center; gap: 10px;">
                  <button onclick="loadLinks()" class="btn btn-primary" style="font-size: 12px; padding: 6px 16px;">
                    <i class="ri-refresh-line"></i> 重新加载
                  </button>
                  \${isAuth ? \`
                    <button onclick="localStorage.removeItem('ADMIN_TOKEN'); window.location.reload();" class="btn btn-secondary" style="font-size: 12px; padding: 6px 16px;">
                      清除凭证并重试
                    </button>
                  \` : ''}
                </div>
              </div>
            </td>
          </tr>
        \`;
      }
      const analyticsBody = document.getElementById('analyticsCardBody');
      if (analyticsBody) {
        analyticsBody.innerHTML = \`
          <div class="analytics-empty-state">
            <div class="analytics-empty-icon" style="color: var(--color-danger);"><i class="ri-error-warning-line"></i></div>
            <div class="analytics-empty-title">统计加载失败</div>
            <div class="analytics-empty-desc">\${message}</div>
          </div>
        \`;
      }
    }

    async function loadLinks() {
      const tbody = document.getElementById('linksTableBody');
      if (tbody) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 36px; color: var(--secondary-ink);"><i class="ri-loader-4-line ri-spin" style="margin-right: 8px;"></i>正在加载短链数据...</td></tr>';
      }

      try {
        const res = await fetch('/api/links', {
          headers: getAuthHeaders(),
          redirect: 'follow'
        });

        if (res.status === 401) {
          const lastReload = sessionStorage.getItem('last_auth_reload');
          const now = Date.now();
          if (!lastReload || now - parseInt(lastReload, 10) > 6000) {
            sessionStorage.setItem('last_auth_reload', now.toString());
            window.location.reload();
            return;
          }
          renderErrorState(
            '401 身份鉴权未通过',
            '当前凭据无效或已失效。若已安装 Surge 模块，请检查 Surge 规则与 HTTPS 解密证书；或点击下方清除凭证重新登录。',
            true
          );
          showToast('鉴权失效，请检查口令或 Surge 配置');
          return;
        }

        const parsed = await safeParseResponse(res);

        if (!parsed.ok) {
          let errorMsg = '加载短链失败 (' + res.status + ')';
          if (parsed.isJson && parsed.data && parsed.data.error) {
            errorMsg = parsed.data.error;
          } else if (parsed.extractedError) {
            errorMsg = parsed.extractedError;
          }

          renderErrorState(
            '数据加载失败 (' + res.status + ')',
            errorMsg,
            false
          );
          showToast('加载失败: ' + errorMsg);
          return;
        }

        const data = parsed.data || {};
        if (data.error && (!data.links || data.links.length === 0)) {
          renderErrorState('服务提示', data.error, false);
          showToast(data.error);
          return;
        }

        links = Array.isArray(data.links) ? data.links : [];
        renderTable();
        updateMetrics(data);
        renderAnalyticsCard();
      } catch (err) {
        console.error('[loadLinks Network Error]', err);
        renderErrorState(
          '网络请求异常',
          '无法连接至短链服务，请检查网络连接或控制台日志: ' + err.message,
          false
        );
        showToast('网络错误，请稍后重试');
      }
    }

    function updateMetrics(data) {
      document.getElementById('metricTotalLinks').innerText = links.length;
      const totalClicks = links.reduce((sum, item) => sum + (item.clicks || 0), 0);
      document.getElementById('metricTotalClicks').innerText = totalClicks;
    }

    function formatDate(ts) {
      if (!ts) return '-';
      const d = new Date(ts);
      const pad = n => String(n).padStart(2, '0');
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }

    function getRemainingTimeStr(ts) {
      if (!ts) return '永久有效';
      const diff = ts - Date.now();
      if (diff <= 0) return '已到期';
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours < 24) {
        return '剩 ' + (hours <= 0 ? '<1' : hours) + ' 小时';
      }
      const days = Math.floor(hours / 24);
      return '剩 ' + days + ' 天';
    }

    let currentAnalyticsTab = 'overview';

    function switchAnalyticsTab(tab) {
      currentAnalyticsTab = tab;
      if (typeof document.querySelectorAll === 'function') {
        document.querySelectorAll('.analytics-tab').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
        });
      }
      renderAnalyticsCard();
    }

    function renderAnalyticsCard() {
      const body = document.getElementById('analyticsCardBody');
      if (!body) return;

      if (!links || links.length === 0) {
        body.innerHTML = \`
          <div class="analytics-empty-state">
            <div class="analytics-empty-icon"><i class="ri-compass-discover-line"></i></div>
            <div class="analytics-empty-title">暂无短链与访问数据</div>
            <div class="analytics-empty-desc">请先在下方创建短链。发布后，全站的来源渠道、地域与设备分布将在此实时汇聚呈现。</div>
          </div>
        \`;
        return;
      }

      // Aggregate stats across all links
      let totalClicks = 0;
      const referrersMap = {};
      const countriesMap = {};
      const devicesMap = {};
      const allRecentClicks = [];

      for (const link of links) {
        const linkClicks = link.clicks || link.stats?.totalClicks || 0;
        totalClicks += linkClicks;

        const stats = link.stats;
        if (stats) {
          if (stats.referrers) {
            for (const [src, count] of Object.entries(stats.referrers)) {
              referrersMap[src] = (referrersMap[src] || 0) + count;
            }
          }
          if (stats.countries) {
            for (const [country, count] of Object.entries(stats.countries)) {
              countriesMap[country] = (countriesMap[country] || 0) + count;
            }
          }
          if (stats.devices) {
            for (const [device, count] of Object.entries(stats.devices)) {
              devicesMap[device] = (devicesMap[device] || 0) + count;
            }
          }
          if (Array.isArray(stats.recentClicks)) {
            for (const click of stats.recentClicks) {
              allRecentClicks.push({
                slug: link.slug,
                ...click
              });
            }
          }
        }
      }

      if (totalClicks === 0) {
        body.innerHTML = \`
          <div class="analytics-empty-state">
            <div class="analytics-empty-icon"><i class="ri-line-chart-line"></i></div>
            <div class="analytics-empty-title">暂无点击访问数据</div>
            <div class="analytics-empty-desc">已配置 \${links.length} 个短链。当访客通过短链跳转时，点击来源渠道、地域分布及设备统计将在此实时汇聚呈现。</div>
          </div>
        \`;
        return;
      }

      const refEntries = Object.entries(referrersMap).sort((a, b) => b[1] - a[1]);
      const countryEntries = Object.entries(countriesMap).sort((a, b) => b[1] - a[1]);
      const deviceEntries = Object.entries(devicesMap).sort((a, b) => b[1] - a[1]);
      allRecentClicks.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      const topLinks = [...links].filter(l => (l.clicks || 0) > 0).sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5);

      if (currentAnalyticsTab === 'activity') {
        const recentSlice = allRecentClicks.slice(0, 15);
        let rowsHtml = '';
        if (recentSlice.length === 0) {
          rowsHtml = '<tr><td colspan="5" style="text-align: center; padding: 24px; color: var(--secondary-ink);">暂无近期访问记录</td></tr>';
        } else {
          rowsHtml = recentSlice.map(c => \`
            <tr>
              <td style="font-size: 11px; white-space: nowrap;"><i class="ri-time-line" style="opacity: 0.6; margin-right: 2px;"></i>\${formatDate(c.timestamp)}</td>
              <td><a href="/\${c.slug}" target="_blank" class="slug-link font-mono">/\${c.slug}</a></td>
              <td style="font-size: 12px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="\${c.referer || 'Direct'}">
                <span style="display: inline-flex; align-items: center; gap: 4px;">
                  \${getSourceIcon(c.referer)}
                  \${c.referer || 'Direct'}
                </span>
              </td>
              <td style="font-size: 12px;"><i class="ri-map-pin-2-line" style="opacity: 0.6; margin-right: 2px;"></i>\${c.country || 'Unknown'}\${c.city && c.city !== 'Unknown' ? ' / ' + c.city : ''}</td>
              <td style="font-size: 12px;"><span style="display: inline-flex; align-items: center; gap: 4px;">\${getDeviceIcon(c.device)} \${c.device || 'Other'}</span></td>
            </tr>
          \`).join('');
        }

        body.innerHTML = \`
          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>访问时间</th>
                  <th>目标短链</th>
                  <th>点击来源 (Referrer / UTM)</th>
                  <th>地理位置</th>
                  <th>访问设备</th>
                </tr>
              </thead>
              <tbody>
                \${rowsHtml}
              </tbody>
            </table>
          </div>
        \`;
        return;
      }

      // Overview Tab (3 columns)
      let refBarsHtml = '';
      if (refEntries.length === 0) {
        refBarsHtml = '<div class="empty-stats-hint">暂无来源统计</div>';
      } else {
        refBarsHtml = refEntries.slice(0, 6).map(([src, count]) => {
          const pct = Math.round((count / totalClicks) * 100);
          let displayName = src;
          if (src === 'Direct') displayName = '直接访问 (Direct)';
          return \`
            <div class="stat-bar-row">
              <div class="stat-bar-label">
                <span class="stat-name font-mono" title="\${src}">
                  \${getSourceIcon(src)}
                  \${displayName}
                </span>
                <span class="stat-count">\${count} 次 (\${pct}%)</span>
              </div>
              <div class="stat-bar-track">
                <div class="stat-bar-fill" style="width: \${pct}%;"></div>
              </div>
            </div>
          \`;
        }).join('');
      }

      let deviceChipsHtml = '';
      if (deviceEntries.length === 0) {
        deviceChipsHtml = '<div class="empty-stats-hint">暂无设备数据</div>';
      } else {
        deviceChipsHtml = deviceEntries.map(([d, count]) => {
          const pct = Math.round((count / totalClicks) * 100);
          return \`
            <div class="chip-item">
              <span class="chip-label">\${getDeviceIcon(d)} \${d}</span>
              <span class="chip-val">\${count} (\${pct}%)</span>
            </div>
          \`;
        }).join('');
      }

      let countryChipsHtml = '';
      if (countryEntries.length === 0) {
        countryChipsHtml = '<div class="empty-stats-hint">暂无地域数据</div>';
      } else {
        countryChipsHtml = countryEntries.slice(0, 8).map(([c, count]) => {
          const pct = Math.round((count / totalClicks) * 100);
          return \`
            <div class="chip-item">
              <span class="chip-label font-mono"><i class="ri-map-pin-2-line" style="opacity: 0.7;"></i>\${c}</span>
              <span class="chip-val">\${count} (\${pct}%)</span>
            </div>
          \`;
        }).join('');
      }

      let topLinksHtml = '';
      if (topLinks.length === 0) {
        topLinksHtml = '<div class="empty-stats-hint">暂无热门短链</div>';
      } else {
        topLinksHtml = topLinks.map(l => {
          const pct = Math.round(((l.clicks || 0) / totalClicks) * 100);
          return \`
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px dashed var(--subtle-border); font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px;">
                <a href="/\${l.slug}" target="_blank" class="slug-link font-mono">/\${l.slug}</a>
                <span style="color: var(--secondary-ink); font-size: 11px; overflow: hidden; text-overflow: ellipsis;">\${l.title || l.url}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="font-mono" style="font-weight: 600; color: var(--primary-ink);">\${l.clicks || 0}</span>
                <span style="font-size: 11px; color: var(--secondary-ink);">\${pct}%</span>
              </div>
            </div>
          \`;
        }).join('');
      }

      body.innerHTML = \`
        <div class="analytics-grid-3">
          <!-- Column 1: Sources -->
          <div class="analytics-subcard">
            <div class="analytics-subcard-title">
              <i class="ri-route-line" style="color: var(--sole-accent);"></i>
              主要点击来源 (Top Sources)
            </div>
            <div class="stat-bars-container">
              \${refBarsHtml}
            </div>
          </div>

          <!-- Column 2: Devices & Geo -->
          <div class="analytics-subcard">
            <div class="analytics-subcard-title">
              <i class="ri-smartphone-line" style="color: var(--sole-accent);"></i>
              访问设备与热门地域
            </div>
            <div style="margin-bottom: 14px;">
              <div style="font-size: 11px; color: var(--secondary-ink); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">终端设备分布</div>
              <div class="chips-container">\${deviceChipsHtml}</div>
            </div>
            <div>
              <div style="font-size: 11px; color: var(--secondary-ink); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">访客国家/地区</div>
              <div class="chips-container">\${countryChipsHtml}</div>
            </div>
          </div>

          <!-- Column 3: Top Performing Links -->
          <div class="analytics-subcard">
            <div class="analytics-subcard-title">
              <i class="ri-fire-line" style="color: #f97316;"></i>
              高频跳转短链排行
            </div>
            <div style="display: flex; flex-direction: column;">
              \${topLinksHtml}
            </div>
          </div>
        </div>
      \`;
    }

    function renderTable() {
      const tbody = document.getElementById('linksTableBody');
      if (!links.length) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 36px; color: var(--secondary-ink);">暂无短链记录，点击右上角新建</td></tr>';
        return;
      }

      const now = Date.now();
      tbody.innerHTML = links.map(link => {
        const displayPath = '/' + link.slug;
        const fullUrl = window.location.origin + '/' + link.slug;
        const encodedTarget = encodeURI(link.url);

        let statusHtml = '';
        if (link.enabled === false) {
          statusHtml = '<span class="status-badge disabled">已禁用</span>';
        } else if (link.expiresAt) {
          if (now > link.expiresAt) {
            statusHtml = '<span class="status-badge expired" title="到期时间: ' + formatDate(link.expiresAt) + '">已到期 (404)</span>';
          } else {
            statusHtml = '<span class="status-badge expiring" title="到期时间: ' + formatDate(link.expiresAt) + '">' + getRemainingTimeStr(link.expiresAt) + '</span>';
          }
        } else {
          statusHtml = '<span class="status-badge permanent">永久有效</span>';
        }

        return \`
          <tr>
            <td>
              <div class="slug-cell">
                <a href="\${displayPath}" target="_blank" class="slug-link">\${displayPath}</a>
                <button onclick="copyToClipboard('\${fullUrl}')" title="复制完整短链地址" class="copy-btn">
                  <i class="ri-file-copy-line"></i>
                </button>
              </div>
            </td>
            <td>
              <div class="url-cell">
                <a href="\${encodedTarget}" target="_blank" title="\${link.url}">
                  \${link.url}
                  <i class="ri-external-link-line" style="font-size: 11px; opacity: 0.6;"></i>
                </a>
              </div>
            </td>
            <td style="color: var(--secondary-ink); font-size: 12px; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              \${link.title || '<span style="opacity: 0.35;">-</span>'}
            </td>
            <td class="clicks-cell">
              <button onclick="viewStats('\${link.slug}')" class="clicks-btn" title="查看来源与访问分析">
                <span>\${link.clicks || 0}</span>
                <i class="ri-bar-chart-2-line" style="font-size: 12px; opacity: 0.8;"></i>
              </button>
            </td>
            <td style="text-align: center;">
              \${statusHtml}
            </td>
            <td class="actions-cell">
              <button onclick="viewStats('\${link.slug}')" class="table-action-btn" title="查看来源分析"><i class="ri-pie-chart-2-line"></i>统计</button>
              <button onclick="editLink('\${link.slug}')" class="table-action-btn"><i class="ri-edit-line"></i>编辑</button>
              <button onclick="deleteLink('\${link.slug}')" class="table-action-btn delete"><i class="ri-delete-bin-line"></i>删除</button>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function generateRandomSlugClient() {
      const chars = '23456789abcdefghjkmnpqrstuvwxyz';
      let res = '';
      for (let i = 0; i < 6; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const slugInput = document.getElementById('formSlug');
      if (slugInput) {
        slugInput.value = res;
      }
      return res;
    }

    function setExpirationPreset(preset) {
      currentPreset = preset;
      document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-preset') === preset);
      });
      const customInput = document.getElementById('formExpiresAt');
      const hint = document.getElementById('expiryHint');
      if (!customInput || !hint) return;

      const now = new Date();
      if (preset === 'never') {
        customInput.style.display = 'none';
        customInput.value = '';
        hint.innerText = '此短链将永久有效。';
      } else if (preset === '1h') {
        customInput.style.display = 'none';
        const future = new Date(now.getTime() + 60 * 60 * 1000);
        customInput.value = future.toISOString().slice(0, 16);
        hint.innerText = '有效时长 1 小时，到期后跳转停用并返回 404。';
      } else if (preset === '1d') {
        customInput.style.display = 'none';
        const future = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        customInput.value = future.toISOString().slice(0, 16);
        hint.innerText = '有效时长 24 小时（1天），到期后跳转停用并返回 404。';
      } else if (preset === '7d') {
        customInput.style.display = 'none';
        const future = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        customInput.value = future.toISOString().slice(0, 16);
        hint.innerText = '有效时长 7 天，到期后跳转停用并返回 404。';
      } else if (preset === '30d') {
        customInput.style.display = 'none';
        const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        customInput.value = future.toISOString().slice(0, 16);
        hint.innerText = '有效时长 30 天，到期后跳转停用并返回 404。';
      } else if (preset === 'custom') {
        customInput.style.display = 'block';
        if (!customInput.value) {
          const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          customInput.value = tomorrow.toISOString().slice(0, 16);
        }
        hint.innerText = '请选择自定义截止时间，到期后跳转停用并返回 404。';
      }
    }

    function openModal() {
      const modal = document.getElementById('linkModal');
      modal.classList.add('active');
      document.getElementById('modalTitle').innerText = '新建短链重定向';
      document.getElementById('linkForm').reset();
      document.getElementById('formSlug').value = '';
      document.getElementById('formSlug').disabled = false;
      document.getElementById('formEnabled').checked = true;
      setExpirationPreset('never');
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

      if (item.expiresAt) {
        const d = new Date(item.expiresAt);
        const pad = n => String(n).padStart(2, '0');
        const localIso = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes());
        setExpirationPreset('custom');
        const customInput = document.getElementById('formExpiresAt');
        if (customInput) customInput.value = localIso;
      } else {
        setExpirationPreset('never');
      }
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

      let expiresAt = null;
      if (currentPreset !== 'never') {
        const expiryVal = document.getElementById('formExpiresAt').value;
        if (expiryVal) {
          const parsedTs = new Date(expiryVal).getTime();
          if (!isNaN(parsedTs)) {
            expiresAt = parsedTs;
          }
        }
      }

      const payload = { slug, url, title, description, ogImage, enabled, expiresAt };

      try {
        const res = await fetch('/api/links', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });

        const parsed = await safeParseResponse(res);
        if (!parsed.ok) {
          const errMsg = (parsed.data && parsed.data.error) || parsed.extractedError || ('保存失败 (' + res.status + ')');
          showToast('保存失败: ' + errMsg);
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
      if (!confirm('确定彻底删除短链 /' + slug + ' 及其关联统计信息吗？删除后访问将返回 404。')) return;

      try {
        const res = await fetch('/api/links/' + encodeURIComponent(slug), {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        const parsed = await safeParseResponse(res);
        if (parsed.ok) {
          showToast('已删除 /' + slug + ' 及其统计信息');
          loadLinks();
        } else {
          const errMsg = (parsed.data && parsed.data.error) || parsed.extractedError || ('删除失败 (' + res.status + ')');
          showToast('删除失败: ' + errMsg);
        }
      } catch (err) {
        showToast('删除出错: ' + err.message);
      }
    }

    // View Detailed Analytics & Sources Modal
    async function viewStats(slug) {
      const modal = document.getElementById('statsModal');
      const title = document.getElementById('statsModalTitle');
      const subtitle = document.getElementById('statsModalSubtitle');
      const body = document.getElementById('statsModalBody');
      if (!modal || !body) return;

      modal.classList.add('active');
      title.innerText = '短链访问与来源分析';
      subtitle.innerText = '/' + slug;
      body.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--secondary-ink);"><i class="ri-loader-4-line ri-spin" style="margin-right: 8px;"></i>正在分析访问来源数据...</div>';

      try {
        const res = await fetch('/api/stats/' + encodeURIComponent(slug), {
          headers: getAuthHeaders()
        });
        const parsed = await safeParseResponse(res);
        if (!parsed.ok) {
          body.innerHTML = '<div style="text-align: center; padding: 32px; color: var(--color-danger);">获取统计数据失败: ' + (parsed.extractedError || res.status) + '</div>';
          return;
        }

        const data = parsed.data || {};
        const totalClicks = data.totalClicks || 0;
        const referrers = data.referrers || {};
        const countries = data.countries || {};
        const devices = data.devices || {};
        const recentClicks = Array.isArray(data.recentClicks) ? data.recentClicks : [];

        const refEntries = Object.entries(referrers).sort((a, b) => b[1] - a[1]);
        const countryEntries = Object.entries(countries).sort((a, b) => b[1] - a[1]);
        const deviceEntries = Object.entries(devices).sort((a, b) => b[1] - a[1]);

        let refHtml = '';
        if (refEntries.length === 0) {
          refHtml = '<div class="empty-stats-hint">暂无来源统计记录</div>';
        } else {
          refHtml = refEntries.map(([src, count]) => {
            const pct = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
            let displayName = src;
            if (src === 'Direct') displayName = '直接访问 (Direct)';
            return \`
              <div class="stat-bar-row">
                <div class="stat-bar-label">
                  <span class="stat-name font-mono" title="\${src}">
                    \${getSourceIcon(src)}
                    \${displayName}
                  </span>
                  <span class="stat-count">\${count} 次 (\${pct}%)</span>
                </div>
                <div class="stat-bar-track">
                  <div class="stat-bar-fill" style="width: \${pct}%;"></div>
                </div>
              </div>
            \`;
          }).join('');
        }

        let countryHtml = '';
        if (countryEntries.length === 0) {
          countryHtml = '<div class="empty-stats-hint">暂无地域数据</div>';
        } else {
          countryHtml = countryEntries.map(([c, count]) => {
            const pct = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
            return \`
              <div class="chip-item">
                <span class="chip-label font-mono"><i class="ri-map-pin-2-line" style="opacity: 0.7;"></i>\${c}</span>
                <span class="chip-val">\${count} (\${pct}%)</span>
              </div>
            \`;
          }).join('');
        }

        let deviceHtml = '';
        if (deviceEntries.length === 0) {
          deviceHtml = '<div class="empty-stats-hint">暂无设备数据</div>';
        } else {
          deviceHtml = deviceEntries.map(([d, count]) => {
            const pct = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
            return \`
              <div class="chip-item">
                <span class="chip-label">\${getDeviceIcon(d)} \${d}</span>
                <span class="chip-val">\${count} (\${pct}%)</span>
              </div>
            \`;
          }).join('');
        }

        let recentHtml = '';
        if (recentClicks.length === 0) {
          recentHtml = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--secondary-ink); font-size: 12px;">暂无访问记录</td></tr>';
        } else {
          recentHtml = recentClicks.map(c => \`
            <tr>
              <td style="font-size: 11px; white-space: nowrap;"><i class="ri-time-line" style="opacity: 0.6; margin-right: 2px;"></i>\${formatDate(c.timestamp)}</td>
              <td style="font-size: 12px; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="\${c.referer || 'Direct'}">
                <span style="display: inline-flex; align-items: center; gap: 4px;">
                  \${getSourceIcon(c.referer)}
                  \${c.referer || 'Direct'}
                </span>
              </td>
              <td style="font-size: 12px;"><i class="ri-map-pin-2-line" style="opacity: 0.6; margin-right: 2px;"></i>\${c.country || 'Unknown'}\${c.city && c.city !== 'Unknown' ? ' / ' + c.city : ''}</td>
              <td style="font-size: 12px;"><span style="display: inline-flex; align-items: center; gap: 4px;">\${getDeviceIcon(c.device)} \${c.device || 'Other'}</span></td>
            </tr>
          \`).join('');
        }

        body.innerHTML = \`
          <div class="stats-overview-grid">
            <div class="stats-metric-card">
              <div class="stats-metric-num"><i class="ri-cursor-line" style="font-size: 18px; opacity: 0.65;"></i>\${totalClicks}</div>
              <div class="stats-metric-desc">累计跳转点击</div>
            </div>
            <div class="stats-metric-card">
              <div class="stats-metric-num"><i class="ri-route-line" style="font-size: 18px; opacity: 0.65;"></i>\${refEntries.length}</div>
              <div class="stats-metric-desc">来源渠道数</div>
            </div>
            <div class="stats-metric-card">
              <div class="stats-metric-num"><i class="ri-earth-line" style="font-size: 18px; opacity: 0.65;"></i>\${countryEntries.length}</div>
              <div class="stats-metric-desc">覆盖国家/地区</div>
            </div>
          </div>

          <div class="stats-section">
            <h4 class="stats-section-title"><i class="ri-route-line" style="color: var(--sole-accent);"></i> 点击来源渠道分布 (Referrer / UTM)</h4>
            <div class="stat-bars-container">\${refHtml}</div>
          </div>

          <div class="stats-columns-2">
            <div class="stats-section">
              <h4 class="stats-section-title"><i class="ri-earth-line" style="color: var(--sole-accent);"></i> 访客地理分布</h4>
              <div class="chips-container">\${countryHtml}</div>
            </div>
            <div class="stats-section">
              <h4 class="stats-section-title"><i class="ri-smartphone-line" style="color: var(--sole-accent);"></i> 访问设备类型</h4>
              <div class="chips-container">\${deviceHtml}</div>
            </div>
          </div>

          <div class="stats-section">
            <h4 class="stats-section-title"><i class="ri-history-line" style="color: var(--sole-accent);"></i> 最近 20 次点击明细</h4>
            <div class="table-scroll" style="max-height: 220px;">
              <table>
                <thead>
                  <tr>
                    <th>访问时间</th>
                    <th>来源渠道</th>
                    <th>地理位置</th>
                    <th>设备</th>
                  </tr>
                </thead>
                <tbody>\${recentHtml}</tbody>
              </table>
            </div>
          </div>
        \`;
      } catch (err) {
        body.innerHTML = '<div style="text-align: center; padding: 32px; color: var(--color-danger);">加载统计失败: ' + err.message + '</div>';
      }
    }

    function closeStatsModal() {
      const modal = document.getElementById('statsModal');
      if (modal) modal.classList.remove('active');
    }

    function handleStatsOverlayClick(e) {
      if (e.target.id === 'statsModal') {
        closeStatsModal();
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
