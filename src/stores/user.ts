// import { defineStore } from 'pinia'

// export const useUserStore = defineStore({
//   id: 'user',
//   state: () => {
//     return {
//       name: '张三'
//     }
//   },
//   actions: {
//     updateName(name: string) {
//        this.name = name
//      }
//   },
//   persist: {
//     enabled: true,
//     strategies: [{
//       key: 'user_id',
//       storage: localStorage
//     }]
//   }
// })
import { defineStore } from 'pinia';
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三',
      age: 34,
      gender: '男'
    }
  },
  getters: {
    fullName(state) {
      return state.name + '丰'
    },
  },
  actions: {
    async updateName(name: string) {
      await this.setName(name)
    },
    setName(name: string) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.name = name;
          resolve({})
        }, 2000)
      })
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_user',
        storage: localStorage,
        paths: ['name', 'age']
      }
    ]
  }
})