import React, { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const ProductsTab = ({ data }) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [searchValue, setSearchValue] = useState('')
  const [products, setProducts] = useState(data.products)

  function searchProduct(v) {
    setSearchValue(v)
    setProducts(data.products.filter(el => el.name.toLowerCase().includes(v.toLowerCase())))
  }

  const columns = [
    {
      flex: 0.3,
      minWidth: 180,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
    },
    {
      flex: 0.3,
      minWidth: 180,
      field: 'des',
      headerName: 'Description',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.des}</Typography>
    },
    {
      flex: 0.3,
      minWidth: 180,
      field: 'stock',
      headerName: 'Stock',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.stock}</Typography>
    },

    {
      flex: 0.1,
      minWidth: 100,
      field: 'ratings',
      headerName: 'Ratings',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`${row.ratings}`}</Typography>
    }
  ]

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary', marginTop: '8px' }}>Search:</Typography>
                <CustomTextField
                  placeholder='Search Product'
                  value={searchValue}
                  onChange={e => searchProduct(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <DataGrid
          autoHeight
          rows={products}
          rowHeight={60}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Card>
    </div>
  )
}

export default ProductsTab
