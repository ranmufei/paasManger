// 来自自定义的 paasrequest rancher API 接口
import request from '@/utils/paasRequest'
import Cookies from 'js-cookie'


export function hosts(query) {
  return request({
    url: 'v1/projects/1a5/hosts?include=instances&include=ipAddresses&limit=-1',
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



// edit host
export function delhost(hostid){
    return request({
        url: 'v1/projects/1a5/hosts/'+hostid,
        method: 'delete',        
     

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
// get hostip
export function hostinfoip(hostid){
    return request({
        url: 'v1/projects/1a5/hosts/'+hostid+'/ipaddresses',
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

// add contianer /v1/projects/1a5/service
export function addServer(data){
        return request({
            url:'v1/projects/1a5/service',
            method:'post',
            data:data,
         })
}

// 容器关联容器提交
// conid string　容器ID
// data object 关联容器对象数据
export function addlinkcontainer(conid,data){
        return request({
            url:'/v1/projects/1a5/services/'+conid+'/?action=setservicelinks',
            method:'post',
            data:data,
        })
}

// getservices
export function getservice(){
    return request({
        url:"v1/projects/1a5/services?limit=-1",
        method:'get',
    })
}

export function stackinfo(envid){
    return request({
        url:'v1/projects/1a5/services?environmentId='+envid+'&include=instances&limit=-1',
        method:'get'
    })
}
// 容器组详细
export function serviceinfo(serviceid){
    return request({        
        url:'v1/projects/1a5/environments/'+serviceid,
        method:'get'
    })
}
// 编辑 stack info
export function serviceedit(serviceid,data){
    return request({        
        url:'v1/projects/1a5/environments/'+serviceid,
        method:'put',
        data:data
    })
}

// 删除 stack info
export function delstack(serviceid){
    return request({        
        url:'v1/projects/1a5/environments/'+serviceid,
        method:'delete',
        
    })
}

// 容器1开启/2停止/3重启/4删除/0查看容器数据/5修改/6 更新/7 完成升级/8 取消升级
export function containerManger(id,type,datas={}){
    let method='POST';
    let url='';
    let data=datas;
    switch (type) {
        case 1:
             url='v1/projects/1a5/services/'+id+'/?action=activate';
            break;
        case 2:

             url = 'v1/projects/1a5/services/'+id+'/?action=deactivate';
        
            break;
        case 3:
             url='v1/projects/1a5/services/'+id+'/?action=restart';
             data={"rollingRestartStrategy":{}}
            break;
        case 4:
             url='v1/projects/1a5/services/'+id;
            method='DELETE'
            break;
         case 5:
             url='v1/projects/1a5/services/'+id;
            method='PUT'
            break;
        case 6:
             url='v1/projects/1a5/services/'+id+'/?action=upgrade';
            method='POST'
            break;
         case 7:
             url='v1/projects/1a5/services/'+id+'/?action=finishupgrade';
            method='POST'
            break;
        case 8:
             url='v1/projects/1a5/services/'+id+'/?action=cancelupgrade';
            method='POST'
            break;
        default:
            url='v1/projects/1a5/services/'+id;
            method='GET'
            break;
    }

    return request({               
        url:url,
        method:method,
        data:data
    })
    
}

//获取服务关联的容器列表
export function getlinkservice(sid){
    return request({       
        url:'v1/projects/1a5/services/'+sid+'/consumedservices',
        method:'get'
    })
}

//容器别名总数据
export function linkmap(){
    return request({       
        url:'v1/projects/1a5/serviceconsumemaps?limit=-1',
        method:'get'
    })
}


//容器sockect 链接资源
export function connectContanier(sockId,token){
    return request({       
        url:'v1/containerstats/service/?token='+token+'&sockId='+sockId,
        method:'get'
    })

      /* const socket = io('v1/containerstats/service/?token=eyJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1MjQ4MTQ3MTAsInN1YiI6ImNhdHRsZSIsImlzcyI6Imh0dHA6XC9cL2NhdHRsZS5pbyIsInNlcnZpY2UiOlt7InVybCI6IndzOlwvXC9waHBteWFkbWluLnRlc3QuMDNpbi5jb206ODA4MFwvdjFcL2NvbnRhaW5lcnN0YXRzXC9hYjg0NWEwZmVlNzYwMTc5ZGQyZjVlMDc2ZGFlNzMzMDU0Y2ZiNTY0YzM1YWNkNTAzZTFkOTg1MmY1MDk1YjU2IiwidG9rZW4iOiJleUpoYkdjaU9pSlNVekkxTmlKOS5leUpsZUhBaU9qRTFNalE0TVRRM01UQXNJbk4xWWlJNkltTmhkSFJzWlNJc0ltbHpjeUk2SW1oMGRIQTZYQzljTDJOaGRIUnNaUzVwYnlJc0ltaHZjM1JWZFdsa0lqb2lObUl4WVdaa05qUXROell6TmkwMFpUWmxMV0kxTjJFdFl6SXlOall3TnpSak1UaGtJaXdpWTI5dWRHRnBibVZ5U1dSeklqcDdJbUZpT0RRMVlUQm1aV1UzTmpBeE56bGtaREptTldVd056WmtZV1UzTXpNd05UUmpabUkxTmpSak16VmhZMlExTURObE1XUTVPRFV5WmpVd09UVmlOVFlpT2lJeGFURTFOREE0SW4wc0ltbGhkQ0k2TVRVeU5EZ3hORFF4TUN3aWEybGtJam9pWkdWbVlYVnNkQ0o5LnROaWt4emhOekt5d0U4aTFYcmlPZzYtNXhkdUxESFBYU3VIeExIa0stYWlkS21wSFlTR2wzX292TUNMSlduaGJIOGR6TXNCS0x2UERsLXhMWnVxSS05N094UUktYU5RNkF1emZJU01SY3FtbTVIU3JGMXdkbUFtaVVJamhpMVdDNnk2S0phWk9fbWtVdEpmczJ6RUF2alBpUUwwQ0lkQ1hLd1VDU21kYTktXzdHcHlZZng4WXM3a2ZjZDVYSlB0MEdJdmdTU2VlbERJeDhlc29MY3BJWVUtZnplQ0ZkQVBXSGU1di1JQ2hnN25vOFhzYlBINzVPU2hrN0lNd1FUYm52QUNLNnQ4UG41TGNtRl9HZ21NTjk5REdtV3Z3TG1NQ0hFMlY0amlGRUZjbGk5Ui1ZdkJMUUIzOFpzNGJ2SnRfeHZJcklaWC1keDVhcnlWSUZaS1d4USJ9XSwiaWF0IjoxNTI0ODE0NDEwLCJraWQiOiJkZWZhdWx0In0.lYnuhzFM6Q6Plpqo8d1PGHCSdJiozqI_JGb3sD_7R0MkSlbdqJwD2XjCufDAZd5wsTD9ePHE2Tg29Vaa7v28ItS0OEawY2LipWeEQG-QLE8jhoa16LRbw2dfa82pd2tuu91V6Fu-COmqqmkut6EBQ8dTFs61nSUa9Oz5LZVmgBC4fTb_lruB45lSfdY6bvKOY88b4TVsTHoWo1xmQhqVBLbIz3L4ffbMVLMNdZ8adOumEal-ugEBMju5MG0Ii44ETz_fW1WL8En40auyLlr3hrwJACpygYHtGMbhqT6i639TOWEiasF_3wliN-zTR2DcVJZbfgOYzXJWJwNCCAGJwg&sockId=1114', {jsonp: false});
            socket.on('connect', () => {
              console.log('connected!');
         });*/

}

//容器详细
export function containerInfo(id,type){
    return request({       
        url:'v1/projects/1a5/environments/'+serviceid,
        method:'get'
    })
}
//容器服务 子容器列表
export function containersublist(id){
    return request({       
        url:'v1/projects/1a5/services/'+id+'/instances',
        method:'get'
    })
}

//容器服务 子容器 socket 链接信息
//v1/projects/1a5/containers/1i16665/containerstats
//v1/projects/1a5/containers/1i16672/?action=execute
//@id  子容器标示ID 
export function getcontainer_socket(id){
    return request({       
        url:'v1/projects/1a5/containers/'+id+'/containerstats',
        method:'get'
    })
}
// socket logs  link  v1/projects/1a5/containers/1i372/?action=logs
export function log_socket(id){
    return request({       
        url:'v1/projects/1a5/containers/'+id+'/?action=logs',
        method:'post'
    })
}
// exec socket info
// 获取容器 exec  socket 链接
export function exec_socket(id){
    return request({       
        url:'v1/projects/1a5/containers/'+id+'/?action=execute',
        data:{"attachStdin":true,"attachStdout":true,"tty":true,"command":["/bin/sh","-c","TERM=xterm-256color; export TERM; [ -x /bin/bash ] && ([ -x /usr/bin/script ] && /usr/bin/script -q -c \"/bin/bash\" /dev/null || exec /bin/bash) || exec /bin/sh"]},
        method:'post'
    })
}
// 获取主机socket 链接信息
export function gethost_socket(id){
    return request({       
        url:'v1/projects/1a5/hosts/'+id+'/hoststats',
        method:'get'
    })
}




//   stack 组停止/启动 
export function mangerstack(id,type){
     
    if(type=="stop"){
         var url='v1/projects/1a5/environments/'+id+'/?action=deactivateservices'
     }else if (type=="start") {
         var url='v1/projects/1a5/environments/'+id+'/?action=activateservices'
     }else{
        var url='v1/projects/1a5/environments/'+id
     }

    return request({       
        url:url,
        data:null,
        method:'post',
    })
}
//   stack config info docker-compose.yml
export function stackconfig(id){
     
    let url="v1/projects/1a5/environments/"+id+"/?action=exportconfig"

    return request({       
        url:url,
        data:null,
        method:'post',
    })
}

// 创建 stack 
export function addstack(data){     
    let url="v1/projects/1a5/environment"
    return request({       
        url:url,
        data:data,
        method:'post',
    })
}
// curl
export function curl(url){     
   
    return request({       
        url:url,
        method:'get',
    })
}

// 提交 负载均衡 v1/projects/1a5/loadbalancerservice
// 1 post 2put 3 del 4 get 
export function lb(type,data,sid=''){     
    let method='get'
    let url='v1/projects/1a5/loadbalancerservice'
    switch (type) {
        case 1:
            method='post'
            break;
        case 2:
            method='put'
            url='v1/projects/1a5/loadbalancerservice/'+sid
            break;
        case 3:
            method='delete'
            break;
        case 4:
            method='get'
            break;
       
        default:
            // statements_def
            break;
    }

    return request({       
        url:url,
        method:method,
        data:data
    })
}

// 提交 负载均衡 link  数据
export function addlinklb(conid,data){
        return request({
            url:'v1/projects/1a5/loadbalancerservices/'+conid+'/?action=setservicelinks',
            method:'post',
            data:data,
        })
}
// 读取 负载均衡  数据
export function getlb(conid){
        return request({
            url:'v1/projects/1a5/loadbalancerservices/'+conid,
            method:'get',
            data:null,
        })
}

// 添加主机 配置信息
export function hostconfig(){
        return request({
            url:'v1/projects/1a5/registrationtokens?state=active&limit=-1',
            method:'get',
        })
}

// 保存系统设置配置
export function saveconfig(data){
        return request({
            url:'v1/activesettings/1as1',
            data:data,
            method:'put',
        })
}
// 系统配置
export function sysconfig(){
        return request({
            url:'/v1/activesettings/1as1',           
            method:'get',
        })
}
// 系统y用户
export function sysuser(){
        return request({
            url:'v1/accounts?kind_ne=service&kind_ne=agent&include=credentials&limit=-1',           
            method:'get',
        })
}

// 添加账号
export function adduser(data){
    return request({
            url:'v1/account',           
            method:'post',
            data:data
        })
}
// 修改账号
export function edituser(id,data){
    return request({
            url:'v1/accounts/'+id,           
            method:'put',
            data:data
        })
}

// 账号info
export function userinfo(id){
    return request({
            url:'v1/accounts/'+id,           
            method:'get',
            
        })
}
// 修改密码
export function editpsw(id,data){
    return request({
            url:'v1/passwords/'+id+'/?action=changesecret',           
            method:'post',
            data:data
        })
}
// 添加密码
export function adduserpsw(data){
    return request({
            url:'v1/password',           
            method:'post',
            data:data
        })
}

// 登陆验证
export function logintoken(data){
    return request({
            url:'v1/token',           
            method:'post',
            data:data
        })
}


// 用户账号 启用1 /2停用/3 删除
export function adminuser(id,type){
     let url="";   
     let method='get'
    switch (type) {
        case 1:
            method='post'
            url="v1/accounts/"+id+"/?action=activate"
            break;
        case 2:
            method='post'
            url="v1/accounts/"+id+"/?action=deactivate"
            break;
        case 3:
            url="v1/accounts/"+id
            method='delete'
            break;
        case 4:
            method='get'
            break;
       
        default:
            // statements_def
            break;
    }

     return request({
            url:url,           
            method:method,
        })
}