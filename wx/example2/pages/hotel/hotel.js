// pages/hotel/hotel.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: null,
    date: "2019-7-31"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userinfo: app.globalData.userinfo
    })
  },
  formSubmit: function(e) {
    var thst = this
    var orderno = e.detail.value.orderno
    var orderdate = e.detail.value.orderdate
    var ordername = e.detail.value.ordername
    var ordertel = e.detail.value.ordertel
    var formid = e.detail.formid
    if (orderno == "" || orderdate == "" || ordername == "" || ordertel == "") {
      wx.showModal({
        title: '提示',
        content: '不能为空！',
      })
    } else {
      wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        }),
        wx.request({
          url: 'http://localhost:80/',
          data: {
            code: app.globalData.code,
            date: orderdate,
            no: orderno,
            name: ordername,
            tel: ordertel,
            formid: formid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res.data)
          }
        })
    }
  },
  formReset: function() {
    this.setData({
      date: "2019-7-31"
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      date: e.detail.value
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