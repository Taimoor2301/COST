import React from 'react'
import CompanyInfo from './components/Company-Info'
import Branding from './components/Branding'
import SitesAndRoutes from './components/Sites-and-routes'
import MobileAppSettings from './components/MobileAppSettings'

export default function SettingsPage() {
  return (
    <main className='grid grid-cols-1 lg:grid-cols-2 gird-rows-4 lg:grid-rows-2 h-full gap-5'>
      <Branding />
      <CompanyInfo />
      <SitesAndRoutes />
      <MobileAppSettings />
    </main>
  )
}
