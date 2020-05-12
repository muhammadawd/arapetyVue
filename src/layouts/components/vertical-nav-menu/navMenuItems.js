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
    url: null,
    name: "captain",
    icon: "TruckIcon",
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
]

