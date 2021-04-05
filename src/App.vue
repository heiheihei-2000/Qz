<template>
  <el-container>
   <el-header><the-header style="width: 1400px">Header</the-header></el-header>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
