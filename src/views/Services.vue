<template>
  <div class="services-page">
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
</template>

<script>
export default {
  name: 'Services',
  data() {
    return {
      services: [
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
      ]
    }
  }
}
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  padding-top: 100px;
  background: linear-gradient(135deg, #0a0f2e 0%, #1a1f3a 100%);
}

.service-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: #00d4ff;
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
}

.service-icon {
  font-size: 3rem;
  color: #00d4ff;
  margin-bottom: 1rem;
}

.service-card h3 {
  color: white;
  margin-bottom: 1rem;
}

.service-card p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  padding: 0;
}

.service-features li {
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}
</style>