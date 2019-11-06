// pages/news/news.js
var num = 0
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
    var that = this
    wx.request({
      url: '',
      success: function(res) {
        that.setData({
          array: res.data
        })
      }
    })
  },
  short: function(e) {
    var id = e.target.id
    wx.navigateTo({
      url: './article/article?dataid=' + id,
    })
  },
  onReachBottom:function(){
    var that = thisnum = num + 5
    wx.request({
      url: '',
      data: {
        number: num
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.setData({
          array:res.data
        })
      }
    })
  },
  toptap:function(){
    wx.navigateTo({
      url: './article/article?dataid=123'
    })
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