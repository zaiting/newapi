# 壹点智元企业官网改造设计

日期：2026-08-14

## 背景

当前 Docker 容器运行的 `web/` 前端是开源项目 New API 的界面——一个面向开发者的 AI API 网关产品页和管理控制台，品牌为 "New API"/"QuantumNous"，文案技术向（"Unified API Gateway for Vast Range of AI Models"）。

本次改造将公开站点转型为"壹点智元"企业官网，定位为企业 AI 集成服务商。控制台和产品功能保持不变。

## 目标

- 品牌从"开源开发者工具"转变为"企业 AI 集成服务商"
- 主标语：让大模型能力，成为企业基础设施
- 目标受众：企业技术决策者 + 开发者
- 商业模式：网关自助服务（开发者）+ 私有化部署/咨询（企业销售）
- 视觉风格：现代科技（深色 Hero + 渐变光晕 + 浅色内容区深浅交替）
- 语言：仅保留中文（默认）和英文
- 不虚构客户、案例、认证、SLA 数字、公司信息

## 信息架构

### 导航

```
首页  模型广场  服务  文档  关于  联系我们       [登录] [注册]
```

| 导航项 | 路径 | 说明 |
|--------|------|------|
| 首页 | `/` | 重新设计的企业首页 |
| 模型广场 | `/pricing` | 复用现有页面，展示可接入的 AI 模型及计费 |
| 服务 | 下拉菜单 | 私有化部署、架构咨询、技术培训、运维托管，锚点跳转 `/services` |
| 文档 | 外部链接 | 走后端 `docs_link` 配置；未配置时隐藏 |
| 关于 | `/about` | 改为企业定位与理念介绍 |
| 联系我们 | `/contact` | 新增，mailto 表单 |
| 登录/注册 | 右侧按钮 | 进入现有控制台 |

- `/rankings` 路由保留但从导航移除
- 语言切换器仅保留中文/英文，默认中文
- `zh-TW`、`fr`、`ru`、`ja`、`vi` locale 文件不删除，但不在 UI 中展示

### 用户路径

- 自助用户：首页 → 模型广场选模型 → 注册 → 控制台
- 企业客户：首页 → 服务/私有化部署 → 联系我们 → 销售跟进

## 首页设计

深色沉浸式，共 7 个区块，深浅交替。

### 区块 1：Hero（深色）

- 深色背景（`--ink` 系），叠加蓝色→青色径向光晕和细网格
- 徽章："企业 AI 基础设施"
- 标题："让大模型能力，成为企业基础设施"（蓝→青渐变）
- 副标题：统一接入 40+ AI 模型提供商，提供密钥管理、用量计费、监控运维一体化平台（不提私有化）
- CTA：主按钮"立即开始" → `/sign-up`；次按钮"预约咨询" → `/contact`
- 右侧终端/控制台预览，展示一次 API 调用和多模型路由（沿用现有终端演示的表达方式）
- 底部仅展示实现中可验证兼容的应用或工具标识；不可确认时不展示该行

### 区块 2：模型生态（浅色）

- 标题："一套接口，接入全部主流大模型"
- 真实支持的模型提供商 logo 网格：仅展示当前渠道类型或模型目录可验证支持的提供商，例如 OpenAI、Anthropic、Google、Azure、AWS Bedrock、通义千问、文心一言、智谱、DeepSeek、月之暗面
- 数据：40+ 提供商、统一 API 兼容；不展示未从当前模型数据确认的静态模型总数
- 链接到模型广场

### 区块 3：核心能力（深色 Bento Grid）

- 标题："一个平台，覆盖 AI 接入全链路"
- 4 张大卡片（bento 布局，带图标和入场动效）：
  1. 统一网关 — 多模型负载均衡、故障转移、自动重试
  2. 密钥与权限 — API Key 管理、分组授权、IP 白名单
  3. 用量与计费 — 实时日志、按 token 精确计费、配额管理
  4. 监控运维 — 请求追踪、异常告警、渠道健康检测

### 区块 4：开发者快速开始（浅色）

- 标题："三分钟接入 AI 能力"
- 左侧三行步骤，右侧深色代码卡片，标签页切换 curl / Python / Node.js
- 代码示例：OpenAI 兼容的 chat completions 调用
- 语法高亮用现有 shiki
- 仅在后端 `docs_link` 已配置时展示“查看文档” CTA，并以新窗口打开该外部链接

### 区块 5：接入流程（深色）

- 标题："三步上线 AI 能力"
- 横向 3 步：配置渠道 → 分发令牌 → 开始调用
- 简洁流程示意图

### 区块 6：企业级保障（浅色）

- 标题："企业级保障"
- 4 列：安全合规、高可用、透明计费、开放兼容
- 用能力建立信任，不使用客户 logo

### 区块 7：最终 CTA（深色）

- 大标题："开始构建你的 AI 基础设施"
- 按钮："免费开始" → `/sign-up`、"预约咨询" → `/contact`
- 不显示开源核心、Apache 许可等信息
- 底部仅品牌版权

首页不出现私有化部署内容。企业销售引导通过导航"服务"页面承接。

## 新增与改造页面

### `/services` 服务页（新增）

- Hero：标题"企业 AI 集成服务"，副标题说明从网关到私有化交付
- 4 个服务卡片：
  - 私有化部署 — 专属环境、数据不出域、适配内网/专有云
  - 架构咨询 — 模型选型、网关架构、高可用方案
  - 技术培训 — API 接入、运维管理、最佳实践
  - 运维托管 — 监控告警、版本升级、故障响应
- 底部 CTA："需要定制方案？" → `/contact`
- 不编造 SLA 数字、客户名称

### `/contact` 联系页（新增）

- 左侧：仅在构建时提供 `VITE_CONTACT_EMAIL` 时展示联系邮箱；未配置时不显示虚构邮箱
- 右侧：咨询表单（姓名、公司、邮箱、需求描述、提交按钮）
- 提交方式：仅当 `VITE_CONTACT_EMAIL` 已配置时生成 `mailto:` 链接；未配置时禁用提交并提示联系信息尚未配置，不新增后端接口
- 不承诺未经确认的响应时间，不伪造提交成功（遵循项目现有规则）

### `/about` 关于页（改造）

- 无真实公司信息（成立时间、团队、融资等）
- 用企业定位、技术理念、服务承诺填充
- 不编造无法验证的信息

### `/pricing` 模型广场（保留，轻调风格）

- 功能和数据不变，仅视觉与新首页统一（深色页头、卡片风格）

### 其他页面

- `/rankings`：路由保留，从导航移除
- 隐私政策、用户协议：不动
- 控制台全部页面：不动
- 认证流程：不动

## 视觉系统

### 配色（基于现有 OKLCH 变量）

- 深色区块背景：现有 `--ink: #071426` 系
- 品牌色：保留现有蓝色 primary
- 渐变终点色：青色（用于 Hero/CTA 标题 `linear-gradient(135deg, brand → cyan)`）
- 光晕：深色区块叠加 `radial-gradient` 蓝/青色柔光，复用现有 `.bg-hero`
- 浅色区块卡片：白底 + 细边框
- 深色区块卡片：半透明白底 `bg-white/5`

### 字体

- 不引入新字体
- 标题：Public Sans + 中文回退（微软雅黑/思源黑体）
- Hero 大标题字重 700，正文 400

### 组件与动效

- 全部基于现有 shadcn/ui + Base UI，不新增 UI 库
- 滚动入场动画用现有 `motion`（Framer Motion）
- 代码高亮用现有 shiki
- 图标用现有 `lucide-react`
- 新建可复用 marketing 组件：BentoCard、CodeBlock、ModelLogo、SectionHeading 等

### 品牌配置

- 公开营销页面固定使用“壹点智元”品牌文案；不改动控制台中的系统名称、认证流程或其后端覆盖行为
- 页脚版权改为“© 2026 壹点智元”
- Logo 暂用现有占位，后续替换

## 技术方案

在现有 `web/` 项目内改造，不新建独立站点。公开页面和控制台共用同一个 React 应用，通过路由和布局区分。

### 新增文件

- `web/src/features/home/components/sections/hero.tsx`（重写）
- `web/src/features/home/components/sections/model-ecosystem.tsx`
- `web/src/features/home/components/sections/capabilities.tsx`
- `web/src/features/home/components/sections/quick-start.tsx`
- `web/src/features/home/components/sections/workflow.tsx`（重写 how-it-works）
- `web/src/features/home/components/sections/enterprise-trust.tsx`
- `web/src/features/services/index.tsx`
- `web/src/features/contact/index.tsx`
- `web/src/components/marketing/`（BentoCard、CodeBlock、ModelLogo 等可复用组件）
- `web/src/routes/services.tsx`、`web/src/routes/contact.tsx`

### 修改文件

- `web/src/features/home/index.tsx`（重组区块）
- `web/src/features/home/components/sections/features.tsx`、`stats.tsx`、`cta.tsx`（删除或重写）
- `web/src/features/about/index.tsx`（企业定位与理念）
- `web/src/hooks/use-top-nav-links.ts`（导航重组，移除排行）
- `web/src/components/layout/components/public-header.tsx`（服务下拉菜单、深浅样式）
- `web/src/components/layout/components/footer.tsx`（版权与链接）
- CSS 变量与深色区块工具类
- `web/src/i18n/locales/zh.json`、`en.json`（新文案）
- 语言切换器组件（仅中/英，默认中文）

### 不改动

- 控制台（`_authenticated/` 下所有页面）
- 认证流程（登录/注册/OAuth/2FA/Passkey）
- 定价页模型数据和计费逻辑（仅视觉轻调）
- 后端代码（不新增接口）
- 其他语言 locale 文件（保留文件但不展示）

## 实施顺序

1. 视觉基础（CSS 变量、深色区块工具类、可复用 marketing 组件）
2. 首页 7 个区块逐个重写
3. 服务页 + 联系页 + 关于页改造
4. 导航/页脚/品牌配置
5. i18n 文案和语言切换
6. 构建验证 + Docker 重新部署

## 约束

- 遵循 AGENTS.md 中的前端规则：Bun 包管理、i18n 用 i18next、英文 source key
- 不虚构客户、案例、认证、SLA、公司信息
- 不新增后端接口
- 控制台零改动
- 模型 logo 是真实技术集成，不是客户背书
