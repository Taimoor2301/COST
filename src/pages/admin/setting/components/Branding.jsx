import { Avatar, Card, Grid, Input, Button as Button, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { SliderPicker } from 'react-color'
import LoadingScreen from './LoadingScreen'
import useSettingsData from 'src/hooks/useSettingsData'

import { t } from 'i18next'

export default function SitesAndRoutes() {
  const [file, setFile] = useState('')
  const [imageUrl, setImageUrl] = useState('/logos/logo-white.png')
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }, [file])

  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>{t('Branding')}</h1>

      <section className='relative'>
        {loading && <LoadingScreen />}

        <div className='flex flex-col gap-3 justify-center items-center'>
          <div className='rounded-full overflow-hidden max-w-24 border aspect-square flex justify-center items-center p-2'>
            <img
              alt='Uploaded Logo'
              className='w-full h-full object-contain'
              src={selectedImage ? selectedImage : imageUrl}
            />
          </div>
          <Typography variant='body1'>{t('Default Logo')}</Typography>
          <label htmlFor='logo-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              type='file'
              onChange={e => setFile(e.target.files[0])}
              id='logo-upload'
              style={{ display: 'none' }}
            />
            <Button variant='contained' color='primary' component='span'>
              {t('Choose Logo')}
            </Button>
          </label>
        </div>
      </section>
      <Button variant='contained' color='primary' component='span' disabled={false}>
        {t('Save')}
      </Button>
    </Card>
  )
}
