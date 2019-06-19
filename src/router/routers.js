import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/upms',
    name: 'upms',
    meta: {
      icon: 'logo-buffer',
      title: '权限管理'
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'md-trending-up',
          title: '用户管理',
          access: ['user:list'],
          btnPerms: ['user:edit', 'user:save', 'user:delete']
        },
        component: () => import('@/view/upms/user-list.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
          icon: 'ios-infinite',
          title: '组管理',
          access: ['group:list']
        },
        component: () => import('@/view/upms/group-list.vue')
      },
      {
        path: 'resource',
        name: 'resource',
        meta: {
          icon: 'md-grid',
          title: '资源管理',
          access: ['resource:list']
        },
        component: () => import('@/view/upms/resource-mgr.vue')
      },
      {
        path: 'unit',
        name: 'unit',
        meta: {
          icon: 'md-people',
          title: '组织机构管理',
          access: ['unit:list']
        },
        component: () => import('@/view/upms/unit-list.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-settings',
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'data-category',
        name: 'dataCategory',
        meta: {
          icon: 'md-bookmarks',
          title: '字典类别管理',
          access: ['dictionary-category:list']
        },
        component: () => import('@/view/upms/dict-category-list.vue')
      },
      {
        path: 'data-dictionary',
        name: 'dataDictionary',
        meta: {
          icon: 'md-bookmarks',
          title: '数据字典管理',
          access: ['data-dictionary:list']
        },
        component: () => import('@/view/upms/dict-list.vue')
      },
      {
        path: 'schedule',
        name: 'schedule',
        meta: {
          icon: 'md-bookmarks',
          title: '定时任务',
          access: ['job:list']
        },
        component: () => import('@/view/upms/job-manager.vue')
      },
      {
        path: 'logs',
        name: 'logs',
        meta: {
          icon: 'md-bookmarks',
          title: '日志查询',
          access: ['audit:list']
        },
        component: () => import('@/view/upms/sys-logs.vue')
      },
      {
        path: 'druid',
        name: 'druid',
        meta: {
          icon: 'md-bookmarks',
          href: 'http://127.0.0.1:9080/api/druid',
          title: '数据库监控'
        }
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hide: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集',
          hideInMenu: true
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `动态路由-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `带参路由-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
