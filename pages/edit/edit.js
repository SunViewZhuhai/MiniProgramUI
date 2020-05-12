const app = getApp();
// pages/edit/edit.js
Page({
  data: {
    types: [],
    typeIndex: null,
    selectTypeId: null,
    tips: '',
    money: null,
    id:null,
  },
  bindTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value,
      selectTypeId: this.data.types[e.detail.value].id
    })
  },
  tipsInputChange(e) {
    this.setData({
      tips: e.detail.value
    })
  },
  moneyInputChange(e) {
    this.setData({
      money: e.detail.value
    })
  },
  submitForm() {
    if (!(this.data.selectTypeId && this.data.money)) {
      this.setData({
        toptip: {
          msg: '不能为空，请核查',
          type: 'error',
          show: true
        }
      })
    }
    else {
      wx.request({
        url: app.globalData.host + 'api/OrderDetail/UpdateOrderDetail',
        method: 'PUT',
        data:{
          id: this.data.id,
          orderDate: this.data.date,
          orderItemName: this.data.tips,
          price: this.data.money,
          orderId: this.data.orderId,
          categoryId: this.data.selectTypeId,
          consumerId: app.globalData.loginUser.id
        },
        success: (res)=>{
          this.cancle()     
        },
        fail: ()=>{},
      })           
    }
  },
  cancle() {
    let pages = getCurrentPages();
    let beforePage = pages[pages.length - 2];
    wx.navigateBack({
      success: function () {
        // beforePage.onLoad();
        this.delta = 2
      }
    });
  },

  onLoad: function (options) {
    this.setData({
      types: app.globalData.orderItemCategories,
      selectTypeId: app.globalData.orderItemCategories.find(x => x.id == options.typeId).id,
      typeIndex: app.globalData.orderItemCategories.findIndex(x => x.id == options.typeId),
      tips: options.tips,
      money: options.money,
      id: options.id,
      consumerId: options.consumerId,
      orderId: options.orderId,
    })
  },
})