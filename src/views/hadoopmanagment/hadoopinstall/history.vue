<template>
  <page-header-wrapper>
    <div>
      <a-card>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          showPagination="auto">
          <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" ></a-badge>
          </span>
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>

          <span slot="action">
            <template>
              <a-button class="sys-btn" >
                <a>编辑</a>
              </a-button>

              <a-button class="look-btn" >
                <a>查看</a>
              </a-button>

              <!-- <a-button class="del-btn">
                <a-popconfirm
                  title="确定要删除这个优惠卷？"
                  ok-text="删除"
                  cancel-text="再想想"
                  @confirm="handleDel(record.id)"
                >
                  <a>删除</a>
                </a-popconfirm>
              </a-button> -->

            </template>
          </span>
        </s-table>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '@/components'
  import { getbrand } from '@/api/spark/data1'
  const columns = [
         {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '任务名称',
          dataIndex: 'name'
        },
         {
          title: '数量',
          dataIndex: 'num'
        },
        {
          title: '操作时间',
          dataIndex: 'operateTime'
        },
         {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
]

export default {
  components: {
     STable
  },
  data () {
    return {
      columns,
        loadData: (parameter) => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getbrand(requestParameters).then((res) => {
          return res.data
        })
      }
    }
  },

  created () {
    },
  methods: {

  }
}
</script>
