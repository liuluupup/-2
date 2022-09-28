<template>
  <page-header-wrapper>
    <a-card :bordered="false" style="height:600px">
      <div class="table-page-search-wrapper" style="width:1000px;">
        <div style="width:450px;position: absolute">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item style="font-weight: 600;" label="数据数量">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item style="font-weight: 600;" label="品牌">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item style="font-weight: 600;" label="SIM卡数量">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item label="1个">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item label="2个">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div style="position: absolute;margin-left:240px;margin-top:60px">
          <a-checkbox @change="onChange" style="margin-left:100px">
            随机生成
          </a-checkbox>
        </div>
        <div style="position: absolute;margin-left:240px;margin-top:115px">
          <a-checkbox @change="onChange" style="margin-left:100px">
            随机生成
          </a-checkbox>
        </div>
        <div style="width:450px;position: absolute;margin-left:600px ">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item style="font-weight: 600;" label="任务名称">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item style="font-weight: 600;" label="机型">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item style="font-weight: 600;" label="系统">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item label="安卓">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item label="鸿蒙">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item label="ios">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="18" :sm="30">
                <a-form-item label="功能机">
                  <a-input v-model="queryParam.name" placeholder="请输入内容"/>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div style="position: absolute;margin-left:840px;margin-top:60px">
          <a-checkbox @change="onChange" style="margin-left:100px">
            随机生成
          </a-checkbox>
        </div>
        <div style="position: absolute;margin-left:840px;margin-top:115px">
          <a-checkbox @change="onChange" style="margin-left:100px">
            随机生成
          </a-checkbox>
        </div>
        <div class="table-operator" style="position:absolute; margin-top:400px">
          <a-button type="primary" icon="plus" @click="handleAdd">
            生成
          </a-button>
        </div>

        <a-modal
          :forceRender="true"
          v-model="visible"
          @cancel="handleCancel"
          @ok="handleOk"
          cancelText="取消"
          okText="确定"
          :title="hadoopformModalTitle"
        >
          <div>
            <a-progress type="circle" :percent="75" style="align:center"/>
          </div>
        </a-modal>
        <div style="display: flex; flex-flow: wrap;">

          <div v-for="(item,index) in hadoopData" :key="index" style="width: calc(33% - 20px);background-color: #ffffff;margin: 10px; " >
            <a-card :title="item.hdfsName" :bordered="true">
              <template #extra>
                <a-popconfirm
                  title="确定要删除这个集群？"
                  ok-text="删除"
                  cancel-text="再想想"
                  @confirm="handleDel(item.id)"
                >
                  <a style="color: red" >删除</a>
                </a-popconfirm>
              </template>
              <div>
                <p>节点数: {{ item.nodeTotal }}</p>
                <p>创建时间：{{ item.createTime }}</p>
                <a-divider />
                <p>已安装内容</p>
                <p>{{ item.hdfs }} {{ item.flume }} {{ item.hive }} {{ item.zookeeper }} {{ item.hbase }} {{ item.kafka }}</p>
              </div>
              <div style="text-align:center">
                <a-button type="primary" @click="handleDetail(item.id)">
                  查看详情
                </a-button>
              </div>
            </a-card>
          </div>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { getList, addhdfs, delhdfs } from '@/api/hadoop/hadoop'

export default {
  components: {
  },
  data () {
    return {
      current: 2,
      hadoopformModalTitle: '生成',
      hadoopform: this.$form.createForm(this),
      checkedValues: [],
      queryParam: {},
      hadoopData: [],
      visible: false,
      confirmLoading: false
    }
  },
  created () {
   this.reload()
  },
  methods: {
    reload () {
       getList(this.queryParam).then(res => {
        this.hadoopData = res.data
    })
    },
    statusChange () {
      this.reloadTableData(true)
    },
    handleDetail (id) {
      this.$router.push({ path: `/hadoopmanagment/hadoopdetails/${id}` })
    },
    handleAdd () {
      console.log('abcd')
      this.hadoopformModalTitle = '生成'
      this.visible = true
      this.reloadTableData()
      const values = this.hadoopform.getFieldsValue()
        Object.keys(values).forEach((k) => {
          values[k] = undefined
        })
      this.hadoopform.setFieldsValue(values)
    },
    handleCancel () {
      this.visible = false
    },
    handleOk () {
      this.hadoopform.validateFields((err, values) => {
        if (!err) {
          addhdfs(values).then(res => {
            this.hadoopform.resetFields()
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

    handleDel (id) {
      delhdfs(id).then((res) => {
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
    },
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    }
  }
}
</script>
