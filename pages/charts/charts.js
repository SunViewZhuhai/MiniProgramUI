// // pages/charts/charts.js
import * as echarts from '../../ec-canvas/echarts';
var util = require('../../utils/util.js')
const app = getApp()
var chart = null // echart instance
var defaultOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: 
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
    },
  yAxis:
    {
      type: 'category',
      axisTick: { show: false },
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    },
  series: [
    {type: 'bar', stack: 'sum',}
  ],
  dataset: {
    source: [
        
    ]
  },
};

Page({
  data: {
    ec: {
      //onInit: initChart, // 3、将数据放入到里面
      lazyLoad: true
    },
    types:[],
    option:{},
  },
  loadOrderItemlist(){
    wx.request({
      url: app.globalData.host + 'api/OrderDetail/GetOrderItemList/'+ app.globalData.loginUser.id,
      method: 'GET',
      success: res => {
        console.log(this.sum(res.data,x => x.price))
        this.updateChart(res.data)
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  initChart(){
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
  initDefaultSetting(){
    let option = {...defaultOption}
    let len = this.data.types.length
    option.series = []
    for(var i=0;i<len;i++){
      option.series.push(...defaultOption.series)
    }
    this.setData({ option: option})
  },
  setOption(chart){
    chart.setOption(this.data.option)
  },
  onLoad() {
    this.setData({
      types: app.globalData.orderItemCategories
    })

  },
  onReady() {
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.initDefaultSetting()
    this.initChart()
    // after chart init
    this.loadOrderItemlist()
  },
  constructDataset(data){
    let typeDic = {}
    this.data.types.map(x => typeDic[x.id]= x.category)
    let cleanData = data.map((x) =>  {
      return{
        date: x.orderDate,
        type: x.categoryId,
        price: x.price
      }
    })
    
    //merge data 
    var groups = util.groupBy(cleanData, p => util.dateFormat(new Date(p.date), "MM-dd"))
    let list = []
    Object.keys(groups).forEach(x => {
      //date
      let item  = this.createDefaultDatasetItem()
      item.date = x
      let groups2 = util.groupBy(groups[x], p => p.type)
      Object.keys(groups2).forEach(y => {
        //merge same type data
        let type = typeDic[y]
        item[type] = this.sum(groups2[y],p => p.price)
        //add to object    
      })
      list.push(item)
    })
    return list
  },
  createDefaultDatasetItem(){
    let item = {}
    item.date = null
    this.data.types.forEach(x => item[x.category] = 0)
    return item
  },
  sum(list, fn){
    let sum = 0
    list.forEach((item) => {
      sum += fn(item)
    })
    return sum
  },
  updateChart(data){
    let dataset = this.constructDataset(data)
    this.fillEmptyDate(dataset)
    dataset.sort((a,b) => {
      return a.date < b.date ?  -1 :  1
    })
    this.data.option.dataset.source = dataset
    this.setOption(this.chart) 
  },
  fillEmptyDate(dataset){
    let range = util.getDateRange(new Date(),7,true,"MM-dd")
    let emptyDate = []
    for (let date of range){
      if(dataset.some(x => x.date == date)){
        continue;
      }
      let newItem = this.createDefaultDatasetItem()
      newItem.date = date
      emptyDate.push(newItem)
    }
    dataset.push(...emptyDate)
  }
});