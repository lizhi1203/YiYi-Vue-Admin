import { IHttpResponse, IObject } from "@/types/interface";
import router from "@/router";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import app from '@/constants/app';
import { GlobalStore } from '@/stores';

const requestPending: IObject = {}
const http = axios.create({
  baseURL: app.api,
  timeout: app.requestTimeout
});

http.interceptors.request.use(
  (config) => {
    const globalStore = GlobalStore();
    const token = globalStore.token;
    if (token) {
      config.headers!["Authorization"] = "Bearer " + token;
    }
    // 防止get缓存导致获取不到最新数据
    if (config.method?.toUpperCase() === "GET") {
      config.params = { ...config.params, _t: new Date().getTime() };
    }
    // form表单默认格式请求头，数据需要使用qs转码
    if (Object.values(config.headers || {}).includes("application/x-www-form-urlencoded")) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    // 当前请求需要用户验证
    if (response.data.code === 401) {
      //自定义业务状态码
      redirectLogin();
    }
    return response;
  },
  (error) => {
    if (error && error.response) {
      console.error("请求错误", error.response.data);
    }
    return Promise.reject(new Error("接口错误"));
  }
);

const redirectLogin = () => {
  router.replace("/login");
  return;
};

function getRequestIdentify(config: AxiosRequestConfig) {
  return encodeURIComponent(config.url + qs.stringify(config.params, {addQueryPrefix: true}))
}

export default <T>(o: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
  const key = getRequestIdentify(o);
  // 防止重复请求
  if (requestPending[key]) {
    return Promise.reject("-999");
  } else {
    requestPending[key] = 1;
  }
  return new Promise<IHttpResponse<T>>((resolve, reject) => {
    http(o)
      .then((res) => {
        return resolve(res.data);
      })
      .catch(reject);
  });
}