import axios from 'axios'
import store from '../store'
import {
  Message,
  MessageBox
} from 'element-ui'


import API from '@/api/api'

//1.系统未登录之前的请求

export const httpGet = (url, params) => {
  const [key1, key2] = url.split('/')
  if (params !== undefined) {
    return axios({
      url: `${API[key1][key2]}?${params}`,
      method: 'get',
    })
  } else {
    return axios({
      url: `${API[key1][key2]}`,
      method: 'get',

    })
  }
}

export const httpPost = (url, params, headers = {}) => {

  const [key1, key2] = url.split('/')

  return axios({
    url: `${API[key1][key2]}`,
    method: 'post',
    data: {
      ...params
    }

  })
}

//2.系统登陆请求需要做权限token验证的请求方式
export const httpGet2 = (url, params) => {
  const [key1, key2] = url.split('/')
  if (params !== undefined) {
    return axios({
      url: `${API[key1][key2]}?${params}`,
      method: 'get',
      // headers: {
      //   'Authorization': getToken()
      // }
    })
  } else {
    return axios({
      url: `${API[key1][key2]}`,
      method: 'get',
      // headers: {
      //   'Authorization': getToken()
      // }
    })
  }
}

export const httpPost2 = (url, params, headers = {}) => {
  const [key1, key2] = url.split('/')
  return axios({
    url: `${API[key1][key2]}`,
    method: 'post',
    data: {
      ...params
    },
    // headers: {
    //   'Authorization': getToken()
    // }
  })
}

// 创建axios实例
export const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    //config.headers['Authorization'] = 'bearerVym15bJDEVvj6EM3AONlzQtrSKmBZmMihgmKTzk6O7A='
    // config.headers['Username'] = 'app'
    // config.headers['Password'] = 'app'
    // config.headers['Password'] = 'app' // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['TYPE'] = 'Basic Auth' // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {

    return response;
    /**  
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // const res = response.data
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm(
    //       '你已被登出，可以取消继续留在该页面，或者重新登录',
    //       '确定登出', {
    //         confirmButtonText: '重新登录',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       }
    //     ).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// export default service
