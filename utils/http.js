/**
 * 请求相关的封装
 */
let baseUrl = ""; // 接口地址
let header = {
  'content-type': 'application/x-www-form-urlencoded',
  // 'Authorization': "Bearer " + wx.getStorageSync("token")
  'Authorization': wx.getStorageSync("token")
}
/**
 * 封装请求
 */
function fetch(options) {
  if (options.loading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      data: options.data,
      header: header,
      method: options.method,
      success: function(res) {
        if (options.loading) {
          wx.hideLoading()
        }
       
        if (res.data.error_code == 1) {
          // 重新登陆
          return false;
        }
        if (res.data.error_code != 0) {
          wx.showToast({
            title: res.errMsg,
            mask: "true",
            icon: 'none',
            duration: 3000
          })
          return;
        }
        resolve(res.data); //把请求到的数据发到引用请求的地方
      },
      fail: function(err) {
        if (options.loading) {
          wx.hideLoading()
        }
        wx.showToast({
          title: "网络连接超时",
          icon: 'none',
          duration: 3000,
        })
      }
    })
  })
}
/**
 * POST 请求
 */
export function post(url, params, loading = true) {
  console.log(params, loading);
  var option = {
    url: url,
    data: params,
    method: 'POST',
    loading
  }
  return fetch(option);
}

/**
 * GET请求
 */
export function get(urls, params, loading = true) {
  console.log(params, loading);
  var option = {
    url: urls,
    data: params,
    method: 'GET',
    loading
  }
  return fetch(option);
}
/**
 * PUT请求
 */
export function put(urls, params, loading = true) {
  console.log(params, loading);
  var option = {
    url: urls,
    data: params,
    method: 'PUT',
    loading
  }
  return fetch(option);
}