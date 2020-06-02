/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/


export default [
  {
    url: null,
    name: "Dashboard",
    // tag: "2",
    // tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard",
    submenu: [
      {
        url: '/dashboard/home',
        name: "home",
        slug: "dashboard-home",
        i18n: "home",
      },
    ]
  },
  {
    header: "Apps",
    icon: "PackageIcon",
    i18n: "app_core",
    items: [
      {
        url: null,
        name: "vehicles",
        icon: "TruckIcon",
        i18n: "vehicles",
        submenu: [
          {
            url: '/vehiclesModule/all-vehicles',
            name: "vehicles",
            slug: "all-vehicles",
            i18n: "vehicles",
          }
        ]
      },
      {
        url: null,
        name: "captain",
        icon: "UserIcon",
        i18n: "captain",
        submenu: [
          {
            url: '/captainsModule/all-captains',
            name: "captains",
            slug: "all-captains",
            i18n: "captains",
          },
        ]
      },
      {
        url: null,
        name: "clients",
        icon: "UsersIcon",
        i18n: "clients",
        submenu: [
          {
            url: '/clientsModule/all-clients',
            name: "clients",
            slug: "all-clients",
            i18n: "clients",
          }
        ]
      },
      {
        url: null,
        name: "coupons",
        icon: "GiftIcon",
        i18n: "coupons",
        submenu: [
          {
            url: '/couponsModule/all-coupons',
            name: "coupons",
            slug: "all-coupons",
            i18n: "coupons",
          }
        ]
      },
      {
        url: null,
        name: "orders",
        icon: "LifeBuoyIcon",
        i18n: "orders",
        tag: 'لم ينتهي',
        tagColor: 'red',
        submenu: [
          {
            url: '/ordersModule/all-orders',
            name: "orders",
            slug: "all-orders",
            i18n: "orders",
          },
        ]
      },
    ],
  },
  {
    header: "Settings",
    icon: "PackageIcon",
    i18n: "settings",
    items: [
      {
        url: null,
        name: "settings",
        icon: "SettingsIcon",
        i18n: "settings",
        tag: 'لم ينتهي',
        tagColor: 'red',
        submenu: [
          {
            url: '/settingsModule/main_settings',
            name: "main_settings",
            slug: "main-settings",
            i18n: "main_settings",
          },
          {
            url: '/rolesModule/all-roles',
            name: "roles",
            slug: "all-roles",
            i18n: "roles",
          }
        ]
      },
      {
        url: null,
        name: "branches",
        icon: "GitBranchIcon",
        i18n: "branches",
        submenu: [
          {
            url: '/branchesModule/all-branches',
            name: "branches",
            slug: "all-branches",
            i18n: "branches",
          }
        ]
      },
      {
        url: null,
        name: "admins",
        icon: "UsersIcon",
        i18n: "admins",
        tag: 'لم ينتهي',
        tagColor: 'red',
        submenu: [
          {
            url: '/adminsModule/all-admins',
            name: "admins",
            slug: "all-admins",
            i18n: "admins",
          },
        ]
      },
    ]
  }
]

