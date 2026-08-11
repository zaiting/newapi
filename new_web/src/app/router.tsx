import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'

import { MarketingLayout } from '@/layouts/marketing-layout'
import { AboutPage } from '@/pages/about-page'
import { AuthPortalPage } from '@/pages/auth-portal-page'
import { ContactPage } from '@/pages/contact-page'
import { CustomersPage } from '@/pages/customers-page'
import { HomePage } from '@/pages/home-page'
import { IndustriesPage } from '@/pages/industries-page'
import { IndustryDetailPage } from '@/pages/industry-detail-page'
import { ModelPricingDetailPage } from '@/pages/model-pricing-detail-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { PricingPage } from '@/pages/pricing-page'
import { PrivacyPolicyPage } from '@/pages/privacy-policy-page'
import { ProductPage } from '@/pages/product-page'
import { RankingsPage } from '@/pages/rankings-page'
import { ResourcesPage } from '@/pages/resources-page'
import { SecurityPage } from '@/pages/security-page'
import { ServiceErrorPage } from '@/pages/service-error-page'
import { SolutionDetailPage } from '@/pages/solution-detail-page'
import { SolutionsPage } from '@/pages/solutions-page'
import { UserAgreementPage } from '@/pages/user-agreement-page'

const rootRoute = createRootRoute({
  component: MarketingLayout,
  notFoundComponent: NotFoundPage,
})

const routes = [
  createRoute({ getParentRoute: () => rootRoute, path: '/', component: HomePage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/product', component: ProductPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/solutions', component: SolutionsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/solutions/$solutionId', component: SolutionDetailPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/industries', component: IndustriesPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/industries/$industryId', component: IndustryDetailPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/pricing', component: PricingPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/pricing/$modelId', component: ModelPricingDetailPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/security', component: SecurityPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/customers', component: CustomersPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: ContactPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/resources', component: ResourcesPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/resources/model-rankings', component: RankingsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/rankings', component: RankingsPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/privacy-policy', component: PrivacyPolicyPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/user-agreement', component: UserAgreementPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/sign-in', component: AuthPortalPage }),
  createRoute({ getParentRoute: () => rootRoute, path: '/500', component: () => <ServiceErrorPage statusCode={500} /> }),
  createRoute({ getParentRoute: () => rootRoute, path: '/503', component: () => <ServiceErrorPage statusCode={503} /> }),
]

const routeTree = rootRoute.addChildren(routes)

/** 企业官网路由实例。 */
export const router = createRouter({
  routeTree,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
