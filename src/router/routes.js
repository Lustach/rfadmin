export const ROUTE_HOME = 'route_home'
export const ROUTE_AUTH = 'route_auth'
export const ROUTE_DASHBOARD = 'route_db'
export const ROUTE_SHOPS = 'route_shops'

const routes = [
  {
    name: ROUTE_HOME,
    path: '/',
    redirect: { name: ROUTE_DASHBOARD },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: ROUTE_DASHBOARD, path: '', component: () => import('pages/Dashboard.vue') },
      { path: '/Dashboard2', component: () => import('pages/Dashboard2.vue') },
      { path: '/Profile', component: () => import('pages/UserProfile.vue') },
      { path: '/Map', component: () => import('pages/Map.vue') },
      { path: '/MapMarker', component: () => import('pages/MapMarker.vue') },
      { path: '/StreetView', component: () => import('pages/StreetView.vue') },
      { path: '/TreeTable', component: () => import('pages/TreeTable.vue') },
      { path: '/Categories', component: () => import('pages/Categories.vue') },
      { path: '/customers', component: () => import('pages/customers.vue') },
      { path: '/products', component: () => import('pages/products.vue') },
      { path: '/orders', component: () => import('pages/Orders.vue') },
      { path: '/users', component: () => import('pages/Users.vue') },
      { name: ROUTE_SHOPS, path: '/shops', component: () => import('pages/Shops.vue') },
      { path: '/quotes', component: () => import('pages/quotes.vue') },
      { path: '/Charts', component: () => import('pages/Charts.vue') },
      { path: '/Cards', component: () => import('pages/Cards.vue') },
      { path: '/Tables', component: () => import('pages/Tables.vue') },
      { path: '/Contact', component: () => import('pages/Contact.vue') },
      { path: '/Checkout', component: () => import('pages/Checkout.vue') },
      { path: '/Calendar', component: () => import('pages/Calendar.vue') },
      { path: '/Pagination', component: () => import('pages/Pagination.vue') },
      { path: '/Taskboard', component: () => import('pages/TaskBoard.vue') }
    ]
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    name: ROUTE_AUTH,
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
