// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 把 stroage 数据取出来，同步到users
    this.setData({
      users: wx.getStorageSync('users')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.users)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleUserinfo(data){
    let obj = JSON.parse(data.detail.rawData) // 再次地址获得用户的信息
    console.log(obj)
    this.setData({
      users: obj
    })
    wx.setStorageSync('isLogin', true)
    wx.setStorageSync('users', obj)
  },
  // 换头像
  handlePhoto(){
    wx.chooseImage({
      count: 1, //选几张照片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success : (res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          users: {
            ...this.data.users,
            avatarUrl: tempFilePaths[0]
          }
        })
        // 本地存一份，并且同步数据库
        wx.setStorageSync('users', {
          ...this.data.users,
          avatarUrl: tempFilePaths[0]
        })
      }
    })
  },
  openlocal(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })
  }
})