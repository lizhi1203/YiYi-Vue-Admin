import router from '@/router/index'
import { GlobalStore } from '@/stores/index'
import { AuthStore } from '@/stores/modules/auth'
import { LOGIN_URL } from '@/config/config'
import { ElNotification } from 'element-plus'
import { isType } from '@/utils/util'
import { notFoundRouter } from '@/router/modules/staticRouter'


const modules = import.meta.glob('@/views/**/*.vue')

export const initDynamicRouter = async () => {
  const globalStore = GlobalStore()
  const authStore = AuthStore()
  
  try {
    // 获取菜单列表和按扭权限
    await authStore.getAuthMenuList()
    await authStore.getAuthButtonList()

    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: "无权限访问",
				message: "当前账号无任何菜单权限，请联系系统管理员！",
				type: "warning",
				duration: 3000
      });
      globalStore.setToken('')
      router.replace(LOGIN_URL)
      return Promise.reject('no permission')
    }

    authStore.flatMenuListGet.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && isType(item.component) === 'string') {
        item.component = modules['/src/views' + item.component + '.vue']
      }
      if (item.meta.isFull) {
        router.addRoute(item)
      } else {
        router.addRoute('layout', item)
      }
    })
    router.addRoute(notFoundRouter)
  } catch(error) {
    globalStore.setToken('')
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}