import Cookie from 'js-cookie'
  const state = {
    menu:[],
    currentMenu:null,
    tabList:[
      {
        path:'/',
        label:'首页',
        name:'home',
        icon:'monitor'
      }
    ],
    isCollapse:false
  }
  const mutations = {
    // 配置个人菜单信息
    setMenu(state,val){
      state.menu = val 
      Cookie.set('menu',JSON.stringify(val))
      console.log(val,'vuex');
    },
    //清除菜单信息
    clearMenu(state){
      state.menu = [],
      Cookie.remove('menu')
    },
    // 动态路由的方法：router.addRoutes
    // 传入路由实例对象作为参数
    addMenu(state,router){
      if(!Cookie.get('menu')) {
        return 
      }
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      let currentMenu = [
        {
          path:'/',
          component: () => import(`@/views/Main`),
          children:[]
        },
      ]
      menu.forEach(item => { // forEach会对数组每个元素都执行一次回调函数
        if(item.children){
          item.children = item.children.map(item => {
            //es6语法 字符串内拼接变量
            item.component = () => import(`@/views/${item.url}`)
            return item   // 将结果返回到item.children数组中，很重要，没有return不会将数组改变
          })
          currentMenu[0].children.push(...item.children)
        }else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      console.log(currentMenu,'cur');
      router.addRoutes(currentMenu)
    },
    //1.点击left-side中的菜单栏在Header中显示对应名称
    //2.点击left-side中的菜单栏将对应名称加入tag标签中
    selectMenu(state,payload){
      if(payload.label !== '首页'){
        state.currentMenu = payload.label 
        //去重，防止点击重复显示多个相同标签,使用findIndex方法. 如果找到符合条件的，返回该数组索引值，没找到返回-1
        //区别find函数，find函数返回的是数组元素，不是元素下标，没找到返回undefined
        //filters，是创建一个新的数组，将所有满足条件的元素放入这个数组
        state.tabList.findIndex(val => val.label===payload.label) ==-1 ? state.tabList.push(payload) : ''
        
      } else {
        state.currentMenu = null
      }
      
    },
    closeTab(state,payload){
      //删除tags标签，传入的标签名,找到对应数组下标，用splice函数删除该数组元素
      //区别slice,slice方法是返回一个新的数组，原来的数组是不会改变的。
      let fingTag = state.tabList.findIndex(val => val.label === payload.label)
      state.tabList.splice(fingTag,1)
    },
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    }
  }

  export default {
    namespaced: true,//必须加它不然报错
    state,
    mutations
  }