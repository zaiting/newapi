export interface ContentItem {
  title: string
  description: string
}

export interface CapabilityMapping {
  businessNeed: string
  platformRole: string
}

export interface SolutionArchitecture {
  label: string
  nodes: string[]
}

export interface SolutionAction {
  label: string
  href: string
}

export interface SolutionContent {
  slug: string
  name: string
  overview: {
    businessGoal: string
    customerProblem: string
    recommendedCapabilities: string[]
    implementationSummary: string
    suitableFor: string
  }
  heroTitle: string
  heroDescription: string
  challenges: ContentItem[]
  architecture: SolutionArchitecture
  capabilityMappings: CapabilityMapping[]
  scenarios: ContentItem[]
  implementation: ContentItem[]
  boundaries: string[]
  cta: {
    eyebrow: string
    title: string
    description: string
    primary: SolutionAction
    secondary: SolutionAction
  }
}
