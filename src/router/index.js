import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import store from "@/store"

Vue.use(Router)

let router = new Router({
  linkActiveClass:"activ",
  routes: [
 
    {
      path: '/login',
      name:"Login",
      meta:{title:"登录"},
      component: ()=>import ("@/Views/Login"),
     
    },
    {
      path: '/',
     
      meta:{needLogin:true,title:'嘻哈管理系统'},
      component: ()=>import ("@/Views/Layout"),
      redirect: "/index",
      children:[
        {
          path:'/index',
          name:"Index",
          meta:{needLogin:true,title:'后台首页'},
          component: ()=>import ("@/Views/Index"),
        },
        {
          path:'/menu',
          meta:{needLogin:true,title:'菜单管理'},
          component: ()=>import ("@/Views/Shstem/Menu"),
        },
        {
          path:'/role',
          meta:{needLogin:true,title:'角色管理'},
          component: ()=>import ("@/Views/Shstem/Role"),
        },
        {
          path:'/user',
          meta:{needLogin:true,title:'管理员管理'},
          component: ()=>import ("@/Views/Shstem/User"),
        },
        {
          path:'/banner',
          meta:{needLogin:true,title:'轮播管理'},
          component: ()=>import ("@/Views/Shop/Banner"),
        },
        {
          path:'/category',
          meta:{needLogin:true,title:'商品分类'},
          component: ()=>import ("@/Views/Shop/Category"),
        },
        {
          path:'/goods',
          meta:{needLogin:true,title:'商品管理'},
          component: ()=>import ("@/Views/Shop/Goods"),
        },
        {
          path:'/member',
          meta:{needLogin:true,title:'会员管理'},
          component: ()=>import ("@/Views/Shop/Member"),
        },
        {
          path:'/seckill',
          meta:{needLogin:true,title:'秒杀管理'},
          component: ()=>import ("@/Views/Shop/Seckill"),
        },
        {
          path:'/specs',
          meta:{needLogin:true,title:'商品规格'},
          component: ()=>import ("@/Views/Shop/Specs"),
        },
      ]
     
    }
  ]
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if (to.path=="/login"){  // 1、要去的地址是登录页面！
    document.title = to.meta.title
    next();   
  }else{  // 2、不是登录页面！就需要判断是否登录了！登录了才可以访问！
    if(localStorage.getItem("userinfo")){  // 登录了！
      let whiteList = store.getters['user/menus_url'];
      whiteList.push('/index')
      if(whiteList.includes(to.path)){  // 去的地址在 该用户可以访问的地址池中！
        document.title = to.meta.title
        next();
      }
    }else{ // 没有登录就想访问是直接跳转到登录页面！
      next('/login')
    }
  }
})
export default router