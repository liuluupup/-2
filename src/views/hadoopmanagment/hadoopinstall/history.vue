<template>
  <page-header-wrapper>
    <a-card>
      <a-modal v-model="visible" title="规则详情" @ok="handleOk" :data-source="modalData" :data="modalData">
        <p>系统占比: {{ modalData.systemPercent }} </p>
        <p>SIM卡数量占比: {{ modalData.simPercent }}</p>
        <p>品牌占比: {{ modalData.brand }}</p>
        <p>型号占比:{{ modalData.model }} </p>
      </a-modal>
      <a-table :columns="columns" :data-source="tableData" :data="tableData">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="xuhao"> 序号</span>
        <span slot="renwu"> 任务名称</span>
        <span slot="operator"> 操作者</span>
        <span slot="shuliang"> 数量</span>
        <span slot="time"> 操作时间</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === '0' ? 'geekblue' :  'green'"
          >
          {{ tag === '0' ? '正在运行' : '已完成' }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <div>
            <a-button type="primary" @click="showModal(record.id)" style="top: 16px; right: 10px;">
              规则详情
            </a-button>
          </div>
          <div>
            <a-button type="danger" @click="gotolink" style="left:85px;top: -16px;">
              查看结果
            </a-button>
          </div>
        </span>
        <a-pagination v-model="current" :total="50" show-less-items />
      </a-table>

    </a-card>
  </page-header-wrapper>
</template>
<script>
import { lisidata, getItemData } from '@/api/hadoop/hadoop'

export default {
  data () {
    return {
      data,
      tableData: [],
      columns,
      visible: false,
      current: 2,
      modalData: {}
    }
  },
  created () {
       this.lisidata()
    },

methods: {
  showModal (id) {
      getItemData({ id }).then(res => {
        this.modalData = res.data
        console.log(this.modalData)
        this.visible = true
      })
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    gotolink () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'data1' })
    },
    lisidata () {
          lisidata().then((res) => {
            console.log('lisidata: ', res)
            this.tableData = res.data
            console.log(this.tableData)
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

const columns = [
{
    dataIndex: 'id',
    key: 'xuhao',
    slots: { title: 'xuhao' },
    scopedSlots: { customRender: 'name' }
  },
  {
    dataIndex: 'name',
    key: 'renwu',
    slots: { title: 'renwu' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '操作者',
    dataIndex: 'operator',
    key: 'operator'
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'shuliang'
  },
  {
    title: '操作时间',
    dataIndex: 'operateTime',
    key: 'time'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    xuhao: '1',
    renwu: '第一次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-23',
    tags: ['运行中']
  },
  {
    xuhao: '2',
    renwu: '第二次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-24',
    tags: ['运行中']
  },
  {
    xuhao: '3',
    renwu: '第三次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-25',
    tags: ['完成']
  },
  {
    xuhao: '1',
    renwu: '第一次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-23',
    tags: ['运行中']
  },
  {
    xuhao: '2',
    renwu: '第二次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-24',
    tags: ['运行中']
  },
  {
    xuhao: '3',
    renwu: '第三次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-25',
    tags: ['完成']
  },
  {
    xuhao: '1',
    renwu: '第一次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-23',
    tags: ['运行中']
  },
  {
    xuhao: '2',
    renwu: '第二次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-24',
    tags: ['运行中']
  },
  {
    xuhao: '3',
    renwu: '第三次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-25',
    tags: ['完成']
  },
  {
    xuhao: '1',
    renwu: '第一次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-23',
    tags: ['运行中']
  },
  {
    xuhao: '2',
    renwu: '第二次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-24',
    tags: ['运行中']
  },
  {
    xuhao: '3',
    renwu: '第三次数据生成',
    runer: 'admin',
    shuliang: '10w+',
    time: '2020-9-25',
    tags: ['完成']
  }

]

</script>
