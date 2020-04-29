// pages/edit/edit.js
Page({
  data: {
    postData: {},
    types:['餐食','饮品','其他'],
    typeIndex: null,
    selectTypes: '',
    date: '',
    tips: '',
    money: null,
    buttons: [{text: '取消'}, {text: '确定'}]
  },
  bindTypeChange(e) {
    this.setData({
      typeIndex: e.detail.value,
      selectTypes: this.data.types[e.detail.value]
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
    if (!(this.data.date && this.data.selectTypes && this.data.money)) {
      this.setData({
        error: '不能为空，请核查'
      })
    }
    else {
      this.setData({
        postData: {
          date: this.data.date,
          selectTypes: this.data.selectTypes,
          tips: this.data.tips,
          money: this.data.money,
        }
      })
      //上传数据
      this.cancle()
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      date: options.date,
      selectTypes: options.type,
      typeIndex: options.type == '餐食' ? 0 : options.type == '饮品' ? 1 : 2,
      tips: options.tips,
      money: options.money,
      id: options.id,
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