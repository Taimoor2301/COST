// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const SelectControlledUncontrolled = ({ options, setSelected, selected }) => {
  // ** State
  const [value, setValue] = useState(selected)

  const handleChange = event => {
    setValue(event.target.value)
    setSelected(event.target.value)
  }

  return (
    <div className='demo-space-x'>
      <CustomTextField
        select
        defaultValue='All'
        id='select-controlled'
        SelectProps={{ value, onChange: e => handleChange(e) }}
      >
        <MenuItem value='All'>All</MenuItem>
        {options?.map(op => (
          <MenuItem key={op.id} value={op}>
            {op.name}
          </MenuItem>
        ))}
      </CustomTextField>
    </div>
  )
}

export default SelectControlledUncontrolled
