<template>
  <div>
    <div style="height: 100%;width: 100%" ref="echart" id="EC"></div>
    
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props:{
    chartData:{
      type:Object,
      /* 要用函数形式 */
      default(){
        return {
          xData:[],
          series:[]
        }
      }
    },
    isAxisChart:{ 
      type:Boolean,
      default:true
    },
    test:{
      type: String,
      default(){
        return '0000'
      }
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  created() {
    this.chartData.aaa = 'aaa'
  },
 mounted() {
   console.log('in EChart');
   console.log(this.chartData);
  //  ???
   window.addEventListener('resize',this.resizeChart)
  //  this.initChart()
 },
 destroyed() {
   window.removeEventListener('resize',this.resizeChart)
 },
  watch:{
    // 数据发生变化时就更新图表  ???数据不会更新。即使已经从父组件传来了数据，还是没有检测到数据发生改变了。
    // 因为是监听对象的变化，可是对象的地址值没改变，所以没变化？？？ => 改成监听chartData的属性
    'chartData.series': {
      handler: function(){
      console.log('in EChart cccccccccccccccccccc');
        this.initChart()
      }
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      },200)
    },
    txt:{
      handler: function(){
        console.log('txt++++++++++++');
      }
    },
    deep: true,
    immediate: true,
  },
  data() {
    return {
      txt:1,
      echart: null,
      axisOption:{
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          // 图表偏移
          left: '20%' 
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis:{
          type:'',
          data:[]
        },
        yAxis:{
            type:'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
        },
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
      },
      normalOption:{
        type:'',
        tooltip:{
          trigger: 'item',
        },

      }
    }
  },
  methods: {
    change(){
      this.txt++
      this.initChart()
    },
    initChart() {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart() {
      this.echart ? this.echart.resize() : ''
    }
  },
}
</script>

<style>

</style>