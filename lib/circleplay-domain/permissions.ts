import type { Role } from './types'
export type Permission = 'users:read' | 'customers:read' | 'customers:write' | 'customers:disable' | 'customers:delete-request' | 'resellers:read' | 'resellers:write' | 'affiliates:read' | 'credits:write' | 'ledger:read' | 'settings:write' | 'roles:promote' | 'live:read' | 'audit:read'
export const rolePermissions: Record<Role, Permission[]> = {
  ADMIN: ['users:read','customers:read','customers:write','customers:disable','customers:delete-request','resellers:read','resellers:write','affiliates:read','credits:write','ledger:read','settings:write','roles:promote','live:read','audit:read'],
  VICE_ADMIN: ['users:read','customers:read','customers:write','customers:disable','resellers:read','affiliates:read','ledger:read','live:read','audit:read'],
  SUPPORT: ['users:read','customers:read','customers:disable','customers:delete-request','resellers:read','affiliates:read','live:read'],
  RESELLER: ['customers:read','customers:write'], AFFILIATE: ['customers:read'], CUSTOMER: []
}
export function can(role: Role, permission: Permission) { return rolePermissions[role].includes(permission) }
export function assertPermission(role: Role, permission: Permission) { if (!can(role, permission)) throw new Error(`Permissão negada: ${permission}`) }
