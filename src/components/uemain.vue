<template>
<div style="padding: 10px;margin-top: 30px;margin-left: 50px;margin-right: 50px">
  <el-table

      :data="tableData"
      border

     >
    <el-table-column
        fixed
        prop="id"
        label="编号"
       >
    </el-table-column>
    <el-table-column
        prop="name"
        label="文档名"
        >
    </el-table-column>
    <el-table-column
        prop="class"
        label="分类"
       >
    </el-table-column>
<!--    <el-table-column-->
<!--        prop="readnum"-->
<!--        label="阅读量"-->
<!--       >-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--        prop="good"-->
<!--        label="点赞量"-->
<!--        >-->
<!--    </el-table-column>-->

    <el-table-column

        label="操作"
       >
      <template slot-scope="scope" >
        <router-link to="/ue">
          <el-button
              size="max"
              @click="handleClick( scope.row)">编辑</el-button>
        </router-link>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  mounted: function () {
    this.init()
  },
  name: "ue0",
  data() {
    return {
      note: [
        {
          parent: {
            noteId: '',
            noteName: "",
            path: "",
            uId: ''
          },
          children: []
        }
      ],
      tableData: [
      ]
    }
  },
  methods: {
    init() {
      var _this = this
      console.log("init");
      this.$axios({
        method: 'get',
        url: 'http://42.192.150.158:8080/Note/test/1',
        // data:{"page":this.pagination.pageIndex,"limit":this.pagination.pageSize, "pid": this.row.id},

        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let demoTableDate = {
            "id": "",
            "name": "",
            "class": "",
            "txt": "",
            // "children": []
          };
          // 抽取数组中的一个对象
          let obj = res.data[i];
          // 对象的属性，返回的是一个属性列表
          let keys = Object.keys(obj)
          // 父节点对象
          let Note = obj[keys[0]]
          demoTableDate.id = Note.noteId
          demoTableDate.name = Note.noteName
          console.log(Note);
          _this.tableData.push(demoTableDate)

        }
        console.log(_this.tableData);
        console.log("88888");
      })
          .catch(function (error) {
            console.log(error)
          })
    },
    handleClick(row) {
      console.log(row);
      const _this = this;
      console.log(row.id);
      this.$store.state.parent=row.id;
      //   axios.get("http://42.192.150.158:8080/Note/test/1")
      // .then(function (resp){
      //   console.log(resp.data)
      // })
      // }
    },
    mounted: function () {
      this.init()
    },

  }
}

</script>

<style scoped>

</style>