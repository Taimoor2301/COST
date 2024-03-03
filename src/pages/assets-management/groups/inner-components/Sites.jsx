import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '@mui/material/Card'
import Selection from '../inner-components/Selection'
import { Divider } from '@mui/material'
import SelectionContainer from '../inner-components/SelectedContainer'
import SelctableItem from './SelectableItem'
import { useTranslation } from 'react-i18next'
import useAPI from 'src/hooks/useNewApi'

export default function Sites({ allSites, selectedSites, handleSiteChange }) {
  const [selectedRoute, setSelectedRoute] = useState('All')

  const api = useAPI()

  const { t } = useTranslation()

  const { data: routes } = useQuery({
    queryFn: () => api.get('/routes/route.getallrouteasync'),
    queryKey: ['routes']
  })

  const [sitesToSHow, setSitesToSHow] = useState(allSites)
  useEffect(() => {
    if (selectedRoute === 'All') {
      setSitesToSHow(allSites)
    } else {
      setSitesToSHow(allSites?.filter(el => el.route.id === selectedRoute.id))
    }
  }, [selectedRoute, allSites])

  return (
    <div className='col-span-1 w-full h-full'>
      <Card className='h-full flex flex-col'>
        <div className='flex justify-between items-end gap-3 pl-4 pb-2'>
          <span className='text-lg'>{t('Routes List')}</span>
          <Selection options={routes?.data?.data?.data} selected={selectedRoute} setSelected={setSelectedRoute} />
        </div>
        <Divider />
        <SelectionContainer
          selected={selectedSites.map(el => ({ id: el.id, text: el.name }))}
          onSelect={handleSiteChange}
        />
        <Divider />
        <span className='p-2'>{t('Sites')}</span>
        <Divider />
        <div className='overflow-auto flex-1'>
          {sitesToSHow.map(s => (
            <SelctableItem
              text={s.name}
              itemId={s.id}
              key={s.id}
              onSelect={handleSiteChange}
              selected={selectedSites.some(e => e.id === s.id)}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
