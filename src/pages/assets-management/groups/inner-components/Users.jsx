import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '@mui/material/Card'
import Selection from '../inner-components/Selection'
import { Divider } from '@mui/material'
import SelectionContainer from '../inner-components/SelectedContainer'
import SelctableItem from './SelectableItem'
import { useTranslation } from 'react-i18next'
import useAPI from 'src/hooks/useNewApi'

export default function Users({ allUsers, selectedUsers, handleUserChange }) {
  const [selectedRole, setSelectedRole] = useState('All')
  const api = useAPI()

  const { t } = useTranslation()

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => api.get('/roles/roles.getlistofrolesasync')
  })

  const [usersToShow, setUsersToShow] = useState(allUsers)

  useEffect(() => {
    if (selectedRole === 'All') {
      setUsersToShow(allUsers)
    } else {
      setUsersToShow(allUsers?.filter(user => user.roles.some(role => role.roleId === selectedRole.id)))
    }
  }, [selectedRole, allUsers])

  return (
    <div className='col-span-1 h-full w-full'>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className='flex justify-between items-end gap-3 pl-4 pb-2'>
          <span className='text-lg'>{t('Roles')}</span>
          <Selection options={roles?.data?.data} selected={selectedRole} setSelected={setSelectedRole} />
        </div>
        <Divider />
        <SelectionContainer
          selected={selectedUsers.map(el => ({ id: el.id, text: el.firstName + ' ' + el.lastName }))}
          onSelect={handleUserChange}
        />
        <Divider />
        <div className='overflow-auto flex-1'>
          {usersToShow.map(u => (
            <SelctableItem
              text={u.firstName + ' ' + u.lastName}
              itemId={u.id}
              key={u.id}
              onSelect={handleUserChange}
              selected={selectedUsers.some(e => e.id === u.id)}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
