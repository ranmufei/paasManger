//import request from '@/utils/request'
import request from '@/utils/paasRequest'
export function login(username, password) {
  return request({
   // url: '/user/login',
    url: '/v1/token',
    method: 'post',
    data: {"code":username+":"+password,"authProvider":"localauthconfig"}
  })
}

export function getInfo(token) {
  return request({
     url:'v1/accounts/1a1',           
     method:'get',
     params: { token }
     /*url: '/user/info',
    method: 'get',*/
  })
}

export function logout() {
  return request({
    url: 'v1/accounts/1a1',
    method: 'get'
  })
}
