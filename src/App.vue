<template>
  <el-container >
   <el-header><the-header ></the-header></el-header>
   <el-main><router-view></router-view></el-main>
  </el-container>
</template>

<script>
import TheHeader from '@/components/the-header.vue';

export default {
  name: 'app',
  components: {
   TheHeader

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
  background-color: #f7f7f7;
}
</style>
