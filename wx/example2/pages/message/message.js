// pages/message/message.js
var nickName
var imageUrl
var newnote
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
    wx.login({
      success:function(res){
        console.log(res)
      }
    })  
    wx.getUserInfo({
      success: function(res) {
        nickName = res.userInfo.nickName
        imageUrl = res.userInfo.avatarUrl
      }
    }),
    wx.request({
      url: 'http://localhost:8081/phpmyadmin/sql.php?db=weixin&table=user',
      success:function(res){
        console.log(res)
      }
    })
  },
  confirm:function(e){
    newnote = e.detail.value
  },
  click:function(e){
    var that = wx.request({
      url: 'http://localhost:8081/phpmyadmin/sql.php?db=weixin&table=user',
      data: {
        nickname: nickname
      },
      success:function(res){
        wx.request({
          url: 'http://localhost:8081/phpmyadmin/sql.php?db=weixin&table=user',
          success:function(res){
            that.setData({

            })
          }
        })
      }
    })
  },
  onGotUserInfo: function(e) {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
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