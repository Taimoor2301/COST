// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'

// ** Demo Components Imports
import UserProfile from './components/UserProfile'
import UserViewRight from './components/UserViewRight'

const UserView = () => {
  const router = useRouter()
  const { data } = router.query

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserProfile userData={data} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight />
      </Grid>
    </Grid>
  )
}

export default UserView
