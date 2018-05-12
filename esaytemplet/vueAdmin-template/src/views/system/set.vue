<template>
<div class="box">

<el-card class="box-card">

<el-row class="box-row">


 <el-alert
   :closable="false"
    title="主机注册UR"
    type="warning"
    description="主机连接PAAS API的Base URL是？"
    show-icon>
  </el-alert>

  <el-form :model="data"   label-width="100px" class="demo-ruleForm"  >

  <el-form-item label="当前地址"   >
   <el-radio v-model="radio" label="1">  {{ hostpath }}</el-radio> 
  </el-form-item>

  <el-form-item label="设置的地址"   >
   <el-radio v-model="radio" label="3">  {{ data.activeValue }}</el-radio> 
  </el-form-item>


    <el-form-item label="自定义地址"   >
    <el-radio v-model="radio" label="2"> 
          <el-input v-model="data.value" placeholder="例如： http://www.xxx.com"></el-input>
    </el-radio>
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
import { saveconfig,sysconfig} from '@/api/paasApi'

  export default {
    name: 'addstack',
    data() {
      var checkname = (rule, value, callback) => {

        console.log('reul:',rule,'value:',value,'callback',callback)

        if (!value) {
          return callback(new Error('名称不能为空'));
        }
            setTimeout(() => {
                    const reg =/\s/;                   
                    const reg2 =/^[A-Za-z]+$/;                   
                    if (reg.test(value)) {
                      callback(new Error('不能有空格 或者中文'));
                    } else {
                      callback();
                    }
            }, 500);
      };
      return {  
        hostpath:location.hostname+':'+location.port,
        diypath:null,
        radio:'3',
        data:{
            "id": "1as1",
            "type": "activeSetting",
            "name": "api.host",
            "activeValue": null,
            "inDb": true,
            "source": "Database",
            "value": null
          },
     
      };
    },
    methods:{

      sysconfigs(){
        sysconfig().then(response=>{
            console.log('response sysconfig',response)
            this.data=response            
            this.diypath=''

        })
      },      
       save(){
            console.log('this.data',this.data)
            saveconfig(this.data).then(response=>{
                console.log('repose',response)
                this.sysconfigs()
                if(response.type=='activeSetting'){
                    this.$message({
                      message: '设置成功',
                      type: 'success'
                    });
                }
            })
                
       }
    },
    created(){
           this.sysconfigs()
    },
    watch:{
        'radio':function(n,o){
           if(n==1){
              this.data.value=this.hostpath
           }else if(n==3){
              this.data.value=this.data.activeValue
           }else if(n==2){
              this.data.value=''
           }
        },
        'diypath':function(n,o){
            this.data.value=n
        }
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