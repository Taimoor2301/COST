// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FormControl } from '@mui/material'
import { Grid, Switch } from '@mui/material'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { t } from 'i18next'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const AddRoleDrawer = ({ open, toggle, itemToEdit }) => {
  const [delay, setDelay] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name)
      setDescription(itemToEdit.description)
      setIsActive(itemToEdit.isActive)
    }
  }, [itemToEdit])

  const onSubmit = () => {
    null
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
        <Typography variant='h5'>{t('Edit Role')}</Typography>
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
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth required>
            <CustomTextField
              fullWidth
              label={t('Role Name')}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('Role Name')}
            />
          </FormControl>
        </Box>

        <Box sx={{ my: 4 }}>
          <FormControl fullWidth required>
            <CustomTextField
              fullWidth
              label={t('Role Description')}
              value={description}
              multiline
              rows={4}
              onChange={e => setDescription(e.target.value)}
              placeholder={t('Role Description')}
            />
          </FormControl>
        </Box>

        <Grid item sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Switch
              checked={isActive}
              onChange={() => setIsActive(p => !p)}
              inputProps={{ 'aria-label': 'role-controlled' }}
              sx={{
                '--Switch-thumbSize': '27px',
                '--Switch-trackWidth': '100px',
                '--Switch-trackHeight': '45px'
              }}
            />
            <Typography sx={{ ml: 2 }}>{isActive ? t('Active') : t('InActive')}</Typography>
          </Box>
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type='submit'
            onClick={onSubmit}
            disabled={description?.length < 3 || name?.length < 3 || !itemToEdit?.id || delay}
            variant='outlined'
            sx={{ mr: 3 }}
          >
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
