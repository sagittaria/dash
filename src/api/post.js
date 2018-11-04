import request from '@/utils/request'
import url from './url'

export function fetchList(query) {
  return request({
    url: url.post,
    method: 'get',
    params: query
  })
}
