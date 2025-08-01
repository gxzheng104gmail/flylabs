<template>
  <div class="contact-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="contact-form-container" data-aos="fade-up">
            <h1 class="text-center gradient-text mb-4">联系我们</h1>
            <p class="text-center lead mb-5">准备好开始您的Web3之旅了吗？立即联系我们！</p>
            
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">姓名</label>
                  <input type="text" class="form-control" id="name" v-model="form.name" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">邮箱</label>
                  <input type="email" class="form-control" id="email" v-model="form.email" required>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="company" class="form-label">公司/项目名称</label>
                <input type="text" class="form-control" id="company" v-model="form.company">
              </div>
              
              <div class="mb-3">
                <label for="service" class="form-label">感兴趣的服务</label>
                <select class="form-select" id="service" v-model="form.service" required>
                  <option value="">请选择...</option>
                  <option value="project">0-1项目搭建</option>
                  <option value="community">社区资源整合</option>
                  <option value="listing">Listing上所孵化</option>
                  <option value="investment">投资机构推荐</option>
                  <option value="trading">项目买卖</option>
                  <option value="other">其他</option>
                </select>
              </div>
              
              <div class="mb-4">
                <label for="message" class="form-label">项目描述</label>
                <textarea class="form-control" id="message" rows="5" v-model="form.message" placeholder="请详细描述您的项目和需求..."></textarea>
              </div>
              
              <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg px-5">发送消息</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- 联系信息 -->
      <div class="row mt-5">
        <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="100">
          <div class="contact-info">
            <i class="fas fa-envelope fa-2x mb-3"></i>
            <h5>邮箱</h5>
            <p>contact@flylabs.io</p>
          </div>
        </div>
        <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
          <div class="contact-info">
            <i class="fab fa-telegram fa-2x mb-3"></i>
            <h5>Telegram</h5>
            <p>@flylabs_official</p>
          </div>
        </div>
        <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="300">
          <div class="contact-info">
            <i class="fab fa-twitter fa-2x mb-3"></i>
            <h5>Twitter</h5>
            <p>@FlyLabsWeb3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // 这里可以添加表单提交逻辑
      alert('感谢您的消息！我们会尽快与您联系。')
      this.resetForm()
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding-top: 100px;
  background: linear-gradient(135deg, #0a0f2e 0%, #1a1f3a 100%);
}

.contact-form-container {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
}

.form-label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-control, .form-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 10px;
  padding: 0.75rem 1rem;
}

.form-control:focus, .form-select:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #00d4ff;
  box-shadow: 0 0 0 0.2rem rgba(0, 212, 255, 0.25);
  color: white;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.btn-primary {
  background: linear-gradient(45deg, #00d4ff, #8b5cf6);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 212, 255, 0.3);
}

.contact-info {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.contact-info:hover {
  transform: translateY(-5px);
  border-color: #00d4ff;
  box-shadow: 0 15px 30px rgba(0, 212, 255, 0.2);
}

.contact-info i {
  color: #00d4ff;
}

.contact-info h5 {
  color: white;
  margin-bottom: 1rem;
}

.contact-info p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}
</style>