<template>
<!-- 24栏布局，8+16 gutter:间隔 -->
  <div class="Home">
    <el-row class="home">
      <!-- 左边 -->
      <el-col :span="8" style="padding-right: 5px">
        <el-card shadow="hover" >
          <div class="user">
            <img :src="userImg" alt="">
            <div class="userInfo">
              <div class="name">hyx</div>
              <div class="access">Super</div>
            </div>
          </div>
          <div class="preLogin">
            <p>上次登录时间：<span>2020-20-20</span></p>
            <p>上次登录地点：<span>广州</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:522px;margin-top:20px">
          
           <el-table size="small" :data="tableData" style="width: 100%">
           <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val"></el-table-column>
           </el-table>
          
        </el-card>
      </el-col>
      <!-- 右边 -->
      <el-col :span="16">
        <div class="num">
          <el-card class="numItem" shadow="hover" v-for="item in countData" :key="item.value" :body-style="{display:'flex',padding:'0'}" >
         <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
         <div class="detail">
           <p class="num">￥{{item.value}}</p>
           <p class="txt">{{item.name}}</p>
         </div>
        </el-card>
        </div>
        <el-card shadow="hover" style="margin:5px 0">
          <e-chart v-if="echartData.order!= null" style="height: 280px;margin:0 auto" :chartData="echartData.order" :test="test"></e-chart>
        </el-card>
        <div class="graph" >
          <el-card shadow="hover" >
          <e-chart style="height:320px;margin:auto" :chartData="echartData.user"></e-chart> 
        </el-card>
          <el-card shadow="hover">
          <e-chart style="height:340px;margin:auto" :chartData="echartData.video" :isAxisChart="false"></e-chart>
        </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EChart from '../../components/content/EChart'
export default {
  components:{
    EChart
  },
  data() {
    return {
      /* 请求的图片地址要用require */
      test:'xxx',
      userImg: require('../../assets/images/user.png'),
      countData:[
        {
          name:'今日支付',
          value:123,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日支付',
          value:223,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日支付',
          value:323,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日支付',
          value:423,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日支付',
          value:523,
          icon:'success',
          color:'#2ec7c9'
        },
        {
          name:'今日支付',
          value:623,
          icon:'success',
          color:'#2ec7c9'
        },
      ], 
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      echartData:{
        // 先定义好需要使用的初始数据
        order:{
          xData: [],
          series: []
        },
        user:{
          xData:[],
          series:[]
        },
        video:{
          series:[]
        }
      }

    }
  },
  methods: {
    getTableData(){
      this.$http.get('/home/getData').then(res => {
        console.log('getData');
        console.log(res.data.data.tableData);
        this.tableData = res.data.data.tableData
        console.log(res.data.data.orderData);
        res = res.data
        // 折线图数据
        const order = res.data.orderData
        this.echartData.order.xData = order.date
        // 折线图中data数组中每个元素的相同的数据，如vue，wechat的数据:map方法
        // 先用forEach方法取出每个数组相同的键名 ： series中的name部分的键名
        let keyArray = Object.keys(order.data[0])  //1. 取出每个键名 ["vue","wechat","ES6","Redis","React","springboot"]
        // forEach()和map()都是对数组每一个元素进行操作
        // forEach()方法不会返回执行结果，而是undefined。forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。
       keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        console.log('series--------',this.echartData.order);
        // 用户柱状图
        this.echartData.user.xData = res.data.userData.map(item => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map(item => item.new),
          type: 'bar'
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map(item => item.active),
          type: 'bar',
          barGap: 0
        })
        // 视频饼图
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie'
        })
      })
    }
  },
  created() {
    this.getTableData()
  },
  
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/home.scss'; 
</style>