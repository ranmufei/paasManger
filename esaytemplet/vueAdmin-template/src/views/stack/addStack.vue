<template>
<div class="box">

<el-card class="box-card">

<el-row class="box-row">

  <el-form :model="data"   label-width="100px" class="demo-ruleForm"   :rules="rules2" ref="data">

  <el-form-item label="服务组名称"   prop="name">
    <el-input v-model="data.name" placeholder="只能用英文字母，不能用中文"></el-input>
  </el-form-item>



<el-form-item label="描述" >
    <el-input type="textarea" v-model="data.description"></el-input>
  </el-form-item>


<el-form-item label="导入 " >
  
    <el-row >  
    <el-col :span="24" > 
          <el-col :span="16" >
          <el-input type="textarea" :rows="5"  v-model="data.dockerCompose" style="min-height: 83px; margin-top: 0px; margin-bottom: 0px; height: 173px;"></el-input></el-col>
          <el-col :span="6" >   
              
              <el-upload
                class="upload-demo margin10"
                ref="upload"
                action=""
                :on-change="filechange"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary" plain><svg-icon icon-class="up" />选取docker-compose.yml文件</el-button>
             
                
              </el-upload>
    


           </el-col>
    </el-col>
    </el-row>

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
import { addstack,curl } from '@/api/paasApi'
import axios from 'axios'

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
                    if (reg.test(value) || !reg2.test(value)) {
                      callback(new Error('不能有空格 或者中文'));
                    } else {
                      callback();
                    }
            }, 500);
      };
      return {  
        fileList:[],    
        dialogTableVisible: false,
        dialogFormVisible: false,     
        formLabelWidth: '120px',
        serviceid:null,
        loading:false,
        data:{
          "type": "environment",
          "startOnCreate": true,
          "name": null,
          "description": null,
          //"dockerCompose":null,
          "created": null,
          "externalId": "",
          "healthState": null,
          "kind": null,
          "removed": null,
          "uuid": null,
          "previousExternalId": null
        },
        ruleForm2: {
          name: ''
        },
        rules2: {
          name: [
            { validator: checkname, trigger: 'blur' },
            { required: true, message: '请输入服务组名称', trigger: 'blur' },
          ],
        }
          
      };
    },
    methods:{
      filechange(file,filelist){
       
             let that=this    
            // GET request for remote image
            axios({
              method:'get',
              url:file.url,
             // responseType:'stream'
            })
              .then(function(response) {
                 console.log(response.data,that.data)
                 //that.data.dockerCompose=response.data
                 that.$set(that.data,'dockerCompose',response.data)
            });

      },
       save(){
         
         this.$refs['data'].validate((valid) => {
          if (valid) {
            //alert('submit!');
           
            addstack(this.data).then(response=>{
                console.log('response save add',response)
                 window.location.href="/#/stack/index"
            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });


            
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

 .margin10{
    margin:0 10px;
  }
.box {
  padding: 32px;
  background-color: rgb(240, 242, 245);

}
</style>