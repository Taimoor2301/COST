const navigation = () => {
  return [
    {
      icon: 'tabler:smart-home',
      title: 'Dashboard',
      path: '/vendor/dashboards',
      role: 'vendor'
    },
    {
      icon: 'tabler:building-store',
      title: 'Products Management',
      path: '/vendor/products-management',
      role: 'vendor'
    },
    {
      title: 'Orders',
      path: '/vendor/orders',
      icon: 'tabler:checklist',
      role: 'vendor'
    },
    {
      title: 'Settings',
      path: '/vendor/setting',
      icon: 'tabler:settings',
      role: 'vendor'
    },
    {
      icon: 'tabler:smart-home',
      title: 'Dashboard',
      path: '/admin/dashboards',
      role: 'admin'
    }
  ]
}

export default navigation
