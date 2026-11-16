# Cloudflare Link Redirect & Analytics (极简边缘社媒短链与跳转服务)

基于 **Cloudflare Workers (Hono) + Workers KV + Analytics Engine** 构建的轻量级、零成本社媒短链与访问数据分析平台。

- ⚡ **极致低延迟**：302 重定向由 Cloudflare 遍布全球的边缘节点直接响应，KV 内存级缓存查找，跳转体感延迟仅数毫秒。
- 🤖 **社媒卡片优化**：智能识别 Twitterbot、TelegramBot、Facebook 等爬虫，针对性返回 OpenGraph 预览卡片 HTML，避免社媒分享链接时卡片空白。
- 📊 **异步无感打点**：使用 `ctx.waitUntil` 将地理位置（国家/城市）、设备类型、来源 Referer 异步写入 Analytics Engine 与 KV 计数器，打点完全不阻塞跳转。
- 🔒 **Header Rewrite 鉴权**：支持基于 Surge 等客户端的 `[Header Rewrite]` 模块自动注入 `Authorization: Bearer <ADMIN_TOKEN>`，管理员访问后台无感免登，外界访问自动拦截。
- 🚀 **GitOps 自动化部署**：通过 GitHub Actions 自动化部署，`wrangler.toml` 由 Action 结合 GitHub Secrets/Variables **动态生成**，代码库零配置泄露。

---

## 目录结构

```text
.
├── .github/workflows/
│   └── deploy.yml            # GitHub Actions 自动化部署流程
├── scripts/
│   └── generate-wrangler.mjs # 根据 Secret/Env 动态生成 wrangler.toml 的脚本
├── src/
│   ├── index.ts              # Worker 入口与路由挂载
│   ├── types.ts              # 类型定义 (Env, LinkItem, Stats)
│   ├── routes/
│   │   ├── admin.ts          # 管理后台 API、控制台页面与 .sgmodule 动态下载
│   │   └── redirect.ts       # 核心 302 跳转、UTM 透传、爬虫检测与异步打点
│   ├── templates/
│   │   ├── admin.html.ts     # 管理后台 Web UI (Tailwind CSS)
│   │   └── unauthorized.html.ts # 401 权限说明与 Surge 模块指引页
│   └── utils/
│       ├── bot.ts            # 社交平台爬虫识别与 OpenGraph 卡片渲染
│       ├── device.ts         # User-Agent 解析与 Referer 提取
│       ├── module.ts         # Surge auth.sgmodule 模板生成器
│       ├── stats.ts          # Analytics Engine 打点与 KV 计数统计
│       └── url.ts            # 查询参数与 UTM 营销标签透传
├── test/
│   └── app.test.mjs          # 单元测试 (Node.js 内置 Test Runner)
├── .env.example              # 环境变量与 Secret 示例清单
├── wrangler.toml.template    # wrangler 配置模板参考
├── package.json
└── tsconfig.json
```

---

## GitHub Actions 部署配置 (Secrets & Variables)

本项目在部署时不会把硬编码的 `wrangler.toml` 提交到仓库，而是在 GitHub Actions 运行阶段通过 `scripts/generate-wrangler.mjs` 动态渲染。

请在 GitHub 仓库的 **Settings -> Secrets and variables -> Actions** 中配置以下变量：

### 1. Repository Secrets (机密参数)

| Secret 键名 | 是否必需 | 说明 | 示例 |
| :--- | :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | **必需** | 具备 Workers 部署权限的 Cloudflare API Token | `v1.0-...` |
| `CLOUDFLARE_ACCOUNT_ID` | **必需** | Cloudflare 账户 ID (可在 Workers 仪表盘右侧查看) | `d41d8cd98f00b204...` |
| `KV_NAMESPACE_ID` | **必需** | 用于存储短链映射的 KV Namespace ID | `e61a...` |
| `ADMIN_TOKEN` | **必需** | 管理员鉴权 Token (配合 Header Rewrite 使用) | `my_secret_token_1234` |

> **创建 KV 命名空间命令**：
> ```bash
> npx wrangler kv:namespace create LINKS_KV
> ```
> 执行后终端会输出对应的 ID，填入 `KV_NAMESPACE_ID` 即可。

### 2. Repository Variables (通用环境变量)

| Variable 键名 | 是否必需 | 默认值 / 说明 | 示例 |
| :--- | :--- | :--- | :--- |
| `CUSTOM_DOMAIN` | 可选 | 自定义短链域名 | `go.yourdomain.com` |
| `WORKER_NAME` | 可选 | Worker 服务名称，默认 `cf-link-redirect` | `cf-link-redirect` |
| `ANALYTICS_DATASET`| 可选 | Workers Analytics Engine 数据集名称 | `LINK_REDIRECT_ANALYTICS` |
| `DEFAULT_FALLBACK_URL` | 可选 | 当访问根路径 `/` 或未定义短链时的重定向 URL | `https://x.com/your_handle` |
| `SITE_NAME` | 可选 | 站点显示名称与 OpenGraph 标题 | `Link Redirect Gateway` |

---

## 客户端 Header 自动注入鉴权与 Surge 配置

本项目采用基于 HTTP Header 的 Bearer Token 鉴权：
- 管理后台路由：`/admin`
- 数据与短链接口：`/api/*`

### 使用 Surge 模块自动注入（无感访问）

1. 部署完成后，访问 `https://<你的域名>/auth.sgmodule`，即可获取当前域名定制的 Surge 模块。
2. 模块内容格式如下：
   ```ini
   #!name=Link Redirect Auth
   #!desc=自动注入管理后台与 API 验证所需的 Authorization Header
   #!arguments=Auth:鉴权Token

   [Header Rewrite]
   ^https?://<你的域名>/(admin|api) header-add Authorization "Bearer {{{Auth}}}"

   [MITM]
   hostname = %APPEND% <你的域名>
   ```
3. 在 Surge 中导入该模块，并在参数中填入之前设置的 `ADMIN_TOKEN`。
4. 打开 Safari 或 Chrome 直接访问 `https://<你的域名>/admin`，Surge 将在网络层自动补齐 Header，**无需输入密码即可直接进入控制台**！

---

## 本地开发与测试

### 1. 本地环境测试
```bash
# 复制环境变量模板
cp .env.example .env

# 测试动态生成 wrangler.toml
npm run generate-wrangler

# 运行单元测试
npm test

# 启动本地开发服务 (带本地 KV 模拟)
npm run dev
```

### 2. 核心接口说明

- `GET /:slug`：重定向到目标 URL（普通用户 302 重定向；爬虫返回 OG Meta 卡片）。
- `GET /admin`：管理后台可视化控制台。
- `GET /auth.sgmodule`：获取当前域名的 Surge 模块。
- `GET /api/links`：获取短链列表及点击数据（需 Bearer Token）。
- `POST /api/links`：创建或编辑短链（需 Bearer Token）。
- `DELETE /api/links/:slug`：删除指定短链（需 Bearer Token）。
- `GET /api/stats/:slug`：查看指定短链详细访问数据（需 Bearer Token）。
