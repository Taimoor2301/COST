import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'

import TableHeader from './components/TableHeader'
import AddUserDrawer from './components/AddUserDrawer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'
import EditUserDrawer from './components/EditUserDrawer'
import Tooltip from '@mui/material/Tooltip'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import toast from 'react-hot-toast'
import UserModal from './components/UserModal'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import useAPI from 'src/hooks/useNewApi'

const RowOptions = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const api = useAPI()

  // query

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: id => api.post(`/users/user.deleteuserasync`, {}, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      handleRowOptionsClose()
      toast.success('User Deleted')
    },
    onError: errors => {
      console.log(errors)
      handleRowOptionsClose()
      toast.error('Request Failed')
    }
  })

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = id => {
    const confirm = window.confirm(t('Confirm delete user') + ` : ${data?.firstName + ' ' + data.lastName}`)
    if (confirm) {
      mutation.mutate(id)
    } else {
      handleRowOptionsClose()
    }
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
            data.editFn(data)
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          {t('Edit')}
        </MenuItem>
        <MenuItem onClick={() => handleDelete(data.id)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          {mutation.isPending ? t('Deleting') : t('Delete')}
        </MenuItem>
      </Menu>
    </>
  )
}

const UserList = ({ apiData }) => {
  const { t } = useTranslation()
  const api = useAPI()

  const columns = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'firstName',
      headerName: t('User Name'),
      renderCell: ({ row }) => <UserModal row={row} />
    },
    {
      flex: 0.15,
      field: 'isActive',
      minWidth: 170,
      headerName: t('Active'),
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.isActive ? t('Active') : t('Inactive')}
            color={row.isActive ? 'success' : 'warning'}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('Verified'),
      field: 'emailConfirmed',
      renderCell: ({ row }) => {
        return (
          <Typography
            noWrap
            sx={{
              color: row.emailConfirmed ? theme => theme.palette.success.main : theme => theme.palette.error.main,
              marginLeft: '15px'
            }}
          >
            <Icon icon={row.emailConfirmed ? 'tabler:shield-check' : 'tabler:shield-x'} fontSize={24} />
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 190,
      field: 'roles[0].roleName',
      headerName: t('Role'),
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.roles.map((role, index) => (
              <Tooltip key={index} title={row?.roles?.map(r => r.roleName).join(', ')}>
                <span style={{ display: 'inline' }}>
                  {t(role.roleName)}
                  {index < row.roles.length - 1 && ', '}
                </span>
              </Tooltip>
            ))}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('Actions'),
      renderCell: ({ row }) => <RowOptions data={row} />
    }
  ]
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [usersToShow, setUsersToShow] = useState([])
  const [itemToEdit, setItemToEdit] = useState(null)
  const [openEditUser, setOpenEditUser] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users/users.getlistofallusersasync')
  })

  useEffect(() => {
    if (data) {
      setAllUsers(data.data.data)
      setUsersToShow(data.data.data)
    }
  }, [data])

  // handle case insensitive search
  useEffect(() => {
    setUsersToShow(
      allUsers?.filter(
        el =>
          el.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          el.lastName.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }, [searchValue, allUsers])

  // loading

  const [dLoading, setDLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      setDLoading(true)
    } else {
      setTimeout(() => {
        setDLoading(false)
      }, 0)
    }
  }, [isLoading])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={searchValue}
            handleFilter={val => setSearchValue(val)}
            toggle={() => setAddUserOpen(p => !p)}
          />

          {isError ? (
            <div className='text-center w-full py-5'>{t('Something went wrong! Please try again.')}</div>
          ) : (
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={
                usersToShow?.map(el => ({
                  ...el,
                  editFn: data => {
                    setItemToEdit(data)
                    setOpenEditUser(true)
                  }
                })) || []
              }
              columns={columns}
              loading={dLoading}
              loadingOverlayComponent={<CircularProgress />}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          )}
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={() => setAddUserOpen(p => !p)} />
      <EditUserDrawer open={openEditUser} toggle={() => setOpenEditUser(p => !p)} data={itemToEdit} />
    </Grid>
  )
}

export default UserList
