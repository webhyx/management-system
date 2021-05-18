<template>
  <div class="manage">
    <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel = "operateFormLabel" :form = "operateForm"></common-form>
      <div slot="footer" class="dialog-footer">
      <el-button @click="isShow">取 消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary">新增</el-button>
      <!-- inline默认传入， -->
      <common-form inline :formLabel="formLabel" :form="searchFrom">
        <!-- 这里的Button是插槽内容？？默认的不需要用slot=??? -->
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
      <common-table :tableData="tableData" :tableLabel = "tableLabel" :config="config" @changePage="getList" @edit="editUser" @del="delUser"></common-table>
  </div>
</template>

<script>
import CommonForm from '../../components/content/CommonForm'
import CommonTable from '../../components/content/CommonTable'
export default { 
  components: {
    CommonForm,
    CommonTable 
  },
  data() {
    return {
      searchFrom:{
        keyword: ''
      },
      formLabel:[
        {
          model: 'keyword',
          label: ''
        }
      ],
      // 具体数据
      tableData:[],
      //配置
      config:{
        page:1,
        total:30,
        loading:false
      },
      // 列头数据，看mock中的数据
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        }, 
        {
          prop:'age',
          label:'年龄'
        },
               {
          prop:'sexLabel',
          label:'性别'
        },
               {
          prop:'birth',
          label:'出生日期',
          width:200
        },
               {
          prop:'addr',
          label:'地址',
          width:320
        },
      ],
      /* dialog部分 */
      isShow:false,
      operateType:'add',
      operateForm:{
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      },
      operateFormLabel:[
        {
          model:'name',
          label:'姓名'
        },
         {
          model:'age',
          label:'年龄'
        },
         {
          model:'sex',
          label:'性别',
          type:'select',
          opts:[
            {
              label:'男',
              value:1
            },
            {
              label:'女',
              value:0
            }
          ]
        },
         {
          model:'birth',
          label:'出生日期',
          type:'date'
        },
         {
          model:'addr',
          label:'地址'
        },
      ]

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.config.loading = true
      this.$http.get('/api/user/getUser',{
        params:{
          page:this.config.page
        }
      }).then(res => {
        this.tableData = res.data.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女':'男'
          return item
        })
        this.config.total = res.data.count
        this.config.loading = false
      })
    },
    changePage(val) {
      console.log(val);
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      // console.log(row);
      this.operateForm = row
    },
    //编辑完成后确认提交
    confirm(){
      if(this.operateType === 'edit'){
        this.$http.post('/api/user/edit',this.operateForm).then(res => {
          console.log(res.data);
          this.isShow = false
          // 修改成功后要刷新
          this.getList()
        })
      }
    },
    delUser(row){
      
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = row.id
          this.$http.get('/api/user/del',{
            params:{
              id
            }
          }).then(res => {
            console.log(res.data);
            this.getList()
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/common';
</style>