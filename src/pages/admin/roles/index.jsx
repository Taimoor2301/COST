import { useState } from 'react'

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
import { CircularProgress } from '@mui/material'
import { t } from 'i18next'
import AddRoleDrawer from './components/AddRoleDeawer'
import EditRoleDrawer from './components/EditRoleDrawer'
import AdminLayout from 'src/experiment/Adminlayout'

const RowOptions = ({ data }) => {
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
      handleRowOptionsClose()
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
          {t('Delete')}
        </MenuItem>
      </Menu>
    </>
  )
}

const Roles = () => {
  const columns = [
    {
      flex: 0.1,

      field: 'name',
      headerName: t('Role Name'),
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
      headerName: t('Role Description'),
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
  const [editOrderOpen, seteditOrderOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addRoleOpen, setAddRoleOpen] = useState(false)
  const [editRoleOpen, setEditRoleOpen] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(dummyRoles)

  // data holding states

  function handleSearch(value) {
    setSearchValue(value)
    setItemsToShow(dummyRoles.filter(el => el.name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <AdminLayout>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={searchValue}
              toggle={() => setAddRoleOpen(true)}
              handleFilter={val => handleSearch(val)}
            />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={
                itemsToShow.map(el => ({
                  ...el,
                  editFn: data => {
                    setItemToEdit(data)
                    setEditRoleOpen(true)
                  }
                })) || []
              }
              loadingOverlayComponent={<CircularProgress />}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>
        <AddRoleDrawer open={addRoleOpen} toggle={() => setAddRoleOpen(false)} />
        <EditRoleDrawer open={editRoleOpen} toggle={() => setEditRoleOpen(p => !p)} itemToEdit={itemToEdit} />
      </Grid>
    </AdminLayout>
  )
}

export default Roles

const dummyRoles = [
  {
    id: Math.random(),
    name: 'Manager',
    description: 'manager role',
    status: 'pending'
  },
  {
    id: Math.random(),
    name: 'Admin',
    description: 'admin role',
    status: 'completed'
  },
  {
    id: Math.random(),
    name: 'HR',
    description: 'HR role',
    status: 'canceled'
  }
]
