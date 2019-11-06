//app.js
App({
  globalData:{
    userinfo: null,
    code: null
  },
  onLaunch:function(){
    var that = this
    wx.login({
      success:function(e){
        that.globalData.code = e.code
        wx.getUserInfo({
          succcess:function(res){
            thst.globalData.userinfo = res.userinfo
          }
        })
      }
    })
  }
})
