import { FinalCTA } from '@/components/marketing/final-cta'
import { FaqSection } from '@/features/home/faq-section'
import { HeroSection } from '@/features/home/hero-section'
import { ModelEcosystemSection } from '@/features/home/model-ecosystem-section'
import { PainPointsSection } from '@/features/home/pain-points-section'
import { PricingGuideSection } from '@/features/home/pricing-guide-section'
import { ProductPreviewSection } from '@/features/home/product-preview-section'
import { ScenariosSection } from '@/features/home/scenarios-section'
import { SecurityServiceSection } from '@/features/home/security-service-section'
import { SolutionsSection } from '@/features/home/solutions-section'
import { ValueSection } from '@/features/home/value-section'
import { WorkflowSection } from '@/features/home/workflow-section'

/** 企业官网首页，集中展示平台定位、产品能力与客户转化入口。 */
export function HomePage() {
  return (
    <div>
      <HeroSection />
      <ModelEcosystemSection />
      <PainPointsSection />
      <ValueSection />
      <WorkflowSection />
      <SolutionsSection />
      <ProductPreviewSection />
      <SecurityServiceSection />
      <ScenariosSection />
      <PricingGuideSection />
      <FaqSection />
      <FinalCTA />
    </div>
  )
}
