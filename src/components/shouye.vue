<template>

  <div style="padding:0px">
<!--    <vue-element-loading-->
<!--        :active="this.$store.state.vueElementLoading"-->
<!--        spinner="spinner"-->
<!--        color="#FF6700"-->
<!--    />-->
  <el-container style="border: 1px solid #eee;padding-left: 0px;padding-right: 0px">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">

        <el-menu-item><i class="el-icon-message"></i>欢迎</el-menu-item>
<!--          <el-menu-item-group v-for="item in tableData" :key="item.id">-->
<!--            <template slot="title"><i class="el-icon-message"></i>item.name</template>-->
<!--            <el-menu-item index="1-1" v-for="item2 in item.children" :key="item2.id">item2.name</el-menu-item>-->
<!--            <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--          </el-menu-item-group>-->

      </el-menu>
    </el-aside>
     <el-main>
       <div style="width: 1430px;height: 150px;margin-left: 20px;margin-top: 30px;
       border-width: 1px;border-color: black;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding-left: 300px;
        padding-top: 40px;
       ">

         <ul style="float: left;width: 30%">
           <li style="font-size: 15px;color: #B3C0D1">总阅读量</li>
           <li style="font-size: 23px"> 15,798<i class="el-icon-user" ></i></li>
         </ul >
           <ul style="float: left;width: 30%">
             <li style="font-size: 15px;color: #B3C0D1">总点赞量</li>

             <li style="font-size: 23px">563<i class="el-icon-thumb"></i></li>
           </ul>
         <ul style="float: left;width: 30%">
           <li style="font-size: 15px;color: #B3C0D1">点赞率</li>

           <li style="font-size: 23px;color: red">563<i class="el-icon-thumb" ></i></li>
         </ul>
       </div>
       <div>
       <div style="width: 48%;height: 150px;margin-left: 20px;margin-top: 30px;
       border-width: 1px;border-color: black;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
       float:left;
       padding-top: 40px;
        padding-left: 130px;
       ">
         <ul style="float: left;width: 50%;padding-left: 50px">
           <li style="font-size: 15px;color: #B3C0D1;">今日阅读</li>
           <li style="font-size: 23px"> 15,798<i class="el-icon-user" ></i></li>
         </ul >
         <ul style="float: left;width: 50%">
           <li style="font-size: 15px;color: #B3C0D1">今日点赞</li>

           <li style="font-size: 23px">56<i class="el-icon-thumb"></i></li>
         </ul>

       </div>
         <div style="width: 48%;height: 150px;margin-left: 20px;margin-top: 30px;
       border-width: 1px;border-color: black;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
       float:left;
       padding-top: 40px;
        padding-left: 130px;
       ">
           <ul style="float: left;width: 50%">
             <li style="font-size: 15px;color: #B3C0D1">预计今日阅读</li>
             <li style="font-size: 23px;color: blue"> 15,798<i class="el-icon-user" ></i></li>
           </ul >
           <ul style="float: left;width: 50%">
             <li style="font-size: 15px;color: #B3C0D1">预计今日阅读增长</li>

             <li style="font-size: 23px;color: red"><i class="el-icon-top"></i>563%<i class="el-icon-thumb"></i></li>
           </ul>

         </div>
       </div>
       <div id="main" style="width: 1430px;height:400px;margin-top:250px;text-align: center;margin-left: 50px"></div>
     </el-main>

  </el-container>
  </div>
</template>


<script >
let echarts;
let myChart;
import VueElementLoading from 'vue-element-loading';
const components = {
  name: 'loading',
  VueElementLoading
};
export default {

  mounted: function () {
    this.init()
  },

  methods:{
    init() {
      let vm = this.$store;
      vm.commit('updateLoading', true);
      console.log('是否开启加载',
          this.$store.state.vueElementLoading)
      echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
     myChart = echarts.init(document.getElementById('main'));
// 绘制图表
      myChart.setOption({
        title:{
          text:'30天趋势图'
        },
        //工具箱
        //保存图片
        toolbox:{
          show:true,
          feature:{
            saveAsImage:{
              show:true
            }
          }
        },
        //图例-每一条数据的名字叫销量
        legend:{
          data:['总阅读量']
        },
        //x轴
        xAxis:{
          data:["2020-03-01","2020-03-06","2020-03-11","2020-03-16","2020-03-21","2020-03-26","2020-03-31"]
        },
        //y轴没有显式设置，根据值自动生成y轴
        yAxis:{},
        //数据-data是最终要显示的数据
        series:[{
          areaStyle: {
            normal: {}
          },
          name:'销量',
          type:'line',
          data:[100,200,180,300,310,280]
        }]

      });
    }
  }



}


</script>
<style scoped>



</style>