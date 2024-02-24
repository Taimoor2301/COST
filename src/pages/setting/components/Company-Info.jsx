import { Card, TextField, Typography, Select, InputLabel, MenuItem } from '@mui/material'
import { Button } from '@mui/base'
import React, { useState } from 'react'
import { timeZones } from 'src/utils/utils'

export default function CompanyInfo() {
  const [data, setData] = useState({
    companyName: '',
    companyPhoneNumber: '',
    companyEmail: '',
    timeZone: ''
  })
  const [errMsg, setErrMsg] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const isDataInvalid = checkValidation()
    if (!isDataInvalid) {
      console.log(data)
    }
  }

  function checkValidation() {
    if (data.companyName.length < 3) {
      setErrMsg('Company name must be atleast 3 characters long')

      return true
    } else if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(data.companyPhoneNumber) === false) {
      setErrMsg('Please enter a valid phone number')

      return true
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.companyEmail) === false) {
      setErrMsg('Please enter a valid email')

      return true
    } else if (!data.timeZone) {
      setErrMsg('Time Zone is required')

      return true
    } else {
      setErrMsg('')

      return false
    }
  }

  return (
    <Card className='p-5 flex flex-col gap-3 justify-between'>
      <h1 className='w-full text-center font-medium text-lg'>Company Information</h1>
      {errMsg && (
        <Typography color={'red'} textAlign={'center'}>
          {errMsg}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        {' '}
        <TextField
          label='Company Name'
          value={data.companyName}
          onChange={e => setData(p => ({ ...p, companyName: e.target.value }))}
          size='small'
          fullWidth
        />
        <TextField
          label='Official Phone Number'
          value={data.companyPhoneNumber}
          onChange={e => setData(p => ({ ...p, companyPhoneNumber: e.target.value }))}
          size='small'
          fullWidth
        />
        <TextField
          label='Official Email'
          typeof='email'
          value={data.companyEmail}
          onChange={e => setData(p => ({ ...p, companyEmail: e.target.value }))}
          size='small'
          fullWidth
        />
        <InputLabel>Time Zone</InputLabel>
        <Select>
          {timeZones.map((zone, i) => (
            <MenuItem key={i} value={zone.text}>
              {zone.text}
            </MenuItem>
          ))}
        </Select>
        <Button
          type='submit'
          size='small'
          disabled={false}
          className='bg-[#24C6B7] text-white py-[10px] px-[40px] rounded-[8px] disabled:bg-gray-500'
        >
          Save
        </Button>
      </form>
    </Card>
  )
}
