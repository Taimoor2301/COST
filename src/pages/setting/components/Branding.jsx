import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Input,
  Button as SmallButton,
  Typography
} from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React, { useEffect, useState } from 'react'
import { SliderPicker } from 'react-color'
import { Button } from '@mui/base'

export default function SitesAndRoutes() {
  const [SelectedColor, SetSelectedColor] = useState('#4e83d9')
  const [SelectedSecondaryColor, SetSelectedSecondaryColor] = useState('#8ebbe8')

  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>Branding</h1>

      <section className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='flex flex-col gap-2 justify-center items-center col-span-1'>
          <Avatar
            alt='Uploaded Logo'
            src={''}
            sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
          />
          <Typography variant='body1'>Default Logo</Typography>
          <label htmlFor='logo-upload' style={{ display: 'flex', alignItems: 'center' }}>
            <Input type='file' id='logo-upload' style={{ display: 'none' }} />
            <SmallButton variant='contained' color='primary' component='span'>
              Choose Logo
            </SmallButton>
          </label>
        </div>

        <div>
          <div>
            <div>
              <label htmlFor='colorPicker' style={{ fontSize: '14px', marginBottom: '10px', display: 'block' }}>
                Primary Color:
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
                Secondary Color:
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
        Save
      </Button>
    </Card>
  )
}
