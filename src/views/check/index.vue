<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="标题" v-model="searchQuery">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>

      <el-button class="filter-item pull-right" style="float: right;margin-left: 10px;" @click="handleApply" type="primary"
                 icon="el-icon-plus">申请审阅
      </el-button>
    </div>

    <el-table :key='tableKey' :data="listA" v-loading="listLoading" element-loading-text="请先申请审阅" border fit highlight-current-row
              style="width: 100%">

      <el-table-column label="标题" min-width="100">
        <template slot-scope="scope">
          <router-link class="titleHover" :to='{name:"Review",params:{id:scope.row.id}}'>{{scope.row.title}}</router-link>
          <!--<span>{{scope.row.title}}</span>-->
        </template>
      </el-table-column>
      <el-table-column width="150px" label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="150px" label="审阅" prop="reviewed"
                       :filters="[{ text: '已审阅', value: true }, { text: '未审阅', value: false }]"
                       :filter-method="filterTag"
      >-->
      <el-table-column width="150px" label="审阅" prop="reviewed">
        <template slot-scope="scope">
          <span class="el-tag el-tag--success" v-if="scope.row.reviewed">已审阅</span>
          <span class="el-tag el-tag--danger" v-else>未审阅</span>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20,50,100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
      background
      style="text-align: center;margin-top:20px"
    >
    </el-pagination>
    <el-dialog title="申请审阅" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="dataForm" :rules="applyRules" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="选择标注者">
          <el-select v-model="userId"
                     @change="changeSelectUser($event)"
                     filterable
          >
            <el-option
              v-for="item in userList"
              :key="item.id"
              :label="item.username"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请数量: " prop="num">
          <el-input v-model="temp.num" style="width: 200px"></el-input>
          <div style="color:red;">{{this.errorMessage}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="applyLoading" @click="ApplyCheck">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { documentListReview, distributionReviewDoc, disReviewDocByUser } from '@/api/reviewDocument.js'
  import { getUsers } from '@/api/user.js'
  import waves from '@/directive/waves' // 水波纹指令
  import { isvalidNum } from '@/utils/validate'
  /* eslint-disable */
  export default {
    name: 'document',
    directives: {
      waves
    },
    data() {
      const isvalidNums = (rule, num, callback) => {
        if (!isvalidNum(num)) {
          callback(new Error('请输入一个正整数'))
        } else if(num > 100){
          callback(new Error('一次最多选择100篇'))
        } else {
          callback()
        }
      }
      return {
        tableKey: 0,
        list: [],
        userList: [],
        userId: '',
        listLoading: true,
        listQuery: {
          page: 0,
          size:20,
          limit: 5,
          tagname: ''
        },
        sortable: null,
        oldList: [],
        newList: [],
        searchQuery: '',
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create: '申请审阅'
        },
        temp: {
          id: '',
          num: ''
        },
        applyRules: {
          num: [{required: true,trigger: 'blur',validator: isvalidNums}]
        },
        loginInfo: {
          username: '',
          password: ''
        },
        errorMessage: null,
        total:0,//默认数据总数
        pagesize:10,//每页的数据条数
        currentPage:1,//默认开始页面
        applyLoading: false
      }
    },
    created() {
      this.loginInfo.username = this.getCookie('username')
      this.loginInfo.password = this.getCookie('password')
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        documentListReview(this.listQuery,this.loginInfo).then(response => {
          this.list = response.data.data.content
          this.total = response.data.data.totalElements
          this.listLoading = false
          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice()
        })
      },
      filterTag(value, row) {
        return row.reviewed === value;
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        this.pagesize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val - 1
        this.currentPage = val
        this.getList()
      },
      resetTemp() {
        this.temp = {
          id: '',
          num: ''
        }
      },
      handleApply() {
        this.userId = ''
        getUsers(this.loginInfo).then((res) => {
          this.userList = res.data.data
        })
        this.resetTemp();
        this.dialogStatus = 'create'
        this.errorMessage = ''
        this.dialogFormVisible = true

        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
          // this.getList()
        })
      },
      changeSelectUser (id) {
        this.userId = id
        this.errorMessage = ''
      },
      ApplyCheck() {
        let that = this
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$confirm('是否确认申请审阅的数量？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.applyLoading = true
              let formData = new FormData();
              formData.append('num', this.temp.num);
              formData.append('userId', this.userId)
              //console.log(formData);
              if (this.userId.length == 0) {
                distributionReviewDoc(formData, this.loginInfo).then(response => {
                  this.list = response.data.data;
                  this.applyLoading = false
                  //console.log(response.data)
                  console.log(response.data.data)
                  //this.list.unshift(this.temp)
                  this.dialogFormVisible = false
                  this.listLoading = false
                  this.$notify({
                    title: '成功',
                    message: '申请成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                }).catch((error) => {
                  this.applyLoading = false
                  if(error.response.data.status === 500){
                    this.errorMessage = error.response.data.message
                  }else{
                    this.errorMessage = '请输入正确的数量'
                    console.log('error')
                  }
                })
              } else {
                disReviewDocByUser(formData, this.loginInfo).then(response => {
                  this.list = response.data.data;
                  this.applyLoading = false
                  //console.log(response.data)
                  console.log(response.data.data)
                  //this.list.unshift(this.temp)
                  this.dialogFormVisible = false
                  this.listLoading = false
                  this.$notify({
                    title: '成功',
                    message: '申请成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                }).catch((error) => {
                  this.applyLoading = false
                  if(error.response.data.status === 500){
                    this.errorMessage = error.response.data.message
                  }else{
                    this.errorMessage = '请输入正确的数量'
                    // console.log('error')
                  }
                })
              }
            })
          }
        })
      },
      handleFilter() {
        this.listQuery.page = 1;
        // this.getList()
      }
    },
    computed: {
      listA: function () {
        let self = this;
        return self.list.filter(function (item) {
          /* console.log(item)*/
          return item.title.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>

<style scoped>
  .titleHover:hover {
    background: rgba(31, 26, 233, 0.34);
  }
  .paginationContainer {
    text-align: center;
    padding: 20px 10px;
  }
</style>
