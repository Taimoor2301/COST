import React, { useState, useEffect } from 'react'
import api from './useApi';

export default function useSettingsData(groupName) {
  const [loading , setLoading] = useState(false);
  const [values , setValues] = useState('')

  async function fetchData() {
    try {
      setLoading(true)

      const res = await api.get('/settings/settings.getsystemsettingsbygroupasync', {
        params: { group: groupName }
      })
      const values = JSON.parse(Object.values({ ...res.data.settings })[0])

      setValues(values)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[groupName])

  return {values , loading}
}
