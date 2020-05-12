// pages/home/home.js
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
    orderList: [],
  },
  jump(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:`/pages/order/order?orderid=${id}`
    })
  },
  slideButtonTap(e) {
    wx.request({
      url: app.globalData.host +'api/Order/DeleteOrder/' + e.currentTarget.dataset.id,
      method: 'DELETE',
      success: (res)=>{
        let orderList = this.data.orderList
        let index = orderList.findIndex(item => item.id == e.currentTarget.dataset.id)
        orderList.splice(index,1)
        this.setData({
          orderList: orderList
        })
      },
      fail: ()=>{},
    });
  },
  addOrder() {
    let date = new Date()
    wx.request({
      url: app.globalData.host +'api/Order/AddOrder',
      data: {
        orderDate: util.formatTime(date),
        prepayerId: app.globalData.loginUser.id,
      },
      method: 'POST',
      success: (res)=>{
        let orderList = this.data.orderList
        orderList.push(res.data)
        this.setData({
          orderList: orderList
        })
      },
      fail: ()=>{},
    });
    
  },
  // formatDate(date) {
  //   let strDate = date.getFullYear() + "-"
  //   if(date.getMonth() < 10) {
  //     let s = date.getMonth() + 1 + "-"
  //     strDate += "0" + s;
  //   }
  //   else 
  //     strDate += date.getMonth() + 1 + "-"
  //   if(date.getDate() < 10)
  //     strDate += "0" + date.getDate()
  //   else 
  //     strDate += date.getDate()
  //   return strDate
  // },
  loadOrderList() {
    wx.request({
      url: app.globalData.host + 'api/Order/GetOrderList',
      method: "GET",
      success: res => {
        this.setData({         
          orderList : res.data
        })
        console.log(res.data)
      },
      fail:err => {
        console.log(err.message)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrderList()
  },
})