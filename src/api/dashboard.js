import request from '@/utils/request'

export function countList(userData) {
  return request({
    url: 'documents/counts',
    method: 'get',
    auth: {
      /* username: 'admin',
      password: 'admin'*/
      username: userData.username,
      password: userData.password
    }
  })
}
export function conflictList(userData) {
  return request({
    url: '/conflicts',
    params: {
      userId: ''
    },
    method: 'get',
    auth: {
      /* username: loginInfo.username,
      password: loginInfo.password*/
      /* username: 'admin',
      password: 'admin'*/
      username: userData.username,
      password: userData.password
    }
  })
}

