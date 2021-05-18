<template>
 <div class="common-table">
     <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
    <el-table-column
      label="序号"
      width="100">
      <template slot-scope="scope"> <!-- scope使template内部的变量暴露出来，就是传入的数据，使得eltablecolumn可以使用 -->
        <span style="margin-left: 10px">{{ (config.page -1)*20 + scope.$index +1 }}</span>
      </template>
    </el-table-column>
    <el-table-column  show-overflow-tooltip  v-for="item in tableLabel" :key="item.prop" :label="item.label" :width="item.width ? item.width : 125">
      <template slot-scope="scope">
          <span style="margin-left:10px">{{ scope.row[item.prop] }}</span>
      </template>
    </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table> 
  <el-pagination
    layout="prev, pager, next"
    :total="config.total"
    :current-page.sync="config.page"
    @current-change="changePage">
  </el-pagination>
 </div>
</template> 

<script>
export default {
  props: {
    tableData:{
      type:Array,
      default(){
        return []
      }
    },
    tableLabel:{
      type:Array,
      default(){
        return []
      }
    },
    config:Object
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit',row)
    },
    handleDelete(row){
      this.$emit('del',row)
    },
    /* ！！！！！emit 忘了很多 */
    changePage(page){
      this.$emit('changePage',page)
    }
  }, 
}
</script>

<style scoped lang="scss">
  .common-table {
    height: calc(100% - 60px);
    background-color: #fff;
    position: relative;
    .el-pagination {
      position: absolute;
      bottom: 7px;
      right: 0px;
    }
  }
</style>