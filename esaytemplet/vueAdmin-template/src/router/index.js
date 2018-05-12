import Vue from 'vue'
import Router from 'vue-router'

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
  
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'sitemap' }
    }]
  },
    {
    path: '/stack',
    component: Layout,
    meta: { title: '微服务管理', icon: 'sitemap' },
    children: [
      {
        path: 'index',
        name: '微服务',
        component: () => import('@/views/stack/index'),
        meta: { title: '微服务', icon: 'sitemap' }
      },
      {
        path: 'addstack',
        name: '新增组',
        component: () => import('@/views/stack/addstack'),
        meta: { title: '新增组', icon: 'add' }
      },
      {
        path: 'add',
        name: '开容器',
        hidden:true,
        component: () => import('@/views/stack/add'),
        meta: { title: '开容器', icon: 'sitemap' }
      }, 
      {
        path: 'stackinfo',
        name: '微服务组',
        hidden:true,
        component: () => import('@/views/stack/stackinfo'),
        meta: { title: '微服务组', icon: 'sitemap' }
      },
      {
        path: 'clone',
        name: '复制容器',
        hidden:true,
        component: () => import('@/views/stack/clone'),
        meta: { title: '复制容器', icon: 'sitemap' }
      },
      {
        path: 'addlb',
        name: '添加负载均衡',
        hidden:true,
        component: () => import('@/views/stack/addlb'),
        meta: { title: '添加负载均衡', icon: 'sitemap' }
      },
      {
        path: 'serviceinfo',
        name: '容器详细',
        hidden:true,
        component: () => import('@/views/stack/serviceinfo'),
        meta: { title: '容器详细', icon: 'sitemap' }
      },
      {
        path: 'upgrade',
        name: '容器升级',
        hidden:true,
        component: () => import('@/views/stack/upgrade'),
        meta: { title: '容器详细', icon: 'sitemap' }
      },
      {
        path: 'editlb',
        name: '编辑负载',
        hidden:true,
        component: () => import('@/views/stack/components/editlb'),
        meta: { title: '容器详细', icon: 'sitemap' }
      }
    ]
  },
    {
    path: '/host',
    component: Layout,
    meta: { title: '主机管理', icon: 'host' },
    children: [
      {
        path: 'index',
        name: '主机管理',
        component: () => import('@/views/host/index'),
        meta: { title: '主机管理', icon: 'host' }
      },
       {
        path: 'containers',
        name: '容器管理',
        hidden:true,
        component: () => import('@/views/host/containers'),
        meta: { title: '容器管理', icon: 'containerservice' }
      },
      {
        path: 'addhost',
        name: '注册主机',
        component: () => import('@/views/host/addhost'),
        meta: { title: '注册主机', icon: 'add' }
      },
      {
        path: 'hostinfo',
        name: '主机详情',
        hidden:'true',
        component: () => import('@/views/host/hostinfo'),
        meta: { title: '主机详情', icon: 'add' }
      }
    ]
  },
  {
    path: '/chat',
    component: Layout,
    redirect: '/example/table',
    name: '运维监控',
    meta: { title: '运维监控', icon: 'count' },
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
    path: '/plug',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '云组件',
        component: () => import('@/views/form/index'),
        meta: { title: '云组件', icon: 'sale' },
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    meta: { title: '系统管理', icon: 'sys' },
    children: [
      {
        path: 'index',
        name: '系统设置',
        component: () => import('@/views/system/set'),
        meta: { title: '系统设置', icon: 'sys' }
      },{
        path: 'admin',
        name: '账号管理',
        component: () => import('@/views/system/admin'),
        meta: { title: '账号管理', icon: 'user' }
      },{
        path: 'adduser',
        name: '添加管理',
        component: () => import('@/views/system/adduser'),
        meta: { title: '添加管理', icon: 'user' }
      },{
        path: 'edituser',
        name: '修改用户',
        hidden:true,
        component: () => import('@/views/system/edituser'),
        meta: { title: '修改用户', icon: 'user' }
      },

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

