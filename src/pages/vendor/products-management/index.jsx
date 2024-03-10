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
import AddProduct from './components/AddProduct'
import { CircularProgress } from '@mui/material'
import EditProduct from './components/EditProduct'
import ViewProduct from './components/ProductModel'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
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

  const handleDelete = id => {
    const confirm = window.confirm(t('Confirm delete product') + ` : ${data.name}`)
    if (confirm) {
      handleRowOptionsClick()
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
          {t('Delete')}
        </MenuItem>
      </Menu>
    </>
  )
}

const ProductsList = () => {
  const { t } = useTranslation()

  const columns = [
    {
      minWidth: 280,
      field: 'firstName',
      headerName: t('Product Name'),
      renderCell: ({ row }) => <ViewProduct row={row} />
    },
    {
      flex: 1,
      minWidth: 120,
      headerName: t('Description'),
      field: 'des',
      renderCell: ({ row }) => {
        return <Typography noWrap>{row.des}</Typography>
      }
    },
    {
      flex: 1,
      minWidth: 120,
      headerName: t('Stock'),
      field: 'stock',
      renderCell: ({ row }) => {
        return <Typography noWrap>{row.stock}</Typography>
      }
    },
    {
      sortable: false,
      field: 'actions',
      headerName: t('Actions'),
      renderCell: ({ row }) => <RowOptions data={row} />
    }
  ]

  const [addUserOpen, setAddUserOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [itemToEdit, setItemToEdit] = useState(null)
  const [openProductEditor, setopenProductEditor] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  return (
    <VendorLayout>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={searchValue}
              handleFilter={val => setSearchValue(val)}
              toggle={() => setAddUserOpen(p => !p)}
            />

            <DataGrid
              autoHeight
              rowHeight={62}
              rows={dummyProducts.map(p => ({
                ...p,
                editFn: data => {
                  setItemToEdit(data)
                  setopenProductEditor(true)
                }
              }))}
              columns={columns}
              loadingOverlayComponent={<CircularProgress />}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>

        <AddProduct open={addUserOpen} toggle={() => setAddUserOpen(p => !p)} />
        <EditProduct open={openProductEditor} toggle={() => setopenProductEditor(p => !p)} data={itemToEdit} />
      </Grid>
    </VendorLayout>
  )
}

export default ProductsList

const dummyProducts = [
  {
    id: Math.random(),
    name: 'Product 1',
    des: 'This is Product 1',
    stock: '200',
    img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: Math.random(),
    name: 'Product 2',
    des: 'This is Product 2',
    stock: '200',
    img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: Math.random(),
    name: 'Product 3',
    des: 'This is Product 3',
    stock: '200',
    img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: Math.random(),
    name: 'Product 4',
    des: 'This is Product 4',
    stock: '200',
    img: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]
