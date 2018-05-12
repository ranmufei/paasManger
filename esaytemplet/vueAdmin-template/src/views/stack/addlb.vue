<template>
<div class="box">
 <el-row class="box-row">

  <el-form :model="data"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="负载名称" prop="name">
    <el-input v-model="data.name" placeholder="只能用英文字母，不能用中文"></el-input>
  </el-form-item>

  <el-form-item label="运行数量" prop="delivery">
    <el-slider v-model="data.scale"></el-slider>
  </el-form-item>

  <el-form-item label="描述" prop="desc2">
    <el-input type="textarea" v-model="data.description"></el-input>
  </el-form-item>

  <el-form-item label=" 监听端口" prop="desc2">
      <el-col :span="12">

        <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addport('add',0)">端口映射</el-button></el-row>

       <el-col :span="6">
          <span class="padding-left10">请求端口</span>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="6">
          <span class="padding-left10">目标端口</span>
        </el-col>

        <el-col :span="6">
          <span class="padding-left10">协议</span>
        </el-col>

       <el-row class="marin" v-for="(item,key) in ports">
            <el-col :span="6">
              <el-input placeholder="例如：80" v-model="item.wport"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col>
            <el-col :span="6">
                 <el-input  placeholder="例如:8080" v-model="item.nport"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">/</el-col>
            <el-col :span="6">
                 <el-select v-model="item.http" placeholder="请选协议">
                    <el-option label="http" value="http" selected="selected"></el-option>
                    <el-option label="tcp" value="tcp"></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addport('del',key)"></i>   </el-col>
        </el-row>

  </el-col>
  
  </el-form-item> 

   <el-form-item label=" 目标" >
      <el-col :span="24">

        <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addlink('add',0)">服务链接</el-button></el-row>

       <el-col :span="12">
          <span class="padding-left10 with200">请求主机</span>
          <span class="padding-left10 with100">端口</span>
        </el-col>
        <el-col class="line" :span="1"> </el-col>
        <el-col :span="10">
          <span class="padding-left10 with200">目标服务</span>
          <span class="padding-left10 with100">目标端口</span>
        </el-col>


       <el-row class="marin" v-for="(item,key) in link">

            
            <el-col :span="10">
              <el-input placeholder="请求主机"  auto-complete="off" v-model="item.hostname" class="with200"></el-input>
              <el-input placeholder="端口"  auto-complete="off" v-model="item.hostport"  class="with100"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col>
            <el-col :span="10">

              <el-select v-model="item.serviceId" placeholder="请选择">
                   <el-option
                      v-for="item in service"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
              </el-select>

              <el-input placeholder="目标端口"  auto-complete="off" v-model="item.serviceport"  class="with100"></el-input>

            </el-col>

            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addlink('del',key)"></i>   </el-col>

        </el-row>



  </el-col>
  
  </el-form-item>

  <el-form-item  label="主机调度规则" >
        <el-col :span="5">
            
            <el-select v-model="hostlabelkey"  placeholder="请选择" class="float-right" @change="choiceLabelValue">
                     <el-option
                        v-for="item in hostlables"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
             </el-select>
         
         </el-col>

         <el-col :span="10">
            = 
            <el-select v-model="hostlabelvalue"  placeholder="请选择">
                     <el-option
                        v-for="item in hostlablesvalue"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
             </el-select>
         
         </el-col>

  </el-form-item>


  <el-form-item >
      <el-tabs type="border-card">

      <el-tab-pane label="标签">

              <el-form-item label="标签" prop="cmd">

              <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addlab('add',0)">添加标签</el-button></el-row>

            <el-col :span="12">
              <span class="padding-left10">键</span>
            </el-col>
            <el-col class="line" :span="1"> </el-col>
            <el-col :span="10">
              <span class="padding-left10">值</span>
            </el-col>


       <el-row class="marin" v-for="(item , key) in labels">

            <el-col :span="10">
                 <el-input placeholder="例如：80"  v-model="item.k"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col>
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off"  v-model="item.v" ></el-input>
            </el-col>

            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addlab('del',key)"></i>   </el-col>

        </el-row>


          </el-form-item>


      </el-tab-pane>

    </el-tabs>
  </el-form-item>
  
     

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
</el-form>
</el-row>
</div>
</template>
<script>

import { getservice,hosts,addServer,addlinkcontainer,lb,addlinklb} from '@/api/paasApi'

  export default {
    data() {
      return {
        data:{
  "assignServiceIpAddress": false,
  "scale": 1,
  "startOnCreate": true,
  "type": "loadBalancerService",
  "name": "",
  "description": "",
  "environmentId": this.$route.query.environmentId,
  "launchConfig": {
    "startOnCreate": true,
    "publishAllPorts": false,
    "privileged": false,
    "stdinOpen": true,
    "tty": true,
    "readOnly": false,
    "networkMode": "managed",
    "type": "container",
    "commandArgs": [],
    "environment": {},
    "restartPolicy": {
      "name": "always"
    },
    "ports": [],
    "expose": [],
    "labels": {},
    "count": null,
    "createIndex": null,
    "created": null,
    "deploymentUnitUuid": null,
    "description": null,
    "externalId": null,
    "firstRunning": null,
    "healthState": null,
    "hostname": null,
    "kind": null,
    "name": null,
    "removed": null,
    "startCount": null,
    "systemContainer": null,
    "uuid": null,
    "volumeDriver": null,
    "workingDir": null,
    "user": null,
    "domainName": null,
    "memorySwap": null,
    "memory": null,
    "cpuSet": null,
    "cpuShares": null,
    "pidMode": null
  },
  "loadBalancerConfig": {
    "type": "loadBalancerConfig",
    "name": "ui-lb-config",
    "haproxyConfig": {
      "type": "haproxyConfig",
      "global": null,
      "defaults": null
    }
  },
  "created": null,
  "externalId": null,
  "fqdn": null,
  "healthState": null,
  "kind": null,
  "removed": null,
  "selectorLink": null,
  "uuid": null,
  "vip": null,
  
},        
          "service":[{'serviceId':1,'hostname':'hostname','hostport':'900','serviceport':'8080'}],
          "servicelink":[{"name":"nginx222","serviceId":"1s47"}]   ,
           "link":[],
           "env":{},
           "envnum":0,
           "labnum":0,
           "networkMode":['Managed','Bridge','Host','None'] ,
           "hostlist":[],
           "envlist":[],
           "labels":[],
           "linkdata":{
              "serviceLinks":[]
            },
            "hostlables":[], // host labels
            "hostlablesvalue":[], // host labels value
            "hostlabelkey":'', // choice lables key
            "hostlabelvalue":'', // choice lables value
            "ports":[{'wport':80,'nport':80,'http':'http'}],
         ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入服务名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '请输入镜像地址', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //alert('submit!');
            //console.log('data=>',this)
            //console.log('data=>',this.data)
            console.log('data=>',this.linkdata)
            console.log('data=>',this.link)
            //return false;
            const loading = this.$loading({
              lock: true,
              text: '提交中……',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });

            console.log('this.data:',this.data)
            console.log('this.data:',this.linkdata)

            
            lb(1,this.data).then(response=>{
              console.log('提交数据：》',response)
              if(response.type=='loadBalancerService'){
                  this.add_link(response.id)
                  loading.close()
                  //window.location.href="#/stack/index"
                  window.location.href="#/stack/stackinfo?environmentId="+this.$route.query.environmentId
              }
            },function(er){
              console.log('err',er)
            })

          } else {
            console.log('error submit!!');
            //return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      setimages(){
          this.data.launchConfig.imageUuid='docker:'+ this.data.launchConfig.image
          //return 'docker:'+images
      },
      addport(type,index){
        if(type=='del'){
          this.$delete(this.ports,index)
          this.$delete(this.data.launchConfig.ports,index)
        }else{
           this.$set(this.ports,this.ports.length, {'wport':90,'nport':90,'http':'http'})
          

        }
      },
      getinfo(){
        getservice().then(response=>{
            this.service=response.data
            },function(){
        })

        hosts().then(response=>{
          this.hostlist=response.data
          this.gethostlable() // 数据hostlabe 处理
          //console.log('hostlist:',this.hostlist)
        },function(){

        })
      },
      addlink(type,key){
        if(type==='del'){
          this.$delete(this.link,key)
        }else{
           this.$set(this.link,this.link.length, {'serviceId':1,'hostname':'hostname','hostport':'900','serviceport':'8080'})
        }
      },
      addenvval(type,key){
        if(type==='del'){
          this.$delete(this.envlist,key)
          this.$delete(this.data.launchConfig.environment,key)
        }else{
          //this.envnum++
          this.$set(this.envlist,this.envlist.length, {'k':"key",'v':"value"})
          //this.$set(this.data.launchConfig.environment,this.envnum,{'value':'key'})
        }
      },
      addlab(type,key){
        if(type==='del'){
          this.$delete(this.labels,key)
          this.$delete(this.data.launchConfig.labels,key)
        }else{
          this.$set(this.labels,this.labels.length, {'k':"key",'v':"value"})
          //this.labnum++
          //this.$set(this.data.launchConfig.labels,this.labnum,'value')
        }
      },
      addvolum(type,key){
        if(type==='del'){
          this.$delete(this.data.launchConfig.dataVolumes,key)
        }else{

          this.$set(this.data.launchConfig.dataVolumes,this.data.launchConfig.dataVolumes.length,'')
        }
      },
      contain_add(){        
        addServer(this.data).then(response=>{
          console.log('提交数据：》',response)
        },function(er){
          console.log('err',er)
        })
      },
      add_link(conid){ // 负载均衡关联链接
        addlinklb(conid,this.linkdata).then(response=>{
          console.log('link data:',response)
        },function(err){
          console.log('err',err)
        })
      },
      gethostlable(){
        console.log('host.list',this.hostlist)
        // 重 this.hostlist 中筛选 host lable 列表key
          let labarr=[]
          let keyarr=[]
          
          this.hostlist.findIndex(function(value, index, arr) {
             //console.log('findindex',value)
             //console.log('findindex',value.labels)
             let lab=value.labels
             for(let x in lab){
               
                keyarr.push(x)
             }
  
             //if(value.consumedServiceId==='1s42'){ console.log(value.name) }             
          })
          //console.log('labarr',labarr)
          //console.log('keyarr',keyarr)
       
          var set = new Set(keyarr);
          var newArr = Array.from(set);
           //console.log('keyarr2',newArr)

           let nnnew=[]
           newArr.findIndex(function(value, index, arr) {               
                if(value.slice(0,10)!='io.rancher'){
                     nnnew.push(value)
                     //console.log('newarr===',value)
                }
           })
           this.hostlables=nnnew;
           console.log('最终结果',nnnew)

      },
      choiceLabelValue(val){
          this.hostlabelvalue=''
        // 当选择 host labele key时选择 value
         //console.log('当选择 host labele key时选择 value',val)
          let keyval=[]
          this.hostlist.findIndex(function(value, index, arr) {
         
             let lab=value.labels
             //console.log('lab',lab)
             for(let x in lab){
               //console.log(x,':',lab[x])

               if(x==val){  keyval.push(lab[x]) } 
               // keyarr.push(x)
             }
  
             //if(value.consumedServiceId==='1s42'){ console.log(value.name) }             
          })
          this.hostlablesvalue=keyval
          //console.log('keyval',keyval)
      }
    },
    watch:{
      'data.image':function(n,o){
        this.data.launchConfig.imageUuid='docker:'+ this.data.image
      },
      'ports':{
          handler:function(val,oldv){
            for(let x in val){

              let portvalue =  val[x].wport+':'+val[x].nport+(val[x].http=='http'?'':'/'+val[x].http) //+"/"+val[x].http
              this.$set(this.data.launchConfig.ports,x,portvalue)
             // console.log(this.data.launchConfig.ports)
            }
          },
          deep:true
      },
      'envlist':{
          handler:function(val,oldv){
             this.$set(this.data.launchConfig,'environment',{})
             //this.$delete(this.data.launchConfig.environment,null)

            for(let x in val){
              console.log('envlist:val',val)
              let key=val.k
              let value=val.v
              console.log(val.k,val.v)
              //let portvalue =  val[x].wport+':'+val[x].nport+"/"+val[x].tcp
              this.$set(this.data.launchConfig.environment,val[x].k,val[x].v)
              // console.log(this.data.launchConfig.ports)
            }

          },
          deep:true
      },
      'labels':{
          handler:function(val,oldv){
             this.$set(this.data.launchConfig,'labels',{})
             //this.$delete(this.data.launchConfig.environment,null)

            for(let x in val){
              console.log('envlist:val',val)
           
              console.log(val.k,val.v)
              //let portvalue =  val[x].wport+':'+val[x].nport+"/"+val[x].tcp
              this.$set(this.data.launchConfig.labels,val[x].k,val[x].v)
              // console.log(this.data.launchConfig.ports)"io.rancher.container.pull_image": "always"
            }
             this.$set(this.data.launchConfig.labels,'io.rancher.container.pull_image','always')

          },
          deep:true
      },
       'hostlabelvalue':{

          handler:function(val,oldv){
            
            this.$set(this.data.launchConfig.labels,'io.rancher.scheduler.affinity:host_label',this.hostlabelkey+'='+this.hostlabelvalue)
            
            //console.log('this.data.launchConfig:',this.data.launchConfig)
          },
          deep:true
      },
      'link':{
          handler:function(val,oldv){
            console.log('link edit',val,oldv)
            let arr=[]
           /* for (var i = 0; i < val.length; i++) {
               arr.push({"serviceId":val[i]['serviceId']})
            }
          */
            for(let x in val){
                    val[x].hostport?+':'+val[x].hostport:val[x].hostport
                   // val[x].hostname+':'+val[x].hostport+'='+val[x].serviceport

                    if(val[x].hostname==''){
                      continue
                    }

                  let port =  val[x].hostname+(val[x].hostport?(':'+val[x].hostport):val[x].hostport)+(val[x].serviceport?'='+val[x].serviceport:val[x].serviceport)

              let arrs={
                  "serviceId":val[x].serviceId,
                  "ports":[port]
              }

              arr.push(arrs)
             // let portvalue =  val[x].wport+':'+val[x].nport+"/"+val[x].tcp

              //this.$set(this.data.launchConfig.ports,x,portvalue)
             // console.log(this.data.launchConfig.ports)
            }

            console.log('arr:',arr)
            this.linkdata.serviceLinks=arr
            //console.log(this.serviceLinks)
          },
          deep:true
      }

    },
    created(){
      this.getinfo()

      
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  padding: 32px;
  background-color: rgb(240, 242, 245);

}
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
.box-row{
  background:#fff;
  padding:20px 20px;
}

  .marin{
    margin: 4px;
  }

  .padding-left10{
    padding-left: 10px;
  }

  .with100{
    width: 80px;
  }
  .with200{
    width: 200px;
  }
.float-right{
  float: right
}
</style>