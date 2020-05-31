export default {
  isUserLoggedIn: () => {
    let isAuthenticated = true

    return (localStorage.getItem('userInfo') && isAuthenticated)
  },
}
