<template>
   <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      >
      <!-- :collapse="isCollapse" -->
       <el-menu-item :index="nochildItem.path" v-for="(nochildItem,index) in noChildPage" :key="'nochildItem'+index" @click="clickMenu(nochildItem)"> 
        <i :class="'el-icon-'+nochildItem.icon"></i>
        <span slot="title">{{nochildItem.label}}</span>
      </el-menu-item>
      <el-submenu :index="haschildItem.path" v-for="(haschildItem,index) in hasChildPage" :key="'haschileItem'+index" >
        <template slot="title">
        <i :class="'el-icon-'+haschildItem.icon"></i>
        <span slot="title">{{haschildItem.label}}</span>
        </template>
        <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in haschildItem.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
      </el-submenu>
     
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuInfo:[
        {
          path:'/',
          label:'首页',
          name:'home',
          icon:'monitor'
        },
        {
          path:'/video',
          label:'视频管理',
          name:'video',
          icon:'video-play'
        },
        {
          path:'/user',
          label:'用户管理',
          name:'user',
          icon:'user'
        },
        {
          path:'/other',
          label:'其他',
          icon:'setting',
          children:[
            {
            path:'/other1',
            label:'页面一',
            name:'page1',
            icon:'setting'
          },
          {
            path:'/other2',
            label:'页面二',
            name:'page2',
            icon:'setting'
          }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu(item){
      this.$router.push({name:item.name})
      //多次点击相同的会报错，可降低router版本解决 
      console.log(item);
      this.$store.commit('tab/selectMenu',item)
    }
  },
  computed:{
    hasChildPage(){
      return this.menu.filter(item => item.children)
    },
    noChildPage(){
      return this.menu.filter(item => !item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    // 用户登录后的菜单
    menu(){
      return this.$store.state.tab.menu
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-menu { 
    border: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } 
</style>