import request from '@/utils/request'

export function addUser(data) {
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

export function createUser(data) {
  return request({
    url: '/users/creatusers',
    method: 'post',
    params: {
      prefix: data.prefix,
      num: data.num,
      isAdmin: data.isAdmin
    },
    auth: {
      username: 'admin',
      password: 'admin'
    },
    data
  })
}

export function changePassword(id, psw) {
  return request({
    url: '/users/' + id + '/changepassword',
    method: 'patch',
    params: {
      userId: id,
      password: psw
    },
    auth: {
      username: 'admin',
      password: 'admin'
    }
  })
}
