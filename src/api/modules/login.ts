import AuthButtons from "@/assets/json/authButtons.json";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
import { Login } from "../interface";

export const getAuthButtonListApi = () => {
  return AuthButtons
}

export const getAuthMenuListApi = () => {
  return DynamicRouter
}

export const loginApi = (loginForm: Login.ReqLoginForm) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({"code":200,"data":{"access_token":"bqddxxwqmfncffacvbpkuxvwvqrhln"},"msg":"成功"})
    }, 2000)
  })
}
