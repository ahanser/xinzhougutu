import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 基础继承组件
import Layout from '../views/layout/Layout'
import Layout1 from '../views/layout/Layout1'

export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },

  {
    path: '/set',
    component: Layout1,
    children: [{ //资源目录
        path: 'systemSetting',
        component: () => import('@/views/share/system/systemSetting/index')
      }, //成果展示
      {
        path: 'systemResult',
        component: () => import('@/views/share/system/systemResult/index')
      }, //服务基本信息
      {
        path: 'serveBaseInfo',
        component: () => import('@/views/share/system/systemServe/serveBaseInfo')
      }, //服务信息详情
      {
        path: 'serverShowInfo',
        component: () => import('@/views/share/system/systemServe/serverShowInfo')
      },




    ]
  },

  {
    path: '/',
    component: Layout,
    name: 'index',
    redirect: '/homePage/index',
    children: [{ //主页
        path: '/homePage/index',
        component: () => import('@/views/share/homePage/index')
      },
      //资源目录
      {
        path: '/resources/map',
        component: () => import('@/views/share/resources/map/index')
      },
      {
        path: '/resources/query',
        component: () => import('@/views/share/resources/query/index')
      },
      {
        path: '/resources/order',
        component: () => import('@/views/share/resources/order/index')
      },

      //成果展示
      {
        path: '/result/resultShow',
        component: () => import('@/views/share/result/resultShow/index')
      },

      //专题应用
      {
        path: '/project/basicFarmland',
        component: () => import('@/views/share/project/basicFarmland/index')
      },
      {
        path: '/project/constructionLand',
        component: () => import('@/views/share/project/constructionLand/index')
      },

      //服务管理
      {
        path: '/service/serviceList',
        component: () => import('@/views/share/service/serviceList/index')
      },
      {
        path: '/service/serviceDetails',
        component: () => import('@/views/share/service/serviceDetails/index')
      },
      {
        path: '/service/mapApi',
        component: () => import('@/views/share/service/mapApi/index')
      },
      //系统设置
      {
        path: '/system/systemSetting',
        component: () => import('@/views/share/system/systemSetting/index')
      }
    ]
  },



  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
