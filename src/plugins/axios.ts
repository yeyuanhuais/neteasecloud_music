import axios, { AxiosError, type AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

// 处理  类型“AxiosResponse<any, any>”上不存在属性“”。ts(2339) 脑壳疼！关键一步。
// declare module "axios" {
//   interface AxiosResponse<T = any, D = any> {
//     data: T;
//     status: number;
//     statusText: string;
//     headers: AxiosResponseHeaders;
//     config: AxiosRequestConfig<D>;
//     request?: any;
//     // 这里追加你的参数
//     [propName: string]: any;
//   }
//   interface AxiosInstance {
//     (config?: AxiosRequestConfig): Promise<any>;
//   }
//   export function create(config?: AxiosRequestConfig): AxiosInstance;
// }

const _axios = axios.create({
  baseURL: "/api",
  timeout: 20 * 1000,
  maxBodyLength: 5 * 1024 * 1024,
  withCredentials: true,
});

_axios.interceptors.request.use(
  config => {
    config.params = {
      ...config.params,
      t: Date.now(),
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    return res;
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 400:
        message = "接口不可用";
        // 这里可以触发退出的 action
        break;
      case 401:
        message = "token 失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }
    ElMessage({
      showClose: true,
      message,
      type: "error",
      grouping: true,
    });
    return Promise.reject(error.response?.data);
  }
);
export default _axios;
