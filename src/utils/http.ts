import { IHttpResponse, IObject } from "@/types/interface";
import router from "@/router";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import app from '@/constants/app'
// import { getCache, getToken } from "./cache";

const requestPending: IObject = {}
const http = axios.create({
  baseURL: app.api,
  timeout: app.requestTimeout
});

http.interceptors.request.use(
  function (config) {
    // const token = getToken();
    // if (token) {
    //   config.headers["Authorization"] = "Bearer " + token;
    // }
    if (config.method?.toUpperCase() === "GET") {
      config.params = { ...config.params, _t: new Date().getTime() };
    }
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

export default (o: AxiosRequestConfig): Promise<IHttpResponse> => {
  const key = getRequestIdentify(o);
  if (requestPending[key]) {
    return Promise.reject("-999");
  } else {
    requestPending[key] = 1;
  }
  return new Promise((resolve, reject) => {
    http(o)
      .then((res) => {
        return resolve(res.data);
      })
      .catch(reject);
  });
};