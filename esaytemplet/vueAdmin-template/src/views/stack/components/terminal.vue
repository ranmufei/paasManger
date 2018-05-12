<template>
<div>

<el-dialog title="命令" :visible.sync="dialogTableVisible" v-loading="loading" v-bind:close-on-click-modal="false" v-on:close="dialogClosed">

<el-row class="box-row"  style="width:100%;  ">
  
  <el-card class="box-card" style="width:100%;  background:#F5F5F5;height:400px;overflow-x:scroll;overflow-y:scroll; font-size:12px" >
      <div id="terminal"></div>
  </el-card>

  </el-row>

</el-dialog>

</div>
</template>
<script>
import { exec_socket } from '@/api/paasApi'
import "xterm/dist/xterm.css"
import { Terminal } from 'xterm';
//import {terminal}from 'terminal-kit'

  export default {
    name: 'terminal',
    
    data() {
      return {       
        dialogTableVisible: false,
        dialogFormVisible: false,     
        formLabelWidth: '120px',
        serviceid:null,
        loading:false,      
        loginfo:'',  
        ws:null,
        xterm:null
      };
    },
    methods:{
       terminal(id){

              exec_socket(id).then(response=>{
                    let linkpath=response.url+'?token='+response.token
                    this.socket(linkpath,1)
                    console.log('linkpath',linkpath)
              },function(err){

              })
       
       },
       dialogClosed(){
            console.log('closed dailog')
            this.xterm.destroy();
       },
       socket(linkpath,type=1){
              

              this.ws = new WebSocket(linkpath);
             
              var xterm = new Terminal({
                  cols: 100,
                  rows: 20,
                  cursorBlink: 5,
                  scrollback: 30,
                  tabStopWidth: 4
              });  // Instantiate the terminal

               var   that=this
               this.xterm=xterm
               xterm.open(document.getElementById('terminal'));
    
              
               that.ws.onerror = function () { showErrorMessage('connect error.') };
               that.ws.onmessage = function(event) {
                  console.log('on message:',that.decodeBase64Content(event.data))

                  xterm.write(that.decodeBase64Content(event.data));
              };
               that.ws.onopen = function () { 
                console.log('ws onopen ')
                 
               }
            
               console.log(xterm.element.classList);

               // Log the keyCode of every keyDown event
              xterm.textarea.onkeydown = function (e) {
                console.log('User pressed key with keyCode: ', e.keyCode);
               
              }

              xterm.attachCustomKeyEventHandler(function (e) {
                if (e.keyCode == 13) {
                  console.log('enter')                  
                    that.ws.send('DQ==')                
                  return false;
                }
              });
              xterm.on('data',function(data){
                 console.log('data xterm=>',data)
                 //xterm.write(data);
                  that.ws.send(that.encodeBase64Content(data.toString()))
              })

              xterm.on('output', arrayBuffer => {
                console.log('output===',arrayBuffer)
                xterm.write(arrayBuffer);
              });

              xterm.on('blur', arrayBuffer => {
                console.log('blur===',arrayBuffer)
                xterm.write(arrayBuffer);
              });

              xterm.on('focus', arrayBuffer => {
                console.log('focus===',arrayBuffer)
                xterm.write(arrayBuffer);
              });

            /*  xterm.on('key', arrayBuffer => {
                console.log('key===',arrayBuffer)
                xterm.write(arrayBuffer);
              });*/
              xterm.on('keydown', arrayBuffer => {
                console.log('keydown===',arrayBuffer)
                xterm.write(arrayBuffer);
              });
          

                xterm.on('lineFeed', arrayBuffer => {
                console.log('lineFeed===',arrayBuffer)
                xterm.write(arrayBuffer);
              });

              xterm.on('resize', size => {
                that.ws.send('resize', [size.cols, size.rows]);
                console.log('resize', [size.cols, size.rows]);
              })

              //xterm.on('data', data => socket.emit('input', data));
       },
      decodeBase64Content(base64Content) {
        // base64 解码
        let commonContent = base64Content.replace(/\s/g, '+');
        commonContent = Buffer.from(commonContent, 'base64').toString();
        return commonContent;
      },
      encodeBase64Content(commonContent) {
        // base64 编码
        let base64Content = Buffer.from(commonContent).toString('base64');
        return base64Content;
      },

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