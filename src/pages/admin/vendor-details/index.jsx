// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'

// ** Demo Components Imports
import UserProfile from './components/UserProfile'
import UserViewRight from './components/UserViewRight'
import AdminLayout from 'src/experiment/Adminlayout'

const UserView = () => {
  //   const router = useRouter()
  //   const { data } = router.query

  return (
    <AdminLayout>
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserProfile userData={data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight userData={data} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default UserView

const data = {
  name: 'GC Suppliers',
  email: 'gcofficial@gmail.com',
  phoneNumber: '+96654545454',
  location: 'Saddar Rawalpindi',
  category: 'Vegetable',
  image:
    'data:image/jpeg;base64,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',
  ratings: 4.7,
  contactPerson: {
    name: 'Hamza Hafeez',
    email: 'hamzahafee@gmail.com',
    phoneNumber: '+923465154345'
  },
  reviews: [
    { from: 'Taimoor Ali', text: 'They provide good service', ratings: 4.5, id: Math.random() },
    { from: 'Hafeez Khan', text: 'Excellent Service', ratings: 4.7, id: Math.random() },
    { from: 'Ahmed Khan', text: 'Excellent Service and delivery', ratings: 4.7, id: Math.random() },
    { from: 'Azeem Raja', text: 'Best Service', ratings: 4.7, id: Math.random() },
    { from: 'Sufyan Khan', text: 'Excellent Service', ratings: 4.7, id: Math.random() },
    { from: 'Mehboob Shah', text: 'Amazing Service', ratings: 4.7, id: Math.random() },
    { from: 'Arooj Munir', text: 'Excellent Products Quality', ratings: 4.7, id: Math.random() }
  ],
  products: [
    {
      id: Math.random(),
      name: 'Potatoes',
      des: 'These are fresh potatoes',
      stock: '200',
      ratings: 4.5,
      img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBvdGF0b2V8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: Math.random(),
      name: 'Onions',
      des: 'These are onions',
      stock: '200',
      ratings: 4.5,
      img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25pb258ZW58MHx8MHx8fDA%3D'
    },
    {
      id: Math.random(),
      name: 'Cabbage',
      des: 'Fresh cabbage',
      stock: '200',
      ratings: 4.5,
      img: 'https://images.unsplash.com/photo-1611105637889-3afd7295bdbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D'
    }
  ]
}
