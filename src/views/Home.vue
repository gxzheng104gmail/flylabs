<template>
  <div class="home">
    <!-- Hyperspeed Background Effect -->
    <div class="hyperspeed-background">
      <Hyperspeed :effect-options="effectOptions" />
    </div>
    
    <!-- Content -->
    <div class="content-wrapper">
      <HeroSection />
      <ServiceMatrix />
      <ProjectShowcase />
      <DataPanel />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ServiceMatrix from '../components/ServiceMatrix.vue'
import ProjectShowcase from '../components/ProjectShowcase.vue'
import DataPanel from '../components/DataPanel.vue'
import Hyperspeed from '../components/Hyperspeed.vue'
import { hyperspeedPresets } from '../components/HyperspeedPresets'

// 使用预设配置或自定义配置
const effectOptions = ref(hyperspeedPresets.one)

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

/* 响应式设计 */
@media (max-width: 768px) {
  .hyperspeed-background {
    /* 在移动设备上可能需要调整性能 */
    transform: scale(0.8);
    transform-origin: center;
  }
}
</style>