/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/store.js"

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard/home'
        },
        {
          path: '/dashboard/home',
          name: 'dashboard-home',
          component: () => import('./views/Home.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home', active: true}
            ],
            pageTitle: 'Dashboard',
            authRequired: true,
          }
        },
        // =============================================================================
        // Captains Routes
        // =============================================================================
        {
          path: '/captainsModule/all-captains',
          name: 'all-captains',
          component: () => import('./views/modules/captains/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Captain'},
              {title: 'Captains', active: true},
            ],
            authRequired: true,
            pageTitle: 'Captains',
          }
        },
        {
          path: '/captainsModule/add-captain',
          name: 'add-captain',
          component: () => import('./views/modules/captains/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Captain'},
              {title: 'Captains'},
              {title: 'Add Captain', active: true},
            ],
            pageTitle: 'Add Captain',
            authRequired: true,
          }
        },
        {
          path: '/captainsModule/edit-captain/:id',
          name: 'edit-captain',
          component: () => import('./views/modules/captains/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Captain'},
              {title: 'Captains'},
              {title: 'Edit Captain', active: true},
            ],
            pageTitle: 'Edit Captain',
            authRequired: true,
          }
        },
        // =============================================================================
        // Orders Routes
        // =============================================================================
        {
          path: '/ordersModule/all-orders',
          name: 'all-order',
          component: () => import('./views/modules/orders/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Order'},
              {title: 'Order'},
              {title: 'All Orders', active: true},
            ],
            pageTitle: 'All Orders',
            authRequired: true,
          }
        },
        {
          path: '/ordersModule/collect-orders',
          name: 'collect-orders',
          component: () => import('./views/modules/orders/collectOrders/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Collect Order'},
              {title: 'Collect Order'},
              {title: 'Collect Orders', active: true},
            ],
            pageTitle: 'Collect Orders',
            authRequired: true,
          }
        },
        {
          path: '/ordersModule/show-order/:id',
          name: 'show-order',
          component: () => import('./views/modules/orders/show/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Order'},
              {title: 'Order'},
              {title: 'Show Order', active: true},
            ],
            pageTitle: 'Show Order',
            authRequired: true,
          }
        },
        // =============================================================================
        // Vehicles Routes
        // =============================================================================
        {
          path: '/vehiclesModule/all-brands',
          name: 'all-brands',
          component: () => import('./views/modules/vehicles/brands/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Brands'},
              {title: 'Brands', active: true},
            ],
            pageTitle: 'Brands',
            authRequired: true,
          }
        },
        {
          path: '/vehiclesModule/all-models',
          name: 'all-models',
          component: () => import('./views/modules/vehicles/models/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Models'},
              {title: 'Models', active: true},
            ],
            pageTitle: 'Models',
            authRequired: true,
          }
        },
        {
          path: '/vehiclesModule/all-vehicles',
          name: 'all-vehicles',
          component: () => import('./views/modules/vehicles/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Vehicles'},
              {title: 'Vehicles', active: true},
            ],
            pageTitle: 'Vehicles',
            authRequired: true,
          }
        },
        {
          path: '/vehiclesModule/add-vehicle',
          name: 'add-vehicle',
          component: () => import('./views/modules/vehicles/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Vehicles'},
              {title: 'Vehicles'},
              {title: 'Add Vehicle', active: true},
            ],
            pageTitle: 'Add Vehicle',
            authRequired: true,
          }
        },
        {
          path: '/vehiclesModule/edit-vehicle/:id',
          name: 'edit-vehicle',
          component: () => import('./views/modules/vehicles/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Vehicles'},
              {title: 'Vehicles'},
              {title: 'Edit Vehicle', active: true},
            ],
            pageTitle: 'Edit Vehicle',
            authRequired: true,
          }
        },
        // =============================================================================
        // Clients Routes
        // =============================================================================
        {
          path: '/clientsModule/all-clients',
          name: 'all-clients',
          component: () => import('./views/modules/clients/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Clients'},
              {title: 'Clients', active: true},
            ],
            pageTitle: 'Clients',
            authRequired: true,
          }
        },
        {
          path: '/clientsModule/add-client',
          name: 'add-client',
          component: () => import('./views/modules/clients/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Clients'},
              {title: 'Clients'},
              {title: 'Add Client', active: true},
            ],
            pageTitle: 'Add Client',
            authRequired: true,
          }
        },
        {
          path: '/clientsModule/edit-client/:id',
          name: 'edit-client',
          component: () => import('./views/modules/clients/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Clients'},
              {title: 'Clients'},
              {title: 'Edit Client', active: true},
            ],
            pageTitle: 'Edit Clients',
            authRequired: true,
          }
        },
        // =============================================================================
        // Branches Routes
        // =============================================================================
        {
          path: '/branchesModule/all-branches',
          name: 'all-branches',
          component: () => import('./views/modules/branches/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Branches'},
              {title: 'Branches', active: true},
            ],
            pageTitle: 'Branches',
            authRequired: true,
          }
        },
        {
          path: '/branchesModule/add-branch',
          name: 'add-branch',
          component: () => import('./views/modules/branches/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Branches'},
              {title: 'Branches'},
              {title: 'Add Branch', active: true},
            ],
            pageTitle: 'Add Branch',
            authRequired: true,
          }
        },
        {
          path: '/branchesModule/edit-branch/:id',
          name: 'edit-branch',
          component: () => import('./views/modules/branches/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Branches'},
              {title: 'Branches'},
              {title: 'Edit Branches', active: true},
            ],
            pageTitle: 'Edit Branches',
            authRequired: true,
          }
        },
        // =============================================================================
        // Coupons Routes
        // =============================================================================
        {
          path: '/couponsModule/all-coupons',
          name: 'all-coupons',
          component: () => import('./views/modules/coupons/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Coupons'},
              {title: 'Coupons', active: true},
            ],
            pageTitle: 'Coupons',
            authRequired: true,
          }
        },
        {
          path: '/couponsModule/add-coupon',
          name: 'add-coupon',
          component: () => import('./views/modules/coupons/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Coupons'},
              {title: 'Coupons'},
              {title: 'Add Coupon', active: true},
            ],
            pageTitle: 'Add Coupon',
            authRequired: true,
          }
        },
        {
          path: '/couponsModule/edit-coupon/:id',
          name: 'edit-coupon',
          component: () => import('./views/modules/coupons/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Coupons'},
              {title: 'Coupons'},
              {title: 'Edit Coupons', active: true},
            ],
            pageTitle: 'Edit Coupons',
            authRequired: true,
          }
        },
        // =============================================================================
        // Admins Routes
        // =============================================================================
        {
          path: '/adminsModule/all-admins',
          name: 'all-admins',
          component: () => import('./views/modules/admins/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Admins'},
              {title: 'Admins', active: true},
            ],
            pageTitle: 'Admins',
            authRequired: true,
          }
        },
        {
          path: '/adminsModule/add-admin',
          name: 'add-admin',
          component: () => import('./views/modules/admins/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Admins'},
              {title: 'Admins'},
              {title: 'Add Admin', active: true},
            ],
            pageTitle: 'Add Admin',
            authRequired: true,
          }
        },
        {
          path: '/adminsModule/edit-admin/:id',
          name: 'edit-admin',
          component: () => import('./views/modules/admins/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Admins'},
              {title: 'Admins'},
              {title: 'Edit Admin', active: true},
            ],
            pageTitle: 'Edit Admin',
            authRequired: true,
          }
        },
        // =============================================================================
        // Roles Routes
        // =============================================================================
        {
          path: '/rolesModule/all-roles',
          name: 'all-roles',
          component: () => import('./views/modules/roles/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Roles'},
              {title: 'Roles', active: true},
            ],
            pageTitle: 'Roles',
            authRequired: true,
          }
        },
        {
          path: '/rolesModule/add-role',
          name: 'add-role',
          component: () => import('./views/modules/roles/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Roles'},
              {title: 'Roles'},
              {title: 'Add Role', active: true},
            ],
            pageTitle: 'Add Role',
            authRequired: true,
          }
        },
        {
          path: '/rolesModule/edit-role/:id',
          name: 'edit-role',
          component: () => import('./views/modules/roles/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Roles'},
              {title: 'Roles'},
              {title: 'Edit Role', active: true},
            ],
            pageTitle: 'Edit Role',
            authRequired: true,
          }
        },
        // =============================================================================
        // Settings Routes
        // =============================================================================
        {
          path: 'settingsModule/main_settings',
          name: 'main_settings',
          component: () => import('./views/modules/settings/main/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Settings'},
              {title: 'Main Settings', active: true},
            ],
            pageTitle: 'Main Settings',
            authRequired: true,
          }
        },
        // =============================================================================
        // Transactions Routes
        // =============================================================================
        {
          path: 'transactionModule/all_transactions',
          name: 'all_transactions',
          component: () => import('./views/modules/transactions/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Transactions'},
              {title: 'All Transactions', active: true},
            ],
            pageTitle: 'All Transactions',
            authRequired: true,
          }
        },
        // =============================================================================
        // Transactions Routes
        // =============================================================================
        {
          path: 'trackingModule/all_drivers_map',
          name: 'all_drivers_map',
          component: () => import('./views/modules/map/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Tracking'},
              {title: 'All Drivers Map', active: true},
            ],
            pageTitle: 'All Drivers Map',
            authRequired: true,
          }
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor',
            authRequired: false,
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {
  // If auth required, check login. If login fails redirect to login page
  if (to.meta.authRequired) {
    // console.log(store.state.moduleAuth.isUserLoggedIn())
    let token = localStorage.getItem('token')
    if (!token) {
      router.push({name: 'page-login', query: {to: to.path}})
    }
  }

  next();
});

export default router
