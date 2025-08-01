<template>
  <section class="data-panel py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center mb-5" data-aos="fade-up">
          <h2 class="section-title">
            <span class="gradient-text">{{ getText('dataPanel.title') }}</span>
          </h2>
          <p class="section-subtitle">{{ getText('dataPanel.subtitle') }}</p>
        </div>
      </div>
      
      <!-- 核心数据指标 -->
      <div class="row g-4 mb-5">
        <div 
          v-for="(metric, index) in metrics"
          :key="index"
          class="col-lg-3 col-md-6"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
        >
          <div class="metric-card">
            <div class="metric-icon">
              <i :class="metric.icon"></i>
            </div>
            <div class="metric-content">
              <div class="metric-value">
                <span ref="counterRefs" :data-target="metric.value">0</span>
                <span class="metric-unit">{{ metric.unit }}</span>
              </div>
              <div class="metric-label">{{ metric.label }}</div>
              <div class="metric-change" :class="metric.trend">
                <i :class="metric.trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                <span>{{ metric.change }}</span>
              </div>
            </div>
            
            <!-- 进度条 -->
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: `${metric.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 图表区域 -->
      <div class="row">
        <div class="col-lg-8" data-aos="fade-right">
          <div class="chart-container">
            <h4>{{ getText('dataPanel.charts.trend') }}</h4>
            <div class="chart" ref="trendChart">
              <!-- 简化的图表展示 -->
              <svg viewBox="0 0 600 300" class="trend-svg">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0" />
                  </linearGradient>
                </defs>
                
                <!-- 网格线 -->
                <g class="grid-lines">
                  <line v-for="i in 5" :key="i" :x1="0" :y1="i * 60" :x2="600" :y2="i * 60" stroke="rgba(255,255,255,0.1)" />
                  <line v-for="i in 6" :key="i" :x1="i * 100" :y1="0" :x2="i * 100" :y2="300" stroke="rgba(255,255,255,0.1)" />
                </g>
                
                <!-- 趋势线 -->
                <path
                  :d="trendPath"
                  fill="url(#chartGradient)"
                  stroke="#00d4ff"
                  stroke-width="3"
                  class="trend-line"
                />
                
                <!-- 数据点 -->
                <g class="data-points">
                  <circle
                    v-for="(point, index) in chartData"
                    :key="index"
                    :cx="point.x"
                    :cy="point.y"
                    r="5"
                    fill="#00d4ff"
                    class="data-point"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4" data-aos="fade-left">
          <div class="stats-sidebar">
            <h4>{{ getText('dataPanel.charts.stats') }}</h4>
            
            <!-- 项目状态分布 -->
            <div class="status-distribution">
              <div 
                v-for="(status, index) in projectStatus"
                :key="index"
                class="status-item"
              >
                <div class="status-info">
                  <span class="status-name">{{ status.name }}</span>
                  <span class="status-count">{{ status.count }}</span>
                </div>
                <div class="status-bar">
                  <div 
                    class="status-fill"
                    :style="{ 
                      width: `${status.percentage}%`,
                      backgroundColor: status.color 
                    }"
                  ></div>
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
import { ref, onMounted, computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

export default {
  name: 'DataPanel',
  setup() {
    const { getText } = useLanguage()
    const counterRefs = ref([])
    const trendChart = ref(null)

    const metricKeys = ['projects', 'investment', 'listed', 'partners']
    const metricIcons = ['fas fa-rocket', 'fas fa-dollar-sign', 'fas fa-chart-line', 'fas fa-users']
    const metricValues = [127, 50, 89, 156]
    const metricChanges = ['+15%', '+28%', '+12%', '+8%']
    const metricProgress = [85, 70, 92, 78]

    const metrics = computed(() => {
      return metricKeys.map((key, index) => ({
        icon: metricIcons[index],
        label: getText(`dataPanel.metrics.${key}.label`),
        value: metricValues[index],
        unit: getText(`dataPanel.metrics.${key}.unit`),
        change: metricChanges[index],
        trend: 'up',
        progress: metricProgress[index]
      }))
    })

    const chartData = ref([
      { x: 50, y: 200 },
      { x: 150, y: 150 },
      { x: 250, y: 120 },
      { x: 350, y: 80 },
      { x: 450, y: 60 },
      { x: 550, y: 40 }
    ])

    const trendPath = computed(() => {
      const points = chartData.value
      let path = `M ${points[0].x} ${points[0].y}`
      
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1]
        const currentPoint = points[i]
        const cpx = (prevPoint.x + currentPoint.x) / 2
        
        path += ` Q ${cpx} ${prevPoint.y} ${currentPoint.x} ${currentPoint.y}`
      }
      
      // 闭合路径用于填充
      path += ` L ${points[points.length - 1].x} 300 L ${points[0].x} 300 Z`
      
      return path
    })

    const projectStatus = ref([
      { name: '已上市', count: 89, percentage: 70, color: '#10b981' },
      { name: '孵化中', count: 23, percentage: 18, color: '#f59e0b' },
      { name: '筹备中', count: 15, percentage: 12, color: '#6b7280' }
    ])



    // 数字动画
    const animateCounters = () => {
      counterRefs.value.forEach((el, index) => {
        if (el) {
          const target = parseInt(el.dataset.target)
          const duration = 2000
          const start = 0
          const startTime = performance.now()

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(start + (target - start) * easeOutCubic)
            
            el.textContent = current
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          requestAnimationFrame(animate)
        }
      })
    }

    onMounted(() => {
      // 延迟启动动画
      setTimeout(() => {
        animateCounters()
      }, 500)
    })

    return {
      getText,
      metrics,
      chartData,
      trendPath,
      projectStatus,
      counterRefs,
      trendChart
    }
  }
}
</script>

<style scoped>
.data-panel {
  background: rgba(26, 31, 58, 0.8);
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

.metric-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  height: 100%;
}

.metric-card:hover {
  transform: translateY(-10px);
  border-color: #00d4ff;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.metric-icon {
  font-size: 2.5rem;
  color: #00d4ff;
  margin-bottom: 1rem;
  text-align: center;
}

.metric-content {
  text-align: center;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.metric-unit {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
}

.metric-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.metric-change {
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
}

.metric-change.up {
  color: #10b981;
}

.metric-change.down {
  color: #ef4444;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #8b5cf6);
  transition: width 2s ease;
}

.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.chart-container h4 {
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
}

.trend-svg {
  width: 100%;
  height: auto;
}

.trend-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 3s ease forwards;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

.data-point {
  opacity: 0;
  animation: fade-in 0.5s ease forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

.stats-sidebar {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  height: 100%;
}

.stats-sidebar h4,
.stats-sidebar h5 {
  color: white;
  margin-bottom: 1.5rem;
}

.status-distribution {
  margin-bottom: 2rem;
}

.status-item {
  margin-bottom: 1rem;
}

.status-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.status-name {
  color: rgba(255, 255, 255, 0.8);
}

.status-count {
  color: white;
  font-weight: 600;
}

.status-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.status-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .metric-card {
    padding: 1.5rem;
  }
  
  .metric-value {
    font-size: 2rem;
  }
}
</style>