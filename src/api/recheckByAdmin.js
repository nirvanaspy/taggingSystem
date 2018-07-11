import request from '@/utils/request'

export function getReviewedDoc(loginInfo, listQuery) {
  return request({
    url: '/documents/markedandreviewedandaccepted',
    params: {
      isMarked: true,
      isReviewed: true,
      isAccepted: false,
      size: listQuery.size,
      page: listQuery.page
    },
    method: 'get',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function rejectDocument(id, loginInfo) {
  return request({
    url: '/documents/' + id + '/reject',
    method: 'put',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function acceptDocument(id, loginInfo) {
  return request({
    url: '/documents/' + id + '/accept',
    method: 'put',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function getAcceptDoc(loginInfo, listQuery) {
  return request({
    url: '/documents/markedandreviewedandaccepted',
    method: 'get',
    params: {
      isMarked: true,
      isReviewed: true,
      isAccepted: true,
      size: listQuery.size,
      page: listQuery.page
    },
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
