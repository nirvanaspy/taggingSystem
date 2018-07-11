import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: '/users',
    method: 'post',
    params: {
      isAdmin: false
    },
    /* auth: {
      username: 'admin',
      password: 'admin'
    }, */
    data
  })
}
// 获取所有用户
export function getUsers(loginInfo) {
  return request({
    url: '/users',
    method: 'get',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
// 没用到
export function modifyUser(data) {
  return request({
    url: 'users',
    method: 'post',
    params: {
      isAdmin: false
    },
    auth: {
      username: 'admin',
      password: 'admin'
    },
    data
  })
}

export function createUser(data, loginInfo) {
  return request({
    url: '/users/creatusers',
    method: 'post',
    params: {
      prefix: data.prefix,
      num: data.num,
      isAdmin: data.isAdmin
    },
    auth: {
      /* username: 'admin',
      password: 'admin'*/
      username: loginInfo.username,
      password: loginInfo.password
    },
    data
  })
}

export function changePassword(id, psw, loginInfo) {
  return request({
    url: '/users/' + id + '/changepassword',
    method: 'patch',
    params: {
      userId: id,
      password: psw
    },
    auth: {
      /* username: 'admin',
      password: 'admin'*/
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
