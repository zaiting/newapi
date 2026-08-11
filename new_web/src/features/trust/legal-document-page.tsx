import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { siteConfig } from '@/config/site'

interface LegalDocumentPageProps {
  title: string
  description: string
  endpoint: '/api/privacy-policy' | '/api/user-agreement'
  emptyMessage: string
}

interface LegalDocumentResponse {
  success?: boolean
  message?: string
  data?: string
}

type LegalDocumentState =
  | { status: 'loading'; content: ''; message: '' }
  | { status: 'ready'; content: string; message: '' }
  | { status: 'empty' | 'error'; content: ''; message: string }

function isDocumentUrl(content: string) {
  try {
    const url = new URL(content)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function convertHtmlToText(content: string) {
  if (!/^\s*</.test(content) || typeof DOMParser === 'undefined') {
    return content
  }

  const documentNode = new DOMParser().parseFromString(content, 'text/html')
  documentNode.body.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  documentNode.body.querySelectorAll('p, div, section, article, h1, h2, h3, h4, li').forEach((element) => {
    element.append('\n')
  })
  return documentNode.body.textContent?.replace(/\n{3,}/g, '\n\n').trim() || ''
}

interface SafeLegalContentProps {
  content: string
}

/** 安全渲染常见 Markdown 块结构，不解析链接、脚本或原始 HTML。 */
function SafeLegalContent({ content }: SafeLegalContentProps) {
  const lines = content.split(/\r?\n/)

  return (
    <div className="space-y-3 text-base leading-8 text-muted-foreground">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim()
        if (!line) {
          return <div key={'space-' + index} className="h-2" aria-hidden="true" />
        }

        const headingMatch = /^(#{1,4})\s+(.+)$/.exec(line)
        if (headingMatch) {
          const level = headingMatch[1].length
          const heading = headingMatch[2]
          if (level === 1) {
            return <h2 key={'heading-' + index} className="pt-3 text-2xl font-semibold tracking-tight text-foreground">{heading}</h2>
          }
          return <h3 key={'heading-' + index} className="pt-2 text-xl font-semibold tracking-tight text-foreground">{heading}</h3>
        }

        const listMatch = /^(?:[-*]|\d+[.)])\s+(.+)$/.exec(line)
        if (listMatch) {
          return (
            <div key={'item-' + index} className="flex gap-3 pl-2">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <p>{listMatch[1]}</p>
            </div>
          )
        }

        return <p key={'paragraph-' + index}>{line}</p>
      })}
    </div>
  )
}

/** 以纯文本方式安全展示后台配置的法律文档，避免执行未消毒 HTML。 */
export function LegalDocumentPage({ title, description, endpoint, emptyMessage }: LegalDocumentPageProps) {
  const { t } = useTranslation()
  const [documentState, setDocumentState] = useState<LegalDocumentState>({
    status: 'loading',
    content: '',
    message: '',
  })

  useEffect(() => {
    const abortController = new AbortController()

    async function loadDocument() {
      try {
        const response = await fetch(endpoint, {
          headers: { Accept: 'application/json' },
          signal: abortController.signal,
        })
        if (!response.ok) {
          throw new Error('Failed to load legal document: ' + response.status)
        }

        const payload = (await response.json()) as LegalDocumentResponse
        const content = payload.data?.trim() || ''
        if (!payload.success || !content) {
          setDocumentState({
            status: 'empty',
            content: '',
            message: emptyMessage,
          })
          return
        }

        setDocumentState({ status: 'ready', content, message: '' })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        setDocumentState({ status: 'error', content: '', message: emptyMessage })
      }
    }

    void loadDocument()
    return () => abortController.abort()
  }, [emptyMessage, endpoint])

  const content = documentState.status === 'ready' ? documentState.content : ''
  const externalDocument = content && isDocumentUrl(content)
  const safeText = content && !externalDocument ? convertHtmlToText(content) : ''

  return (
    <div>
      <PageHero eyebrow={t('Legal information')} title={t(title)} description={t(description)} />
      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          {documentState.status === 'loading' ? (
            <div className="space-y-4" aria-live="polite" aria-label={t('Loading document')}>
              <div className="h-8 w-2/5 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted motion-reduce:animate-none" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            </div>
          ) : null}

          {documentState.status === 'empty' || documentState.status === 'error' ? (
            <div className="rounded-3xl border border-dashed border-border bg-muted/50 p-7 sm:p-10">
              <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">{t('Document status')}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{t(title)}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{t(emptyMessage)}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={siteConfig.docsUrl} variant="secondary">{t('Visit documentation')}</LinkButton>
                <LinkButton href="/contact">{t('Contact us')}</LinkButton>
              </div>
            </div>
          ) : null}

          {documentState.status === 'ready' && externalDocument ? (
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-10">
              <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">{t('External legal document')}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{t(title)}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                {t('This deployment provides the current document through an external link.')}
              </p>
              <LinkButton href={content} target="_blank" rel="noopener noreferrer" className="mt-7">
                {t('View current document')}
              </LinkButton>
            </div>
          ) : null}

          {documentState.status === 'ready' && !externalDocument ? (
            <article className="rounded-3xl border border-border bg-surface px-6 py-8 shadow-sm sm:px-10 sm:py-12">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">{t(title)}</h2>
              <div className="mt-8"><SafeLegalContent content={safeText} /></div>
            </article>
          ) : null}
        </Container>
      </section>
    </div>
  )
}
