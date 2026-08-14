# 壹点智元企业官网

该目录是独立的企业官网前端实现，面向需要 AI 模型接入与治理能力的中小企业。

## 范围

- 仅包含公共营销网站。
- 不包含后台管理功能。
- 不修改 `../web` 现有控制台。
- 产品与内容规划见 [WEBSITE_REDESIGN_PLAN.md](./WEBSITE_REDESIGN_PLAN.md)。

## 技术栈

- React 19
- TypeScript
- Rsbuild
- Tailwind CSS 4
- TanStack Router
- i18next
- Docker + Nginx（独立静态站点部署）

## 环境变量

- `VITE_CONSOLE_URL`：控制台入口地址；登录与注册使用同源 `/sign-in`、`/sign-up` 页面。
- `VITE_DOCS_URL`：开发文档地址。
- `VITE_CONTACT_EMAIL`：企业联系邮箱。

未配置 `VITE_CONSOLE_URL` 时，控制台类 CTA 会回退到咨询页；未配置 `VITE_DOCS_URL` 时，文档类入口会回退到资源中心。上线前必须配置真实控制台、开发文档与联系邮箱。

> `VITE_*` 均为前端**构建期变量**，修改后需要重新构建静态镜像，运行中的容器不会自动读取新的值。

## 本地运行

```powershell
bun install
bun run dev
```

## 独立容器化部署

企业官网应独立于现有 NewAPI 服务部署：

```text
www.example.com      -> new_web 企业官网容器
console.example.com  -> 现有 NewAPI 服务（含 web 管理控制台）
```

不要将 `new_web` 替换现有根目录的 `web`，否则会影响 NewAPI 的管理控制台嵌入资源。

### 1. 创建生产环境变量文件

```powershell
Copy-Item .\.env.production.example .\.env.production
```

编辑 `.env.production`，至少填写以下三个站点入口：

```dotenv
VITE_CONSOLE_URL=https://console.example.com
VITE_DOCS_URL=https://docs.example.com
VITE_CONTACT_EMAIL=sales@example.com
```

### 2. 构建并启动

在本目录执行：

```powershell
docker compose -f .\docker-compose.website.yml --env-file .\.env.production up -d --build
```

默认访问地址：`http://localhost:8080`。可通过 `WEBSITE_PORT` 调整宿主机端口。

### 3. 查看状态与日志

```powershell
docker compose -f .\docker-compose.website.yml --env-file .\.env.production ps
docker compose -f .\docker-compose.website.yml --env-file .\.env.production logs -f enterprise-website
```

健康检查地址：`http://localhost:8080/healthz`。

### 4. 停止服务

```powershell
docker compose -f .\docker-compose.website.yml --env-file .\.env.production down
```

### 5. 更新构建期配置或前端代码

`VITE_*` 配置、官网代码或静态资源有变更后，重新执行：

```powershell
docker compose -f .\docker-compose.website.yml --env-file .\.env.production up -d --build
```

## 验证

```powershell
bun run typecheck
bun run lint
bun run i18n:check
bun run build

docker compose -f .\docker-compose.website.yml --env-file .\.env.production.example config
```

## 安全与内容

- 禁止写入真实密钥、Token 和客户数据。
- 禁止虚构客户、认证、价格、SLA 和业务数据。
- 禁止直接渲染未消毒 HTML。
- 联系页面没有后端接口时不得伪造提交成功。
