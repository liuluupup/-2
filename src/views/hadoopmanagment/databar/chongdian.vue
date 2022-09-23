<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' , height:'650px'}" :bordered="false">
    </a-card>
    <div id="echart" style="width: 100%;height: 500px; padding-top: .6rem"></div>
  </page-header-wrapper>
</template>
<script>
  const echarts = require('echarts/lib/echarts') // 引入基本模板
  require('echarts/lib/chart/line') // 引入折线图组件
  require('echarts/lib/chart/bar') // 引入柱状图组件
  require('echarts/lib/component/tooltip') // 引入提示框
  require('echarts/lib/component/title') // title组件

  export default {
    name: 'ECharts',
    data () {
      return {
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'], // 柱状图横轴
        lineData: [150, 220, 430, 360, 450, 680, 100, 450, 680, 200, 680, 200], // 折线图的数据
        // barData1: [100, 200, 400, 300, 500, 500, 500], // 柱状图1的数据
        barData2: [100, 200, 400, 300, 500, 500, 500, 450, 680, 200] // 柱状图2的数据
        // barData3: [300, 200, 100, 400, 100, 200, 100] // 柱状图3的数据
      }
    },
    mounted () {
      const _this = this
      const { month, lineData, barData1, barData2, barData3 } = _this
      _this.drawLine(month, lineData, barData1, barData2, barData3)
      setTimeout(function () { // 随着页面自适应
          window.onresize = function () {
            _this.eChart.resize()
          }
      }, 200)
    },
    methods: {
      drawLine (xAxisData, lineData, barData1, barData2, barData3) { // xAxisData:x轴的值
        const eChart = echarts.init(document.getElementById('echart')) // 基于准备好的dom，初始化echarts实例
        this.eChart = eChart
        eChart.setOption({
          // 绘制图表
          title: { text: '' },
          tooltip: {
            formatter: '{a}: {c}'
          },
          grid: {
              left: '3%',
              right: '3%',
              bottom: '3%',
              containLabel: true
          },
          legend: { // 图例名
              show: true,
              data: ['负面', '问卷'],
              right: '0%',
              textStyle: {
                color: '#f8303b' // 图例文字
              }
          },
          xAxis: [
            // x轴
            {
              type: 'category',
              axisTick: {
                show: false // 坐标轴刻度。
              },
              axisLine: {
                show: true, // 坐标轴轴线。
                lineStyle: {
                  color: '#eeeeee'
                }
              },
              axisLabel: {
                // 坐标轴刻度标签的相关设置。
                inside: false,
                textStyle: {
                  color: '#999',
                  fontWeight: 'normal',
                  fontSize: '10'
                }
              },
              splitLine: { show: false }, // 去除网格线
              data: xAxisData
            },
            {
              type: 'category',
              axisLine: { show: false }, // 是否显示坐标轴轴线。
              axisTick: { show: false }, // 是否显示坐标轴刻度。
              axisLabel: { show: false }, // 是否显示刻度标签。 柱状图上的标签
              splitArea: { show: false }, // 是否显示分隔区域。  背景遮罩
              splitLine: { show: false } // 是否显示分隔线。
              // data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            }
          ],
          yAxis: [
            // y轴
            {
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#eeeeee'
                }
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#32346c '
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#bac0c0',
                  fontWeight: 'normal',
                  fontSize: '12'
                },
                formatter: '{value}'
              }

            }
          ],
          series: [

            { // 柱状图2
              type: 'bar',
              name: '负面',
              itemStyle: {
                show: true,
                color: '#f8303b',
                borderWidth: 40,
                borderType: 'solid',
                emphasis: {
                  shadowBlur: 15,
                  shadowColor: 'rgba(105,123, 214, 1.7)'
                }
              },
              zlevel: 2,
              barWidth: 70,
              data: barData2
            },

            { // 折线
              zlevel: 4,
              type: 'line',
              name: '问卷',
              color: ['#8d83f7'], // 拐点颜色
              symbolSize: 8, // 拐点的大小
              symbol: 'circle', // 拐点样式
              data: lineData,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: '#00BFFF', // 折线的颜色
                    type: 'solid' // 折线的类型
                  }
                }
              },
              tooltip: {
                formatter: '{b}<br/>问卷得分：{c}<br/>'
              }
            }
          ]
        })
      }
    }
  }
  </script>
