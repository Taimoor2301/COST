import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { t } from 'i18next'

const TableHeader = props => {
  const { handleFilter, toggle, value } = props

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
        justifyContent: 'end'
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder={t('Search Routes')}
          onChange={e => handleFilter(e.target.value)}
        />

        <Button onClick={toggle} variant='outlined' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {t('Add New Routes')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
