<template>
  <el-container >
    <el-header >
    </el-header>
    <el-main ><router-view></router-view></el-main>
  </el-container>
</template>

<script>
export default {
  name: "index.vue"
}
</script>

<style scoped>
.el-header {
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}

</style>