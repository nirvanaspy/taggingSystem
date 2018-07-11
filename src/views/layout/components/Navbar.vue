<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <div class="userNameContainer">
        {{token}}
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="./avatar.jpg">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item style="padding:0 15px">
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item v-if="token === 'admin'" style="padding:0">
            <el-upload class="upload-demo"
                       ref="uploader"
                       action=""
                       :file-list="fileList"
                       :httpRequest="uploadCom"
                       :show-file-list="false"
                       multiple>
              <span style="display:block;padding: 0 15px;width:86px;text-align:left">导入</span>

            </el-upload>

          </el-dropdown-item>
          <!--<el-dropdown-item v-if="token === 'admin'" style="padding:0">
            <span style="display:block;padding: 0 15px;" @click="outputVisible = true">导出</span>
          </el-dropdown-item>-->
          <el-dropdown-item v-if="token === 'admin'" style="padding:0">
            <span style="display:block;padding: 0 15px;" @click="creatUserVisible = true">生成用户</span>
          </el-dropdown-item>
          <el-dropdown-item style="padding:0">
            <span style="display:block;padding: 0 15px;" @click="dialogFormVisible = true">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item style="padding:0">
            <span @click="logout" style="display:block;padding: 0 15px;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dialog title="导出选项" :visible.sync="outputVisible">
          <el-form :rules="exportRules" :model="exportform" ref="exportForm" style="width: 400px; margin-left:50px;">
            <el-form-item label="文件类型" :label-width="formLabelWidth" prop="selected">
              <el-select style="width:300px" v-model="exportform.selected">
                <el-option v-for="item in fileTypeOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="startIndex" :label-width="formLabelWidth" prop="startIndex">
              <el-input v-model="exportform.startIndex" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="endIndex" :label-width="formLabelWidth" prop="endIndex">
              <el-input v-model="exportform.endIndex" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outputVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleOutput">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="批量生成用户" :visible.sync="creatUserVisible">
          <el-form :rules="createUserRules" ref="createUserForm" :model="createUserForm" style="width: 400px; margin-left:50px;">
            <el-form-item label="前缀" :label-width="formLabelWidth" prop="prefix">
              <el-input v-model="createUserForm.prefix" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth" prop="creatNum">
              <el-input v-model="createUserForm.creatNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="isAdmin" :label-width="formLabelWidth">
              <el-select style="width:300px" v-model="createUserForm.isAdminvalue">
                <el-option v-for="item in isAdminOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="creatUserVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleCreat" :loading="createUserLoading">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :rules="changePasswordRules" :model="modifyPasswordForm" ref="modifyUserForm" style="width: 400px; margin-left:50px;">
            <el-form-item label="原密码" :label-width="formLabelWidth" prop="passwordOld">
              <el-input type="password" v-model="modifyPasswordForm.passwordOld" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="passwordNew">
              <el-input type="password" v-model="modifyPasswordForm.passwordNew" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="再次输入" :label-width="formLabelWidth" prop="passwordAgain">
              <el-input type="password" v-model="modifyPasswordForm.passwordAgain" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetChangePswForm('modifyUserForm')">取 消</el-button>
            <el-button type="primary" @click="handleUpdate" :loading="changePasswordLoading">确 定</el-button>
          </div>
        </el-dialog>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { importDocu, outputDocu } from '@/api/tagdocument'
import { createUser, changePassword } from '@/api/user'
import { isvalidInput, isvalidNum, isvalidPassword } from '@/utils/validate'
import { getUserId, getPsw } from '@/utils/auth'
/* import { Loading } from 'element-ui'*/

/* eslint-disable */
export default {
  data() {
    /* const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }*/
    const validPswOld = (rule, value, callback) => {
      if(this.pswOld !== this.modifyPasswordForm.passwordOld) {
        callback(new Error('原密码不正确，请重新输入！'))
      } else {
        callback()
      }
    }
    const validPswNew = (rule, value, callback) => {
      if (!isvalidPassword(value)) {
        callback(new Error('新密码必须是英文字母和数字混合，至少六位'))
      } else {
        callback()
      }
    }
    const validPswAgain = (rule, value, callback) => {
      if(this.modifyPasswordForm.passwordAgain !== this.modifyPasswordForm.passwordNew) {
        callback(new Error('两次密码输入不一致，请再次输入新密码！'))
      } else {
        callback()
      }
    }
    const isvalidSelect = (rule, value, callback) => {
      if (!isvalidInput(value)) {
        callback(new Error('请选择一个分类'))
      } else {
        callback()
      }
    }
    const isvalidPrefix = (rule, value, callback) => {
      if (!isvalidInput(value)) {
        callback(new Error('请输入前缀'))
      } else {
        callback()
      }
    }
    const isvalidNums = (rule, num, callback) => {
      if (!isvalidNum(num)) {
        callback(new Error('请输入一个正整数'))
      } else {
        callback()
      }
    }
    return {
      userId: '',
      outputVisible: false,
      creatUserVisible: false,
      exportform: {
        selected: '',
        startIndex: 0,
        endIndex: 0
      },
      createUserForm: {
        prefix: '',
        creatNum: 0,
        isAdminvalue: false
      },
      modifyPasswordForm: {
        passwordOld: '',
        passwordNew: '',
        passwordAgain: ''
      },
      startIndex:0,
      endIndex:0,
      formLabelWidth: '100px',
      dialogFormVisible: false,
      fileList: [],
      uploadSuccessIndex: 0,
      uploadLength: 0,
      fileTypeOptions: [
        {
          value: 'json',
          label: 'JSON'
        },
        {
          value: 'xml',
          label: 'XML'
        }
      ],
      isAdminOptions: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      prefix: '',
      creatNum: 0,
      value: '',
      isAdminvalue: false,
      loginInfo: {
        username: '',
        password: ''
      },
      exportRules: {
        selected:[{required: true, message: '请选择导出类型', trigger: 'change'}],
        startIndex: [{required: true,trigger: 'blur',validator: isvalidNums}],
        endIndex: [{required: true,trigger: 'blur',validator: isvalidNums}]
      },
      createUserRules: {
        prefix: [{required: true, trigger:'blur', validator: isvalidPrefix}],
        creatNum: [{required: true,trigger:'blur',validator: isvalidNums}],
      },
      changePasswordRules: {
        passwordOld: [{required: true,trigger: 'blur',validator:validPswOld }],
        passwordNew: [{required: true,trigger: 'blur',validator:validPswNew }],
        passwordAgain: [{required: true,trigger: 'blur',validator:validPswAgain }],
      },
      createUserLoading: false,
      changePasswordLoading: false
    }
  },
  created () {
    this.loginInfo.username = this.getCookie('username')
    this.loginInfo.password = this.getCookie('password')
    this.userId = getUserId()
    this.pswOld = getPsw()
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'token'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    resetChangePswForm (formName) {
      this.$refs[formName].resetFields()
      this.dialogFormVisible = false
    },
    uploadCom: function (file) {
      console.log('uploadstart')
      this.uploadSuccessIndex = 0
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      let formData = new FormData();

      console.log("导入组件文件----------");
      console.log(file);

      formData.append('file', file.file);
      this.uploadLength = this.$refs.uploader.uploadFiles.length
      console.log(this.uploadLength)

      importDocu(formData,this.loginInfo).then(() => {
       /* setTimeout(() => {
          loading.close();
        }, 2000);*/
        this.uploadSuccessIndex += 1
        /* console.log(this.uploadSuccessIndex,this.uploadLength)*/
        if(this.uploadSuccessIndex === this.uploadLength) {
          loading.close()
          window.location.reload()
          this.$notify({
            title: '成功',
            message: '导入成功',
            type: 'success',
            duration: 2000
          })
        }
      })
        .catch(err => {
          console.log(err);
        })
    },
    handleOutput () {
      this.$refs.exportForm.validate(valid => {
        if(valid) {
          let configData = {
            type: this.exportform.selected,
            startIndex: this.exportform.startIndex,
            endIndex: this.exportform.endIndex
          }
          outputDocu(configData,this.loginInfo).then()
          let exportLink = process.env.BASE_API + '/documents/export' + '?type='+ this.exportform.selected + '&startindex=' + this.exportform.startIndex + '&endindex=' + this.exportform.endIndex
          window.open(exportLink)
          this.exportform.selected = ''
          this.exportform.startIndex = 0
          this.exportform.endIndex = 0
          this.outputVisible = false
        }
      })
    },
    handleCreat () {
      this.$refs.createUserForm.validate(valid => {
        if(valid) {
          this.createUserLoading = true
          let createUserData = {
            prefix: this.createUserForm.prefix,
            num: this.createUserForm.creatNum,
            isAdmin: this.createUserForm.isAdminvalue
          }
          createUser(createUserData, this.loginInfo).then((res) => {
            console.log(res.data.data)
            this.createUserForm.prefix = ''
            this.createUserForm.creatNum = 0
            this.createUserForm.isAdminvalue = false
            this.createUserLoading = false
            createUserData = {}
            this.creatUserVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.createUserLoading = false
          })
        }
      })
    },
    logout() {
      /* this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })*/
      this.$store.dispatch('FedLogOut').then(() => {
        this.$router.replace({ path: '/login' })
      })
    },
    handleUpdate() {
      this.$refs.modifyUserForm.validate(valid => {
        if(valid) {
          this.changePasswordLoading = true
          changePassword(this.userId,this.modifyPasswordForm.passwordNew, this.loginInfo).then(() => {
            /*console.log('changeSuccess')*/
            this.changePasswordLoading = false
            this.$notify({
              title: '成功',
              message: '密码修改成功，请重新登录！',
              type: 'success',
              duration: 2000
            })
            this.$store.dispatch('FedLogOut').then(() => {
              this.$router.replace({ path: '/login' })
            })
          }).catch(() => {
            this.changePasswordLoading = false
          })
        }
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .userNameContainer {
    position:absolute;
    display:inline-block;
    right: 75px;
    width:60px;
    text-align: center;
    font-size: 14px;
    color: #97a8be;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

