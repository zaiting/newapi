/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly VITE_CONSOLE_URL?: string
  readonly VITE_DOCS_URL?: string
  readonly VITE_CONTACT_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
