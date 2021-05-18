import Cookie from 'js-cookie'

  const state =  {
    token:''
  }
  const mutations = {
    setToken(state,val){
      state.token = val
      Cookie.set('token',val)
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')
    },
    // 刷新的时候vuex的token会消失
    getToken(state) {
      state.token = Cookie.get('token')
    }
  }


export default {
  namespaced: true,//必须加它不然报错,会不认识user/getToken等形式
  state,
  mutations
}