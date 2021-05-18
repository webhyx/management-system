<template>
  <div class="tags">
    <el-tag
    size="small"
    :closable="tag.label !=='首页'"
  :key="index"
  v-for="(tag,index) in tags"
  :disable-transitions="false"
  @close="handleClose(tag)"
  @click="TagChangeMenu(tag)"
  :effect="$route.name === tag.name ? 'dark':'plain'">
  {{tag.label}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
data() {
      return {
        inputVisible: false,
        inputValue: ''
      };
    },
    computed:{
      ...mapState({
        tags:state => state.tab.tabList
      })
    },
    methods: {
      ...mapMutations({
        //要用模块名/方法来表示方法
        close:'tab/closeTab'
      }),
     handleClose(item) {
       //直接在这调用已创建的方法
       this.close(item)
     },
    TagChangeMenu(item){
      //-------这个要在动态路由的时候用（/route/:id）---------
      // console.log(this.$route.params.name);
      // if(this.$route.params.name !== 'item'){
      //   this.$router.push({name:item.name})
      // }
      if(this.$route.path !== item.path){
        this.$router.push({name:item.name})
      }
      this.$store.commit('tab/selectMenu',item)
    }
    }
}
</script>

<style lang="scss" scoped>
.tags {
  padding: 8px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>