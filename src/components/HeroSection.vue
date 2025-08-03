<template>
  <section class="hero-section">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 text-center" data-aos="fade-up">
          <h1 class="hero-title">
            <span class="gradient-text">{{ getText('hero.title') }}</span>
            <br>{{ getText('hero.subtitle') }}
          </h1>
          <div class="hero-buttons">
            <router-link to="/contact" class="btn btn-primary btn-lg me-3">{{ getText('hero.startCooperation') }}</router-link>
            <router-link to="/services" class="btn btn-outline-light btn-lg">{{ getText('hero.learnMore') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'HeroSection',
  setup() {
    const { getText } = useLanguage()
    
    return {
      getText
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0a0f2e 0%, #1a1f3a 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw; /* 防止宽度溢出 */
  display: flex;
  align-items: flex-start; /* 改为顶部对齐 */
  justify-content: center; /* 水平居中 */
  margin-top: 0;
  padding-top: 5px; /* 减少顶部间距，让内容更靠近导航栏 */
  box-sizing: border-box;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-align: center;
}

.gradient-text {
  background: linear-gradient(45deg, #00d4ff, #8b5cf6, #10b981);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-flow 3s ease-in-out infinite;
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}





.hero-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  background: linear-gradient(45deg, #00d4ff, #8b5cf6);
  border: none;
  border-radius: 30px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 212, 255, 0.5);
  color: white;
}

.btn-outline-light {
  border: 2px solid rgba(255, 255, 255, 0.4);
  color: white;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00d4ff;
  color: #00d4ff;
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 212, 255, 0.3);
}

/* 平板设备 */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3.2rem;
  }
  

}

/* 手机设备 */
@media (max-width: 768px) {
  .hero-section {
    max-width: 100vw;
    overflow-x: hidden;
    padding: 10px 10px 0 10px; /* 为移动端导航栏留出空间，更靠近导航栏 */
  }
  
  .hero-title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    word-wrap: break-word;
  }
  

  

  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .btn-lg {
    font-size: 1rem;
    padding: 0.8rem 2rem;
    width: 100%;
    max-width: calc(100vw - 40px);
    box-sizing: border-box;
  }
}

/* 小屏幕手机 */
@media (max-width: 480px) {
  .hero-section {
    padding-top: 5px; /* 小屏幕手机的顶部间距，更靠近导航栏 */
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  

  

  
  .btn-lg {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
    max-width: 280px;
  }
}
</style>
