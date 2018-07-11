<template>
  <div class="app-container calendar-list-container" style="height: 100%">
   <!-- <div class="btnContainer">
      <el-button @click="addtags">添加标记</el-button>
      <el-button @click="saveAllTags">保存全部</el-button>
    </div>-->
    <div class="btnContainer" id="btnContainer" style="position:relative;height:40px;">
      <el-button type="success" @click="commitTags" :loading="commitLoading" style="position:absolute;right:0;" v-if="!this.marked">提交</el-button>
      <el-button type="success" plain v-else disabled="disabled" style="position:absolute;right:0;">已提交</el-button>
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

      <p id="articleT" style="text-indent: 2em;line-height: 24px;font-size: 16px">{{this.document.content}}</p>
    </div>
    <div id="tagContainer" class="tagsConatiner" style="min-width:350px;height:600px;overflow-y:scroll;float:right; border:1px solid #ccc; margin-top:8px;padding-right:10px;padding-top:10px;padding-left:4px;">
      <div v-if="this.markList && this.markList.length > 0">
          <div v-for="(item, index) in markList" style="margin-bottom: 10px">
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
            <div v-if="marked" style="height: 30px;line-height: 30px;padding-left: 32px">问题类型:{{item.markTypeEntity.name}}</div>
            <div class="btnContainer" style="margin:10px 0;height:40px" v-if="!marked">
              <!--<span style="font-size:14px;float:left;margin-left:28px;padding-top: 10px">类型：{{item.markTypeEntity.name}}</span>-->
              <el-button type="danger" :loading="deleteLoading" style="float:right;" @click="deleteTag(item.id)">删除</el-button>
              <el-button type="primary" :loading="updateLoading" style="float: right;margin-right: 10px;" @click="updateTag(item.id, item, item.markTypeEntity.id)">修改</el-button>
              <el-select v-model="item.markTypeEntity.id"
                         @change="changeMarkType($event,item)"
                         style="width:128px;float: right">
                <el-option
                  v-for="item in markTypeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <br>
            <!--<div style="border-bottom: 1px dashed #ccc"></div>-->
          </div>

      </div>
      <div class="inputContainer" style="margin-bottom: 10px" v-if="!marked">
        <div class="questionContainer">
          <span style="width:6%;float:left;padding:4px 4px">Q:</span>
          <el-input style="width: 94%;padding-left:10px;margin-bottom: 10px;" type="textarea"
                    :autosize="{ minRows: 1}" placeholder="添加标记"
                    v-model="input1.question"
          >
          </el-input>
        </div>
        <div class="answerContainer">
          <span style="width:6%;float:left;padding:4px 4px">A:</span>
          <el-input style="width: 94%;padding-left:10px" type="textarea"
                    :autosize="{ minRows: 2}" placeholder="添加答案"
                    v-model="input1.answer"
          >
          </el-input>
        </div>
        <div class="btnContainer" style="margin:10px 0;height:40px">
          <el-button type="success" @click="saveTags" :loading="saveLoading" style="float:right;">保存</el-button>
          <el-select v-model="value"
                     @change="selectedMarkType()"
                     style="float:right;margin-right:10px;width:208px">
            <el-option
              v-for="item in markTypeData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
     <!-- <div class="inputContainer" style="margin-bottom: 10px">
        <div class="questionContainer">
          <span style="float:left;padding:4px 4px">Q:</span>
          <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                    :autosize="{ minRows: 1}" placeholder="添加标记">
          </el-input>
        </div>
        <div class="answerContainer">
          <span style="float:left;padding:4px 4px">A:</span>
          <el-input style="width: 85%;margin-left: 10px" type="textarea"
                    :autosize="{ minRows: 2}" placeholder="添加答案">
          </el-input>
        </div>
      </div>
      <div class="inputContainer" style="margin-bottom: 10px">
        <div class="questionContainer">
          <span style="float:left;padding:4px 4px">Q:</span>
          <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                    :autosize="{ minRows: 1}" placeholder="添加标记">
          </el-input>
        </div>
        <div class="answerContainer">
          <span style="float:left;padding:4px 4px">A:</span>
          <el-input style="width: 85%;margin-left: 10px" type="textarea"
                    :autosize="{ minRows: 2}" placeholder="添加答案">
          </el-input>
        </div>
      </div>-->
    </div>
    <!--<el-row>
      <el-col :span="16"><div class="grid-content bg-purple">
        <div class="articleContainer" style="padding:6px 20px 6px 6px;text-align: justify">
          <h3 style="position:relative;margin:0;padding-right:60px;">
            {{this.document.title}}
            <div class="fontSizeContainer">
              <span :class="{'selectedFontSize': pFontSize == 14}" type="text" style="font-size: 12px" @click="setFontSize(14)">T</span>
              <span :class="{'selectedFontSize': pFontSize == 16}" type="text" style="font-size: 14px" @click="setFontSize(16)">T</span>
              <span :class="{'selectedFontSize': pFontSize == 18}" type="text" style="font-size: 17px" @click="setFontSize(18)">T</span>
            </div>
          </h3>

          <p id="articleT" style="text-indent: 2em;line-height: 24px;font-size: 16px">{{this.document.content}}</p>
        </div>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
        <div id="tagContainer" class="tagsConatiner" style="height:600px;overflow-y:scroll;border:1px solid #ccc; margin-top:8px;padding-right:10px;padding-top:10px;padding-left:4px;">
          <div v-if="this.markList && this.markList.length > 0">
            <div v-for="(item, index) in markList" style="margin-bottom: 10px">
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
              <div class="btnContainer" style="margin:10px 0;height:40px" v-if="!marked">
                <span style="font-size:14px;float:left;margin-left:28px;padding-top: 10px">类型：{{item.markTypeEntity.name}}</span>
                <el-button type="danger" :loading="deleteLoading" style="float:right;" @click="deleteTag(item.id)">删除</el-button>
                <el-button type="primary" :loading="updateLoading" style="float: right;margin-right: 10px;" @click="updateTag(item.id, item)">修改</el-button>
              </div>
            </div>

          </div>
          <div class="inputContainer" style="margin-bottom: 10px" v-if="!marked">
            <div class="questionContainer">
              <span style="width:6%;float:left;padding:4px 4px">Q:</span>
              <el-input style="width: 94%;padding-left:10px;margin-bottom: 10px;" type="textarea"
                        :autosize="{ minRows: 1}" placeholder="添加标记"
                        v-model="input1.question"
              >
              </el-input>
            </div>
            <div class="answerContainer">
              <span style="width:6%;float:left;padding:4px 4px">A:</span>
              <el-input style="width: 94%;padding-left:10px" type="textarea"
                        :autosize="{ minRows: 2}" placeholder="添加答案"
                        v-model="input1.answer"
              >
              </el-input>
            </div>
            <div class="btnContainer" style="margin:10px 0;height:40px">
              <el-button type="success" @click="saveTags" :loading="saveLoading" style="float:right;">保存</el-button>
              <el-select v-model="value"
                         @change="selectedMarkType()"
                         style="float:right;margin-right:10px;width:208px">
                <el-option
                  v-for="item in markTypeData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          &lt;!&ndash; <div class="inputContainer" style="margin-bottom: 10px">
             <div class="questionContainer">
               <span style="float:left;padding:4px 4px">Q:</span>
               <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                         :autosize="{ minRows: 1}" placeholder="添加标记">
               </el-input>
             </div>
             <div class="answerContainer">
               <span style="float:left;padding:4px 4px">A:</span>
               <el-input style="width: 85%;margin-left: 10px" type="textarea"
                         :autosize="{ minRows: 2}" placeholder="添加答案">
               </el-input>
             </div>
           </div>
           <div class="inputContainer" style="margin-bottom: 10px">
             <div class="questionContainer">
               <span style="float:left;padding:4px 4px">Q:</span>
               <el-input style="width: 85%;margin:0 0 10px 10px" type="textarea"
                         :autosize="{ minRows: 1}" placeholder="添加标记">
               </el-input>
             </div>
             <div class="answerContainer">
               <span style="float:left;padding:4px 4px">A:</span>
               <el-input style="width: 85%;margin-left: 10px" type="textarea"
                         :autosize="{ minRows: 2}" placeholder="添加答案">
               </el-input>
             </div>
           </div>&ndash;&gt;
        </div>
      </div></el-col>
    </el-row>-->
  </div>
</template>

<script>
  import { documentDetail, markdocument, updateMark, deleteMark, commitdocument } from '@/api/tagdocument'
  import { markType } from '../../api/markType'
  /* eslint-disable */
  export default {
    name: 'tag',
    data() {
      return {
        tableKey: 0,
        id: '',
        document: {},
        marked: false,
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
        markTypeData: null,
        value: '',
        valueDefault:'',
        markTypeId: '',
        saveLoading: false,
        updateLoading: false,
        deleteLoading: false,
        commitLoading: false
      }
    },
    created() {
      /*this.getList()*/
      this.loginInfo.username = this.getCookie('username')
      this.loginInfo.password = this.getCookie('password')
      this.id = this.$route.params.id
      this.getdocument()
      this.getMarkType()
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
        if (this.tagContainer != null) {
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
      changeMarkType(changeId, item) {
        item.markTypeEntity.id = changeId
        // alert(changeId)
      },
      getdocument() {
        this.listLoading = true
        documentDetail(this.id,this.loginInfo).then(response => {
          this.document = response.data.data
          this.marked= this.document.marked
          this.markList = response.data.data.markEntityList
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
      addtags () {
      },
      saveTags () {
        this.saveLoading = true
        this.markdata =
          {
            question: this.input1.question,
            answer: this.input1.answer,
            markType: this.markTypeId
          }
          if(this.markdata.question == '' || this.markdata.answer == ''){
            this.$message({
              message: '请输入问题和答案！',
              type: 'warning'
            });
            this.saveLoading = false
            return
          }
        markdocument(this.id, this.markdata, this.loginInfo).then(response => {
          this.input1.question = ''
          this.input1.answer = ''
          this.markTypeId = this.valueDefault
          this.value = this.valueDefault
          this.saveLoading = false
          this.markdata = {}
          this.getdocument()
        }).catch(() => {
          this.saveLoading = false
        })
      },
      saveAllTags () {
        let questions = document.getElementsByClassName('questionContainer')
      },
      updateTag(markId, item, changeTypeId) {
        // alert(changeTypeId)
        this.$confirm('确认保存修改吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
            this.$notify({
              title: '失败',
              message: '修改失败',
              type: 'error',
              duration: 2000
            })
          })
        }).catch(() => {
          this.updateLoading = false
        })
      },
      deleteTag (markId) {
        this.$confirm('确认删除此条标注吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteLoading = true
          let documentId = this.id
          deleteMark(documentId, markId, this.loginInfo).then(response => {
            this.deleteLoading = false
            this.getdocument()
            console.log('deleteSuccess')
          }).catch(() => {
            this.deleteLoading = false
          })
        }).catch(() => {
          this.deleteLoading = false
        })
      },
      commitTags() {
        /*this.tagName = document.getElementsByName('tagName');
        this.commitName = document.getElementsByName('commitName');

        for(let i=0;i<this.tagName.length;i++){
          console.log(this.tagName[i].value);
        }*/

        if(this.markList.length >= 5){
          this.$confirm('确认提交标注结果吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.commitLoading = true
            commitdocument(this.id, this.loginInfo).then(response => {
              this.commitLoading = false
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$router.replace('/document/index')
            }).catch(() => {
              this.commitLoading = false
            })
          }).catch(() => {
            this.commitLoading = false
          })
        }else{
          this.$message({
            message: '请确保至少提交五个标记',
            type: 'warning'
          });
        }

      },
      setFontSize (x) {
        this.pFontSize = x
        this.setCookie('pfontSize', x, 30)
        let pWords = document.getElementById('articleT')
        pWords.style.fontSize = x + 'px'
        if ( x === 18) {
          pWords.style.lineHeight = '28px'
        } else {
          pWords.style.lineHeight = '24px'
        }
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
