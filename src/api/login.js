import request from '@/utils/request'

export function loginByUsername(username, password, geetest_challenge, geetest_validate, geetest_seccode) {
  const data = {
    username,
    password,
    geetest_challenge,
    geetest_validate,
    geetest_seccode
  }
  return request({
    // url: '/login/login',
    url: '/stack/operator',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/stack/operator',
    method: 'get',
    params: { token }
  })
}

