import { LegalDocumentPage } from '@/features/trust/legal-document-page'

/** 展示当前部署配置的隐私政策。 */
export function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      title="Privacy Policy"
      description="Review how this deployment describes personal information, service data and related rights. The configured document remains the source of truth."
      endpoint="/api/privacy-policy"
      emptyMessage="The administrator has not configured a privacy policy for this deployment yet."
    />
  )
}
