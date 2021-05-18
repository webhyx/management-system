<template>
  <header>
    <div class="l-content">
      <el-button type="primary" icon='el-icon-menu' size="mini" @click="collaspeMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item ><a href="/">{{current}}</a></el-breadcrumb-item>         
      </el-breadcrumb>  
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img  class="userImage" :src="userImage" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >个人中心</el-dropdown-item>
          <!-- 直接获取组件 -->
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
//  import { createNamespacedHelpers } from 'vuex'
//  const { mapState } = createNamespacedHelpers('tab')
import { mapState } from 'vuex'
export default {
  created() {
    // console.log(this.$store.state.tab.currentMenu);

  },
  data() {
    return {
      userImage: require('../../assets/images/user.png')
    }
  },
  computed:{
    /* 对象展开运算符，mapState函数返回的是对象，混入computed中，vuex中的tab模块的state的currentMenu属性 */
     ...mapState({
       current: val => val.tab.currentMenu
     }),
},
  methods: {
    collaspeMenu(){
      console.log(this.$store.state.tab.isCollapse);
      this.$store.commit('tab/collapseMenu')
    },
    logOut(){
      this.$store.commit('user/clearToken')
      this.$store.commit('tab/clearMenu')
      // ???location
      location.reload()
    }
  },
}
</script>

<style scoped >
  header{
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .r-content {
    transform: translate(0,12.75px);
  }
   .userImage {
    height: 46px;
    width: 46px;
    border-radius: 50%;
   }
  
  .l-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .l-content .el-button {
    margin-right: 15px;
  }
 
</style>
/* 这里的样式要单独用scss？ */
<style lang="scss">
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
   color: #fff; 
  }
  .el-breadcrumb__separator {
    color: #fff;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a{
    color: #fff;
  }
</style>
