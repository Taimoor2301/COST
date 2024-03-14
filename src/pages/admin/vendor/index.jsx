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
import AddVendorDrawer from './components/AddVendorDrawer'

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

const VendorList = () => {
  const columns = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: t('Name'),
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
      field: 'sales',
      minWidth: 170,
      headerName: t('Sales'),
      renderCell: ({ row }) => {
        return <Typography>{row.sales}</Typography>
      }
    },
    {
      flex: 0.15,
      field: 'ratings',
      minWidth: 170,
      headerName: t('Ratings'),
      renderCell: ({ row }) => {
        return <Typography>{row.ratings}</Typography>
      }
    },
    {
      flex: 0.15,
      field: 'noOfProducts',
      headerName: t('Total products'),
      renderCell: ({ row }) => {
        return <Typography>{row.noOfroducts}</Typography>
      }
    },

    {
      flex: 0.15,
      minWidth: 190,
      field: 'products[0].name',
      headerName: t('Products'),
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.products.map((role, index) => (
              <Tooltip key={index} title={row?.products?.map(r => r.name).join(', ')}>
                <span style={{ display: 'inline' }}>
                  {t(role.name)}
                  {index < row.products.length - 1 && ', '}
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
  const [editOrderOpen, seteditOrderOpen] = useState(false)
  const [itemToEdit, setItemToEdit] = useState()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [addNewOpen, setAddNewOpen] = useState(false)
  const [editRoleOpen, setEditRoleOpen] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(dummyvendors)

  // data holding states

  function handleSearch(value) {
    setSearchValue(value)
    setItemsToShow(dummyvendors.filter(v => v.name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <AdminLayout>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              value={searchValue}
              toggle={() => setAddNewOpen(true)}
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
        <AddVendorDrawer open={addNewOpen} toggle={() => setAddNewOpen(false)} />
        <EditUserDrawer open={editRoleOpen} toggle={() => setEditRoleOpen(p => !p)} data={itemToEdit} />
      </Grid>
    </AdminLayout>
  )
}

export default VendorList

const dummyvendors = [
  {
    id: Math.random(),
    name: 'GC Suppliers',
    Category: 'Spices',
    email: 'gcofficial@gmail.com',
    phoneNumber: '+00965555554',
    image: '',
    isActive: true,
    products: [{ name: 'Shaan Masala' }, { name: 'GC Spices Pack' }],
    contactPerson: { name: 'Taimoor Ali', email: 'taimoor@gmail.com', phoneNumber: '03185505264', imgae: '' },
    noOfroducts: 2,
    sales: '180K',
    ratings: '4.7',
    reviews: [
      { from: 'Mudassar Ali', text: 'Their Products are very good' },
      { from: 'Saad Ali', text: 'Their Products are very good' },
      { from: 'Fatima Khan', text: 'Their Products are very nice' }
    ]
  },
  {
    id: Math.random(),
    name: 'Sunny Ctarings',
    Category: 'Catering',
    products: [{ name: 'Dishes' }, { name: 'Spoons' }],
    email: 'sunnycaterings@gmail.com',
    phoneNumber: '+00965555554',
    image: '',
    isActive: true,
    contactPerson: { name: 'Taimoor', email: 'taimoor@gmail.com', phoneNumber: '03185505264', imgae: '' },
    noOfroducts: 2,
    sales: '180K',
    ratings: '4.8',
    reviews: [
      { from: 'Mudassar Ali', text: 'Their Products are very good' },
      { from: 'Saad Ali', text: 'Their Products are very good' },
      { from: 'Fatima Khan', text: 'Their Products are very nice' }
    ]
  },
  {
    id: Math.random(),
    name: 'MK Suppliers',
    Category: 'Vegetables',
    email: 'mkofficial@gmail.com',
    phoneNumber: '+00965555554',
    image: '',
    isActive: false,
    products: [{ name: 'Potatoes' }, { name: 'Onions' }],
    contactPerson: { name: 'sana iqbal', email: 'sanaiqbal@gmail.com', phoneNumber: '03185505264', imgae: '' },
    noOfroducts: 2,
    sales: '180K',
    ratings: '4.7',
    reviews: [
      { from: 'Mudassar Ali', text: 'Their Products are very good' },
      { from: 'Saad Ali', text: 'Their Products are very good' },
      { from: 'Fatima Khan', text: 'Their Products are very nice' }
    ]
  },
  {
    id: Math.random(),
    name: 'Global Inc.',
    Category: 'Spices',
    email: 'globalsofficial@gmail.com',
    phoneNumber: '+00965555554',
    image: '',
    isActive: true,
    products: [{ name: 'Spices' }, { name: 'Bryani Masala' }],
    contactPerson: { name: 'Emaan Mumtaaz', email: 'emaanmumtaaz@gmail.com', phoneNumber: '03185505264', imgae: '' },
    noOfroducts: 2,
    sales: '180K',
    ratings: '4.7',
    reviews: [
      { from: 'Mudassar Ali', text: 'Their Products are very good' },
      { from: 'Saad Ali', text: 'Their Products are very good' },
      { from: 'Fatima Khan', text: 'Their Products are very nice' }
    ]
  },
  {
    id: Math.random(),
    name: 'GC Suppliers',
    Category: 'Spices',
    email: 'gcofficial@gmail.com',
    phoneNumber: '+00965555554',
    image: '',
    isActive: true,
    products: [{ name: 'GC Masala' }],
    contactPerson: { name: 'taimoor@gmail.com', email: 'taimoor@gmail.com', phoneNumber: '03185505264', imgae: '' },
    noOfroducts: 2,
    sales: '180K',
    ratings: '4.7',
    reviews: [
      { from: 'Mudassar Ali', text: 'Their Products are very good' },
      { from: 'Saad Ali', text: 'Their Products are very good' },
      { from: 'Fatima Khan', text: 'Their Products are very nice' }
    ]
  }
]
