import { defineStore, createPinia } from 'pinia'
import { GlobalState, ThemeConfigProps } from './interface'
import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const GlobalStore = defineStore({
  id: 'GlobalState',
  state: (): GlobalState => ({
    token: '',
    userInfo: '',
    assemblySize: 'default',
    language: '',
    themeConfig: {
      layout: 'vertical'
    }
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    updateLanguage(language: string) {
      this.language = language
    },
    setAssemblySizeSize(assemblySize: string) {
      this.assemblySize = assemblySize
    },
    setThemeConfig(themeConfig: ThemeConfigProps) {
      this.themeConfig = themeConfig
    }
  },
  persist: piniaPersistConfig('GlobalState')
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia