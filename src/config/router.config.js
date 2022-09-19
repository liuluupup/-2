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
        path: '/hadoopmanagment',
        name: 'hadoopmanagment',
        component: RouteView,
        redirect: '/hadoopmanagment/hadooplist',
        meta: { title: 'menu.hadoopmanagment', icon: 'table' },
        children: [
          {
            path: '/hadoopmanagment/hadooplist',
            name: 'Hadooplist',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/hadooplist/List'),
            meta: { title: 'menu.hadoopmanagment.hadooplist', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/hadoopdetails/:id?',
            name: 'Hadoopdetails',
            hidden: true,
            component: () => import('@/views/hadoopmanagment/hadoopdetails/Details/'),
            meta: { title: 'menu.hadoopmanagment.hadoopdetails', keepAlive: true }
          },
          {
            path: '/hadoopmanagment/hadoopintall',
            name: 'Hadoopinstall',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/hadoopinstall/Install'),
            meta: { title: 'menu.hadoopmanagment.hadoopintall', keepAlive: true }

          },
          {
            path: '/hadoopmanagment/hadoopverification',
            name: 'verification',
            hideChildrenInMenu: true,
            component: () => import('@/views/hadoopmanagment/hadoopverification/Verification'),
            meta: { title: 'menu.hadoopmanagment.hadoopverification', keepAlive: true }
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
