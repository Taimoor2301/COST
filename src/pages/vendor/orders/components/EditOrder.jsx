// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FormControl } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import { t } from 'i18next'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const EditOrder = ({ open, toggle, itemToEdit }) => {
  const [name, setName] = useState('')
  const [product, setProduct] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.orderFrom)
      setProduct(itemToEdit.product)
      setStatus(itemToEdit.status)
      setDueDate(itemToEdit.dueDate)
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
        <Typography variant='h5'>{t('Edit Order')}</Typography>
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
              label={t('Order From')}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={t('Name')}
            />
          </FormControl>
        </Box>

        <Box sx={{ my: 4 }}>
          <FormControl fullWidth required>
            <CustomTextField
              fullWidth
              label={t('Product')}
              value={product}
              multiline
              onChange={e => setDescription(e.target.value)}
              placeholder={t('product')}
            />
          </FormControl>
        </Box>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth required>
            <CustomTextField
              fullWidth
              label={t('Due Date')}
              value={dueDate}
              multiline
              onChange={e => setDueDate(e.target.value)}
              placeholder={t('due date')}
            />
          </FormControl>
        </Box>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth required>
            <CustomTextField
              fullWidth
              label={t('Status')}
              value={status}
              multiline
              onChange={e => setStatus(e.target.value)}
              placeholder={t('status')}
            />
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button disabled={false} variant='outlined' sx={{ mr: 3 }} color='success'>
            {t('Mark as Complete')}
          </Button>
          <Button variant='outlined' color='error'>
            {t('Cancel Order')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button type='submit' onClick={onSubmit} disabled={false} variant='contained' sx={{ mr: 3 }}>
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

export default EditOrder
