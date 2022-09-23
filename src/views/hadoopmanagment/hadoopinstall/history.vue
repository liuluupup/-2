<template>
  <a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="xuhao"> 序号</span>
    <span slot="renwu"> 任务名称</span>
    <span slot="runner"> 操作者</span>
    <span slot="shuliang"> 数量</span>
    <span slot="time"> 操作时间</span>
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
    </span>
    <span slot="action" >
      <div>
        <a-button type="primary" @click="showModal" style="top: 16px; right: 10px;">
          规则详情
        </a-button>
        <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>
      </div>
      <div>
        <a-button type="danger" @click="gotolink" style="left:85px;top: -16px;">
          查看结果
        </a-button>
      </div>
    </span>
  </a-table>
</template>
<script>

const columns = [
{
    dataIndex: 'xuhao',
    key: 'xuhao',
    slots: { title: 'xuhao' },
    scopedSlots: { customRender: 'name' }
  },
  {
    dataIndex: 'renwu',
    key: 'renwu',
    slots: { title: 'renwu' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '操作者',
    dataIndex: 'runer',
    key: 'runer'
  },
  {
    title: '数量',
    dataIndex: 'shuliang',
    key: 'shuliang'
  },
  {
    title: '操作时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
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
  }

]

export default {
  data () {
    return {
      data,
      columns,
      visible: false
    }
  },

methods: {
  showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    gotolink () {
      //  对应router目录下index.js中定义的name
this.$router.push({ name: 'data1' })
    }
}
}
</script>
