// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import forgetpass from '../../assest/images/46.png'
import logo from '../../assest/images/kaptlogo.svg'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import toast from 'react-hot-toast'
import axios from 'axios'
import { baseURL } from 'src/Constants/Constants'
import { useState } from 'react'
import { useRouter } from 'next/router'



const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body1.fontSize
}))

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { t } = useTranslation()

  const router = useRouter()

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const [email , setEmail] = useState('')

  const [loading , setLoading] = useState(false)


  async function handleSubmit(e){
    e.preventDefault()

      setLoading(true)

    try {

      const res = await axios.post(baseURL+ '/users/users.forgotpasswordasync', {email}, {headers:{
        'Content-Type': 'application/json',
        accept: 'application/json',
        tenant: 'root'
      }})

      localStorage.setItem('forgotPassCredentials', JSON.stringify(res.data?.data))

    } catch (error) {
      toast.error(`No User found with this Email`)
      console.log(error)
    } finally{
      setLoading(false)
    }
  }



  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(5, 0, 5, 8)
          }}
        >
          <Image
            alt='forget-password'
            src={forgetpass}
            style={{ height: '93vh', objectFit: 'contain', width: '35%' }}
          />
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
              <Image alt='kapt logo' src={logo} width={180} />
            </Box>
            <Box sx={{ mb: 6, mt: -6 }}>
              <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
                {t('Forgot Password? 🔒')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {t("Enter your email and we'll send you instructions to reset your password")}
              </Typography>
            </Box>
            <form autoComplete='off' onSubmit={handleSubmit}>
              <CustomTextField fullWidth required value={email} onChange={e => setEmail(e.target.value)} autoFocus type='email' label='Email' sx={{ display: 'flex', mb: 4 }} />
              <Button fullWidth type='submit' disabled={loading} variant='contained' sx={{ mb: 4 }}>
                Send reset link
              </Button>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { mr: 1 } }}>
                <LinkStyled href='/login'>
                  <Icon fontSize='1.25rem' icon='tabler:chevron-left' />
                  <span>Back to login</span>
                </LinkStyled>
              </Typography>
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>
ForgotPassword.guestGuard = true

export default ForgotPassword
