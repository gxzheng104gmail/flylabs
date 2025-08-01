export const hyperspeedPresets = {
  one: {
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
  },
  
  // 黑白主题配置
  blackWhite: {
    distortion: 'turbulentDistortion',
    length: 500,
    roadWidth: 12,
    islandWidth: 3,
    lanesPerRoad: 4,
    fov: 85,
    fovSpeedUp: 140,
    speedUp: 2.5,
    carLightsFade: 0.3,
    totalSideLightSticks: 30,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.06,
    brokenLinesWidthPercentage: 0.12,
    brokenLinesLengthPercentage: 0.6,
    lightStickWidth: [0.15, 0.6],
    lightStickHeight: [1.5, 2.0],
    movingAwaySpeed: [70, 100],
    movingCloserSpeed: [-140, -180],
    carLightsLength: [500 * 0.02, 500 * 0.15],
    carLightsRadius: [0.04, 0.12],
    carWidthPercentage: [0.25, 0.45],
    carShiftX: [-0.9, 0.9],
    carFloorSeparation: [0, 6],
    colors: {
      roadColor: 0x000000,        // 纯黑色路面
      islandColor: 0x111111,      // 深灰色岛屿
      background: 0x000000,       // 黑色背景
      shoulderLines: 0xffffff,    // 白色路肩线
      brokenLines: 0xffffff,      // 白色虚线
      leftCars: [0xffffff, 0xeeeeee, 0xdddddd],  // 白色系车灯
      rightCars: [0xffffff, 0xeeeeee, 0xdddddd], // 白色系车灯
      sticks: 0xffffff,           // 白色路标
    },
  }
};
