<template>
<div class="box">



  <div class="stackbox">

  <el-row >  
    <el-col :span="8" >     
     
    </el-col>

    <el-col :span="16" >   

    <el-col :span="18">     

     

              <span class="stackname f-right">
                  <el-button><i class="el-icon-plus"></i>
      
        <router-link :to="{ path: '/system/adduser'}">添加账号</router-link>
      
                    </el-button> 
              </span> 

              
        </el-col>


    </el-col>
 
  </el-row>



  </div>

<el-card class="box-card">

<el-row class="box-row">


 <el-alert
   :closable="false"
    title="系统管理账号"
    type="warning"
    description="可添加管理停止 账号对系统的管理"
    show-icon>
  </el-alert>

  <el-table
                      :data="userlist"
                      style="width: 100%"                     
                      >
                    <el-table-column
                      prop="state"
                      label="状态"
                      sortable
                      >

                     <template slot-scope="scope">
  
                    <el-button size="small" v-if="scope.row.state=='active'" type="success" icon="el-icon-check" circle>{{scope.row.state}}</el-button>

                    <el-button size="small" v-if="scope.row.state=='inactive'" type="danger" icon="el-icon-remove" circle>{{scope.row.state}}</el-button>


                    </template>
                    

                    </el-table-column>


                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="名称"
                      sortable
                      >
                    </el-table-column>

                    <el-table-column
                      prop="username"
                      label="账号"
                      sortable
                      >

                     

                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="ID"      
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="kind"
                      label="类型"                      
                      >
                    </el-table-column>

                    <el-table-column                              
                      label="管理"                      
                      >

                     <template slot-scope="scope">

                     <el-button size="small" type="primary"  v-if="scope.row.state=='inactive'" @click="usermanage(scope.row.id,1)">启用</el-button>
                     <el-button size="small" type="warning" v-if="scope.row.state=='active'"  @click="usermanage(scope.row.id,2)">停用</el-button>
                     <el-button size="small" type="danger" v-if="scope.row.state=='inactive'"  @click="usermanage(scope.row.id,3)">删除</el-button>
                     
                     
                     <el-button size="small"><router-link :to="{ path: '/system/edituser',query: { id: scope.row.id,'pswid':scope.row.pswid }}">编辑</router-link></el-button>

                    </template>
                    

                    </el-table-column>

                  </el-table>

  </el-row>
</el-card>


</div>
</template>
<script>
import { saveconfig,sysconfig,sysuser,adminuser} from '@/api/paasApi'

  export default {
    name: 'addstack',
    data() {
     
      return {  
            userlist:[]
      };
    },
    methods:{
      getuser(){
        sysuser().then(response=>{
           console.log('user:',response.data)
            this.userlist=[]
                      var ret3 = response.data.findIndex((value, index, arr) => {                                
                                if(value.kind=='admin' || value.kind=='user'){   
                                    this.$set(this.userlist,this.userlist.length,value)
                                    //console.log('value8:',value.hostId,this.value8,arr)
                                }                             
                       })

                         let userlist=[]
                                for (var i = 0; i < this.userlist.length; i++) {
                                  userlist[i]=this.userlist[i]
                                 
                                  let ldata=userlist[i]['credentials']

                                    var fd=ldata.findIndex((value, index, arr) => {                                
                                            if(value.kind=='password'){   
                                                console.log(value)
                                                userlist[i]['username']=value.publicValue
                                                userlist[i]['pswid']=value.id
                                                //this.$set(this.userlist,this.userlist.length,value)
                                                //console.log('value8:',value.hostId,this.value8,arr)
                                            }                             
                                   })
                                 
                                }

                           this.userlist=userlist
            console.log('userlist',this.userlist)
        })
      },
      usermanage(id,type){

        if(type==3){
              this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                 adminuser(id,3).then(response=>{
                      console.log('response usermanage',response)
                      if(response.transitioning=='yes'){
                         this.getuser()
                      }
                  })
             
              }).catch(() => {
                  return false       
              });
        }else{
          adminuser(id,type).then(response=>{
              console.log('response usermanage',response)
              if(response.transitioning=='yes'){
                 this.getuser()
              }
          })
        }

          
      }



    },
    created(){
          this.getuser()
    },
    watch:{
       
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

 .margin10{
    margin:0 10px;
  }
.box {
  padding: 32px;
  background-color: rgb(240, 242, 245);

}
</style>