import Checkbox from '@mui/material/Checkbox'

const SelctableItem = ({ selected, onSelect, text, itemId }) => {
  return (
    <div className='flex items-center gap-3' onClick={() => onSelect(itemId)}>
      <Checkbox checked={selected} readOnly name='basic-checked' />
      <span>{text}</span>
    </div>
  )
}

export default SelctableItem
