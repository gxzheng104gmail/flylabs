<template>
  <div class="contact-page">
    <!-- Hyperspeed Background Effect -->
    <div class="hyperspeed-background">
      <Hyperspeed :effect-options="effectOptions" />
    </div>
    
    <!-- Content -->
    <div class="content-wrapper">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="contact-form-container" data-aos="fade-up">
              <h1 class="text-center gradient-text mb-4">{{ getText('contact.title') }}</h1>
              <p class="text-center lead mb-5">{{ getText('contact.subtitle') }}</p>
              
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">{{ getText('contact.form.name') }}</label>
                    <input type="text" class="form-control" id="name" v-model="form.name" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">{{ getText('contact.form.email') }}</label>
                    <input type="email" class="form-control" id="email" v-model="form.email" required>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="company" class="form-label">{{ getText('contact.form.company') }}</label>
                  <input type="text" class="form-control" id="company" v-model="form.company">
                </div>
                
                <div class="mb-3">
                  <label for="service" class="form-label">{{ getText('contact.form.service') }}</label>
                  <select class="form-select" id="service" v-model="form.service" required>
                    <option value="">{{ getText('contact.form.selectService') }}</option>
                    <option value="project">{{ getText('contact.form.services.project') }}</option>
                    <option value="community">{{ getText('contact.form.services.community') }}</option>
                    <option value="listing">{{ getText('contact.form.services.listing') }}</option>
                    <option value="investment">{{ getText('contact.form.services.investment') }}</option>
                    <option value="trading">{{ getText('contact.form.services.trading') }}</option>
                    <option value="other">{{ getText('contact.form.services.other') }}</option>
                  </select>
                </div>
                
                <div class="mb-4">
                  <label for="message" class="form-label">{{ getText('contact.form.message') }}</label>
                  <textarea class="form-control" id="message" rows="5" v-model="form.message" :placeholder="getText('contact.form.messagePlaceholder')"></textarea>
                </div>
                
                <div class="text-center">
                  <button type="submit" class="btn btn-primary btn-lg px-5">{{ getText('contact.form.submit') }}</button>
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
              <h5>{{ getText('contact.info.email') }}</h5>
              <p>contact@flylabs.io</p>
            </div>
          </div>
          <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="contact-info">
              <i class="fab fa-telegram fa-2x mb-3"></i>
              <h5>{{ getText('contact.info.telegram') }}</h5>
              <p>@flylabs_official</p>
            </div>
          </div>
          <div class="col-md-4 text-center" data-aos="fade-up" data-aos-delay="300">
            <div class="contact-info">
              <i class="fab fa-twitter fa-2x mb-3"></i>
              <h5>{{ getText('contact.info.twitter') }}</h5>
              <p>@FlyLabsWeb3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hyperspeed from '../components/Hyperspeed.vue'
import { hyperspeedPresets } from '../components/HyperspeedPresets'
import { useLanguage } from '../composables/useLanguage.js'

// 使用预设配置
const effectOptions = ref(hyperspeedPresets.one)

const { getText } = useLanguage()

// 表单数据
const form = ref({
  name: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

// 提交表单
const submitForm = () => {
  // 这里可以添加表单提交逻辑
  alert('感谢您的消息！我们会尽快与您联系。')
  resetForm()
}

// 重置表单
const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  }
}
</script>

<style scoped>
.contact-page {
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
  padding-top: 100px;
}

.contact-form-container {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(15px);
  margin: 1rem 0;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
}

.form-label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.form-control, .form-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  backdrop-filter: blur(5px);
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
  box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 212, 255, 0.4);
}

.contact-info {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.contact-info:hover {
  transform: translateY(-5px);
  border-color: #00d4ff;
  box-shadow: 0 15px 30px rgba(0, 212, 255, 0.3);
  background: rgba(0, 0, 0, 0.9);
}

.contact-info i {
  color: #00d4ff;
  text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
}

.contact-info h5 {
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.contact-info p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
}

/* 为标题和描述添加更好的可读性 */
.gradient-text {
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.lead {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hyperspeed-background {
    transform: scale(0.8);
    transform-origin: center;
  }
  
  .contact-form-container {
    padding: 2rem;
  }
}
</style>