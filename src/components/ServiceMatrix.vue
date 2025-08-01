<template>
  <section class="service-matrix py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5" data-aos="fade-up">
          <h2 class="section-title">
            {{ getText('serviceMatrix.title') }}<span class="gradient-text">{{ getText('serviceMatrix.titleHighlight') }}</span>
          </h2>
          <p class="section-subtitle">{{ getText('serviceMatrix.subtitle') }}</p>
        </div>
      </div>
      
      <div class="row g-4">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="col-lg-4 col-md-6"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="service-card" @mouseenter="handleHover(index)" @mouseleave="handleLeave">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h4>{{ service.title }}</h4>
            <p>{{ service.description }}</p>
            
            <!-- 进度环 -->
            <div class="progress-ring">
              <svg width="60" height="60">
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="none"
                  stroke="rgba(139, 92, 246, 0.2)"
                  stroke-width="3"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  fill="none"
                  stroke="#00d4ff"
                  stroke-width="3"
                  stroke-linecap="round"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference - (service.progress / 100) * circumference"
                  class="progress-circle"
                />
              </svg>
              <span class="progress-text">{{ service.progress }}%</span>
            </div>
            
            <div class="service-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 连接线动画 -->
      <div class="connection-lines">
        <svg class="connections-svg" viewBox="0 0 1200 600">
          <path
            v-for="(path, index) in connectionPaths"
            :key="index"
            :d="path"
            fill="none"
            stroke="url(#gradient)"
            stroke-width="2"
            stroke-dasharray="5,5"
            class="connection-path"
            :style="{ animationDelay: `${index * 0.2}s` }"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0" />
              <stop offset="50%" style="stop-color:#00d4ff;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'ServiceMatrix',
  setup() {
    const { getText } = useLanguage()
    const hoveredIndex = ref(-1)
    
    const serviceKeys = ['project', 'community', 'listing', 'investment', 'trading', 'consulting']
    const serviceIcons = [
      'fas fa-rocket',
      'fas fa-users', 
      'fas fa-chart-line',
      'fas fa-handshake',
      'fas fa-exchange-alt',
      'fas fa-shield-alt'
    ]
    const serviceProgress = [95, 88, 92, 85, 78, 90]
    
    const services = computed(() => {
      return serviceKeys.map((key, index) => ({
        icon: serviceIcons[index],
        title: getText(`serviceMatrix.services.${key}.title`),
        description: getText(`serviceMatrix.services.${key}.description`),
        progress: serviceProgress[index]
      }))
    })

    const circumference = computed(() => 2 * Math.PI * 25)
    
    const connectionPaths = [
      'M 200 150 Q 400 100 600 150',
      'M 600 150 Q 800 100 1000 150',
      'M 200 350 Q 400 300 600 350',
      'M 600 350 Q 800 300 1000 350',
      'M 200 150 Q 200 250 200 350',
      'M 1000 150 Q 1000 250 1000 350'
    ]

    const handleHover = (index) => {
      hoveredIndex.value = index
    }

    const handleLeave = () => {
      hoveredIndex.value = -1
    }

    return {
      getText,
      services,
      circumference,
      connectionPaths,
      hoveredIndex,
      handleHover,
      handleLeave
    }
  }
}
</script>

<style scoped>
.service-matrix {
  background: rgba(10, 15, 46, 0.5);
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.service-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  height: 100%;
  cursor: pointer;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  transition: left 0.5s;
}

.service-card:hover::before {
  left: 100%;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: #00d4ff;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.service-icon {
  font-size: 3rem;
  color: #00d4ff;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
  color: #8b5cf6;
}

.service-card h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.service-card p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.progress-ring {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.progress-circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: 600;
  color: #00d4ff;
}

.service-arrow {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: #8b5cf6;
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.service-card:hover .service-arrow {
  opacity: 1;
  transform: translateX(0);
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connections-svg {
  width: 100%;
  height: 100%;
}

.connection-path {
  opacity: 0.3;
  animation: flow 3s linear infinite;
}

@keyframes flow {
  0% { stroke-dashoffset: 50; }
  100% { stroke-dashoffset: 0; }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .service-card {
    padding: 1.5rem;
  }
  
  .service-icon {
    font-size: 2.5rem;
  }
}
</style>