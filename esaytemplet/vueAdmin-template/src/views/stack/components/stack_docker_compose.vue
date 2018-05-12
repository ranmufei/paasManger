<template>
  <div class="dashboard-editor-container size13">
  
      <pre v-if="config!==null">
        {{config.dockerComposeConfig.trim()}}
      </pre>
  </div>
</template>

<script>
import { stackconfig } from '@/api/paasApi'

export default {
  name: 'config',
  components: { 
  
  },
  props: {
    envid: {
      type: String,
      default: '1e15'
    },
  },
  data() {
    return {
      loading: true,
      config:null,
      stackid:'',
      info:"      orange:"
    }
  },
 created() {
      this.getconfig()
      this.stackid=this.envid
  },
  methods: {
     getconfig(){
        stackconfig(this.envid).then(response=>{
              this.config=response
        })
     }      
  },
   watch:{      
      'envid':{
          handler:function(val,oldv){
             console.log('envidss',val,oldv)
             this.getconfig()
          },
          deep:true
      },
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
.stackdes{
  height: 30px;
  line-height: 30px;
  color:#999;
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
.size13{
  font-size:13px;
  color:#304156;
}
</style>
