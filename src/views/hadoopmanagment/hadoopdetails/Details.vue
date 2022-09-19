<template>
  <page-header-wrapper>
    <div class="table-page-search-wrapper">
      <a-card :bordered="false">
        <div style="margin:0px 10px">
          <a @click="returnList">返回</a>
        </div>

        <a-button type="primary" style="margin:20px 15px" @click="nodeAdd">
          添加节点
        </a-button>
        <a-modal
          :forceRender="true"
          v-model="visible"
          @cancel="handleCancel"
          @ok="addnodeOk"
          cancelText="取消"
          okText="确定"
          :title="nodeAddformModalTitle"
        >
          <div>
            <a-form :form="nodeaddform">
              <a-form-item label="主/子节点" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-select placeholder="请选择" v-decorator="['key',{initialValue: undefined,rules: [{required: true, message: '请选择节点类型'}]}]">
                  <a-select-option value="master">主节点</a-select-option>
                  <a-select-option value="slave">子节点</a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item label="节点名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-input v-decorator="['name',{initialValue: undefined,rules: [{required: true, message: '请输入节点名称'}]}]" placeholder="请输入节点名称" />
              </a-form-item>

              <a-form-item label="节点用户名" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-input v-decorator="['user',{initialValue: undefined,rules: [{required: true, message: '请输入节点名称'}]}]" placeholder="请输入节点名称" />
              </a-form-item>

              <a-form-item label="节点IP地址" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-input v-decorator="['ipAddress',{initialValue: undefined,rules: [{required: true, message: '请输入正确IP地址'}]}]" placeholder="例：192.168.100.2:8080" />
              </a-form-item>

              <a-form-item label="密码节点" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-input v-decorator="['password',{initialValue: undefined,rules: [{required: true, message: '请输入节点密码'}]}]" placeholder="请输入密码" />
              </a-form-item>
            </a-form>
          </div>
        </a-modal>
        <a-button type="primary" style="margin-bottom: 15px;margin-left: 10px" @click="freekeying">
          一键免密钥
        </a-button>
        <a-modal
          :forceRender="true"
          v-model="visible3"
          @cancel="handleCancel"
          @ok="freeKeys"
          cancelText="关闭"
          okText="开始"
          :title="freeykeyModalTitle"
        >
          <div>
            <a-form :form="freekeyform">
              <a-steps progress-dot :current="progressDot">
                <a-step title="开始" />
                <a-step title="执行中" />
                <a-step title="完成" />
              </a-steps>
              <div style="margin-right:auto;margin-left:auto;margin-top: 10px;width: 120px;">
                <a-progress type="circle" :percent="dataPercent" />
              </div>
            </a-form>
          </div>
        </a-modal>

        <a-button type="primary" style="margin-bottom: 15px;margin-left: 25px" @click="toInstall">
          安装内容
        </a-button>

        <a-button type="primary" style="margin-bottom: 15px;margin-left: 25px" @click="tovalidate">
          功能验证
        </a-button>
        <div style="display: flex; flex-flow: wrap;">
          <div v-for="(item,index) in hadoopData" style="width: calc(33% - 20px);background-color: #ffffff;margin: 10px; " :key="index">
            <a-card :title="item.name" :hoverable="true" :bordered="true">
              <template #extra>
                <a-popconfirm
                  title="确定要删除这个节点？"
                  ok-text="删除"
                  cancel-text="再想想"
                  @confirm="handleDel(item.id)"
                >
                  <a style="color: red" href="#">删除</a>
                </a-popconfirm>
              </template>
              <a-modal
                :forceRender="true"
                v-model="visible2"
                @cancel="handleCancel"
                @ok="handleOk"
                cancelText="取消"
                okText="验证"
                :title="vaildateformModal"
              >
                <div>
                  <a-form :form="vaildateform">
                    <a-form-item label="选择集群" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                      <a-select
                        :allow-clear="true"
                        name="hdfsName"
                        v-decorator="['hdfsName', { rules: [{ required: true, message: '请选择集群' }] }]"
                        placeholder="请选择集群"
                        :options="hdfsSelectOptions"
                      />
                    </a-form-item>
                    <a-form-item label="选择验证方式" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                      <a-select placeholder="请选择" v-decorator="['type',{initialValue: undefined}]">
                        <a-select-option :value="1">hdfs验证</a-select-option>
                        <a-select-option :value="3">50070验证</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </div>
              </a-modal>
              <div>
                <div>
                  <span>节点类型:</span><span style="margin-left:20px">{{ item.key }}</span>
                </div>
                <div style="margin-top: 8px">
                  <span>IP地址:</span><span style="margin-left:10px;"> {{ item.ipAddress }}</span>
                </div>
                <!-- <div style="margin-top: 8px">
                  <span>用户名:</span><span style="margin-left:10px;"> {{ item.user }}</span>
                </div> -->

              </div></a-card>
          </div>
        </div>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
// import moment from 'moment'
import { getList } from '@/api/hadoop/hadoop'
import { getdetailList, addnode, delnode } from '@/api/hadoop/hadoopdetails'
import { execfreeKey } from '@/api/hadoop/hadoopkey'
import stomp from '@/utils/websocket'

export default {
  name: 'TableList',
  components: {
  },
  data () {
    return {
      currentId: this.$route.params.id,
      nodeAddformModalTitle: '添加节点',
      nodeaddform: this.$form.createForm(this),
      freeykeyModalTitle: '免密钥',
      freekeyform: this.$form.createForm(this),
      vaildateformModal: '验证',
      vaildateform: this.$form.createForm(this),
      checkedValues: [],
      queryParam: {},
      hadoopData: [],
      data: [],
      visible: false,
      visible2: false,
      visible3: false,
      confirmLoading: false,
      dataPercent: 0,
      progressDot: 0

    }
  },
  created () {
    this.getDetail()
    getList().then((res) => {
      this.hdfsSelectOptions = res.data.map((e) => {
        return { value: e.id, label: e.hdfsName }
      })
    })
  },
  methods: {
     reload () {
        getdetailList({ id: this.currentId }).then(res => {
        this.hadoopData = res.data
      })
    },
    getDetail () {
      getdetailList({ id: this.currentId }).then(res => {
        this.hadoopData = res.data
      })
    },
    freeKeys () {
        stomp.init(() => {
          stomp.sub('/topic/message', (data) => {
              this.dataPercent = +data
              if (+data === 100) {
                this.progressDot = 2
              }
          })
      })
      execfreeKey(this.currentId).then(res => {
        this.progressDot = 1
          console.log(res)
          })
    },
    freekeying () {
      this.freeykeyModalTitle = '免密钥'
      this.visible3 = true
      const values = this.freekeyform.getFieldsValue()
        Object.keys(values).forEach((k) => {
          values[k] = undefined
        })
      this.freekeyform.setFieldsValue(values)
    },
    returnList () {
      this.$router.push({ path: '/hadoopmanagment/hadooplist' })
    },
    tovalidate () {
       this.$router.push({ path: '/hadoopmanagment/hadoopshell' })
    },
    toInstall () {
      this.$router.push({ path: '/hadoopmanagment/hadoopintall' })
    },
    addnodeOk () {
        this.nodeaddform.validateFields((err, values) => {
          console.log(values)
        if (!err) {
          values['hadoopId'] = this.currentId
          addnode(values).then(res => {
            this.nodeaddform.resetFields()
            this.visible = false
            this.$notification.success({
              message: '成功',
              description: res.msg || `添加成功`
            })
            this.reload()
          }).catch(err => {
            this.$notification.error('error' || err.message)
          })
        } else {
          console.log(err)
        }
      })
    },
    nodeAdd () {
      this.nodeAddformModalTitle = '添加节点'
      this.visible = true
      const values = this.nodeaddform.getFieldsValue()
        Object.keys(values).forEach((k) => {
          values[k] = undefined
        })
      this.nodeaddform.setFieldsValue(values)
    },
    statusChange () {
      this.reloadTableData(true)
    },
    handleDetail () {
      this.$router.push({ path: '/hadoopmanagment/hadoopdetails' })
    },
    handleCancel () {
      this.visible = false
    },
    handleOk () {
      this.hadoopform.validateFields((err, values) => {
        if (!err) {
        getList('hdfsName').then(res => {
        this.hadoopData = res.data
    })
        } else {
          console.log(err)
        }
      })
    },

    handleDel (id) {
          delnode(id).then((res) => {
          this.reload()
          this.$notification.success({
            message: '成功',
            description: res.msg || `操作成功`
          })
      }).catch(err => {
      this.$notification.error({
          message: '失败',
          description: err.msg || `操作失败`
      })
    })
    }
  }
}
</script>

<style scoped>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
