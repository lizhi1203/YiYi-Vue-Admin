import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

/**
 * 持久化配置
 * @param key key值
 * @param paths 默认所有state都会进行缓存，可以通过paths指定要持久化的字段
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    paths
  }
  return persist;
}

export default piniaPersistConfig;
