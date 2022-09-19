<template>
  <a-upload
    :accept="accept"
    list-type="picture-card"
    :file-list="value"
    class="file-upload"
    @change="handleChange"
    :custom-request="handleUpload"
  >
    <div v-if="!max || value.length < max">
      <a-icon type="plus" />
      <div class="ant-upload-text">{{ uploadText }}</div>
    </div>
  </a-upload>
</template>
<script>
import { uplodaFile } from './tools'
// import videoIcon from '@/assets/place/video.png'
// import musicIcon from '@/assets/place/music.png'

export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'image'
    },
    max: {
      type: Number,
      default: undefined
    },
    uploadText: {
      type: String,
      default: '上传图片'
    },
    path: {
      type: String,
      default: 'system'
    }
  },
  name: 'ItranlinUpload',
  created () {
    switch (this.mode) {
      case 'video': {
        this.accept = 'video/*'
        break
      }
      case 'audio': {
        this.accept = 'audio/*'
        break
      }
      case 'image': {
        this.accept = 'image/*'
        break
      }
      default: {
        this.accept = this.mode
        break
      }
    }
  },
  data () {
    return {
      accept: ''
    }
  },
  methods: {
    handleRemove () {
      console.log(this.value)
    },
    handleUpload (options) {
      uplodaFile(options, this.path)
    },
    handleChange ({ fileList }) {
      fileList.forEach((element) => {
        if (element.response) {
          element.url = element.response
        }
      })
      this.$emit('change', fileList)
      this.$emit('input', fileList)
    }
  }
}
</script>
<style lang="less" scoped>
.file-upload {
  /deep/ .ant-upload-list-picture-card-container {
    width: 80px;
    height: 80px;
    .ant-upload-list-item-list-type-picture-card {
      width: 80px !important;
      height: 80px !important;
    }
  }
  /deep/ .ant-upload-select-picture-card {
    width: 80px;
    height: 80px;
  }
}
</style>
