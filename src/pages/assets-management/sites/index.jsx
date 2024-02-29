'use client'

import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TableHeader from './components/TableHeader'
import { useQuery } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import AccordionItem from './components/AccordinaItem'
import AddSiteDrawer from './components/AddSiteDrawer'
import EditSiteDrawer from './components/EditSiteDrawer'
import dynamic from 'next/dynamic'
import { CircularProgress } from '@mui/material'
import { t } from 'i18next'

const LeafletMapcomponents = dynamic(
  () => import('src/Maps/sitemaps/Map'),
  { ssr: false } // <-- Disable server-side rendering
)

export default function Sites() {
  // routes
  const [selectedRoute, setSelectedRoute] = useState('All')

  // sites
  const [activeFilter, setActiveFilter] = useState('All')
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [allSites, setAllSites] = useState([])
  const [sitesToShow, setSitesToSHow] = useState([])

  // edit site
  const [editSiteOpen, setEditSiteOpen] = useState(false)
  const [siteToEdit, setSiteToEdit] = useState(null)

  // cities
  const [flag, setflag] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)

  const { data: routes } = useQuery({
    queryFn: () => api.get('/routes/route.getallrouteasync'),
    queryKey: ['routes']
  })

  const {
    data: sites,
    isLoading: sitesLoading,
    isError: sitesError
  } = useQuery({ queryKey: ['sites'], queryFn: () => api.get('/sites/sites.getallsitesasync') })

  useEffect(() => {
    setAllSites(sites?.data?.data?.data)
    setSitesToSHow(sites?.data?.data?.data)
  }, [sites])

  useEffect(() => {
    setSitesToSHow(allSites?.filter(site => site.name.toLowerCase().includes(searchValue)))
  }, [searchValue, allSites])

  // change active or inactive
  useEffect(() => {
    if (activeFilter === 'All') {
      return setSitesToSHow(
        selectedRoute === 'All' ? allSites : allSites.filter(site => site.route.id === selectedRoute)
      )
    }
    setSitesToSHow(
      allSites.filter(
        site => site.isActive === activeFilter && (site.route.id === selectedRoute || selectedRoute === 'All')
      )
    )
  }, [activeFilter, allSites, selectedRoute])

  // change route
  useEffect(() => {
    setActiveFilter('All')
    if (selectedRoute === 'All') {
      return setSitesToSHow(allSites)
    }
    setSitesToSHow(allSites.filter(site => site.route.id === selectedRoute))
  }, [selectedRoute, allSites])

  const handleCityNameClick = city => {
    if (city.id === selectedCity?.id) {
      setSelectedCity(null)
      setflag(false)
    } else {
      setSelectedCity(city)
      setflag(true)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableHeader
          routesList={routes?.data?.data?.data}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          toggle={() => setAddDrawerOpen(p => !p)}
        />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <Card className='p-4 h-[70vh]'>
          {sitesLoading ? (
            <div className='grid place-content-center py-10'>
              <CircularProgress />
            </div>
          ) : sitesError ? (
            <div className='text-clip font-semibold py-5'>Error getting sites data</div>
          ) : (
            <>
              <Typography sx={{ fontSize: '16px', marginBottom: '20px' }}>
                {t('Total Sites')} ({sitesToShow?.length || 0})
              </Typography>
              <div className='overflow-x-hidden overflow-y-auto p-1 max-h-full pb-20'>
                {sitesToShow?.map(site => (
                  <AccordionItem
                    key={site.id}
                    site={site}
                    setSiteToEdit={setSiteToEdit}
                    handleCityNameClick={handleCityNameClick}
                    toggleEditor={() => setEditSiteOpen(true)}
                  />
                ))}
              </div>
            </>
          )}
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <LeafletMapcomponents cities={sitesToShow} selectedCity={selectedCity} flag={flag} />
        </Card>
      </Grid>

      <AddSiteDrawer open={addDrawerOpen} route={routes?.data?.data?.data} toggle={() => setAddDrawerOpen(p => !p)} />
      <EditSiteDrawer
        open={editSiteOpen}
        route={routes?.data?.data?.data}
        toggle={() => {
          setEditSiteOpen(false)
          setSiteToEdit(null)
        }}
        site={siteToEdit}
      />
    </Grid>
  )
}
