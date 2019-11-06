// pages/news/article/article.js
var list, id
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
    console.log(options)
    id = options.dataid
    wx.request({
      url: '',
      data: {
        id: id
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        list = res.data
        that.setData({
          article:res.data
        })
      }
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
    // return {
    //   title: list.title,
    //   desc:list.content,
    //   path:'./article/article?dataid=123o'
    // }
    return {
      title: "title",
      desc: "content",
      path: './article/article'
    }
  }
})