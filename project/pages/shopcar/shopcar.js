// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成，只走一次
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      // 连表查询 goodId goods good  _expand=good
      url: `http://localhost:3000/carts?_expand=good&username=${wx.getStorageSync('users').nickName}`,
      success: (res)=>{
        console.log(res.data)
        this.setData({
          datalist: res.data
        })
      }
    })
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
  // 商品数量增加
  handleAdd(ev){
    let tempobj = null
    let newlist = this.data.datalist.map(item=>{
      if (item.id === ev.currentTarget.dataset.id) {
        tempobj = {
          ...item,
          number: item.number+1
        }
        return tempobj
      } else {
        return item
      }
    })
    // 更新视图
    this.setData({
      datalist: newlist
    })
    this.updateCarts(tempobj)
  },
  // 商品数量减少
  handleMinus(ev){
    // console.log(ev.currentTarget.dataset.id)
    // 更新data 更新视图
    // 同步到数据库
    let tempobj = null
    let newlist = this.data.datalist.map(item=>{
      if (item.id === ev.currentTarget.dataset.id) {
        tempobj = {
          ...item,
          number: item.number-1 === 0 ? 1 : (item.number-1)
        }
        return tempobj
      } else {
        return item
      }
    })
    // 更新视图
    this.setData({
      datalist: newlist
    })
    this.updateCarts(tempobj)
  },
  // 更新数据库
  updateCarts(cartobj){
    // cartobj 更新的对象
    // 显示loading.....
    wx.showLoading({
      title: '更新中.....',
      mask: true
    })
    
    let { goodId, number, username, checked } = cartobj
    wx.request({
      url: `http://localhost:3000/carts/${cartobj.id}`,
      method: "PUT",
      data: {
        goodId,
        number,
        checked,
        username
      },
      success: ()=>{
        // 隐藏loading...
        wx.hideLoading()        
      }
    })
  },
  checkboxChange(evt){
    // console.log(evt.detail.value)
    // console.log(evt.currentTarget.dataset.id)
    // 取反
    let tempid = evt.currentTarget.dataset.id
    let newlist = [...this.data.datalist]
    newlist.forEach(item=>{
      if (item.id === tempid) {
        item.checked = !item.checked
        this.updateCarts(item)
      }
    })
    this.setData({
      datalist: newlist
    })
  },
  // 删除数据, 购物车清除数据
  handleModal(evt){
    console.log('111', evt.currentTarget.dataset.myid)
    // 弹出对话框 确认是否删除
    wx.showModal({
      title: '提示',
      content: '你确认要删除吗？',
      success: (res)=>{
        if (res.confirm) {
          console.log('用户点击确定')
          this.handleDelete(evt.currentTarget.dataset.myid)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 删除数据
  handleDelete(myid){
    console.log(myid)
    this.setData({
      datalist: this.data.datalist.filter(item=>item.id !== myid)
    })
    wx.request({
      url: `http://localhost:3000/carts/${myid}`,
      method: "DELETE",
      success: ()=>{
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 全选按钮
  Allcheck(evt){
    console.log(evt.detail.value)
    if (evt.detail.value.length === 0) {
      // 全不选，处理视图
      // 同步数据库(jaon-server 没有一个好的方法可以一次性 修改 （put) 多个值)
      // 解决方法： for 循环遍历每个 id 进行更新
      this.setData({
        datalist: this.data.datalist.map(item=>({
          ...item,
          checked: false
        }))
      })
    } else {
      // 全选
      this.setData({
        datalist: this.data.datalist.map(item=>({
          ...item,
          checked: true
        }))
      })
    }
    this.data.datalist.forEach(item=>{

    })
  },
  handlePay(){
    // 向后端发起 ajax 请求， 带参数 ， 后端创建订单， 此时订单是 未支付状态
    // 后端 向 微信服务器发起请求， 带参数， 微信创建订单返回prePAyId 到咱们自己的后端
    // 后端 返回 prePayId ， 签名， 时间戳， 随机字符串
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success (res) { },
      fail (res) { }
    })
  }
})