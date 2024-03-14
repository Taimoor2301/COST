import { Icon } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '@mui/material'

export default function AddImages() {
  const theme = useTheme()
  const [files, setFiles] = useState([])
  const [imageUrls, setImageUsrls] = useState([])

  function handleChange(file) {
    if (file) {
      setFiles(p => [...p, file])
      setImageUsrls(p => [...p, URL.createObjectURL(file)])
    }
  }

  const removeImage = index => {
    setFiles(p => p.filter((f, i) => i !== index))
    setImageUsrls(p => p.filter((f, i) => i !== index))
  }

  return (
    <section className='my-5 py-3 flex gap-3 justify-between flex-col'>
      <div className='flex gap-2 p-2 bg-gray-100 h-24 border-2 border-dashed divide-x-2 divide-gray-600'>
        {imageUrls.map((img, i) => (
          <div key={i} className='w-1/3 aspect-square overflow-hidden p-1' onClick={() => removeImage(i)}>
            <img src={img} alt='' className='w-full h-full object-contain' />
          </div>
        ))}
      </div>
      <input
        type='file'
        id='add-product-img'
        className='hidden'
        accept='image/*'
        onChange={e => handleChange(e.target.files[0])}
      />
      <button
        disabled={files.length > 2}
        onClick={() => {
          document.getElementById('add-product-img').click()
        }}
        style={{ backgroundColor: !(files.length > 2) && theme.palette.primary.main }}
        className={`p-2 text-center rounded-md text-white disabled:bg-gray-500`}
      >
        Add Product Images
      </button>
    </section>
  )
}
