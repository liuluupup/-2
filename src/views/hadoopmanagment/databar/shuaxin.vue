<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' , height:'650px'}" :bordered="false">
    </a-card>
    <div style="width: auto;height: 500px" id="main">
    </div>
  </page-header-wrapper>
</template>
<script>
  // 通过this.$echarts来使用
    export default {
      name: 'Page',
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
                data: ['小米', 'vivo', 'oppo', 'iPhone', '三星']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(24, 144, 225, 0.8)'
                }
            }]
        })
      }

      }
    }
  </script>
