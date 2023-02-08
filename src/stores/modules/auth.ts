import { defineStore } from 'pinia'
import { AuthState } from './../interface/index'
import { getFlatArr, getShowMenuList } from '@/utils/util'
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login'

export const AuthStore = defineStore({
  id: 'AuthStore',
  state: (): AuthState => ({
    routeName: '',
    authButtonList: {},
    authMenuList: []
  }),
  getters: {
    authButtonListGet: state => state.authButtonList,
    authMenuListGet: state => state.authMenuList,
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    flatMenuListGet: state => getFlatArr(state.authMenuList),
  },
  actions: {
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi()
      this.authButtonList = data
    },
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi();
      this.authMenuList = data
    },
    setRouteName(name: string) {
      this.routeName = name
    }
  }
})