// pages/todoList/todoList.js
var fix = []
var fixed = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nav1: "green",
    nav2: "orange",
    show: true,
    showtext:false,
    array1: fix,
    array2: fixed,
    showfixed:false
  },
  first: function() {
    this.setData({
      nav1: "green",
      nav2: "orange",
      showtext: false,
      show: true,
      showfixed:false
    })
  },
  second: function() {
    this.setData({
      nav1: "orange",
      nav2: "green",
      showtext: false,
      show: false,
      showfixed:true
    })
  },
  add: function() {
    this.setData({
      show: false,
      showtext:true
    })
  },
  confirm:function(e){
    fix.push(e.detail.value)
    this.setData({
      array1: fix,
      show: true,
      showtext:false
    })
  },
  do:function(e){
    var index = e.currentTarget.id
    var done = fix.splice(index,1)
    fixed.push(done[0])
    this.setData({
      array1: fix,
      array2: fixed,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.getStorage({
      key: 'list',
      success: function(res) {
        console.log(res)
      },
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
    var that = this
    wx.setStorage({
      key: 'list',
      data: that.array1,
    })
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