// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { uploadImage } from 'src/utils/utils'
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
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  lastName: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required(),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  phoneNumber: yup
    .string()
    .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Phone number is not valid')
    .required('Phone number is required'),
  isActive: yup.boolean().required(),
  imageUrl: yup.string(),
  username: yup.string().min(3, 'Username is requires').required()
})

const defaultValues = {
  name: '',
  category: '',
  email: '',
  phoneNumber: '',
  isActive: true,
  password: '',
  confirmPassword: ''
}

const AddVendorDrawer = ({ open, toggle }) => {
  const queryClient = useQueryClient()
  const [file, setFile] = useState('')
  const [localImageUrl, setLoacalImageUrl] = useState('')

  useEffect(() => {
    if (file) {
      setLoacalImageUrl(URL.createObjectURL(file))
    } else {
      setLoacalImageUrl('')
    }
  }, [file])

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    // mutation.mutate(data)
    // console.log(data)
  }

  const handleClose = () => {
    setFile('')
    setLoacalImageUrl('')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{t('Add New Vendor')}</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
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

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <div className=' flex items-center justify-start gap-2 flex-col py-6'>
          {localImageUrl ? (
            <CustomAvatar src={localImageUrl} sx={{ mr: 2.5, width: 80, height: 80 }} />
          ) : (
            <CustomAvatar
              skin='light'
              sx={{
                mr: 2.5,
                width: 80,
                height: 80,
                fontWeight: 500,
                fontSize: theme => theme.typography.body1.fontSize
              }}
            ></CustomAvatar>
          )}

          <input type='file' id='userImageNew' className='hidden' onChange={e => setFile(e.target.files[0])} />

          <Button
            type='submit'
            variant='outlined'
            onClick={() => document.getElementById('userImageNew').click()}
            sx={{ mr: 3 }}
          >
            {t('Upload')}
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Name')}
                onChange={onChange}
                placeholder='jhon'
                error={Boolean(errors.name)}
                {...(errors.name && { helperText: errors.name.message })}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Email')}
                onChange={onChange}
                placeholder='example@email.com'
                error={Boolean(errors.email)}
                {...(errors.email && { helperText: errors.email.message })}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Password')}
                onChange={onChange}
                placeholder={t('Password')}
                error={Boolean(errors.password)}
                {...(errors.password && { helperText: errors.password.message })}
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Confirm Password')}
                onChange={onChange}
                placeholder={t('Confirm Password')}
                error={Boolean(errors.confirmPassword)}
                {...(errors.confirmPassword && { helperText: errors.confirmPassword.message })}
              />
            )}
          />
          <Controller
            name='phoneNumber'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                sx={{ mb: 4 }}
                label={t('Phone Number')}
                onChange={onChange}
                placeholder='+920011232323'
                error={Boolean(errors.phoneNumber)}
                {...(errors.phoneNumber && { helperText: errors.phoneNumber.message })}
              />
            )}
          />

          <Controller
            name='isActive'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <div className='flex items-center pb-5'>
                <Switch
                  checked={value}
                  label={t('Active')}
                  onChange={onChange}
                  error={errors.isActive}
                  {...(errors.isActive && { helperText: errors.isActive.message })}
                />
                <Typography sx={{ ml: 2 }}>{t('Active')}</Typography>
              </div>
            )}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='outlined' sx={{ mr: 3 }}>
              {t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddVendorDrawer
