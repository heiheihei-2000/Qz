
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
    padding-top: 17px;
    padding-right: 50px;
    height: 40px;
    "
  >QuizPass</div>
  <el-menu-item  index="/shouye"> 首页</el-menu-item>
  <el-submenu  index="2" v-show="checkLogin" >
    <template slot="title">wiki知识库</template>
    <el-menu-item index="/uemain"  >我的文档</el-menu-item>
    <el-menu-item index="/fenlei">分类管理</el-menu-item>
  </el-submenu>
  <el-menu-item index="/kaodian" v-show="checkLogin">考点精炼</el-menu-item>
  <el-menu-item index="/todolist" v-show="checkLogin">待办事项</el-menu-item>
  <el-menu-item index="/Home" v-show="checkLogin">网盘</el-menu-item>
  <el-menu-item index="/shequ" v-show="checkLogin">社区</el-menu-item>
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
      <el-form :model="user" status-icon  ref="user"  label-width="100px" class="demo-ruleForm">
        <el-form-item label="编号" prop="id">
          <el-input v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="account">
          <el-input type="password" v-model="user.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
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
          <el-form-item label="账号" prop="account">
         <el-input v-model.number="login.account"></el-input>
         </el-form-item>
        <el-form-item label="密码" prop="password">
         <el-input type="password" v-model="login.password" autocomplete="off"></el-input>
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
import qs from 'qs'
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
      user:{
        id:'',
        name:'',
        account:'',
        password:'',
        permissions:'1'
      },
      checkLogin: '',
      tureId:'',
      turePass:'',
      login:{
        account:'',
        password:''
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
        _this.$store.commit("setUserId",'')
        _this.$store.commit("setAccount",'')
        axios.get("http://42.192.150.158:8080/user/doLogout/").then((resp)=>{
          console.log(resp);
        })
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    userlogin(){
     let _this=this;

     console.log(this.login)
     let a=qs.stringify(_this.login);
     this.axios.post('http://42.192.150.158:8080/user/login/',a
     ).then(function (resp){
       console.log(resp);
       console.log(resp.data);
       if(resp.data.length==0){
         _this.$message({
                     message: '账号或密码错误',
                    type: 'warning'
                   });
       }else{
         _this.$message({
           message: '登陆成功',
           type: 'success'
         });
         console.log("------------------------------------------")
         console.log(resp.data);
         _this.checkLogin=1;
         _this.dialogVisible2 = false
         _this.$store.commit("setUserId",resp.data.id)
         _this.$store.commit("setAccount",resp.data.account)
         
         
         console.log(_this.$store.state.userId)
         console.log(_this.$store.state.account)
         
       }
     })
     // this.axios({
     //   method:'post',
     //   url:'http://42.192.150.158:8080/user/login/',
     //   data:{
     //     "account":_this.login.account,
     //     "password":_this.login.password
     //   },
     //   headers:{'Content-Type':'application/x-www-form-urlencoded'}
     //
     // }).then(
     //     function (resp){
     //
     //     }
     // )

     // let uid=[]
     //  this.axios.get("http://localhost:3000/user/").then(function (resp){
     //    for (let i=0;i<resp.data.length;i++){
     //      uid[i]=resp.data[i].id;
     //      console.log(resp.data)
     //      console.log(uid)
     //    }
     //    let inOf=_this.findall(uid,_this.login.id.toString());
     //    console.log(_this.login.id.toString());
     //    console.log(inOf);
     //   console.log(resp.data[inOf].pass)
     //    let a=parseInt( resp.data[inOf].pass);
     //   let b=parseInt(_this.login.pass);
     //    if(inOf[0]>0){
     //      if( a==b){
     //        _this.$message({
     //          message: '恭喜你，登陆成功',
     //          type: 'success',
     //
     //        });
     //        _this.checkLogin=1;
     //        _this.dialogVisible2 = false
     //      }else{
     //        _this.$message({
     //          message: '密码错误',
     //          type: 'warning'
     //        });
     //      }
     //
     //
     //          }else {
     //      _this.$message({
     //        message: '用户名不存在',
     //        type: 'warning'
     //      });
     //    }
     //  })

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm() {

       const _this=this;

           let b=qs.stringify(_this.user);
           console.log(_this.user)
           this.axios.post("http://42.192.150.158:8080/user/register/",_this.user).then(function (resp){
             console.log(resp);
             if(resp.data.length==0){
               _this.$message({
                 message: '注册失败',
                 type: 'warning'
               });
             }else{
               _this.$message({
                 message: '注册成功',
                 type: 'success'
               });
               _this.dialogVisible = false
               let requestObj={
                 // absolutePath 修改根路径
                 newDirUrl:  "/usr/local/CODE/rushBBB/wiki/"+_this.user.account
               }
               axios.post("http://42.192.150.158:8080/fileDir/creatDir",requestObj).then(function (resp) {
                 console.log(resp);
                 if (resp.data === 1) {
                   // _this.next('')
                   _this.$alert('服务器初始化成功', '提示', {confirmButtonText: '确定'});
                 }
               })
             }
           })
      // var userId=[];
      // this.axios.post("http://42.192.150.158:8080/user/",).then(function (resp){
      // for( var i=0;i<resp.data.length;i++){
      //   userId[i]=resp.data[i].id;
      // };
      //  if(userId.indexOf(_this.user.id)<0){
      //    _this.axios.post("http://localhost:3000/user",{
      //      pass: _this.user.pass,
      //      name: _this.user.name,
      //      id:_this.user.id,
      //    });
      //    _this.$alert("您的账号："+_this.user.id+'    '
      //        +"已经成功注册" ,{
      //      confirmButtonText: '确定',
      //
      //    });
      //  }else{
      //    _this.$alert("您的输入的账号："+_this.user.id+'    '
      //        +"已经被注册" ,{
      //      confirmButtonText: '确定',
      //
      //    });
      //  }
      //
      //
      // })


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
.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background-color: rgba(0,0,0,0);
}
</style>
