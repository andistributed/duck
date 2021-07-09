import request from '@/util/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}

export function jobConfList(data) {
  return request({
    url: '/job/list',
    method: 'post',
    data
  })
}

export function jobAdd(data) {
  return request({
    url: '/job/add',
    method: 'post',
    data
  })
}

export function jobEdit(data) {
  return request({
    url: '/job/edit',
    method: 'post',
    data
  })
}
export function jobDelete(data) {
  return request({
    url: '/job/delete',
    method: 'post',
    data
  })
}

// 手动执行任务
export function jobExecute(data) {
  return request({
    url: '/job/execute',
    method: 'post',
    data
  })
}

export function groupConfList(data) {
  return request({
    url: '/group/list',
    method: 'post',
    data
  })
}


export function groupAdd(data) {
  return request({
    url: '/group/add',
    method: 'post',
    data
  })
}

export function groupEdit(data) {
  return request({
    url: '/group/edit',
    method: 'post',
    data
  })
}

export function groupDelete(data) {
  return request({
    url: '/group/delete',
    method: 'post',
    data
  })
}

// 任务执行计划
export function planList(data) {
  return request({
    url: '/plan/list',
    method: 'post',
    data
  })
}

// 集群节点信息
export function clientList(data) {
  return request({
    url: '/client/list',
    method: 'post',
    data
  })
}

// 调度集群节点信息
export function nodeList(data) {
  return request({
    url: '/node/list',
    method: 'post',
    data
  })
}

// 任务快照信息
export function snapshotList(data) {
  return request({
    url: '/snapshot/list',
    method: 'post',
    data
  })
}

// 删除任务快照信息
export function snapshotDelete(data) {
  return request({
    url: '/snapshot/delete',
    method: 'post',
    data
  })
}


// 任务执行快照信息
export function executeSnapshotList(data) {
  return request({
    url: '/execute/snapshot/list',
    method: 'post',
    data
  })
}

// 任务重试
export function executeSnapshotRetry(id) {
  return request({
    url: '/execute/snapshot/retry/'+id,
    method: 'post',
  })
}
