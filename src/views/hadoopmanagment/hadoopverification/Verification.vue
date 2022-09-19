<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' , height:'650px'}" :bordered="false">
      <a-form :form="formData">
        <div style="width:900px;margin-left: auto;margin-right: auto;margin-top: 20px;">
          <a-row type="flex">
            <a-col :span="18">
              <a-form-item label="选择集群" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-select
                  :allow-clear="true"
                  name="hdfsName"
                  v-decorator="['hadoopId', { rules: [{ required: true, message: '请选择集群' }] }]"
                  placeholder="请选择集群"
                  :options="hdfsSelectOptions"
                />
              </a-form-item>
              <a-form-item label="选择验证方式" :labelCol="{ span: 6 }" :wrapperCol="{ span: 15 }">
                <a-select placeholder="请选择" v-decorator="['type',{initialValue: undefined}]">
                  <a-select-option :value="1">Jps验证</a-select-option>
                  <a-select-option :value="2">50070验证</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div></a-form>
      <div style="width:600px;margin-left: auto;margin-right: auto;margin-top:50px;">
        <a-button type="primary" style="margin-bottom: 15px;margin-left: 80px;" @click="returnList">
          返回
        </a-button>
        <a-button type="primary" style="margin-bottom: 15px;margin-left: 100px;" @click="toVar">
          验证
        </a-button>
        <a-modal
          :forceRender="true"
          v-model="visible"
          @cancel="handleCancel"
          @ok="varOk"
          cancelText="取消"
          okText="确定"
          :footer="null"
          :title="varModalTitle"
        >
          <div v-if="messageType === 'text'">
            <p v-for="(item,index) in messages" :key="index">{{ item }}</p>
          </div>
          <div v-if="messageType === 'url'">
            <a v-for="(item,index) in messages" :key="index" :href="item" target="_blank"> {{ item }} </a>
          </div>
        </a-modal>
      </div>

    </a-card>

  </page-header-wrapper>
</template>

<script>
import { getList } from '@/api/hadoop/hadoop'
import { execJps } from '@/api/hadoop/hadoopkey'
import stomp from '@/utils/websocket'
export default {
  name: 'BaseForm',
  components: {

  },
  data () {
    return {
      currentId: this.$route.params.id,
      formData: this.$form.createForm(this),
      varModalTitle: '验证',
      varform: this.$form.createForm(this),
      visible: false,
      hdfsSelectOptions: [],
      messages: [],
      messageType: 'text'
    }
  },
  computed: {

  },
  created () {
    getList().then((res) => {
      this.hdfsSelectOptions = res.data.map((e) => {
        return { value: e.id, label: e.hdfsName }
      })
    })
  },
  methods: {
    toVar () {
      this.varModalTitle = '验证'
      this.visible = true
      const values = this.varform.getFieldsValue()
        Object.keys(values).forEach((k) => {
          values[k] = undefined
        })
      this.varform.setFieldsValue(values)
      this.varOk()
    },
    varOk () {
       this.formData.validateFields((err, values) => {
          console.log(values)
        if (!err) {
          this.messages = []
        const type = values['type']
        switch (type) {
          case 1 : {
            this.messageType = 'text'
            stomp.init(() => {
              stomp.sub('/topic/message-text', (data) => {
                this.messages.push(data)
                })
              })
              execJps(values).then(res => {
              }).catch(err => {
                this.$notification.error('error' || err.message)
              })
              break
          }
          case 2 : {
            this.messages.push('http://10.7.122.114:50070')
            this.messageType = 'url'
          }
        }
        } else {
          console.log(err)
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.messages = ''
    },
       returnList () {
       this.$router.push({ path: '/hadoopmanagment/hadooplist' })
    }
  },
    handleScenicSearchChange (value) {
        this.fetching = false
    },

    back () {
      this.$router.back(-1)
    }
  }

</script>
