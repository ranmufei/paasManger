<template>

<div>
    <div :class="className" :id="id" :style="{'height':height,width:width}"></div>

  <div :class="className" :id="id+'_cpu'" :style="{'height':height,width:width}"></div>
</div>


</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getcontainer_socket } from '@/api/paasApi'


export default {
  mixins: [resize],
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
    continaerid: { // 容器ID
      type: String,
      default: 'ranmufei'
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
      cpux:[],
      cpuy:[],
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
                axisLabel: {
                      formatter: '{value} M'
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
     

      this.chart.setOption({
            title: {
                text: 'cpu 资源使用量',
                subtext: '单位默认M'
            },
            xAxis: {
                type: 'category',
                data: this.cpux,
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                      formatter: '{value} M'
                  },
                  axisPointer: {
                      snap: true
                  }
            },
            series: [{
                data: this.cpuy,
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
    websock(){
      //import VueSocketio from 'vue-socket.io';
      
       var d=new Date()

      for (var i = 0; i < 100; i++) {
          this.x.push(d.getMinutes()+i)
          this.y.push(0)

          this.cpux.push(d.getMinutes()+i)
          this.cpuy.push(0)
      }

       getcontainer_socket(this.continaerid).then(response=>{
                  
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

            //console.log( "Received Message: ",data[0].memory.usage);
            
            let d=new Date()
            let bb=(d.getMinutes() <10 ? '0' + d.getMinutes() : d.getMinutes()) + ':'+(d.getSeconds() <10 ? '0' + d.getSeconds() : d.getSeconds());

            //that.data.push(parseInt(data[0].memory.container_data.pgfault/1024))
            //that.date.push(bb)
            //that.initChart()
            //that.$set(that.data,that.data.length,data[0].memory.container_data.pgfault)
            //that.$set(that.date,that.date.length,Date.parse(new Date()))
             that.x.shift()
             that.x.push(d.getSeconds())

             that.y.shift()
             that.y.push(parseInt(data[0].memory.container_data.pgfault/1024))  // 单位M

             that.cpux.shift()
             that.cpux.push(d.getSeconds())

             that.cpuy.shift()
             that.cpuy.push(parseInt(data[0].cpu.load_average/1024))  // 单位M

             //console.log('that x',that.x,':',that.y)
             
            //ws.close();
             that.initChart()
             that.initChartcpu()
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
