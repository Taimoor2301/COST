import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AccordionDetails, Button, Icon, IconButton } from '@mui/material'
import CustomTimelineDot from 'src/@core/components/mui/timeline-dot'
import { Box } from '@mui/system'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import CircularProgress from '@mui/material/CircularProgress'
import AddNewSite from './AddNewSite'
import EditRoute from './EditRoute'

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses
} from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowForkIcon from '@mui/icons-material/ArrowForward'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import toast from 'react-hot-toast'
import { styled } from '@mui/material/styles'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const RoutesAccordion = ({ route, handleSiteNameClick, openAccordion, handleAccordionChange, index }) => {
  const [delOpen, setDelOpen] = useState(false)
  const [addSiteOpen, setAddSiteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationKey: ['delete route'],
    mutationFn: id => api.post('/routes/route.deleterouteasync', {}, { params: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['routes', 'sites'])
      toast.success('Route Deleted')
      setDelOpen(false)
    },
    onError: err => {
      console.log(err)
      toast.error('Request Failed')
    }
  })

  return (
    <>
      <Accordion
        expanded={openAccordion === index}
        onChange={handleAccordionChange(index)}
        onClick={() => handleSiteNameClick(route?.sites, route?.markerIcon)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel-content' id='panel-header'>
          <div className='flex items-center gap-6'>
            <div className='h-5 w-5 mt-1 flex items-center gap-5'>
              <img
                src={
                  route?.markerIcon instanceof Blob
                    ? URL.createObjectURL(route?.markerIcon)
                    : route?.markerIcon && `data:image/png;base64,${route?.markerIcon}`
                }
                alt='icon'
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className='w-max cursor-pointer'>{route?.name}</div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: 'text.secondary' }}>Route Info</Typography>
            <Typography sx={{ marginTop: '-9px' }}>
              <IconButton onClick={() => setEditOpen(p => !p)}>
                <EditIcon fontSize='small' />
              </IconButton>
              <IconButton onClick={() => setDelOpen(p => !p)}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Typography>
          </Box>

          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0
              }
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <CustomTimelineDot skin='light' color='primary'>
                  <ArrowForkIcon fontSize='small' />
                </CustomTimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ mt: '7px' }}>
                <Typography sx={{ display: 'flex', mr: 2, mb: 2 }} variant='h6'>
                  Color:{' '}
                  <Box
                    sx={{
                      bgcolor: `${route?.color}`,
                      width: 50,
                      height: 20,
                      marginLeft: '25px',
                      borderRadius: '15%'
                    }}
                  />
                </Typography>

                <Typography
                  variant='caption'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'text.primary',
                    fontSize: '14px'
                  }}
                >
                  <span>Sites: {route?.sites?.length || 0}</span>
                  <Button
                    onClick={() => setAddSiteOpen(p => !p)}
                    variant='contained'
                    style={{
                      marginRight: '-15px',
                      fontSize: '14px',
                      padding: '10px'
                    }}
                  >
                    Add site
                  </Button>
                </Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={delOpen}
        onClose={() => setDelOpen(p => !p)}
        aria-labelledby='customized-dialog-title'
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <CustomCloseButton aria-label='close' onClick={() => setDelOpen(p => !p)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        </DialogTitle>
        <DialogContent>
          <Typography style={{ textAlign: 'center' }}>
            Are you sure you want to delete this route <br /> <span style={{ fontWeight: 'bold' }}>{route?.name}</span>
          </Typography>
        </DialogContent>
        <DialogContent>
          <Box sx={{ marginTop: '-30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '100px', width: '100px' }}>
              <img
                src='/images/icons/project-icons/trashimage.png'
                alt='abc'
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {deleteMutation.isPending ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant='contained' onClick={() => deleteMutation.mutate(route?.id)}>
                Yes
              </Button>
              <Button variant='contained' onClick={() => setDelOpen(p => !p)}>
                No
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <AddNewSite open={addSiteOpen} toggle={() => setAddSiteOpen(p => !p)} route={route} />

      <EditRoute open={editOpen} toggle={() => setEditOpen(p => !p)} row={route} />
    </>
  )
}

export default RoutesAccordion
