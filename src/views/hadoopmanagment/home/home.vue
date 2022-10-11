<template>
  <page-header-wrapper>
    <div class="content">
      <div style="margin-left: 180px ; margin-top: 30px;">
        <a-card hoverable>
          <img
            slot="cover"
            alt="example"
            src="~@/assets/jdlogo.jpg"
            width="300px"
            height="200px"
          />
          <a-card-meta title="京东Spark大数据分析系统">
            <template slot="description">
              www.jd.com
            </template>
          </a-card-meta>
        </a-card>
        <a-table :columns="columns" :data-source="data" >
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>

      <div style="width:600px;height:80px;margin-left:190px;margin-top: 30px;">
        <a-row :gutter="12" style="margin-left:40px">
          <a-col :span="12">
            <a-statistic title="OPPO" :value="11228" style="margin-right: 0px, width:360px">
              <template #suffix>
                <a-icon type="like" />
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="12">
            <a-statistic title="vivo" :value="932" class="demo-class">
              <template #suffix>
                <span> / 100</span>
              </template>
            </a-statistic>
          </a-col>
        </a-row>
        <a-row :gutter="12" style="margin-top:20px ;margin-left:40px">
          <a-col :span="12">
            <a-statistic title="iphone" :value="50228" style="margin-right: 0px, width:360px">
              <template #suffix>
                <a-icon type="like" />
              </template>
            </a-statistic>
          </a-col>
          <a-col :span="12">
            <a-statistic title="华为" :value="3522" class="demo-class">
              <template #suffix>
                <span> / 100</span>
              </template>
            </a-statistic>
          </a-col>
        </a-row>
        <div style="width:600px;height:80px;margin-top:20px">
          <a-card :body-style="{ padding: '24px 32px' , height:'650px'}" :bordered="false">
          </a-card>
          <div style="width: 500px;height: 400px" id="main">
          </div>
        </div>
      </div>
    </div>

  </page-header-wrapper>
</template>
<script>

  export default {
    name1: 'Page',
    name: 'Index',
    mounted () {
        // 在通过mounted调用即可
      this.echartsInit()
    },
    methods: {
        // 初始化echarts
        echartsInit () {
          // 柱形图
          // 因为初始化echarts 的时候，需要指定的容器 id='main'
        this.$echarts.init(document.getElementById('main')).setOption({
            xAxis: {
                type: 'category',
                data: ['三星', '华为', 'vivo', 'iPhone', 'OPPO', '小米', '游戏机']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
        })
      }

      },
    data () {
      return {
         data,
      columns
    }
  }
}

  const columns = [
  {
    title: '品牌',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' },
    width: 80
  },
  {
    title: '购买数量',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: '购买数量前十',
    dataIndex: 'address',
    key: 'address 1',
    width: 80
  }

]

const data = [
  {
    key: '1',
    name: 'OPPO',
    age: 3200,
    address: 233,
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'vivo',
    age: 4200,
    address: 3444,
    tags: ['loser']
  },
  {
    key: '3',
    name: 'iphone',
    age: 3200,
    address: 3431,
    tags: ['cool', 'teacher']
  }
]

</script>

<style scoped>
.content{
  background-color: white;
  display:flex;
  justify-content: stretch;
}
</style>
