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
            <h1 class="gradient-text">我们的服务</h1>
            <p class="lead">全方位Web3项目孵化服务，助力您的项目腾飞</p>
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
import { ref } from 'vue'
import Hyperspeed from '../components/Hyperspeed.vue'
import { hyperspeedPresets } from '../components/HyperspeedPresets'

// 使用预设配置
const effectOptions = ref(hyperspeedPresets.one)

const services = ref([
  {
    icon: 'fas fa-rocket',
    title: '0-1项目搭建',
    description: '从概念到实现，全程技术指导和数据优化',
    features: ['技术架构设计', '智能合约开发', '前端界面开发', '性能优化', '安全审计']
  },
  {
    icon: 'fas fa-users',
    title: '社区资源整合',
    description: '丰富的社区资源，助力NFT销售和用户增长',
    features: ['社区运营策略', 'NFT营销推广', '用户获取渠道', 'KOL合作资源', '社交媒体管理']
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Listing上所孵化',
    description: '对接顶级交易所，提供上币全流程服务',
    features: ['交易所对接', '上币流程指导', '市值管理', '流动性支持', '合规咨询']
  },
  {
    icon: 'fas fa-handshake',
    title: '投资机构推荐',
    description: '连接优质投资机构，为项目提供资金支持',
    features: ['投资人介绍', '融资策略制定', '商业计划书优化', '路演安排', '投后服务']
  },
  {
    icon: 'fas fa-exchange-alt',
    title: '项目买卖',
    description: '提供优质项目资源，项目交易服务',
    features: ['项目评估', '资产整合', '法律咨询', '交易撮合', '风险控制']
  }
])
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