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
          }
        },
        // =============================================================================
        // Orders Routes
        // =============================================================================
        {
          path: '/ordersModule/all-orders',
          name: 'add-order',
          component: () => import('./views/modules/orders/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Order'},
              {title: 'Order'},
              {title: 'Add Order', active: true},
            ],
            pageTitle: 'Add Order',
          }
        },
        // =============================================================================
        // Captains Routes
        // =============================================================================
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
            rule: 'editor'
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
  next();
});

export default router
