import axios from 'axios'

const service = axios.create({
  timeout:3000
})

//拦截器：拦截每一次你的请求和响应，然后进行相应的处理
// 添加请求拦截器,每次请求数据前，进行处理
service.interceptors.request.use(
config => {
  return config
},err => {
  console.log(err);
} )
//添加响应拦截器，对响应得到的数据进行处理
service.interceptors.response.use(
response => {
  let res = {}
  res.status = response.status
  res.data = response.data
  return res 
}, err => {
  console.log(err);
})

// 记得输出出去
export default service