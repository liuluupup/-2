<template>
  <page-header-wrapper>
    <a-card :bordered="false" style="height:600px">
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="dataForm">
          <a-row :gutter="20">
            <a-col :span="12">
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item style="font-weight: 600;" label="数据数量">
                    <a-input v-decorator="['num']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item style="font-weight: 600;" label="品牌">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('brandRandom')) && dataForm.getFieldValue('brandRandom')[0] === true" v-decorator="['brand']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <a-checkbox-group v-decorator="['brandRandom']">
                      <a-checkbox :value="true">
                        随机生成
                      </a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item style="font-weight: 600;" label="SIM卡数量"></a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <a-checkbox-group v-decorator="['simRandom']">
                      <a-checkbox :value="true">
                        随机生成
                      </a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item label="1个">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('simRandom')) && dataForm.getFieldValue('simRandom')[0] === true" v-decorator="['sim1']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item label="2个">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('simRandom')) && dataForm.getFieldValue('simRandom')[0] === true" v-decorator="['sim2']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="12">
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item style="font-weight: 600;" label="任务名称">
                    <a-input v-decorator="['name']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item style="font-weight: 600;" label="机型">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('modelRandom')) && dataForm.getFieldValue('modelRandom')[0] === true" v-decorator="['model']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <a-checkbox-group v-decorator="['modelRandom']">
                      <a-checkbox :value="true">
                        随机生成
                      </a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item style="font-weight: 600;" label="系统">
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <a-checkbox-group v-decorator="['systemRandom']">
                      <a-checkbox :value="true">
                        随机生成
                      </a-checkbox>
                    </a-checkbox-group>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item label="安卓">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('systemRandom')) && dataForm.getFieldValue('systemRandom')[0] === true" v-decorator="['android']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item label="鸿蒙">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('systemRandom')) && dataForm.getFieldValue('systemRandom')[0] === true" v-decorator="['hamous']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item label="ios">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('systemRandom')) && dataForm.getFieldValue('systemRandom')[0] === true" v-decorator="['ios']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-col :span="18">
                  <a-form-item label="功能机">
                    <a-input :disabled="Array.isArray(dataForm.getFieldValue('systemRandom')) && dataForm.getFieldValue('systemRandom')[0] === true" v-decorator="['other']" placeholder="请输入内容"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="20" align="middle">
                <a-button type="primary" @click="handleAdd">
                  生成
                </a-button>
              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

    <script>
    import { makedata } from '@/api/hadoop/hadoop'

    export default {
      components: {
      },
      data () {
        return {
          current: 2,
          hadoopformModalTitle: '生成',
          dataForm: this.$form.createForm(this, {
            brandRandom: [],
            simRandom: [],
            modelRandom: [],
            systemRandom: []
          }),
          checkedValues: [],
          queryParam: {},
          hadoopData: [],
          visible: false,
          confirmLoading: false
        }
      },
      created () {},
      methods: {
        statusChange () {
          this.reloadTableData(true)
        },
        handleDetail (id) {
          this.$router.push({ path: `/hadoopmanagment/hadooplist/${id}` })
        },
        handleAdd () {
          this.dataForm.validateFields((err, values) => {
        if (!err) {
          const { num, sim1, sim2, android, hamous, ios, other, name, brand, model, brandRandom, simRandom, modelRandom, systemRandom } = values
          const formData = {
            num,
            systemPercent: systemRandom[0] !== true ? `${android};${hamous};${ios};${other}` : '0',
            simPercent: simRandom[0] !== true ? `${sim1};${sim2}` : '0',
            name,
            brand: brandRandom[0] !== true ? brand : '0',
            model: modelRandom[0] !== true ? model : '0'
          }
          makedata(formData).then((res) => {
              this.$notification.success({
                message: '成功',
                description: res.msg || `操作成功`
              })
          }).catch(err => {
            this.$notification.error({
              message: '失败',
              description: err.msg || `操作失败`
            })
          })
        } else {
          console.log(err)
        }
      })
        },
        handleCancel () {
          this.visible = false
        },
        onChange (e) {
          console.log(`checked = ${e.target.checked}`)
        }
      }
    }
    </script>
