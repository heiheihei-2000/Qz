<template>
<div>
  <div>
    <el-button  @click="dialogVisible = true">新增</el-button>
    <el-dialog
        title="新增分类"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <el-form :model="find" status-icon  ref="user"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="编号" prop="id">
          <el-input v-model="find.id"></el-input>
        </el-form-item>
        <el-form-item label="sort" prop="sort">
          <el-input  v-model="find.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="子分类名" prop="name">
          <el-input  v-model="find.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  label="父分类" >
          <el-select  v-model="find.parent" @change="changezhou" >
            <el-option   v-for="item in tableData" :key="item.id" :value="item" :label="find.parent.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
  <el-table
      :data="tableData"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
    <el-table-column
        prop="name"
        label="名称"
       >
    </el-table-column>
    <el-table-column
        prop="id"
        label="顺序"
        >
    </el-table-column>
    <el-table-column

        label="Action"
        >
      <template slot-scope="scope">

      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>



export default {

  name: "fenlei",
  mounted: function () {
    this.init()
  },
  data() {
    return {
      dialogVisible :false,
    find:{
        id: "",
        parentName: "",//
        name: "",
        sort: "",
        parent:{}
    },
      realfind:{
        id: "",
        parent: "",
        name: "",
        sort: ""
      },

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
  methods:{

    changezhou(val){
      // const _this=this;
      // let obj=null
      // obj=this.tableData.find((item)=>{
      //   return item.id === val
      // })
      // this.id=val.id
      // console.log();


    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {
      console.log(this.find);
    },
    /**
     * 空校验 null或""都返回true
     */
     isEmpty (obj) {
      if ((typeof obj === 'string')) {
        return !obj || obj.replace(/\s+/g, "") === ""
      } else {
        return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
      }
    },

    /**
     * 非空校验
     */
    isNotEmpty (obj) {
      return !this.isEmpty(obj);
    },

    /**
     * 对象复制
     * @param obj
     */
    copy (obj) {
      if (this.isNotEmpty(obj)) {
        return JSON.parse(JSON.stringify(obj));
      }
    },

    /**
     * 使用递归将数组转为树形结构
     * 父ID属性为parent
     */
    array2Tree (array, parentId) {


      const result = [];
      for (let i = 0; i < array.length; i++) {
        const c = array[i];
        // console.log(Number(c.parent), Number(parentId));
        if (Number(c.parent) === Number(parentId)) {
          result.push(c);

          // 递归查看当前节点对应的子节点
          const children = this.array2Tree(array, c.id);
          if (this.isNotEmpty(children)) {
            c.children = children;
          }
        }
      }
      return result;
    },

    /**
     * 随机生成[len]长度的[radix]进制数
     * @param len
     * @param radix 默认62
     * @returns {string}
     */
     uuid (len, radix = 62) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      const uuid = [];
      radix = radix || chars.length;

      for (let i = 0; i < len; i++) {
        uuid[i] = chars[0 | Math.random() * radix];
      }

      return uuid.join('');
    },
    init(){
     const _this=this
      this.axios.get(" http://localhost:3000/fenlei").then(
          function (resp) {
            const data = resp.data;

            console.log("原始数组：", resp.data.content);
            _this.tableData = _this.array2Tree(resp.data, 0);
            console.log("树形结构：", _this.tableData);
            _this.$store.state.find=_this.tableData;
            let ke=[

            ];
            // for(let i=0;i<_this.tableData.length;i++){
            //
            //   ke[i].
            // }
          }
      )
    }
  }
}
</script>


<style scoped>

</style>