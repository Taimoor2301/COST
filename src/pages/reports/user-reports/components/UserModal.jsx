import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'
import Link from 'next/link'

const renderClient = row => {
  if (row.imageUrl) {
    return <CustomAvatar src={row.imageUrl} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.firstName ? row.firstName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const ViewUserModel = ({ row }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderClient(row)}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography
            noWrap
            component={Link}
            href={{
              pathname: '/reports/user',
              query: { data: JSON.stringify(row) } // Pass the entire row object as a string
            }}
            sx={{
              fontWeight: 500,
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {row.firstName + ' ' + row.lastName}
          </Typography>
          <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
            {row.email}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ViewUserModel
