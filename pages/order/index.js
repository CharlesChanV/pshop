const app = getApp()
const http = require('../../utils/http')

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    upload_base:http.baseUrl+'/uploads/',
    is_shoucang:0,
    goods_info: { goods_id: 1, goods_title: "商品标题1", goods_price: '100', goods_yunfei: 0, goods_kucun: 100, goods_xiaoliang: 1, content:'商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情'},
    goods_img: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
    //评价数据
    // pjDataList: [{ headpic: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', author: '张三', add_time: '2018-06-01', content:'好评好评，真实太好了!'},
    //   { headpic: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', author: '张三', add_time: '2018-06-01', content: '好评好评，真实太好了!' }
    // ],
  },
 
 
  previewImage: function (e) {
    var current = e.target.dataset.src;
    // var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = goodsimg[i].url
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist// 需要预览的图片http链接列表  
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id)
    this.getDetail(options.goods_id)
  },
  getDetail(goods_id) {
    http.get('/client/goods/get/'+goods_id).then((res)=>{
      console.log(res.data)
      let images = []
      let result = []
      images = res.data.image
      images.map((item)=>{
        result.push({
          id:item.file_id,
          url:this.data.upload_base+item.file_url
        })
      })
      this.setData({
        goods_info:res.data,
        goods_img:result
      })
    })
  },
  toBuy() {
    if(!this.placeOrder())
    {
      wx.showToast({
        title: '网络异常',
        icon:'none'
      })
      return ;
    }
    wx.navigateTo({
      url: '/pages/order/place/index?goods_id='+this.data.goods_info.goods_id,
    })
  },
  async placeOrder() {
    const {goods_id} = this.data.goods_info
    const data = {
      products:[{goods_id:goods_id,count:1}]
    }
    // await http.post('/client/placeOrder',data).then(res=>{
    //   console.log(res)
    //   return true
    // })
    wx.request({
      url: http.baseUrl+'/client/placeOrder',
      method:'POST',
      header:{
        'Authorization': wx.getStorageSync("Authorization")
      },
      data:data,
      success:res=>{
        console.log(res)
        return true
      }
    })
    return false
  }
})
