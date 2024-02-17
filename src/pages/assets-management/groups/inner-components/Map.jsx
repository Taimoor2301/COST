import React from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@mui/material'

const LeafletMapcomponents = dynamic(
  () => import('src/Maps/group-map/Map'),
  { ssr: false } // <-- Disable server-side rendering
)

export default function Map({ selectedSites }) {
  return (
    <div className='h-full col-span-1'>
      <Card className='h-full'>
        <LeafletMapcomponents cities={selectedSites} />
      </Card>
    </div>
  )
}
