<template>
<div style="
height: 610px;margin-top: 50px">
    <script id="editor" type="text/plain"></script>
    <div name="option" style="width: 400px;height: 610px;float: left">
      <el-table
          :data="tableData"
          row-key="noteId"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          style="width: 400px">
        <el-table-column
            prop="noteId"
            label="文档名"
            >
        </el-table-column>
        <el-table-column
            prop="noteName"
            label="分类"
           >
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
           >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)"  v-show="true">编辑</el-button>
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
        <span v-model="dContent" >
          {{dContent}}

        </span>
      </el-drawer>
      <el-card style="height: 610px;">
        <quill-editor v-model="dContent" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
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
     dContent:'',//富文本的内容

      row:{
        noteId:'0',
        noteName:'0',


      },
      tableData: [],//表格内容

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

  methods: {
    init () {
      var _this= this
      console.log("init");
      this.axios.get("http://42.192.150.158:8080/Note/getSonLists/"+_this.$store.state.parent).then(
          function (resp) {
            let demoT ={

                  noteId: '',
                  children: [

                  ]

          };
            // _this.tableData.children.push(resp.data);
            demoT.noteId=_this.$store.state.parent
            console.log(_this.$store.state.parent)
            let sonList =  resp.data;
                for (let j = 0; j < sonList.length ; j++) {
                  //初始化对象son
                   let son = {
                    "noteId":"",
                    "noteName":"",
                  }
                  son.noteId = sonList[j].noteId
                  son.noteName = sonList[j].noteName
                  //赋值以后添加数据
                  demoT.children.push(son)
                }
                _this.tableData.push(demoT);
          }
      )

    },
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



    handleClick(row) {

      this.row=row;
      this.dContent=row.noteName;
    },
    getUEContent() { // 获取内容方法
      return this.editor.getContent()
    }
  },

}

</script>

