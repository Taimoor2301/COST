// ** React Imports
import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports

import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports

// ** Third Party Components
import axios from 'axios'

// ** Custom Table Components Imports
import { styled } from '@mui/system'
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

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const QuestionnairesList = () => {
  // ** State
  const [role, setRole] = useState('')
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [list, setlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()

  const questions = [
    { id: 1, name: 'TFM Inspection Form' },
    { id: 2, name: 'ITS AVM Inspection Form' },
    { id: 3, name: 'ITS AVM Inspection Form' },
    { id: 4, name: 'ITS AFC Inspection Form' },
    { id: 5, name: 'ITS AFC Inspection (Test)' },
    { id: 6, name: 'Depot Runout Inspection' },
    { id: 7, name: 'BUS Inspection Form' },
    { id: 8, name: 'AVM Inspection Form' },
    { id: 9, name: 'again test for delete' },
    { id: 10, name: 'AFC Inspection Form' }
  ]
  useEffect(() => {
    window.localStorage.removeItem('rowData')
  }, [])

  // const RowOptions = ({ row }) => {
  //   // ** Hooks

  //   // ** State

  //   const { t } = useTranslation()
  //   const [anchorEl, setAnchorEl] = useState(null)
  //   const [editOpen, setEditOpen] = useState(false)
  //   const [deleteopen, setdeleteOpen] = useState(false)
  //   const [isLoading, setIsLoading] = useState(false)
  //   const handleClickdeleteOpen = () => setdeleteOpen(true)
  //   const handleClose = () => setdeleteOpen(false)
  //   const rowOptionsOpen = Boolean(anchorEl)

  //   const handleRowOptionsClick = event => {
  //     setAnchorEl(event.currentTarget)
  //   }

  //   const handleRowOptionsClose = () => {
  //     setAnchorEl(null)
  //   }

  //   const toggleEditDrawer = () => {
  //     setAnchorEl(null)
  //     setEditOpen(!editOpen)
  //   }

  //   return <>{/* <AddUserDrawer open={editOpen} row={row} toggle={toggleEditDrawer} /> */}</>
  // }

  const cardData = [
    { title: 'Questionnaires', subtitle: 'Total Questionnaires', stats: 10, trendDiff: 100, icon: 'tabler:user' }
  ]

  const [filteredData, setFilteredData] = useState([])

  const handleFilter = val => {
    setValue(val)
    const filteredRows = list?.filter(row => row.name.toLowerCase().includes(val.toLowerCase()))
    setFilteredData(filteredRows)
  }

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const router = useRouter()

  const handleAddQuestionnaires = () => {
    localStorage.setItem('isEdit', JSON.stringify(false))
    router.push('/assets-management/questioneries/component/AddNewQuestionnaires')
  }
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

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
      setlist(result.data.data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      flex: 0.1,
      minWidth: 320,
      field: 'fullName',
      headerName: <Translations text={'Questionnaire Name'} />,
      renderCell: ({ row }) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap

                // component={Link}
                // href='/apps/user/view/account'
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
      flex: 0.2,
      minWidth: 100,
      field: 'content',
      headerName: <Translations text={'Content'} />,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.content}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: <Translations text={'Actions'} />,
      renderCell: ({ row }) => {
        // localStorage.setItem('rowData', JSON.stringify(row))
        return <RowOptions row={row} fetchData={fetchData} />
      }
    }
  ]

  return (
    <Grid  container spacing={6.5}>
      {/* <Grid item xs={12}>
        {cardData && (
          <Grid container spacing={6}>
            {cardData.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title={t('Search Filters')} /> */}
          {/* <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='10'
                  SelectProps={{
                    value: role,
                    displayEmpty: true,
                    onChange: e => handleRoleChange(e)
                  }}
                >
                  <MenuItem value=''>10</MenuItem>
                  <MenuItem value='admin'>25</MenuItem>
                  <MenuItem value='author'>50</MenuItem>
                  <MenuItem value='editor'>100</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </CardContent> */}
          {/* <Divider sx={{ m: '0 !important' }} /> */}
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            btntitle={'Add New Questionnaire'}
            toggle={handleAddQuestionnaires}

            // toggle={toggleAddUserDrawer}
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

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  )
}

export default QuestionnairesList