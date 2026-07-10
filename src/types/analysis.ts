export type Priority = 'High' | 'Medium' | 'Low'
export type Stage = 'Discover' | 'Validate' | 'Design' | 'Build'
export type Decision = 'pending' | 'approved' | 'dismissed'

export interface Opportunity {
  id: string; title: string; problem: string; evidence: string; affectedTeam: string
  recommendedSolution: string; expectedOutcome: string; impactScore: number; effortScore: number
  riskLevel: 'High' | 'Medium' | 'Low'; estimatedTimeSaved: number; priority: Priority
  nextStep: string; stage: Stage; owner: string; decision: Decision
}
export interface RoadmapItem { period: '30 days' | '60 days' | '90 days'; title: string; items: string[] }
export interface Analysis {
  meetingSummary: string; businessGoals: string[]; painPoints: string[]; systemsMentioned: string[]
  automationOpportunities: Opportunity[]; risks: string[]; followUpQuestions: string[]; roadmap: RoadmapItem[]
}
