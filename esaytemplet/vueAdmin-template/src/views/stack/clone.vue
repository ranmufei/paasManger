<template>
<div class="box">
 <el-row class="box-row">

  <el-form :model="data"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="名称" prop="name">
    <el-input v-model="data.name" placeholder="只能用英文字母，不能用中文"></el-input>
  </el-form-item>


  <el-form-item label="镜像" prop="image">
    <el-input v-model="data.image"></el-input>
  </el-form-item>

  <el-form-item  label="容器运行主机" >
     <el-select v-model="data.launchConfig.requestedHostId" placeholder="请选容器运行主机"　style="margin-left:5px ; ">
         <el-option  v-for="(item,key) in hostlist" :labels="item.name"  :key="item.name" :value="item.id">
             <span style="float: left">{{item.name}}</span>
             <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
         </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="运行数量" prop="delivery">
    <el-slider v-model="data.scale"></el-slider>
  </el-form-item>

  <el-form-item label="描述" prop="desc2">
    <el-input type="textarea" v-model="data.description"></el-input>
  </el-form-item>

  <el-form-item label=" " prop="desc2">
      <el-col :span="12">

        <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addport('add',0)">端口映射</el-button></el-row>

       <el-col :span="6">
          <span class="padding-left10">外部端口</span>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="6">
          <span class="padding-left10">容器端口</span>
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
                 <el-select v-model="item.tcp" placeholder="请选协议">
                    <el-option label="tcp" value="tcp" selected="selected"></el-option>
                    <el-option label="udp" value="udp"></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addport('del',key)"></i>   </el-col>

        </el-row>

  </el-col>
  <el-col :span="12">

        <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addlink('add',0)">服务链接</el-button></el-row>

       <el-col :span="12">
          <span class="padding-left10">目标服务</span>
        </el-col>
        <el-col class="line" :span="1"> </el-col>
        <el-col :span="10">
          <span class="padding-left10">名称</span>
        </el-col>


       <el-row class="marin" v-for="(item,key) in link">

            <el-col :span="10">

              <el-select v-model="item.serviceId" placeholder="请选择">
                   <el-option
                      v-for="item in service"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
              </el-select>


            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col>
            <el-col :span="10">
              <el-input placeholder="链接别名"  auto-complete="off" v-model="item.name"></el-input>
            </el-col>

            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addlink('del',key)"></i>   </el-col>

        </el-row>



  </el-col>
  </el-form-item>

  <el-form-item >
      <el-tabs type="border-card">
      <el-tab-pane label="命令">

          <el-form-item label="命令" >
            <el-input v-model="data.launchConfig.command[0]" class="marin"></el-input>
          </el-form-item>

          <el-form-item label="入口" >
            <el-input v-model="data.launchConfig.entryPoint"  class="marin"></el-input>
          </el-form-item>

          <el-form-item label="工作目录" >
            <el-input v-model="data.launchConfig.workingDir"  class="marin"></el-input>
          </el-form-item>

          <el-form-item label="环境变量" >

              <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addenvval('add',0)">添加环境变量</el-button></el-row>

            <el-col :span="12">
              <span class="padding-left10">变量</span>
            </el-col>
            <el-col class="line" :span="1"> </el-col>
            <el-col :span="10">
              <span class="padding-left10">值</span>
            </el-col>


       <el-row class="marin" v-for="(item , key) in envlist">

            <el-col :span="10">
              <el-input placeholder="key" v-model="item.k" auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col>
            <el-col :span="10">
              <el-input placeholder="value" v-model="item.v" auto-complete="off" ></el-input>
            </el-col>

            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addenvval('del',key)"></i>   </el-col>

        </el-row>



          </el-form-item>

      </el-tab-pane>
      <el-tab-pane label="数据卷">

          <el-form-item label="数据卷映射" prop="cmd">
            <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle  style="margin-left:5px ; " @click="addvolum('add',0)"></el-button></el-row>
          </el-form-item>

          <el-form-item label=" " prop="cmd" v-for="(item , key) in data.launchConfig.dataVolumes">
              <el-col class="line" :span="20">
                <el-input v-model="data.launchConfig.dataVolumes[key]" class="marin" placeholder="格式 `/data:/data`"></el-input>
              </el-col>
               <el-col class="line" :span="4" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addvolum('del',key)"></i>   </el-col>
          </el-form-item>


      </el-tab-pane>
      <el-tab-pane label="网络">

          <el-form-item label="网络" prop="cmd">

                <el-col :span="20">
                     <el-select v-model="data.launchConfig.networkMode" placeholder="请选网络"　style="margin-left:5px ; ">

                      <el-option  v-for="(item,key) in networkMode" :value="item" :label="item" ></el-option>
                    </el-select>
                </el-col>

          </el-form-item>

          <!-- <el-form-item label="请求IP" prop="cmd">

                <el-col :span="20">
                       <el-input v-model="ruleForm.name" class="marin"></el-input>
                </el-col>

          </el-form-item> -->




      </el-tab-pane>

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

import { getservice,hosts,addServer,addlinkcontainer,containerManger} from '@/api/paasApi'

  export default {
    data() {
      return {
        data:{
            "scale": 1,
            "assignServiceIpAddress": false,
            "startOnCreate": true,
            "type": "service",
            "image": '',
            "environmentId": this.$route.query.environmentId,
            "launchConfig": {
              "kind": "container",
              "networkMode": "managed",
              "privileged": false,
              "publishAllPorts": false,
              "readOnly": false,
              "startOnCreate": true,
              "stdinOpen": true,
              "tty": true,
              "vcpu": 1,
              "type": "launchConfig",
              "labels": {
                "io.rancher.container.pull_image": "always"
              },
              "restartPolicy": {
                "name": "always"
              },
              "imageUuid": '',
              "ports": [],
              "dataVolumes": [],
              "dataVolumesFrom": [],
              "dns": [],
              "dnsSearch": [],
              "capAdd": [],
              "capDrop": [],
              "devices": [],
              "logConfig": {
                "driver": "",
                "config": {}
              },
              "dataVolumesFromLaunchConfigs": [],
              "requestedHostId": "1h6",
              "command": [],
              "entryPoint":null,
              "environment": {},
              "count": null,
              "cpuSet": null,
              "cpuShares": null,
              "createIndex": null,
              "created": null,
              "deploymentUnitUuid": null,
              "description": null,
              "domainName": null,
              "externalId": null,
              "firstRunning": null,
              "healthState": null,
              "hostname": null,
              "memory": null,
              "memoryMb": null,
              "memorySwap": null,
              "pidMode": null,
              "removed": null,
              "requestedIpAddress": null,
              "startCount": null,
              "systemContainer": null,
              "user": null,
              "userdata": null,
              "uuid": null,
              "volumeDriver": null,
              "workingDir": null,
              "networkLaunchConfig": null
            },
            "secondaryLaunchConfigs": [],
            "name": "",
            "description": "",
            "createIndex": null,
            "created": null,
            "externalId": null,
            "healthState": null,
            "kind": null,
            "removed": null,
            "selectorContainer": null,
            "selectorLink": null,
            "uuid": null,
            "vip": null,
            "fqdn": null,
            
          },
          "hostname":null,
          "ports":[],
          "service":null,
          "servicelink":[{"name":"nginx222","serviceId":"1s47"}]   ,
           "link":[],
           "env":{},
           "envnum":0,
           "labnum":0,
           "networkMode":['Managed','Bridge','Host','None'] ,
           "hostlist":null,
           "envlist":[],
           "labels":[],
            "linkdata":{
              "serviceLinks":[]
            },
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


            addServer(this.data).then(response=>{
              console.log('提交数据：》',response)
              if(response.type=='service'){
                  this.add_link(response.id)
                  loading.close()
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
           this.$set(this.ports,this.ports.length, {'wport':90,'nport':90,'tcp':'tcp'})
           //let portvalue =  this.data.ports[data.ports.length]['wport']+':'+this.data.ports[data.ports.length]['nport']+"/"+this.data.ports[data.ports.length]['tcp']
           //this.$set(this.data.launchConfig.ports,this.data.ports.length,portvalue)

        }
      },
      getinfo(){
        getservice().then(response=>{
            this.service=response.data
            },function(){
        })

        hosts().then(response=>{
          this.hostlist=response.data
        },function(){

        })
      },
      addlink(type,key){
        if(type==='del'){
          this.$delete(this.link,key)
        }else{
           this.$set(this.link,this.link.length, {'serviceId':1,'name':''})
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
      add_link(conid){ // 容器关联容器
        addlinkcontainer(conid,this.linkdata).then(response=>{
          console.log('link data:',response)
        },function(err){
          console.log('err',err)
        })
      },
      clonedata(sid){
          containerManger(sid,0).then(response=>{
            this.data.name=response.name
            this.data.image=response.launchConfig.imageUuid.replace(/docker:/, "")
            this.data.scale=response.scale
            this.data.description=response.description
            this.data.launchConfig.dataVolumes=response.launchConfig.dataVolumes
            this.data.launchConfig.requestedHostId=response.launchConfig.requestedHostId
            //this.envlist=response.launchConfig.environment

           // this.ports=response.launchConfig.ports
            let port=response.launchConfig.ports              
              for (var i = 0; i < port.length; i++) {
                 let parr=[];
                 parr=port[i].split(":");
               /*  console.log('1',parr)
                 console.log('2',parr[0])
                 console.log('3',parr[1].slice(0,-4))
                 console.log('4',parr[1].slice(-3)) */
                 this.ports.push({"nport":parr[0],"wport":parr[1].slice(0,-4),"tcp":parr[1].slice(-3)})
              }
               let envarr=response.launchConfig.environment
               for(let x in envarr ){
                 console.log('x',x,envarr[x])
                 this.envlist.push({"k":x,"v":envarr[x]})
               }

               let lab=response.launchConfig.labels
               for(let x in lab ){
                 console.log('x',x,lab[x])
                 this.labels.push({"k":x,"v":lab[x]})
               }


          },function(err){
            console.log('err',err)
          })
      }
    },
    watch:{
      'data.image':function(n,o){
        this.data.launchConfig.imageUuid='docker:'+ this.data.image
      },
      'ports':{
          handler:function(val,oldv){
            for(let x in val){

              let portvalue =  val[x].wport+':'+val[x].nport+"/"+val[x].tcp
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
      'link':{
          handler:function(val,oldv){

            this.linkdata.serviceLinks=this.link
            console.log(this.serviceLinks)
          },
          deep:true
      },
      'hostname':{
          handler:function(val,oldv){
          //  this.data.launchConfig.requestedHostId=this.link
            //console.log(this.serviceLinks)
          },
          deep:true
      }

    },
    created(){
      this.getinfo()
      this.clonedata(this.$route.query.serviceId)
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

</style>