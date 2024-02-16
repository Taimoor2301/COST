import React from 'react'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const UserProfile = ({ userData }) => {
  const userdata = userData == undefined ? [] : JSON.parse(userData)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              color={'primary'}
              sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
            >
              {getInitials(userdata?.firstName ? userdata?.firstName : ' ')}
            </CustomAvatar>
            <Typography variant='h4' sx={{ mb: 3 }}>
              {`${userdata?.firstName} ${userdata?.lastName}`}
            </Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={userdata?.role}
              color={'info'}
              sx={{ textTransform: 'capitalize' }}
            />
          </CardContent>
          <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='tabler:checkbox' />
                </CustomAvatar>
                <div>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>0</Typography>
                  <Typography variant='body2'>Task Done</Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' sx={{ mr: 2.5, width: 38, height: 38 }}>
                  <Icon fontSize='1.75rem' icon='tabler:briefcase' />
                </CustomAvatar>
                <div>
                  <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>0</Typography>
                  <Typography variant='body2'>Project Done</Typography>
                </div>
              </Box>
            </Box>
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              {/* <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Username:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>@{userdata?.name}</Typography>
              </Box> */}
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userdata?.email}</Typography>
              </Box>

              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                  {userdata?.roles?.map(r => r.roleName).join(', ')}
                </Typography>
              </Box>

              {/* <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>+1 {data?.contact}</Typography>
              </Box> */}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserProfile
