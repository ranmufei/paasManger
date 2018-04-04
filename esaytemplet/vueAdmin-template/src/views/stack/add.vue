<template>
<div class="box">
 <el-row class="box-row">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称" prop="name">
    <el-input v-model="data.name"></el-input>
  </el-form-item>


  <el-form-item label="镜像" prop="name">
    <el-input v-model="data.launchConfig.imageUuid"></el-input>
  </el-form-item>

  <el-form-item  prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="创建前拉取镜像" name="type" selected></el-checkbox>      
    </el-checkbox-group>
  </el-form-item>

 
  
  <el-form-item label="运行数量" prop="delivery">
    <el-slider v-model="data.scale"></el-slider>
  </el-form-item>
  
  <el-form-item label="描述" prop="desc2">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>

  <el-form-item label=" " prop="desc2">
      <el-col :span="12">
      
        <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle>端口映射</el-button></el-row>
        
       <el-col :span="6">
          <span class="padding-left10">外部端口</span>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="6">
          <span class="padding-left10">容器端口</span>
        </el-col>

        <el-col :span="6">
          <span class="padding-left10">协议</span>
        </el-col>
       <el-row class="marin" >
            <el-col :span="6">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col> 
            <el-col :span="6">
                 <el-input  placeholder="例如:8080"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">/</el-col> 
            <el-col :span="6">
                 <el-select v-model="ruleForm.region" placeholder="请选协议">
                  <el-option label="tcp" value="shanghai" selected="selected"></el-option>
                  <el-option label="udp" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>
        </el-row>
  
          <el-row class="marin" >
            <el-col :span="6">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col> 
            <el-col :span="6">
                 <el-input  placeholder="例如:8080"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">/</el-col> 
            <el-col :span="6">
                 <el-select v-model="ruleForm.region" placeholder="请选协议">
                  <el-option label="tcp" value="shanghai" selected="selected"></el-option>
                  <el-option label="udp" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>
        </el-row>


  </el-col>
  <el-col :span="12">
      
        <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle>服务链接</el-button></el-row>
        
       <el-col :span="12">
          <span class="padding-left10">目标服务</span>
        </el-col>
        <el-col class="line" :span="1"> </el-col>
        <el-col :span="10">
          <span class="padding-left10">名称</span>
        </el-col>

        
       <el-row class="marin" >
   
            <el-col :span="10">
                 <el-select v-model="ruleForm.region" placeholder="请选协议">
                  <el-option label="tcp" value="shanghai" selected="selected"></el-option>
                  <el-option label="udp" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col> 
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
           
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>

        </el-row>
  
          <el-row class="marin" >
   
            <el-col :span="10">
                 <el-select v-model="ruleForm.region" placeholder="请选协议">
                  <el-option label="tcp" value="shanghai" selected="selected"></el-option>
                  <el-option label="udp" value="beijing"></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px">-</el-col> 
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
           
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>

        </el-row>

  </el-col>
  </el-form-item>
  
  <el-form-item >
      <el-tabs type="border-card">
      <el-tab-pane label="命令">
          
          <el-form-item label="命令" prop="cmd">
            <el-input v-model="ruleForm.name" class="marin"></el-input>
          </el-form-item>

          <el-form-item label="入口" prop="cmd">
            <el-input v-model="ruleForm.name"  class="marin"></el-input>
          </el-form-item>

          <el-form-item label="工作目录" prop="cmd">
            <el-input v-model="ruleForm.name"  class="marin"></el-input>
          </el-form-item>

          <el-form-item label="环境变量" prop="cmd">
            
              <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle>添加环境变量</el-button></el-row>
              
            <el-col :span="12">
              <span class="padding-left10">变量</span>
            </el-col>
            <el-col class="line" :span="1"> </el-col>
            <el-col :span="10">
              <span class="padding-left10">值</span>
            </el-col>

        
       <el-row class="marin" >
   
            <el-col :span="10">
                 <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col> 
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
           
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>

        </el-row>        
       <el-row class="marin" >
   
            <el-col :span="10">
                 <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col> 
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
           
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>

        </el-row>


          </el-form-item>

      </el-tab-pane>
      <el-tab-pane label="数据卷">
          
          <el-form-item label="数据卷映射" prop="cmd">
            <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle  style="margin-left:5px ; "></el-button></el-row>
          </el-form-item>
          
          <el-form-item label=" " prop="cmd">
              <el-col class="line" :span="20">
                <el-input v-model="ruleForm.name" class="marin"></el-input>
              </el-col>
               <el-col class="line" :span="4" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>
          </el-form-item>


      </el-tab-pane>
      <el-tab-pane label="网络">
    
          <el-form-item label="网络" prop="cmd">
            
                <el-col :span="20">
                     <el-select v-model="ruleForm.region" placeholder="请选协议"　style="margin-left:5px ; ">
                      <el-option label="tcp" value="shanghai" selected="selected"></el-option>
                      <el-option label="udp" value="beijing"></el-option>
                    </el-select>
                </el-col>

          </el-form-item>
  
          <el-form-item label="请求IP" prop="cmd">
            
                <el-col :span="20">
                       <el-input v-model="ruleForm.name" class="marin"></el-input>
                </el-col>

          </el-form-item>
  
          


      </el-tab-pane>
  
      <el-tab-pane label="标签">
            
              <el-form-item label="标签" prop="cmd">
            
              <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle>添加标签</el-button></el-row>
              
            <el-col :span="12">
              <span class="padding-left10">键</span>
            </el-col>
            <el-col class="line" :span="1"> </el-col>
            <el-col :span="10">
              <span class="padding-left10">值</span>
            </el-col>

        
       <el-row class="marin" >
   
            <el-col :span="10">
                 <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col> 
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
           
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>

        </el-row>        
       <el-row class="marin" >
   
            <el-col :span="10">
                 <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col> 
            <el-col :span="10">
              <el-input placeholder="例如：80"  auto-complete="off" ></el-input>
            </el-col>
           
            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click=""></i>   </el-col>

        </el-row>


          </el-form-item>


      </el-tab-pane>
      <el-tab-pane label="调度">

       <el-form-item label="容器运行主机" prop="cmd">
            
                <el-col :span="20">
                     <el-select v-model="ruleForm.region" placeholder="请选容器运行主机"　style="margin-left:5px ; ">
                      <el-option label="tcp" value="shanghai" selected="selected"></el-option>
                      <el-option label="udp" value="beijing"></el-option>
                    </el-select>
                </el-col>

          </el-form-item>

      </el-tab-pane>
    </el-tabs>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建{{this.$route.query.environmentId}}</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
</el-form>
</el-row>
</div>
</template>
<script>
  export default {
    data() {
      return {
        data:{
            "scale": 1,
            "assignServiceIpAddress": false,
            "startOnCreate": true,
            "type": "service",
            "environmentId": this.$route.query.environmentId,
            "launchConfig": {
              "kind": "container",
              "networkMode": "managed",
              "privileged": false,
              "publishAllPorts": false,
              "readOnly": false,
              "startOnCreate": true,
              "stdinOpen": true,
              "tty": true,
              "vcpu": 1,
              "type": "launchConfig",
              "labels": {
                "io.rancher.container.pull_image": "always"
              },
              "restartPolicy": {
                "name": "always"
              },
              "imageUuid": '',
              "ports": ["8081:80/tcp", "8082:88/tcp"],
              "dataVolumes": ["/home/www/data:/data"],
              "dataVolumesFrom": [],
              "dns": [],
              "dnsSearch": [],
              "capAdd": [],
              "capDrop": [],
              "devices": [],
              "logConfig": {
                "driver": "",
                "config": {}
              },
              "dataVolumesFromLaunchConfigs": [],
              "requestedHostId": "1h6",
              "command": ["echo", "helo"],
              "environment": {
                "env1": "111",
                "env2": "222"
              },
              "count": null,
              "cpuSet": null,
              "cpuShares": null,
              "createIndex": null,
              "created": null,
              "deploymentUnitUuid": null,
              "description": null,
              "domainName": null,
              "externalId": null,
              "firstRunning": null,
              "healthState": null,
              "hostname": null,
              "memory": null,
              "memoryMb": null,
              "memorySwap": null,
              "pidMode": null,
              "removed": null,
              "requestedIpAddress": null,
              "startCount": null,
              "systemContainer": null,
              "user": null,
              "userdata": null,
              "uuid": null,
              "volumeDriver": null,
              "workingDir": null,
              "networkLaunchConfig": null
            },
            "secondaryLaunchConfigs": [],
            "name": "testnginx",
            "description": "content test",
            "createIndex": null,
            "created": null,
            "externalId": null,
            "healthState": null,
            "kind": null,
            "removed": null,
            "selectorContainer": null,
            "selectorLink": null,
            "uuid": null,
            "vip": null,
            "fqdn": null
          }
        ,
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value1:2
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      setimages(images){
          return 'docker:'+images
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.box-row{
  background:#fff;
  padding:20px 20px;
}

  .marin{
    margin: 4px;
  }

  .padding-left10{
    padding-left: 10px;
  }

</style>