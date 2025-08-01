<template>
  <section class="hero-section">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 text-center" data-aos="fade-up">
          <h1 class="hero-title">
            <span class="gradient-text">{{ getText('hero.title') }}</span>
            <br>{{ getText('hero.subtitle') }}
          </h1>
          <p class="hero-subtitle">
            {{ getText('hero.description') }}
          </p>
          <div class="hero-features">
            <div class="feature-item" v-for="feature in features" :key="feature">
              <i class="fas fa-check-circle"></i>
              <span>{{ feature }}</span>
            </div>
          </div>
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
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'HeroSection',
  setup() {
    const { getText } = useLanguage()
    
    const features = computed(() => {
      return getText('hero.features')
    })
    
    return {
      getText,
      features
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
  align-items: center;
  margin-top: 0;
  padding-top: 0;
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

.hero-subtitle {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-features {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 3rem auto;
  width: 100%;
  max-width: 500px;
  padding: 0 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  max-width: 100%;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 2rem;
  border-radius: 30px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-height: 60px;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.2);
}

.feature-item i {
  color: #10b981;
  font-size: 1.2rem;
  min-width: 20px;
  flex-shrink: 0;
  position: absolute;
  left: 1.5rem;
}

.feature-item span {
  flex: 1;
  text-align: center;
  word-wrap: break-word;
  line-height: 1.4;
  width: 100%;
  padding: 0 3rem;
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
  
  .hero-features {
    max-width: 450px;
  }
  
  .feature-item {
    padding: 1rem 1.8rem;
  }
  
  .feature-item span {
    padding: 0 2.8rem;
  }
}

/* 手机设备 */
@media (max-width: 768px) {
  .hero-section {
    max-width: 100vw;
    overflow-x: hidden;
    padding: 0 10px;
  }
  
  .hero-title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    word-wrap: break-word;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
    max-width: 100%;
  }
  
  .hero-features {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .feature-item {
    font-size: 1rem;
    padding: 1rem 1.5rem;
    min-height: 60px;
    margin: 0 auto;
    width: 100%;
    max-width: calc(100vw - 40px);
    box-sizing: border-box;
  }
  
  .feature-item span {
    font-size: 0.95rem;
    line-height: 1.5;
    padding: 0 2.8rem;
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
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-features {
    padding: 0 0.5rem;
  }
  
  .feature-item {
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
    min-height: 55px;
    max-width: 320px;
  }
  
  .feature-item i {
    font-size: 1rem;
    left: 1rem;
  }
  
  .feature-item span {
    padding: 0 2.5rem;
    font-size: 0.9rem;
  }
  
  .btn-lg {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
    max-width: 280px;
  }
}
</style>
