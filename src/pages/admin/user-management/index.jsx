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
import UserModal from './components/UserModal'
import EditUserDrawer from './components/EditUserDrawer'
import AddUserDrawer from './components/AddUserDrawer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Custom Table Components Imports
import TableHeader from './components/TableHeader'
import { CircularProgress, Tooltip } from '@mui/material'
import { t } from 'i18next'
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

const UserList = () => {
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
      field: 'active',
      minWidth: 170,
      headerName: t('Active'),
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.ctive ? t('Active') : t('Inactive')}
            color={row.ctive ? 'success' : 'warning'}
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
      field: 'roles[0]',
      headerName: t('Role'),
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.role.map((role, index) => (
              <Tooltip key={index} title={row.role.join(', ')}>
                <span style={{ display: 'inline' }}>
                  {t(role)}
                  {index < row.role.length - 1 && ', '}
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

  //  controller State
  const [searchValue, setSearchValue] = useState('')
  const [itemToEdit, setItemToEdit] = useState()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addUserOpen, setAdduserOpen] = useState(false)
  const [editUserOpen, seteditUserOpen] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(dummyUsers)

  // data holding states

  function handleSearch(value) {
    setSearchValue(value)
    setItemsToShow(dummyUsers.filter(u => u.firstName.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <AdminLayout>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={searchValue}
              handleFilter={val => handleSearch(val)}
              toggle={() => setAdduserOpen(true)}
            />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={
                itemsToShow.map(el => ({
                  ...el,
                  editFn: data => {
                    setItemToEdit(data)
                    seteditUserOpen(true)
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
        <EditUserDrawer open={editUserOpen} toggle={() => seteditUserOpen(p => !p)} data={itemToEdit} />
        <AddUserDrawer open={addUserOpen} toggle={() => setAdduserOpen(false)} />
      </Grid>
    </AdminLayout>
  )
}

export default UserList

const dummyUsers = [
  {
    id: Math.random(),
    firstName: 'Taimoor',
    lastName: 'Ali',
    active: true,
    email: 'taimoorali4214@gmail.com',
    role: ['admin', 'user'],
    image: ''
  },
  {
    id: Math.random(),
    firstName: 'Mudassar',
    lastName: 'Ali',
    active: true,
    email: 'mudassar@gmail.com',
    role: ['admin', 'user'],
    image: ''
  },
  {
    id: Math.random(),
    firstName: 'Sana',
    lastName: 'Iqbal',
    active: true,
    email: 'sanaiqbal@gmail.com',
    role: ['admin', 'user'],
    image: ''
  },
  {
    id: Math.random(),
    firstName: 'Kashif',
    lastName: 'Raja',
    active: true,
    email: 'kashifraja@gmail.com',
    role: ['admin', 'user'],
    image: ''
  },
  {
    id: Math.random(),
    firstName: 'Ahmed',
    lastName: 'Subhani',
    active: true,
    email: 'ahemdsubhani@gmail.com',
    role: ['admin', 'user'],
    image: ''
  }
]
