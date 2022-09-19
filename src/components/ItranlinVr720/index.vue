<template>
  <div>
    <div class="720-cloud-link">
      <a-row type="flex">
        <a-col :span="22">
          <div class="list-content">

            <a-list :data-source="svalue">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta :description="item.vrPath">
                  <a slot="title" :href="item.href">{{ item.vrName }}</a>
                </a-list-item-meta>
                <a-button @click="deleteVr720Object(index)">删除链接</a-button>
              </a-list-item>
            </a-list>
          </div>
        </a-col>
        <a-col :span="2">
          <div>
            <a-button @click="open720Modal">添加链接</a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal :forceRender="true" title="添加720链接" :visible="visible720" @ok="add720Ok" @cancel="add720Cancel">
      <a-form :form="form720Data">
        <a-form-item v-show="false" label="VR名称">
          <a-input v-decorator="['index']" />
        </a-form-item>
        <a-form-item label="VR名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input v-decorator="['vrName', { rules: [{ required: true, message: '请输入VR名称!' }] }]" />
        </a-form-item>
        <a-form-item label="720链接" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-input v-decorator="['vrPath', { rules: [{ required: true, message: '请输入720链接!' }] }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>
<script>
export default {
    name: 'ItranlinVr720',
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
  data () {
    return {
      svalue: this.value.map((e, index) => { e.index = index; return e }),
      form720Data: this.$form.createForm(this),
      visible720: false
    }
  },
  watch: {
    value: function (val) {
      this.svalue = val.map((e, index) => { e.index = index; return e })
    }
  },
    created () {
    },
    methods: {

    deleteVr720Object (index) {
      this.svalue.splice(index, 1)
      this.svalue.forEach((e, index) => { e.index = index })
      this.$emit('change', this.svalue)
      this.$emit('input', this.svalue)
    },
    open720Modal () {
      const values = this.form720Data.getFieldsValue()
       Object.keys(values).forEach((k) => {
          values[k] = undefined
        })
      this.form720Data.setFieldsValue(values)
      this.visible720 = true
    },
    add720Ok () {
      this.form720Data.validateFields((err, values) => {
        if (!err) {
          if (values.index) {
            this.svalue[values.index] = values
          } else {
            values.index = this.svalue.length
            this.svalue.push(values)
          }
          this.$emit('change', this.svalue)
          this.$emit('input', this.svalue)
          this.visible720 = false
        }
      })
    },
    add720Cancel () {
      this.visible720 = false
    }
    }
}
</script>
<style lang="less" scoped>

</style>
