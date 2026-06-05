import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  InputAdornment,
  Link,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import { searchCompanies, PAGE_SIZE } from './api/prhApi'
import { sanitize, validate } from './validation/validation'
import { getActiveName, getCompanyForm, getBusinessLine, getAddress, getWebsiteUrl } from './utils/companyUtils'
import type { Company } from './types'

const App = () => {
  const { t, i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Company[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [lastQuery, setLastQuery] = useState('')

  const fetchPage = async (q: string, p: number, updateTotal = false) => {
    setLoading(true)
    setError(null)
    try {
      const data = await searchCompanies(q, p)
      setResults(data.companies)
      if (updateTotal) setTotal(data.totalResults)
    } catch (e) {
      const msg = e instanceof Error ? e.message : ''
      setError(msg ? t('errors.fetchFailed', { status: msg }) : t('errors.unknown'))
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
    setSearched(true)
    setPage(1)
    setLastQuery(cleaned)
    fetchPage(cleaned, 1, true)
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    fetchPage(lastQuery, value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.slice(0, 100))
    setValidationError(null)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight={700}>
            {t('title')}
          </Typography>
        </Box>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={i18n.language}
          onChange={(_, lng) => lng && i18n.changeLanguage(lng)}
        >
          <ToggleButton value="fi">FI</ToggleButton>
          <ToggleButton value="en">EN</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('subtitle')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('placeholder')}
          value={query}
          onChange={handleQueryChange}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          error={!!validationError}
          helperText={validationError}
          inputProps={{ maxLength: 100 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          startIcon={<SearchIcon />}
          sx={{ whiteSpace: 'nowrap', px: 3, alignSelf: 'flex-start', height: 56 }}
        >
          {t('search')}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && searched && !error && (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {total !== null ? t('results', { count: total }) : ''}
          </Typography>

          {results.length === 0 ? (
            <Alert severity="info">{t('noResults')}</Alert>
          ) : (
            <>
              <TableContainer component={Paper} elevation={2} sx={{ maxHeight: 600 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow sx={{ '& th': { fontWeight: 700, backgroundColor: 'primary.main', color: 'white' } }}>
                      <TableCell>{t('columns.name')}</TableCell>
                      <TableCell>{t('columns.businessId')}</TableCell>
                      <TableCell>{t('columns.companyForm')}</TableCell>
                      <TableCell>{t('columns.businessLine')}</TableCell>
                      <TableCell>{t('columns.address')}</TableCell>
                      <TableCell>{t('columns.website')}</TableCell>
                      <TableCell>{t('columns.registrationDate')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map(company => (
                      <TableRow key={company.businessId.value} hover sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {getActiveName(company)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={company.businessId.value} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>{getCompanyForm(company)}</TableCell>
                        <TableCell sx={{ maxWidth: 180 }}>
                          <Typography variant="body2" noWrap title={getBusinessLine(company)}>
                            {getBusinessLine(company)}
                          </Typography>
                        </TableCell>
                        <TableCell>{getAddress(company)}</TableCell>
                        <TableCell>
                          {company.website ? (
                            <Link
                              href={getWebsiteUrl(company.website.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {company.website.url}
                            </Link>
                          ) : '—'}
                        </TableCell>
                        <TableCell>{company.registrationDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {total !== null && total > PAGE_SIZE && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Pagination
                    count={Math.ceil(total / PAGE_SIZE)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default App
