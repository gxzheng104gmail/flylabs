<template>
  <div id="app">
    <!-- 粒子背景 -->
    <ParticleBackground />
    
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <span class="brand-text">FlyLabs</span>
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首页</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/services">服务</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">联系我们</router-link>
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
            <p>Web3项目加速器，助力区块链创新</p>
          </div>
          <div class="col-md-6">
            <h6>联系我们</h6>
            <p>Email: contact@flylabs.io</p>
          </div>
        </div>
        <hr>
        <p class="text-center">&copy; 2024 FlyLabs. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ParticleBackground from './components/ParticleBackground.vue'

export default {
  name: 'App',
  components: {
    ParticleBackground
  }
}
</script>

<style>
/* 导航栏样式 */
.navbar {
  background: rgba(10, 15, 46, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
}

.brand-text {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #00d4ff, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #00d4ff !important;
}

/* 页脚样式 */
.footer {
  background: rgba(10, 15, 46, 0.95);
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 0 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
}
</style>