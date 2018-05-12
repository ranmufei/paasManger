<template>
  <div class="dashboard-editor-container">

  <div class="stackbox">



  <el-row >  
    <el-col :span="24" v-show="desc" > 
      <span class="stackname padding10" style="font-size:13px; font-weight:normal;"> 描述：{{desc}} </span>
    </el-col>
  </el-row>

  </div>
  
  <el-row>
     <div class="stackbox" v-if="hostinfo!=null">         
          <table cellspacing="0" cellpadding="0" border="0" style="width:100%">

   <tbody>
    
    <tr class="el-table__row">
     <td class="el-table_23_column_96  ">
      <span class="cell" v-if="ip!=null">
      <b> IP:</b>   {{ip}}
      
      </span></td>
     <td class="el-table_23_column_97  ">
      <b> CPU: </b>
        {{hostinfo.info.cpuInfo.modelName}}
        {{hostinfo.info.cpuInfo.count}}x{{hostinfo.info.cpuInfo.mhz}}
          
          

      </td>
     <td class="el-table_23_column_98  ">
      <b>  内存: </b>
       {{(hostinfo.info.memoryInfo.memTotal/1024).toFixed(2)}} G
      </td>
      <td class="el-table_23_column_98  ">
      <b>  存储  :</b>  
       {{disk.toFixed(2)}} G
      </td> 
    </tr>

    <tr class="el-table__row">
     <td class="el-table_23_column_96  ">
      <b>       提供者:      </b>
        --
      </td>
     <td class="el-table_23_column_97  ">
      <b>
       内核:
      </b> {{hostinfo.info.osInfo.kernelVersion}}</td>
     <td class="el-table_23_column_98  ">
      <b>
       Docker:
      </b>{{hostinfo.info.osInfo.dockerVersion}}</td>
      <td class="el-table_23_column_98  ">
      <b>       操作系统: </b>{{hostinfo.info.osInfo.operatingSystem}}</td>
    </tr>
    <tr class="el-table__row">
    <td colspan="4"><b>描述：</b>  {{hostinfo.description}} </td>
    </tr>
    
    <!---->
   </tbody>
  </table>
     </div>
  </el-row>


  <el-row>
     <div class="stackbox">
            <hostchart class-name="资源图" title="资源图" :hostid="value8" height='200px' width='100%' :id="value8" />
     </div>
  </el-row>


   <el-row >
      <div class="stackbox">
          <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i> 容器列表</span>
        
       <el-col :span="24" >       
                <el-table
                      :data="hostcontainer"
                      style="width: 100%"                     
                      >
                    <el-table-column
                      prop="state"
                      label="状态"
                      sortable
                      >

                      <template slot-scope="scope">   

                          <el-tag type="success" v-show="scope.row.state=='running'"><i class="el-icon-circle-check"></i>正常</el-tag>
                          <el-tag type="info" v-show="scope.row.state=='removing'"><i class="el-icon-delete"></i>删除中</el-tag>
                          <el-tag type="danger" v-show="scope.row.state=='stopped'"><i class="el-icon-remove"></i>停止</el-tag>                          
                           
                      </template>


                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="名称"
                      sortable
                      >

                      

                    </el-table-column>
                    <el-table-column
                      prop="primaryIpAddress"
                      label="IP 地址"      
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="imageUuid"
                      label="镜像"                      
                      >
                    </el-table-column>

                    <el-table-column                      
                      label="管理"                      
                      >

                        <template slot-scope="scope">   
                           
                                <el-button @click="ter(scope.row.id)"> <svg-icon icon-class="cmd"  /> 命令行 </el-button>
                                <el-button @click="logs(scope.row.id)"><i class="el-icon-tickets"></i>  日志 </el-button>
                           
                        </template>

                    </el-table-column>

                  </el-table>
       </el-col>


      </el-tab-pane>
      <el-tab-pane label="端口">
         <span slot="label" @click="reloadport"><i class="el-icon-document"></i>   端口</span>
        
     <el-table
      :data="publicEndpoints"
      style="width: 100%"
      :default-sort = "{prop: 'port', order: 'port'}"
      >
    <el-table-column
      prop="ipAddress"
      label="IP 地址"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="port"
      label="端口"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="serviceId"
      label="服务"      
      >
      <template slot-scope="scope">
   
         <router-link :to="{ path: '/stack/serviceinfo',query: { services: scope.row.serviceId }}"> 
              <el-button type="text">  {{ getservicename(scope.row.serviceId) }} </el-button>
         </router-link>
      </template>
    </el-table-column>
    <el-table-column
      prop="instanceId"
      label="容器"
      :formatter="getcontainername"
      >
    </el-table-column>
  </el-table>
        
       </el-tab-pane>
      <el-tab-pane label="标签">
        <span slot="label"><i class="el-icon-share"></i>   标签</span>
          
          <div  v-if="hostinfo!=null"> 
            <div v-for="(value, key) in hostinfo.labels">
            <p>{{ key }}: {{ value }}</p>
          </div>

          </div>
          

      </el-tab-pane>
      
    </el-tabs>
      </div>
   </el-row>
    <log ref="logss" />
   <terminal ref="ter" />
  </div>
</template>

<script>
import { hostinfo,getservice,conterner,hostinfoip } from '@/api/paasApi'

import  hostchart  from '@/views/host/components/hostchart'
import  log  from '@/views/stack/components/log'
import  terminal  from '@/views/stack/components/terminal'


export default {
  name: 'stackinfo',
  components: { hostchart ,log,terminal},
  data() {
    return {
      loading: true,
      tabPosition: 'top',
      service:null,
      conterners:[],
      hostcontainer:[],
      stack:{},     
      stacklist: [{
          value: '选项5',
          label: '北京烤鸭'
        }],
      value8: this.$route.query.hostid,
      desc:'',
      hostinfo:null,
      disk:null,
      publicEndpoints:[],
      ip:null,
    }
  },
 created() {
    this.getservicedata()
    this.getcontainer()

    this.gethostinfo(this.$route.query.hostid)

  },
  methods: {
       logs(cid){
              console.log('cid',cid)
              this.$refs.logss.dialogTableVisible=true              
              this.$refs.logss.logview(cid)
        },
        ter(cid){
              console.log('cid',cid)
              this.$refs.ter.dialogTableVisible=true              
              this.$refs.ter.terminal(cid)
        },
      reloadport(){
          console.log('click port')
      },
      getservicedata(){
           getservice().then(response=>{
                this.service=response.data
                },function(){
            })
      },
      getcontainer(){ // 读取所有容器
          conterner().then(response=>{
             this.conterners=response.data
             let arr=[]
              //hostcontainer  筛选出本主机的容器
             var ret3 = response.data.findIndex((value, index, arr) => {
                      
                      if(value.hostId==this.value8){   
                          console.log('value8',this.value8)
                           arr.push(this.value8)
                          this.$set(this.hostcontainer,this.hostcontainer.length,value)
                          //console.log('value8:',value.hostId,this.value8,arr)
                      }

             })

              //this.hostcontainer=arr

              console.log('arr',this.hostcontainer)

          })
      },
      getservicename(sid){
          //return sid.serviceId
           //console.log(' 要找的ID ',sid)
           let name='--'
           let sv=this.service
           //sv.find((element) => (element.name == '李四'))
            
            var ret3 = sv.findIndex((value, index, arr) => {
                      if(value.id==sid){   
                         name= value.name
                         // return value.name
                      }
            })


            return name

          /* sv.findIndex(function(value, index) {
               console.log('loop value.id',value.id,sid.serviceId)
               
              if(value.id==sid.serviceId){     
                     console.info('找到了 value name',value.name)  
                     name=value.name          
                     return name               
              }else{
                     
              }           
            })
          */
          // return 'hello'
      },
      getcontainername(sid){
          //return sid.serviceId
           //console.log(' 要找的IDss ',sid.instanceId)
           let name='--'
           let sv=this.conterners
           //sv.find((element) => (element.name == '李四'))
            
            var ret3 = sv.findIndex((value, index, arr) => {
                      if(value.id==sid.instanceId){   
                         name= value.name
                         // return value.name
                      }
            })
            return name
      },
      hoicehost(){

      },
      gethostinfo(hid){
        hostinfo(hid).then(response=>{
           console.log('hostinfo',response)
           this.hostinfo=response
           this.publicEndpoints=response.publicEndpoints        

           let dx=response.info.diskInfo.mountPoints;
           let disk=null;
           for(let i in dx){
               
                disk=dx[i].total+disk
           }
           this.disk=disk/1024
           

        })

        hostinfoip(hid).then(response=>{
              this.ip=response.data[0].address
        })


      }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.stackname{
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  color:#304156;
}
.stackdes{
  height: 30px;
  line-height: 30px;
  color:#999;
}
.stackbox{  
  background:#fff;
  margin: 10px;
}
.stack{
  height: 60px;
  background:#fff;
  margin:0 5px;
}
.icon{
  padding:0 10px;
}
.font-size-20{
  font-weight:bold;
  font-size: 20px;
}
.f-right{
  float: right;
}
.f-left{
  float: left;
}
.padding10{
  padding:0 10px;
}
.green{
  color:green;
}
.red{
  color:red;
}
.orange{
  color: orange
}
.colorlink{
  color:#409EFF;
}
.size16{
  font-size:16px;
}


table tbody tr td{
      padding: 12px 0;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    border-right: 1px solid #ebeef5;
    
    border-bottom: 1px solid #ebeef5;
    padding:10px;
}

</style>
