// pages/home/home.js
// 每个页面必须Page() 注册页面 页面生命周期
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mytext: "",
    list: ['111','222','333'],
    current: 0,
    isCreatd: true,
    isshow: false //默认false不隐藏
  },
  // 定义一个事件处理函数 
  handleYxmTap(){
    this.setData({
      mytext: 222
    })
  },
  // 输入框事件,
  handleinput(evt){
    // 获取输入框的值
    // console.log(evt.detail.value)
    this.setData({
      mytext: evt.detail.value
    })
  },
  // 获取输入框添加到列表
  handleAdd(){
    console.log(this.data.mytext)
    this.setData({
      list: [...this.data.list,this.data.mytext],// 添加新数据
      mytext: '' //清空输入框
    })
  },
  // 删除事件
  handleDel(evt){
    console.log(evt.target.dataset.myindex)
    var newlist = [...this.data.list]
    newlist.splice(evt.target.dataset.myindex, 1)
    this.setData({
      list: newlist
    })
  },
  // 点击变色
  handleColor(evt){
    // target 事件源
    // currentTarget 当前绑定事件的节点
    this.setData({
      current: evt.currentTarget.dataset.datainde
    })
  },
  // 动态创建
  handleCreatd(){
    this.setData({
      isCreatd: !this.data.isCreatd,
      isshow: !this.data.isshow
    })
  },
  /**
   * 生命
   * 
   * 
   周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})