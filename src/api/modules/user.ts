import baseService from '@/service/baseService';
import { PORT1 } from '@/api/config/servicePort';
import { User } from '@/api/interface/index'

export const getUserList = (params: User.ReqUserParams) => {
  return baseService.post<User.ResUserPage>(PORT1 + `/user/list`, params)
}

export const getUserGender = () => {
  return baseService.get<User.ResGender>(PORT1 + `/user/gender`)
}

// * 获取用户状态
export const getUserStatus = () => {
	return baseService.get<User.ResStatus>(PORT1 + `/user/status`);
};