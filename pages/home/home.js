// pages/home/home.js
const app = getApp()
Page({
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
    orderList: [
      {
        id: 1,
        creationTime: '2020-04-20',
        creator: 'ddd'
      },
      {
        id: 2,
        creationTime: '2020-04-18',
        creator: 'ccc'
      }
    ]
  },
  jump(e) {
    let id = e.currentTarget.dataset.id.id
    let date = e.currentTarget.dataset.id.creationTime
    wx.navigateTo({
      url:`/pages/order/order?id=${id}&date=${date}`
    })
  },
  slideButtonTap(e) {
    console.log(e.currentTarget.dataset.id)
  },
  addOrder() {
    let date = new Date()
    console.log(this.formatDate(date))
    console.log(app.globalData.userInfo.nickName)
  },
  formatDate(date) {
    let strDate = date.getFullYear() + "-"
    if(date.getMonth() < 10) {
      let s = date.getMonth() + 1 + "-"
      strDate += "0" + s;
    }
    else 
      strDate += date.getMonth() + 1 + "-"
    if(date.getDate() < 10)
      strDate += "0" + date.getDate()
    else 
      strDate += date.getDate()
    return strDate
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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