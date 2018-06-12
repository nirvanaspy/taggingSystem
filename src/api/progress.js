import request from '@/utils/request'

export function getProgress(loginInfo) {
  return request({
    url: '/progress',
    method: 'get',
    auth: {
      /* username: 'admin',
      password: 'admin'*/
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
