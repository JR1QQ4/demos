// pages/colock/colock.js
var ctx = wx.createCanvasContext("myCanvas", this)
// secshow()
// minshow()
// houshow()
// backshow()
// numbershow()
function secshow() {
  var now = new Date()
  var sec = now.getSeconds()
  var angle = sec * Math.PI / 30
  var x = 100 * Math.sin(angle) + 150
  var y = 150 - 100 * Math.cos(angle)
  ctx.beginPath()
  ctx.setLineWidth(1)
  ctx.setStrokeStyle('red')
  ctx.moveTo(150, 150)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}

function minshow() {
  var now = new Date()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  var angle = (min + sec / 60) * Math.PI / 30
  var x = 80 * Math.sin(angle) + 150
  var y = 150 - 80 * Math.cos(angle)
  ctx.beginPath()
  ctx.setLineWidth(5)
  ctx.setStrokeStyle('black')
  ctx.moveTo(150, 150)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}

function houshow() {
  var now = new Date()
  var hou = now.getHours()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  var angle = (hou + min / 60 + sec / 3600) * Math.PI / 6
  var x = 50 * Math.sin(angle) + 150
  var y = 150 - 50 * Math.cos(angle)
  ctx.beginPath()
  ctx.setLineWidth(8)
  ctx.setStrokeStyle('black')
  ctx.moveTo(150, 150)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}

function backshow() {
  ctx.beginPath()
  ctx.setLineWidth(3)
  ctx.arc(150, 150, 110, 2 * Math.PI)
  ctx.closePath()
  ctx.stroke()
}

function numbershow() {
  ctx.beginPath()
  ctx.setFontSize(20)
  for (var i = 1; i < 13; i++) {
    var angle = i * Math.PI / 6
    var x = 100 * Math.sin(angle) + 145
    var y = 155 - 100 * Math.cos(angle)
    ctx.fillText(i, x, y)
  }
  ctx.closePath()
  ctx.stroke()
}
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    setInterval(show, 1000)

    function show() {
      secshow()
      minshow()
      houshow()
      backshow()
      numbershow()
      ctx.draw()
    }
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