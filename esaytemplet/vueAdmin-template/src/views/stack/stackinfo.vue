<template>
  <div class="dashboard-editor-container">

  <div class="stackbox">

  


  <el-row >  
    <el-col :span="8" >     
     <span class="stackname padding10">
         <span>微服务：</span>
         <el-select v-model="value8" filterable placeholder="请选择" @change="changeservice(value8)">
            <el-option
              v-for="item in stacklist"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>   
      </span>
    </el-col>

    <el-col :span="16" >   

    <el-col :span="18">     

              <span class="stackname f-right padding10">  

               

              </span>

              <span class="stackname f-right">
                  <el-dropdown split-button size="" type="primary" @click="addservice" trigger="click">
                    <router-link :to="{ path: '/stack/add',query: { environmentId: this.$route.query.environmentId }}">添加服务</router-link>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><i class="el-icon-plus icon"></i> 
                      <router-link :to="{ path: '/stack/add',query: { environmentId: this.$route.query.environmentId }}">添加服务</router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                      <i class="icon"><svg-icon icon-class="jh"  /></i>  
<router-link :to="{ path: '/stack/addlb',query: { environmentId: this.$route.query.environmentId }}">添加负载均衡</router-link>

                      </el-dropdown-item>
                     
                    </el-dropdown-menu>
                  </el-dropdown>  
              </span> 

              
        </el-col>

        <el-col :span="6">                      
              <span class="stackname f-right padding10">
           

                  <el-button type="text"><svg-icon icon-class="stop2"  /></el-button>
                  <el-dropdown trigger="click">
                 
                  <span class="el-dropdown-link">                  
                      <el-button type="text">管理</el-button>                    
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><svg-icon icon-class="stop2"  />  <span @click="stackManger(value8,'stop')">停止服务</span></el-dropdown-item>

                    <el-dropdown-item><svg-icon icon-class="start"  />  <span @click="stackManger(value8,'start')">启动服务</span></el-dropdown-item>                    
                    <el-dropdown-item><i class="el-icon-edit-outline"></i><span @click="editstack(value8)"> 编辑</span></el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-delete"></i> <span @click="delstack(value8)">删除</span></el-dropdown-item>
                    
                  </el-dropdown-menu>
                </el-dropdown>

              </span>        
        </el-col>

    </el-col>
 
  </el-row>

  <el-row >  
    <el-col :span="24" v-show="desc" > 
      <span class="stackname padding10" style="font-size:13px; font-weight:normal;"> 描述：{{desc}} </span>
    </el-col>
  </el-row>

  </div>
   <el-row >
      <div class="stackbox">
  

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-tickets"></i> 容器列表</span>
        

          <el-col :span="24" >       
                <el-table
                :data="stack['contianer']"
                v-loading="loading"
                style="width: 100%; "               
                >
                <el-table-column
                  label="状态"
                  >
                    <template slot-scope="scope">
                      
                      <span style="margin-left: 10px" v-if="scope.row.state==='active'" class="green"><i class="el-icon-circle-check"></i>  {{ scope.row.state }}</span>
                      <span style="margin-left: 10px" v-else-if="scope.row.state==='activating'" class="orange"><i class="el-icon-loading"></i>  {{ scope.row.state }}</span>
                      <span style="margin-left: 10px" v-else class="red"><i class="el-icon-remove"></i>  {{ scope.row.state }}</span>

                    </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="服务名称"
                  >
                   <template slot-scope="scope">    
                    <span style="margin-left: 10px" v-if="scope.row.type==='service'" class="green size16">
                            <svg-icon icon-class="containerservice"  />
                      </span>
                      <span style="margin-left: 10px" v-else-if="scope.row.type==='loadBalancerService'" class="orange size16 ">
                              <svg-icon icon-class="lb"  />
                       </span>

                    <router-link :to="{ path: '/stack/serviceinfo',query: {'services':scope.row.id}}" class="colorlink">{{scope.row.name}}</router-link>


                    </template>
                </el-table-column>
                <el-table-column
                  prop="instances[0].imageUuid"
                  label="镜像">

                  <template slot-scope="scope">    
                      <span v-if="scope.row.launchConfig.imageUuid">{{scope.row.launchConfig.imageUuid}}</span>
                      <span class="f-right padding10" v-for="item in scope.row.launchConfig.ports">

                         <span class="green"> {{item}}</span>
                      </span>
                    </template>
                </el-table-column>
                    
                    

                 <el-table-column
                  prop="currentScale"
                  label="容器数">
                </el-table-column>
                <el-table-column                  
                  label="管理">
  

                  <template slot-scope="scope">
                      
                    <span class="f-right padding10">

                        <!-- <el-button type="text"><svg-icon icon-class="stop2"  /></el-button> -->
                        <el-dropdown trigger="click">                       
                          <span class="el-dropdown-link">  
                          <el-button v-if="scope.row.state=='upgraded'" type="text" @click="containerManger(scope.row.id,7)"><i class="el-icon-success"></i>完成升级</el-button>  

                          <el-button v-if="scope.row.state=='upgrading'" type="text" @click="containerManger(scope.row.id,8)"><i class="el-icon-remove"></i>取消升级</el-button>                    
                              <el-button type="text"><i class="el-icon-more el-icon--right"></i></el-button>                    
                                              
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><svg-icon icon-class="start"  />  <span @click="containerManger(scope.row.id,1)">启动</span></el-dropdown-item>
                            <el-dropdown-item ><svg-icon icon-class="restart"  /><span @click="containerManger(scope.row.id,3)">重启</span> </el-dropdown-item>
                            <el-dropdown-item ><svg-icon icon-class="stop2"  /> <span @click="containerManger(scope.row.id,2)">停止</span></el-dropdown-item>
                            <el-dropdown-item><i class="el-icon-circle-close"></i> <span @click="containerManger(scope.row.id,4)">删除</span></el-dropdown-item>
                            <el-dropdown-item><i class="el-icon-edit-outline"></i>
                            
                            <span v-if="scope.row.type=='service'" @click="editservice(scope.row.id)">编辑</span>

                            <span v-if="scope.row.type=='loadBalancerService'" >
                            <router-link :to="{ path: '/stack/editlb',query: { environmentId: scope.row.environmentId,serviceId: scope.row.id }}" >编辑</router-link>
                            </span>
                      
                             </el-dropdown-item>
                            <el-dropdown-item><svg-icon icon-class="copy"  /> 
                                  <router-link :to="{ path: '/stack/clone',query: { environmentId: scope.row.environmentId,serviceId: scope.row.id }}" >克隆</router-link>
                            </el-dropdown-item>

                            <el-dropdown-item><i class="el-icon-upload2"></i>
                                  <router-link :to="{ path: '/stack/upgrade',query: {environmentId: scope.row.environmentId,serviceId: scope.row.id }}" >升级</router-link>
                            </el-dropdown-item>
                            
                          </el-dropdown-menu>
                        </el-dropdown>

                    </span>  

                 </template>


                </el-table-column>
              </el-table>       
       </el-col>


      </el-tab-pane>
      <el-tab-pane label="配置信息">
         <span slot="label"><i class="el-icon-document"></i>   docker-compose</span>

        <config ref='dockercompose' :envid="value8"/>
       </el-tab-pane>
      <el-tab-pane label="关系图">
        <span slot="label"><i class="el-icon-share"></i>   关系图</span>
        
      </el-tab-pane>
      
    </el-tabs>



        </div>
   </el-row>
    
<editservice ref="editsv" />
<editstack ref="editstack" />

  </div>
</template>

<script>
import { stack , stackinfo,serviceinfo,containerManger,mangerstack,delstack} from '@/api/paasApi'

import  editservice  from '@/views/stack/components/editService/editService'
import  config  from '@/views/stack/components/stack_docker_compose'
import  editstack  from '@/views/stack/components/editstack'

export default {
  name: 'stackinfo',
  components: { 
   editservice,
   config,
   editstack
  },
  data() {
    return {
      loading: true,
      tabPosition: 'top',
      stack:{},     
      stacklist: [{
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: this.$route.query.environmentId,
        desc:'',
    }
  },
 created() {
   this.stackcontianer(this.$route.query.environmentId)
   this.getstack()
   this.getstackinfo(this.$route.query.environmentId)
  },
  methods: {
      getstack(){
          stack().then(response=>{
            console.log('response',response)
             // this.stacklist=response.data
             let data=response.data;
             let stacklist=[];
              for (var i = 0; i < data.length; i++) {
                    //console.log(i,data[i].id)
                    //stacklist["value"]=data[i].id
                    //stacklist["label"]=data[i].name
                    stacklist.push({"value":data[i].id,'label':data[i].name})
              }
              this.stacklist=stacklist
              console.log('stacklist',stacklist)
          },function(){

          })
        },
       addservice(label){
          //alert("hello test"+label)
       },
       changeservice(label){
          //window.location.href="/#/stack/stackinfo?environmentId="+label
          window.location.href="/#/stack/stackinfo?environmentId="+label

           this.stackcontianer(this.$route.query.environmentId)
           this.getstack()
           this.getstackinfo(this.$route.query.environmentId)
       },
       getstackinfo(serviceid){
          serviceinfo(serviceid).then(response=>{
             this.value8=response.id
             this.desc=response.description
          },function(err){

          })
       },
       stackcontianer(envid){
           this.loading=true
        stackinfo(envid).then(response=>{
            //this.stack[index]['contianer']=response.data
            this.$set(this.stack,'contianer',response.data)  
            this.loading=false
        },function(err){
           console.log('err:',err)
        })
       },
       // 容器管理
       containerManger(id,type){

            if(type===4){
              this.$confirm('此操作将永久删除该容器, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  containerManger(id,type).then(response=>{
             
                   if(response.type==='service'){                   
                     this.$message({
                      message: '执行成功',
                      type: 'success'
                    });

                    this.stackcontianer(this.$route.query.environmentId)
                  
                }else{
                    this.$message({
                      message: '异常',
                      type: 'warning'
                    });
                  
                }
               
            },function(err){
                console.log('err',err)
                 this.$message({
                      message: '异常',
                      type: 'error'
                    });
            })
              }).catch(() => {
                  return false       
              });
            }else{
                containerManger(id,type).then(response=>{
             
                if(response.type==='service'){                   
                     this.$message({
                      message: '执行成功',
                      type: 'success'
                    });

                    this.stackcontianer(this.$route.query.environmentId)
                  
                }else{
                    this.$message({
                      message: '异常',
                      type: 'warning'
                    });
                  
                }
               
            },function(err){
                console.log('err',err)
                 this.$message({
                      message: '异常',
                      type: 'error'
                    });
            })

            }
      
       },
       editservice(sid){
          console.log('sid',sid)
          console.log('data', this.$refs.editsv)
          this.$refs.editsv.dialogTableVisible=true
          this.$refs.editsv.serviceid=sid
          this.$refs.editsv. clonedata(sid)
       },
       stackManger(sid,type){
        console.log(sid,type)
                mangerstack(sid,type).then(response=>{


                        if(response.state=='active'){
                           this.getstack()
                        }
                },function(err){

                })
         },
         editstack(sid){
             // this.$refs.editstack.dialogTableVisible=true
            
              this.$refs.editstack.getstackinfo(sid)
              this.$refs.editstack.serviceid=sid
         },
         delstack(sid){

      
              this.$confirm('你确定要删除该组微服务吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                   delstack(sid).then(response=>{
                            if(response.state=='removing'){
                                   window.location.href="/#/stack/index"
                            }
                    })
              }).catch(() => {
                  return false       
              });
            

            
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

</style>
