// pages/weather/weather.js
var bmap = require('../../utils/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var city = "北京"
    wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?coord_type=gcj02&output=json&ak=eVB9kKUc9L48ji8MzVrBOGlkWYNxep40&sn=&timestamp=&location=' + city,
      success: function(res) {
        var getdate = res.data.date
        var getarray = res.data.results[0].index
        var data = res.data.results[0].weather_data[0]
        console.log(res)
        var getWeather = data.weather
        var gettemp = data.temperature
        var getwind = data.wind
        var getpic = data.dayPictureUrl        
        that.setData({
          defaultcity: city,
          date: getdate,
          weather: getWeather,
          temp: gettemp,
          wind: getwind,
          pic: getpic,
          array: getarray
        })
      }
    })
  },
  confirm:function(e){
    this.setData({
      city: e.detail.value
    })
    this.search()
  },
  getInput: function(e) {
    this.setData({
      city: e.detail.value
    })
  },
  search: function(e) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?coord_type=gcj02&output=json&ak=eVB9kKUc9L48ji8MzVrBOGlkWYNxep40&sn=&timestamp=&location=' + that.data.city,
      success: function(res) {
        if (res.data.error != 0) return
        var getdate = res.data.date
        var data = res.data.results[0].weather_data[0]
        var getWeather = data.weather
        var gettemp = data.temperature
        var getwind = data.wind
        var getpic = data.dayPictureUrl
        var getarray = res.data.results[0].index
        that.setData({
          defaultcity: that.data.city,
          date: getdate,
          weather: getWeather,
          temp: gettemp,
          wind: getwind,
          pic: getpic,
          array: getarray
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

  }
})