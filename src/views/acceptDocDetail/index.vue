<template>
  <div class="app-container calendar-list-container" style="height: 100%">
    <div class="btnContainer" id="btnContainer" style="position:relative;height:40px;">
      <span style="line-height: 40px;padding: 0 8px;font-weight: bold;">标注者：{{markUser}}</span>
      <span style="line-height: 40px;padding: 0 8px;font-weight: bold;">审阅者：{{reviewUser}}</span>
      <!--<el-button type="success" v-if="!reviewed" @click="commitTags" :loading="commitLoading" style="position:absolute;right:0;">提交</el-button>-->
      <!--&lt;!&ndash;<el-button type="warning" @click="rejectDoc" :loading="commitLoading" style="position:absolute;right:80px;">驳回</el-button>-->
      <!--<el-button type="success" @click="acceptDoc" :loading="commitLoading" style="position:absolute;right:0;">通过</el-button>-->
      <!--<el-button type="success" v-else plain style="position:absolute;right:0;" disabled="disabled">已提交</el-button>-->
    </div>
    <div class="articleContainer" style="width:68%;float:left;overflow:hidden;padding:6px 20px 6px 6px;text-align: justify">
      <h3 style="position:relative;margin:0;padding-right:60px;">
        {{this.document.title}}
        <div class="fontSizeContainer">
          <span :class="{'selectedFontSize': pFontSize == 14}" type="text" style="font-size: 12px" @click="setFontSize(14)">T</span>
          <span :class="{'selectedFontSize': pFontSize == 16}" type="text" style="font-size: 14px" @click="setFontSize(16)">T</span>
          <span :class="{'selectedFontSize': pFontSize == 18}" type="text" style="font-size: 17px" @click="setFontSize(18)">T</span>
        </div>
      </h3>

      <p id="articleT" style="text-indent: 2em;line-height: 26px;font-size: 16px;">{{this.document.content}}</p>
    </div>
    <div id="tagContainer" class="tagsConatiner" style="min-width:350px;height:600px;overflow-y:scroll;float:right; border:1px solid #ccc; margin-top:8px;padding-right:10px;padding-top:10px;padding-left:4px;">
      <div v-if="this.markList && this.markList.length > 0">
        <div v-for="(item,index) in markList" style="margin-bottom: 10px">
          <div class="questionContainer">
            <span style="width:6%;float:left;padding:4px 4px">Q<span style="font-size:12px;">{{index + 1}}</span></span>
            <el-input style="width: 94%;padding-left:10px;margin-bottom: 10px;" type="textarea"
                      :autosize="{ minRows: 1}" placeholder="添加标记"
                      v-model="item.question"
            >
            </el-input>
          </div>
          <div class="answerContainer">
            <span style="width:6%;float:left;padding:4px 4px">A<span style="font-size:12px;">{{index + 1}}</span></span>
            <el-input style="width: 94%;padding-left:10px;" type="textarea"
                      :autosize="{ minRows: 2}" placeholder="添加答案"
                      v-model="item.answer"
            >
            </el-input>
          </div>
          <div v-if="document.accepted" style="height: 30px;line-height: 30px;padding-left: 32px;font-weight: bold">问题类型:{{item.markTypeEntity.name}}</div>
          <!--选择问题类型和保存按钮-->
          <!--<div class="btnContainer" style="margin:10px 0;height:40px">
            <el-button type="primary" style="float:right;" @click="updateTag(item.id, item, item.markTypeEntity.id)">保存</el-button>
            <el-select v-model="item.markTypeEntity.id"
                       @change="changeMarkType($event,item)"
                       style="float:right;width:208px;margin-right:10px;">
              <el-option
                v-for="item in markTypeData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            &lt;!&ndash;<el-button type="warning" v-if="!item.conflict" style="float:right;" :loading="conflictLoading" @click="setConflict(item.id)">冲突</el-button>
            <el-button type="warning" v-else disabled="disabled" style="float:right;">已提交</el-button>&ndash;&gt;
          </div>-->
          <div>
            <br/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { documentDetail, updateMark } from '@/api/tagdocument'
  import { markConflict, commitReview } from '@/api/reviewDocument.js'
  import { rejectDocument, acceptDocument } from '@/api/recheckByAdmin'
  import { markType } from '@/api/markType'

  /* eslint-disable */
  export default {
    name: 'acceptDocDetail',
    data() {
      return {
        tableKey: 0,
        id: '',
        document: {},
        marked: false,
        reviewed: false,
        input1: {
          question: '',
          answer: ''
        },
        markdata:null,
        markList:null,
        dataAll: null,
        pFontSize: null,
        tagContainer: null,
        pContainer: null,
        setWidth: null,
        loginInfo: {
          username: '',
          password: ''
        },
        loadingTag:true,
        conflictLoading: false,
        commitLoading: false,
        markUser: '',
        reviewUser: '',
        markTypeData: null,
        value: '',
        markTypeId: ''
      }
    },
    created() {
      /*this.getList()*/
      this.loadingTag = true
      this.loginInfo.username = this.getCookie('username')
      this.loginInfo.password = this.getCookie('password')
      this.id = this.$route.params.id
      this.getdocument()
      // this.getMarkType()
      if (this.getCookie('pfontSize')) {
        this.pFontSize = this.getCookie('pfontSize')
      }
    },
    mounted () {
      this.$nextTick(() => {
        let pWords = document.getElementById('articleT')
        pWords.style['font-size'] = this.pFontSize + 'px'
        this.tagContainer = document.getElementById('tagContainer')
        this.pContainer = document.getElementById('articleT')
        this.setWidth = this.pContainer.offsetWidth
        window.addEventListener('scroll', this.setScroll)
      })
    },
    methods: {
      setScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(this.tagContainer != null) {
          if (scrollTop > 120) {
            /* let setWidth = this.btnContainer.offsetWidth*/
            this.tagContainer.style.position = 'fixed'
            this.tagContainer.style.top = '0'
            this.tagContainer.style.right = '20px'
            /*this.tagContainer.style.width = this.setWidth * 0.46 + 'px'*/
          } else {
            this.tagContainer.style.position = 'static'
          }
        }
      },
      /* getList() {
        this.listLoading = true
        documentList(this.listQuery).then(response => {
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
          this.oldList = this.list.map(v => v.id);
          this.newList = this.oldList.slice()
        })
      },*/
      getMarkType() {
        markType(this.loginInfo).then((res) => {
          this.markTypeData = res.data.data
          for(var i=0; i<this.markTypeData.length; i++) {
            if(this.markTypeData[i].name === '事实型问题') {
              this.valueDefault = this.markTypeData[i].id
              this.value = this.valueDefault
              this.markTypeId = this.value
            }
          }
        })
      },
      selectedMarkType() {
        this.markTypeId = this.value
      },
      getdocument () {
        this.listLoading = true
        documentDetail(this.id,this.loginInfo).then(response => {
          this.markUser = response.data.data.markUser.username
          this.reviewUser = response.data.data.reviewUser.username
          this.document = response.data.data
          this.marked= this.document.marked
          this.reviewed = this.document.reviewed
          this.markList = response.data.data.markEntityList
          this.loadingTag = false
          this.loading = false
        })
      },
      setTagContainer () {
        let tagCHeight
        if (window.innerHeight) {
          tagCHeight = window.innerHeight
        } else if ((document.body) && (document.body.clientHeight)) {
          tagCHeight = document.body.clientHeight;
        }
        var tagContainer = document.getElementById('tagContainer')
        tagContainer.style.height = tagCHeight
      },
      setConflict (markId) {
        let documentId = this.id
        this.conflictLoading = true
        markConflict(documentId, markId, this.loginInfo).then(response => {
          this.conflictLoading = false
          this.getdocument()
          console.log('deleteSuccess')
        }).catch(() => {
          this.conflictLoading = false
        })
      },
      commitTags() {
        this.$confirm('确认提交审阅结果吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.commitLoading = true
          commitReview(this.id, this.loginInfo).then(response => {
            this.commitLoading = false
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.$router.replace('/check/index')
          }).catch(() => {
            this.commitLoading = false
          })
        })
      },
      setFontSize (x) {
        this.pFontSize = x
        this.setCookie('pfontSize', x, 30)
        let pWords = document.getElementById('articleT')
        pWords.style.fontSize = x + 'px'
        /*   if ( x === 18) {
             pWords.style.lineHeight = '30px'
           } else {
             pWords.style.lineHeight = '24px'
           }*/
      },
      changeMarkType(changeId, item) {
        item.markTypeEntity.id = changeId
        // alert(changeId)
      },
      updateTag(markId, item, changeTypeId) {
        // alert(changeTypeId)
        this.updateLoading = true
        updateMark(markId, item, changeTypeId, this.loginInfo).then(response => {
          this.updateLoading = false
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.updateLoading = false
        })
      },
      rejectDoc() {
        this.$confirm('确认驳回此文章吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.commitLoading = true
          rejectDocument(this.id, this.loginInfo).then(response => {
            this.commitLoading = false
            this.$message({
              message: '驳回成功',
              type: 'success'
            });
            this.$router.replace('/recheckByAdmin/index')
          }).catch(() => {
            this.commitLoading = false
            this.$message({
              message: '驳回失败',
              type: 'error'
            });
          })
        })
      },
      acceptDoc() {
        this.$confirm('确认通过此文章吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.commitLoading = true
          acceptDocument(this.id, this.loginInfo).then(response => {
            this.commitLoading = false
            this.$message({
              message: '通过成功',
              type: 'success'
            });
            this.$router.replace('/recheckByAdmin/index')
          }).catch(() => {
            this.commitLoading = false
            this.$message({
              message: '通过失败',
              type: 'error'
            });
          })
        })
      }
    }
  }
</script>

<style scoped>
  .app-container {
    height: 100%;
  }
  .fontSizeContainer {
    position: absolute;
    top: 0;
    right:0;
  }
  .fontSizeContainer span {
    color:#36a3f7;
    padding: 4px;
    cursor: pointer;
    width: 10px;
  }
  .fontSizeContainer .selectedFontSize {
    color: #cccccc;
    background: #eee;
  }
</style>
