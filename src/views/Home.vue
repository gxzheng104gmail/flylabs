<template>
  <div class="home">
    <!-- Hyperspeed Background Effect -->
    <div class="hyperspeed-background">
      <Hyperspeed :effect-options="effectOptions" />
    </div>
    
    <!-- Content -->
    <div class="content-wrapper">
      <HeroSection />
      
      <!-- FallingText Section -->
      <section class="falling-text-section py-5">
        <div class="container">
          <div class="row">
                         <div class="col-12 text-center mb-5" data-aos="fade-up">
               <h2 class="section-title">
                 <span class="gradient-text">{{ getText('coreServices.title') }}</span>{{ getText('coreServices.titleHighlight') }}
               </h2>
               <p class="section-subtitle">{{ getText('coreServices.subtitle') }}</p>
             </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div
                ref="fallingTextContainer"
                class="falling-text-container"
                @click="startFallingEffect"
              >
                                 <div
                   ref="textDisplay"
                   class="text-display"
                   :class="{ 'effect-started': effectStarted }"
                 >
                   <span 
                     v-for="(service, index) in coreServicesList" 
                     :key="index"
                     class="service-text"
                     :class="{ 'highlight': isHighlighted(service) }"
                   >
                     {{ service }}
                   </span>
                 </div>
                <div ref="physicsCanvas" class="physics-canvas"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServiceMatrix />
      <ProjectShowcase />
      <DataPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ServiceMatrix from '../components/ServiceMatrix.vue'
import ProjectShowcase from '../components/ProjectShowcase.vue'
import DataPanel from '../components/DataPanel.vue'
import Hyperspeed from '../components/Hyperspeed.vue'
import { hyperspeedPresets } from '../components/HyperspeedPresets'
import { useLanguage } from '../composables/useLanguage.js'

// 使用预设配置或自定义配置
const effectOptions = ref(hyperspeedPresets.one)

// 语言相关
const { getText } = useLanguage()

// 核心服务列表
const coreServicesList = computed(() => {
  return getText('coreServices.services') || []
})

// 判断是否为高亮项
const isHighlighted = (service) => {
  const highlights = getText('coreServices.highlights') || []
  return highlights.includes(service)
}

// FallingText functionality
const fallingTextContainer = ref(null)
const textDisplay = ref(null)
const physicsCanvas = ref(null)
const effectStarted = ref(false)

let engine = null
let render = null
let runner = null
let mouseConstraint = null
let wordBodies = []
let animationFrameId = null

const startFallingEffect = async () => {
  if (effectStarted.value) return
  
  // Check if Matter.js is available
  if (typeof Matter === 'undefined') {
    console.warn('Matter.js not loaded. Please install: npm install matter-js')
    // Fallback to simple CSS animation
    effectStarted.value = true
    startSimpleFallEffect()
    return
  }
  
  effectStarted.value = true
  await nextTick()
  
  try {
    await startPhysicsEffect()
  } catch (error) {
    console.warn('Physics effect failed, using fallback:', error)
    startSimpleFallEffect()
  }
}

const startSimpleFallEffect = () => {
  if (!textDisplay.value) return
  
  const spans = textDisplay.value.querySelectorAll('.service-text')
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.style.animation = `fallDown 2s ease-in-out ${index * 0.1}s forwards`
    }, 100)
  })
}

const startPhysicsEffect = async () => {
  if (!fallingTextContainer.value || !physicsCanvas.value || !textDisplay.value) return
  
  const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter
  
  const containerRect = fallingTextContainer.value.getBoundingClientRect()
  const width = containerRect.width
  const height = Math.max(containerRect.height, 600)
  
  if (width <= 0 || height <= 0) return
  
  engine = Engine.create()
  engine.world.gravity.y = 0.6
  
  render = Render.create({
    element: physicsCanvas.value,
    engine,
    options: {
      width,
      height,
      background: 'transparent',
      wireframes: false,
      showVelocity: false,
      showAngleIndicator: false,
      showDebug: false
    }
  })
  
  // Create boundaries with thicker walls
  const boundaryOptions = {
    isStatic: true,
    render: { fillStyle: 'transparent' }
  }
  
  const wallThickness = 100
  const floor = Bodies.rectangle(width / 2, height - 80, width + wallThickness * 2, wallThickness, boundaryOptions)
  const leftWall = Bodies.rectangle(-wallThickness/2, height / 2, wallThickness, height + wallThickness, boundaryOptions)
  const rightWall = Bodies.rectangle(width + wallThickness/2, height / 2, wallThickness, height + wallThickness, boundaryOptions)
  const ceiling = Bodies.rectangle(width / 2, -wallThickness/2, width + wallThickness * 2, wallThickness, boundaryOptions)
  
  // Create word bodies
  const wordSpans = textDisplay.value.querySelectorAll('.service-text')
  wordBodies = Array.from(wordSpans).map(elem => {
    const rect = elem.getBoundingClientRect()
    const containerRect = fallingTextContainer.value.getBoundingClientRect()
    
    const x = rect.left - containerRect.left + rect.width / 2
    const y = rect.top - containerRect.top + rect.height / 2
    
    const body = Bodies.rectangle(x, y, rect.width, rect.height, {
      render: { fillStyle: 'transparent' },
      restitution: 0.7,
      frictionAir: 0.03,
      friction: 0.4,
      density: 0.0008
    })
    
    // Add smaller random initial velocity
    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 2,
      y: 0
    })
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02)
    
    return { elem, body }
  })
  
  // Position elements absolutely
  wordBodies.forEach(({ elem, body }) => {
    elem.style.position = 'absolute'
    elem.style.left = `${body.position.x - (body.bounds.max.x - body.bounds.min.x) / 2}px`
    elem.style.top = `${body.position.y - (body.bounds.max.y - body.bounds.min.y) / 2}px`
    elem.style.transform = 'none'
  })
  
  // Add mouse constraint
  const mouse = Mouse.create(fallingTextContainer.value)
  mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  })
  render.mouse = mouse
  
  World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)])
  
  runner = Runner.create()
  Runner.run(runner, engine)
  Render.run(render)
  
  const updateLoop = () => {
    wordBodies.forEach(({ body, elem }) => {
      const { x, y } = body.position
      
      // 确保元素不会超出可视区域
      const clampedY = Math.min(y, height - 120) // 确保不会沉到底部边界外
      const clampedX = Math.max(50, Math.min(x, width - 50)) // 确保不会超出左右边界
      
      elem.style.left = `${clampedX}px`
      elem.style.top = `${clampedY}px`
      elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      
      // 如果物理体位置超出边界，重新设置位置
      if (y > height - 120) {
        Matter.Body.setPosition(body, { x: clampedX, y: height - 120 })
      }
    })
    Engine.update(engine)
    animationFrameId = requestAnimationFrame(updateLoop)
  }
  updateLoop()
}

const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  if (render && physicsCanvas.value) {
    if (render.canvas) {
      physicsCanvas.value.removeChild(render.canvas)
    }
    render = null
  }
  
  if (runner && engine) {
    Matter.Runner.stop(runner)
    runner = null
  }
  
  if (engine) {
    Matter.World.clear(engine.world, false)
    Matter.Engine.clear(engine)
    engine = null
  }
  
  mouseConstraint = null
  wordBodies = []
}

onMounted(() => {
  // Try to load Matter.js if not already loaded
  if (typeof Matter === 'undefined') {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'
    script.async = true
    document.head.appendChild(script)
  }
})

onUnmounted(() => {
  cleanup()
})

// 或者使用自定义配置
const customOptions = ref({
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
})
</script>

<style scoped>
.home {
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
}

/* 可选：为内容添加一些透明度效果 */
.content-wrapper > * {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  margin: 1rem 0;
}

/* FallingText Section Styles */
.falling-text-section {
  background: rgba(10, 15, 46, 0.6);
  position: relative;
  overflow: hidden;
  min-height: 70vh;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
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

.section-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
}

.falling-text-container {
  position: relative;
  min-height: 600px;
  background: rgba(0, 0, 0, 0.4);
  border: 3px solid rgba(0, 212, 255, 0.5);
  border-radius: 20px;
  padding: 3rem 3rem 5rem 3rem; /* 增加底部padding */
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.falling-text-container:hover {
  border-color: #00d4ff;
  border-width: 4px;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
}

.text-display {
  position: relative;
  z-index: 2;
  text-align: center;
  line-height: 2.5;
  font-size: 1.5rem;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.service-text {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  margin: 0.3rem;
  white-space: nowrap;
  user-select: none;
}

.service-text.highlight {
  background: rgba(0, 212, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.5);
  color: #00d4ff;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.service-text:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: #00d4ff;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
}

.physics-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.effect-started .physics-canvas {
  pointer-events: all;
}

/* CSS Fallback Animation */
@keyframes fallDown {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateY(200px) rotate(180deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(400px) rotate(360deg);
    opacity: 0.3;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hyperspeed-background {
    /* 在移动设备上可能需要调整性能 */
    transform: scale(0.8);
    transform-origin: center;
  }
  
  .falling-text-container {
    padding: 2rem;
    min-height: 400px;
  }
  
  .text-display {
    font-size: 1.2rem;
    line-height: 2;
  }
  
  .service-text {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .falling-text-container {
    padding: 1.5rem;
    min-height: 350px;
  }
  
  .text-display {
    font-size: 1rem;
  }
  
  .service-text {
    padding: 0.5rem 0.8rem;
    font-size: 0.8rem;
  }
}
</style>