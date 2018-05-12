<template>
<div class="box">

<el-card class="box-card">

<el-row class="box-row">


 <el-alert
   :closable="false"
    title="添加系统管理"
    type="warning"
    description="系统可以添加多用户管理"
    show-icon>
  </el-alert>

  <p>   </p>

  <el-form :model="data"   label-width="100px" class="demo-ruleForm"  >

 
    <el-form-item label="登陆用户名"   >

          <el-input v-model="data.publicValue" placeholder="登陆账号  英文 "></el-input>
  
    </el-form-item>
    <el-form-item label="密码"   >
    
          <el-input v-model="data.secretValue" placeholder="密码"></el-input>
   
    </el-form-item>
    <el-form-item label="登陆姓名"   >
  
          <el-input v-model="data.name" placeholder="例如： 王五"></el-input>
    
    </el-form-item>
    

 <!--    <el-form-item label="账号类型"   >    
       <el-input v-model="data.kind" placeholder="admin"></el-input>
  </el-form-item> -->

     <el-form-item label="描述"   >    
          <el-input v-model="data.description" placeholder="备注说明"></el-input>
     </el-form-item>


 <el-form-item label=" ">
  <el-button type="primary" @click="save">保存</el-button>
 </el-form-item>

  </el-form>

  </el-row>
</el-card>


</div>
</template>
<script>
import { adduser,adduserpsw} from '@/api/paasApi'

  export default {
    name: 'addstack',
    data() {
 
      return {        
        data:{
          "kind":"admin",
          "type":"account",
          "name":"",
          "description":"",        
          "publicValue":"",
          "secretValue":"",
          "accountId":""
        }
     
      };
    },
    methods:{
/*

 */
      
       save(){
            console.log('this.data',this.data)
            adduser(this.data).then(response=>{
                console.log('repose',response)
              
                if(response.state=='registering'){
                      this.data.accountId=response.id
                      this.data.type="password"
                      this.savepsw()
                }
            })
                
       },
       savepsw(){
          adduserpsw(this.data).then(response=>{
               if(response.state=='registering'){
                     this.$message({
                        message: '添加成功',
                        type: 'success'
                      });
                     window.location.href="/#/system/admin"
                }else{
                     this.$message({
                        message: '添加失败',
                        type: 'error'
                      });
                }
          })
       }
    },
    created(){
          
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