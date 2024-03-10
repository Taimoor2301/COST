import React from 'react'
import { CircularProgress } from '@mui/material'

export default function LoadingScreen() {
  return (
    <div className='absolute inset-0 bg-white/80 z-[100] grid place-content-center'>
      <CircularProgress />
    </div>
  )
}
