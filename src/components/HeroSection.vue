<template>
  <section class="hero-section">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 text-center" data-aos="fade-up">
          <h1 class="hero-title">
            <span class="gradient-text">FlyLabs</span>
            <br>Web3加速器
          </h1>
          <p class="hero-subtitle">
            从0到1的项目孵化，助力Web3创新项目腾飞
          </p>
          <div class="hero-features">
            <div class="feature-item" v-for="feature in features" :key="feature">
              <i class="fas fa-check-circle feature-icon"></i>
              <span class="feature-text">{{ feature }}</span>
            </div>
          </div>
          <div class="hero-buttons">
            <router-link to="/contact" class="btn btn-primary btn-lg me-3">开始合作</router-link>
            <router-link to="/services" class="btn btn-outline-light btn-lg">了解更多</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      features: [
        '全方位项目孵化服务',
        '丰富的社区与投资资源',
        '专业的技术团队支持',
        '成熟的商业落地经验'
      ]
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
  display: flex;
  align-items: center;
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
  gap: 1rem;
  margin-bottom: 3rem;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.feature-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem 2rem;
  border-radius: 30px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-height: 60px;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.2);
}

.feature-icon {
  position: absolute;
  left: 1.5rem;
  color: #10b981;
  font-size: 1.2rem;
}

.feature-text {
  width: 100%;
  text-align: center;
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-features {
    max-width: 350px;
  }
  
  .feature-item {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
    min-height: 50px;
  }
  
  .feature-icon {
    left: 1rem;
    font-size: 1rem;
  }
  
  .feature-text {
    padding: 0 2.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-lg {
    font-size: 1rem;
    padding: 0.8rem 2rem;
    width: 100%;
    max-width: 300px;
  }
}
</style>
