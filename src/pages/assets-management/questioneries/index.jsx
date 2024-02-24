// ** React Imports
import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Table Components Imports
import { CircularProgress } from '@mui/material'
import { baseURL } from 'src/Constants/Constants'
import TableHeader from './component/TableHeader'
import RowOptions from './component/RowOptions'

// import AddUserDrawer from 'src/views/apps/questionnaires/components/AddNewQuestionnaires'

const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor}
      sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
    >
      {getInitials(row.name ? row.name : ' ')}
    </CustomAvatar>
  )
}

const QuestionnairesList = () => {
  // ** State
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [list, setlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.localStorage.removeItem('rowData')
  }, [])

  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)
    const filteredRows = list?.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))
    setFilteredData(filteredRows)
  }

  const router = useRouter()

  const handleAddQuestionnaires = () => {
    localStorage.setItem('isEdit', JSON.stringify(false))
    router.push('/assets-management/questioneries/component/AddNewQuestionnaires')
  }

  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem('accessToken')
      setIsLoading(true)

      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userToken}`
      }

      const response = await fetch(`${baseURL}/questionnaire/questionnaire.getallquestionnaireasync`, {
        method: 'GET',
        headers: headers
      })
      const result = await response?.json()

      // console.log(result.data.data)

      setlist(result.data.data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const columns = [
    {
      flex: 1,
      minWidth: 320,
      field: 'name',
      headerName: 'Questionnaire Name',
      renderCell: ({ row }) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
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

    // {
    //   flex: 0.2,
    //   minWidth: 100,
    //   field: 'content',
    //   headerName: 'Content',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography noWrap sx={{ color: 'text.secondary' }}>
    //         {JSON.stringify(row.content)}
    //       </Typography>
    //     )
    //   }
    // },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        // localStorage.setItem('rowData', JSON.stringify(row))
        return <RowOptions row={row} fetchData={fetchData} />
      }
    }
  ]
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            btntitle={'Add New Questionnaire'}
            toggle={handleAddQuestionnaires}
          />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={filteredData.length > 0 ? filteredData : list}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            loading={isLoading} // Set loading prop
            loadingOverlayComponent={<CircularProgress />}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default QuestionnairesList
