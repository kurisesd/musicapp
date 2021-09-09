import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icon/icon.css'
import '@/icon/iconfont.js'


createApp(App).use(store).use(router).mount('#app')
