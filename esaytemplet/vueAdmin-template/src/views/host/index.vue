<template>
<div >
  <el-card class="box-card"  v-for="value in hostlists">
    <div slot="header" class="clearfix">
      <span ><svg-icon icon-class="pc"  class="hosttitle" />
       
          <router-link :to="{ path: '/host/hostinfo',query: { hostid: value.id }}"> {{value.name?value.name:value.hostname}}</router-link>
        </span>
    
       <el-dropdown style="float: right; padding: 3px 0; cursor:pointer;">
          <el-button type="success" size="mini" v-if="value.state=='active'">
           
            <span v-if="value.agentState=='reconnecting'" class="red">重新链接中</span>
            <span v-else> {{value.state}}</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

          <el-button type="danger" size="mini"  v-else>
            {{value.state}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

            

          <el-dropdown-menu slot="dropdown">

            <span v-if="value.state=='inactive'">
                <el-dropdown-item > 
                    <span @click="starthost(value.id)">开启</span>                 
                </el-dropdown-item>
                 <el-dropdown-item > <span @click="deletehost(value.id)">删除</span> </el-dropdown-item>
            </span>
            <span v-else> 
                <el-dropdown-item> <span @click="stophost(value.id)">停用</span> </el-dropdown-item>
            </span>
            

            <el-dropdown-item > <span @click="hostinfo(value.id)">编辑</span> </el-dropdown-item>
            
          </el-dropdown-menu>
        </el-dropdown>

    </div>
   <div  class="text item  font-text"   >
    <i class="el-icon-share"></i><span>{{value.ipAddresses[0].address}}</span>  |       
    <svg-icon icon-class="docker" /><span> docker 版本：{{value.labels['io.rancher.host.docker_version']}} | 内核版本:{{value.labels['io.rancher.host.linux_kernel_version']}} </span>  
</div>
 
<div  class="text item  font-text"   >
    <svg-icon icon-class="linux" /><span> {{value.info['osInfo']['operatingSystem']}}({{value.info['osInfo']['kernelVersion']}})  </span>  
 
</div>

 <div  class="text item font-text"   >
    <svg-icon icon-class="hs" /><span> {{value['info']['cpuInfo']['count']}} x {{(value['info']['cpuInfo']['cpuCoresPercentages'][0]+value['info']['cpuInfo']['cpuCoresPercentages'][1]).toFixed(2)}} GHz  </span>  

    |  <svg-icon icon-class="neicun" /> <span> {{(value['info']['memoryInfo']['memTotal']/1024).toFixed(2)}} G</span>
|  <svg-icon icon-class="yp" /> <span>{{value['disknum']}}G</span>

</div>

     <div  class="text item font-text"   >
       <i class="el-icon-date" ></i> <span>   {{value['created']}}</span>
     </div>

     <div  class="text item font-text" v-if="value.description"  >
       <i class="el-icon-info" ></i> <span>   {{value['description']}}</span>
     </div>

  </el-card>
   

  <edithost v-bind:hid="hostid" ref="edithost" />

</div>



</template>

<script>
import { hosts,hostIP,stophost,starthost,delhost } from '@/api/paasApi'
import  edithost from '@/views/host/edithost'

export default {
  props:["hid"],
  components:{ edithost },
  data() {
    return {
      hostid:null,
      hostlists:null,
      listLoading: true
    }
  },
  filters: {
    
  },
  created() {
    this.hostlist()
  },
  methods:{
     hostlist(){
        hosts().then(response => {
            console.log('response',response)
            let data=response.data
            
            data.forEach((value,index,arr)=>{

                console.log('index',index)
                data[index]=value
                //data[index]['ip']=this.getIp(value['id'],index)

                 //data[index]['disknum']=(value['info']['diskInfo']['mountPoints']['/dev/vda1']['total']?value['info']['diskInfo']['mountPoints']['/dev/vda1']['total']:0)/1024 

              let a=0,b=0,c=0;
               try {
                     a= (value['info']['diskInfo']['mountPoints']['/dev/vda1']['total'])/1024
               } catch(e) {
                 
                 console.log(e);
               }

               try {
                     b= (value['info']['diskInfo']['mountPoints']['/dev/vdb1']['total'])/1024
               } catch(e) {
                 
                 console.log(e);
               }
               
               try {
                   c= (value['info']['diskInfo']['mountPoints']['/dev/vdc1']['total'])/1024
               } catch(e) {
                 
                 console.log(e);
               }

               data[index]['disknum']=(a+b+c).toFixed(2)

                console.log('ip',data[index]['ip'])
            })

            this.hostlists=data

        },
          function(err){
            console.log('response err:',err)
        })
     },
     getIp(ip,index){
        hostIP(ip).then(response=>{
            console.log('ipppp:',response.data[0]['address'],ip)
            this.hostlists[index]['ip']=response.data[0]['address']

        },function(err){
          console.log('err:',err)
        })
     },
     hostinfo(hid){
       console.log('主机ID：',hid)
       //this.hostid=hid
       this.$refs.edithost.getinfo(hid)
       //edithost(hid)
     },
     stophost(hid){
      stophost(hid).then(response=>{
          if(response.type){
            this.hostlist()
          }
      },function(){

      })
     },
     starthost(hid){
      starthost(hid).then(response=>{
          if(response.type){
            this.hostlist()
          }
      },function(){

      })
     },
     deletehost(hid){

     
              this.$confirm('此操作将永久删除该主机, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                    
                    delhost(hid).then(response=>{
                          if(response.type){
                            this.hostlist()
                          }
                      },function(){

                      })


              }).catch(() => {
                  return false       
              });
         

        


     }
  }
}

</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 380px;
    margin: 10px;
    float: left;
  }
  .green{
    color: green
  }
  .red{
    color: red
  }
  .font-text{
    color: #606266;
  }
  .font-title{
    color: #303133;
  }
  .hosttitle{
    font-weight: bold;
    color: green;
    font-size: 24px;
  }
</style>