
<template>
<div style="" id="head" >
<el-menu
    router
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
  <div class="logo"
       style="
    padding-left: 30px;
    padding-top: 20px;
    padding-right: 50px;
    height: 40px;
    "
  >QuizPass</div>
  <el-menu-item  index="/shouye"> 首页</el-menu-item>
  <el-submenu  index="2" v-show="checkLogin">
    <template slot="title">wiki知识库</template>
    <el-menu-item index="/uemain">我的文档</el-menu-item>
    <el-menu-item index="/fenlei">分类管理</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="/kaodian2" v-show="checkLogin">考点精炼</el-menu-item>
  <el-menu-item index="/todolist" v-show="checkLogin">待办事项</el-menu-item>
  <div style="text-align: center">
        <el-button style="float: right;margin-top: 10px;margin-right: 10px" v-show="checkLogin" @click="logout()">退出登陆</el-button>
  </div>
  <div name="button" style="float: right ;padding-top: 10px">
 <el-row>
    <el-button v-show="!checkLogin" :plain="true" @click="dialogVisible2 = true">登陆</el-button>
    <el-button v-show="!checkLogin" @click="dialogVisible = true">注册</el-button>
 </el-row>
    <el-dialog
        title="用户注册"
        :visible.sync="dialogVisible"
        width="30%"
        >
      <el-form :model="user" status-icon  ref="user" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="id">
          <el-input v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="user.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
        title="用户登陆"
        :visible.sync="dialogVisible2"
        width="30%"
      >
      <span>
        <el-form :model="login" status-icon  ref="login" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="id">
         <el-input v-model.number="login.id"></el-input>
         </el-form-item>
        <el-form-item label="密码" prop="pass">
         <el-input type="password" v-model="login.pass" autocomplete="off"></el-input>
         </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="userlogin()">提交</el-button>
    <el-button @click="resetForm('login')">重置</el-button>
  </el-form-item>
</el-form>
      </span>

    </el-dialog>

  </div>


</el-menu>

</div>

</template>
<script>
export default {
  data() {
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value.length < 6) {
            callback(new Error('必须超过六位'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.user.checkPass !== '') {
         this.$refs.user.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.user.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      checkLogin: '',
      tureId:'',
      turePass:'',
      login:{
        id: '',
        pass: '',

      },
      user: {
        pass: '',
        checkPass: '',
        name: '',
        id: '',

      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        id: [
          { validator: checkId, trigger: 'blur' }
        ]
      },

      dialogVisible: false,
      dialogVisible2:false,

      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    findall(a,x){
  var results=[],
      len=a.length,
      pos=0;
  while(pos<len){
    pos=a.indexOf(x,pos);
    if(pos===-1){//未找到就退出循环完成搜索
      break;
    }
    results.push(pos);//找到就存储索引
    pos+=1;//并从下个位置开始搜索
  }
  return results;
},
    logout(){
      const  _this=this;
      this.$confirm('确定要退出么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出登陆!'
        }
        );
        _this.checkLogin='';
        _this.login.id='';
        _this.login.pass='';
         _this.$router.push("/");
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    userlogin(){
     const _this=this;
     let uid=[]


      this.axios.get("http://localhost:3000/user/").then(function (resp){
        for (let i=0;i<resp.data.length;i++){
          uid[i]=resp.data[i].id;
          console.log(resp.data)
          console.log(uid)
        }
        let inOf=_this.findall(uid,_this.login.id.toString());
        console.log(_this.login.id.toString());
        console.log(inOf);
       console.log(resp.data[inOf].pass)
        let a=parseInt( resp.data[inOf].pass);
       let b=parseInt(_this.login.pass);
        if(inOf[0]>0){
          if( a==b){
            _this.$message({
              message: '恭喜你，登陆成功',
              type: 'success',

            });
            _this.checkLogin=1;
            _this.dialogVisible2 = false
          }else{
            _this.$message({
              message: '密码错误',
              type: 'warning'
            });
          }


              }else {
          _this.$message({
            message: '用户名不存在',
            type: 'warning'
          });
        }
      })






      // this.axios.get("http://localhost:3000/user/"+_this.login.id).then(function (resp){
      //   console.log(resp.data)
      //  if(resp.data=null){
      //    _this.$message({
      //      message: '用户名不存在',
      //      type: 'warning'
      //    });
      //  }else  if (resp.data.pass==_this.login.pass){
      //    _this.$message({
      //      message: '恭喜你，登陆成功',
      //      type: 'success'
      //    });
      //    _this.checkLogin=1;
      //    _this.dialogVisible2 = false
      //
      //  }else {
      //    _this.$message({
      //      message: '密码错误',
      //      type: 'warning'
      //    });
      //  }
      // })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {

       const _this=this;
      var userId=[];
      this.axios.get("http://localhost:3000/user").then(function (resp){
      for( var i=0;i<resp.data.length;i++){
        userId[i]=resp.data[i].id;
      };
       if(userId.indexOf(_this.user.id)<0){
         _this.axios.post("http://localhost:3000/user",{
           pass: _this.user.pass,
           name: _this.user.name,
           id:_this.user.id,
         });
         _this.$alert("您的账号："+_this.user.id+'    '
             +"已经成功注册" ,{
           confirmButtonText: '确定',

         });
       }else{
         _this.$alert("您的输入的账号："+_this.user.id+'    '
             +"已经被注册" ,{
           confirmButtonText: '确定',

         });
       }


      })


      // this.axios.post("http://localhost:3000/user", {
      //   pass: this.user.pass,
      //   checkPass: this.user.checkPass,
      //   age: this.user.age,
      //   id: this.user.id,
      // })

    },



    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }

  }
}
</script>
<style>
.logo {
  width: 120px;
  height: 31px;
  /*background: rgba(255, 255, 255, 0.2);*/
  /*margin: 16px 28px 16px 0;*/
  float: left;
  color: white;
  font-size: 18px;
}
element.style {
  width: 1300px;
  padding: 0px;
  margin: 0px;
}
section .el-header{

  padding: 0px;
}
</style>
