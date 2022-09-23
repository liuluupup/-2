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
      <a-button type="primary" ghost @click="hide(record)">规则详情</a-button>

      <a-button style="left:15px" type="danger" ghost @click="hide(record)">查看结果</a-button>
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
    tags: ['运行中', '已完成']
  }

]

export default {
  data () {
    return {
      data,
      columns
    }
  }
}

</script>
