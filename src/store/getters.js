const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  routers: state => state.permission.routers,
  userAuth: state => state.user.userAuth,
  addRouters: state => state.permission.addRouters
}
export default getters
