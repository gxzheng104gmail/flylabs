<template>
  <div id="app">
    <!-- 光标特效 -->
    <SplashCursor
      :SIM_RESOLUTION="128"
      :DYE_RESOLUTION="1440"
      :CAPTURE_RESOLUTION="512"
      :DENSITY_DISSIPATION="3.5"
      :VELOCITY_DISSIPATION="2"
      :PRESSURE="0.1"
      :PRESSURE_ITERATIONS="20"
      :CURL="3"
      :SPLAT_RADIUS="0.2"
      :SPLAT_FORCE="6000"
      :SHADING="true"
      :COLOR_UPDATE_SPEED="10"
      :BACK_COLOR="{ r: 0.5, g: 0, b: 0 }"
      :TRANSPARENT="true"
    />
    
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 导航栏 -->
    <nav class="navbar-floating">
      <div class="navbar-container">
        <router-link class="navbar-brand-floating" to="/">
          <span class="brand-text">FlyLabs</span>
        </router-link>
        
        <button class="navbar-toggler-floating" type="button" @click="toggleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="navbar-collapse" :class="{ show: isNavbarOpen }" id="navbarNav">
          <ul class="navbar-nav-floating">
            <li class="nav-item-floating">
              <router-link class="nav-link-floating" to="/">{{ getNavText('home') }}</router-link>
            </li>
            <li class="nav-item-floating">
              <router-link class="nav-link-floating" to="/services">{{ getNavText('services') }}</router-link>
            </li>
            <li class="nav-item-floating">
              <router-link class="nav-link-floating" to="/contact">{{ getNavText('contact') }}</router-link>
            </li>
            <li class="nav-item-floating">
              <div class="language-switcher">
                <button 
                  class="lang-btn" 
                  :class="{ active: currentLanguage === 'zh' }"
                  @click="switchLanguage('zh')"
                >
                  中
                </button>
                <span class="lang-divider">|</span>
                <button 
                  class="lang-btn" 
                  :class="{ active: currentLanguage === 'en' }"
                  @click="switchLanguage('en')"
                >
                  EN
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 路由视图 -->
    <router-view />

    <!-- 页脚 -->
    <footer class="footer mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>FlyLabs</h5>
            <p>{{ getText('footer.description') }}</p>
          </div>
          <div class="col-md-6">
            <h6>{{ getText('footer.contactTitle') }}</h6>
            <p>Email: contact@flylabs.io</p>
          </div>
        </div>
        <hr>
        <p class="text-center">&copy; 2024 FlyLabs. {{ getText('footer.copyright') }}.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ParticleBackground from './components/ParticleBackground.vue'
import SplashCursor from './components/SplashCursor.vue'
import { useLanguage } from './composables/useLanguage.js'

export default {
  name: 'App',
  components: {
    ParticleBackground,
    SplashCursor
  },
  setup() {
    const isNavbarOpen = ref(false)
    
    // 语言功能
    const { currentLanguage, getText, getNavText, switchLanguage, initLanguage } = useLanguage()
    
    const toggleNavbar = () => {
      isNavbarOpen.value = !isNavbarOpen.value
    }
    
    // 初始化语言设置
    onMounted(() => {
      initLanguage()
    })
    
    return {
      isNavbarOpen,
      toggleNavbar,
      currentLanguage,
      getText,
      getNavText,
      switchLanguage
    }
  }
}
</script>

<style>
/* 悬浮导航栏样式 */
.navbar-floating {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 90%;
  max-width: 1200px;
  background: rgba(10, 15, 46, 0.15);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 50px;
  box-shadow: 
    0 8px 32px rgba(0, 212, 255, 0.15),
    0 4px 16px rgba(139, 92, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation: navbar-glow 4s ease-in-out infinite;
}

.navbar-floating:hover {
  background: rgba(10, 15, 46, 0.25);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 
    0 12px 48px rgba(0, 212, 255, 0.25),
    0 6px 24px rgba(139, 92, 246, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateX(-50%) translateY(-2px);
}

@keyframes navbar-glow {
  0%, 100% {
    box-shadow: 
      0 8px 32px rgba(0, 212, 255, 0.15),
      0 4px 16px rgba(139, 92, 246, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 
      0 12px 40px rgba(0, 212, 255, 0.2),
      0 6px 20px rgba(139, 92, 246, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 30px;
  position: relative;
}

.navbar-brand-floating {
  text-decoration: none;
  z-index: 1;
}

.brand-text {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #00d4ff, #8b5cf6, #10b981);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
}

.navbar-collapse {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.navbar-nav-floating {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
  align-items: center;
}

.nav-item-floating {
  list-style: none;
}

.nav-link-floating {
  color: rgba(255, 255, 255, 0.9) !important;
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.nav-link-floating::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(139, 92, 246, 0.2));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 25px;
  z-index: -1;
}

.nav-link-floating:hover {
  color: #00d4ff !important;
  text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
  transform: translateY(-1px);
}

.nav-link-floating:hover::before {
  opacity: 1;
}

.nav-link-floating.router-link-active {
  color: #00d4ff !important;
  background: rgba(0, 212, 255, 0.15);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.4);
}

/* 语言切换器样式 */
.language-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
}

.lang-btn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 40px;
}

.lang-btn:hover {
  border-color: rgba(0, 212, 255, 0.6);
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
  transform: translateY(-1px);
}

.lang-btn.active {
  border-color: #00d4ff;
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
  text-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
}

.lang-divider {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
}

.navbar-toggler-floating {
  display: none;
  background: none;
  border: 2px solid rgba(0, 212, 255, 0.5);
  border-radius: 8px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navbar-toggler-floating:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: #00d4ff;
}

.navbar-toggler-icon {
  display: block;
  width: 20px;
  height: 2px;
  background: #00d4ff;
  position: relative;
  transition: all 0.3s ease;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 2px;
  background: #00d4ff;
  transition: all 0.3s ease;
}

.navbar-toggler-icon::before {
  top: -6px;
}

.navbar-toggler-icon::after {
  bottom: -6px;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .navbar-floating {
    width: 95%;
    max-width: calc(100vw - 20px);
    top: 15px;
    box-sizing: border-box;
  }
  
  .navbar-container {
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .navbar-toggler-floating {
    display: block;
  }
  
  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(10, 15, 46, 0.95);
    backdrop-filter: blur(25px);
    border-radius: 20px;
    margin-top: 10px;
    padding: 20px;
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
    border: 1px solid rgba(0, 212, 255, 0.3);
    display: none;
    justify-content: center;
  }
  
  .navbar-collapse.show {
    display: flex;
  }
  
  .navbar-nav-floating {
    flex-direction: column;
    gap: 5px;
    width: 100%;
  }
  
  .nav-link-floating {
    text-align: center;
    padding: 12px 20px;
    width: 100%;
  }
  
  .brand-text {
    font-size: 1.5rem;
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .navbar-floating {
    width: 98%;
    top: 10px;
  }
  
  .navbar-container {
    padding: 8px 15px;
  }
  
  .brand-text {
    font-size: 1.3rem;
  }
}

/* 页脚样式 */
.footer {
  background: rgba(10, 15, 46, 0.95);
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 0 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  margin-top: 80px; /* 为悬浮导航栏留出空间 */
  position: relative;
  z-index: 1; /* 确保页脚在背景特效之上 */
}

/* 主要内容区域调整 */
#app {
  padding-top: 0; /* 去掉顶部间距 */
  position: relative;
  z-index: 0; /* 确保主要内容在背景之上 */
}

@media (max-width: 768px) {
  #app {
    padding-top: 0; /* 移动端也去掉顶部间距 */
    z-index: 10 !important; /* 移动端确保内容层级最高 */
  }
  
  /* 确保移动端页脚正确显示 */
  .footer {
    z-index: 15 !important;
    background: rgba(10, 15, 46, 0.98) !important; /* 增加背景不透明度 */
  }
  
  /* 确保移动端导航栏层级最高 */
  .navbar-floating {
    z-index: 100 !important;
  }
}
</style>