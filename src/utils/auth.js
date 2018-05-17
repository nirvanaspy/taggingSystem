import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RolesKey = 'Admin-Roles'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getRoles() {
  return Cookies.get(RolesKey)
}
export function setHidden(flag) {
  return Cookies.set('Hiddenflag', flag)
}
export function getHidden() {
  return Cookies.get('Hiddenflag')
}
export function removeHidden() {
  return Cookies.remove('Hiddenflag')
}
export function removeUsername() {
  return Cookies.remove('username')
}
export function removePassword() {
  return Cookies.remove('password')
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setRoles(roles) {
  return Cookies.set(RolesKey, roles)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setUserId(id) {
  return Cookies.set('userId', id)
}
export function removeUserId() {
  return Cookies.remove('userId')
}
export function getUserId() {
  return Cookies.get('userId')
}
export function getPsw() {
  return Cookies.get('password')
}
export function rolesFlag() {
/*  if (Cookies.get(RolesKey) === 'admin') {
    console.log(Cookies.get(RolesKey))
    return false
  } else {
    return true
  }*/
  return Cookies.get(RolesKey) !== 'admin'
}
