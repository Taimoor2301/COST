import React from 'react'
import CompanyInfo from './components/Company-Info'
import Branding from './components/Branding'
import VendorLayout from 'src/experiment/VendorLayout'

export default function SettingsPage() {
  return (
    <VendorLayout>
      <main className='grid grid-cols-1 lg:grid-cols-2 gird-rows-4 lg:grid-rows-2 h-full gap-5'>
        <Branding />
        <CompanyInfo />
      </main>
    </VendorLayout>
  )
}
