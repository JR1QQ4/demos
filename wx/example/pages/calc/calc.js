// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courtCosts: 0,
    costs: 0
  },
  formSubmit: function(e) {
    var a = Number.parseFloat(e.detail.value.input)
    var b = 0
    var c = 0
    if (a <= 10000) {
      b = 50
    } else if (a <= 100000 && a > 10000) {
      b = (0.025 * a - 200)
    } else if (a <= 200000 && a > 100000) {
      b = (0.02 * a + 300)
    } else if (a <= 500000 && a > 200000) {
      b = (0.015 * a + 1300)
    } else if (a <= 1000000 && a > 500000) {
      b = (0.01 * a + 3800)
    } else if (a <= 2000000 && a > 1000000) {
      b = (0.009 * a + 4800)
    } else if (a <= 5000000 && a > 2000000) {
      b = (0.008 * a + 6800)
    } else if (a <= 10000000 && a > 5000000) {
      b = (0.007 * a + 11800)
    } else if (a <= 20000000 && a > 10000000) {
      b = (0.006 * a + 21800)
    } else if (a > 20000000) {
      b = 0.005 * a + 41800
    }
    c = 0.5*b
    this.setData({
      courtCosts: b.toFixed(2),
      costs: c.toFixed(2)
    })
  },
  formReset: function() {
    this.setData({
      courtCosts: 0,
      costs: 0
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