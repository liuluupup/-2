<template>
  <div>
    <a-input placeholder="选择地址" v-model="value.title" @click="openMap" />
    <a-modal :forceRender="true" v-model="visible" title="地点选择" @ok="handleOk">
      <a-input placeholder="输入关键字" v-model="selectItem.title">
      </a-input>
      <div v-show="selectMode == 'search'">
        <baidu-map>
          <bm-view class="bm-view"></bm-view>
          <bm-local-search
            :panel="false"
            :keyword="searchKeyword || ''"
            :auto-viewport="true"
            :location="location"
            @markersset="markersset"
            :zoom="zoom"></bm-local-search>
        </baidu-map>
      </div>
      <div class="list">
        <a-list :data-source="searchResult">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta :description="item.address">
              <a slot="title" :href="item.href">{{ item.title }}</a>
            </a-list-item-meta>
            <a-button @click="selectPoint(item)">选择</a-button>
          </a-list-item>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>
<script>
const addressObj = {
    'adcode': 0,
    'address': 'string',
    'category': 'string',
    'city': 'string',
    'district': 'string',
    'id': 'string',
    'location': {
      'lat': 0,
      'lng': 0
    },
    'province': 'string',
    'title': 'string',
    'type': 0,
    'value': 'string'
}
export default {
    props: {
        value: {
            type: Object,
            default: () => {}
        }
    },
    name: 'ItranlinMap',
    data () {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 3,
            location: '北京',
            keyword: '百度',
            visible: false,
            selectMode: 'search',
            selectModeText: '地图选点',
            searchResult: [],
            searchKeyword: '',
            selectItem: {
              title: ''
            }
        }
    },
    watch: {
      'selectItem.title': function (val) {
        this.searchKeyword = val
      }
    },
    methods: {
      openMap () {
            this.visible = true
            this.selectItem.title = this.value.title
      },
      handleOk () {
          this.$emit('change', this.selectItem)
          this.visible = false
      },
      selectModeFun () {
          if (this.selectMode === 'map') {
              this.selectMode = 'search'
              this.selectModeText = '地图选点'
          } else {
              this.selectMode = 'map'
              this.selectModeText = '搜索选点'
          }
      },
      markersset (e) {
          e.forEach(element => {
              element.location = element.pointN
          })
          this.searchResult = e
      },
      selectPoint (item) {
          const itemCopy = {}
          Object.keys(addressObj).forEach((k) => {
              itemCopy[k] = item[k]
          })
          this.selectItem = itemCopy
      }
    }
}
</script>
<style lang="less" scoped>
.bm-view {
  width: 90%;
  height: 400px;
  position: absolute;
    z-index: -1;
}
.list{
    height: 400px;
    overflow: overlay;
}
</style>
