import { Card, TextField, Typography, Select, InputLabel, MenuItem } from '@mui/material'
import { Button } from '@mui/base'
import React, { useEffect, useState } from 'react'
import { timeZones } from 'src/utils/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import LoadingScreen from './LoadingScreen'
import useSettingsData from 'src/hooks/useSettingsData'
import { t } from 'i18next'

export default function CompanyInfo() {
  const [errMsg, setErrMsg] = useState('')

  const [data, setData] = useState({
    companyName: '',
    officialPhoneNumber: '',
    officialEmail: '',
    timeZone: ''
  })

  const mutation = useMutation({
    mutationKey: ['companyInfoUpdate'],
    mutationFn: postData => api.post('/settings/settings.createsystemsettingsasync', postData),
    onError: e => {
      console.log(e)
      toast.error('Something went wrong')
    },
    onSuccess: () => {
      fetchData()
      toast.success('Updated Successfully')
    }
  })

  const { values, loading } = useSettingsData('Company Info')

  useEffect(() => {
    if (values) {
      setData(values)
    }
  }, [values])

  function handleSubmit(e) {
    e.preventDefault()
    const isDataInvalid = checkValidation()
    if (!isDataInvalid) {
      mutation.mutate({ group: 'Company Info', name: 'Company Info', locked: true, payload: JSON.stringify(data) })
    }
  }

  function checkValidation() {
    if (data.companyName.length < 3) {
      setErrMsg('Company name must be atleast 3 characters long')

      return true
    } else if (/^\+(?:[0-9] ?){6,14}[0-9]$/.test(data.officialPhoneNumber) === false) {
      setErrMsg('Please enter a valid phone number')

      return true
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.officialEmail) === false) {
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
      <h1 className='w-full text-center font-medium text-lg'>{t('Company Information')}</h1>
      {errMsg && (
        <Typography color={'red'} textAlign={'center'}>
          {errMsg}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 relative'>
        {loading && <LoadingScreen />}{' '}
        <TextField
          label={t('Company Name')}
          value={data.companyName}
          onChange={e => setData(p => ({ ...p, companyName: e.target.value }))}
          size='small'
          fullWidth
        />
        <TextField
          label={t('Official Phone Number')}
          value={data.officialPhoneNumber}
          onChange={e => setData(p => ({ ...p, officialPhoneNumber: e.target.value }))}
          size='small'
          fullWidth
        />
        <TextField
          label={t('Official Email')}
          typeof='email'
          value={data.officialEmail}
          onChange={e => setData(p => ({ ...p, officialEmail: e.target.value }))}
          size='small'
          fullWidth
        />
        <InputLabel>{t('Time Zone')}</InputLabel>
        <Select value={data.timeZone} onChange={e => setData(p => ({ ...p, timeZone: e.target.value }))}>
          {timeZones.map((zone, i) => (
            <MenuItem key={i} value={zone.text}>
              {zone.text}
            </MenuItem>
          ))}
        </Select>
        <Button
          type='submit'
          size='small'
          disabled={mutation.isPending}
          className='bg-[#24C6B7] text-white py-[10px] px-[40px] rounded-[8px] disabled:bg-gray-500'
        >
          {t('Save')}
        </Button>
      </form>
    </Card>
  )
}
