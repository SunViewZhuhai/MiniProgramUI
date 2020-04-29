// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除',
    }],
    listData: [
      {
        id: 1,
        money: 24,
        type: '餐食',
        tips: '午饭',
        date: '2020-04-21',
      },
      {
        id: 2,
        money: 4,
        type: '饮品',
        tips: '可乐',
        date: '2020-04-21',
      }
    ]
  },
  slideButtonTap(e) {
    console.log(e.currentTarget.dataset.id)
  },
  jump(e) {
    let id = e.currentTarget.dataset.id.id
    let date = e.currentTarget.dataset.id.date
    let money = e.currentTarget.dataset.id.money
    let type = e.currentTarget.dataset.id.type
    let tips = e.currentTarget.dataset.id.tips
    wx.navigateTo({
      url:`/pages/edit/edit?id=${id}&date=${date}&money=${money}&type=${type}&tips=${tips}`
    })
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