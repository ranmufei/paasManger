<template>
<div>

<el-dialog title="日志" :visible.sync="dialogTableVisible" v-loading="loading">

<el-row class="box-row">

  <el-card class="box-card" style="width:580px;  background:#F5F5F5;height:400px;overflow-x:scroll;overflow-y:scroll; font-size:12px">
     <pre>{{loginfo}}</pre> 
  </el-card>

  </el-row>

</el-dialog>

</div>
</template>
<script>
import { log_socket } from '@/api/paasApi'
  export default {
    name: 'log',
    data() {
      return {       
        dialogTableVisible: false,
        dialogFormVisible: false,     
        formLabelWidth: '120px',
        serviceid:null,
        loading:false,      
        loginfo:'',  
      };
    },
    methods:{
       logview(id){

        log_socket(id).then(response=>{
              let linkpath=response.url+'?token='+response.token
              this.socket(linkpath)
              console.log('linkpath',linkpath)
        },function(err){

        })

         
       },
       socket(linkpath){
              let ws = new WebSocket(linkpath);
              var   that=this
              ws.onopen = function(evt) { 
                console.log("Connection open ..."); 
                ws.send("Hello WebSockets!");
              };

              ws.onmessage = function(evt) {
                 let data=evt.data
                 that.loginfo=data
                 console.log('data',data)
              };

              ws.onclose = function(evt) {
                console.log("Connection closed.");
              };  
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