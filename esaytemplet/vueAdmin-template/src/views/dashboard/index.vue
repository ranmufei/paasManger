<template>
  <div class="dashboard-container">
    
  <el-row :gutter="12">
  <el-col :span="6">
    <el-card shadow="hover">
          <el-col :span="12">
             <div class="img"><svg-icon icon-class="host" /></div>
          </el-col>
          <el-col :span="12">
            <div class="title">主机</div>
            <div class="num">{{hostnum}} 台</div>
          </el-col>
    </el-card>
  </el-col>
  <el-col :span="6">
    <el-card shadow="hover">
          <el-col :span="12">
             <div class="img" style="color:#36A3F7"><i class="el-icon-menu"></i></div>
          </el-col>
          <el-col :span="12">
            <div class="title">服务组</div>
            <div class="num">{{servernum}} 个</div>
          </el-col>
    </el-card>
  </el-col>
  <el-col :span="6">
    <el-card shadow="hover">
          <el-col :span="12">
             <div class="img"><svg-icon icon-class="docker" /></div>
          </el-col>
          <el-col :span="12">
            <div class="title">容器数</div>
            <div class="num">{{containernum}} 个</div>
          </el-col>
    </el-card>
  </el-col>

  <el-col :span="6">
    <el-card shadow="hover">
          <el-col :span="12">
             <div class="img" style="color:#F4516C"><i class="el-icon-warning"></i></div>
          </el-col>
          <el-col :span="12">
            <div class="title" >异常容器</div>
            <div class="num">{{errnum}} 个</div>
          </el-col>
    </el-card>
  </el-col>

  
</el-row>

<el-row :gutter="12">
  <el-card style="margin:6px;">
  <containerlist />
  </el-card>
  
</el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import  containerlist  from '@/views/host/containers'
import { hosts,stack ,getservice} from '@/api/paasApi'

export default {
  name: 'dashboard',
   components: { 
   containerlist
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.gethost()
    this.getstack()
    this.getservice()
  },
  methods:{
    gethost(){
         hosts().then(response=>{
        this.hostnum=response.data.length
       })
    },
    getstack(){
         stack().then(response=>{
        this.servernum=response.data.length
       })
    }
    ,getservice(){
         getservice().then(response=>{
        this.containernum=response.data.length
       })
    }
   

  },
  data(){
    return{
        hostnum:6,
        servernum:8,
        containernum:30,
        errnum:0,
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box{
  background: #F0F2F5;
}
.img{
  width: 80px;
  height: 80px;
  font-size:60px;
  color: #40C9C6;
}
.title{
  color:#8F8F8F;
  font-size:18px;
  height:30px;
  line-height:30px;
}
.num{
  color:#66667D;
  font-size:24px;
  height:30px;
  line-height:30px;
}
</style>
