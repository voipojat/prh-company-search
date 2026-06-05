import type { SearchResult } from '../types'
import { isBusinessId } from '../validation/validation'

const BASE = 'https://avoindata.prh.fi/opendata-ytj-api/v3'
export const PAGE_SIZE = 100

export const searchCompanies = async (query: string, page = 1): Promise<SearchResult> => {
  const params = new URLSearchParams(
    isBusinessId(query)
      ? { businessId: query }
      : { name: query, page: String(page) }
  )
  const res = await fetch(`${BASE}/companies?${params}`)
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}
