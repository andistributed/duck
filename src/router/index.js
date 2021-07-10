import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Login from '@/views/Login'
import NotFound from '@/views/404'
import VueRouter from 'vue-router';


const routes = [
    { path: '/login', component: Login, hidden: true },
    { path: '/404', component: NotFound ,hidden: true},
    {
        path: '/',
        component: () => import('@/views/Home.vue'),
        name: '配置中心',
        redirect:'/main',
        iconCls: 'fa fa-codepen fa-lg', // 图标样式class
        children: [
          { path: '/main', iconCls: 'fa fa-dashboard fa-lg', component: () => import('@/views/Main.vue'), name: '主页', hidden: true },
          { path: '/conf/job',iconCls: 'fa fa-tasks fa-lg', component: () => import('@/views/conf/Job.vue'), name: '任务配置' },
          { path: '/conf/group',iconCls: 'fa fa-object-group fa-lg', component: () => import('@/views/conf/Group.vue'), name: '集群配置' }
        ]
      }, {
        path: '/',
        component: () => import('@/views/Home.vue'),
        name: '监控中心',
        iconCls: 'fa fa-empire fa-lg', // 图标样式class
        children: [
          { path: '/monitor/plan',     iconCls:'fa fa-first-order fa-lg',  component: () => import('@/views/monitor/Plan.vue'), name: '执行计划' },
          { path: '/monitor/node',iconCls: 'fa fa-hourglass-start fa-lg', component: () => import('@/views/monitor/Node.vue'), name: '调度集群' },
          { path: '/monitor/snapshot',iconCls: 'fa fa-heartbeat fa-lg', component: () => import('@/views/monitor/Snapshot.vue'), name: '任务快照' },
          { path: '/monitor/execute/snapshot',iconCls: 'fa fa-free-code-camp fa-lg', component: () => import('@/views/monitor/Execute.vue'), name: '作业快照' }

        ]
      }

  ]

const router = new VueRouter({
  routes
});

/// 全局路由守卫
// 所有的路由都会先走守卫
// 添加导航守卫之后，不管是访问哪个路由，都会执行这个回调函数中的代码
// 因为所有的路由，都会经过该导航守卫，所以就可以在这个导航守卫的回调函数中，判断有没有登录
router.beforeEach((to, from, next) => {//to去哪里    from从哪来   next放行
  if(to.path === '/login'){
      next()
      return;
  }
  // 如果访问的不是login页面，先判断有没有登录，如果已经登录直接调用next()方法，如果没有跳转login页面
  // 通过登录成功时候保存的token，来作为判断有没有登录成功的条件
  const token = localStorage.getItem('token')
  if(token){ // 登录成功
    next()
    return;
  }
  // 登录失败
  next('/login')
});
// */

export default router;
