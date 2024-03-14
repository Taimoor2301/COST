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

const RatingsTab = ({ data }) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [searchValue, setSearchValue] = useState('')
  const [reviews, setReviews] = useState(data.reviews)

  function searchProduct(v) {
    setSearchValue(v)
    setReviews(data.reviews.filter(el => el.from.toLowerCase().includes(v.toLowerCase())))
  }

  const columns = [
    {
      flex: 0.3,
      minWidth: 180,
      field: 'from',
      headerName: 'From',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.from}</Typography>
    },
    {
      flex: 0.3,
      minWidth: 180,
      field: 'text',
      headerName: 'Review',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.text}</Typography>
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
                  placeholder='Search'
                  value={searchValue}
                  onChange={e => searchProduct(e.target.value)}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <DataGrid
          autoHeight
          rows={reviews}
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

export default RatingsTab
