import { ref } from 'vue'

// 全局语言状态
const currentLanguage = ref('zh') // 默认中文

// 完整的文本映射
const texts = {
  zh: {
    // 导航栏
    nav: {
      home: '首页',
      services: '服务', 
      contact: '联系我们'
    },
    // 底部栏
    footer: {
      description: 'Web3 Listing 加速计划，专注区块链项目上所服务',
      contactTitle: '联系我们',
      copyright: '版权所有'
    },
    // 首页Hero部分
    hero: {
      title: 'FlyLabs',
      subtitle: 'Web3 Listing 加速计划',
      description: '从0到1激活飞轮效应，助力Web3创新腾飞！',
      startCooperation: '开始合作',
      learnMore: '了解更多',
      features: [
        '全方位项目孵化服务',
        '丰富的社区与投资资源', 
        '专业的技术团队支持',
        '成熟的商业落地经验'
      ]
    },
    // 核心服务特效
    coreServices: {
      title: '我们的',
      titleHighlight: '核心服务',
      subtitle: '点击文字体验物理引擎特效',
      services: [
        'Listing上所加速全程顾问',
        '前十交易所Listing孵化加速',
        '0-1项目内容优化包装',
        '项目数据优化',
        '项目技术开发',
        'KOL及媒体宣发',
        '项目运营社区搭建',
        '社区资源整合',
        'Marketing',
        'PR合作',
        '优质项目合作',
        '链接优质投资机构',
        '优质项目资源交易'
      ],
      highlights: [
        'Listing上所加速全程顾问',
        '0-1项目内容优化包装',
        '项目技术开发',
        'KOL及媒体宣发',
        '优质项目资源交易'
      ]
    },
    // 服务矩阵
    serviceMatrix: {
      title: '我们的',
      titleHighlight: '服务矩阵',
      subtitle: '全方位Web3项目孵化生态',
      services: {
        listing: {
          title: 'Listing上市加速',
          description: '对接顶级交易所，全程指导上币服务'
        },
        project: {
          title: '0-1项目技术开发',
          description: '从概念到实现搭建项目，全程技术指导'
        },
        community: {
          title: '社区资源整合',
          description: '丰富社区资源，PR及kol宣发及销售指导'
        },
        investment: {
          title: '优质资源链接',
          description: '护航Marketing，链接优质资源及项目互动'
        },
        consulting: {
          title: '推荐优质基金会',
          description: '链接优质投资机构，赋能项目方'
        },
        trading: {
          title: '优质项目资源交易',
          description: '为项目方交易安全，保驾护航'
        }
      }
    },
    // 机构合作
    partnership: {
      title: '机构',
      titleHighlight: '合作',
      subtitle: '携手顶级交易所，共创Web3未来',
      stats: {
        volume: '24H交易量',
        users: '用户数量',
        status: '战略合作伙伴'
      },
      summary: {
        exchanges: '合作交易所',
        totalVolume: '总交易量',
        coverage: '覆盖用户'
      },
      exchanges: {
        binance: '全球最大的加密货币交易平台',
        upbit: '韩国领先的加密货币交易平台',
        bithumb: '韩国老牌数字资产交易所',
        bybit: '领先的衍生品交易平台',
        bitget: '专业的数字资产交易服务',
        huobi: '全球综合性数字资产服务平台',
        kucoin: '全球化的数字货币交易服务平台',
        gate: '区块链资产国际站',
        mexc: '数字资产交易平台',
        bingx: '全球领先的数字资产服务平台',
        lbank: '全球化的数字资产交易平台',
        weex: '新一代数字资产交易平台'
      }
    },
    // 数据面板
    dataPanel: {
      title: '数据面板',
      subtitle: '实时展示加速器成果与数据',
      metrics: {
        projects: {
          label: '孵化项目',
          unit: '个'
        },
        investment: {
          label: '总投资额',
          unit: 'M'
        },
        listed: {
          label: '成功上市',
          unit: '个'
        },
        partners: {
          label: '合作伙伴',
          unit: '家'
        }
      },
      charts: {
        trend: '项目孵化趋势',
        stats: '实时统计',
        growth: '增长数据',
        performance: '表现指标'
      }
    },
    // 服务页面
    services: {
      title: '我们的服务',
      subtitle: '全方位Web3项目孵化服务，助力您的项目腾飞',
      items: {
        project: {
          title: '0-1项目搭建',
          description: '从概念到实现，全程技术指导和数据优化',
          features: ['技术架构设计', '智能合约开发', '前端界面开发', '性能优化', '安全审计']
        },
        community: {
          title: '社区资源整合',
          description: '丰富的社区资源，助力NFT销售和用户增长',
          features: ['社区运营策略', 'NFT营销推广', '用户获取渠道', 'KOL合作资源', '社交媒体管理']
        },
        listing: {
          title: 'Listing上所孵化',
          description: '对接顶级交易所，提供上币全流程服务',
          features: ['交易所对接', '上币流程指导', '市值管理', '流动性支持', '合规咨询']
        },
        investment: {
          title: '投资机构推荐',
          description: '连接优质投资机构，为项目提供资金支持',
          features: ['投资人介绍', '融资策略制定', '商业计划书优化', '路演安排', '投后服务']
        },
        trading: {
          title: '项目买卖',
          description: '提供优质项目资源，项目交易服务',
          features: ['项目评估', '资产整合', '法律咨询', '交易撮合', '风险控制']
        }
      }
    },
    // 联系我们
    contact: {
      title: '联系我们',
      subtitle: '准备好开始您的Web3之旅了吗？立即联系我们！',
      form: {
        name: '姓名',
        email: '邮箱',
        company: '公司/项目名称',
        service: '感兴趣的服务',
        message: '项目描述',
        messagePlaceholder: '请详细描述您的项目和需求...',
        submit: '发送消息',
        selectService: '请选择...',
        services: {
          project: '0-1项目搭建',
          community: '社区资源整合',
          listing: 'Listing上所孵化',
          investment: '投资机构推荐',
          trading: '项目买卖',
          other: '其他'
        }
      },
      info: {
        email: '邮箱',
        telegram: 'Telegram',
        twitter: 'Twitter'
      }
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact Us'
    },
    // Footer
    footer: {
      description: 'Web3 Listing Acceleration Program, Focused on Blockchain Project Listing Services',
      contactTitle: 'Contact Us',
      copyright: 'All rights reserved'
    },
    // Hero Section
    hero: {
      title: 'FlyLabs',
      subtitle: 'Web3 Listing Acceleration Program',
      description: 'Activate the flywheel effect from 0 to 1, empowering Web3 innovation to soar!',
      startCooperation: 'Start Cooperation',
      learnMore: 'Learn More',
      features: [
        'Comprehensive project incubation services',
        'Rich community and investment resources',
        'Professional technical team support',
        'Mature business implementation experience'
      ]
    },
    // Core Services Effect
    coreServices: {
      title: 'Our ',
      titleHighlight: 'Core Services',
      subtitle: 'Click text to experience physics engine effects',
      services: [
        'Full-process Listing Acceleration Consulting',
        'Top 10 Exchange Listing Incubation Acceleration',
        '0-1 Project Content Optimization Packaging',
        'Project Data Optimization',
        'Project Technical Development',
        'KOL and Media Promotion',
        'Project Operations Community Building',
        'Community Resource Integration',
        'Marketing',
        'PR Cooperation',
        'Quality Project Cooperation',
        'Connect Quality Investment Institutions',
        'Quality Project Resource Trading'
      ],
      highlights: [
        'Full-process Listing Acceleration Consulting',
        '0-1 Project Content Optimization Packaging',
        'Project Technical Development',
        'KOL and Media Promotion',
        'Quality Project Resource Trading'
      ]
    },
    // Service Matrix
    serviceMatrix: {
      title: 'Our ',
      titleHighlight: 'Service Matrix',
      subtitle: 'Comprehensive Web3 Project Incubation Ecosystem',
      services: {
        listing: {
          title: 'Listing Acceleration',
          description: 'Connect with top exchanges, full guidance for listing services'
        },
        project: {
          title: '0-1 Project Technical Development',
          description: 'Building projects from concept to implementation, full technical guidance'
        },
        community: {
          title: 'Community Resource Integration',
          description: 'Rich community resources, PR and KOL promotion and sales guidance'
        },
        investment: {
          title: 'High-Quality Resource Connection',
          description: 'Escorting Marketing, connecting high-quality resources and project interaction'
        },
        consulting: {
          title: 'Recommendation of High-Quality Foundations',
          description: 'Connecting with high-quality investment institutions, empowering project parties'
        },
        trading: {
          title: 'High-Quality Project Resource Trading',
          description: 'Ensuring transaction security for project parties'
        }
      }
    },
    // Partnership
    partnership: {
      title: 'Institutional',
      titleHighlight: 'Partnerships',
      subtitle: 'Partnering with top exchanges to create the future of Web3',
      stats: {
        volume: '24H Volume',
        users: 'Users',
        status: 'Strategic Partner'
      },
      summary: {
        exchanges: 'Partner Exchanges',
        totalVolume: 'Total Volume',
        coverage: 'User Coverage'
      },
      exchanges: {
        binance: 'World\'s largest cryptocurrency trading platform',
        upbit: 'Leading cryptocurrency exchange in South Korea',
        bithumb: 'Established digital asset exchange in South Korea',
        bybit: 'Leading derivatives trading platform',
        bitget: 'Professional digital asset trading services',
        huobi: 'Global comprehensive digital asset service platform',
        kucoin: 'Global digital currency trading service platform',
        gate: 'Blockchain asset international station',
        mexc: 'Digital asset trading platform',
        bingx: 'Global leading digital asset service platform',
        lbank: 'Global digital asset trading platform',
        weex: 'Next-generation digital asset trading platform'
      }
    },
    // Data Panel
    dataPanel: {
      title: 'Data Panel',
      subtitle: 'Real-time display of accelerator achievements and data',
      metrics: {
        projects: {
          label: 'Incubated Projects',
          unit: ''
        },
        investment: {
          label: 'Total Investment',
          unit: 'M'
        },
        listed: {
          label: 'Successfully Listed',
          unit: ''
        },
        partners: {
          label: 'Partners',
          unit: ''
        }
      },
      charts: {
        trend: 'Project Incubation Trend',
        stats: 'Real-time Statistics',
        growth: 'Growth Data',
        performance: 'Performance Metrics'
      }
    },
    // Services Page
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Web3 project incubation services to help your project soar',
      items: {
        project: {
          title: '0-1 Project Setup',
          description: 'From concept to implementation, full technical guidance and data optimization',
          features: ['Technical Architecture Design', 'Smart Contract Development', 'Frontend Interface Development', 'Performance Optimization', 'Security Audit']
        },
        community: {
          title: 'Community Resource Integration',
          description: 'Rich community resources to help NFT sales and user growth',
          features: ['Community Operation Strategy', 'NFT Marketing Promotion', 'User Acquisition Channels', 'KOL Cooperation Resources', 'Social Media Management']
        },
        listing: {
          title: 'Listing Exchange Incubation',
          description: 'Connect with top exchanges and provide full-process listing services',
          features: ['Exchange Integration', 'Listing Process Guidance', 'Market Cap Management', 'Liquidity Support', 'Compliance Consulting']
        },
        investment: {
          title: 'Investment Institution Recommendations',
          description: 'Connect with quality investment institutions to provide funding support for projects',
          features: ['Investor Introduction', 'Financing Strategy Development', 'Business Plan Optimization', 'Roadshow Arrangement', 'Post-Investment Services']
        },
        trading: {
          title: 'Project Trading',
          description: 'Provide quality project resources and project trading services',
          features: ['Project Evaluation', 'Asset Integration', 'Legal Consulting', 'Trading Facilitation', 'Risk Control']
        }
      }
    },
    // Contact Page
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to start your Web3 journey? Contact us now!',
      form: {
        name: 'Name',
        email: 'Email',
        company: 'Company/Project Name',
        service: 'Service of Interest',
        message: 'Project Description',
        messagePlaceholder: 'Please describe your project and requirements in detail...',
        submit: 'Send Message',
        selectService: 'Please select...',
        services: {
          project: '0-1 Project Setup',
          community: 'Community Resource Integration',
          listing: 'Listing Exchange Incubation',
          investment: 'Investment Institution Recommendations',
          trading: 'Project Trading',
          other: 'Other'
        }
      },
      info: {
        email: 'Email',
        telegram: 'Telegram',
        twitter: 'Twitter'
      }
    }
  }
}

export function useLanguage() {
  // 获取文本 - 支持嵌套路径如 'nav.home' 或 'hero.title'
  const getText = (path) => {
    const keys = path.split('.')
    let result = texts[currentLanguage.value]
    
    for (const key of keys) {
      result = result?.[key]
    }
    
    return result || path
  }
  
  // 向后兼容的导航文本获取
  const getNavText = (key) => {
    return getText(`nav.${key}`)
  }
  
  // 切换语言
  const switchLanguage = (lang) => {
    currentLanguage.value = lang
    localStorage.setItem('flylabs-language', lang)
  }
  
  // 初始化语言
  const initLanguage = () => {
    const savedLang = localStorage.getItem('flylabs-language')
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      currentLanguage.value = savedLang
    }
  }
  
  return {
    currentLanguage,
    getText,
    getNavText,
    switchLanguage,
    initLanguage
  }
}