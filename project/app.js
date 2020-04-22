//app.js 项目的入口js模块
// 小程序需要初始化的内容
// app() 注册小程序并且初始化
App({
  onLaunch() {
    // 小程序的生命周期之一，小程序的初始化操作
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(data){
    // 场景值：手机用户是以何种方法进入小程序，进行数据分析，广告统计
    // 根据不同的场景值，进入不同的业务模式：在餐馆扫码进入现场下单，在家里下单外卖下单
    console.log("小程序显示，切前台的操作",data+"场景值")
  },
  onHide(){
    // 小程序隐藏，游戏暂停，音乐停止
    console.log("小程序隐藏，切后台")
  },
  onError(){
    console.log("小程序出现错误的时候执行")
  },
  globalData: {
    userInfo: null
  }
})