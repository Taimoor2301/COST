// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Table Components Imports
import TableHeader from './components/TableHeader'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import { CircularProgress } from '@mui/material'
import AddRoleDrawer from './components/AddRoleDeawer'
import EditRoleDrawer from './components/EditRoleDrawer'
import toast from 'react-hot-toast'
import { t } from 'i18next'

const RowOptions = ({ data }) => {
  const queryClient = useQueryClient()

  const s = t('Deleted Successfully')
  const f = t('Delete Request Failed')

  const mutaion = useMutation({
    mutationKey: ['deleteRole'],
    mutationFn: id => api.delete('/roles/roles.deleteroleasync', { params: { id } }),
    onError: error => {
      console.log(error)
      toast.error(f)
    },
    onSuccess: () => {
      handleRowOptionsClose()
      toast.success(s)
      queryClient.invalidateQueries(['roles'])
    }
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  function handleDelete() {
    const confirm = window.confirm(`Delate Role: ${data.name}`)
    if (confirm) {
      mutaion.mutate(data.id)
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
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          {mutaion.isPending ? t('Deleting...') : t('Delete')}
        </MenuItem>
      </Menu>
    </>
  )
}

const Roles = () => {
  const columns = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: t('Name'),
      renderCell: ({ row }) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'description',
      minWidth: 170,
      headerName: t('Description'),
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.description}
            </Typography>
          </Box>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: t('Status'),
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
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('Actions'),
      renderCell: ({ row }) => <RowOptions data={row} />
    }
  ]

  //  controller State
  const [searchValue, setSearchValue] = useState('')
  const [addRoleOpen, setAddRoleOpen] = useState(false)
  const [editRoleOpen, setEditRoleOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // data holding states
  const [allRoles, setAllRoles] = useState([])
  const [rolesToShow, setRolesToShow] = useState([])

  // initial data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['allRoles'],
    queryFn: () => api.get('/roles/roles.getlistofrolesasync')
  })

  // set data on initial load
  useEffect(() => {
    if (data) {
      setAllRoles(data.data.data)
      setRolesToShow(data.data.data)
    }
  }, [data])

  // handle case insensitive search
  useEffect(() => {
    setRolesToShow(allRoles?.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue, allRoles])

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
        {isError ? (
          <div className='w-full my-5 text-center'>{t('Something went wrong! Please try again.')}</div>
        ) : (
          <Card>
            <TableHeader
              value={searchValue}
              handleFilter={val => setSearchValue(val)}
              toggle={() => setAddRoleOpen(p => !p)}
            />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={
                rolesToShow?.map(el => ({
                  ...el,
                  editFn: data => {
                    setItemToEdit(data)
                    setEditRoleOpen(true)
                  }
                })) || []
              }
              loading={dLoading}
              loadingOverlayComponent={<CircularProgress />}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        )}
      </Grid>

      <AddRoleDrawer open={addRoleOpen} toggle={() => setAddRoleOpen(p => !p)} />
      <EditRoleDrawer
        open={editRoleOpen}
        toggle={() => setEditRoleOpen(p => !p)}
        itemToEdit={itemToEdit}
        refetch={refetch}
      />
    </Grid>
  )
}

export default Roles
