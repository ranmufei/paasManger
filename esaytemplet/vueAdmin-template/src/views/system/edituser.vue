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

 
 
    
    <el-form-item label="姓名"   >
  
          <el-input v-model="data.name" placeholder="例如： 王五"></el-input>
    
    </el-form-item>
    

 <!--    <el-form-item label="账号类型"   >    
       <el-input v-model="data.kind" placeholder="admin"></el-input>
  </el-form-item> -->

     <el-form-item label="描述"   >    
          <el-input v-model="data.description" placeholder="备注说明"></el-input>
     </el-form-item>

      <el-form-item label="密码"   >    
          <el-input v-model="secretValue" placeholder="密码"></el-input>   
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
import { edituser,userinfo,editpsw} from '@/api/paasApi'

  export default {
    name: 'addstack',
    data() {
 
      return {     
        secretValue:'',
        data:{
          "kind": "admin",
          "id": this.$route.query.id,
          "type": "account",
          "name": "",
          "state": "active",
          "created": "",
          "createdTS": "",
          "data": {},
          "description": "",
          "externalId": null,
          "externalIdType": null,
          "identity": "1i!rancher_id:"+this.$route.query.id,
          "removeTime": null,
          "removed": null,
          "transitioning": "no",
          "transitioningMessage": null,
          "transitioningProgress": null,
          "uuid": ""
}
        /*{
          "kind":"admin",
          "type":"account",
          "name":"",
          "description":"",        
          "publicValue":"",
          "secretValue":"",
          "accountId":""
        }*/
     
      };
    },
    methods:{

      getuserinfo(){
          userinfo(this.$route.query.id).then(response=>{
              this.data.name=response.name
              this.data.created=response.created
              this.data.createdTS=response.createdTS
              this.data.description=response.description
              this.data.uuid=response.uuid
          })
      },
      
       save(){
            console.log('this.data',this.data)
            edituser(this.$route.query.id,this.data).then(response=>{
                console.log('repose',response)
              
                if(response.type=='account'){
                     // this.data.accountId=response.id
                      //this.data.type="password"
                      if(this.secretValue!=''){
                         this.savepsw()
                      }else{
                         window.location.href="/#/system/admin"
                      }

                     
                }
            })
                
       },
       savepsw(){
          let pswd={"newSecret":this.secretValue,"oldSecret":""}
          
          editpsw(this.$route.query.pswid,pswd).then(response=>{
               if(response.state=='active'){
                     this.$message({
                        message: '修改成功',
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
          this.getuserinfo()
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