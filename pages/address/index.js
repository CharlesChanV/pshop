// pages/address/index.js
const app = getApp()
const http = require('../../utils/http')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCreate:false,
    name:'',
    phone:'',
    detail:'',
    region: ['广东省', '东莞市', '松山湖管委会'],
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  nameChange(e) {
    this.setData({
      name:e.detail.value
    })
  },
  phoneChange(e) {
    this.setData({
      phone:e.detail.value
    })
  },
  detailChange(e) {
    // this.data.detail = e.detail.value
    this.setData({
      detail:e.detail.value
    })
  },
  submit(){
    const address_form = {
      name:this.data.name,
      phone:this.data.phone,
      detail:this.data.region.join(",")+"|"+this.data.detail,
    }
    switch(this.data.isCreate)
    {
      case true:
        this.update(address_form)
        break;
      case false:
        this.create(address_form)
        break;
    }
    
  },
  async create(data){
    await http.post('/client/address',data).then(res=>{
      console.log(res)
    })
    wx.showToast({
      title: '保存成功',
      icon:'success'
    })
    setTimeout(()=>{
      wx.navigateBack()
    },2000)
  },
  async update(data){
    await http.put('/client/address',data).then(res=>{
      console.log(res)
    })
    wx.showToast({
      title: '保存成功',
      icon:'success'
    })
    setTimeout(()=>{
      wx.navigateBack()
    },2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http.get('/client/address/get/0',{}).then((res)=>{
      console.log(res.data)
      const {name,phone,detail:detail_all} = res.data
      const detail = detail_all.split("|")[1];
      const region = (detail_all.split("|")[0]).split(",")
      this.data.region = region
      this.setData({
        name:name,
        phone:phone,
        detail:detail,
        region:this.data.region,
        isCreate:true
      })
    }).catch(err=>{
      console.log(err)
    })
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