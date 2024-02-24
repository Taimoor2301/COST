import { Card, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'
import { Button } from '@mui/base'

export default function MobileAppSettings() {
  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>Mobile App Settings</h1>

      <div className='w-full flex flex-col gap-2'>
        <InputLabel id='demo-simple-select-label'>Platform</InputLabel>
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
