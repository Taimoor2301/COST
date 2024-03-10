// ** React Imports
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
import EditOrder from './components/EditOrder'
import { t } from 'i18next'
import VendorLayout from 'src/experiment/VendorLayout'

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

const Orders = () => {
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
      field: 'product',
      minWidth: 170,
      headerName: t('Product'),
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.product}
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
            label={row.status}
            color={row.status === 'completed' ? 'success' : row.status === 'canceled' ? 'error' : 'warning'}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.15,
      field: 'date',
      minWidth: 170,
      headerName: t('Place on'),
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.date}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'dueDate',
      minWidth: 170,
      headerName: t('Due Date'),
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.dueDate}
            </Typography>
          </Box>
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

  // data holding states

  function handleSearch(value) {
    null
  }

  return (
    <VendorLayout>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={searchValue} handleFilter={val => handleSearch(val)} />
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={
                dummyOrders.map(el => ({
                  ...el,
                  editFn: data => {
                    setItemToEdit(data)
                    seteditOrderOpen(true)
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

        <EditOrder open={editOrderOpen} toggle={() => seteditOrderOpen(p => !p)} itemToEdit={itemToEdit} />
      </Grid>
    </VendorLayout>
  )
}

export default Orders

const dummyOrders = [
  {
    id: Math.random(),
    name: 'Order 1',
    product: 'Potatoes',
    status: 'pending',
    date: '24-2-2024',
    dueDate: '27-2-2024'
  },
  {
    id: Math.random(),
    name: 'Order 2',
    product: 'Onions',
    status: 'completed',
    date: '24-2-2024',
    dueDate: '27-2-2024'
  },
  {
    id: Math.random(),
    name: 'Order 3',
    product: 'Potatoes',
    status: 'canceled',
    date: '24-2-2024',
    dueDate: '27-2-2024'
  },
  {
    id: Math.random(),
    name: 'Order 1',
    product: 'Potatoes',
    status: 'pending',
    date: '24-2-2024',
    dueDate: '27-2-2024'
  },
  {
    id: Math.random(),
    name: 'Order 1',
    product: 'Potatoes',
    status: 'pending',
    date: '24-2-2024',
    dueDate: '27-2-2024'
  }
]
