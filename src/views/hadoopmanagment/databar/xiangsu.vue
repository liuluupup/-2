<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px', height: '650px' }" :bordered="false"> </a-card>
    <div style="width: auto; height: 500px" id="main"></div>
  </page-header-wrapper>
</template>
<script>
/* eslint-disable */
import echarts from 'echarts'
import { getXiangsu } from '@/api/hadoop/hadoop'

export default {
  name: 'Index',
  data() {
    return {
      valueProp: 'camera',
      nameProp: 'model',
      title: '像素',
      data: [],
    }
  },
  mounted: function () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)

    getXiangsu().then((res) => {
      this.data = res.data
      const tmp = {
        values: [],
        names: [],
      }
      this.data.forEach((item) => {
        tmp.values.push(item[this.valueProp])
        tmp.names.push(item[this.nameProp])
      })
      const option = {
        xAxis: {
          type: 'category',
          data: tmp.names,
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        series: [
          {
            data: tmp.values,
            type: 'bar',
          },
        ],
      }
      option && myChart.setOption(option)
    })
  },
  methods: {},
}
</script>

<style scoped>
