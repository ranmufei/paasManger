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
            data:{"id":"1s51","type":"service","links":{"self":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51","account":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/account","consumedbyservices":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/consumedbyservices","consumedservices":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/consumedservices","environment":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/environment","instances":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/instances","serviceExposeMaps":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/serviceexposemaps","containerStats":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/containerstats"},"actions":{"remove":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/?action=remove","setservicelinks":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/?action=setservicelinks","removeservicelink":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/?action=removeservicelink","addservicelink":"http://phpmyadmin.test.03in.com:8080/v1/projects/1a5/services/1s51/?action=addservicelink"},"name":"testnginx","state":"registering","accountId":"1a5","assignServiceIpAddress":false,"createIndex":null,"created":"2018-04-04T08:49:44Z","createdTS":1522831784000,"currentScale":null,"description":"content test","environmentId":"1e15","externalId":null,"fqdn":null,"healthState":"healthy","kind":"service","launchConfig":{"capAdd":[],"capDrop":[],"command":["echo","helo"],"count":null,"cpuSet":null,"cpuShares":null,"dataVolumes":["/home/www/data:/data"],"dataVolumesFrom":[],"description":null,"devices":[],"dns":[],"dnsSearch":[],"domainName":null,"environment":{"env1":"111","env2":"222"},"hostname":null,"imageUuid":"docker:nginx","kind":"container","labels":{"io.rancher.container.pull_image":"always"},"logConfig":{"config":{},"driver":""},"memory":null,"memoryMb":null,"memorySwap":null,"networkMode":"managed","pidMode":null,"ports":["8081:80/tcp","8082:88/tcp"],"privileged":false,"publishAllPorts":false,"readOnly":false,"requestedHostId":"1h6","requestedIpAddress":null,"startOnCreate":true,"stdinOpen":true,"tty":true,"user":null,"userdata":null,"version":"0","volumeDriver":null,"workingDir":null,"dataVolumesFromLaunchConfigs":[],"networkLaunchConfig":null,"vcpu":1},"metadata":null,"publicEndpoints":null,"removed":null,"retainIp":null,"scale":1,"scalePolicy":null,"secondaryLaunchConfigs":[],"selectorContainer":null,"selectorLink":null,"startOnCreate":true,"transitioning":"yes","transitioningMessage":"In Progress","transitioningProgress":null,"upgrade":null,"uuid":"f26644ad-487e-4c40-81bd-84b4c9f7e78c","vip":null}
        })
}

// getservices
export function getservice(){
    return request({
        url:"v1/projects/1a5/services?limit=-1",
        method:'get',
    })
}

