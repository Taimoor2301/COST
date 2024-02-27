import { Avatar, Card, Grid, Input, Button as SmallButton, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { SliderPicker } from 'react-color'
import { Button } from '@mui/base'
import LoadingScreen from './LoadingScreen'
import useSettingsData from 'src/hooks/useSettingsData'

import { t } from 'i18next'

export default function SitesAndRoutes() {
  const [SelectedColor, SetSelectedColor] = useState('#4e83d9')
  const [SelectedSecondaryColor, SetSelectedSecondaryColor] = useState('#8ebbe8')
  const [file, setFile] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  const { values, loading } = useSettingsData('Branding')

  useEffect(() => {
    if (values) {
      SetSelectedColor(values?.primaryColor)
      SetSelectedSecondaryColor(values?.secondaryColor)
      setImageUrl(values?.logo)
    }
  }, [values])

  useEffect(() => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }, [file])

  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>{t('Branding')}</h1>

      <section className='grid grid-cols-1 lg:grid-cols-2 relative'>
        {loading && <LoadingScreen />}

        <div className='flex flex-col gap-2 justify-center items-center col-span-1'>
          <Avatar
            alt='Uploaded Logo'
            src={selectedImage ? selectedImage : `data:image/png;base64,${imageUrl}`}
            sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
          />
          <Typography variant='body1'>{t('Default Logo')}</Typography>
          <label htmlFor='logo-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              type='file'
              onChange={e => setFile(e.target.files[0])}
              id='logo-upload'
              style={{ display: 'none' }}
            />
            <SmallButton variant='contained' color='primary' component='span'>
              {t('Choose Logo')}
            </SmallButton>
          </label>
        </div>

        <div>
          <div>
            <div>
              <label htmlFor='colorPicker' style={{ fontSize: '14px', marginBottom: '10px', display: 'block' }}>
                {t('Primary Color:')}
              </label>
              <SliderPicker
                color={SelectedColor}
                onChange={color => SetSelectedColor(color.hex)}
                styles={{ default: { wrap: { marginBottom: '10px' } } }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '25px',
                  height: '25px',
                  backgroundColor: SelectedColor,
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px'
                }}
              ></div>
              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{SelectedColor}</span>
            </div>
          </div>
          <div>
            <Grid>
              <label htmlFor='colorPicker' style={{ fontSize: '14px', marginBottom: '10px', display: 'block' }}>
                {t('Secondary Color:')}
              </label>
              <SliderPicker
                color={SelectedSecondaryColor}
                onChange={color => SetSelectedSecondaryColor(color.hex)}
                styles={{ default: { wrap: { marginBottom: '10px' } } }}
              />
            </Grid>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '25px',
                  height: '25px',
                  backgroundColor: SelectedSecondaryColor,
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px'
                }}
              ></div>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{SelectedSecondaryColor}</span>
            </div>
          </div>
        </div>
      </section>
      <Button
        type='submit'
        size='small'
        disabled={false}
        className='bg-[#24C6B7] text-white py-[10px] px-[40px] rounded-[8px] disabled:bg-gray-500'
      >
        {t('Save')}
      </Button>
    </Card>
  )
}
