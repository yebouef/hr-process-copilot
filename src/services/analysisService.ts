import { demoAnalysis, demoScenarios } from '../data/demo'
import type { Analysis } from '../types/analysis'

export interface AnalysisService { analyze(transcript: string): Promise<Analysis> }
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
export class MockAnalysisService implements AnalysisService {
  async analyze(transcript: string): Promise<Analysis> {
    await wait(1200)
    if (transcript.trim().length < 80) throw new Error('Add a longer transcript so the analysis has enough context.')
    const selected = demoScenarios.find(item => item.transcript.trim() === transcript.trim())
    return structuredClone(selected?.analysis ?? demoAnalysis)
  }
}
export const analysisService: AnalysisService = new MockAnalysisService()
