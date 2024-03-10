import { Avatar, Button as Button, Card, Input, Typography, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

import React from 'react'
import LoadingScreen from './LoadingScreen'
import useSettingsData from 'src/hooks/useSettingsData'
import { t } from 'i18next'

export default function Branding() {
  const [checkinViscinity, setCheckinViscinity] = useState('')
  const [file, setFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }, [file])

  const { values, loading } = useSettingsData('SitesAndRoutes')

  useEffect(() => {
    if (values) {
      setCheckinViscinity(values?.checkinViscinity)
      setImageUrl(values?.defaultMarkerIcon)
    }
  }, [values])

  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>{t('Sites & Routes')}</h1>
      <div className='flex flex-col gap-2 justify-center items-center relative'>
        {loading && <LoadingScreen />}
        <Avatar
          alt='Uploaded Icon'
          src={selectedImage ? selectedImage : `data:image/png;base64,${imageUrl}`}
          sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
        />
        <Typography variant='body1'>{t('Default Marker Icon')}</Typography>
        <label htmlFor='marker-icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            type='file'
            id='marker-icon-upload'
            onChange={e => setFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <Button variant='contained' color='primary' component='span'>
            {t('Choose Icon')}
          </Button>
        </label>
        <TextField
          label={t('Checkin Vicinity')}
          value={checkinViscinity}
          onChange={e => setCheckinViscinity(e.target.value)}
          size='small'
          fullWidth
        />
        <Button variant='contained' color='primary' component='span' fullWidth disabled={false}>
          {t('Save')}
        </Button>
      </div>
    </Card>
  )
}
