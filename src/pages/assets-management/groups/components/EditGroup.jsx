// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { t } from 'i18next'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const EditGroupInfo = ({ open, toggle, data }) => {
  const queryClient = useQueryClient()

  const s = t('Success')
  const f = t('Something went wrong')

  const [name, setName] = useState(data?.name || '')
  const [description, setdescription] = useState(data?.description || '')

  const mutation = useMutation({
    mutationKey: ['groupInfoUpdate'],
    mutationFn: data => api.post('/group/group.updategroupasync', { ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups'])
      toggle()
      toast.success(s)
    },
    onError: err => {
      console.log(err)
      toggle()
      toast.error(f)
    }
  })

  const onSubmit = e => {
    e.preventDefault()

    const postData = {
      ...data,
      name,
      description
    }

    mutation.mutate(postData)
  }

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
        <Typography variant='h5'>{t('Edit Group')}</Typography>
        <IconButton
          size='small'
          onClick={toggle}
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
        <form onSubmit={onSubmit} className=' flex flex-col gap-5'>
          <CustomTextField
            fullWidth
            required
            value={name}
            sx={{ mb: 4 }}
            label={t('Name')}
            onChange={e => setName(e.target.value)}
            placeholder='name'
          />

          <CustomTextField
            fullWidth
            required
            value={description}
            sx={{ mb: 4 }}
            label={t('Description')}
            onChange={e => setdescription(e.target.value)}
            placeholder='description'
          />

          <Box sx={{ display: 'flex', alignItems: 'center', paddingBlock: '10px' }}>
            <Button type='submit' disabled={mutation.isPending} variant='outlined' sx={{ mr: 3 }}>
              {mutation.isPending ? t('Loading...') : t('Submit')}
            </Button>
            <Button variant='tonal' color='secondary' onClick={toggle}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default EditGroupInfo
