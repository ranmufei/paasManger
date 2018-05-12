<!--
/**
 * service  详细
 */
-->
<template>
<div class="padding10 bg"> 

    <el-row>
      
          <div class="grid-content bg-purple-dark">
            
            
            <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="goBack"></el-button>
            
            <span class="padding10">Stack /  cloudinfo</span>
          </div>
      </el-col>

      <el-col :span="24">
           
          <el-card class="box-card margin10">
                <el-button v-if="serviceinfo.state=='inactive'" type="primary" plain size="small" @click="containerManger(sid,1)">开启</el-button>
                <el-button  v-if="serviceinfo.state=='active'"  type="primary" plain size="small" @click="containerManger(sid,2)">关闭</el-button>
                <el-button type="primary" plain size="small" @click="containerManger(sid,3)">重启</el-button>
                <el-button type="primary" plain size="small" @click="containerManger(sid,4)">删除</el-button>
            </el-card>

      </el-col>

    </el-row>
    
    <el-row>
        <el-col :span="8">
            <el-card class="box-card margin10" v-if="serviceinfo!==null">
                    
                <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
                    
                        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                           <colgroup>
                            
                           </colgroup>
                           <tbody>
                            <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               类型：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" >
                               {{ serviceinfo.kind || '--' }} 
                              </div></td>
                             
                            </tr>
                            
                        <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               镜像：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" v-if="serviceinfo.launchConfig.imageUuid">
                               {{serviceinfo.launchConfig.imageUuid}}
                              </div></td>
                             
                            </tr>
                            <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               描述：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" v-if="serviceinfo.description">
                              {{serviceinfo.description}}
                               
                              </div></td>
                             
                            </tr>

                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               FQDN：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" v-if="serviceinfo.fqdn">
                                {{serviceinfo.fqdn}}
                              </div></td>
                             
                            </tr>

                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               入口：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" v-if="serviceinfo.launchConfig.entryPoint">
                                {{serviceinfo.launchConfig.entryPoint}}
                              </div></td>
                             
                            </tr>
                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               数量：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" v-if="serviceinfo.currentScale">
                                {{serviceinfo.currentScale}}
                              </div></td>
                             
                            </tr>
                        </tr>
                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               命令：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell" v-if="serviceinfo.launchConfig.command">
                              {{serviceinfo.launchConfig.command}} 
                              </div></td>
                             
                            </tr>
                            <!--
                            <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               链接：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                               pos link tom ,pis yun link taog
                              </div></td>
                             
                            </tr>
                           -->
                           </tbody>
                          </table>
                </div>

            </el-card>


        <el-card class="box-card margin10"  v-if="serviceinfo!==null">
                    
                <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
                    
                        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                          
                            <thead class="has-gutter">
                               <tr class="">
                                        <th colspan="1" rowspan="1" class="el-table_1_column_1     is-leaf">
                                            <div class="cell">端口</div>
                                        </th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                            <div class="cell">主机</div>
                                        </th>
                                 </tr>
                            </thead>
                          
                           <tbody>
                            

                             <tr class="el-table__row" v-for="item in serviceinfo.publicEndpoints">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               {{item.port}}
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                                {{item.ipAddress}}
                              </div></td>
                             
                            </tr>
                          
                        </tr>
                          

                            
                            <!---->
                           </tbody>
                          </table>
                </div>

            </el-card>


            <el-card class="box-card margin10"  v-if="serviceinfo!==null">
                    
                <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">   
                        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                           
                            <thead class="has-gutter">
                               <tr class="">
                                        
                                        <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                            <div class="cell">键</div>
                                        </th>
                                        <th colspan="1" rowspan="1" class="el-table_1_column_2     is-leaf">
                                            <div class="cell">值</div>
                                        </th>
                                 </tr>
                            </thead>
                          
                           <tbody>
                            
                            
                        
                             <tr class="el-table__row" v-for="(item, index) in serviceinfo.launchConfig.labels">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               {{index}}
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                               {{item}}
                              </div></td>
                         
                            </tr>
                      
                            <!---->
                           </tbody>
                          </table>
                </div>

            </el-card>


        </el-col>
        <el-col :span="16">
           <el-card class="box-card margin10" v-for="item in containersublist"> 
                <el-row>
                    <el-col :span="8">

                        
                            <el-button type="primary" plain size="small" @click="ter(item.id)">登陆</el-button>
                            <el-button type="primary" plain size="small" @click="logs(item.id)">日志</el-button>
<!-- 
                        <el-dropdown trigger="click" class="f-right">                       
                          <span class="el-dropdown-link">                  
                              <el-button type="text">管理<i class="el-icon-more el-icon--right"></i></el-button>                    
                          </span>
                            <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><svg-icon icon-class="start"  />  <span @click="containerManger(item.id,1)">启动</span></el-dropdown-item>
                            <el-dropdown-item ><svg-icon icon-class="restart"  /><span @click="containerManger(item.id,3)">重启</span> </el-dropdown-item>
                            <el-dropdown-item ><svg-icon icon-class="stop2"  /> <span @click="containerManger(item.id,2)">停止</span></el-dropdown-item>
                            <el-dropdown-item><i class="el-icon-circle-close"></i> <span @click="containerManger(itemid,4)">删除</span></el-dropdown-item>
                            <el-dropdown-item><i class="el-icon-edit-outline"></i><span @click="editservice(item.id)">编辑</span> </el-dropdown-item>
                      
                            
                          </el-dropdown-menu>
                        </el-dropdown> -->
                       

                         <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">   
                        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                           
                         
                          
                           <tbody>
                            <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               名称：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                               {{item.name}}
                              </div></td>
                             
                             
                            </tr>
                            
                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               类型
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                               {{item.kind}}
                              </div></td>
                       
                            </tr>
                        
                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               主机：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                              
                               {{item.hostname}}
                              </div></td>
                             
                            </tr>
                        </tr>
                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                                容器IP
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                               {{item.primaryIpAddress}}
                              </div></td>
                       
                            </tr>
                             <tr class="el-table__row">
                             <td class="el-table_30_column_117  ">
                              <div class="cell">
                               状态：
                              </div></td>
                             <td class="el-table_30_column_118  ">
                              <div class="cell">
                             
                                <span style="margin-left: 10px" v-if="item.state==='running'" class="green"><i class="el-icon-circle-check"></i>  {{ item.state }}</span>
                      <span style="margin-left: 10px" v-else-if="item.state==='starting'" class="orange"><i class="el-icon-loading"></i>  {{ item.state }}</span>
                      <span style="margin-left: 10px" v-else class="red"><i class="el-icon-remove"></i>  {{item.state }}</span>
                              </div></td>
                       
                            </tr>

                           
                            <!---->
                           </tbody>
                          </table>
                </div>
                    </el-col>

                    <el-col :span="16">
                             <el-row>            
                                <el-col :span="24">
                                   <chart class-name="资源图" title="资源图" :continaerid="item.id" height='200px' width='100%' :id="item.name"> </chart>
                                </el-col>               
                                <el-col :span="24">
                                    
                                </el-col>               
                            </el-row>
                    </el-col>

                </el-row>
            </el-card>
        </el-col>
    </el-row>
<log ref="logss" />
<terminal ref="ter" />
</div>
</template>
<script >
import Chart from '@/components/Charts/lineMarker'
import { containerManger,containersublist,hosts} from '@/api/paasApi'
import  log  from '@/views/stack/components/log'
import  terminal  from '@/views/stack/components/terminal'



export default {
    name: 'editservice',
    components: { Chart ,log,terminal},
    data() {
        return {
            sid:this.$route.query.services,
            serviceinfo:null,
            containersublist:null,
            hosts:[],
        }
    },
    created() {
       // this.connect()
       this.serviceinfodata(this.$route.query.services,0)
    },

    methods:{
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
         goBack () {
              window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
            },
         connect(){

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
                   if(response.state==='removing'){                   
                     this.$message({
                      message: '执行成功',
                      type: 'success'
                    });
                      this.serviceinfodata(this.$route.query.services,0)
                    //this.stackcontianer(this.$route.query.environmentId)
                  
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
                      this.serviceinfodata(this.$route.query.services,0)
                    //this.stackcontianer(this.$route.query.environmentId)
                  
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

         serviceinfodata(sid){

            hosts().then(response=>{
                this.hosts=response.data
            },function(err){

            })

            containerManger(sid,0).then(response=>{
                this.serviceinfo=response
                console.log(this.serviceinfo)
            },function(err){

            })

            containersublist(sid).then(response=>{
               // this.containersublist=response.data

                 let data=response.data
                    
                console.log('sssssss',data)
                let arrdata=[]
                    for (var i = 0; i < data.length; i++) {
                        arrdata[i]=data[i]
                        this.hosts.findIndex(function(value, index, arr) {
                            //console.log('value',value)
                            //this.containersublist[i]=value        
                             
                            if(value.id==data[i].hostId){ 
                               console.log(value.id,data[i].hostId,value.name) 
                                arrdata[i]['hostname']=value.name 
                                //this.containersublist[i]['hostId']=value.name 

                            }    
                        })
                     
                    }

                    this.containersublist=arrdata



            },function(err){

            })

         }

    }
}
</script>




<style rel="stylesheet/scss" lang="scss" scoped>
.padding10{ padding: 10px;}
.margin10{ margin: 10px;}
.bg{
    background: #F2F6FC;
    min-height: 700px;
    height: 100%;
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
.f-right{
  float: right;
}
.f-left{
  float: left;
}
</style>