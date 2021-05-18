 <template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名(admin)">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码(123456)">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post('api/permission/getMenu', this.form).then(res => {
        //正确用户名：admin,密码：123456
        res = res.data
        console.log(res);
        if (res.code === 20000) {
          // 每次登录都清除vuex中存储的菜单栏信息和cookie
          this.$store.commit('tab/clearMenu')
          // 数据请求来的个人menu信息传入vuex的tab中
          this.$store.commit('tab/setMenu', res.data.menu)
          // 数据请求来的个人token信息传入vuex的user中，设置为cookie
          this.$store.commit('user/setToken', res.data.token)
          // 将路由实例对象传入vuex的addMenu方法作，处理完后作为动态路由修改
          this.$store.commit('tab/addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          // element 全局注册的message对象
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  margin: auto;
  padding: 45px;
  height: 450px;
  background-color: #fff;
}
</style>
