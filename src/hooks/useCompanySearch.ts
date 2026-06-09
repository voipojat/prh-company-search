import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { searchCompanies } from '../api/prhApi'
import { sanitize, validate } from '../validation/validation'
import type { Company } from '../types'

export const useCompanySearch = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Company[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [lastQuery, setLastQuery] = useState('')
  const searched = lastQuery !== ''

  const buildErrorMessage = (e: unknown): string => {
    const msg = e instanceof Error ? e.message : ''
    return msg ? t('errors.fetchFailed', { status: msg }) : t('errors.unknown')
  }

  const fetch = async (q: string, p: number, updateTotal: boolean) => {
    setLoading(true)
    setError(null)
    try {
      const data = await searchCompanies(q, p)
      setResults(data.companies)
      if (updateTotal) setTotal(data.totalResults)
    } catch (e) {
      setError(buildErrorMessage(e))
      setResults([])
      if (updateTotal) setTotal(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    const cleaned = sanitize(query)
    const err = validate(cleaned)
    if (err) {
      setValidationError(t(`errors.${err}`))
      return
    }
    setValidationError(null)
    setPage(1)
    setLastQuery(cleaned)
    fetch(cleaned, 1, true)
  }

  const handlePageChange = (p: number) => {
    setPage(p)
    fetch(lastQuery, p, false)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.slice(0, 100))
    setValidationError(null)
  }

  return {
    query,
    results,
    total,
    loading,
    error,
    validationError,
    searched,
    page,
    handleSearch,
    handlePageChange,
    handleQueryChange,
  }
}
