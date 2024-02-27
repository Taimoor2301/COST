import React from 'react'
import AccordionSummary from '@mui/material/AccordionSummary'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'

export default function AccordianSummary({ data }) {
  const { t } = useTranslation()
  const { name, siteIds, userIds, questionnaireIds } = data

  return (
    <AccordionSummary
      expandIcon={<Icon icon='tabler:chevron-down' />}
      id='form-layouts-collapsible-header-3'
      aria-controls='form-layouts-collapsible-content-3'
    >
      <div className='grid grid-cols-1 md:grid-cols-4 pr-5 gap-x-5 text-xs lg:text-sm w-full'>
        <div className='col-span-1'>
          {t('Group Name')}: {name}
        </div>
        <div className='col-span-1'>
          {t('Total Users')} : {userIds?.length || 0}
        </div>
        <div className='col-span-1'>
          {t('Total Sites')} : {siteIds?.length || 0}
        </div>
        <div className='col-span-1'>
          {t('Questionnaries')} : {questionnaireIds?.length || 0}
        </div>
      </div>
    </AccordionSummary>
  )
}
