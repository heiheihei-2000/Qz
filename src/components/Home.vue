<template>
  <el-container style="padding-top: 10px">


    <el-aside>
      <Left @lmessage="lmessage"></Left>
    </el-aside>
    <el-main><Right ref="right" :fileType="filetype"></Right></el-main>
   
  </el-container>
</template>

<script>


import  Right from "/src/components/Right"
import  Left from "/src/components/Left"
    export default {
        name: "Home",

      data(){
          return{
            filetype: 0
          }
      },
        components:{

          Right,
          Left
        },

        methods:{
          lmessage(data){
            this.$refs.right.filetype = data
            this.filetype = data
          },
          rmessage(){
          
          }
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
