// pages/masaike/masaike.js
const ctx = wx.createCanvasContext('myCanvas', this)
var imgpath
var fun = true
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.path != undefined) {
      imgpath = options.path
      ctx.drawImage(imgpath, 0, 0, 620, 620)
      ctx.draw()
    }
  },
  click: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        ctx.drawImage(res.tempFilePaths[0], 0, 0, 240, 380)
        ctx.draw()
      }
    })
  },
  move: function(e) {
    if (fun) {
      ctx.setFillStyle('red')
      ctx.fillRect(e.touches[0].x, e.touches[0].y, 10, 10)
      ctx.fillRect(e.touches[0].x + 10, e.touches[0].y + 10, 10, 10)
      ctx.setFillStyle('pink')
      ctx.fillRect(e.touches[0].x + 10, e.touches[0].y, 10, 10)
      ctx.fillRect(e.touches[0].x, e.touches[0].y + 10, 10, 10)
      ctx.draw(true)
    } else {
      ctx.clearRect(e.touches[0].x, e.touches[0].y), 20, 20
      ctx.draw(true)
    }
  },
  clear: function(e) {
    fun = false
  },
  cover: function(e) {
    fun = true
  },
  save: function(e) {
    console.log("保存")
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function(res) {
        imgpath = res.tempFilePath
      }
    }, this)
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
    return {
      title: "我的图片",
      desc: "",
      path: "pages/masaike/masaike?path=" + imgpath
    }
  }
});