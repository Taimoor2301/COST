import React, { useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'
import EditGroupInfo from './EditGroup'
import { useTranslation } from 'react-i18next'
import useAPI from 'src/hooks/useNewApi'

export default function GroupButtons({ onCancel, group, selectedSites, selectedUsers, selectedQuestionneries }) {
  const queryClient = useQueryClient()
  const api = useAPI()

  const { t } = useTranslation()

  const [openEdit, setOpenEdit] = useState(false)

  const s = t('Success')
  const f = t('Something went wrong')

  const language = localStorage.getItem('language')

  const update = useMutation({
    mutationKey: ['groupUpdate'],
    mutationFn: data => api.post('/group/group.updategroupasync', { ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries(['groups'])
      toast.success(s)
    },
    onError: err => {
      console.log(err)
      toast.error(f)
    }
  })

  const deleteGroup = useMutation({
    mutationKey: ['deleteGroup'],
    mutationFn: () => api.post('/group/group.deletegroupasync', {}, { params: { id: group.id } }),
    onError: err => {
      console.log(err)
      toast.error(f)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['groups'])
      toast.success(s)
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

  function onDelete() {
    const validate = window.confirm('Do you want to delete this group?')
    if (validate) {
      deleteGroup.mutate()
    }
  }

  return (
    <AccordionDetails>
      <div className='flex py-5 items-center justify-center gap-4'>
        {update.isPending || deleteGroup.isPending ? (
          <CircularProgress />
        ) : (
          <>
            <Button variant={language === 'en' ? 'contained' : 'outlined'} onClick={onUpdate}>
              {t('Update')}
            </Button>
            <Button variant={language === 'en' ? 'contained' : 'outlined'} onClick={onCancel}>
              {t('Cancel')}
            </Button>
            <Button variant={language === 'en' ? 'contained' : 'outlined'} onClick={() => setOpenEdit(p => !p)}>
              {t('Edit Group info')}
            </Button>
            <Button variant={language === 'en' ? 'contained' : 'outlined'} color='error' onClick={onDelete}>
              {t('Delete')}
            </Button>
          </>
        )}

        <EditGroupInfo open={openEdit} toggle={() => setOpenEdit(p => !p)} data={group} />
      </div>
    </AccordionDetails>
  )
}
