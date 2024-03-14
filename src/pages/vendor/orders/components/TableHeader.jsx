// ** MUI Imports
import Box from '@mui/material/Box'
import { t } from 'i18next'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import { Typography } from '@mui/material'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Typography sx={{ fontSize: '1.125rem', fontWeight: '500' }}>{t('Orders List')}</Typography>

      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder={t('Search orders')}
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
