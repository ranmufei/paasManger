<template>
  <div class="dashboard-editor-container">

   <el-row v-for="(data,key) in stack">
      <div class="stackbox">
      <div class="stack">
        
        <el-col :span="10">   

                <el-button type="text" @click="stackcontianer(data.id,key)">
                <i class="el-icon-circle-plus icon" v-if="!data.tab"></i>
                <i class="el-icon-remove icon" v-else></i>

                </el-button> 
                <span class="stackname">{{data.name}} </span>        
        </el-col>
        
        
        <el-col :span="4">
           <span v-if="data.healthState==='healthy'" class="green stackname"><el-tag type="success"><i class="el-icon-circle-check"></i> {{data.healthState}}</el-tag></span>
                <span v-else-if="data.healthState==='unhealthy'" class="orange stackname"><el-tag type="danger"><svg-icon icon-class="jingao" /> {{data.healthState}}</el-tag></span>
                <span v-else-if="data.healthState==='degraded'" class="red stackname"><el-tag type="warning"><svg-icon icon-class="jingao" /> {{data.healthState}}</el-tag></span>

        </el-col>


        <el-col :span="5">                      
              <span class="stackname">
                  <el-dropdown split-button size="" type="primary" @click="addservice" trigger="click">
                    <router-link :to="{ path: '/stack/add',query: { environmentId: data.id }}" >添加服务</router-link>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item><i class="el-icon-plus icon"></i> <router-link to="/stack/add">添加服务</router-link> </el-dropdown-item>
                      <el-dropdown-item><i class="icon"><svg-icon icon-class="jh"  /></i>   添加负载均衡</el-dropdown-item>
                     
                    </el-dropdown-menu>
                  </el-dropdown>  
              </span>        
        </el-col>

        <el-col :span="5">                      
              <span class="stackname f-right padding10">
           

                  <el-button type="text"><svg-icon icon-class="stop2"  /></el-button>
                  <el-dropdown trigger="click">
                 
                  <span class="el-dropdown-link">                  
                      <el-button type="text"><i class="el-icon-more el-icon--right"></i></el-button>                    
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><svg-icon icon-class="stop2"  />  停止服务</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-tickets"></i> 查看配置</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-edit-outline"></i> 编辑</el-dropdown-item>
                    
                  </el-dropdown-menu>
                </el-dropdown>

              </span>        
        </el-col>

      </div>

       <el-col :span="24"  v-show="data.tab?data.tab:false">       
                <el-table
                :data="data['contianer']"
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
                </el-table-column>
                <el-table-column
                  prop="instances[0].imageUuid"
                  label="镜像">
                </el-table-column>
                 <el-table-column
                  prop="currentScale"
                  label="容器数">
                </el-table-column>
                <el-table-column                  
                  label="管理">
  

                  <template slot-scope="scope">
                      
                    <span class="stackname f-right padding10">
           

                  <el-button type="text"><svg-icon icon-class="stop2"  /></el-button>
                  <el-dropdown trigger="click">
                 
                  <span class="el-dropdown-link">                  
                      <el-button type="text"><i class="el-icon-more el-icon--right"></i></el-button>                    
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><svg-icon icon-class="stop2"  />  启动</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-tickets"></i> 重启</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-edit-outline"></i> 删除</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-edit-outline"></i> 编辑</el-dropdown-item>
                    <el-dropdown-item><i class="el-icon-edit-outline"></i> 克隆</el-dropdown-item>
                    
                  </el-dropdown-menu>
                </el-dropdown>

              </span>  

                 </template>


                </el-table-column>
              </el-table>       
       </el-col>
        </div>
   </el-row>
    
  </div>
</template>

<script>
import { stack , getstackContainer} from '@/api/paasApi'

export default {
  name: 'index',
  components: { 
   
  },
  data() {
    return {
      stack:{},
    }
  },
 created() {
   this.getstack()
  },
  methods: {
        getstack(){
          stack().then(response=>{
              this.stack=response.data
          },function(){

          })
        },
       addservice(){

       },
       stackcontianer(envid,index){
        getstackContainer(envid).then(response=>{
            //this.stack[index]['contianer']=response.data
            this.$set(this.stack[index],'contianer',response.data)
            if(this.stack[index]['tab']===true){
              this.$set(this.stack[index],'tab',false)
              
            }else{
              this.$set(this.stack[index],'tab',true)
              
            }
            
        },function(){

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

</style>
