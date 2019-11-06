// pages/calc/marry/marry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    condition: false,
    cost: 300,
    costs: 150
  },
  switchChange: function(e) {
    this.setData({
      condition: e.detail.value,
      cost: 300,
      costs: 150
    })
  },
  formSubmit: function(e) {
    var f = Number(e.detail.value.input1)
    var g = 0
    var h = 0
    if (f <= 200000) {
      g = 300
    } else if (f > 200000) {
      g = 0.005 * f
    }
    h = 0.5 * g
    this.setData({
      cost: g.toPrecision(4),
      costs: h.toPrecision(4)
    })
  },
  formReset: function() {
    this.setData({
      condition: false,
      cost: 300,
      costs: 150
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})