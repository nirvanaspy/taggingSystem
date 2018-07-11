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

export function getProgressByUser(loginInfo, id) {
  return request({
    url: '/users/' + id + '/progress',
    method: 'get',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
// 获取标注类型比例
export function getMarkTypeInfo(loginInfo, paramData) {
  return request({
    url: '/documents/marktypeinfo',
    method: 'get',
    params: {
      isMarked: paramData.isMarked,
      isReviewed: paramData.isReviewed,
      isAccepted: paramData.isAccepted
    },
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
