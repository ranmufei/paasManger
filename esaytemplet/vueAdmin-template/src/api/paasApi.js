// 来自自定义的 paasrequest rancher API 接口
import request from '@/utils/paasRequest'
import Cookies from 'js-cookie'

export function hosts(query) {
  return request({
    url: '/v1/projects/1a5/hosts',
    method: 'get',
    params: query,   
  })
}

export function conterner(query){
    return request({
        url: '/v1/projects/1a5/containers',
        method: 'get',
        params: query,   
    })
}
// get hostname form api
export function hostname(query){
    return request({
        url: 'v1/projects/1a5/hosts/'+query,
        method: 'get',      
    })
}
// get host ip
export function hostIP(query){
    return request({
        url: '/v1/projects/1a5/hosts/'+query+'/ipaddresses',
        method: 'get',      
    })
}

// edit host
export function edithost(hostid,query){
    return request({
        url: 'v1/projects/1a5/hosts/'+hostid,
        method: 'put',        
        data:query

    })
}

// test host info
export function testhostinfo(hostid){
    return request({
        url: 'v1/projects/1a5/hosts/1h6',
        method: 'get',     

    })
}
// test host info
export function hostinfo(hostid){
    return request({
        url: 'v1/projects/1a5/hosts/'+hostid,
        method: 'get',     

    })
}

// stop  host
export function stophost(hostid){
    return request({
        url: 'v1/projects/1a5/hosts/'+hostid+'/?action=deactivate',//v1/projects/1a5/hosts/1h8/?action=deactivate        
        method: 'post',     
    })
}


// start  host
export function starthost(hostid){
    return request({
        url: 'v1/projects/1a5/hosts/'+hostid+'/?action=activate',//v1/projects/1a5/hosts/1h8/?action=deactivate        
        method: 'post',     
    })
}

// stack
export function stack(hostid){
    return request({
        url: 'v1/projects/1a5/environments?limit=-1',//v1/projects/1a5/hosts/1h8/?action=deactivate        
        method: 'get',     
    })
}

// get stack contianer
export function getstackContainer(environmentId){
    return request({
        url:'v1/projects/1a5/services?environmentId='+environmentId+'&include=instances&limit=-1',
        method:'get'
    })
}

// add contianer
export function addServer(data){
        return request({
            url:'v1/projects/1a5/service',
            method:'post',
            data:data
        })
}

