<template>
  <section class="project-showcase py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5" data-aos="fade-up">
          <h2 class="section-title">
            成功<span class="gradient-text">案例展示</span>
          </h2>
          <p class="section-subtitle">见证Web3项目的腾飞之路</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <!-- 项目轮播 -->
          <div class="project-carousel" ref="carouselRef">
            <div 
              v-for="(project, index) in projects"
              :key="index"
              class="project-card"
              :class="{ active: index === activeIndex }"
              @click="setActiveProject(index)"
              data-aos="flip-left"
              :data-aos-delay="index * 100"
            >
              <div class="project-image">
                <div class="project-logo">
                  <span>{{ project.name.charAt(0) }}</span>
                </div>
                <div class="project-category">{{ project.category }}</div>
              </div>
              
              <div class="project-content">
                <h4>{{ project.name }}</h4>
                <p>{{ project.description }}</p>
                
                <div class="project-stats">
                  <div class="stat-item">
                    <span class="stat-value">{{ project.marketCap }}</span>
                    <span class="stat-label">市值</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-value">{{ project.roi }}</span>
                    <span class="stat-label">投资回报</span>
                  </div>
                </div>
                
                <div class="project-tags">
                  <span 
                    v-for="tag in project.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <div class="project-status">
                  <div class="status-indicator" :class="project.status"></div>
                  <span>{{ getStatusText(project.status) }}</span>
                </div>
              </div>
              
              <!-- 悬浮效果 -->
              <div class="project-overlay">
                <div class="overlay-content">
                  <i class="fas fa-external-link-alt"></i>
                  <span>查看详情</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 导航点 -->
          <div class="carousel-dots">
            <button
              v-for="(project, index) in projects"
              :key="index"
              class="dot"
              :class="{ active: index === activeIndex }"
              @click="setActiveProject(index)"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ProjectShowcase',
  setup() {
    const activeIndex = ref(0)
    const carouselRef = ref(null)
    let autoPlayInterval = null

    const projects = ref([
      {
        name: 'DeFiProtocol',
        category: 'DeFi',
        description: '去中心化金融协议，提供流动性挖矿和收益聚合服务',
        marketCap: '$50M',
        roi: '+1200%',
        tags: ['DeFi', 'Yield Farming', 'Liquidity'],
        status: 'success'
      },
      {
        name: 'MetaNFT',
        category: 'NFT',
        description: '元宇宙NFT市场，连接创作者与收藏家',
        marketCap: '$25M',
        roi: '+800%',
        tags: ['NFT', 'Metaverse', 'Art'],
        status: 'success'
      },
      {
        name: 'GameFi World',
        category: 'GameFi',
        description: '区块链游戏生态，Play-to-Earn模式',
        marketCap: '$35M',
        roi: '+650%',
        tags: ['GameFi', 'P2E', 'Gaming'],
        status: 'active'
      },
      {
        name: 'Web3Social',
        category: 'Social',
        description: '去中心化社交平台，用户拥有数据主权',
        marketCap: '$15M',
        roi: '+450%',
        tags: ['Social', 'Web3', 'Privacy'],
        status: 'active'
      },
      {
        name: 'CrossChain',
        category: 'Infrastructure',
        description: '跨链桥协议，连接多个区块链网络',
        marketCap: '$40M',
        roi: '+900%',
        tags: ['Bridge', 'Cross-chain', 'Infrastructure'],
        status: 'pending'
      }
    ])

    const setActiveProject = (index) => {
      activeIndex.value = index
    }

    const getStatusText = (status) => {
      const statusMap = {
        success: '已上市',
        active: '孵化中',
        pending: '筹备中'
      }
      return statusMap[status] || '未知'
    }

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => {
        activeIndex.value = (activeIndex.value + 1) % projects.value.length
      }, 4000)
    }

    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        autoPlayInterval = null
      }
    }

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    return {
      projects,
      activeIndex,
      carouselRef,
      setActiveProject,
      getStatusText
    }
  }
}
</script>

<style scoped>
.project-showcase {
  background: linear-gradient(135deg, #1a1f3a 0%, #0a0f2e 100%);
  position: relative;
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

.project-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
  opacity: 0.7;
  transform: scale(0.95);
}

.project-card.active {
  opacity: 1;
  transform: scale(1);
  border-color: #00d4ff;
  box-shadow: 0 25px 50px rgba(0, 212, 255, 0.3);
}

.project-card:hover {
  transform: scale(1.02);
  border-color: #00d4ff;
}

.project-image {
  position: relative;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.project-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #00d4ff, #8b5cf6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.project-category {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-content h4 {
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.project-content p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.stat-value {
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  color: #00d4ff;
  margin-bottom: 0.3rem;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-indicator.success {
  background: #10b981;
}

.status-indicator.active {
  background: #f59e0b;
}

.status-indicator.pending {
  background: #6b7280;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 212, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #00d4ff;
  transform: scale(1.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .project-carousel {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .project-card {
    padding: 1.5rem;
  }
  
  .project-stats {
    grid-template-columns: 1fr;
  }
}
</style>