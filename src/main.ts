import { createApp } from 'vue'
import './style.css'
import '@/styles/reset.scss'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import "@/styles/element.scss"
import App from './App.vue'
// pinia store
import pinia from "@/stores/index"
// vue Router
import router from '@/router/index'
import directives from '@/directives'
import 'virtual:svg-icons-register'
window.onerror = function(e) {
  console.log(['https://stackoverflow.com/search?q=[js]+' + e])
}

const app = createApp(App)
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(pinia).use(router).use(directives).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')

