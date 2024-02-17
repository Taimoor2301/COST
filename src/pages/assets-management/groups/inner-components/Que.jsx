import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { Divider } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'

import SelctableItem from './SelectableItem'

export default function Questionneries({ allQuestionneries, selectedQuestionneries, handleQuestionneriesChange }) {
  const [questionneriesToShow, setQuestionneriesToShow] = useState(allQuestionneries)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setQuestionneriesToShow(allQuestionneries?.filter(el => el.name.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue, allQuestionneries])

  return (
    <div className='col-span-1 h-full'>
      <Card className='h-full flex flex-col py-4'>
        <div className='flex justify-between items-end gap-3 pl-4 pb-2'>
          <span className='text-lg'>Questionneries</span>
          <CustomTextField placeholder='Search' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>
        <Divider />
        <div className='flex-1 overflow-auto'>
          {questionneriesToShow.map(u => (
            <SelctableItem
              text={u.name}
              itemId={u.id}
              key={u.id}
              onSelect={handleQuestionneriesChange}
              selected={selectedQuestionneries.some(e => e.id === u.id)}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
