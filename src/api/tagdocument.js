import request from '@/utils/request'

export function documentList(listQuery, loginInfo) {
  return request({
    url: 'documents/mark',
    params: {
      userId: '',
      isMarked: false,
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

export function importDocu(data, loginInfo) {
  return request({
    url: '/documents/import',
    method: 'post',
    auth: {
      /* username: 'admin',
      password: 'admin'*/
      username: loginInfo.username,
      password: loginInfo.password
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function outputDocu(data, loginInfo) {
  return request({
    url: '/documents/export',
    method: 'get',
    params: {
      type: data.type,
      startindex: data.startIndex,
      endindex: data.endIndex
    },
    auth: {
      /* username: 'admin',
      password: 'admin'*/
      username: loginInfo.username,
      password: loginInfo.password
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function documentDetail(id, loginInfo) {
  return request({
    url: '/documents/' + id,
    params: {
      userId: ''
    },
    method: 'get',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function markdocument(id, data, loginInfo) {
  return request({
    url: '/documents/' + id + '/mark',
    params: {
      documentId: id,
      questions: data.question,
      answers: data.answer,
      markTypeId: data.markType
    },
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
export function updateMark(id, data, changeTypeId, loginInfo) {
  return request({
    url: '/marks/' + id,
    params: {
      MarkId: id,
      question: data.question,
      answer: data.answer,
      markTypeId: changeTypeId
    },
    method: 'put',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}
export function deleteMark(documentId, markId, loginInfo) {
  return request({
    url: '/documents/' + documentId + '/mark/' + markId,
    params: {
      documentId: documentId,
      markId: markId
    },
    method: 'delete',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function commitdocument(id, loginInfo) {
  return request({
    url: '/documents/' + id + '/mark/release',
    params: {
      documentId: id
    },
    method: 'put',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}

export function docDistribution(data, loginInfo) {
  return request({
    url: '/documents/distribution/mark/',
    method: 'post',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    },
    data
  })
}

/* export function getDocByMarkUser(loginInfo, id) {
  return request({
    url: 'documents/mark',
    params: {
      userId: id,
      isMarked: true
    },
    method: 'get',
    auth: {
      username: loginInfo.username,
      password: loginInfo.password
    }
  })
}*/
