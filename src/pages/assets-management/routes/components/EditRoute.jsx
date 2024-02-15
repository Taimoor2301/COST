import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import { Typography, Grid, Switch } from '@mui/material'
import Box from '@mui/material/Box'
import { ChromePicker } from 'react-color'
import Card from '@mui/material/Card'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'
import { baseURL } from 'src/Constants/Constants'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const AddRouteDrawer = ({ open, toggle, row }) => {
  const queryClient = useQueryClient()
  const [selectedColor, setSelectedColor] = useState('black')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const { t } = useTranslation()
  const [file, setFile] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleSwitchChange = () => {
    setIsActive(prevIsActiveRole => !prevIsActiveRole)
  }

  const handleColorChange = color => {
    setSelectedColor(color.hex)
  }

  const router = useRouter()

  const handleupdate = async () => {
    const userToken = localStorage.getItem('accessToken')
    if (!userToken) {
      localStorage.clear()

      return router.replace('/login')
    }
    let formData = new FormData()
    formData.append('Id', row?.id)
    formData.append('name', name)
    formData.append('color', selectedColor)
    formData.append('MarkerIcon', file)
    formData.append('description', description)
    formData.append('isActive', isActive)
    try {
      setIsLoading(true)

      await fetch(`${baseURL}/routes/route.updaterouteasync`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: formData
      })

      handleClose()
      handlereset()
      queryClient.invalidateQueries(['routes'])
      toast.success('Success')
    } catch (error) {
      console.error('Error:', error.message)
      toast.error('Unsuccessful')
    } finally {
      setIsLoading(false)
    }
  }

  const handlereset = () => {
    setname('')
    setdescription('')
    setSelectedColor('#ffffff')
    setFile(new File([], ''))
    setIsActive(false)
  }

  const handleClose = () => {
    toggle()

    // handlereset()
  }

  React.useEffect(() => {
    if (row) {
      setname(row?.name)
      setdescription(row?.description)
      setSelectedColor(row?.color)
      setIsActive(row?.isActive)
    } else {
      handlereset()
    }
  }, [row])

  const handleImageChange = event => {
    const file = event.target.files[0]

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size should not exceed 2 MB')

        return
      } else {
        setFile(file)
      }
    }
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
        <Typography variant='h5'>{t('Update Route')}</Typography>
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
        <CustomTextField
          fullWidth
          value={name}
          sx={{ mb: 4 }}
          label={t('Route Name')}
          onChange={e => setname(e.target.value)}
          placeholder='Route A'
        />

        <CustomTextField
          fullWidth
          value={description}
          multiline
          rows={2}
          maxRows={4}
          sx={{ mb: 4 }}
          label={t('Description')}
          onChange={e => setdescription(e.target.value)}
          placeholder='Route A'
        />

        <div>
          <Box sx={{ mb: 4 }}>
            <CustomTextField
              fullWidth
              label={t('Color codes')}
              type='color'
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
            />
          </Box>
          {showColorPicker && <ChromePicker color={selectedColor} onChange={color => handleColorChange(color)} />}
        </div>

        <Box sx={{ mb: 4 }}>
          <Card>
            <Typography variant='h5' sx={{ padding: '15px' }}>
              {t('Marker Icon')}
            </Typography>

            <Box sx={{ mb: 2, padding: '15px' }}>
              <input
                required
                className='file:border-none file:bg-gray-500 file:text-white bg-gray-200 file:p-2 rounded'
                type='file'
                accept='.svg, .png, .jpg, .jpeg'
                id='add-route-icon'
                onChange={handleImageChange}
              />
            </Box>
            <Box sx={{ mb: 4, padding: '15px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ height: '100px', width: '100px' }}>
                <img
                  src={
                    file instanceof Blob
                      ? URL.createObjectURL(file)
                      : (file && `data:image/png;base64,${file}`) || undefined
                  }
                  alt='abc'
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </Box>
          </Card>
        </Box>

        <>
          <Grid item sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Switch
                checked={isActive}
                onChange={handleSwitchChange}
                inputProps={{ 'aria-label': 'role-controlled' }}
                sx={{
                  '--Switch-thumbSize': '27px',
                  '--Switch-trackWidth': '100px',
                  '--Switch-trackHeight': '45px'
                }}
              />
              <Typography sx={{ ml: 2 }}>{isActive ? 'Active' : 'InActive'}</Typography>
            </Box>
          </Grid>
        </>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading ? (
            <CircularProgress style={{ display: 'flex', justifyContent: 'center', flex: 1 }} />
          ) : (
            <>
              <Button type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleupdate}>
                {t('Update')}
              </Button>
              <Button variant='tonal' color='secondary' onClick={handleClose}>
                {t('Cancel')}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default AddRouteDrawer
