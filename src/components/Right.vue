<template>
  <div >
    <div class="bt" >

<!--        返回上一级-->
      <el-button type="text" size="medium" icon="el-icon-arrow-left" @click="back" v-if="isHaveParent">返回上一级</el-button>

<!--        上传文件-->
      <el-button type="primary" size="medium" icon="el-icon-upload2" @click="dialogVisible = true">上传文件</el-button>
<!--        新建文件夹-->
      <el-button  size="medium" @click="addfolder = true">新建文件夹</el-button>

      <el-dialog
        title="输入文件名字"
        :visible.sync="addfolder"
        width="20%"
       >
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addfolder = false">取 消</el-button>
    <el-button type="primary" @click="newfolder">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
        title="上传"
        :visible.sync="dialogVisible"
         width="400px"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:8080/file/upload"
          :before-upload="beforeUpload"
          :data="{dirName: dirUrl}"
          :with-credentials="true"
          name="uploadfile"
          v-loading="loading"
          :on-success="susu"
          element-loading-text="正在上传"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
      <div id="search"><input placeholder="请输入内容" class="search" v-model="keywords"/><i class="el-icon-search"></i>
      </div>
    </div>
<!--      对数据进行显示-->
<!--对数据显示表格进行了一定的搜索绑定-->
    <el-table :data="search(keywords,fileType)"  :height="height">
      <el-table-column prop="filename" label="文件名/文件夹" width="400">
        <template slot-scope="{row,$index}">

<!--          <a href="javascript:void(0)" style="left:40px;top: 12px;" @click="next(row.name)">{{row.filename}}</a>-->
          <a href="javascript:void(0)" style="left:40px;top: 12px;" @click="next(row)">{{row.filetype===''?row.filename:row.filename+'.'+row.filetype}}</a>


        </template>
      </el-table-column >
      <el-table-column prop="filesize" label="大小" width="270">
      </el-table-column>
        <el-table-column prop="downloads" label="下载次数" width="270">
        </el-table-column>
      <el-table-column prop="createtime" label="修改日期" width="220">
      </el-table-column>
      <el-table-column>
        <template slot-scope="{row,$index}">
        <el-tooltip v-if="row.filetype!==''" class="item" effect="dark" content="下载" placement="bottom-start">
          <el-button type="text"><i class="el-icon-download" @click="download(row)" ></i></el-button>
        </el-tooltip>

        <el-tooltip v-if="row.filetype!==''" class="item" effect="dark" content="预览" placement="bottom-start">
          <el-button type="text"><i class="el-icon-reading" @click="read(row)" ></i></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start" >
          <el-button type="text"><i class="el-icon-delete" @click="del(row,$index)" ></i></el-button>
        </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
  export default {
    name: 'Right',
    props:{
      fileType: Number
    },
    data() {
      return {
          //input 綁定在了新建文件夾的路徑中
        input:'',
        height: window.innerHeight -62 -80 -40 ,
        tableData: [],
        keywords: '',
        dialogVisible: false,
        loading:false,
        absolutePath:"\\Users\\chenglong\\Desktop\\wiki\\",
        dirUrl:'',
        username:localStorage.getItem('name'),
        addfolder:false,
          //用戶下的根目录
        rootDir:'',
      }
    },
    created() {
      // console.log("=========================="+ this.dirUrl)
      if(this.$store.state.account !== ''){
        this.dirUrl = this.absolutePath + this.$store.state.account
        this.rootDir = this.absolutePath + this.$store.state.account
        console.log("0000000000000000000000000000")
        
      }
      this.init()
    },
      computed:{
        isHaveParent:function () {
            return this.dirUrl !== this.rootDir
        }
      },
    methods: {
      susu(){
        this.init()
      },
      test(row){
        console.log(row);
      },
      init(){
          this.tableData.length = 0
          let _this = this
          //获取文件列表
          let data = new FormData()
          data.append("dirUrl",this.dirUrl)

          axios.post("http://localhost:8080/file/selectFilesByDirUrl",data).then(function (resp) {
              console.log(resp);
              resp.data.forEach(item=>{
                  console.log(item);
                  let MbSize = item.filesize
                  let byteSize = MbSize*1024.0*1024.0
                  let showSize = 0
                  if (byteSize < 1048576) {
                      showSize = (byteSize / 1024.0).toFixed(2) + 'KB'
                  } else if (byteSize > 1048576.0 && byteSize < 1073741824.0) {
                      showSize = (byteSize / 1024.0 / 1024.0).toFixed(2) + 'MB'
                  } else if (byteSize > 1073741824) {
                      showSize = (byteSize / 1024.0 / 1024.0 / 1024.0).toFixed(2) + 'GB'
                  }
                  item.filesize = showSize
                  //console.log(typeof item);
                  _this.tableData.push(item)
                  console.log(_this.tableData)
              })
              //获取文件夾列表
              data = new FormData()
              data.append("url",_this.dirUrl)
              axios.post("http://localhost:8080/fileDir/urlList",data).then(function (resp) {
                  console.log("respdir");
                  let respData = resp.data
                  let objKeys = Object.keys(respData)

                  console.log(objKeys);
                  for (let i = 0; i <objKeys.length ; i++) {
                      console.log(typeof respData[objKeys[i]]);
                      if(typeof respData[objKeys[i]] != 'number'){
                          console.log(objKeys[i]); // 文件夾名字
                          _this.tableData.push({filename: objKeys[i],filetype:'',})
                      }
                  }

              })
          })
        // localStorage.setItem('path','')
        // this.$http.post(this.$HOST + 'v2/filelist', this.$qs.stringify({
        //   sign: this.$sign,
        //   username:localStorage.getItem('name')
        // })).then(res => {
        //
        //   res.data.data.dir.forEach(item => {
        //     if (item.size == '') {
        //       var size = '-'
        //     } else {
        //       if (item.size < 1048576) {
        //         var size = (item.size / 1024).toFixed(2) + 'KB'
        //       } else if (item.size > 1048576 && item.size < 1073741824) {
        //         var size = (item.size / 1024 / 1024).toFixed(2) + 'MB'
        //       } else if (item.size > 1073741824) {
        //         var size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
        //       }
        //     }
        //     this.tableData.push({name: item.name, time: item.mtime, img: item.img, size: size})
        //   })
        //   res.data.data.file.forEach(item => {
        //     if (item.size == '') {
        //       var size = '-'
        //     } else {
        //       if (item.size < 1048576) {
        //         var size = (item.size / 1024).toFixed(2) + 'KB'
        //       } else if (item.size > 1048576 && item.size < 1073741824) {
        //         var size = (item.size / 1024 / 1024).toFixed(2) + 'MB'
        //       } else if (item.size > 1073741824) {
        //         var size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
        //       }
        //     }
        //     this.tableData.push({name: item.name, time: item.mtime, img: item.img, size: size})
        //   })
        // })
      },
      search(key,type) {
        //  key指的是关键字有咩有存在，放入newList
        //搜索
        let newlist = []
        let img = ['tiff','psd','png','swf','svg','gif','jpeg','jpg']
        let doc = ['txt','doc','docx','pdf','xls','in','out']
        let movie = ['avi','mpg','wmv','rm','rmvb','mp4']
        let music = ['wma','mp3','wav']
        let dir = ''
        this.tableData.forEach(item => {
          switch (type) {
            case 0:
              if (item.filename.indexOf(key) != -1) {
                newlist.push(item)
              }
              console.log(item.filename.indexOf(key) != -1)
              break
            case 1:
              if (item.filename.indexOf(key) != -1 && img.indexOf(item.filetype)!=-1) {
                newlist.push(item)
              }
              break
            case 2:
              if (item.filename.indexOf(key) != -1 && doc.indexOf(item.filetype)!=-1) {
                newlist.push(item)
              }
              break
            case 3:
              if (item.filename.indexOf(key) != -1 && movie.indexOf(item.filetype)!=-1) {
                newlist.push(item)
              }
              break
            case 4:
              if (item.filename.indexOf(key) != -1 && music.indexOf(item.filetype)!=-1) {
                newlist.push(item)
              }
              break
            case 5:
              if (item.filename.indexOf(key) != -1 && item.filetype === dir) {
                newlist.push(item)
              }
              break
            default:
              if (item.filename.indexOf(key) !== -1
                && img.indexOf(item.filetype) === -1
                && doc.indexOf(item.filetype) === -1
                && movie.indexOf(item.filetype) === -1
                && music.indexOf(item.filetype) === -1
                && item.filetype !== dir
              ) {
                newlist.push(item)
              }
          }
          
          
        })
        return newlist
      },
      handleClose(done) {
        done();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {
        //   });
      },
        beforeUpload(file){
            //上传文件前的校验
            // console.log(this.fileParam);
            // console.log(file);
            // this.loading = true
            // let data = new FormData()
            // data.append("uploadfile",file)
            // data.append("dirName",this.dirUrl)
            // console.log(data);
            // axios.post("http://localhost:8080/file/upload",data).then(function(resp){
            //     console.log(resp)
            // })
            // this.loading=false
            // this.init()
            // return true
            //         this.loading=true
    //         let fd = new FormData();
    //         fd.append('file',file);//传文件
    //         fd.append('sign',this.$sign);//传其他参数
    //         fd.append('username',localStorage.getItem('name'));//传其他参数
    //         fd.append('path',localStorage.getItem('path'));//传其他参数
    //               var that=this
    //         this.$http.post(this.$HOST+'v2/upload',fd).then(res=>{
    //
    //          if(res.data.code=='0'){
    //            this.dialogVisible=false
    //            that.tableData=[]
    //            that.$message({
    //              showClose: true,
    //              message: '上传成功',
    //              type: 'success'
    //    });
    //    that.loading=false
    //    this.init()
    //  }
    // else if(res.data.code=='2'){
    //    that.$message({
    //      showClose: true,
    //      message: '文件已存在',
    //      type: 'warning'
    //    });
    //  }
    //   that.loading=false
    // })

  },
      del(row,index){
          let _this = this
        this.$confirm('此操作将永久删除该文件/文件夹, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            if(row.filetype === ''){
              axios.delete("http://localhost:8080/fileDir/deleteFiledir",{data:{
                  u_id: _this.$store.state.userId,
                  deleteDirUrl: _this.dirUrl+'\\'+row.filename,
                  deleteFileDirectly: false
                }}).then(function (resp) {
                console.log(resp);
              // * result
              //   * -1 数据库不存在目标文件
              //   * 0 什么都没有删除
              //   * 1 删除了空的文件夹
              //   * 2 删除了文件和文件夹
              //   *
                if (resp.data === 1 || resp ===2){
                  _this.$message({
                        type:'success',
                        message: '删除成功'
                  });
                }else{
                  _this.$message({
                    type:'error',
                    message: '删除失败'
                  });
                }
              })
              
            }else{
              alert("删除的是文件")
              axios.delete("http://localhost:8080/file/deleteFile",{
                params:{
                  fileId:row.fileid
                }
              }).then((resp)=>{
                if(resp.data === 1){
                  _this.$message({
                    type:'success',
                    message: '删除成功'
                  });
                }else {
                  _this.$message({
                    type:'error',
                    message: '删除失败'
                  });
                }
              })
            }
            // axios.get("http://localhost:8080/file/fileDown",{
            //     params:{
            //         fileDir: _this.dirUrl,
            //         fileName: row.filename,
            //         fileType: row.filetype
            //     }
            // }).then(function (resp) {
            //     console.log(resp);
            // })
        //   this.tableData.splice(index,1)
        //   this.$http.post(this.$HOST+'v2/delfile',this.$qs.stringify({
        //     sign:this.$sign,
        //     name:localStorage.getItem('path')+name,
        //     username:this.username
        //   })).then(res=>{
        //
        //
        //   })
        _this.init()
        })
            // .catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });

      },
      download(row){
        // window.location.href=this.$HOST+'v2/download?username='+this.username+'&name='+name
          let _this = this
          axios.get("http://localhost:8080/file/fileDown",{
              params:{
                  fileDir: _this.dirUrl,
                  fileName: row.filename,
                  fileType: row.filetype
              },
              responseType:"blob"
          }).then(function (resp) {
            
            // console.log("@lm-Debug ")
            // console.log(row)
  
            // let blob = new Blob([resp.data],{
            //   type:'application/msword;charset=UTF-8'
            // })
            let url = URL.createObjectURL(resp.data)
            //
            // console.log(fileUrl);
            
            
            // window.open(fileUrl)
            //   resp.data.type = "application/msword"
            //   let url = window.URL.createObjectURL(resp.data);
            //   // #设置文件类型，这里以excel为例
            //   // blob.type = "application/excel";
            //   // #创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
            //
            //
            //
            let a = document.createElement('a');
            a.href = url;
            a.download = row.filename+'.'+row.filetype;
            a.click();
            //
            // console.log(a)
            //
            // console.log(url);
  
          }).finally(()=>{this.init()})
      },
      read(row){
        let fileDir = row.dirName

        let subPathStr = fileDir.substr(this.absolutePath.length)
        subPathStr = subPathStr.replace(/\\/g,"/")
        let fileName = row.filename +"."+ row.filetype

        // 访问资源位置的url
        let url = 'http://localhost:8080/fileMM/' + subPathStr + "/" + fileName;

        let Base64 = require('js-base64').Base64

        window.open('http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(Base64.encode(url)));
      },
      newfolder(){
          let _this = this
          console.log(this.dirUrl);
          console.log(this.dirUrl + '\\' + this.input);
          let requestObj={
              newDirUrl: this.dirUrl + '\\' + this.input
          }
          axios.post("http://localhost:8080/fileDir/creatDir",requestObj).then(function (resp) {
              console.log(resp);
              if(resp.data===1){
                  _this.addfolder=false
                  _this.input=''
                  // _this.next('')
                  _this.$alert('创建文件夹成功', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                          _this.$message({type: 'info', message:"再见"
                          });
                      }
                  });
                  _this.init()
              }
              else{
                  _this.$alert('创建是失败，文件夹已存在', '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                          _this.$message({type: 'info', message:"再见"
                          });
                      }
                  });
              }
          })
          // this.$http.post(this.$HOST+'v2/newfolder',this.$qs.stringify({
        //   sign:this.$sign,
        //   username:this.username,
        //   path:localStorage.getItem('path'),
        //   fname:this.input
        // })).then(res=>{
        //     if(res.data.code==0){
        //       this.addfolder=false
        //       this.input=''
        //
        //       this.next('')
        //       this.$alert('创建文件夹成功', '提示', {
        //         confirmButtonText: '确定',
        //         callback: action => {
        //           this.$message({
        //             type: 'info',
        //             message:"再见"
        //           });
        //         }
        //       });
        //     }
        //     else{
        //       this.$alert('创建是失败，文件夹已存在', '提示', {
        //         confirmButtonText: '确定',
        //         callback: action => {
        //           this.$message({
        //             type: 'info',
        //             message:"再见"
        //           });
        //         }
        //       });
        //     }
        // })
      },
      next(row)  {
          console.log(row);
          // 如果是文件夾的話
          if(row.filetype === ''){
              //合成新路徑
              let newDirPath = this.dirUrl + '\\' + row.filename
              console.log("newDir--> " + newDirPath)
              this.dirUrl = newDirPath
              //初始化
              this.init()
          }
          // var newpath=localStorage.getItem('path')+name+'/'
        // this.path=newpath
        // this.$http.post(this.$HOST + 'v2/filelist', this.$qs.stringify({
        //   sign: this.$sign,
        //   username:localStorage.getItem('name'),
        //   path:newpath
        //
        // })).then(res => {
        //   localStorage.setItem('path',newpath)
        //   this.tableData=[]
        //   res.data.data.dir.forEach(item => {
        //     if (item.size == '') {
        //       var size = '-'
        //     } else {
        //       if (item.size < 1048576) {
        //         var size = (item.size / 1024).toFixed(2) + 'KB'
        //       } else if (item.size > 1048576 && item.size < 1073741824) {
        //         var size = (item.size / 1024 / 1024).toFixed(2) + 'MB'
        //       } else if (item.size > 1073741824) {
        //         var size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
        //       }
        //     }
        //     this.tableData.push({name: item.name, time: item.mtime, img: item.img, size: size})
        //   })
        //   res.data.data.file.forEach(item => {
        //     if (item.size == '') {
        //       var size = '-'
        //     } else {
        //       if (item.size < 1048576) {
        //         var size = (item.size / 1024).toFixed(2) + 'KB'
        //       } else if (item.size > 1048576 && item.size < 1073741824) {
        //         var size = (item.size / 1024 / 1024).toFixed(2) + 'MB'
        //       } else if (item.size > 1073741824) {
        //         var size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
        //       }
        //     }
        //     this.tableData.push({name: item.name, time: item.mtime, img: item.img, size: size})
        //   })
        // })


      },
      back(){
          let lastIndexOf = this.dirUrl.lastIndexOf('\\')
          console.log(lastIndexOf);
          console.log(this.dirUrl.substring(0, lastIndexOf));
          this.dirUrl = this.dirUrl.substring(0, lastIndexOf);
          this.init()
          // console.log( localStorage.getItem('path').split('/'))
       //  var str=localStorage.getItem('path').split('\\')
       //  str.splice(0,1)
       //  str.splice(str.length-1,1)
       //  str.splice(str.length-1,1)
       //  var backpath='/'
       //  str.forEach(item=>{
       //    backpath+=item+'/'
       //  })
        // this.path=backpath
        // this.$http.post(this.$HOST + 'v2/filelist', this.$qs.stringify({
        //   sign: this.$sign,
        //   username:localStorage.getItem('name'),
        //   path:backpath
        //
        // })).then(res => {
        //   localStorage.setItem('path',backpath)
        //   this.tableData=[]
        //   res.data.data.dir.forEach(item => {
        //     if (item.size == '') {
        //       var size = '-'
        //     } else {
        //       if (item.size < 1048576) {
        //         var size = (item.size / 1024).toFixed(2) + 'KB'
        //       } else if (item.size > 1048576 && item.size < 1073741824) {
        //         var size = (item.size / 1024 / 1024).toFixed(2) + 'MB'
        //       } else if (item.size > 1073741824) {
        //         var size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
        //       }
        //     }
        //     this.tableData.push({name: item.name, time: item.mtime, img: item.img, size: size})
        //   })
        //   res.data.data.file.forEach(item => {
        //     if (item.size == '') {
        //       var size = '-'
        //     } else {
        //       if (item.size < 1048576) {
        //         var size = (item.size / 1024).toFixed(2) + 'KB'
        //       } else if (item.size > 1048576 && item.size < 1073741824) {
        //         var size = (item.size / 1024 / 1024).toFixed(2) + 'MB'
        //       } else if (item.size > 1073741824) {
        //         var size = (item.size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
        //       }
        //     }
        //     this.tableData.push({name: item.name, time: item.mtime, img: item.img, size: size})
        //   })
        // })

      }
      }
    }
</script>
<style scoped>

  .bt {
    max-width: 100%;
    background-color: white;
    height: 40px;
    font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";
    line-height: 30px;
  }
  .nav{
    max-width: 100%;
    background-color: white;
    height: 20px;
    /*font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";*/
    font-size: 8px;
    line-height: 20px;
  }

  .el-table-column {
    max-height: 48px;
    line-height: 48px;
  }

  .el-table {
    max-width: 100%;
    font: 12px/1.5 "Microsoft YaHei", arial, SimSun, "宋体";
  }

  #search {
    width: 315px;
    border-radius: 33px;
    background-color: #f7f7f7;
    float: right;
    text-align: center;
    height: 32px;
    line-height: 32px;

  }

  .search {
    border: none;
    background-color: #f7f7f7;
    height: 30px;
    width: 248px;
  }

  img {
    width: 30px;
    height: 30px;
  }

  a {
    color: #424e67;
    text-decoration: none;
  }

  a:hover {
    color: #09AAFF;
  }
  .el-icon-delete{
    color:#F56C6C;
  }
</style>
