<template>
  <section class="partnership-showcase py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5" data-aos="fade-up">
          <h2 class="section-title">
            {{ getText('partnership.title') }}<span class="gradient-text">{{ getText('partnership.titleHighlight') }}</span>
          </h2>
          <p class="section-subtitle">{{ getText('partnership.subtitle') }}</p>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <!-- 交易所网格 -->
          <div class="exchanges-grid">
            <div 
              v-for="(exchange, index) in exchanges"
              :key="index"
              class="exchange-card"
              @mouseenter="activateCard(index)"
              @mouseleave="deactivateCard(index)"
              data-aos="zoom-in"
              :data-aos-delay="index * 100"
            >
              <!-- 赛博朋克背景效果 -->
              <div class="cyber-background">
                <div class="circuit-lines"></div>
                <div class="data-stream"></div>
                <div class="pulse-effect"></div>
              </div>
              
              <!-- 交易所内容 -->
              <div class="exchange-content">
                <div class="exchange-logo">
                  <div class="logo-container">
                    <img 
                      :src="exchange.logoImg" 
                      :alt="exchange.name + ' Logo'"
                      class="logo-image"
                      @error="handleImageError"
                    />
                    <div class="hologram-effect"></div>
                  </div>
                </div>
                
                <div class="exchange-info">
                  <h4 class="exchange-name">{{ exchange.name }}</h4>
                  <p class="exchange-description">{{ exchange.description }}</p>
                  
                  <div class="partnership-stats">
                    <div class="stat-item">
                      <span class="stat-value">{{ exchange.volume }}</span>
                      <span class="stat-label">{{ getText('partnership.stats.volume') }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-value">{{ exchange.users }}</span>
                      <span class="stat-label">{{ getText('partnership.stats.users') }}</span>
                    </div>
                  </div>
                  
                  <div class="partnership-status">
                    <div class="status-indicator active"></div>
                    <span>{{ getText('partnership.stats.status') }}</span>
                  </div>
                </div>
              </div>
              
              <!-- 悬浮特效 -->
              <div class="cyber-overlay">
                <div class="scanning-line"></div>
                <div class="digital-particles"></div>
                <div class="neon-border"></div>
              </div>
            </div>
          </div>
          
          <!-- 合作统计 -->
          <div class="partnership-summary text-center mt-5" data-aos="fade-up">
            <div class="row">
              <div class="col-md-4">
                <div class="summary-item">
                  <div class="summary-number">{{ exchanges.length }}</div>
                  <div class="summary-label">{{ getText('partnership.summary.exchanges') }}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="summary-item">
                  <div class="summary-number">$2.5T+</div>
                  <div class="summary-label">{{ getText('partnership.summary.totalVolume') }}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="summary-item">
                  <div class="summary-number">50M+</div>
                  <div class="summary-label">{{ getText('partnership.summary.coverage') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

// 导入交易所logo图片
import BinanceLogo from '@/assets/images/logos/exchanges/Binance.jpg'
import BybitLogo from '@/assets/images/logos/exchanges/Bybit.jpg'
import BitgetLogo from '@/assets/images/logos/exchanges/Bitget.jpg'
import KuCoinLogo from '@/assets/images/logos/exchanges/KuCoin.jpg'
import GateLogo from '@/assets/images/logos/exchanges/Gate.io.jpg'
import MEXCLogo from '@/assets/images/logos/exchanges/MEXC.jpg'
import BingXLogo from '@/assets/images/logos/exchanges/BingX.jpg'
import LBankLogo from '@/assets/images/logos/exchanges/LBank.jpg'
import WeexLogo from '@/assets/images/logos/exchanges/Weex.jpg'
import UpbitLogo from '@/assets/images/logos/exchanges/upbit.png'
import BithumbLogo from '@/assets/images/logos/exchanges/bithumb.png'
import HuobiLogo from '@/assets/images/logos/exchanges/huobi.png'

export default {
  name: 'ProjectShowcase',
  setup() {
    const { getText } = useLanguage()
    const activeIndex = ref(-1)
    
    const exchangeKeys = ['binance', 'upbit', 'bithumb', 'bybit', 'bitget', 'huobi', 'kucoin', 'gate', 'mexc', 'bingx', 'lbank', 'weex']
    
    const exchangesBase = [
      { name: 'Binance', logo: 'B', logoImg: BinanceLogo, volume: '$76.5B', users: '120M+', color: '#f3ba2f' },
      { name: 'Upbit', logo: 'UP', logoImg: UpbitLogo, volume: '$3.2B', users: '8M+', color: '#1b49ff' },
      { name: 'Bithumb', logo: 'BH', logoImg: BithumbLogo, volume: '$2.7B', users: '6M+', color: '#f26a1f' },
      { name: 'Bybit', logo: 'BY', logoImg: BybitLogo, volume: '$15.2B', users: '20M+', color: '#f7a600' },
      { name: 'Bitget', logo: 'BG', logoImg: BitgetLogo, volume: '$8.9B', users: '8M+', color: '#00d4ff' },
      { name: 'Huobi', logo: 'HB', logoImg: HuobiLogo, volume: '$4.5B', users: '10M+', color: '#1c6cff' },
      { name: 'KuCoin', logo: 'KC', logoImg: KuCoinLogo, volume: '$12.3B', users: '10M+', color: '#24ae8f' },
      { name: 'Gate.io', logo: 'GT', logoImg: GateLogo, volume: '$6.7B', users: '6M+', color: '#5d2dd5' },
      { name: 'MEXC', logo: 'MX', logoImg: MEXCLogo, volume: '$4.2B', users: '5M+', color: '#07d77b' },
      { name: 'BingX', logo: 'BX', logoImg: BingXLogo, volume: '$3.8B', users: '4M+', color: '#1890ff' },
      { name: 'LBank', logo: 'LB', logoImg: LBankLogo, volume: '$2.1B', users: '3M+', color: '#2f54eb' },
      { name: 'Weex', logo: 'WX', logoImg: WeexLogo, volume: '$1.5B', users: '2M+', color: '#722ed1' }
    ]
    
    const exchanges = computed(() => {
      return exchangesBase.map((exchange, index) => ({
        ...exchange,
        description: getText(`partnership.exchanges.${exchangeKeys[index]}`)
      }))
    })

    const activateCard = (index) => {
      activeIndex.value = index
      
      // 添加脉冲效果
      const card = document.querySelectorAll('.exchange-card')[index]
      if (card) {
        card.style.transform = 'scale(1.05) rotateY(5deg)'
        card.style.boxShadow = `0 20px 40px rgba(${getCardColor(index)}, 0.4)`
      }
    }

    const deactivateCard = (index) => {
      activeIndex.value = -1
      
      // 恢复原状
      const card = document.querySelectorAll('.exchange-card')[index]
      if (card) {
        card.style.transform = 'scale(1) rotateY(0deg)'
        card.style.boxShadow = 'none'
      }
    }

    const getCardColor = (index) => {
      const colors = [
        '243, 186, 47',    // Binance yellow
        '27, 73, 255',     // Upbit blue
        '242, 106, 31',    // Bithumb orange
        '247, 166, 0',     // Bybit orange
        '0, 212, 255',     // Bitget cyan
        '28, 108, 255',    // Huobi blue
        '36, 174, 143',    // KuCoin green
        '93, 45, 213',     // Gate purple
        '7, 215, 123',     // MEXC green
        '24, 144, 255',    // BingX blue
        '47, 84, 235',     // LBank blue
        '114, 46, 209'     // Weex purple
      ]
      return colors[index] || '0, 212, 255'
    }

    const handleImageError = (event) => {
      // 如果图片加载失败，显示文字后备方案
      console.warn('Logo image failed to load:', event.target.src)
      const container = event.target.parentElement
      event.target.style.display = 'none'
      
      // 创建文字后备显示
      const textFallback = document.createElement('div')
      textFallback.className = 'logo-text-fallback'
      textFallback.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      `
      
      // 根据交易所名称显示对应文字
      const exchangeName = event.target.alt.replace(' Logo', '')
      const logoText = {
        'Binance': 'B',
        'Upbit': 'UP',
        'Bithumb': 'BH',
        'Bybit': 'BY', 
        'Bitget': 'BG',
        'Huobi': 'HB',
        'KuCoin': 'KC',
        'Gate.io': 'GT',
        'MEXC': 'MX',
        'BingX': 'BX',
        'LBank': 'LB',
        'Weex': 'WX'
      }
      
      textFallback.textContent = logoText[exchangeName] || exchangeName.charAt(0)
      container.appendChild(textFallback)
    }

    onMounted(() => {
      // 添加全局脉冲动画
      const style = document.createElement('style')
      style.textContent = `
        @keyframes digitalPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes dataFlow {
          0% { transform: translateY(100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        @keyframes hologramFlicker {
          0%, 100% { opacity: 0.8; filter: hue-rotate(0deg); }
          25% { opacity: 0.9; filter: hue-rotate(90deg); }
          50% { opacity: 0.7; filter: hue-rotate(180deg); }
          75% { opacity: 0.95; filter: hue-rotate(270deg); }
        }
      `
      document.head.appendChild(style)
    })

    return {
      getText,
      exchanges,
      activeIndex,
      activateCard,
      deactivateCard,
      getCardColor,
      handleImageError
    }
  }
}
</script>

<style scoped>
/* 赛博朋克机构合作样式 */
.partnership-showcase {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.partnership-showcase::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  position: relative;
}

.gradient-text {
  background: linear-gradient(45deg, #00d4ff, #8b5cf6, #00d4ff);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.section-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
}

/* 交易所网格布局 */
.exchanges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  perspective: 1000px;
}

/* 交易所卡片 */
.exchange-card {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 2rem;
  position: relative;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  backdrop-filter: blur(15px);
  overflow: hidden;
  transform-style: preserve-3d;
}

.exchange-card:hover {
  border-color: #00d4ff;
  box-shadow: 
    0 0 30px rgba(0, 212, 255, 0.4),
    inset 0 0 30px rgba(0, 212, 255, 0.1);
  transform: translateY(-10px) rotateX(5deg);
}

/* 赛博朋克背景效果 */
.cyber-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 15px;
}

.circuit-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, transparent 48%, rgba(0, 212, 255, 0.2) 49%, rgba(0, 212, 255, 0.2) 51%, transparent 52%),
    linear-gradient(0deg, transparent 48%, rgba(139, 92, 246, 0.1) 49%, rgba(139, 92, 246, 0.1) 51%, transparent 52%);
  background-size: 50px 50px;
  animation: circuitFlow 8s linear infinite;
}

@keyframes circuitFlow {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.data-stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #00d4ff, transparent);
  animation: dataFlow 3s linear infinite;
}

.pulse-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: digitalPulse 4s ease-in-out infinite;
}

/* 交易所内容 */
.exchange-content {
  position: relative;
  z-index: 2;
}

.exchange-logo {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.logo-container {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #00d4ff, #8b5cf6);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
}

.logo-image {
  width: 76px;
  height: 76px;
  object-fit: cover;
  border-radius: 50%;
  filter: brightness(1.1) contrast(1.1);
  transition: all 0.3s ease;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.exchange-card:hover .logo-image {
  filter: brightness(1.2) contrast(1.2) drop-shadow(0 0 15px rgba(0, 212, 255, 0.8));
  transform: scale(1.05);
  background: rgba(255, 255, 255, 1);
  border-color: rgba(0, 212, 255, 0.6);
}

/* 为了更好的logo显示效果，添加一些特殊处理 */
.logo-image {
  /* 确保logo居中显示 */
  object-position: center;
  /* 增强锐度 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.hologram-effect {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid rgba(0, 212, 255, 0.6);
  border-radius: 50%;
  animation: hologramFlicker 2s ease-in-out infinite;
}

.exchange-info {
  text-align: center;
}

.exchange-name {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.exchange-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* 合作统计 */
.partnership-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.exchange-card:hover .stat-item::before {
  left: 100%;
}

.stat-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #00d4ff;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.partnership-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00d4ff;
  animation: digitalPulse 2s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
}

/* 悬浮特效 */
.cyber-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 15px;
  overflow: hidden;
}

.exchange-card:hover .cyber-overlay {
  opacity: 1;
}

.scanning-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  animation: scanLine 2s linear infinite;
}

.digital-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(2px 2px at 20px 30px, rgba(0, 212, 255, 0.8), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(139, 92, 246, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(0, 212, 255, 0.8), transparent);
  background-repeat: repeat;
  background-size: 200px 200px;
  animation: particleFloat 6s linear infinite;
}

@keyframes particleFloat {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-200px, -200px); }
}

.neon-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #00d4ff;
  border-radius: 15px;
  box-shadow: 
    0 0 20px rgba(0, 212, 255, 0.6),
    inset 0 0 20px rgba(0, 212, 255, 0.2);
  animation: neonGlow 2s ease-in-out infinite alternate;
}

@keyframes neonGlow {
  from { 
    box-shadow: 
      0 0 20px rgba(0, 212, 255, 0.6),
      inset 0 0 20px rgba(0, 212, 255, 0.2);
  }
  to { 
    box-shadow: 
      0 0 40px rgba(0, 212, 255, 0.8),
      inset 0 0 40px rgba(0, 212, 255, 0.4);
  }
}

/* 合作统计摘要 */
.partnership-summary {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 3rem 2rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.partnership-summary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.05), transparent);
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.summary-item {
  position: relative;
  z-index: 1;
}

.summary-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #00d4ff;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
  margin-bottom: 0.5rem;
}

.summary-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .exchanges-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .exchange-card {
    padding: 1.5rem;
  }
  
  .partnership-stats {
    grid-template-columns: 1fr;
  }
  
  .partnership-summary {
    padding: 2rem 1rem;
  }
  
  .summary-number {
    font-size: 2rem;
  }
  
  .logo-container {
    width: 60px;
    height: 60px;
  }
  
  .logo-image {
    width: 56px;
    height: 56px;
    padding: 2px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .exchange-card {
    padding: 1rem;
  }
  
  .exchanges-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* 脉冲动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}
</style>