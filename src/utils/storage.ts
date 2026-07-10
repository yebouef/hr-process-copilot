import type { Analysis } from '../types/analysis'
const KEY = 'hr-process-copilot-analysis-v1'
export const loadAnalysis = (): Analysis | null => { try { const value = localStorage.getItem(KEY); return value ? JSON.parse(value) : null } catch { return null } }
export const saveAnalysis = (analysis: Analysis) => localStorage.setItem(KEY, JSON.stringify(analysis))
export const clearAnalysis = () => localStorage.removeItem(KEY)
