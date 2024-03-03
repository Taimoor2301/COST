// ** React Imports
import { createContext, use, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { baseURL } from 'src/Constants/Constants'
import toast from 'react-hot-toast'
import permissions from 'src/store/apps/permissions'
import { useAuth } from 'src/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAPI from 'src/hooks/useNewApi'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [userPermissions, setUserPermissions] = useState([])
  const [userRoles, setUserRoles] = useState([])
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const api = useAPI()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem('accessToken')

      console.log('init')

      if (storedToken && !user) {
        console.log('init 2')
        setLoading(true)
        try {
          const res = await api.get(`/users/users.getuserdetailsbyidasync`, { params: { id:JSON.parse(localStorage.getItem('userData')).id } });

          // const res = await api.get(`/personal/personal.getcurrentuserdetailasync`)
          setUser({ ...res.data?.data, role: 'admin' })

        } catch (error) {
          if (error.response?.status === 401) {
            window.localStorage.removeItem('accessToken')
            window.localStorage.removeItem('refreshToken')
            window.localStorage.removeItem('userData')
            localStorage.removeItem('userInfo')
            router.replace('/login')
          } else {
            console.log(error)
            router.replace('/login')
          }
        } finally {
          setLoading(false)
        }
      } else {
        setUser(null)
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleLogin = async (params, errorCallback) => {
    const { email, password } = params
    try {
      const res = await axios.post(
        `${baseURL + '/tokens/token.gettokenasync'}`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            tenant: 'root'
          }
        }
      )

      localStorage.removeItem('userInfo')
      localStorage.setItem('accessToken', res.data.data.token.token)
      localStorage.setItem('refreshToken', res.data.data.token.refreshToken)
      localStorage.setItem('userData', JSON.stringify({ ...res.data.data.user, role: 'admin' }))
      setUser({ ...res.data.data.user, role: 'admin' })

      const returnUrl = router.query.returnUrl
      const redirectURL = returnUrl && returnUrl !== '/dashboards' ? returnUrl : '/dashboards'
      router.replace(redirectURL)
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        errorCallback()
      } else {
        toast.error('Something went wrong')
      }
    }
  }

  const handleLogout = () => {


    // window.localStorage.clear()

    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    window.localStorage.removeItem('userPermissions')
    window.localStorage.removeItem('userRoles')
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('formBuilderTemplates')
    localStorage.removeItem('userInfo')

    setUser(null)

    router.replace('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    userPermissions,
    userRoles
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
