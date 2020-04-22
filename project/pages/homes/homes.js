// pages/homes/homes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    looplist: [], // 都是跟视图相关
    dataList: [],
    isHidden: true
  },
  // 页面有多少 页，_page
  current: 1,
  // 商品信息总长度
  Total: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  /*
  注意：
  // 后端接口以及上线操作 生产阶段
    1.小程序没有跨域限制
    2.为了用户安全，将自己的后台接口加入白名单
    小程序 开发->开发设置->小程序代码上传->IP白名单(管理员扫码编辑)
    3.后台接口必须是 https 接口协议

  // mock 服务器情况 操作 开发阶段
    1.如果在开发阶段，后端接口未开发完成，我们可以开启小程序不校验域名这个功能
      右上角详情 -> 本地设置 -> 勾选 不校验合法域名...
      开发阶段 不勾选 不校验合法域名 ... 选项
  */ 
  onReady: function () {
    // ajax 请求数据 ==> $.ajax
    // 请求轮播信息
    wx.request({
      url: 'http://localhost:3000/recommends',
      success: (res)=>{
        // console.log(res.data)
        this.setData({
          looplist: res.data
        })
      }
    })
    // 请求商品列表信息
    wx.request({
      url: `http://localhost:3000/goods?_page=${this.current}&_limit=5`,
      success: (res)=>{
        // console.log(res.header["X-Total-Count"])
        this.Total = Number(res.header["X-Total-Count"])
        this.setData({
          // 因为是 懒加载 ，会有分页加载 ，展开合并之前的数据 ， 不能覆盖
          dataList: res.data
        })
      }
    })
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
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    console.log("下拉了", "请求数据")
    setTimeout(()=>{
      // 主动调用方法， 让下拉框回去
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   * 可用于 商品列表的懒加载
   */
  onReachBottom: function () {
    // console.log(this.data.dataList.length, this.Total) // 注意转换this.Total的类型
    if(this.data.dataList.length >= this.Total){
      // 所有的数据已请求完成
      this.setData({
        isHidden: false
      })
      return;
    }
    this.current++
    // console.log("到底的时候触发事件", this.current)
     // 请求商品列表信息
     wx.request({
      url: `http://localhost:3000/goods?_page=${this.current}&_limit=5`,
      success: (res)=>{
        // console.log(res.data)
        this.setData({
          // 因为是 懒加载 ，会有分页加载 ，展开合并之前的数据 ， 不能覆盖
          dataList: [...this.data.dataList, ...res.data]
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 点击列表跳转详情页
  handleChangePage(evt){
    // console.log(evt.currentTarget.dataset.myid)
    // 带着id跳转详情页面
    // 跳转页面的方法
    // navigateTo 跳转到新的页面
    // redirectTo 关闭当前页面，跳转到新页面
    // navigateBack 回到上一个页面
    // switchTab 选项卡切换，，跳转底部选项卡
    wx.navigateTo({
      url: `/pages/detail/detail?id=${evt.currentTarget.dataset.myid}`, // 进行跳转的页面
    })
  }
})