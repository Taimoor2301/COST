// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTab from '@mui/material/Tab'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Demo Components Imports
import ProductsTab from './Products-Tab'
import RatingsTab from './Ratings-Tab'
import UserNotification from './UserNotification'

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1.5)
  }
}))

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '&, & .MuiTabs-scroller': {
    boxSizing: 'content-box',
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

const UserViewRight = ({ userData }) => {
  // ** State
  const [activeTab, setActiveTab] = useState('Products')
  const [isLoading, setIsLoading] = useState(false)

  // ** Hooks
  const router = useRouter()

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab)
  }

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleTabChange} // Make sure to use the handleTabChange function
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='Products' label='Products' icon={<Icon fontSize='1.125rem' icon='tabler:building-store' />} />
        <Tab value='Reviews' label='Reviews' icon={<Icon fontSize='1.125rem' icon='tabler:star' />} />
        {/* <Tab value='Notification' label='Notification' icon={<Icon fontSize='1.125rem' icon='tabler:bell' />} /> */}
      </TabList>
      <Box sx={{ mt: 4 }}>
        <TabPanel value='Products' style={{ padding: '0px', paddingTop: '12px' }}>
          <ProductsTab data={userData} />
        </TabPanel>

        <TabPanel value='Reviews' style={{ padding: '0px', paddingTop: '12px' }}>
          <RatingsTab data={userData} />
        </TabPanel>

        {/* <TabPanel value='Notification' style={{ padding: '0px', paddingTop: '12px' }}>
          <UserNotification />
        </TabPanel> */}
      </Box>
    </TabContext>
  )
}

export default UserViewRight
