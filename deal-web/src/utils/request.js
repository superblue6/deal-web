/**
 * 对axios进行一些初始化设置
 * 拦截所有axios回复，对错误统一处理
 * 将axios挂载到vue原型中，在vue组件内可以通过this.$axios来直接使用，无需导入
 */

import Vue from 'vue';
import axios from 'axios'
import { Notification} from 'element-ui'


Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:8082/deal';//配置baseurl
axios.defaults.withCredentials = false; //这里得是false
axios.defaults.timeout = 35000;


// 响应拦截器
axios.interceptors.response.use((res) => {
  if (res.status === 500) {
    errorAlert("服务端出错");
    return Promise.reject(res.data);
  }
  if (res.status !== 200) {
    errorAlert("请求错误，状态码：" + res.status);
    return Promise.reject(res.data);
  }
  //console.log(res)
  return res.data
}, (error) => {
  if(error.message === "未登录"){
    errorAlert("没有登录或登录超时,请重新登录");
    return Promise.reject(error);
  }else if(error.message === 'Network Error'){
    errorAlert("连接超时");
    return Promise.reject(error);
  }

  if(error.code === 'ECONNABORTED'){
    errorAlert('连接超时');
  }else{
    errorAlert(error.message);
  }
  return Promise.reject(error);
});

//弹出错误信息
function errorAlert(message) {
  Notification.error({
    title: '错误',
    message: message,
    customClass:'custom-error'
  });
}
