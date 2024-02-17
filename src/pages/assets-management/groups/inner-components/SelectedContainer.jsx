import React from 'react' // ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ChipsOnDelete = () => {
  const handleDelete = e => {
    console.log(e.target.value)
    console.info('You clicked the delete icon.')
  }

  return (
    <Fragment>
      <Chip label='Primary' color='primary' onDelete={handleDelete} deleteIcon={<Icon icon='tabler:trash' />} />
    </Fragment>
  )
}

export default function SelectedContainer({ selected, onSelect }) {
  return (
    <div className='p-2 flex gap-2 flex-wrap'>
      {selected?.map(item => {
        return (
          <Chip
            label={item.text}
            key={item.id}
            color='primary'
            onDelete={() => onSelect(item.id)}
            deleteIcon={<Icon icon='tabler:trash' />}
          />
        )
      })}{' '}
      {selected?.length < 1 && <div className='py-2 text-center w-full'>No Items</div>}
    </div>
  )
}
