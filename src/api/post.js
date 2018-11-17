import request from '@/utils/request'
import url from './url'

export function fetchList(query) {
  return request({
    url: url.post,
    method: 'get',
    params: query
  })
}

export function fetchById(id) {
  return request({
    url: url.post + id,
    method: 'get'
  })
}

export function save(data, id) {
  return request({
    url: url.post + id,
    method: id ? 'put' : 'post',
    data
  })
}

export function del(id) {
  return request({
    url: url.post + id,
    method: 'delete'
  })
}
