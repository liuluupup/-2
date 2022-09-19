<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a>@Itranlin</a>
    </template>
    <template v-slot:copyright>
      <a href="https://itranlin.com" target="_blank">四川凌浠科技有限公司技术支持</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
<style lang="less" scoped>
.custom-render {
  margin: 0;
}
</style>
