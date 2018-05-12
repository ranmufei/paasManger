<template>
<div>

<el-dialog title="服务编辑" :visible.sync="dialogTableVisible" v-loading="loading">

<el-row class="box-row">

  <el-form :model="data"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="名称" prop="name">
    <el-input v-model="data.name" placeholder="只能用英文字母，不能用中文"></el-input>
  </el-form-item>



<el-form-item label="描述" prop="desc2">
    <el-input type="textarea" v-model="data.description"></el-input>
  </el-form-item>

  <el-form-item label="运行数量" prop="delivery">
    <el-slider v-model="data.scale"></el-slider>
  </el-form-item>

<el-form-item label="服务关联" prop="delivery">
    <el-col :span="24">

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

 <el-form-item label=" ">
  <el-button type="primary" @click="saveedit">保存</el-button>
 </el-form-item>

  </el-form>

  </el-row>

</el-dialog>

</div>
</template>
<script>
import { getservice,containerManger,getlinkservice,linkmap,addlinkcontainer } from '@/api/paasApi'
  export default {
    name: 'editservice',
    data() {
      return {       
        dialogTableVisible: false,
        dialogFormVisible: false,     
        formLabelWidth: '120px',
        serviceid:null,
        loading:false,
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
             "ports":[]
          },
          "link":[],
          "linkmap":null,
           rules: {
            name: [
              { required: true, message: '请输入服务名称', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
           
          }
      };
    },
    methods:{
        addlink(type,key){
        if(type==='del'){
          this.$delete(this.link,key)
        }else{
           this.$set(this.link,this.link.length, {'serviceId':1,'name':''})
        }
      },
       getinfo(){
        
        getservice().then(response=>{
            this.service=response.data
            },function(){
        })

      },
      clonedata(sid){
          this.link=[]
          containerManger(sid,0).then(response=>{
            this.data=response      
          },function(err){
            console.log('err',err)
          })
          this.linkmaps()
          this.setlink(this.serviceid)
          
      },
      setlink(sid){
        // 获取已经存在链接关系
        getlinkservice(sid).then(response=>{
            console.log('data1111;',response.data)
            let data=response.data
            let sarr=[]
            for (var i = 0; i < data.length; i++) {
                sarr.push(data[i].id)
                let linkname=''
                this.linkmap.findIndex(function(value, index, arr) {
                  if(value.consumedServiceId===data[i].id){ linkname=value.name }                  
                })
                this.link.push({'serviceId':data[i].id,'name':linkname})
            }
            console.log(sarr)
            console.log(this.link)
        },function(){

        })
      },
      linkmaps(){
        linkmap().then(response=>{
          this.linkmap=response.data
        },function(err){
          console.log('error',err)
        })
      },
      saveedit(){
        //保存编辑 
      
        this.loading=true
        containerManger(this.serviceid,5,this.data).then(response=>{
          console.log('sve:',response)
          if(response.type==='service'){
            this.add_link(this.serviceid) //保存link           
          }
        },function(err){
          console.log('err save',err)
        })

      },
      add_link(conid){ // 容器关联容器
        let savelink={"serviceLinks":this.link}
        addlinkcontainer(conid,savelink).then(response=>{
          console.log('link data:',response)
           this.loading=false
           this.dialogTableVisible=false
           this.$parent.stackcontianer(this.$route.query.environmentId)
        },function(err){
          console.log('err',err)
        })
      }

    },
    created(){
      this.getinfo()
      
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .marin{
    margin: 4px;
  }

  .padding-left10{
    padding-left: 10px;
  }

</style>