<template>
  <el-table
    :data="container"
    style="width: 100%;"
    :default-sort = "{prop: 'state', order: 'requestedHostId'}"
    >
    <el-table-column      
      label="状态"
      prop="state"
      fixed
      sortable>
      <template slot-scope="scope">
        <span v-if="scope.row.state=='running'" class="green"> <i class="el-icon-circle-check"></i> {{scope.row.state}}</span>
        <span v-else class="red"><i class="el-icon-remove"></i> {{scope.row.state}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="primaryIpAddress"
      label="IP地址"
      sortable
     >
    </el-table-column>
   <!--  <el-table-column
     prop="requestedHostId"
     label="主机"
     sortable
     >
   
   
   </el-table-column> -->

    <el-table-column
      prop="imageUuid"
      label="镜像"
      sortable
      >
    </el-table-column>

    <!-- <el-table-column      
      label="管理"
      fixed="right"
      >
       <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
  import { conterner,hostname } from '@/api/paasApi'


export default {
  name:'containerlist',
  data() {
    return {
      container:null,
      listLoading: true
    }
  },
  filters: {
    
  },
  created() {
    this.list()
  },
  methods:{
     list(){
        conterner().then(response => {
            console.log('response',response)
            this.container=response.data
        },
          function(err){
            console.log('response err:',err)
        })
     },
     hostname(hostid){
      hostname(hostid).then(response=>{
          return response.hostname
      },function(err){

      })
     }
  }
}
</script>

<style scoped>
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
</style>
