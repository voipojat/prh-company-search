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
  Tooltip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BusinessIcon from '@mui/icons-material/Business'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { PAGE_SIZE } from './api/prhApi'
import { getActiveName, getCompanyForm, getBusinessLine, getAddress, getWebsiteUrl } from './utils/companyUtils'
import { useCompanySearch } from './hooks/useCompanySearch'

const App = () => {
  const { t, i18n } = useTranslation()
  const {
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
  } = useCompanySearch()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
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
          <ToggleButton value="sv">SV</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {t('subtitle')}
        </Typography>
        <Tooltip title={t('subtitleTooltip')} arrow>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'help' }} />
        </Tooltip>
      </Box>

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
          slotProps={{
            htmlInput: { maxLength: 100 },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map(company => (
                      <TableRow key={company.businessId.value} hover sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {getActiveName(company)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={company.businessId.value} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>{getCompanyForm(company, i18n.language)}</TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {getBusinessLine(company, i18n.language)}
                          </Typography>
                        </TableCell>
                        <TableCell>{getAddress(company, i18n.language)}</TableCell>
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
                    onChange={(_, value) => {
                      handlePageChange(value)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
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
