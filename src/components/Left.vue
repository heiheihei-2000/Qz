<template>
  <el-container>
    <el-header>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @select="select"
 >
    <el-menu-item index="0">
      <i class="el-icon-tickets"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="1" class="item">
      <i class="el-icon-picture-outline"></i>
      <span slot="title">图片</span>
    </el-menu-item>
    <el-menu-item index="2" class="item">
      <i class="el-icon-folder"></i>
      <span slot="title" class="item">文档</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-film"></i>
      <span slot="title" class="item">视频</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-mic"></i>
      <span slot="title" class="item">音乐</span>
    </el-menu-item>
    <el-menu-item index="6">
    <i class="el-icon-document-copy"></i>
    <span slot="title" class="item">其他</span>
  </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-folder-opened"></i>
      <span slot="title" class="item">文件夹</span>
    </el-menu-item>
  
   
  </el-menu>
    </el-header>
    <el-main></el-main>
<!--    <el-footer >-->
<!--      <el-progress :text-inside="false" :stroke-width="10" :percentage="use" :show-text="false"></el-progress>-->
<!--      <el-breadcrumb separator="/" style="margin-top: 5px;font-size: 12px;">-->
<!--        <el-breadcrumb-item>{{usesize}}</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>500M</el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </el-footer>-->
  </el-container>
</template>

<script>
    export default {
        name: "Left",
      data(){
          return {
            use:"0",
            usesize:'0'
          }
      },
      created(){
//         this.$http.post(this.$HOST+'v2/getusesize',this.$qs.stringify({
//           sign:this.$sign
//         })).then(res=>{
//           var MB=524288000;
//          var  persent=parseInt(res.data.data.size/MB)
//           if(persent==0){
//             this.use=1
//           }else{
//             this.use=persent
//           }
// this.usesize=res.data.data.realsize
//
//         })
      },
      methods:{
        select(index){
          console.log(typeof index);
          this.$emit('lmessage',Number(index))
        }
      }
    }
</script>

<style scoped>
.el-menu{
  background-color:  white;
  border: 0;
  /*text-align: center;*/

}
  .item{
    color:#424e67;
    font-size: 14px;
  }
.el-progress-bar__outer{

}
</style>
