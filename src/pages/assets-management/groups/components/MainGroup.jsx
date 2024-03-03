import React from 'react'
import { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import GroupHead from './GroupHead'
import 'react-credit-cards/es/styles-compiled.css'
import GroupBody from './GroupBody'
import GroupButtons from './GroupButtons'
import { useQuery } from '@tanstack/react-query'
import useAPI from 'src/hooks/useNewApi'

export default function Groups({ data, index, expanded, setExpanded }) {
  const { name, siteIds, userIds, questionnaireIds } = data
  const api = useAPI()

  // !sites
  const [allSites, setAllSites] = useState([])
  const [selectedSites, setSelectedSites] = useState([])

  const { data: sites } = useQuery({ queryKey: ['sites'], queryFn: () => api.get('/sites/sites.getallsitesasync') })

  useEffect(() => {
    if (sites) {
      setAllSites(sites?.data?.data?.data)
      setSelectedSites(sites?.data?.data?.data.filter(s => siteIds.includes(s.id)))
    }
  }, [sites, siteIds])

  function handleSiteChange(id) {
    if (selectedSites.some(s => s.id === id)) {
      setSelectedSites(p => p.filter(s => s.id !== id))
    } else {
      const site = allSites.find(e => e.id === id)
      setSelectedSites(p => [...p, site])
    }
  }

  // ! users

  const {
    data: users,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users/users.getlistofallusersasync')
  })

  const [allUsers, setAllUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    if (users) {
      setAllUsers(users?.data?.data)
      setSelectedUsers(users?.data?.data?.filter(user => userIds.includes(user.id)))
    }
  }, [users, userIds])

  function handleUsersChange(id) {
    if (selectedUsers.some(u => u.id === id)) {
      setSelectedUsers(p => p.filter(u => u.id !== id))
    } else {
      const user = allUsers.find(u => u.id === id)
      setSelectedUsers(p => [...p, user])
    }
  }

  // ! questinneries

  const { data: questinneries } = useQuery({
    queryKey: ['questinneries'],
    queryFn: () => api.get('/questionnaire/questionnaire.getallquestionnaireasync')
  })

  const [allQuestionneries, setAllQuestionneries] = useState([])
  const [selectedQuestionneries, setSelectedQuestionneries] = useState([])

  useEffect(() => {
    if (questinneries) {
      setAllQuestionneries(questinneries?.data?.data?.data)
      setSelectedQuestionneries(questinneries?.data?.data?.data?.filter(que => questionnaireIds.includes(que.id)))
    }
  }, [questinneries, questionnaireIds])

  function handleQuestionneriesChange(id) {
    if (selectedQuestionneries.some(u => u.id === id)) {
      setSelectedQuestionneries(p => p.filter(u => u.id !== id))
    } else {
      const que = allQuestionneries.find(u => u.id === id)
      setSelectedQuestionneries(p => [...p, que])
    }
  }

  function onCancel() {
    setSelectedUsers(users?.data?.data?.filter(user => userIds.includes(user.id)))
    setSelectedQuestionneries(questinneries?.data?.data?.data?.filter(que => questionnaireIds.includes(que.id)))
    setSelectedSites(sites?.data?.data?.data.filter(s => siteIds.includes(s.id)))
  }

  return (
    <div>
      <Accordion expanded={expanded === data.id} onChange={() => setExpanded(p => (p === data.id ? null : data.id))}>
        <GroupHead data={data} />
        <Divider sx={{ m: '0 !important' }} />
        <GroupBody
          allSites={allSites}
          selectedSites={selectedSites}
          handleSiteChange={handleSiteChange}
          data={data}
          allUsers={allUsers}
          selectedUsers={selectedUsers}
          handleUsersChange={handleUsersChange}
          allQuestionneries={allQuestionneries}
          selectedQuestionneries={selectedQuestionneries}
          handleQuestionneriesChange={handleQuestionneriesChange}
        />
        <Divider sx={{ m: '0 !important' }} />
        <GroupButtons
          group={data}
          selectedSites={selectedSites}
          selectedQuestionneries={selectedQuestionneries}
          selectedUsers={selectedUsers}
          onCancel={onCancel}
        />
      </Accordion>
    </div>
  )
}
