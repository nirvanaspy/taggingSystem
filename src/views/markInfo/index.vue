<template>
  <div>
    <div class="app-container calendar-list-container">
      <el-select v-model="value"
                 @change="changeMarkType($event)"
                 style="width:208px;margin-bottom:10px;"
                 placeholder="请选择完成阶段">
        <el-option
          v-for="item in paramData"
          :key="item.id"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-select>
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="数据加载中" border fit highlight-current-row
                style="width: 100%"
      >

       <!-- <el-table-column label="完成阶段" min-width="100" prop="username">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="事实型问题" prop="markNum">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.factNum*1000)/10}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="列表型问题" prop="markFinishedNum">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.listNum*1000)/10}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="数值型问题" prop="reviewNum">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.numNum*1000)/10}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="定义型问题" prop="reviewFinishedNum">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.defineNum*1000)/10}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="观点型问题" prop="reviewFinishedNum">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.pointNum*1000)/10}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="篇章型问题" prop="reviewFinishedNum">
          <template slot-scope="scope">
            <span>{{Math.round(scope.row.articleNum*1000)/10}}%</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    import { getMarkTypeInfo } from '@/api/progress'
    /*eslint-disable*/
    export default {
      name: 'markInfo',
      data() {
        return {
          value: '',
          tableKey: 0,
          listLoading: false,
          loginInfo: {
            username: '',
            password: ''
          },
          paramSelect: null,
          list: [],
          authRole: '',
          paramData: [
            {
              id: 0,
              title: '已标注'
            },
            {
              id: 1,
              title: '已审阅'
            },
            {
              id: 2,
              title: '已通过'
            }
          ]
        }
      },
      created() {
        this.authRole = this.$store.getters.userAuth
        this.userId = this.getCookie('userId')
        this.loginInfo.username = this.getCookie('username')
        this.loginInfo.password = this.getCookie('password')
      },
      methods: {
        getList(param) {
          getMarkTypeInfo(this.loginInfo, param).then((res) => {
            this.listLoading = false
            this.list = [res.data.data]
          })

        },
        changeMarkType(val) {
          this.paramSelect = val
          this.listLoading = true
          let params
          if (val === 0) {
            params = {
              isMarked: true,
              isReviewed: false,
              isAccepted: false
            }
          } else if (val === 1) {
            params = {
              isMarked: true,
              isReviewed: true,
              isAccepted: false
            }
          } else if (val === 2) {
            params = {
              isMarked: true,
              isReviewed: true,
              isAccepted: true
            }
          }
          this.getList(params)
        }
      }
    }
</script>

<style scoped>

</style>
