import request from '@/utils/request'

export function getCaptcha() {
  return request({
    url: '/stack/operator/getCaptcha?t=' + (new Date()).getTime(),
    method: 'get'
  })
}
