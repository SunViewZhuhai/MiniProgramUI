const app = getApp();
Page({
  data: {
    toptip: {
      msg: '',
      type: '',
      show: false
    },
    types:[],
    typeIndex: null,
    orderId: null,
    selectTypeId: null,
    tips: '',
    money: null,
    showAdd: false,
    buttons: [{text: '取消', isConfirm: false}, {text: '确定', isConfirm: true}],
  },
  bindTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value,
      selectTypeId: this.data.types[e.detail.value].id
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
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
      this.setData({
        showAdd: true
      })
    }
  },
  cancel() {
    let pages = getCurrentPages();
    let beforePage = pages[pages.length - 2];
    wx.navigateBack({
      delta: 2,
      success: function () {

      }
    });
  },
  clickAdd(e) {
    this.setData({
      showAdd: false
    })
    if(e.detail.item.isConfirm) {
      wx.request({
        url: app.globalData.host + 'api/OrderDetail/AddOrderDetail',
        method: 'POST',
        data:{
          orderItemName: this.data.tips,
          price: this.data.money,
          orderId: this.data.orderId,
          categoryId: this.data.selectTypeId,
          consumerId: app.globalData.loginUser.id
        },
        success: (res)=>{         
          this.cancel()
        },
        fail: ()=>{},
      })     
    }
    else{
      this.setData({
        showAdd: false
      })
    }    
  },
  // getData(data) {
  //   wx.request({
  //     url: 'test.php', //仅为示例，并非真实的接口地址
  //     data: {
  //       x: '',
  //       y: ''
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success (res) {
  //       console.log(res.data)
  //     }
  //   })
  // }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.orderid,
      types: app.globalData.orderItemCategories
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})