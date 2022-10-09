// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/hadoopmanagment',
    children: [
      {
        path: '/hadoopmanagment/home/Home',
        name: 'hadoopmanagment1',
        component: () => import('@/views/hadoopmanagment/home/Home'),
        meta: { title: 'menu.home', icon: 'table' }
      },
      {
        path: '/hadoopmanagment',
        name: 'hadoopmanagment2',
        component: RouteView,
        redirect: '/hadoopmanagment/hadooplist',
        meta: { title: 'menu.data', icon: 'file' },
        children: [
          {
            path: '/hadoopmanagment/hadooplist',
            name: 'Hadooplist',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/hadooplist/List'),
            meta: { title: 'menu.data.generate', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/hadoopintall',
            name: 'Hadoopinstall',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/hadoopinstall/history'),
            meta: { title: 'menu.data.history', keepAlive: true }
          }

        ]
      },
      {
        path: '/hadoopmanagmen/databar/data1',
        name: 'data1',
        component: RouteView,
        meta: { title: 'menu.data.bar', icon: 'desktop' },
        children: [
          {
            path: '/hadoopmanagment/databar/data1',
            name: 'data1',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/data1'),
            meta: { title: 'menu.data.zhanshi', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/ziying',
            name: 'ziying',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/ziying'),
            meta: { title: 'menu.data.ziying', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/shuaxin',
            name: 'shuaxin',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/shuaxin'),
            meta: { title: 'menu.data.shuaxin', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/shangshi',
            name: 'shangshi',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/shangshi'),
            meta: { title: 'menu.data.shangshi', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/xiaoliang',
            name: 'xiaoliang',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/xiaoliang'),
            meta: { title: 'menu.data.xiaoliang', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/zhongliang',
            name: 'zhongliang',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/zhongliang'),
            meta: { title: 'menu.data.zhongliang', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/pinglun',
            name: 'pinglun',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/pinglun'),
            meta: { title: 'menu.data.pinglun', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/xiangsu',
            name: 'xiangsu',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/xiangsu'),
            meta: { title: 'menu.data.xiangsu', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/dianchi',
            name: 'dianchi',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/dianchi'),
            meta: { title: 'menu.data.dianchi', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/chongdian',
            name: 'chongdian',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/chongdian'),
            meta: { title: 'menu.data.chongdian', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/xitong',
            name: 'xitong',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/xitong'),
            meta: { title: 'menu.data.xitong', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/databar/pinpai',
            name: 'pinpai',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/databar/pinpai'),
            meta: { title: 'menu.data.pinpai', keepAlive: true }
          }

        ]
      }

    ]

  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
