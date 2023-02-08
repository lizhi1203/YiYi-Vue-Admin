import { ref, watchEffect } from 'vue';
export function useStorage(name: string, value: any[] = []) {
  let data = ref(JSON.parse(localStorage.get(name) || []))
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  return data
}