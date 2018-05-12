<template>
  <div class="padding10 bg"> 
    <el-card shadow="hover">
      <h3>注册主机</h3>
       <hr>
       
          
          <h5>一、设置安装docker基础配置；</h5>

       <el-card style="background:#F5F5F5; font-size: 13px;">
       <pre>
          sudo mkdir -p /etc/systemd/system/docker.service.d
          sudo cat >/etc/systemd/system/docker.service.d/override.conf <<E
          [Service] 
          ExecStart= 
          ExecStart=/usr/bin/docker daemon --storage-driver=overlay -H fd:// --insecure-registry hub.03in.com:5002
          E
       </pre>
          
        </el-card>

      <h5>二、安装docker 程序；</h5>
       <el-card style="background:#F5F5F5; font-size: 13px;">
       <pre>
          wget www.linksame.com/1.10.sh
       </pre>          
        </el-card>

        <h5>三、增加标签（可选）；</h5>
      
         <el-card style="background:#F5F5F5; font-size: 13px;">
              <el-row><el-button  size="mini" icon="el-icon-circle-plus" circle @click="addenvval('add',0)">添加标签</el-button></el-row>

           <!--  <el-col :span="12">
             <span class="padding-left10">变量</span>
           </el-col>
           <el-col class="line" :span="1"> </el-col>
           <el-col :span="10">
             <span class="padding-left10">值</span>
           </el-col>
            -->

       <el-row class="marin" v-for="(item , key) in envlist">

            <el-col :span="10">
              <el-input placeholder="key" v-model="item.k" auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="1" style="padding-left:5px"> = </el-col>
            <el-col :span="10">
              <el-input placeholder="value" v-model="item.v" auto-complete="off" ></el-input>
            </el-col>

            <el-col class="line" :span="2" style="padding-left:5px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="addenvval('del',key)"></i>   </el-col>

        </el-row>
        </el-card>

        <h5>四、设置主机IP（可选）；</h5>
        <p>如果添加的是运行 PAAS 服务的主机 必须设置此选项</p>
         <el-card style="background:#F5F5F5; font-size: 13px;">
            <el-input v-model="CATTLE_AGENT_IP"  placeholder="例如：127.0.0.1"></el-input>
        </el-card>

        <h5>五、注册主机；</h5>
        <p>复制下面的命令在主机上运行</p>
         <el-card style="background:#F5F5F5; font-size: 13px;">
         <el-input type="textarea" v-model="config.command" :rows='4' @focus="focusenv"></el-input>
                
        </el-card>

    </el-card>  

   
  </div>
</template>

<script>
import { hostconfig } from '@/api/paasApi'

export default {
  name:'edithost',
  props:['hid'],
  data() {
    return {
      config:{
           command:"",     
      } ,    
      formLabelWidth: '90px',
      envlist:[],
      'CATTLE_AGENT_IP':null,
      CATTLE_HOST_LABELS:null,
      cmmand:[],
      okip:null,// ip 完整配置
      oklab:null,// lab 完整配置
    }
  },
  filters: {
    
  },
  watch:{
     'envlist':{
          handler:function(val,oldv){
       
            let strl=''
            let parr=[]
            let newstr=''
            for (var i = 0; i < val.length; i++) {
                  //console.log(val[i].k,val[i].v)
                  strl=val[i].k+'='+val[i].v
                 parr.push(strl)

                 newstr= parr.join("&")
            }

            if(newstr){
               this.CATTLE_HOST_LABELS=newstr
                this.oklab="-e CATTLE_HOST_LABELS='"+newstr+"' "
            }else{
              this.oklab=null
            }

            console.log('strl',parr)
            console.log('newstr',newstr)
           
          },
          deep:true
      },
       'CATTLE_AGENT_IP':{
          handler:function(val,oldv){
              if(val!=''){
                  let str='-e CATTLE_AGENT_IP="'+this.CATTLE_AGENT_IP+'" '
                  let strs=this.config.command
                 
                  this.okip=   str
              }else{
                   //this.getconfig()
                   this.okip=null
              }
          },
          deep:true
      },
     
  },
  created() {
    this.getconfig()
  },
  methods:{
        //  插入 
      //参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
      insert_flg(str,flg,sn){
          var newstr="";
          for(var i=0;i<str.length;i+=sn){
              var tmp=str.substring(i, i+sn);
              newstr+=tmp+flg;
          }
          return newstr;
      }
        ,
      getconfig(){

        hostconfig().then(response=>{
          this.config=response.data[0]
           console.log('databases:',response.data)
           //cmmand
           let err=[];
           err =   response.data[0].command.split("run ");
           this.cmmand=err
           console.log('this.cmmand.',this.cmmand)
        })
      },
       addenvval(type,key){
        if(type==='del'){
          this.$delete(this.envlist,key)
          //this.$delete(this.data.launchConfig.environment,key)
        }else{
          //this.envnum++
          this.$set(this.envlist,this.envlist.length, {'k':"key",'v':"value"})
          //this.$set(this.data.launchConfig.environment,this.envnum,{'value':'key'})
        }
      },
      focusenv(){
        console.log('mouce focue')
        // 设置IP
                 let err=[]
                  err =   this.config.command.split("run ");
                  console.log('err',err)
                  let newstring=this.cmmand[0]+' run '+(this.okip?this.okip:'')+' '+(this.oklab?this.oklab:'')+this.cmmand[1]
                  // console.log('newstring',newstring)
                  this.config.command=newstring   
        //设置lab
          
      }
  }
}
</script>

<style scoped>
.padding10{ padding: 10px;}
.margin10{ margin: 10px;}
.bg{
    background: #F2F6FC;
    min-height: 700px;
    height: 100%;
}
   .font-text{
    color: #606266;
  }
  .font-title{
    color: #303133;
  }
  .green{
    color: green
  }
  .red{
    color: red
  }
  .marin{
    margin: 4px;
  }
</style>
