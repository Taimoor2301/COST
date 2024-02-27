// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomChip from 'src/@core/components/mui/chip'
import MenuItem from '@mui/material/MenuItem'
import { t } from 'i18next'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

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
    .min(3, obj => showErrors('Name', obj.value.length, obj.min))
    .required(),
  description: yup
    .string()
    .min(3, obj => showErrors('Description', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  name: '',
  description: ''
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const AddRoleDrawer = ({ open, toggle }) => {
  const queryClient = useQueryClient()

  const s = t('Success')
  const f = t('Something went wrong')

  const { data: sites } = useQuery({ queryKey: ['sites'], queryFn: () => api.get('/sites/sites.getallsitesasync') })

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users/users.getlistofallusersasync')
  })

  const { data: questinneries } = useQuery({
    queryKey: ['questinneries'],
    queryFn: () => api.get('/questionnaire/questionnaire.getallquestionnaireasync')
  })

  const [selectedSites, setSelectedSites] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectedQue, setSelectedQue] = useState([])

  const mutation = useMutation({
    mutationKey: ['addGroup'],
    mutationFn: data => api.post('/group/group.creategroupasync', { ...data }),
    onSuccess: data => {
      queryClient.invalidateQueries(['groups'])
      handleClose()
      toast.success(s)
    },
    onError: errors => {
      toggle()
      toast.error(errors.response.data.messages[0] || f)
    },
    retry: 0
  })

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
    const postData = {
      ...data,
      userIds: selectedUsers.map(u => u.id),
      siteIds: selectedSites.map(u => u.id),
      questionnaireIds: selectedQue.map(u => u.id)
    }

    // console.log(postData)

    mutation.mutate(postData)
  }

  const handleClose = () => {
    setSelectedQue([])
    setSelectedUsers([])
    setSelectedSites([])
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
        <Typography variant='h5'>{t('Add Group')}</Typography>
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
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-5'>
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
                placeholder={t('Name')}
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
                label={t('Description')}
                onChange={onChange}
                placeholder={t('Description')}
                error={Boolean(errors.description)}
                {...(errors.description && { helperText: errors.description.message })}
              />
            )}
          />

          <CustomTextField
            select
            fullWidth
            label={t('Sites')}
            id='select-multiple-chip'
            SelectProps={{
              MenuProps,
              multiple: true,
              value: selectedSites,
              onChange: e => setSelectedSites(e.target.value),
              renderValue: selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map(value => (
                    <CustomChip key={value.id} label={value.name} sx={{ m: 0.75 }} skin='light' color='primary' />
                  ))}
                </Box>
              )
            }}
          >
            {' '}
            <MenuItem value='' disabled>
              Select Site
            </MenuItem>
            {sites?.data?.data?.data?.map(site => (
              <MenuItem key={site.id} value={site}>
                {site.name}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            label={t('Users')}
            id='select-multiple-chip'
            SelectProps={{
              MenuProps,
              multiple: true,
              value: selectedUsers,
              onChange: e => setSelectedUsers(e.target.value),
              renderValue: selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map(value => (
                    <CustomChip
                      key={value.id}
                      label={value.firstName + ' ' + value.lastName}
                      sx={{ m: 0.75 }}
                      skin='light'
                      color='primary'
                    />
                  ))}
                </Box>
              )
            }}
          >
            {' '}
            <MenuItem value='' disabled>
              Select Users
            </MenuItem>
            {users?.data?.data?.map(user => (
              <MenuItem key={user.id} value={user}>
                {user.firstName + ' ' + user.lastName}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            select
            fullWidth
            label={t('Questionneries')}
            id='select-multiple-chip'
            SelectProps={{
              MenuProps,
              multiple: true,
              value: selectedQue,
              onChange: e => setSelectedQue(e.target.value),
              renderValue: selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {selected.map(value => (
                    <CustomChip key={value.id} label={value.name} sx={{ m: 0.75 }} skin='light' color='primary' />
                  ))}
                </Box>
              )
            }}
          >
            {' '}
            <MenuItem value='' disabled>
              Select Questionneries
            </MenuItem>
            {questinneries?.data?.data?.data?.map(q => (
              <MenuItem key={q.id} value={q}>
                {q.name}
              </MenuItem>
            ))}
          </CustomTextField>

          <Box sx={{ display: 'flex', alignItems: 'center', paddingBlock: '10px' }}>
            <Button type='submit' disabled={mutation.isPending} variant='outlined' sx={{ mr: 3 }}>
              {mutation.isPending ? t('Loading...') : t('Submit')}
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

export default AddRoleDrawer
