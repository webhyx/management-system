import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 权限管理
// const Main = () => import("../views/Main.vue")
// const CommonAside = () => import("../components/content/CommonAside.vue")
// const CommonHeader = () => import("../components/content/CommonHeader.vue")

// const Home = () => import("../views/Home/Home.vue")
// const UserManage = () => import("../views/UserManage/UserManage.vue")
// const VideoManage = () => import("../views/VideoManage/VideoManage.vue")
// const PageOne = () => import("../views/Other/PageOne.vue")
// const PageTwo = () => import("../views/Other/PageTwo.vue")
const Login = () => import("../views/Login/Login.vue")


const routes = [
  // {
  //   path:'/',
  //   redirect:'/Main'
  // },
  // {
  //   path:'/Main',   
  //   name:'main',
  //   component:Main,
  //   children:[
  //     {
  //       path:'/',
  //       name:'home',
  //       component:Home
  //     },
  //     {
  //       path:'/user',
  //       name:'user',
  //       component:UserManage
  //     },
  //     {
  //       path:'/video',
  //       name:'video',
  //       component:VideoManage
  //     },
  //     {
  //       path:'/page1',
  //       name:'page1',
  //       component:PageOne
  //     },
  //     {
  //       path:'/page2',
  //       name:'page2',
  //       component:PageTwo
  //     },
  //   ]
  // },
  // {
  //   path:'/CommonAside',
  //   component:CommonAside
  // },
  // {
  //   path:'/CommonHeader',
  //   component:CommonHeader
  // },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
