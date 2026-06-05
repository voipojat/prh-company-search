import type { Company } from '../types'

const FI = '1'

export const getActiveName = (company: Company): string => {
  const active = company.names.find(n => n.endDate === null)
  return active?.name ?? company.names[0]?.name ?? '—'
}

export const getCompanyForm = (company: Company): string => {
  const active = company.companyForms.find(f => f.endDate === null) ?? company.companyForms[0]
  if (!active) return '—'
  const desc = active.descriptions.find(d => d.languageCode === FI) ?? active.descriptions[0]
  return desc?.description ?? '—'
}

export const getBusinessLine = (company: Company): string => {
  if (!company.mainBusinessLine) return '—'
  const desc = company.mainBusinessLine.descriptions.find(d => d.languageCode === FI)
    ?? company.mainBusinessLine.descriptions[0]
  return desc?.description ?? '—'
}

export const getAddress = (company: Company): string => {
  const addr = company.addresses[0]
  if (!addr) return '—'
  const city = (addr.postOffices.find(p => p.languageCode === FI) ?? addr.postOffices[0])?.city ?? ''
  return [addr.street, addr.postCode, city].filter(Boolean).join(', ')
}

export const getWebsiteUrl = (url: string): string =>
  url.startsWith('http') ? url : `https://${url}`
