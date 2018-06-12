<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="searchQuery">
      </el-input>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :key='tableKey' :data="listA" v-loading="listLoading" element-loading-text="数据加载中" border fit highlight-current-row
              :default-sort = "{prop: 'markFinishedNum', order: 'descending'}"
              style="width: 100%"
    >

      <el-table-column label="用户名" min-width="100" prop="username" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.userEntity.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请标注数" prop="markNum" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.markNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成标注数" prop="markFinishedNum" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.markFinishedNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请审阅数" prop="reviewNum" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.reviewNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成审阅数" prop="reviewFinishedNum" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.reviewFinishedNum}}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
    import waves from '@/directive/waves' // 水波纹指令
    import { getProgress } from '../../api/progress'
    /*eslint-disable*/
    export default {
      name: 'progressDetail',
      directives: {
        waves
      },
      data() {
        return {
          tableKey: 0,
          searchQuery: '',
          listLoading: true,
          loginInfo: {
            username: '',
            password: ''
          },
          list: []
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
          getProgress(this.loginInfo).then((res) => {
            this.listLoading = false
            this.list = res.data.data
            console.log('progressSucess')
          })
        },
        handleFilter() {
          this.listQuery.page = 1
          // this.getList()
        }
      },
      computed: {
        listA: function() {
          const self = this
          return self.list.filter(function (item) {
            /* console.log(item)*/
            return item.userEntity.username.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
          })

        }
      }
    }
</script>

<style scoped>

</style>
