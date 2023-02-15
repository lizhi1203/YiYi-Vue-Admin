import baseService from '@/service/baseService';
import { PORT1 } from '@/api/config/servicePort';
import { User } from '@/api/interface/index'

export const getUserList = (params: User.ReqUserParams) => {
  return baseService.post<User.ResUserPage>(PORT1 + `/user/list`, params)
}