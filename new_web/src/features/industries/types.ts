export interface IndustryContentItem {
  title: string
  description: string
}

export interface IndustryCapabilityMapping {
  workflowNeed: string
  platformCapability: string
}

export interface IndustryExample {
  title: string
  context: string
  steps: string[]
  outcome: string
}

export interface IndustryAction {
  label: string
  href: string
}

export interface IndustryContent {
  slug: string
  name: string
  overview: {
    summary: string
    commonScenarios: string[]
    workflowEntry: string
    governanceCapabilities: string[]
  }
  heroTitle: string
  heroDescription: string
  challenges: IndustryContentItem[]
  scenarios: IndustryContentItem[]
  architecture: {
    label: string
    nodes: string[]
  }
  capabilityMappings: IndustryCapabilityMapping[]
  boundaries: string[]
  example: IndustryExample
  implementation: IndustryContentItem[]
  cta: {
    eyebrow: string
    title: string
    description: string
    primary: IndustryAction
    secondary: IndustryAction
  }
}
