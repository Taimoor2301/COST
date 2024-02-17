import React from 'react'
import AccordionSummary from '@mui/material/AccordionSummary'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

export default function AccordianSummary({ data }) {
  const { name, siteIds, userIds, questionnaireIds } = data

  return (
    <AccordionSummary
      expandIcon={<Icon icon='tabler:chevron-down' />}
      id='form-layouts-collapsible-header-3'
      aria-controls='form-layouts-collapsible-content-3'
    >
      <div className='grid grid-cols-1 md:grid-cols-4 pr-5 gap-x-5 text-xs lg:text-lg w-full'>
        <div className='col-span-1'>Group Name: {name}</div>
        <div className='col-span-1'>Total Users : {userIds?.length || 0}</div>
        <div className='col-span-1'>Total Sites : {siteIds?.length || 0}</div>
        <div className='col-span-1'>Questionnaries : {questionnaireIds?.length || 0}</div>
      </div>
    </AccordionSummary>
  )
}
