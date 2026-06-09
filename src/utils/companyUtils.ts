import type { Company } from '../types'

const LANG_CODE: Record<string, string> = {
  fi: '1',
  sv: '2',
  en: '3',
}

const getLangCode = (lang: string): string => LANG_CODE[lang] ?? '1'

export const getActiveName = (company: Company): string => {
  const active = company.names.find(n => n.endDate === null)
  return active?.name ?? company.names[0]?.name ?? '—'
}

export const getCompanyForm = (company: Company, lang: string): string => {
  const active = company.companyForms.find(f => f.endDate === null) ?? company.companyForms[0]
  if (!active) return '—'
  const code = getLangCode(lang)
  const desc = active.descriptions.find(d => d.languageCode === code) ?? active.descriptions[0]
  return desc?.description ?? '—'
}

export const getBusinessLine = (company: Company, lang: string): string => {
  if (!company.mainBusinessLine) return '—'
  const code = getLangCode(lang)
  const desc = company.mainBusinessLine.descriptions.find(d => d.languageCode === code)
    ?? company.mainBusinessLine.descriptions[0]
  return desc?.description ?? '—'
}

export const getAddress = (company: Company, lang: string): string => {
  const addr = company.addresses[0]
  if (!addr) return '—'
  const code = getLangCode(lang)
  const city = (addr.postOffices.find(p => p.languageCode === code) ?? addr.postOffices[0])?.city ?? ''
  return [addr.street, addr.postCode, city].filter(Boolean).join(', ')
}

export const getWebsiteUrl = (url: string): string =>
  url.startsWith('http') ? url : `https://${url}`
