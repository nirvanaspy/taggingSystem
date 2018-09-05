import request from '@/utils/request'
// 申请复审文章
export function distributionRecheckDoc(data, loginInfo) {
  return request({
    url: '/documents/distribution/accept/',
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    },
    data
  })
}

// 按用户申请复审文章
export function disRecheckDocByUser(data, loginInfo) {
  return request({
    url: 'documents/distribution/acceptByUser',
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    },
    data
  })
}

export function getDocByUser(loginInfo, listQuery) {
  return request({
    url: '/documents/accept',
    params: {
      userId: '',
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
    url: '/documents/' + id + '/accept/release',
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
