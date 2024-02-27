// ** MUI Components
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { t } from 'i18next'

// ** Demo Components
import { Card, CardActions, CardContent, FormControl, Input, InputLabel, TextField } from '@mui/material'
import { Button } from '@mui/base'
import Password from './components/Password'
import { useAuth } from 'src/hooks/useAuth'
import { useEffect, useState } from 'react'
import { checkPersonalUpdate, uploadImage } from 'src/utils/utils'
import { useMutation } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

const UserProfile = ({ data }) => {
  const { user } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
  const [imageUrl, setImageUrl] = useState(user?.imageUrl || '')

  // error
  const [errMsg, setErrMsg] = useState('')

  // image
  const [file, setFile] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  useEffect(() => {
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }, [file])

  // mutation

  const s = t('Success')
  const f = t('Something went wrong')

  const mutation = useMutation({
    mutationKey: ['updateUserPersonal'],
    mutationFn: async () => {
      let base64

      if (selectedImage) {
        base64 = await uploadImage(file)
      }

      await api.put('/personal/personal.updatecurrentuserdetailasync', {
        firstName,
        lastName,
        email,
        phoneNumber,
        imageUrl: base64 || imageUrl,
        id: user.id,
        deleteCurrentImage: false
      })
    },
    onSuccess: () => {
      toast.success(s)
    },
    onError: e => {
      toast.error(f)
    }
  })

  const deleteImage = useMutation({
    mutationKey: ['deleteUserImage'],
    mutationFn: async () => {
      await api.put('/personal/personal.updatecurrentuserdetailasync', {
        firstName,
        lastName,
        email,
        phoneNumber,
        imageUrl: '',
        id: user.id,
        deleteCurrentImage: true
      })
    },
    onSuccess: () => {
      setImageUrl('')
      toast.success(s)
    },
    onError: e => {
      toast.error(f)
    }
  })

  function handleSubmit() {
    const errMsg = checkPersonalUpdate({ firstName, lastName, email, phoneNumber })

    if (errMsg) {
      return setErrMsg(errMsg)
    }

    setErrMsg('')
    mutation.mutate()
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h4'>{t('Profile Information')}</Typography>
          <Typography sx={{ fontSize: 16, mt: 4 }} color='text.secondary' gutterBottom>
            {t("Update your account's profile information and email address.")}
          </Typography>

          {errMsg && (
            <Typography sx={{ fontSize: 16, mt: 4 }} color='red' gutterBottom>
              {errMsg}
            </Typography>
          )}

          <Grid container sx={{ mb: 4, mt: 5 }}>
            <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
              <Avatar
                alt='Full Name'
                src={selectedImage ? selectedImage : `data:image/png;base64,${imageUrl}`}
                sx={{ width: 80, height: 80 }}
              />
            </StyledBadge>
            <Grid item xs={12} style={{ marginTop: '20px' }} className='flex gap-3 flex-col md:flex-row text-center'>
              <input
                accept='image/*'
                onChange={e => setFile(e.target.files[0])}
                style={{ display: 'none' }}
                id='upload-photo'
                type='file'
              />

              <label
                htmlFor='upload-photo'
                style={{
                  backgroundColor: '#EAEBEC',
                  border: 'none',
                  padding: '10px 20px',
                  color: '#BFC0C3',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '12px'
                }}
              >
                <Button
                  variant='contained'
                  component='span'
                  sx={{ border: 0 }}
                  style={{
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {t('Select A New Photo')}
                </Button>
              </label>
              <Button
                variant='contained'
                component='span'
                onClick={() => deleteImage.mutate()}
                disabled={deleteImage.isPending}
                sx={{ border: 0 }}
                style={{
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: '#D34C4D',
                  padding: '10px 20px',
                  color: 'white',
                  marginLeft: '10px'
                }}
              >
                {t('Delete Photo')}
              </Button>
            </Grid>
          </Grid>

          <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
            <TextField
              label={t('First Name')}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              size='small'
              fullWidth
            />
            <TextField
              label={t('Last Name')}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
            <TextField
              label={t('Email')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
            <TextField
              label={t('Phone Number')}
              value={phoneNumber}
              placeholder='+96655455454'
              onChange={e => setPhoneNumber(e.target.value)}
              size='small'
              fullWidth
              sx={{ width: '100%', marginTop: '2rem' }}
            />
          </FormControl>
        </CardContent>

        <CardActions style={{ justifyContent: 'end' }}>
          <Button
            size='small'
            disabled={mutation.isPending}
            onClick={handleSubmit}
            className='bg-[#24C6B7] text-white py-[10px] px-[40px] rounded-[8px] text-[12px] disabled:bg-gray-500'
          >
            {t('Save')}
          </Button>
        </CardActions>
      </Card>

      <Password />
    </>
  )
}

export default UserProfile
