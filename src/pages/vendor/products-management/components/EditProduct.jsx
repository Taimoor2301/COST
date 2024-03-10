// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { FormControl } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import { t } from 'i18next'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const dataTemplate = {
  name: '',
  des: '',
  img: '',
  stock: ''
}

// ! start

const EditProduct = ({ open, toggle, data }) => {
  const [errorMsg, setErrorMsg] = useState('')
  const [productData, setproductData] = useState(dataTemplate)

  // ! image handling

  const [file, setFile] = useState('')
  const [localimg, setLoacalimg] = useState('')

  useEffect(() => {
    if (file) {
      setLoacalimg(URL.createObjectURL(file))
    } else {
      setLoacalimg(data?.img)
    }
  }, [file, data])

  useEffect(() => {
    if (data) {
      setproductData(data)
      setLoacalimg(data.img)
    }
  }, [data])

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
        <Typography variant='h5'>{t('Edit Product')}</Typography>
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
          {localimg ? (
            <CustomAvatar src={localimg} sx={{ mr: 2.5, width: 80, height: 80 }} />
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
              label={t('Product Name')}
              value={productData.name}
              onChange={e => setproductData(p => ({ ...p, name: e.target.value }))}
              placeholder='potatoes'
            />
          </FormControl>
        </Box>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label={t('Product Description')}
              value={productData.des}
              onChange={e => setproductData(p => ({ ...p, des: e.target.value }))}
              placeholder='potatoes'
            />
          </FormControl>
        </Box>
        <Box sx={{ my: 4 }}>
          <FormControl fullWidth>
            <CustomTextField
              fullWidth
              label={t('Stock')}
              value={productData.stock}
              onChange={e => setproductData(p => ({ ...p, stock: e.target.value }))}
              placeholder='potatoes'
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

export default EditProduct
