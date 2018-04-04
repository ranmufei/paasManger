<template>
  <div>
   <!-- <el-button type="primary" @click="getinfo(hid)" v-model:bind="hid">主要按钮 {{hid}} ,{{hostid}}</el-button>
     -->
  <el-dialog title="编辑主机信息" :visible.sync="dialogFormVisible">
    <el-form :model="hostinfo">
        <el-form-item label="主机名称":label-width="formLabelWidth">
          <span>{{hostinfo.hostname}}</span>
        </el-form-item>

      <el-form-item label="自定义名称" :label-width="formLabelWidth">
        <el-input v-model="hostinfo.name" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="hostinfo.description" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="标签:" :label-width="formLabelWidth">
        <el-button type="primary" icon="el-icon-plus" round @click="addlabe"></el-button>
      </el-form-item>

      <el-form-item label="" :label-width="formLabelWidth">
        
        <el-col :span="8">
          <span>键</span>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="8">
          <span>值</span>
        </el-col>
        <div v-for="(values, key) in hostinfo['labels']">
        <el-row class="marin" >
            <el-col :span="8">
              <el-input  v-model="key" auto-complete="off" ></el-input>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:10px">-</el-col> 
            <el-col :span="8">
                 <el-input  v-model="hostinfo['labels'][key]"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="padding-left:10px ; color:red; cursor: pointer;">  <i class="el-icon-circle-close" @click="del(key)"></i>   </el-col>
        </el-row>
        </div>
      </el-form-item>
      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="edithost">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  import { hostinfo,testhostinfo,edithost } from '@/api/paasApi'


export default {
  name:'edithost',
  props:['hid'],
  data() {
    return {
      hostid:this.hid,
      hostinfo:{},
      listLoading: true,
      dialogFormVisible: false,
      plus:0,
      formLabelWidth: '90px'
    }
  },
  filters: {
    
  },
  watch:{
     /* 'hid':function(val,oval){
         console.log('新值：',val)
         console.log('老值：',oval)
         this.getinfo(val)
      }*/
  },
  created() {
    //this.getinfo(this.hid)
    //this.hostinfos()
  },
  methods:{
    edithost(){
      edithost(this.hostinfo.id,this.hostinfo).then(response=>{
        console.log('修改 response:',response)
        if(response.type){
          this.dialogFormVisible=false
           this.$parent.hostlist()
        }
      },function(error){
        console.log('error:',error)
      })
    },   
    hostinfos(hostid){
        hostinfo(hostid).then(response=>{
            this.hostinfo=response
            console.log('testhostinfo:',response)
        },function(error){
            console.log('error:',error)

        })
    },
    addlabe(){
      this.plus++
      //this.hostinfo.labels[Math.random()]="b"
      this.$set(this.hostinfo.labels,'key'+this.plus,'value1')
      console.log('label',this.hostinfo.labels)
      console.log(this.$data)
    },
    del(key){
      console.log('key:',key)     
      this.$delete(this.hostinfo.labels,key)
    },
    getinfo(id){
        console.log('getinfos=>',id)
        console.log('getinfoprops=>',this)
        //this.hostinfos(this.hostid)
        this.hostinfos(id)
        this.dialogFormVisible=true

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
  .marin{
    margin: 4px;
  }
</style>
