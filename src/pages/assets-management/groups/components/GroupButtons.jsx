import React, { useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'src/hooks/useApi'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'
import EditGroupInfo from './EditGroup'

export default function GroupButtons({ onCancel, group, selectedSites, selectedUsers, selectedQuestionneries }) {
  const queryClient = useQueryClient()

  const [openEdit, setOpenEdit] = useState(false)

  const update = useMutation({
    mutationKey: ['groupUpdate'],
    mutationFn: data => api.post('/group/group.updategroupasync', { ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups'])
      toast.success('Update Success')
    },
    onError: err => {
      console.log(err)
      toast.error('Update Error')
    }
  })

  const deleteGroup = useMutation({
    mutationKey: ['deleteGroup'],
    mutationFn: () => api.post('/group/group.deletegroupasync', {}, { params: { id: group.id } }),
    onError: err => {
      console.log(err)
      toast.error('Something went wrong')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['groups'])
      toast.success('Success')
    }
  })

  function onUpdate() {
    const data = {
      id: group.id,
      name: group.name,
      description: group.description || '',
      userIds: selectedUsers.map(user => user.id),
      siteIds: selectedSites.map(site => site.id),
      questionnaireIds: selectedQuestionneries.map(que => que.id)
    }
    update.mutate(data)
  }

  return (
    <AccordionDetails>
      <div className='flex py-5 items-center justify-center gap-4'>
        {update.isPending || deleteGroup.isPending ? (
          <CircularProgress />
        ) : (
          <>
            <Button variant='contained' onClick={onUpdate}>
              Update
            </Button>
            <Button variant='contained' onClick={onCancel}>
              Cancel
            </Button>
            <Button variant='contained' onClick={() => setOpenEdit(p => !p)}>
              Edit Group info
            </Button>
            <Button variant='contained' color='error' onClick={() => deleteGroup.mutate()}>
              Delete
            </Button>
          </>
        )}

        <EditGroupInfo open={openEdit} toggle={() => setOpenEdit(p => !p)} data={group} />
      </div>
    </AccordionDetails>
  )
}
