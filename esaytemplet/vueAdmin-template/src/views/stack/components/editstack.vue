<template>
<div>

<el-dialog title="服务编辑" :visible.sync="dialogTableVisible"  v-bind:close-on-click-modal="false" v-loading="loading">

<el-row class="box-row">

  <el-form :model="data"   label-width="100px" class="demo-ruleForm">

  <el-form-item label="名称" prop="name">
    <el-input v-model="data.name" placeholder="只能用英文字母，不能用中文"></el-input>
  </el-form-item>



<el-form-item label="描述" >
    <el-input type="textarea" v-model="data.description"></el-input>
  </el-form-item>

 <el-form-item label=" ">
  <el-button type="primary" @click="save">保存</el-button>
 </el-form-item>

  </el-form>

  </el-row>

</el-dialog>

</div>
</template>
<script>
import { serviceinfo,serviceedit } from '@/api/paasApi'
  export default {
    name: 'editstack',
    data() {
      return {       
        dialogTableVisible: false,
        dialogFormVisible: false,     
        formLabelWidth: '120px',
        serviceid:null,
        loading:false,
        data:{
          name:'',
          description:''
        }
          
      };
    },
    methods:{
       getstackinfo(sid){
          this.dialogTableVisible=true
          serviceinfo(sid).then(response=>{
              this.data=response
          })
       },
       save(){
          serviceedit(this.serviceid,this.data).then(response=>{
              if(response.state=='active'){
                  this.dialogTableVisible=false
                   this.$parent.getstackinfo(this.$route.query.environmentId)
              }
          })
       }

      

    },
    created(){
     
      
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