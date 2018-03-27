 <template>
 <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

    <el-button type="info" @click="getdata">信息按钮</el-button>
</div>
  </template>

  <script>
  import { fetchList } from '@/api/getTableData'

    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎22',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods:{
        getdata(){
         
          fetchList().then(response => {
            //this.tableData = response.data.items.slice(0, 7)
              console.log('表格远程获取的数据：',response.data)
             this.tableData = response.data
          },function(err){
              console.log('表格远程获取的数据err：',err)
          })
          
        }
      }
    }
  </script>