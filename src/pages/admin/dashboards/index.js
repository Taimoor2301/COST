// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import CrmSalesWithAreaChart from './components/crm/CrmSalesWithAreaChart'
import CrmSessions from './components/crm/CrmSessions'
import CrmRevenueGrowth from './components/crm/CrmRevenueGrowth'
import CrmEarningReportsWithTabs from './components/crm/CrmEarningReportsWithTabs'
import CrmSalesWithRadarChart from './components/crm/CrmSalesWithRadarChart'
import CrmBrowserStates from './components/crm/CrmBrowserStates'
import CrmProjectStatus from './components/crm/CrmProjectStatus'
import CrmActiveProjects from './components/crm/CrmActiveProjects'
import CrmLastTransaction from './components/crm/CrmLastTransaction'
import CrmActivityTimeline from './components/crm/CrmActivityTimeline'
import AdminLayout from 'src/experiment/Adminlayout'

const CrmDashboard = () => {
  return (
    <AdminLayout>
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
    </AdminLayout>
  )
}

export default CrmDashboard
