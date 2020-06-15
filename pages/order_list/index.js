// pages/order_list/index.js
const app = getApp()
const http = require('../../utils/http')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    order_list:[],
    pay_status:{
      [10]:{name:'未支付',color:'red'},
      [20]:{name:'已支付',color:''},
    },
    order_status:{
      [10]:'进行中',
      [20]:'取消',
      [21]:'待取消',
      [30]:'已完成'
    },
    receipt_status:{
      [10]:'未收货',
      [20]:'已收货'
    },
    delivery_status:{
      [10]:'未发货',
      [20]:'已发货'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
  },
  getOrderList() {
    http.get('/client/getSummaryByUser',{page:this.data.page,limit:50}).then(res=>{
      console.log(res.data.data)
      if(res.data.data)
      {
        this.setData({
          order_list:res.data.data
        })
      }else{
        this.setData({
          order_list:[]
        })
      }
    })
  },
  cancelOrder(e){
    console.log("Cacel:"+e.currentTarget.dataset.order_id)
    http.post('/client/cancelOrder',{order_id:e.currentTarget.dataset.order_id}).then(res=>{
      wx.showToast({
        title: '操作成功',
        icon:'success'
      })
      this.getOrderList()
    })
  },
  confirmOrder(e){
    http.post('/client/confirmOrder',{order_id:e.currentTarget.dataset.order_id}).then(res=>{
      wx.showToast({
        title: '操作成功',
        icon:'success'
      })
      this.getOrderList()
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