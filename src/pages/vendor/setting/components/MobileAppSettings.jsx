import { Card, TextField, InputLabel, Select, MenuItem, Button } from '@mui/material'
import React from 'react'
import { t } from 'i18next'

export default function MobileAppSettings() {
  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>{t('Mobile App Settings')}</h1>

      <div className='w-full flex flex-col gap-2'>
        <InputLabel id='demo-simple-select-label'>{t('Platform')}</InputLabel>
        <Select>
          <MenuItem value={10}>Android</MenuItem>
          <MenuItem value={20}>IOS</MenuItem>
        </Select>

        <TextField
          label='Build Number'
          id='outlined-size-small'
          size='small'
          fullWidth
          sx={{ width: '100%', marginTop: '0rem' }}
        />
      </div>

      <Button variant='contained' color='primary' component='span' fullWidth disabled={false}>
        {t('Save')}
      </Button>
    </Card>
  )
}
