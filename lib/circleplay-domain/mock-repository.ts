import type { DomainRepository, DomainState } from './types'

const initialState: DomainState = { users: [], customers: [], resellers: [], affiliates: [], ledger: [], audits: [], tests: [], liveViewing: [], settings: { salesUrl: '' } }
let state: DomainState = structuredClone(initialState)
export const mockRepository: DomainRepository = { async getState() { return structuredClone(state) }, async saveState(next) { state = structuredClone(next) } }
export function resetMockRepository() { state = structuredClone(initialState) }
