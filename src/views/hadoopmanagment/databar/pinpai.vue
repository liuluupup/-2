<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px', height: '650px' }" :bordered="false"> </a-card>
    <div style="width: auto; height: 500px" id="main"></div>
  </page-header-wrapper>
</template>
<script>
/* eslint-disable */
import echarts from 'echarts'
import { getPinpai } from '@/api/hadoop/hadoop'

export default {
  name: 'Index',
  data() {
    return {
      valueProp: 'count',
      nameProp: 'brand',
      title: '品牌',
      data: [],
    }
  },
  mounted: function () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    const option = {
      title: {
        text: this.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'horizontal',
        bottom: '20',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    var taskId = this.$root.taskId
    getPinpai({ taskId }).then((res) => {
      this.data = res.data
      const tmp = this.data.map((item) => ({ name: item[this.nameProp], value: item[this.valueProp] }))
      option.series[0].data = tmp
      option && myChart.setOption(option)
    })
  },
  methods: {},
}
</script>

<style scoped>
