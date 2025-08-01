<template>
  <div class="services-page">
    <!-- Hyperspeed Background Effect -->
    <div class="hyperspeed-background">
      <Hyperspeed :effect-options="effectOptions" />
    </div>
    
    <!-- Content -->
    <div class="content-wrapper">
      <div class="container py-5">
        <div class="row">
          <div class="col-12 text-center mb-5" data-aos="fade-up">
            <h1 class="gradient-text">{{ getText('services.title') }}</h1>
            <p class="lead">{{ getText('services.subtitle') }}</p>
          </div>
        </div>
        
        <div class="row g-4">
          <div v-for="(service, index) in services" :key="index" class="col-lg-6" data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="service-card h-100">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Hyperspeed from '../components/Hyperspeed.vue'
import { hyperspeedPresets } from '../components/HyperspeedPresets'
import { useLanguage } from '../composables/useLanguage.js'

// 使用预设配置
const effectOptions = ref(hyperspeedPresets.one)

const { getText } = useLanguage()

const serviceKeys = ['project', 'community', 'listing', 'investment', 'trading']
const serviceIcons = [
  'fas fa-rocket',
  'fas fa-users',
  'fas fa-chart-line',
  'fas fa-handshake',
  'fas fa-exchange-alt'
]

const services = computed(() => {
  return serviceKeys.map((key, index) => ({
    icon: serviceIcons[index],
    title: getText(`services.items.${key}.title`),
    description: getText(`services.items.${key}.description`),
    features: getText(`services.items.${key}.features`)
  }))
})
</script>

<style scoped>
.services-page {
  position: relative;
  min-height: 100vh;
}

.hyperspeed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: #000;
  cursor: pointer;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  padding-top: 100px;
}

.service-card {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin: 1rem 0;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: #00d4ff;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
  background: rgba(0, 0, 0, 0.9);
}

.service-icon {
  font-size: 3rem;
  color: #00d4ff;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.service-card h3 {
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.service-card p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.service-features {
  list-style: none;
  padding: 0;
}

.service-features li {
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

/* 为标题和描述添加更好的可读性 */
.gradient-text {
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.lead {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hyperspeed-background {
    transform: scale(0.8);
    transform-origin: center;
  }
}
</style>