<template>
  <div class="particle-background">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
    
    <!-- 静态几何背景 -->
    <div class="geometric-bg">
      <div class="hex-grid">
        <div 
          v-for="i in 20" 
          :key="i" 
          class="hexagon"
          :style="getHexagonStyle(i)"
        ></div>
      </div>
      
      <!-- 浮动圆圈 -->
      <div class="floating-circles">
        <div 
          v-for="i in 8" 
          :key="i" 
          class="circle"
          :style="getCircleStyle(i)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'ParticleBackground',
  setup() {
    const canvasRef = ref(null)
    let animationId = null
    let particles = []

    class Particle {
      constructor(canvas) {
        this.canvas = canvas
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.8 + 0.2
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          'rgba(0, 212, 255, ', // 青色
          'rgba(139, 92, 246, ', // 紫色
          'rgba(16, 185, 129, ', // 绿色
          'rgba(245, 158, 11, ' // 金色
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // 边界检测
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1

        // 保持在边界内
        this.x = Math.max(0, Math.min(this.canvas.width, this.x))
        this.y = Math.max(0, Math.min(this.canvas.height, this.y))
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color + this.opacity + ')'
        ctx.fill()
        
        // 添加发光效果
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color + '0.5)'
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    const initParticles = (canvas) => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas))
      }
    }

    const drawConnections = (ctx) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.3
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      const canvas = canvasRef.value
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制粒子
      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      // 绘制连接线
      drawConnections(ctx)

      animationId = requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.value
      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas)
    }

    const getHexagonStyle = (index) => {
      const angle = (index * 137.5) % 360 // 黄金角度分布
      const radius = 300 + Math.random() * 400
      const x = 50 + (Math.cos(angle * Math.PI / 180) * radius / 8)
      const y = 50 + (Math.sin(angle * Math.PI / 180) * radius / 8)
      
      return {
        left: `${Math.max(0, Math.min(90, x))}%`,
        top: `${Math.max(0, Math.min(90, y))}%`,
        animationDelay: `${index * 0.5}s`,
        transform: `rotate(${angle}deg) scale(${0.5 + Math.random() * 0.5})`
      }
    }

    const getCircleStyle = (index) => {
      return {
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        animationDelay: `${index * 0.8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }
    }

    onMounted(() => {
      const canvas = canvasRef.value
      if (canvas) {
        resizeCanvas()
        animate()
        window.addEventListener('resize', resizeCanvas)
      }
    })

    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', resizeCanvas)
    })

    return {
      canvasRef,
      getHexagonStyle,
      getCircleStyle
    }
  }
}
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(135deg, #0a0f2e 0%, #1a1f3a 50%, #0a0f2e 100%);
  overflow: hidden;
}

.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.geometric-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hex-grid {
  position: relative;
  width: 100%;
  height: 100%;
}

.hexagon {
  position: absolute;
  width: 30px;
  height: 30px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.2);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: hexFloat 12s ease-in-out infinite;
}

@keyframes hexFloat {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translateY(-20px) rotate(120deg) scale(1.1);
    opacity: 0.6;
  }
  66% {
    transform: translateY(10px) rotate(240deg) scale(0.9);
    opacity: 0.4;
  }
}

.floating-circles {
  position: relative;
  width: 100%;
  height: 100%;
}

.circle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #00d4ff, transparent);
  border-radius: 50%;
  animation: circleFloat 16s linear infinite;
}

@keyframes circleFloat {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(0.5);
    opacity: 0;
  }
}

/* 添加渐变叠加 */
.particle-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 30%);
  pointer-events: none;
}

/* 鼠标交互效果 */
.particle-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 212, 255, 0.05), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hexagon {
    width: 20px;
    height: 20px;
  }
  
  .circle {
    width: 3px;
    height: 3px;
  }
}

/* 性能优化 */
@media (prefers-reduced-motion: reduce) {
  .hexagon,
  .circle {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  
  .particle-canvas {
    display: none;
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .particle-background {
    z-index: -10; /* 在移动端降低更多层级 */
  }
  
  /* 减少移动端特效复杂度 */
  .hexagon {
    animation-duration: 20s; /* 减慢动画提升性能 */
  }
  
  .circle {
    animation-duration: 24s; /* 减慢动画提升性能 */
  }
  
  /* 简化移动端渐变效果 */
  .particle-background::before {
    opacity: 0.5; /* 降低透明度 */
  }
  
  .particle-background::after {
    display: none; /* 移动端隐藏鼠标交互效果 */
  }
}

/* 超小屏幕进一步优化 */
@media (max-width: 480px) {
  .particle-background {
    z-index: -20; /* 进一步降低层级 */
  }
  
  /* 减少粒子数量 */
  .hexagon:nth-child(n+6) {
    display: none; /* 隐藏部分粒子 */
  }
  
  .circle:nth-child(n+11) {
    display: none; /* 隐藏部分圆点 */
  }
}
</style>