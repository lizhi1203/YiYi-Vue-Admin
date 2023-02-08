import { IHttpResponse, IObject } from '@/types/interface';
import http from '@/utils/http'
import { Method } from 'axios';

/**
 * 常用CRUD
 */
export default {
  delete(path: string, params?: IObject): Promise<IHttpResponse> {
    return http({
      url: path,
      data: params,
      method: 'DELETE'
    })
  },
  get(path: string, params?: IObject, headers?: IObject): Promise<IHttpResponse> {
    return new Promise((resolve, reject) => {
      http({
        url: path,
        params,
        headers,
        method: "GET"
      })
        .then(resolve)
        .catch((error: unknown) => {
          if (error !== "-999") {
            reject(error);
          }
        });
    });
  },
  put(path: string, params?: IObject, headers?: IObject): Promise<IHttpResponse> {
   return http({
    url: path,
    data: params,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      ...headers
    },
    method: 'PUT'
   })
  },
  post(path: string, body?: IObject, headers?: IObject): Promise<IHttpResponse> {
    return http({
      url: path,
      data: body,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        ...headers
      },
      method: 'POST'
    })
  },
  download(
    path: string,
    params?: IObject,
    filename?: string,
    method: Method = 'GET'
  ): Promise<IHttpResponse> {
    const opt: any = {url: path, params, method, reponseType: 'blob'};
    if (method.toUpperCase() === 'POST') {
      opt.data = params;
      delete opt.params;
    }
    return http(opt).then((res): any => {
      const a = document.createElement("a");
      // 创建事件，内部参数有三个HTMLEvents、MouseEvents、UIEvents
      const evt = document.createEvent("MouseEvents");
      // 初始化事件(事件类型，是否冒泡，是否可取消)
      evt.initEvent("click", false, false);
      a.download = filename || new Date().getTime().toString();
      // 获取当前文件的一个内存URL
      // @ts-ignore
      a.href = URL.createObjectURL(res);
      // 事件派发
      a.dispatchEvent(evt);
    });
  }
}