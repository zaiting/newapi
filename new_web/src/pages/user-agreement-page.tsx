import { LegalDocumentPage } from '@/features/trust/legal-document-page'

/** 展示当前部署配置的用户协议。 */
export function UserAgreementPage() {
  return (
    <LegalDocumentPage
      title="User Agreement"
      description="Review the terms configured for using this deployment. The configured document remains the source of truth for service conditions."
      endpoint="/api/user-agreement"
      emptyMessage="The administrator has not configured a user agreement for this deployment yet."
    />
  )
}
