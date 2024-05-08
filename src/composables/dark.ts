import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const user = ref({})
  return {
    user,
    token,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDarkStore, import.meta.hot))
