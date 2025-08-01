import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import router from './router'
import AOS from 'aos'

// 样式导入
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'aos/dist/aos.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

// 初始化AOS动画
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
})