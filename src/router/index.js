import Vue from 'vue'
import Router from 'vue-router'
/* import { getHidden } from '@/utils/auth'*/

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/register', component: () => import('@/views/register/register'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '主页', icon: 'dashboard', noCache: true }
    }]
  },

  {
    path: '/example',
    component: Layout,
    hidden: true,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/document',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Document',
        component: () => import('@/views/document/index'),
        meta: { title: '标注', icon: 'form' }
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id',
        name: 'Tag',
        component: () => import('@/views/tag/index'),
        meta: { title: '标注', icon: 'form' }
      }
    ]
  },

  {
    path: '/check',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Check',
        component: () => import('@/views/check/index'),
        meta: { title: '审阅', icon: 'example' }
      }
    ]
  },
  {
    path: '/review',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id',
        name: 'Review',
        component: () => import('@/views/review/index'),
        meta: { title: '审阅', icon: 'example' }
      }
    ]
  },
  {
    path: '/progress',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'progressDetail',
        component: () => import('@/views/progress/index'),
        meta: { title: '进度', icon: 'processLogo' }
      }
    ]
  },
  {
    path: '/conflict',
    component: Layout,
    /* hidden: getHidden() === 'true' ? true : false,*/
    children: [
      {
        path: 'index',
        name: 'Conflict',
        component: () => import('@/views/conflict/index'),
        meta: { title: '冲突', icon: 'bug' }
      }
    ]
  },
  {
    path: '/conflictDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index/:id/:cId',
        name: 'ConflictDetails',
        component: () => import('@/views/conflictDetails/index'),
        meta: { title: '冲突', icon: 'bug' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  /* {
    path: '/conflict',
    component: Layout,
    meta: {
      title: '冲突',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'Conflict',
        component: () => import('@/views/conflict/index'),
        meta: { title: '冲突', icon: 'bug', roles: ['admin'] }
      }
    ]
  }*/
]
