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
  firstName: '',
  lastName: '',
  image: '',
  email: '',
  phoneNumber: '',
  active: '',
  role: []
}

// ! start

const AddRoleDrawer = ({ open, toggle, data }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [userData, setUserData] = useState(dataTemplate)

  // ! image handling

  const [file, setFile] = useState('')
  const [localimage, setLoacalimage] = useState('')

  // todo her
  const [role, setrole] = useState([])

  const handleselectRole = value => {
    const updatedRoles = value?.map(role => {
      if (role?.enabled === false) {
        role.enabled = true
      }

      return role
    })

    setrole(updatedRoles)
  }

  const handleDelete = deletedRole => event => {
    event.preventDefault()
    const updatedRoles = role?.filter(r => r.roleId !== deletedRole.roleId)
    setrole(updatedRoles)
  }

  // todo  her

  useEffect(() => {
    if (file) {
      setLoacalimage(URL.createObjectURL(file))
    } else {
      setLoacalimage(`data:image/png;base64,${data?.image}`)
    }
  }, [file, data])

  // ! set initial data

  useEffect(() => {
    if (data) {
      setUserData({
        id: data.id,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        image: data.image || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        active: data.active || '',
        role: data.role || ''
      })
      setrole(data.role)
      setLoacalimage(`data:image/png;base64,${data.image}`)
    }
  }, [data])

  const onSubmit = () => {}

  //! validation errors
  useEffect(() => {
    const errorMsg = checkValidation(userData, role)
    setErrorMsg(errorMsg)
  }, [userData, role])

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
        <Typography variant='h5'>{t('Edit User')}</Typography>
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
          {localimage ? (
            <CustomAvatar src={localimage} sx={{ mr: 2.5, width: 80, height: 80 }} />
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
              label={t('First Name')}
              value={userData.firstName}
              onChange={e => setUserData(p => ({ ...p, firstName: e.target.value }))}
              placeholder='jhon'
            />
          </FormControl>
        </Box>

        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label={t('Last Name')}
              value={userData.lastName}
              onChange={e => setUserData(p => ({ ...p, lastName: e.target.value }))}
              placeholder='doe'
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

        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id='demo-multiple-chip-label'>{t('Role')}</InputLabel>
          <Select
            labelId='demo-multiple-chip-label'
            id='demo-multiple-chip'
            multiple
            value={role}
            onChange={e => handleselectRole(e.target.value)}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected?.map(value => (
                  <Chip
                    key={value}
                    label={t(value)}
                    onMouseDown={event => {
                      event.stopPropagation()
                    }}
                    onDelete={event => handleDelete(value)(event)}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {['admin', 'super admin', 'user', 'vendor', 'manager'].map(item => (
              <MenuItem key={item} value={item} disabled={role.some(role => role === item)}>
                {t(item)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {
          <Grid item sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Switch
                checked={userData.active || false}
                onChange={() => setUserData(p => ({ ...p, active: !p.active }))}
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
        }

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
