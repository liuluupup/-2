<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px', height: '650px' }" :bordered="false"> </a-card>
    <div style="width: auto; height: 500px" id="main"></div>
  </page-header-wrapper>
</template>
<script>
/* eslint-disable */
import echarts from 'echarts'
import { getShangshi } from '@/api/hadoop/hadoop'

export default {
  name: 'Index',
  data() {
    return {
      valueProp: 'launchDate',
      nameProp: 'model',
      title: '上市时间',
      data: [],
    }
  },
  mounted: function () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)

    getShangshi().then((res) => {
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
          type: 'time',
                axisLabel: {
                    fontSize: 14,
                    color: "#A7C8ED",
                    formatter: function(value) {
                        return echarts.format.formatTime("yyyy.MM.dd", new Date(value));
                    },
                },
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow',
        //   },
        //   // formatter: function (params) {
        //   //   var html = "";
        //   //   for (var i in params) {
        //   //     var param = params[i];
        //   //     var date = echarts.format.formatTime("yyyy-MM-dd", new Date(param.name));
        //   //     html += `${date}<br />${param.seriesName}：<span style="color: #FFFFFF">${param.value}</span><br />`;
        //   //   }
        //   //   return html;
        //   // },
        // },
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
