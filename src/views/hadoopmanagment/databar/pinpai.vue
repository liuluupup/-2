<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' , height:'650px'}" :bordered="false">
    </a-card>
    <div style="width: auto;height: 500px" id="main" :data-source="modalData" :data="modalData"></div>
  </page-header-wrapper>
</template>
<script>

  import echarts from 'echarts'
  import { getBrandPercent } from '@/api/hadoop/hadoop'

  export default {
    name: 'Index',
    data () {
      return {
        modalData: {},
        brand: {},
        count: {}
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getPie()
      })
    },
    methods: {
      getPie () {
        // 绘制图表
        var myChart = echarts.init(document.getElementById('main'))
        // 指定图表的配置项和数据
        var option = {
          // 标题
          title: {

            x: 'left' // 标题位置
            // textStyle: { //标题内容的样式
            //   color: '#000',
            //   fontStyle: 'normal',
            //   fontWeight: 100,
            //   fontSize: 16 //主题文字字体大小，默认为18px
            // },
          },
          // stillShowZeroSum: true,
          // 鼠标划过时饼状图上显示的数据
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          // 图例
          legend: {// 图例  标注各种颜色代表的模块
            // orient: 'vertical',//图例的显示方式  默认横向显示
            bottom: 10, // 控制图例出现的距离  默认左上角
            left: 'center', // 控制图例的位置
            // itemWidth: 16,//图例颜色块的宽度和高度
            // itemHeight: 12,
            textStyle: {// 图例中文字的样式
              color: '#000',
              fontSize: 16
            }
           // 图例上显示的饼图各模块上的名字
          },
          // 饼图中各模块的颜色
          color: ['#32dadd', '#5ab1ef', '#FF6A6A', '#FF3030', '#9400D3', '#6959CD', '#0000FF'],
          // 饼图数据
          series: {
            // name: 'bug分布',
            type: 'pie', // echarts图的类型   pie代表饼图
            radius: '60%', // 饼图中饼状部分的大小所占整个父元素的百分比
            center: ['50%', '50%'], // 整个饼图在整个父元素中的位置
            // data:''               //饼图数据
            data: [ // 每个模块的名字和值
              { name: this.modalData.brand, value: this.modalData.count },
              { name: '小米', value: 18 },
              { name: '华为', value: 18 },
              { name: 'OPPO', value: 12 },
              { name: 'Vivo', value: 12 },
              { name: '三星', value: 5 },
              { name: '游戏机', value: 15 }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true // 饼图上是否出现标注文字 标注各模块代表什么  默认是true
                  // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
                },
                labelLine: {
                  show: true// 官网demo里外部标注上的小细线的显示隐藏    默认显示
                }
              }
            }
          }

        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      },
      getid (id) {
        getBrandPercent({ id }).then(res => {
        this.modalData = res.data
        console.log(this.modalData)
        this.visible = true
      })
      }
    }

  }

</script>

<style scoped>
