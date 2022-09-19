<template>
  <div v-if="svalue && svalue.length > 0">
    <a-timeline class="itranlin-time-line">
      <a-timeline-item v-for="(item, index) in svalue" :key="index">
        <a-avatar slot="dot" style="color: #f56a00; backgroundColor: #fde3cf">
          Day {{ index + 1 }}
        </a-avatar>
        <div class="itranlin-time-line-content">
          <slot name="content" v-bind="{item,index,rows:svalue}">{{ item }}</slot>
        </div>
      </a-timeline-item>
    </a-timeline>
  </div>
  <div v-else>
    <slot name="init" v-bind="{rows:svalue}"></slot>
  </div>
</template>
<script>

import { Timeline } from 'ant-design-vue'
export default {
  components: {
    [Timeline.name]: Timeline,
    [Timeline.Item.name]: Timeline.Item
  },
  name: 'ItranlinTimeLine',
  props: {
      value: {
          type: Array,
          default: () => []
      }
  },
  data () {
    return {
      svalue: this.value
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        if (this.svalue !== val) {
          this.svalue = val
        }
      },
      deep: true,
      immediate: true
    },
    svalue: {
      handler (val, oldVal) {
        if (this.svalue === val) {
          this.$emit('change', val)
          this.$emit('input', val)
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
  }

}
</script>
<style lang="less" scoped>
.itranlin-time-line{
  margin-left: 10px !important;
}
.itranlin-time-line /deep/ .ant-timeline-item-content{
   margin-left: 25px !important;
   padding: 3px 0 !important;
  top: 0px !important;
}
.itranlin-time-line /deep/ .ant-timeline-item-head-custom{
  top: 0px !important;
  transform: translate(-50%, 0) !important;
  -webkit-transform: translate(-50%, 0) !important;
}
</style>
