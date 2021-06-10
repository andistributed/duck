import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: window.BASE_URL||process.env.BASE_URL||"http://127.0.0.1:2856", // url = base url + request url
  headers: {
    Accept: "application/json"
  },
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = localStorage.getItem('token')
    if (token) config.headers['Authorization'] = 'Bearer ' + token
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      if (res.code == -2) {
        localStorage.removeItem('token');
        MessageBox({message: res.message, title:'未登录', type:'error', callback:function(type){
          if(type=='confirm') router.push('/login');
        }});
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
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


export default service
