// // pages/charts/charts.js
import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js')
const app = getApp()
var chart = null // echart instance
var defaultOption = {
  color: ['#FF4500', '#00BFFF', '#228B22','#FFFF00'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['餐食', '饮品', '其他']
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 15,
    top: 40,
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['04-10', '04-11', '04-12', '04-13', '04-14', '04-15', '04-16'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }
  ],
  series: [
    {
      name: '餐食',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true
        }
      },
      data: [20, 10, 14, 17, 19, 25, 22],
      itemStyle: {
        // emphasis: {
        //   color: '#32c5e9'
        // }
      }
    },
    {
      name: '饮品',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
        }
      },
      data: [20, 32, 21, 34, 9, 13, 11],
      itemStyle: {
        // emphasis: {
        //   color: '#67e0e3'
        // }
      }
    },
    {
      name: '其他',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: [3, 2, 3, 4, 3, 3, 3],
      itemStyle: {
        // emphasis: {
        //   color: '#37a2da'
        // }
      }
    },
  ]
};

Page({
  data: {
    ec: {
      //onInit: initChart, // 3、将数据放入到里面
      lazyLoad: true
    },
    types:[],
    orderItemList:[],
    option:{},
  },
  loadOrderItemlist(){
    wx.request({
      url: app.globalData.host + 'api/OrderDetail/GetOrderItemList/'+ app.globalData.loginUser.id,
      method: 'GET',
      success: res => {
        this.setData({
          orderItemList: res.data
        })        
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  init(){
    this.ecComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.setOption(chart)
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    }); 
  },
  prepareData(){
    let option = {}
    //option.legend = this.data.types.map(x => new {id: x.id, name: x.category})
    option.legend = defaultOption.legend
    option.xAxis = defaultOption.xAxis
    option.yAxis = defaultOption.yAxis
    option.tooltip = defaultOption.tooltip
    option.grid = defaultOption.grid
    option.color = defaultOption.color
    option.series = defaultOption.series   
    this.setData({ option: option})
  },
  setOption(chart){
    chart.setOption(this.data.option)
  },
  onLoad() {
    this.setData({
      types: app.globalData.orderItemCategories
    })   
    this.loadOrderItemlist()
  },
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.prepareData()
    this.init()
  },
});