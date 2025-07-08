// Add a request interceptor
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 在请求发送之前做一些处理
    return config;
  },
  function (error) {
    // Do something with request error
    // 处理请求错误
    return Promise.reject(error);
  }
);

// Add a response interceptor
// 添加一个响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 任何在 2xx 范围内的状态码都会触发该函数
    // 处理响应数据
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 任何不介于 2xx 范围的状态码都会触发该函数
    // 处理响应错误
    return Promise.reject(error);
  }
);
