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
          action="http://localhost:8080/file/python/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
           name="uploadFile"
          :auto-upload="false">
        <el-button slot="trigger" size="large" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="large" type="success" @click="submitUpload">开始上传</el-button><br><br>
        <div slot="tip" class="el-upload__tip">请选取您的文件进行分析吧！</div>
      </el-upload>


    </div>
    <el-divider direction="horizontal"><i class="el-icon-mobile-phone"></i></el-divider>
    <div  style="padding: 20px">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            LDA模型结果<i class="header-icon el-icon-info"></i>
          </template>
          <div v-model="tableData.lda">
            {{tableData.lda}}
          </div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback">
          <div></div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency">
          <div></div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability">
          <div></div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      tableData:{
        lda:'',
        lsi:'',
        tf:'',
        text:''
      },
      fileList: [],

    };
  },
  methods: {
    handleSuccess(){

      this.fileList.push(this.$refs.upload.uploadFiles);
      // console.log(this.response)

      let ke=Object.keys(this.fileList[0][0].response)

      let tmp=Object.keys(this.tableData)

      console.log(this.fileList[0][0].response[ke[0]][0])
      for(let i=0;i<ke.length;i++){
        let cke=Object.keys(this.fileList[0][0].response[ke[i]])
        for(let j=0;j<cke.length;j++){
          this.tableData[tmp[i]]+=this.fileList[0][0].response[ke[i]][j]

        }
        // this.tableData[tmp[i]]= this.tableData[tmp[i]].replace('/').replace('')
      }


    } ,
    submitUpload() {
      this.$refs.upload.submit();



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