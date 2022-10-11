<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' , height:'60px'}" :bordered="false"><span style="font-weight: 600">第一次生成的数据</span>
    </a-card >
    <div style="width:900px;height: 200px;" >
      <a-card hoverable style="width:200px" @click="show1">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="自营与非自营的的比例" >
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -266px;left: 250px;" @click="show2">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="刷新率前五">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -534px;left: 490px;" @click="show3">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="上市时间后十">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -801px;left: 730px;" @click="show4">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="商品销量前十">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -1066px;left: 980px;" @click="show5">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="重量最轻前十">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -1040px;left: 0px;" @click="show6">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="商品评论数前十">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -1305px;left: 250px;" @click="show7">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="摄像头像素前五">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -1571px;left: 490px;" @click="show8">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="手机电池容量前十">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -1839px;left: 730px;" @click="show9">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="手机充电功率前十">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -2106px;left: 980px;" @click="show10">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="手机系统">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
      <a-card hoverable style="width:200px;top: -2076px;left:0px;" @click="show11">
        <img
          slot="cover"
          alt="example"
          src="~@/assets/jdlogo.jpg"
        />
        <a-card-meta title="手机品牌">
          <template slot="description">
            www.jd.com
          </template>
        </a-card-meta>
      </a-card>
    </div>

  </page-header-wrapper>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },

methods: {
    show1 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'ziying' })
    },
    show2 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'shuaxin' })
    },
    show3 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'shangshi' })
    },
    show4 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'xiaoliang' })
    },
    show5 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'zhongliang' })
    },
    show6 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'pinglun' })
    },
    show7 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'xiangsu' })
    },
    show8 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'dianchi' })
    },
    show9 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'chongdian' })
    },
    show10 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'xitong' })
    },
    show11 () {
      //  对应router目录下index.js中定义的name
    this.$router.push({ name: 'pinpai' })
    }
}
}
</script>
