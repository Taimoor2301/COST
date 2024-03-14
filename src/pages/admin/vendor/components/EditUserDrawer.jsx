// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FormControl } from '@mui/material'
import { Grid, Switch } from '@mui/material'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import { checkValidation, uploadImage } from '../../../../utils/utils'
import { t } from 'i18next'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const dataTemplate = {
  nmae: '',
  email: '',
  phoneNumber: '',
  isActive: ''
}

// ! start

const AddRoleDrawer = ({ open, toggle, data }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [userData, setUserData] = useState(dataTemplate)
  const queryClient = useQueryClient()

  // ! image handling

  const [file, setFile] = useState('')
  const [localImageUrl, setLoacalImageUrl] = useState('')

  useEffect(() => {
    if (file) {
      setLoacalImageUrl(URL.createObjectURL(file))
    } else {
      setLoacalImageUrl(`data:image/png;base64,${data?.imageUrl}`)
    }
  }, [file, data])

  // ! set initial data

  useEffect(() => {
    if (data) {
      setUserData({
        id: data.id,
        name: data.name || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        isActive: data.isActive || ''
      })

      // setLoacalImageUrl(`data:image/png;base64,${data.imageUrl}`)
    }
  }, [data])

  const onSubmit = () => {
    null
  }

  // //! validation errors
  // useEffect(() => {
  //   const errorMsg = checkValidation(userData, role)
  //   setErrorMsg(errorMsg)
  // }, [userData, role])

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{t('Edit Vendor')}</Typography>
        <IconButton
          size='small'
          onClick={() => toggle()}
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

          <input type='file' id='userImageEdit' className='hidden' onChange={e => setFile(e.target.files[0])} />

          <Button
            type='submit'
            variant='outlined'
            onClick={() => document.getElementById('userImageEdit').click()}
            sx={{ mr: 3 }}
          >
            {t('Upload')}
          </Button>
        </div>
      </Box>

      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label={t('Name')}
              value={userData.name}
              onChange={e => setUserData(p => ({ ...p, name: e.target.value }))}
              placeholder='jhon'
            />
          </FormControl>
        </Box>

        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label={t('Email')}
              value={userData.email}
              onChange={e => setUserData(p => ({ ...p, email: e.target.value }))}
              placeholder='jhondoe@gmail.com'
            />
          </FormControl>
        </Box>

        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label={t('Phone Number')}
              value={userData.phoneNumber}
              onChange={e => setUserData(p => ({ ...p, phoneNumber: e.target.value }))}
              placeholder={t('Phone Number')}
            />
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' onClick={onSubmit} variant='outlined' sx={{ mr: 3 }} disabled={Boolean(errorMsg)}>
            {t('Submit')}
          </Button>
          <Button variant='tonal' color='secondary' onClick={toggle}>
            {t('Cancel')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddRoleDrawer
