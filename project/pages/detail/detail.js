// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {}
  },
  myid: 0,
  /**
   * 生命周期函数--监听页面加载
   * options : 上个页面传的参数
   */
  onLoad: function (options) {
    // console.log(options)
    // 注意： id是默认预留属性，相当于关键字
    this.myid = Number(options.id) // 存id 利用id发ajax请求 获取详情页数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: `http://localhost:3000/goods/${this.myid}`,
      success: (res)=>{
        console.log(res.data)
        this.setData({
          goodsInfo: res.data
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
  handleAddCart(){
    // 判断是否登录，如果登陆成功，跳转购物车，如果失败，跳转到my页面
    // 小程序没有localstroage .getItem setItem removeItem clear
    // 小程序有 wx.setStorageSync('key', data) 设置,可以直接存对象，bool
    //  wx.getStorageSync('key') 获取
    //  wx.removeStorageSync('key') 删除
    // wx.clearStorageSync() 清空
    // if(本地存储isLogin === true){
    // }else{
    // }
    console.log(this.data.goodsInfo.id)
    if (wx.getStorageSync("isLogin") === true) {
      // 1.先取出此商品是否存过 如果存过，put更新数据，让number数据++
      // 2.如果没有存过，post 新数据
      wx.request({
        url: `http://localhost:3000/carts?goodId=${this.data.goodsInfo.id}`,
        success: (res)=>{
          if (res.data.length === 0) {
            // 添加新数据 post
            this.addCart()
          } else{
            // 修改旧数据 put
            this.updataCart(res.data[0]) // 更新函数，接收参数
          }
        }
      })
    } else {
      // 往选项卡跳转页面
      wx.switchTab({
        url: '/pages/my/my',
      })
    }

  },
  // 添加商品
  addCart(){
    wx.request({
      url: 'http://localhost:3000/carts',
      data: {
        goodId: this.data.goodsInfo.id,
        number: 1,
        checked: false,
        username: wx.getStorageSync('users').nickName,
        checked: false //是否选中
      },
      method: "POST", //post 添加新数据
      success: ()=>{
        // 提示框
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },  
  // 更新商品
  updataCart(cartObj){
    wx.request({
      url: `http://localhost:3000/carts/${cartObj.id}`,
      method: 'PUT',
      data: {
        ...cartObj,
        number: cartObj.number + 1
      },
      success: ()=>{
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  handleChangeCart(){
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  },
  handlepreview(evt){
    console.log(evt.currentTarget.dataset.url)
    wx.previewImage({
      current: evt.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.goodsInfo.slides.map(item=>'http://localhost:3000'+item) // 需要预览的图片http链接列表
    })
  }
})