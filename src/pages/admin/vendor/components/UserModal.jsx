import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import TableRow from '@mui/material/TableRow'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'

// import RowOptions from 'src/views/apps/user/userManagement/list/RowOptions'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const renderClient = row => {
  if (row.imageUrl) {
    return <CustomAvatar src={`data:image/png;base64,${row.imageUrl}`} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.firstName ? row.firstName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const ViewUserModel = ({ row }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [deleteopen, setdeleteOpen] = useState(false)
  const handleClickdeleteOpen = () => setdeleteOpen(true)
  const handleClose = () => setdeleteOpen(false)
  const router = useRouter()

  const { t } = useTranslation()

  const handleClickOpen = () => {
    setOpen(!open)
  }

  // ! mutation
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: id => api.post(`/users/user.deleteuserasync`, {}, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      toast.success('User Deleted')
      handleClose()
      handleClickOpen()
    },
    onError: errors => {
      toast.error('Request Failed')
      console.log(errors)
      setdeleteOpen(false)
    }
  })

  function handleDelete() {
    // mutation.mutate(row.id)
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(row)}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        <Typography
          noWrap
          onClick={() => router.push('/admin/vendor-details')}
          sx={{
            fontWeight: 500,
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {row.name}
        </Typography>
        <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
          {row.email}
        </Typography>
      </Box>
    </Box>
  )
}

export default ViewUserModel
