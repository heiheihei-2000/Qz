<template>
  <el-container style="padding-top: 10px">


    <el-aside><Left></Left></el-aside>
    <el-main><Right></Right></el-main>

  </el-container>
</template>

<script>


import  Right from "/src/components/Right"
import  Left from "/src/components/Left"
    export default {
        name: "Home",

      data(){
          return{

          }
      },
        components:{

          Right,
          Left
        },

        methods:{

        }
    }
</script>

<style scoped>

  .el-container{
    height: 100%;

  }

.el-aside{
  background-color:  #f7f7f7;
  max-width: 194px;

}
.el-main{
  height: calc(100% - 62px);
  max-width: calc(100% - 194px);
}



</style>
