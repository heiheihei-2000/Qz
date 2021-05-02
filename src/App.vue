<template>
  <el-container >
   <el-header><the-header ref="header" ></the-header></el-header>
   <el-main><router-view></router-view></el-main>
  </el-container>
</template>

<script>
import TheHeader from '@/components/the-header.vue';

export default {
  name: 'app',
  components: {
   TheHeader
  },
  created() {
    let _this = this
    axios.post("http://localhost:8080/user/isLogin").then(function (resp) {
      console.log("create");
      console.log(resp);
      if(resp.data===''){
        console.log("没有登录");
      }else {
        console.log("已经登陆成功");
        _this.$store.commit("setUserId",resp.data.id)
        _this.$store.commit("setAccount",resp.data.account)
        console.log("create axios"+ _this.$store.state.userId)
        _this.$refs.header.checkLogin = 1
      }
    })
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
section .el-main{
 height: 1000px;
  padding: 0px;
  background-color: white;
}
</style>
