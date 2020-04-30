const app = getApp();
Page({
  data: {
    postData: {},
    types:[],
    typeIndex: null,
    orderId: null,
    selectType: {},
    date: '',
    tips: '',
    money: null,
    showAdd: false,
    buttons: [{text: '取消'}, {text: '确定'}],
  },
  bindTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value,
      selectType: this.data.types[e.detail.value]
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
    if (!(this.data.date && this.data.selectType && this.data.money)) {
      this.setData({
        error: '不能为空，请核查'
      })
    }
    else {
      this.setData({
        showAdd: true
      })
    }
  },
  cancle() {
    let pages = getCurrentPages();
    let beforePage = pages[pages.length - 2];
    wx.navigateBack({
      success: function () {
        beforePage.onLoad();
      }
    });
  },
  clickAdd(e) {
    this.setData({
      showAdd: false
    })
    if(e.detail.item.text == '确定') {
      this.setData({
        postData: {
          //date: this.data.date,
          selectType: this.data.selectType.id,
          tips: this.data.tips,
          money: this.data.money,
        }
      })
      //上传数据
      this.cancle()
      this.setData({
        date: '',
        selectType: '',
        tips: '',
        money: null
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
      date: options.date,
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