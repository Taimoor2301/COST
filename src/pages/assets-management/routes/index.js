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
import { CircularProgress, Divider } from '@mui/material'
import dynamic from 'next/dynamic'
import { t } from 'i18next'
import { shadows } from '@mui/system'

const LeafletMapcomponents = dynamic(
  () => import('../../../Maps/routemaps/Map'),
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

  const handleAccordionChange = (id) => {
    if(openAccordion === id){
      setOpenAccordion(null)
    }else{
      setOpenAccordion(id)
    }
  }

  const { data: sites } = useQuery({ queryKey: ['sites'], queryFn: () => api.get('/sites/sites.getallsitesasync') })

  useEffect(() => {
    if(sites){
        if(openAccordion){
          setSite(sites?.data?.data?.data?.filter(site => site.route.id === openAccordion))
        }else{
          setSite(sites?.data?.data?.data)
        }
    }
  }, [sites , openAccordion])

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



  return (
    <>

        <Card>
          <TableHeader
            value={searchValue}
            handleFilter={val => setSearchValue(val)}
            toggle={() => setAddRouteOpen(p => !p)}
          />

          <Divider />

          <Grid
            container
            spacing={6}
            sx={{
              p:4
            }}>
            <Grid item xs={12} md={4}>
              <Card sx={{boxShadow:'none' , height:'70vh'}}>
                  <Typography sx={{ fontSize: '16px', marginBottom: '20px' }}>
                    {t('Route Total')} ({routesToShow?.length})
                  </Typography>
                  {isLoading ? (
                    <div className='w-full h-full min-h-[200px] flex justify-center items-center'>
                      <CircularProgress />
                    </div>
                  ) : isError ? (
                    <div className='text-center py-5'>Error fetching routes data</div>
                  ) : routesToShow?.length > 0 ? (
                    <div className='max-h-full overflow-auto p-1 pb-10'>
                      {routesToShow?.map((route, index) => (
                      <RoutesAccordion
                        key={route.id}
                        openAccordion={openAccordion}
                        handleAccordionChange={handleAccordionChange}
                        route={route}
                      />
                    ))}
                    </div>
                  ) : (
                    <div className='text-center py-5'>
                     {t('No Route found')}
                    </div>
                  )}

                </Card>

            </Grid>

            <Grid item xs={12} md={8}>
              <Card className='border-2 border-black/20'>
                <LeafletMapcomponents cities={site} selectedCity={selectedCity} flag={flag} />
              </Card>
            </Grid>

          </Grid>

        </Card>

      <AddRouteDrawer open={addRouteOpen} toggle={() => setAddRouteOpen(p => !p)} />
    </>
  )
}

export default Routes
