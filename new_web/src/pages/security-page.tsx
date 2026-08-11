import { useTranslation } from 'react-i18next'

import { Container } from '@/components/marketing/container'
import { FinalCTA } from '@/components/marketing/final-cta'
import { LinkButton } from '@/components/marketing/link-button'
import { PageHero } from '@/components/marketing/page-hero'
import { SectionHeading } from '@/components/marketing/section-heading'
import { EvidenceNotice, TrustSection } from '@/features/trust/trust-section'

const accessItems = [
  {
    eyebrow: 'Identity',
    title: 'Account and role boundaries',
    description: 'Use account authentication, user roles and administrator boundaries to separate everyday use from management actions.',
    points: ['Keep user access attributable', 'Limit management actions by role', 'Remove access when responsibilities change'],
  },
  {
    eyebrow: 'Credentials',
    title: 'Application API key control',
    description: 'Issue API keys to calling applications, review their use and revoke credentials when an application or team no longer needs access.',
    points: ['Separate application credentials', 'Support revocation and replacement', 'Avoid exposing secrets in public examples'],
  },
  {
    eyebrow: 'Governance',
    title: 'Usage boundaries and visibility',
    description: 'Combine rate limits, usage quotas and call records to give teams clearer operating boundaries without describing internal implementation details.',
    points: ['Set practical usage limits', 'Review usage and errors', 'Investigate unexpected activity'],
  },
]

const operationsItems = [
  {
    title: 'Request rate control',
    description: 'Apply request limits that match the application scenario and expected traffic pattern.',
  },
  {
    title: 'Channel and error visibility',
    description: 'Use available channel status and error records to support troubleshooting and routing decisions.',
  },
  {
    title: 'Quota and cost awareness',
    description: 'Track available quota and usage records so teams can identify abnormal consumption earlier.',
  },
  {
    title: 'Deployment-specific operations',
    description: 'Caching, sessions, notifications and recovery procedures depend on the selected deployment and operating model.',
  },
]

/** 企业安全与服务说明页。 */
export function SecurityPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageHero
        eyebrow={t('Security and service')}
        title={t('Make enterprise AI access more controllable.')}
        description={t('Reduce operational risk with identity controls, separated credentials, usage limits and call visibility—while keeping deployment-specific commitments explicit.')}
        actions={(
          <>
            <LinkButton href="#security-overview" size="large">{t('Review security approach')}</LinkButton>
            <LinkButton href="/contact" variant="secondary" size="large">{t('Contact enterprise services')}</LinkButton>
          </>
        )}
        aside={(
          <div className="rounded-3xl border border-brand/20 bg-white/85 p-6 shadow-xl shadow-blue-950/5 backdrop-blur sm:p-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-brand uppercase">{t('Trust starts with clear boundaries')}</p>
            <div className="mt-6 space-y-4">
              {[
                'Who can access the platform?',
                'How are application credentials managed?',
                'What usage records are available?',
                'Which data policy applies to this deployment?',
              ].map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl bg-muted/70 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-foreground">{t(item)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      />

      <div id="security-overview">
        <TrustSection
          eyebrow="Access governance"
          title="Build access around people, applications and responsibilities."
          description="Security decisions are easier to operate when identity, credentials and usage boundaries are considered together."
          items={accessItems}
        />
      </div>

      <section className="border-y border-border bg-muted/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t('Credential lifecycle')}
            title={t('Keep enterprise and provider credentials in distinct roles.')}
            description={t('Calling applications use platform API keys, while authorized operators manage upstream provider credentials and channel configuration. Exact controls depend on the deployed edition and configuration.')}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              {
                label: 'For application teams',
                title: 'Use scoped, replaceable application credentials',
                description: 'Avoid sharing one credential across unrelated systems. Plan ownership, revocation and replacement before production rollout.',
                items: ['Assign a clear owner', 'Do not place keys in screenshots or client-side code', 'Revoke credentials that are no longer required'],
              },
              {
                label: 'For platform operators',
                title: 'Manage upstream access away from calling applications',
                description: 'Provider credentials belong in controlled platform configuration rather than application repositories or public documentation.',
                items: ['Restrict administrative access', 'Plan credential rotation with affected teams', 'Review call and error records after changes'],
              },
            ].map((card) => (
              <article key={card.title} className="rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-brand uppercase">{t(card.label)}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{t(card.title)}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{t(card.description)}</p>
                <ul className="mt-6 space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <EvidenceNotice
            eyebrow="Data handling"
            title="Confirm the data policy for your deployment before production use."
            description="Request and response recording, log retention, operator visibility, deletion procedures and model training terms can vary by deployment and upstream provider. Contact enterprise services for a written confirmation that matches your environment."
            points={[
              'Whether request bodies are recorded',
              'Whether response bodies are recorded',
              'Default retention and deletion options',
              'Which roles can view call records',
              'Whether any data is used for training',
              'Which upstream provider terms apply',
            ]}
            actions={(
              <>
                <LinkButton href="/contact">{t('Confirm deployment policy')}</LinkButton>
                <LinkButton href="/privacy-policy" variant="secondary">{t('View privacy policy')}</LinkButton>
              </>
            )}
          />
        </Container>
      </section>

      <TrustSection
        eyebrow="Operations"
        title="Operate with limits, visibility and clear escalation paths."
        description="The platform provides operational signals and controls that can support day-to-day AI service management. Availability and commitments must be confirmed for the selected deployment."
        items={operationsItems}
        columns={2}
        muted
      />

      <section className="py-20 sm:py-24">
        <Container>
          <EvidenceNotice
            eyebrow="Compliance statement"
            title="We publish only verifiable compliance information."
            description="This website does not claim certifications, audit results, filing status or service-level commitments without a confirmed subject, scope and validity period. Ask enterprise services for the evidence applicable to your deployment."
            actions={<LinkButton href="/contact">{t('Request applicable information')}</LinkButton>}
          />
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
