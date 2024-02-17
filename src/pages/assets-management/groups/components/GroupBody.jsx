import React from 'react'
import AccordionDetails from '@mui/material/AccordionDetails'
import Sites from '../inner-components/Sites'
import Map from '../inner-components/Map'
import Que from '../inner-components/Que'
import Users from '../inner-components/Users'

export default function GroupBody({
  data,
  allSites,
  selectedSites,
  handleSiteChange,
  allUsers,
  selectedUsers,
  handleUsersChange,
  allQuestionneries,
  selectedQuestionneries,
  handleQuestionneriesChange
}) {
  return (
    <AccordionDetails>
      <main className='grid grid-cols-1 md:grid-cols-2 py-5 gap-5 grid-rows-[50vh_50vh_50vh_50vh] md:grid-rows-[20rem_20rem]'>
        <Sites allSites={allSites} selectedSites={selectedSites} handleSiteChange={handleSiteChange} />
        <Map selectedSites={selectedSites} />
        <Users allUsers={allUsers} selectedUsers={selectedUsers} handleUserChange={handleUsersChange} />
        <Que
          allQuestionneries={allQuestionneries}
          selectedQuestionneries={selectedQuestionneries}
          handleQuestionneriesChange={handleQuestionneriesChange}
        />
      </main>
    </AccordionDetails>
  )
}
