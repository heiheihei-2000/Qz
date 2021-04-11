<template>
<div>
<div style="text-align: center
;height:275px;


padding-top: 10px;

padding-right: 10px;
margin: 20px;
">
  <i class="el-icon-document-copy" style="font-size:100px;padding-bottom: 30px"></i>
  <el-upload
      class="upload-demo"

      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"

      :auto-upload="false">
    <el-button slot="trigger" size="large" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="large" type="success" @click="submitUpload">开始分析</el-button><br><br>
    <div slot="tip" class="el-upload__tip">请选取您的文件进行分析吧！</div>
  </el-upload>


</div>
  <el-divider direction="horizontal"><i class="el-icon-mobile-phone"></i></el-divider>
</div>

</template>

<script>

export default {
  data() {
    return {
      fileList: [],
      file:[]
    };
  },
  methods: {
    handleSuccess(){

     this.file.push(this.$refs.upload.uploadFiles)
    } ,
    submitUpload() {
      this.$refs.upload.submit();

      console.log(this.file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  },

  name: "kaodian"
}
</script>

<style scoped>

</style>