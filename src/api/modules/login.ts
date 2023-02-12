import AuthButtons from "@/assets/json/authButtons.json";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
import { Login } from "../interface";
import { PORT1 } from '@/api/config/servicePort';
import baseService from '@/service/baseService';

export const getAuthButtonListApi = () => {
  return AuthButtons
}

export const getAuthMenuListApi = () => {
  return DynamicRouter
}

export const loginApi = (loginForm: Login.ReqLoginForm) => {
  return baseService.post<Login.ResLogin>(PORT1 + "/login", loginForm);
}
