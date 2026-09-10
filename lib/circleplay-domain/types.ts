export type Role = 'ADMIN' | 'VICE_ADMIN' | 'SUPPORT' | 'RESELLER' | 'AFFILIATE' | 'CUSTOMER'
export type CustomerSource = 'DIRECT' | 'AFFILIATE' | 'RESELLER'
export type ResellerModel = 'CREDIT_PACK' | 'MONTHLY_CREDITS' | 'CUSTOMER_LIMIT'
export type PlanId = 'MONTHLY' | 'QUARTERLY' | 'SEMESTER' | 'ANNUAL'
export type AccountStatus = 'ACTIVE' | 'DISABLED' | 'EXPIRED'
export type LedgerType = 'PURCHASE' | 'MONTHLY_CREDIT' | 'CUSTOMER_CREATION' | 'PLAN_UPGRADE' | 'PLAN_DOWNGRADE_REFUND' | 'ADMIN_ADD' | 'ADMIN_REMOVE' | 'TRUST_RENEWAL' | 'OTHER'

export type User = { id: string; name: string; email: string; phone?: string; cpf?: string; role: Role; status: AccountStatus; resellerModel?: ResellerModel; createdAt: string }
export type Customer = { id: string; userId: string; name: string; username: string; plan: PlanId; customerSource: CustomerSource; affiliateId?: string; resellerId?: string; createdAt: string; expiresAt: string; status: AccountStatus; passwordHash?: string; lastPaymentConfirmedAt?: string }
export type Reseller = { userId: string; model: ResellerModel; creditBalance: number; monthlyCreditAmount?: number; customerLimit?: number; cycleUsed: number; cycleStartedAt: string; contactName: string; phone: string; email: string; cpf: string }
export type Affiliate = { userId: string; affiliateId: string; link: string; materials: string[]; testIds: string[] }
export type CreditLedgerEntry = { id: string; resellerId: string; type: LedgerType; quantity: number; balanceBefore: number; balanceAfter: number; reason: string; customerId?: string; actorUserId: string; createdAt: string }
export type AuditEntry = { id: string; actorUserId: string; action: string; targetType: string; targetId: string; details: Record<string, unknown>; createdAt: string }
export type TestAccess = { id: string; customerId?: string; affiliateId?: string; createdAt: string; expiresAt: string; status: 'ACTIVE' | 'EXPIRED' }
export type LiveViewing = { userId: string; contentId: string; contentType: 'movie' | 'series' | 'channel'; title: string; startedAt: string; lastHeartbeat: string; device: string; status: 'PLAYING' | 'PAUSED' | 'STOPPED' }
export type ExpirationState = { expired: boolean; daysRemaining: number; warning?: 'TWO_DAYS' | 'ONE_DAY'; renewalUrl?: string; reseller?: Pick<Reseller, 'contactName' | 'phone'>; blocking: boolean }
export type DomainState = { users: User[]; customers: Customer[]; resellers: Reseller[]; affiliates: Affiliate[]; ledger: CreditLedgerEntry[]; audits: AuditEntry[]; tests: TestAccess[]; liveViewing: LiveViewing[]; settings: { salesUrl: string } }
export type DomainRepository = { getState(): Promise<DomainState>; saveState(state: DomainState): Promise<void> }
export const nowIso = () => new Date().toISOString()
export const addDays = (date: string, days: number) => new Date(new Date(date).getTime() + days * 86400000).toISOString()
export const addMonths = (date: string, months: number) => { const next = new Date(date); next.setMonth(next.getMonth() + months); return next.toISOString() }
export const planMonths: Record<PlanId, number> = { MONTHLY: 1, QUARTERLY: 3, SEMESTER: 6, ANNUAL: 12 }
export const planCredits: Record<PlanId, number> = { MONTHLY: 1, QUARTERLY: 3, SEMESTER: 6, ANNUAL: 12 }
export const planLabels: Record<PlanId, string> = { MONTHLY: 'Mensal', QUARTERLY: 'Trimestral', SEMESTER: 'Semestral', ANNUAL: 'Anual' }
export const roles: Role[] = ['ADMIN', 'VICE_ADMIN', 'SUPPORT', 'RESELLER', 'AFFILIATE', 'CUSTOMER']

export function createPasswordHashPlaceholder(password: string) { if (!password) throw new Error('Senha obrigatória'); return `server-hash-required:${password.length}` }
