import React, { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { Typography, Grid, Switch } from '@mui/material'
import Box from '@mui/material/Box'
import api from 'src/hooks/useApi'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { baseURL } from 'src/Constants/Constants'
import { useRouter } from 'next/router'
import { t } from 'i18next'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, obj => showErrors('Route Name', obj.value.length, obj.min))
    .required(),
  description: yup
    .string()
    .min(3, obj => showErrors('Route Description', obj.value.length, obj.min))
    .required(),
  color: yup.string().required('Color is required')
})

const defaultValues = {
  name: '',
  description: '',
  color: '#ffffff'
}

const AddRouteDrawer = ({ open, toggle }) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    handleAdd(data)
  }

  const router = useRouter()

  const s = t('Success')
  const f = t('Something went wrong')

  const handleAdd = async data => {
    const userToken = localStorage.getItem('accessToken')

    if (!userToken) {
      localStorage.clear()

      return router.replace('/login')
    }
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('color', data.selectedColor)
    formData.append('MarkerIcon', file)
    formData.append('description', data.description)

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`
    }

    try {
      setLoading(true)
      await fetch(`${baseURL}/routes/route.createrouteasync`, {
        method: 'POST',
        headers: headers,
        body: formData
      })
      toast.success(s)
      queryClient.invalidateQueries(['routes'])
      handleClose()
    } catch (error) {
      console.log(error)
      toggle()
      toast.error(f)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    toggle()
    reset()
    setFile('')
  }

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error('File size should less than 2MB')
      }

      setFile(file)
    }
  }

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor='right'
      variant='temporary'
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{t('Add Route')}</Typography>
        <IconButton
          onClick={handleClose}
          size='small'
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Route Name')}
                onChange={onChange}
                placeholder={t('Route Name')}
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />
          <Controller
            name='description'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Route Description')}
                onChange={onChange}
                placeholder={t('Route Description')}
                error={Boolean(errors.description)}
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />
          <Controller
            name='color'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <div className='flex flex-col gap-2 py-4'>
                <label htmlFor='route-add-color'>{t('Route Color')}</label>
                <input
                  className='border-none aspect-square'
                  type='color'
                  id='route-add-color'
                  value={value}
                  onChange={onChange}
                />
              </div>
            )}
          />
          <Box sx={{ mb: 4 }}>
            <div className=' flex flex-col gap-1 py-4'>
              <label htmlFor='add-route-icon'>{t('Route Icon')}</label>
              <input
                required
                className='file:border-none file:bg-gray-500 file:text-white bg-gray-200 file:p-2 rounded'
                type='file'
                accept='.svg, .png, .jpg, .jpeg'
                id='add-route-icon'
                onChange={e => handleFileChange(e)}
              />
            </div>
          </Box>
          <>
            <Grid item sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Switch
                  inputProps={{ 'aria-label': 'role-controlled' }}
                  sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '100px',
                    '--Switch-trackHeight': '45px'
                  }}
                />
                <Typography sx={{ ml: 2 }}>{t('Active')}</Typography>
              </Box>
            </Grid>
          </>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button disabled={loading} type='submit' variant='outlined' sx={{ mr: 3 }}>
              {loading ? t('Loading...') : t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </Box>
      </form>
    </Drawer>
  )
}

export default AddRouteDrawer
