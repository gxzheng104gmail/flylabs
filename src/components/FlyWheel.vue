<template>
  <div class="flywheel-container">
    <div class="flywheel" :class="{ spinning: isSpinning }">
      <!-- 中心圆环 -->
      <div class="center-ring">
        <div class="inner-ring"></div>
        <div class="logo">FL</div>
      </div>
      
      <!-- 服务节点 -->
      <div 
        v-for="(service, index) in services" 
        :key="index"
        class="service-node"
        :style="getNodeStyle(index)"
        @mouseenter="handleNodeHover(index)"
        @mouseleave="handleNodeLeave"
      >
        <div class="node-icon">
          <i :class="service.icon"></i>
        </div>
        <div class="node-label">{{ service.name }}</div>
      </div>
      
      <!-- 连接线 -->
      <svg class="connections" viewBox="0 0 400 400">
        <circle 
          v-for="(service, index) in services"
          :key="`line-${index}`"
          cx="200" 
          cy="200" 
          r="150"
          fill="none"
          :stroke="hoveredNode === index ? '#00d4ff' : '#8b5cf6'"
          stroke-width="2"
          stroke-dasharray="10,10"
          :style="{ strokeDashoffset: animatedOffset }"
          opacity="0.6"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'FlyWheel',
  setup() {
    const isSpinning = ref(false)
    const hoveredNode = ref(-1)
    const animatedOffset = ref(0)
    let animationFrame = null

    const services = ref([
      { name: '项目搭建', icon: 'fas fa-rocket' },
      { name: '社区资源', icon: 'fas fa-users' },
      { name: '上所孵化', icon: 'fas fa-chart-line' },
      { name: '投资推荐', icon: 'fas fa-handshake' },
      { name: '项目交易', icon: 'fas fa-exchange-alt' }
    ])

    const getNodeStyle = (index) => {
      const angle = (index * 72 - 90) * (Math.PI / 180) // 72度间隔，从顶部开始
      const radius = 120
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      return {
        transform: `translate(${x}px, ${y}px)`,
        '--node-delay': `${index * 0.1}s`
      }
    }

    const handleNodeHover = (index) => {
      hoveredNode.value = index
      isSpinning.value = true
    }

    const handleNodeLeave = () => {
      hoveredNode.value = -1
      isSpinning.value = false
    }

    const animate = () => {
      animatedOffset.value -= 0.5
      animationFrame = requestAnimationFrame(animate)
    }

    onMounted(() => {
      animate()
      
      // 飞轮自动缓慢转动
      gsap.to('.flywheel', {
        rotation: 360,
        duration: 30,
        ease: 'none',
        repeat: -1
      })
    })

    onUnmounted(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    })

    return {
      services,
      isSpinning,
      hoveredNode,
      animatedOffset,
      getNodeStyle,
      handleNodeHover,
      handleNodeLeave
    }
  }
}
</script>

<style scoped>
.flywheel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
}

.flywheel {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.flywheel.spinning {
  animation: spin-faster 2s linear infinite;
}

@keyframes spin-faster {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.center-ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 3px solid #00d4ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 212, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.6);
    transform: scale(1.05);
  }
}

.inner-ring {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 2px solid #8b5cf6;
  border-radius: 50%;
  opacity: 0.7;
  animation: counter-rotate 20s linear infinite;
}

@keyframes counter-rotate {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d4ff;
  z-index: 2;
}

.service-node {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: float var(--node-delay, 0s) infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.service-node:hover {
  transform: scale(1.2);
  background: rgba(0, 212, 255, 0.3);
  border-color: #00d4ff;
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
}

.node-icon {
  font-size: 1.2rem;
  color: #00d4ff;
  margin-bottom: 2px;
}

.node-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: 500;
  line-height: 1.1;
}

.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .flywheel-container {
    height: 300px;
  }
  
  .flywheel {
    width: 250px;
    height: 250px;
  }
  
  .service-node {
    width: 50px;
    height: 50px;
  }
  
  .node-icon {
    font-size: 1rem;
  }
  
  .node-label {
    font-size: 0.6rem;
  }
  
  .center-ring {
    width: 60px;
    height: 60px;
  }
  
  .inner-ring {
    width: 45px;
    height: 45px;
  }
  
  .logo {
    font-size: 1.2rem;
  }
}
</style>