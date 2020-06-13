//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http')

Page({
  data: {
    upload_base:http.baseUrl+'/uploads/',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],
    goods_list:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getBanner()
    this.getGoodsList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getBanner() {
    http.get('/client/getIndexBanner').then((res)=>{
      let images = []
      let result = []
      images = res.data.images
      images.map((item)=>{
        result.push({
          id:item.file_id,
          url:this.data.upload_base+item.file_url.replace('\\','/')
        })
      })
      console.log(result)
      this.setData({
        swiperList:result
      })
    })
  },
  getGoodsList() {
    http.get('/client/goods').then((res)=>{
      this.setData({
        goods_list:res.data.data
      })
    })
  },
  toDetail(e) {
    // console.log(e.currentTarget.dataset.goods_id)
    wx.navigateTo({
      url: '/pages/order/index?goods_id='+e.currentTarget.dataset.goods_id,
    })
  }
})
