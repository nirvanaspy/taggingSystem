<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-computer">
          <svg-icon icon-class="documentation" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">文章总数</div>
          <count-to class="card-panel-num" :autoplay= autoplayFlag :startVal="0" :endVal="list.all" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!--<router-link to="/document/index">-->
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-components1">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">已标注</div>
            <count-to class="card-panel-num" :autoplay= autoplayFlag :startVal="0" :endVal="list.marked" :duration="2600"></count-to>
          </div>
        </div>
      <!--</router-link>-->
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!--<router-link to="/check/index">-->
        <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-computer">
            <svg-icon icon-class="example" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">已审阅</div>
            <count-to class="card-panel-num" :autoplay= autoplayFlag :startVal="0" :endVal="list.reviewed" :duration="2600"></count-to>
          </div>
        </div>
      <!--</router-link>-->
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <!--<router-link to="/recheckByAdmin/index">-->
        <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-computer">
            <svg-icon icon-class="conflict1" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">待复审</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="recheckLength" :duration="2600"></count-to>
          </div>
        </div>
      <!--</router-link>-->
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { countList, conflictList } from '@/api/dashboard'
import { getReviewedDoc } from '@/api/recheckByAdmin'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      autoplayFlag: false,
      tableKey: 0,
      list: [],
      conflictLength: 0,
      recheckLength: 0,
      conflicts: [],
      recheckList: [],
      userData: {
        username: '',
        password: ''
      },
      listQuery: {
        page: 0,
        size: 20,
        limit: 5,
        tagname: ''
      }
    }
  },
  created() {
    this.userData.username = this.getCookie('username')
    this.userData.password = this.getCookie('password')
    this.autoplayFlag = false
    this.getList()
    this.getRecheckList()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getList() {
      this.listLoading = true
      countList(this.userData).then(response => {
        this.list = response.data.data
        this.autoplayFlag = true
        this.listLoading = false
      })
    },
    getConflictList() {
      conflictList(this.userData).then(response => {
        this.conflicts = response.data.data
        this.conflictLength = this.conflictsA.length
      })
    },
    getRecheckList() {
      getReviewedDoc(this.userData, this.listQuery).then(response => {
        this.recheckList = response.data.data
        this.recheckLength = this.recheckList.totalElements
      })
    }
  },
  computed: {
    conflictsA: function() {
      const self = this
      return self.conflicts.filter(function(item) {
        return item.documentEntity.reviewed
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
    width: 50%;
  }
  .card-panel {
    height: 200px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      /*.icon-people {
         background: #40c9c6;
      }*/
      .icon-computer{
        background: #40c9c6;
        color:#fff;
      }
     /* .icon-message {
        background: #36a3f7;
      }*/
      .icon-components1 {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
   /* .icon-people {
      color: #40c9c6;
    }*/
    .icon-computer{
      color: #40c9c6;
    }
   /* .icon-message {
      color: #36a3f7;
    }*/
    .icon-components1 {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 88px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 60px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
