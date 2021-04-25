<template>
<div class="a">
  <div style="margin-bottom: 20px"></div>
  <div  style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 15px;  margin-left: 250px ;margin-bottom:30px;background-color: white;width: 1200px;height: 150px;" v-for=" item in tableData">
    <div style="padding-left: 10px;float: left;padding-top: 30px"><img src="../assets/logo.png" height="70px" width="70px"/></div>
    <div style="float: left;">
        <div style="font-size:20px;color: #333333;padding-top: 15px;padding-left: 15px;width: 980px">
          <p style="margin-top:10px;float: left"> {{item.name}}</p>
          <el-tooltip class="item" effect="dark" content="详情" placement="right-start">
          <i class="el-icon-more-outline" style="float: right" v-on:click="chakan(item)"></i>
          </el-tooltip>
          <p style="font-size: small;padding-top: 40px;color: #B3C0D1">{{ item.time }}</p>
        </div>
        <div style="color: #333333;font-size: medium;padding-top: 10px;width: 1050px" >
          <p style="float: left;">{{ item.zhuti }}</p>
          <el-row>
            <el-link type="primary" style="float: right;padding-right: 30px;color: #B3C0D1">点赞</el-link>
            <p style="float: right;padding-right: 20px ;color: #B3C0D1"> |</p>
            <el-link type="success" style="float: right;padding-right: 20px;color: #B3C0D1">评论</el-link>
          </el-row>
        </div>
    </div>
  </div>
  <el-dialog  :visible.sync="dialogTableVisible" style="float: left" >
    <div>
      <div style="float: left">
        <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"  style="width: 50px;height: 50px"></el-avatar>
      </div>
      <p style="color: #333333;font-size: 20px;padding-left: 50px;padding-top: 15px">{{show.name}}</p>


      <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border-radius: 15px;margin-top: 20px;">
         <p style="margin-top:10px;float: left;padding-left: 20px;font-size: medium"> {{show.zhuti}}</p>
         <p style="font-size: small;padding-top: 40px;color: #B3C0D1;padding-left: 20px;">发布时间：{{ show.time }}</p>
         <br>
         <p style="padding-left: 20px;padding-right: 20px;color:#B3C0D1">{{show.content}}</p>
      </div>
      <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      <div style="border: 3px;border-radius: 15px;">


             <div v-for="item in show.pl" style="border: 3px;border-radius: 15px;list-style-type:none;padding-top: 20px">
             <div class="block" style="float: left"><el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
             </div>
             <p style="padding-left: 40px"> {{item.name}}</p>

             <p  style="padding-left: 30px;padding-top: 15px">{{item.ct}}</p>
             </div>



      </div>
    </div>

  </el-dialog>

</div>

</template>

<script>
export default {
  name: "shequ",
  methods:{
    chakan(it){
      console.log(it);
      this.show.name=it.name;
      this.show.time=it.time;
      this.show.zhuti=it.zhuti;
      this.show.content=it.content
      for(let i=0;i<it.pl.length;i++){
        this.show.pl.push(it.pl[i])
      }
     this. dialogTableVisible=true;
    }
  },

  data() {

    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      show:{
        name:"",
        time:"",
        zhuti:"",
        content:"",
        pl:[]

      },

      dialogTableVisible:false,
      tableData: [
        {
          name:"管理员",
          time:"2016-05-02",
          zhuti:"软件园大事件..........................................",
          content:   "成龙同志在考察期内认真参加政治学习，按时汇报自我的思想和工作，信仰坚定，   用科学的理论指导行为实践，在社团工作中表现优异，积极帮助老师工作。 ,\n" +
              "                       我本人同意将成龙同学确定为发展对象。\"      ",
          pl:[
            {
              name:"gc",
              ct:"说的好！"
            },
            {
              name:"lm",
              ct:"我同意我同意"
            },{
            name: "cl",
              ct:"有道理"
            }
          ]
        },

        {
          name:"用户1",
          time:"2019-06-21",
          zhuti:"震惊！.......",
          content: "成龙同志在考察期内认真参加政治学习，按时汇报自我的思想和工作，信仰坚定， \n" +
              "用科学的理论指导行为实践，在社团工作中表现优异，积极帮助老师工作。 \n" +
              "我本人同意将成龙同学确定为发展对象。"
        },
        {
          name:"大憨憨",
          time:"2020-06-21",
          zhuti:"震惊！......."
        },
        {
          name:"小憨憨",
          time:"2020-06-21",
          zhuti:"震惊！......."
        },


      ]
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
html, body, .a{
  width: 100%;

}
.a {

  color: white;
  font-size: 35px;

height: 100%;
  margin: 0;



}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}


</style>