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
  // const userData = userData == undefined ? [] : JSON.parse(userData)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              src={userData.image}
              color={'primary'}
              sx={{ width: 200, height: 200, mb: 4, fontSize: '3rem' }}
            >
              {!userData.image && getInitials(userData.name)}
            </CustomAvatar>
            <Typography variant='h4' sx={{ mb: 3 }}>
              {userData?.name}
            </Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={userData?.category}
              color={'info'}
              sx={{ textTransform: 'capitalize' }}
            />
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }} className='flex flex-col gap-3'>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Vendor Details
            </Typography>
            <Typography>Location: {userData.location}</Typography>
            <Typography>Phone Number: {userData.phoneNumber}</Typography>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{userData?.email}</Typography>
            </Box>
            <Divider />
            <Box sx={{ pt: 4 }} className='flex flex-col gap-3'>
              <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Contact Person
              </Typography>
              <Typography>Name: {userData.contactPerson.name}</Typography>
              <Typography>Phone Number: {userData.contactPerson.phoneNumber}</Typography>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.contactPerson.email}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserProfile
