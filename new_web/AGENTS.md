# new_web 企业官网开发约束

- 本目录仅实现公共企业官网，不修改 ../web 和任何后台、后端代码。
- 产品规划以 ../web/WEBSITE_REDESIGN_PLAN.md 为准。
- 使用 React 19、TypeScript、Rsbuild、Tailwind CSS 4 和 TanStack Router。
- 只使用 package.json 中已列出的依赖，不新增依赖。
- 所有用户可见文案使用 react-i18next 的 t()，英文源文本作为键。
- 子 Agent 不得编辑 src/i18n/locales；国际化由集成阶段统一处理。
- 页面必须支持桌面端和移动端，使用语义化 HTML、键盘焦点和 reduced motion。
- 不虚构客户、认证、价格、SLA、模型数量和业务数据。
- 不使用 eval、new Function、未消毒 HTML 或硬编码密钥。
- 不实现虚假的联系表单提交、登录提交或后台功能。
- 组件按业务概念拆分，避免无意义的单调用辅助函数。
- 代码注释使用简体中文，新增组件和关键方法提供中文注释。
