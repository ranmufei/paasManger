<template>

<div>
    <el-row >  
      
       <el-col :span="12" >     
           <div :class="className" :id="id" :style="{'height':height,width:width}"></div>           
       </el-col>

       <el-col :span="12" >     
           <div :class="className" :id="id+'_cpu'" :style="{'height':height,width:width}"></div>           
       </el-col>

    </el-row>


    <el-row >  
      
       <el-col :span="12" >     
           <div :class="className" :id="id+'_net'" :style="{'height':height,width:width}"></div>           
       </el-col>

       <el-col :span="12" >     
                
       </el-col>

    </el-row>


</div>


</template>

<script>
import echarts from 'echarts'
import { gethost_socket } from '@/api/paasApi'

export default {
  name:'hostchart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '400px'
    },
    title: {
      type: String,
      default: 'ranmufei'
    },
    hostid: { // 容器ID
      type: String,
      default: '1h8'
    },
   
  },
  data() {
    return {
      url:'',
      token:'',
      chart: null,
      data:[],
      date:[],
      x:[],
      y:[],
      memmax:'4', // 内存最大值
      cpux:[],
      cpuy:[],
      cpudata:{
          sys:[],
          use:[],
      },
      netdata:{
          f:[],
          s:[],
      },
      heights:'300px',
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
 created() {
    var base = +new Date(1969, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date=[]
    var data = [Math.random() * 300];
    for (var i = 1; i < 200; i++) {
        var now = new Date(base += oneDay);
        //date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        //data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }
    this.date=date
    this.data=data
    console.log('date',this.date)
    console.log('data',this.data)
    this.websock();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
     
      this.chart.setOption({
            title: {
                text: '内存使用量',
                subtext: '单位默认M'
            },  
            xAxis: {
                type: 'category',
                data: this.x
            },
            yAxis: {
                type: 'value',
                max: this.memmax,
                axisLabel: {
                      formatter: '{value} G'
                  },
                  axisPointer: {
                      snap: true
                  }
            },
            series: [{
                data: this.y,
                type: 'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                normal: {
                      color: 'rgb(255, 70, 131)'
                  }
              },
            }]
      })

     // console.log('tihs.x',x)
     // console.log('tihs.y',y)
    },
    initChartcpu() {
      this.chart = echarts.init(document.getElementById(this.id+'_cpu'))
     
      this.chart.setOption(
          {
                title:{
                  text:'CPU 资源统计'
                },
                xAxis: {
                    type: 'category',
                    data: this.x
                },
                yAxis: {
                    type: 'value',
                    max: 100,
                    min: 0,
                    axisLabel: {
                      formatter: '{value} %'
                      },
                },
                legend: {
                    data: ['系统', '用户']
                },
                series: [
                  {
                        name: '系统',
                        type: 'line',                       
                        data: this.cpudata.sys,
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        areaStyle: {}
                    },
                {
                        name: '用户',
                        type: 'line',                       
                        data: this.cpudata.use,
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',                        
                        areaStyle: {}
                    },
                ]
          }
        )

     // console.log('tihs.x',x)
     // console.log('tihs.y',y)
    },initChartnet() {
      this.chart = echarts.init(document.getElementById(this.id+'_net'))
     
      this.chart.setOption(
          {
                title:{
                  text:'网卡流量'
                },
                xAxis: {
                    type: 'category',
                    data: this.x
                },
                yAxis: {
                    type: 'value',                    
                    axisLabel: {
                      formatter: '{value} KB'
                      },
                },
                legend: {
                    data: ['发送', '接收']
                },
                series: [
                  {
                        name: '发送',
                        type: 'line',                       
                        data: this.netdata.f,
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        areaStyle: {}
                    },
                {
                        name: '接收',
                        type: 'line',                       
                        data: this.netdata.s,
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',                        
                        areaStyle: {}
                    },
                ]
          }
        )

     // console.log('tihs.x',x)
     // console.log('tihs.y',y)
    },
    websock(){
      //import VueSocketio from 'vue-socket.io';
      
       var d=new Date()

      for (var i = 0; i < 20; i++) {
          this.x.push(d.getMinutes()+i)
          this.y.push(0)

          //this.cpudata.sys.push(d.getMinutes()+i)
          this.cpudata.sys.push(0)
          this.cpudata.use.push(0)

          this.netdata.f.push(0)
          this.netdata.s.push(0)
      }

       gethost_socket(this.hostid).then(response=>{
                  
          let linkpath=response.url+'?token='+response.token
          let ws = new WebSocket(linkpath);
          var   that=this
          ws.onopen = function(evt) { 
            console.log("Connection open ..."); 
            ws.send("Hello WebSockets!");
          };

          ws.onmessage = function(evt) {
            //console.log( "Received Message: " + evt.data);
           
            let data=eval('('+evt.data+')')

            let d=new Date()
            let bb=(d.getMinutes() <10 ? '0' + d.getMinutes() : d.getMinutes()) + ':'+(d.getSeconds() <10 ? '0' + d.getSeconds() : d.getSeconds());

            
             that.x.shift()
             that.x.push(d.getSeconds())

             that.memmax=parseInt(data[0].memLimit/1024/1024/1024)

             that.y.shift()
             that.y.push(parseInt(data[0].memory.usage/1024/1024/1024))  // 单位M

            /* that.cpux.shift()
             that.cpux.push(d.getSeconds())

             that.cpuy.shift()
             that.cpuy.push(parseInt(data[0].cpu.load_average/1024))  // 单位M*/
            
             that.cpudata.sys.shift()
             that.cpudata.use.shift()
             that.cpudata.sys.push(parseInt((data[0].cpu.usage.system/data[0].cpu.usage.total)*100))
             that.cpudata.use.push(parseInt((data[0].cpu.usage.user/data[0].cpu.usage.total)*100))

             that.netdata.f.shift()
             that.netdata.s.shift()
             that.netdata.f.push(parseInt((data[0].network.rx_bytes/16/1024/1024)))
             that.netdata.s.push(parseInt((data[0].network.tx_bytes/16/1024/1024)))

          // console.log('that.cpudata.sys',that.cpudata.sys)
          // console.log('that.cpudata.use',that.cpudata.use)
             
            //ws.close();
            if(d.getSeconds()%2 ==0){
                  that.initChart()
                  that.initChartcpu()
                  that.initChartnet()
            }
             
          };

          ws.onclose = function(evt) {
              console.log("Connection closed.");
          };  


      },function(err){

      })

        
    },
    getchatdata(){
       // 获取
       
    },
    getsockeinfo(){
      // 获取socket 

    }
  }
}
</script>
