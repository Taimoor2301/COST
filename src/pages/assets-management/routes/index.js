import { useState, useEffect, useCallback } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import RoutesAccordion from './components/RoutesAccordion'
import AddRouteDrawer from './components/AddRouteDrawer'
import TableHeader from './components/TableHeader'
import { useQuery } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'

const LeafletMapcomponents = dynamic(
  () => import('./components/Map/Map'),
  { ssr: false } // <-- Disable server-side rendering
)

const Routes = () => {
  // ** State
  const [searchValue, setSearchValue] = useState('')
  const [addRouteOpen, setAddRouteOpen] = useState(false)
  const [allRoutes, setAllRoutes] = useState([])
  const [routesToShow, setRoutesToShow] = useState([])

  // todo

  const [selectedCity, setSelectedCity] = useState({})
  const [site, setSite] = useState([])

  const [openAccordion, setOpenAccordion] = useState(null)
  const [flag, setflag] = useState(false)

  const handleAccordionChange = panel => (_event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : null)
    if (!isExpanded) {
      setflag(false)
    }
  }

  const { data: sites } = useQuery({ queryKey: ['sites'], queryFn: () => api.get('/sites/sites.getallsitesasync') })

  useEffect(() => {
    setSite(sites?.data?.data?.data)
  }, [sites])

  // todo

  const {
    data: routesData,
    isLoading,
    isError
  } = useQuery({
    queryFn: () => api.get('/routes/route.getallrouteasync'),
    queryKey: ['routes']
  })

  useEffect(() => {
    if (routesData) {
      setAllRoutes(routesData?.data?.data?.data)
      setRoutesToShow(routesData?.data?.data?.data)
    }
  }, [routesData])

  useEffect(() => {
    setRoutesToShow(allRoutes?.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue, allRoutes])

  const handleSiteNameClick = (sitesOfRoute, markerIcon) => {
    setSite(sitesOfRoute.map(s => ({ ...s, route: { ...s.route, markerIcon } })))
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            value={searchValue}
            handleFilter={val => setSearchValue(val)}
            toggle={() => setAddRouteOpen(p => !p)}
          />

          <Grid
            container
            spacing={6}
            sx={{
              py: 2,
              px: 4
            }}
          >
            <Grid item lg={4} md={6} xs={12}>
              <Card
                sx={{
                  height: {
                    md: 'calc(80vh - 4.0625rem)',
                    xs: 'calc(50vh - 4.0625rem)'
                  }
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: '16px', marginBottom: '30px' }}>
                    {'Route'} Total ({routesToShow?.length})
                  </Typography>
                  {isLoading ? (
                    <div className='w-full h-full min-h-[200px] flex justify-center items-center'>
                      <CircularProgress />
                    </div>
                  ) : isError ? (
                    <Typography>Error fetching routes data</Typography>
                  ) : routesToShow?.length > 0 ? (
                    routesToShow?.map((route, index) => (
                      <RoutesAccordion
                        openAccordion={openAccordion}
                        index={index}
                        handleAccordionChange={handleAccordionChange}
                        handleSiteNameClick={handleSiteNameClick}
                        key={route.id}
                        route={route}
                      />
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontSize: '16px',
                        textAlign: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      No Route found
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Card>
                <LeafletMapcomponents cities={site} selectedCity={selectedCity} flag={flag} />
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <AddRouteDrawer open={addRouteOpen} toggle={() => setAddRouteOpen(p => !p)} />
    </Grid>
  )
}

export default Routes
