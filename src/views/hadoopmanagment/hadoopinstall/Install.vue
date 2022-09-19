<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' , height:'650px'}" :bordered="false">
      <div style="margin:0px 10px">
        <a @click="returnList">返回</a>
      </div>
      <a-form :form="formData">
        <div style="width:900px;margin-left: auto;margin-right: auto;margin-top: 20px;">
          <a-row type="flex">
            <a-col :span="18">
              <a-form-item label="所属集群" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-select
                  :allow-clear="true"
                  name="hadoopId"
                  v-decorator="['hadoopId', { rules: [{ required: true, message: '请选择集群' }] }]"
                  placeholder="请选择集群"
                  :options="hdfsSelectOptions"
                />
              </a-form-item>

              <a-form-item label="安装内容" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <div>
                  <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                      全部安装
                    </a-checkbox>
                  </div>
                  <a-checkbox-group style="width:800px" v-model="checkedList" :options="plainOptions" />
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div style="width:600px;margin-left: auto;margin-right: auto;margin-top:50px;">
          <a-button type="primary" @click="tovar" style="margin-bottom: 15px;margin-left: 80px;">
            验证
          </a-button>
          <a-button type="primary" style="margin-bottom: 15px;margin-left: 80px;" @click="handleInstall">
            安装
          </a-button>
          <a-modal
            :forceRender="true"
            v-model="installVisible"
            @cancel="handleCancel"
            @ok="handleInstallok"
            cancelText="关闭"
            width="600px"
            okText="安装"
            :destroyOnClose="true"
            :title="hdfsModalTitle"
          >
            <div>
              <a-steps progress-dot :current="progressDot">
                <a-step title="开始" />
                <a-step title="执行中" />
                <a-step title="完成" />
              </a-steps>
              <div style="margin-right:auto;margin-left:auto;margin-top: 10px;width: 120px;">
                <a-progress type="circle" :percent="dataPercent" />
              </div>
            </div>
          </a-modal>

        </div>
      </a-form>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import { getList } from '@/api/hadoop/hadoop'
import { execHdfs } from '@/api/hadoop/hadoopkey'
import stomp from '@/utils/websocket'

const plainOptions = ['Hadoop', 'Kafka', 'Zookeeper', 'Hbase', 'Flume', 'Hive']

export default {
  name: 'BaseForm',
  components: {

  },
  data () {
    return {
      currentId: this.$route.params.id,
      hadoop: this.$route.params.hadoop,
      formData: this.$form.createForm(this),
      vaildateformModal: '验证',
      vaildateform: this.$form.createForm(this),
      plainOptions,
      installVisible: false,
      visible: false,
      hdfsSelectOptions: [],
      checkedList: [],
      hdfsModalTitle: '安装',
      InstallForm: this.$form.createForm(this),
      progressDot: 0,
      dataPercent: 0
    }
  },
  computed: {
    indeterminate () {
      return !!this.checkedList.length && this.checkedList.length < plainOptions.length
    },
    checkAll () {
      return this.checkedList.length === plainOptions.length
    }
  },
  created () {
    getList().then((res) => {
      this.hdfsSelectOptions = res.data.map((e) => {
        return { value: e.id, label: e.hdfsName }
      })
    })
  },
  methods: {
    tovar () {
      this.$router.push({ path: '/hadoopmanagment/hadoopverification' })
    },
    handleInstallok () {
       this.formData.validateFields((err, values) => {
          console.log(values)
        if (!err) {
          values['checkedList'] = this.checkedList.join(',')
          stomp.init(() => {
          stomp.sub('/topic/message', (data) => {
              this.dataPercent = +data
              if (+data === 100) {
                this.progressDot = 2
              }
             })
          })
          execHdfs(values).then(res => {
              this.progressDot = 1
          console.log(res)
          }).catch(err => {
            this.$notification.error('error' || err.message)
          })
        } else {
          console.log(err)
        }
      })
    },
    handleCountryChange (val) {
      if (val) {
        this.formData.setFieldsValue({ areaType: this.countrySelectOptionsMap[val].type })
        getList({ id: val }).then((res) => {
          this.citySelectOptions = res.data.map((e) => {
            return { value: e.id, label: e.name }
          })
        })
      } else {
        this.citySelectOptions = []
      }
    },
     handleCancel () {
      this.visible = false
      this.installVisible = false
      this.dataPercent = 0
      this.progressDot = 0
    },
    handleInstall () {
      this.hdfsModalTitle = '安装'
      this.installVisible = true
      const values = this.InstallForm.getFieldsValue()
      Object.keys(values).forEach((k) => {
          values[k] = undefined
        })
      this.InstallForm.setFieldsValue(values)
    },
      returnList () {
      this.$router.push({ path: '/hadoopmanagment/hadooplist' })
    },
     tovalidate () {
      this.vaildateformModal = '验证'
      this.visible2 = true
    },
    returnDetail () {
      this.$router.push({ path: '/hadoopmanagment/hadoopdetails' })
    },
    onCheckAllChange (e) {
        this.checkedList = e.target.checked ? plainOptions : []
    }
  }
  }

</script>
