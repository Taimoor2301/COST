import React, { useState } from 'react'
import { Card, CardActions, CardContent, FormControl, Input, InputLabel, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/base'
import { useMutation } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { t } from 'i18next'

export default function Password() {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const [type, setType] = useState('password')

  const s = t('Success')
  const f = t('Something went wrong')

  const mutation = useMutation({
    mutationKey: ['changeCurrentUserPassword'],
    mutationFn: () => api.put('/personal/personal.changepasswordasync', { password, newPassword, confirmNewPassword }),
    onSuccess: () => {
      toast.success(s)
      setPassword('')
      setConfirmNewPassword('')
      setNewPassword('')
    },
    onError: err => {
      toast.error(err?.response?.data?.messages[0] || f)
    }
  })

  function changePassword() {
    if (newPassword !== confirmNewPassword) {
      return setErrorMsg('Password are not matching.')
    } else if (newPassword.length < 6) {
      setErrorMsg('Password must be alteast 6 characters long')
    } else {
      setErrorMsg('')
      mutation.mutate()
    }
  }

  return (
    <Card style={{ marginTop: '2rem' }}>
      <CardContent>
        <Typography variant='h4'>{t('Update Password')}</Typography>
        <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
          {t('Ensure your account is using a long, random password to stay secure.')}
        </Typography>
        {errorMsg && (
          <Typography sx={{ fontSize: 16, mt: 4 }} color='red' gutterBottom>
            {errorMsg}
          </Typography>
        )}

        <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
          <TextField
            type={type}
            value={password}
            onChange={e => setPassword(e.target.value)}
            label={t('Current Password')}
            size='small'
            fullWidth
          />
          <TextField
            type={type}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            label={t('New Password')}
            size='small'
            fullWidth
            style={{ marginTop: '2rem' }}
          />
          <TextField
            type={type}
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            label={t('Confirm Password')}
            size='small'
            fullWidth
            style={{ marginTop: '2rem' }}
          />
        </FormControl>
      </CardContent>
      <CardActions style={{ justifyContent: 'end' }}>
        <Button
          size='small'
          onClick={() => setType(p => (p === 'text' ? 'password' : 'text'))}
          className='bg-[#24C6B7] text-white py-[10px] px-[40px] rounded-[8px] text-[12px] disabled:bg-gray-500'
        >
          {type === 'text' ? t('Hide Password') : t('Show Password')}
        </Button>
        <Button
          size='small'
          disabled={mutation.isPending}
          onClick={changePassword}
          className='bg-[#24C6B7] text-white py-[10px] px-[40px] rounded-[8px] text-[12px] disabled:bg-gray-500'
        >
          {t('Save')}
        </Button>
      </CardActions>
    </Card>
  )
}
