// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CrmSessions from 'src/views/dashboards/crm/CrmSessions'
import CrmRevenueGrowth from 'src/views/dashboards/crm/CrmRevenueGrowth'
import CrmBrowserStates from 'src/views/dashboards/crm/CrmBrowserStates'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'
import CrmActiveProjects from 'src/views/dashboards/crm/CrmActiveProjects'
import CrmLastTransaction from 'src/views/dashboards/crm/CrmLastTransaction'
import CrmActivityTimeline from 'src/views/dashboards/crm/CrmActivityTimeline'
import CrmSalesWithAreaChart from 'src/views/dashboards/crm/CrmSalesWithAreaChart'
import CrmSalesWithRadarChart from 'src/views/dashboards/crm/CrmSalesWithRadarChart'
import CrmEarningReportsWithTabs from 'src/views/dashboards/crm/CrmEarningReportsWithTabs'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { useEffect } from 'react'
import app from '../../Firebase/index'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const CrmDashboard = () => {
  // useEffect(() => {
  //   const messaging = getMessaging(app)

  //   function getNotificatios() {
  //     Notification.requestPermission().then(r => {
  //       if (r === 'granted') {
  //         getToken(messaging, {
  //           vapidKey: 'BNJd8ZFZED6pCtJZHkd9Hj1Or7u-Z7QW7DRZFARHfVeSRGDUjFtevdwkJd-j9GNHAliyDZ_XakpG_reD8XGc-Zo'
  //         })
  //           .then(r => console.log('FCM', r))
  //           .catch(e => console.log(e))
  //       }
  //     })
  //   }

  //   onMessage(messaging, payload => {
  //     console.log(payload)
  //   })

  //   getNotificatios()
  // }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} lg={2}>
          <CrmSalesWithAreaChart />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CrmSessions />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CardStatsVertical
            stats='1.28k'
            chipText='-12.2%'
            chipColor='default'
            avatarColor='error'
            title='Total Profit'
            subtitle='Last week'
            avatarIcon='tabler:currency-dollar'
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CardStatsVertical
            stats='24.67k'
            chipText='+25.2%'
            avatarColor='info'
            chipColor='default'
            title='Total Sales'
            subtitle='Last week'
            avatarIcon='tabler:chart-bar'
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={4}>
          <CrmRevenueGrowth />
        </Grid>
        <Grid item xs={12} lg={8}>
          <CrmEarningReportsWithTabs />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmSalesWithRadarChart />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmBrowserStates />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmProjectStatus />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmActiveProjects />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmLastTransaction />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmActivityTimeline />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default CrmDashboard
