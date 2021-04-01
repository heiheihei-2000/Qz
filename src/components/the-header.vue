
<template>
<div style="width: 1450px">


<el-menu
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
    "
  >QuizPass</div>

<el-menu-item index="1">处理中心</el-menu-item>

<el-menu-item index="3" disabled>消息中心</el-menu-item>
<el-menu-item index="4" v-show="user.id">文件管理</el-menu-item>

  <div style="text-align: center">
    <el-popconfirm
        confirmButtonText='好的'
        cancelButtonText='不用了'
        icon="el-icon-info"
        iconColor="red"
        title="确定退出？"
    >

      <template #reference >
        <el-button style="float: right;margin-top: 10px;margin-right: 10px" v-show="user.id">退出登陆</el-button>
      </template>

    </el-popconfirm>

  </div>
  <div name="button" style="float: right ;padding-top: 10px">
 <el-row>
    <el-button v-show="!user.id" @click="">登陆</el-button>
    <el-button v-show="!user.id" @click="dialogVisible = true">注册</el-button>
 </el-row>
    <el-dialog
        title="用户注册"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>


</el-menu>





</div>

</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
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
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {

        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]

      },

      dialogVisible: false,
      user:{
          id:'1',
        name:'成龙',
        passwor:''
      },
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
    _al(){
      console.log('111');
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
}

</style>
