<template>
<div style="
height: 610px">
    <script id="editor" type="text/plain"></script>
    <div name="option" style="width: 400px;height: 610px;float: left">
      <el-table
          :data="tableData"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          style="width: 400px">
        <el-table-column
            prop="noteId"
            label="文档名"
            width="100px">
        </el-table-column>
        <el-table-column
            prop="noteName"
            label="分类"
            width="100px">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)"  v-show="false">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageIndex"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size=pagination.pageSize
          layout="total, prev, pager, next"
          :total=pagination.total>
      </el-pagination>


    </div>
    <div name="fuwenben" style="width: 980px;float: left;margin-left: 20px">
      <el-button type="primary" @click="drawer = true" style="margin-bottom: 20px">内容预览</el-button>
      <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :direction="direction"
          >
        <span v-model="row.txt">
          {{row.txt}}

        </span>
      </el-drawer>
      <el-card style="height: 610px;">
        <quill-editor v-model="this.row.txt" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
        </quill-editor>
      </el-card>
    </div>
</div>
</template>
<script>
import {
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  mounted: function () {
    this.init()
  },

  name:'UE',
  components: {
    quillEditor
  },

  data() {
    return {
      dialogFormEdit: false,
      dialogFormAdd:false,
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },


      row:{
        noteId:'',
        noteName:'',


      },
      tableData: [
        // {
        //   id:'',
        //   name:'',
        //   class:'',
        //   txt:'',
        // }
      ],
      drawer: false,
      direction: 'rtl',
      content: null,
      editorOption: {},
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  // mounted() {
  //   const _this = this;
  //   this.editor = UE.getEditor('editor', this.config); // 初始化UE
  //   this.editor.addListener("ready", function () {
  //     _this.editor.setContent(_this.defaultMsg) // 确保UE加载完成后，放入内容。
  //   });
  // },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.pageSize = val;
      this.pagination.pageIndex = 1;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.pageIndex = val;
      this.init();
    },


    init () {
      var _this= this
      console.log("init");
      this.$axios({
        method:'get',
        url:'/api/Note/test/1',
        // data:{"page":this.pagination.pageIndex,"limit":this.pagination.pageSize, "pid": this.row.id},

        headers:{
          'Content-Type':'application/json;charset=utf-8'
        }
      }).then(res => {
        console.log(res);

       // _this.pagination.total = res.data.datas.data.total;
        console.log(_this.pagination.total);

        console.log(res.data)
         // _this.tableData.push(res.data) ;
         _this.tableData=res.data ;

        console.log(_this.tableData);
        let demoTableDate ={
          "id": "",
          "name": "",
          "class": "",
          "txt": "",
          "children": [
            {
              "id": "",
              "name": "",
              "class": ""
            }
          ]
        }

      })
          .catch(function (error) {
            console.log(error)
          })
    },


    handleClick(row) {

      this.row=row;
      console.log(row.txt);
    },
    getUEContent() { // 获取内容方法
      return this.editor.getContent()
    }
  },
  destroyed() {
    this.editor.destroy()
  }
}

</script>

