import { Avatar, Button as SmallButton, Card, Input, Typography, TextField } from '@mui/material'
import { Button } from '@mui/base'

import React from 'react'

export default function Branding() {
  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>Sites & Routes</h1>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <Avatar
          alt='Uploaded Icon'
          src={''}
          sx={{ width: 100, height: 100, marginRight: '10px', textAlign: 'center' }}
        />
        <Typography variant='body1'>Default Marker Icon</Typography>
        <label htmlFor='marker-icon-upload' style={{ display: 'flex', alignItems: 'center' }}>
          <Input type='file' id='marker-icon-upload' style={{ display: 'none' }} />
          <SmallButton variant='contained' color='primary' component='span'>
            Choose Icon
          </SmallButton>
        </label>
        <TextField label='Checkin Vicinity' value={''} onChange={e => null} size='small' fullWidth />
        <Button
          type='submit'
          size='small'
          disabled={false}
          className='bg-[#24C6B7] w-full text-white py-[10px] px-[40px] rounded-[8px] disabled:bg-gray-500'
        >
          Save
        </Button>
      </div>
    </Card>
  )
}
