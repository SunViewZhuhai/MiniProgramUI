const app = getApp();
// pages/list/list.js
Page({
  data: {
    orderItemCategories: [],
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
    listData: []
  },
  slideButtonTap(e) {
    console.log(e.currentTarget.dataset.id)
  },
  jump(e) {
    let id = e.currentTarget.dataset.option.id
    let money = e.currentTarget.dataset.option.price
    let typeId = e.currentTarget.dataset.option.categoryId
    let tips = e.currentTarget.dataset.option.orderItemName
    let orderId = e.currentTarget.dataset.option.orderId
    let consumerId = e.currentTarget.dataset.option.consumerId
    wx.navigateTo({
      url:`/pages/edit/edit?id=${id}&money=${money}&typeId=${typeId}&tips=${tips}&orderId=${orderId}&consumerId=${consumerId}`
    })
  },
  loadOrderItemlist(){
    wx.request({
      url: app.globalData.host + 'api/OrderDetail/GetOrderItemList/'+ app.globalData.loginUser.id,
      method: 'GET',
      success: res => {
        this.setData({
          listData: res.data
        })
      },
      fail:err => {
        console.log(err)
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      orderItemCategories: app.globalData.orderItemCategories
    })
    //this.loadOrderItemlist()    
  },
  onShow:function (options){
    this.loadOrderItemlist()    
  }
})